import { Project } from "@/app/project/page";
import React from "react";

interface ModalProps {
  project: Project;
  onClose: () => void;
}

export const ProjectModal: React.FC<ModalProps> = ({ project, onClose }) => {
  // Gunakan styling yang mirip dengan card Anda
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg bg-opacity-80 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()} // Mencegah klik di dalam modal menutup modal
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-lg border border-neutral-600 bg-[#141414] text-[var(--white)] p-6 md:p-8"
      >
        {/* Tombol Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[var(--white-icon)] hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Konten Modal */}
        <div className="flex flex-col gap-4">
          <h3 className="text-3xl md:text-4xl font-medium">{project.title}</h3>
          <span className="py-1 px-3 text-sm text-[var(--white-icon)] bg-[var(--white-icon-tr)] rounded-full self-start">
            {project.status}
          </span>

          <div className="border-t border-neutral-700 pt-4">
            <h4 className="text-xl font-semibold mb-2 text-[var(--sec)]">
              Project Description
            </h4>
            <p className="text-neutral-300">{project.description}</p>
          </div>

          <div className="border-t border-neutral-700 pt-4">
            <h4 className="text-xl font-semibold mb-3 text-[var(--sec)]">
              Tools & Tecnologies
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool) => (
                <span
                  key={tool}
                  className="py-1 px-3 text-sm bg-neutral-700 rounded-md"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Tombol Link (Sama seperti di card) */}
          <div className="flex gap-4 mt-6 border-t border-neutral-700 pt-6">
            {/* Tombol GitHub */}
            {!project.privateRepo && project.link ? (
              <a
                target="_blank"
                href={project.link}
                aria-label="GitHub"
                rel="noopener noreferrer"
                className="flex-1 flex justify-center items-center gap-2 text-[var(--white-icon)] hover:text-white transition duration-300 ease-in-out border border-[var(--white-icon-tr)] p-3 rounded-xl bg-[#1414149c] hover:bg-[var(--white-icon-tr)]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-7"
                >
                  <path d="M24 12L18.3431 17.6569L16.9289 16.2426L21.1716 12L16.9289 7.75736L18.3431 6.34315L24 12ZM2.82843 12L7.07107 16.2426L5.65685 17.6569L0 12L5.65685 6.34315L7.07107 7.75736L2.82843 12ZM9.78845 21H7.66009L14.2116 3H16.3399L9.78845 21Z" />
                </svg>
                <span>Kode</span>
              </a>
            ) : (
              <div
                className="flex-1 flex justify-center items-center gap-2 text-neutral-500 border border-neutral-700 p-3 rounded-xl bg-[#14141450] cursor-not-allowed"
                title="Private Repository"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="size-7"
                >
                  <path d="M12 17a1.5 1.5 0 0 0 0-3 1.5 1.5 0 0 0 0 3zm6-6V9a6 6 0 1 0-12 0v2a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zm-8-2a4 4 0 1 1 8 0v2H10V9z" />
                </svg>
                <span>Private</span>
              </div>
            )}

            {/* Tombol Preview */}
            {project.preview ? (
              <a
                target="_blank"
                href={project.preview}
                aria-label="Preview"
                rel="noopener noreferrer"
                className="flex-1 flex justify-center items-center gap-2 text-[var(--white-icon)] hover:text-white transition duration-300 ease-in-out border border-[var(--white-icon-tr)] p-3 rounded-xl bg-[#1414149c] hover:bg-[var(--white-icon-tr)]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-7"
                >
                  <path d="M16.0037 9.41421L7.39712 18.0208L5.98291 16.6066L14.5895 8H7.00373V6H18.0037V17H16.0037V9.41421Z" />
                </svg>
                <span>Live Preview</span>
              </a>
            ) : (
              <div
                className="flex-1 flex justify-center items-center gap-2 text-neutral-500 border border-neutral-700 p-3 rounded-xl bg-[#14141450] cursor-not-allowed"
                title="Preview not available"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="size-7"
                >
                  <path d="M21.707 20.293 3.707 2.293 2.293 3.707l2.42 2.42A11.706 11.706 0 0 0 .62 12c1.73 4.35 6.36 7.5 11.38 7.5 2.17 0 4.26-.6 6.07-1.7l2.23 2.23 1.414-1.414zM12 17.5c-4.02 0-7.64-2.36-9.18-5.5a10.12 10.12 0 0 1 3.16-3.59l1.53 1.53A5 5 0 0 0 12 15a4.98 4.98 0 0 0 2.56-.7l1.41 1.41A10.73 10.73 0 0 1 12 17.5zM12 7a5 5 0 0 1 5 5 4.97 4.97 0 0 1-.32 1.73l1.55 1.55A10.93 10.93 0 0 0 23.38 12C21.65 7.65 17.02 4.5 12 4.5c-.8 0-1.6.07-2.36.2l1.65 1.65A5.07 5.07 0 0 1 12 7z" />
                </svg>
                <span>No Preview</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
