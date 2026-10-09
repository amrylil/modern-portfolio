import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { z } from "zod";

const testimonialSchema = z.object({
  name: z.string().min(1, "Name is required"),
  title: z.string().min(1, "Title/Company is required"),
  quote: z.string().min(1, "Quote is required"),
  avatar: z.string().nullable().optional(),
  rating: z.number().int().min(1).max(5).optional().default(5),
  order: z.number().int().optional().default(0),
  isActive: z.boolean().optional().default(true),
});

// GET /api/testimonials - Public
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const all = searchParams.get("all") === "true";

    const where = all ? {} : { isActive: true };

    const testimonials = await prisma.testimonial.findMany({
      where,
      orderBy: { order: "asc" },
    });

    return NextResponse.json({
      success: true,
      count: testimonials.length,
      data: testimonials,
    });
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json(
      { error: "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}

// POST /api/testimonials - Protected (Admin only)
export async function POST(request: NextRequest) {
  try {
    const { errorResponse } = await requireAuth(request);
    if (errorResponse) return errorResponse;

    const body = await request.json();
    const validation = testimonialSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation error", details: validation.error.format() },
        { status: 400 }
      );
    }

    const testimonial = await prisma.testimonial.create({
      data: validation.data,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Testimonial created successfully",
        data: testimonial,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating testimonial:", error);
    return NextResponse.json(
      { error: "Failed to create testimonial" },
      { status: 500 }
    );
  }
}
