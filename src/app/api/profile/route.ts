import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { z } from "zod";

const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  title: z.string().min(1, "Title is required"),
  greeting: z.string().min(1, "Greeting is required"),
  avatarUrl: z.string().min(1, "Avatar URL is required"),
  bio: z.string().min(1, "Bio is required"),
  aboutMe: z.string().min(1, "About Me is required"),
  aboutMeMobile: z.string().nullable().optional(),
  email: z.string().email("Invalid email"),
  phone: z.string().min(1, "Phone is required"),
  address: z.string().min(1, "Address is required"),
  githubUsername: z.string().min(1, "GitHub username is required"),
  githubUrl: z.string().url("Invalid GitHub URL"),
  linkedinUrl: z.string().url("Invalid LinkedIn URL"),
  resumeUrl: z.string().nullable().optional(),
});

// GET /api/profile - Public
export async function GET() {
  try {
    const profile = await prisma.profile.findFirst();
    if (!profile) {
      return NextResponse.json(
        { error: "Profile not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: profile });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}

// PUT /api/profile - Protected (Admin only)
export async function PUT(request: NextRequest) {
  try {
    const { errorResponse } = await requireAuth(request);
    if (errorResponse) return errorResponse;

    const body = await request.json();
    const validation = profileSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation error", details: validation.error.format() },
        { status: 400 }
      );
    }

    const currentProfile = await prisma.profile.findFirst();
    let updated;

    if (currentProfile) {
      updated = await prisma.profile.update({
        where: { id: currentProfile.id },
        data: validation.data,
      });
    } else {
      updated = await prisma.profile.create({
        data: validation.data,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
