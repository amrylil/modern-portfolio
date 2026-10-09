import { Project } from "@/app/project/page";
import React, { useState } from "react";
import { Play, Image as ImageIcon, ExternalLink, Github, X } from "lucide-react";

interface ModalProps {
  project: Project;
  onClose: () => void;
}

// Helper to check if URL is YouTube
function getYouTubeEmbedUrl(url: string): string | null {
  if (!url) return null;
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/
  );
  return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=0` : null;
}

export const ProjectModal: React.FC<ModalProps> = ({ project, onClose }) => {
  // Combine all images into array
  const allImages = project.images && project.images.length > 0
    ? project.images
    : project.image
    ? [project.image]
    : [];

  const [activeMediaTab, setActiveMediaTab] = useState<"images" | "video">(
    project.videoUrl ? "video" : "images"
  );
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const youtubeEmbedUrl = project.videoUrl ? getYouTubeEmbedUrl(project.videoUrl) : null;
  const isDirectVideo = project.videoUrl && !youtubeEmbedUrl;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 dark:bg-black/80 backdrop-blur-md p-4 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 p-6 md:p-8 shadow-2xl"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors z-20 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Media Preview Tabs (Screenshots / Video Demo) */}
        {(allImages.length > 0 || project.videoUrl) && (
          <div className="mb-6">
            {/* Tab switch if both video and images exist */}
            {project.videoUrl && allImages.length > 0 && (
              <div className="flex gap-2 mb-3">
                <button
                  onClick={() => setActiveMediaTab("images")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                    activeMediaTab === "images"
                      ? "bg-neutral-900 text-white dark:bg-neutral-200 dark:text-neutral-900 font-semibold"
                      : "bg-neutral-100 text-neutral-700 hover:text-black dark:bg-neutral-900 dark:text-neutral-400 dark:hover:text-white border border-neutral-200 dark:border-neutral-800"
                  }`}
                >
                  <ImageIcon className="h-3.5 w-3.5" />
                  Screenshots ({allImages.length})
                </button>
                <button
                  onClick={() => setActiveMediaTab("video")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                    activeMediaTab === "video"
                      ? "bg-red-600 text-white font-semibold"
                      : "bg-neutral-100 text-neutral-700 hover:text-black dark:bg-neutral-900 dark:text-neutral-400 dark:hover:text-white border border-neutral-200 dark:border-neutral-800"
                  }`}
                >
                  <Play className="h-3.5 w-3.5" />
                  Video Demo
                </button>
              </div>
            )}

            {/* Video Player Display */}
            {activeMediaTab === "video" && project.videoUrl && (
              <div className="rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-black aspect-video relative">
                {youtubeEmbedUrl ? (
                  <iframe
                    src={youtubeEmbedUrl}
                    title={`${project.title} Video Demo`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : isDirectVideo ? (
                  <video
                    src={project.videoUrl}
                    controls
                    poster={project.image}
                    className="w-full h-full object-contain bg-black"
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-neutral-400 p-6 text-center">
                    <p className="text-sm mb-2">Video link available:</p>
                    <a
                      href={project.videoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-500 underline text-sm break-all"
                    >
                      {project.videoUrl}
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* Image Gallery Display */}
            {activeMediaTab === "images" && allImages.length > 0 && (
              <div>
                {/* Main Large Image */}
                <div className="rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 max-h-[420px] flex items-center justify-center">
                  <img
                    src={allImages[selectedImageIndex] || allImages[0]}
                    alt={`${project.title} preview ${selectedImageIndex + 1}`}
                    className="w-full h-[380px] object-contain rounded-lg"
                  />
                </div>

                {/* Thumbnails if more than 1 image */}
                {allImages.length > 1 && (
                  <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
                    {allImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImageIndex(idx)}
                        className={`h-16 w-24 flex-shrink-0 rounded-lg overflow-hidden border-2 transition cursor-pointer ${
                          selectedImageIndex === idx
                            ? "border-neutral-900 dark:border-white scale-105 shadow-md"
                            : "border-neutral-200 dark:border-neutral-800 opacity-60 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={img}
                          alt={`Thumbnail ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Modal Info Content */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white">{project.title}</h3>
            <span className="py-1 px-3 text-xs text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-full font-medium">
              {project.status}
            </span>
          </div>

          <div className="border-t border-neutral-200 dark:border-neutral-800 pt-4">
            <h4 className="text-sm font-semibold mb-2 text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
              Project Description
            </h4>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-sm md:text-base">
              {project.description}
            </p>
          </div>

          <div className="border-t border-neutral-200 dark:border-neutral-800 pt-4">
            <h4 className="text-sm font-semibold mb-3 text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
              Tools & Technologies
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tools?.map((tool) => (
                <span
                  key={tool}
                  className="py-1 px-3 text-xs bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-300 rounded-md font-mono"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap gap-3 mt-4 border-t border-neutral-200 dark:border-neutral-800 pt-5">
            {/* GitHub Button */}
            {!project.privateRepo && !project.isPrivate && project.link ? (
              <a
                target="_blank"
                href={project.link}
                aria-label="GitHub"
                rel="noopener noreferrer"
                className="flex-1 min-w-[140px] flex justify-center items-center gap-2 text-neutral-800 dark:text-neutral-300 hover:text-black dark:hover:text-white transition border border-neutral-300 dark:border-neutral-700 hover:border-neutral-500 p-3 rounded-xl bg-neutral-100 dark:bg-neutral-900/80 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-sm font-medium"
              >
                <Github className="h-4 w-4" />
                <span>Source Code</span>
              </a>
            ) : (
              <div
                className="flex-1 min-w-[140px] flex justify-center items-center gap-2 text-neutral-400 dark:text-neutral-600 border border-neutral-200 dark:border-neutral-800/80 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-950/60 cursor-not-allowed text-sm"
                title="Private Repository"
              >
                <Github className="h-4 w-4" />
                <span>Private Repository</span>
              </div>
            )}

            {/* Live Preview Button */}
            {project.preview ? (
              <a
                target="_blank"
                href={project.preview}
                aria-label="Preview"
                rel="noopener noreferrer"
                className="flex-1 min-w-[140px] flex justify-center items-center gap-2 text-white transition border border-neutral-900 dark:border-neutral-600 hover:border-black dark:hover:border-white p-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-sm font-medium shadow-sm"
              >
                <ExternalLink className="h-4 w-4" />
                <span>Live Preview</span>
              </a>
            ) : (
              <div
                className="flex-1 min-w-[140px] flex justify-center items-center gap-2 text-neutral-400 dark:text-neutral-600 border border-neutral-200 dark:border-neutral-800/80 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-950/60 cursor-not-allowed text-sm"
                title="Preview not available"
              >
                <ExternalLink className="h-4 w-4" />
                <span>No Live Preview</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
