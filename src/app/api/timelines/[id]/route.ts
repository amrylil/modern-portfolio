import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { z } from "zod";

const updateTimelineSchema = z.object({
  title: z.string().min(1).optional(),
  role: z.string().nullable().optional(),
  company: z.string().nullable().optional(),
  description: z.string().min(1).optional(),
  images: z.union([z.array(z.string()), z.string()]).optional(),
  order: z.number().int().optional(),
});

function formatTimeline(timeline: {
  id: number;
  title: string;
  role: string | null;
  company: string | null;
  description: string;
  images: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}) {
  let parsedImages: string[] = [];
  try {
    parsedImages = JSON.parse(timeline.images);
  } catch {
    parsedImages = timeline.images ? [timeline.images] : [];
  }

  return {
    ...timeline,
    images: parsedImages,
  };
}

// GET /api/timelines/[id]
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const timelineId = parseInt(id, 10);
    if (isNaN(timelineId)) {
      return NextResponse.json({ error: "Invalid timeline ID" }, { status: 400 });
    }

    const timeline = await prisma.timeline.findUnique({
      where: { id: timelineId },
    });

    if (!timeline) {
      return NextResponse.json({ error: "Timeline not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: formatTimeline(timeline) });
  } catch (error) {
    console.error("Error fetching timeline:", error);
    return NextResponse.json({ error: "Failed to fetch timeline" }, { status: 500 });
  }
}

// PUT /api/timelines/[id] - Protected
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { errorResponse } = await requireAuth(request);
    if (errorResponse) return errorResponse;

    const { id } = await params;
    const timelineId = parseInt(id, 10);
    if (isNaN(timelineId)) {
      return NextResponse.json({ error: "Invalid timeline ID" }, { status: 400 });
    }

    const body = await request.json();
    const validation = updateTimelineSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation error", details: validation.error.format() },
        { status: 400 }
      );
    }

    const data = { ...validation.data };
    if (data.images !== undefined) {
      data.images = Array.isArray(data.images)
        ? JSON.stringify(data.images)
        : data.images;
    }

    const updated = await prisma.timeline.update({
      where: { id: timelineId },
      data: data as Record<string, unknown>,
    });

    return NextResponse.json({
      success: true,
      message: "Timeline updated successfully",
      data: formatTimeline(updated),
    });
  } catch (error) {
    console.error("Error updating timeline:", error);
    return NextResponse.json({ error: "Failed to update timeline" }, { status: 500 });
  }
}

// DELETE /api/timelines/[id] - Protected
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { errorResponse } = await requireAuth(request);
    if (errorResponse) return errorResponse;

    const { id } = await params;
    const timelineId = parseInt(id, 10);
    if (isNaN(timelineId)) {
      return NextResponse.json({ error: "Invalid timeline ID" }, { status: 400 });
    }

    await prisma.timeline.delete({
      where: { id: timelineId },
    });

    return NextResponse.json({
      success: true,
      message: "Timeline deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting timeline:", error);
    return NextResponse.json({ error: "Failed to delete timeline" }, { status: 500 });
  }
}
