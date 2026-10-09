import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please provide a valid email address"),
  message: z.string().min(5, "Message must be at least 5 characters"),
});

// POST /api/contact - Public (Submit contact form)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = contactSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation error", details: validation.error.format() },
        { status: 400 }
      );
    }

    const { name, email, message } = validation.data;

    const contactMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        message,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for reaching out! Your message has been received.",
        data: {
          id: contactMessage.id,
          name: contactMessage.name,
          email: contactMessage.email,
          createdAt: contactMessage.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating contact message:", error);
    return NextResponse.json(
      { error: "Failed to submit message. Please try again later." },
      { status: 500 }
    );
  }
}

// GET /api/contact - Protected (Admin only: view received messages)
export async function GET(request: NextRequest) {
  try {
    const { errorResponse } = await requireAuth(request);
    if (errorResponse) return errorResponse;

    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    console.error("Error fetching contact messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch contact messages" },
      { status: 500 }
    );
  }
}
