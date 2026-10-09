import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { z } from "zod";

const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().min(1, "Description is required"),
  image: z.string().min(1, "Main image URL is required"),
  images: z.union([z.array(z.string()), z.string()]).optional().default([]),
  videoUrl: z.string().nullable().optional(),
  link: z.string().nullable().optional(),
  preview: z.string().nullable().optional(),
  status: z.string().optional().default("Deployed"),
  isPrivate: z.boolean().optional().default(false),
  isFeatured: z.boolean().optional().default(true),
  tools: z.union([z.array(z.string()), z.string()]),
  order: z.number().int().optional().default(0),
});

// Helper to format project for responses
function formatProject(project: {
  id: number;
  title: string;
  slug: string;
  description: string;
  image: string;
  images: string | null;
  videoUrl: string | null;
  link: string | null;
  preview: string | null;
  status: string;
  isPrivate: boolean;
  isFeatured: boolean;
  tools: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}) {
  let parsedTools: string[] = [];
  try {
    parsedTools = JSON.parse(project.tools);
  } catch {
    parsedTools = project.tools ? [project.tools] : [];
  }

  let parsedImages: string[] = [];
  if (project.images) {
    try {
      parsedImages = JSON.parse(project.images);
    } catch {
      parsedImages = [project.images];
    }
  }

  // Ensure main image is in images array if empty
  if (parsedImages.length === 0 && project.image) {
    parsedImages = [project.image];
  }

  return {
    ...project,
    tools: parsedTools,
    images: parsedImages,
    videoUrl: project.videoUrl,
    // Add compatibility properties for frontend existing components
    privateRepo: project.isPrivate,
    thumbnail: project.image,
  };
}

// GET /api/projects - Public
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured");
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    const where: Record<string, unknown> = {};

    if (featured !== null) {
      where.isFeatured = featured === "true";
    }

    if (status) {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
        { tools: { contains: search } },
      ];
    }

    const projects = await prisma.project.findMany({
      where,
      orderBy: { order: "asc" },
    });

    const formatted = projects.map(formatProject);

    return NextResponse.json({
      success: true,
      count: formatted.length,
      data: formatted,
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

// POST /api/projects - Protected (Admin only)
export async function POST(request: NextRequest) {
  try {
    const { errorResponse } = await requireAuth(request);
    if (errorResponse) return errorResponse;

    const body = await request.json();
    const validation = projectSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation error", details: validation.error.format() },
        { status: 400 }
      );
    }

    const data = validation.data;
    const toolsString = Array.isArray(data.tools)
      ? JSON.stringify(data.tools)
      : data.tools;

    const imagesString = Array.isArray(data.images)
      ? JSON.stringify(data.images)
      : typeof data.images === "string"
      ? data.images
      : "[]";

    const project = await prisma.project.create({
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description,
        image: data.image,
        images: imagesString,
        videoUrl: data.videoUrl || null,
        link: data.link || null,
        preview: data.preview || null,
        status: data.status,
        isPrivate: data.isPrivate,
        isFeatured: data.isFeatured,
        tools: toolsString,
        order: data.order,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Project created successfully",
        data: formatProject(project),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
