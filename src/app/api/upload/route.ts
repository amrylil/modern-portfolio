import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import path from "path";
import fs from "fs/promises";

// Max file sizes
const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100MB

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
];

const ALLOWED_VIDEO_TYPES = [
  "video/mp4",
  "video/webm",
  "video/ogg",
  "video/quicktime",
];

// Helper to sanitize filename
function sanitizeFileName(originalName: string): string {
  const ext = path.extname(originalName).toLowerCase();
  const baseName = path
    .basename(originalName, ext)
    .replace(/[^a-zA-Z0-9_-]/g, "_")
    .substring(0, 50);
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `${timestamp}-${baseName}-${randomStr}${ext}`;
}

export async function POST(request: NextRequest) {
  try {
    // Check admin authentication for uploads
    const { errorResponse } = await requireAuth(request);
    if (errorResponse) return errorResponse;

    const formData = await request.formData();
    const folder = (formData.get("folder") as string) || "general";
    const sanitizedFolder = folder.replace(/[^a-zA-Z0-9_-]/g, "");

    // Collect all files from 'file' or 'files' field
    const files: File[] = [];
    for (const [key, value] of formData.entries()) {
      if ((key === "file" || key === "files" || key.startsWith("files[")) && value instanceof File) {
        files.push(value);
      }
    }

    if (files.length === 0) {
      return NextResponse.json(
        { error: "No files uploaded. Provide 'file' or 'files' in form-data." },
        { status: 400 }
      );
    }

    const uploadDir = path.join(process.cwd(), "public", "uploads", sanitizedFolder);
    await fs.mkdir(uploadDir, { recursive: true });

    const results = [];

    for (const file of files) {
      const mimeType = file.type;
      const isImage = ALLOWED_IMAGE_TYPES.includes(mimeType);
      const isVideo = ALLOWED_VIDEO_TYPES.includes(mimeType);

      if (!isImage && !isVideo) {
        return NextResponse.json(
          {
            error: `Unsupported file type: ${mimeType}. Allowed: JPG, PNG, WEBP, GIF, SVG, MP4, WEBM, OGG, MOV.`,
          },
          { status: 400 }
        );
      }

      if (isImage && file.size > MAX_IMAGE_SIZE) {
        return NextResponse.json(
          { error: `Image ${file.name} exceeds max size of 10MB` },
          { status: 400 }
        );
      }

      if (isVideo && file.size > MAX_VIDEO_SIZE) {
        return NextResponse.json(
          { error: `Video ${file.name} exceeds max size of 100MB` },
          { status: 400 }
        );
      }

      const fileName = sanitizeFileName(file.name);
      const filePath = path.join(uploadDir, fileName);

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      await fs.writeFile(filePath, buffer);

      const publicUrl = `/uploads/${sanitizedFolder}/${fileName}`;

      results.push({
        name: file.name,
        fileName,
        url: publicUrl,
        size: file.size,
        type: isVideo ? "video" : "image",
        mimeType,
      });
    }

    return NextResponse.json({
      success: true,
      message: `Successfully uploaded ${results.length} file(s)`,
      count: results.length,
      // If single file, convenience url field
      url: results[0].url,
      type: results[0].type,
      data: results.length === 1 ? results[0] : results,
      files: results,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload file(s)" },
      { status: 500 }
    );
  }
}

// DELETE /api/upload - Delete uploaded file by url path (admin only)
export async function DELETE(request: NextRequest) {
  try {
    const { errorResponse } = await requireAuth(request);
    if (errorResponse) return errorResponse;

    const { searchParams } = new URL(request.url);
    const fileUrl = searchParams.get("url");

    if (!fileUrl || !fileUrl.startsWith("/uploads/")) {
      return NextResponse.json(
        { error: "Invalid file URL. Must start with /uploads/" },
        { status: 400 }
      );
    }

    const relativePath = fileUrl.replace(/^\/uploads\//, "");
    const safePath = path.normalize(relativePath).replace(/^(\.\.[\/\\])+/, "");
    const fullPath = path.join(process.cwd(), "public", "uploads", safePath);

    try {
      await fs.unlink(fullPath);
      return NextResponse.json({
        success: true,
        message: "File deleted successfully",
      });
    } catch {
      return NextResponse.json(
        { error: "File not found or already deleted" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Delete file error:", error);
    return NextResponse.json(
      { error: "Failed to delete file" },
      { status: 500 }
    );
  }
}
