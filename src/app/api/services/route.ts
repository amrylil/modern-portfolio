import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { z } from "zod";

const serviceSchema = z.object({
  title: z.string().min(1, "Title is required"),
  icon: z.string().min(1, "Icon name is required"),
  content: z.union([z.array(z.string()), z.string()]),
  order: z.number().int().optional().default(0),
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

// GET /api/services - Public
export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { order: "asc" },
    });

    const formatted = services.map(formatService);

    return NextResponse.json({
      success: true,
      count: formatted.length,
      data: formatted,
    });
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json(
      { error: "Failed to fetch services" },
      { status: 500 }
    );
  }
}

// POST /api/services - Protected (Admin only)
export async function POST(request: NextRequest) {
  try {
    const { errorResponse } = await requireAuth(request);
    if (errorResponse) return errorResponse;

    const body = await request.json();
    const validation = serviceSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation error", details: validation.error.format() },
        { status: 400 }
      );
    }

    const data = validation.data;
    const contentString = Array.isArray(data.content)
      ? JSON.stringify(data.content)
      : data.content;

    const service = await prisma.service.create({
      data: {
        title: data.title,
        icon: data.icon,
        content: contentString,
        order: data.order,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Service created successfully",
        data: formatService(service),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating service:", error);
    return NextResponse.json(
      { error: "Failed to create service" },
      { status: 500 }
    );
  }
}
