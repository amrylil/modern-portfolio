import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { z } from "zod";

const updateServiceSchema = z.object({
  title: z.string().min(1).optional(),
  icon: z.string().min(1).optional(),
  content: z.union([z.array(z.string()), z.string()]).optional(),
  order: z.number().int().optional(),
});

function formatService(service: {
  id: number;
  title: string;
  icon: string;
  content: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}) {
  let parsedContent: string[] = [];
  try {
    parsedContent = JSON.parse(service.content);
  } catch {
    parsedContent = service.content ? [service.content] : [];
  }

  return {
    ...service,
    content: parsedContent,
  };
}

// GET /api/services/[id]
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const serviceId = parseInt(id, 10);
    if (isNaN(serviceId)) {
      return NextResponse.json({ error: "Invalid service ID" }, { status: 400 });
    }

    const service = await prisma.service.findUnique({
      where: { id: serviceId },
    });

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: formatService(service) });
  } catch (error) {
    console.error("Error fetching service:", error);
    return NextResponse.json({ error: "Failed to fetch service" }, { status: 500 });
  }
}

// PUT /api/services/[id] - Protected
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { errorResponse } = await requireAuth(request);
    if (errorResponse) return errorResponse;

    const { id } = await params;
    const serviceId = parseInt(id, 10);
    if (isNaN(serviceId)) {
      return NextResponse.json({ error: "Invalid service ID" }, { status: 400 });
    }

    const body = await request.json();
    const validation = updateServiceSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation error", details: validation.error.format() },
        { status: 400 }
      );
    }

    const data = { ...validation.data };
    if (data.content !== undefined) {
      data.content = Array.isArray(data.content)
        ? JSON.stringify(data.content)
        : data.content;
    }

    const updated = await prisma.service.update({
      where: { id: serviceId },
      data: data as Record<string, unknown>,
    });

    return NextResponse.json({
      success: true,
      message: "Service updated successfully",
      data: formatService(updated),
    });
  } catch (error) {
    console.error("Error updating service:", error);
    return NextResponse.json({ error: "Failed to update service" }, { status: 500 });
  }
}

// DELETE /api/services/[id] - Protected
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { errorResponse } = await requireAuth(request);
    if (errorResponse) return errorResponse;

    const { id } = await params;
    const serviceId = parseInt(id, 10);
    if (isNaN(serviceId)) {
      return NextResponse.json({ error: "Invalid service ID" }, { status: 400 });
    }

    await prisma.service.delete({
      where: { id: serviceId },
    });

    return NextResponse.json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting service:", error);
    return NextResponse.json({ error: "Failed to delete service" }, { status: 500 });
  }
}
