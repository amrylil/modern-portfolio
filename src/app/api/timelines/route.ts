import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { z } from "zod";

const timelineSchema = z.object({
  title: z.string().min(1, "Title/Year is required"),
  role: z.string().nullable().optional(),
  company: z.string().nullable().optional(),
  description: z.string().min(1, "Description is required"),
  images: z.union([z.array(z.string()), z.string()]),
  order: z.number().int().optional().default(0),
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

// GET /api/timelines - Public
export async function GET() {
  try {
    const timelines = await prisma.timeline.findMany({
      orderBy: { order: "asc" },
    });

    const formatted = timelines.map(formatTimeline);

    return NextResponse.json({
      success: true,
      count: formatted.length,
      data: formatted,
    });
  } catch (error) {
    console.error("Error fetching timelines:", error);
    return NextResponse.json(
      { error: "Failed to fetch timelines" },
      { status: 500 }
    );
  }
}

// POST /api/timelines - Protected (Admin only)
export async function POST(request: NextRequest) {
  try {
    const { errorResponse } = await requireAuth(request);
    if (errorResponse) return errorResponse;

    const body = await request.json();
    const validation = timelineSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation error", details: validation.error.format() },
        { status: 400 }
      );
    }

    const data = validation.data;
    const imagesString = Array.isArray(data.images)
      ? JSON.stringify(data.images)
      : data.images;

    const timeline = await prisma.timeline.create({
      data: {
        title: data.title,
        role: data.role || null,
        company: data.company || null,
        description: data.description,
        images: imagesString,
        order: data.order,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Timeline created successfully",
        data: formatTimeline(timeline),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating timeline:", error);
    return NextResponse.json(
      { error: "Failed to create timeline" },
      { status: 500 }
    );
  }
}
