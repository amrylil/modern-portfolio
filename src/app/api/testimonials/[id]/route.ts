import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { z } from "zod";

const updateTestimonialSchema = z.object({
  name: z.string().min(1).optional(),
  title: z.string().min(1).optional(),
  quote: z.string().min(1).optional(),
  avatar: z.string().nullable().optional(),
  rating: z.number().int().min(1).max(5).optional(),
  order: z.number().int().optional(),
  isActive: z.boolean().optional(),
});

// GET /api/testimonials/[id]
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const testimonialId = parseInt(id, 10);
    if (isNaN(testimonialId)) {
      return NextResponse.json({ error: "Invalid testimonial ID" }, { status: 400 });
    }

    const testimonial = await prisma.testimonial.findUnique({
      where: { id: testimonialId },
    });

    if (!testimonial) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: testimonial });
  } catch (error) {
    console.error("Error fetching testimonial:", error);
    return NextResponse.json({ error: "Failed to fetch testimonial" }, { status: 500 });
  }
}

// PUT /api/testimonials/[id] - Protected
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { errorResponse } = await requireAuth(request);
    if (errorResponse) return errorResponse;

    const { id } = await params;
    const testimonialId = parseInt(id, 10);
    if (isNaN(testimonialId)) {
      return NextResponse.json({ error: "Invalid testimonial ID" }, { status: 400 });
    }

    const body = await request.json();
    const validation = updateTestimonialSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation error", details: validation.error.format() },
        { status: 400 }
      );
    }

    const updated = await prisma.testimonial.update({
      where: { id: testimonialId },
      data: validation.data,
    });

    return NextResponse.json({
      success: true,
      message: "Testimonial updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error("Error updating testimonial:", error);
    return NextResponse.json({ error: "Failed to update testimonial" }, { status: 500 });
  }
}

// DELETE /api/testimonials/[id] - Protected
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { errorResponse } = await requireAuth(request);
    if (errorResponse) return errorResponse;

    const { id } = await params;
    const testimonialId = parseInt(id, 10);
    if (isNaN(testimonialId)) {
      return NextResponse.json({ error: "Invalid testimonial ID" }, { status: 400 });
    }

    await prisma.testimonial.delete({
      where: { id: testimonialId },
    });

    return NextResponse.json({
      success: true,
      message: "Testimonial deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    return NextResponse.json({ error: "Failed to delete testimonial" }, { status: 500 });
  }
}
