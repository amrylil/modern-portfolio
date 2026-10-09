import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { z } from "zod";

const skillSchema = z.object({
  title: z.string().min(1, "Title is required"),
  icon: z.string().min(1, "Icon identifier is required"),
  href: z.string().url("Invalid link URL"),
  category: z.string().optional().default("Tech"),
  order: z.number().int().optional().default(0),
  isActive: z.boolean().optional().default(true),
});

// GET /api/skills - Public
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const all = searchParams.get("all") === "true";

    const where = all ? {} : { isActive: true };

    const skills = await prisma.skill.findMany({
      where,
      orderBy: { order: "asc" },
    });

    return NextResponse.json({ success: true, count: skills.length, data: skills });
  } catch (error) {
    console.error("Error fetching skills:", error);
    return NextResponse.json(
      { error: "Failed to fetch skills" },
      { status: 500 }
    );
  }
}

// POST /api/skills - Protected (Admin only)
export async function POST(request: NextRequest) {
  try {
    const { errorResponse } = await requireAuth(request);
    if (errorResponse) return errorResponse;

    const body = await request.json();
    const validation = skillSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation error", details: validation.error.format() },
        { status: 400 }
      );
    }

    const skill = await prisma.skill.create({
      data: validation.data,
    });

    return NextResponse.json(
      { success: true, message: "Skill created successfully", data: skill },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating skill:", error);
    return NextResponse.json(
      { error: "Failed to create skill" },
      { status: 500 }
    );
  }
}
