import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { z } from "zod";

const updateProjectSchema = z.object({
  title: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  image: z.string().min(1).optional(),
  images: z.union([z.array(z.string()), z.string()]).optional(),
  videoUrl: z.string().nullable().optional(),
  link: z.string().nullable().optional(),
  preview: z.string().nullable().optional(),
  status: z.string().optional(),
  isPrivate: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  tools: z.union([z.array(z.string()), z.string()]).optional(),
  order: z.number().int().optional(),
});

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

  if (parsedImages.length === 0 && project.image) {
    parsedImages = [project.image];
  }

  return {
    ...project,
    tools: parsedTools,
    images: parsedImages,
    videoUrl: project.videoUrl,
    privateRepo: project.isPrivate,
    thumbnail: project.image,
  };
}

// GET /api/projects/[id] (can be ID or slug)
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const projectId = parseInt(id, 10);

    const project = isNaN(projectId)
      ? await prisma.project.findUnique({ where: { slug: id } })
      : await prisma.project.findUnique({ where: { id: projectId } });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: formatProject(project) });
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 });
  }
}

// PUT /api/projects/[id] - Protected
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { errorResponse } = await requireAuth(request);
    if (errorResponse) return errorResponse;

    const { id } = await params;
    const projectId = parseInt(id, 10);
    if (isNaN(projectId)) {
      return NextResponse.json({ error: "Invalid project ID" }, { status: 400 });
    }

    const body = await request.json();
    const validation = updateProjectSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation error", details: validation.error.format() },
        { status: 400 }
      );
    }

    const data = { ...validation.data };
    if (data.tools !== undefined) {
      data.tools = Array.isArray(data.tools)
        ? JSON.stringify(data.tools)
        : data.tools;
    }

    if (data.images !== undefined) {
      data.images = Array.isArray(data.images)
        ? JSON.stringify(data.images)
        : data.images;
    }

    const updated = await prisma.project.update({
      where: { id: projectId },
      data: data as Record<string, unknown>,
    });

    return NextResponse.json({
      success: true,
      message: "Project updated successfully",
      data: formatProject(updated),
    });
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

// DELETE /api/projects/[id] - Protected
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { errorResponse } = await requireAuth(request);
    if (errorResponse) return errorResponse;

    const { id } = await params;
    const projectId = parseInt(id, 10);
    if (isNaN(projectId)) {
      return NextResponse.json({ error: "Invalid project ID" }, { status: 400 });
    }

    await prisma.project.delete({
      where: { id: projectId },
    });

    return NextResponse.json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
