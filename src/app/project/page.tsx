"use client";

import { ProjectModal } from "@/components/ui/project-modal";
import React, { useState } from "react";

export interface Project {
  title: string;
  image: string;
  link?: string;
  preview?: string;
  status: string;
  privateRepo?: boolean;
  description: string;
  tools: string[];
}

const projects: Project[] = [
  {
    title: "Portal Digital Hero",
    image: "/images/project/portalhero.png",
    link: "",
    preview: "https://portal.digitalhero.id",
    status: "Deployed",
    privateRepo: true,
    description:
      "Portal Digital Hero adalah platform terpusat untuk layanan kami, menyediakan akses mudah ke berbagai fitur dan informasi bagi pengguna.",
    tools: ["React.js", "Tailwind CSS", "Bun", "Express.js", "PostgreSQL"],
  },
  {
    title: "Helpdesk LLDIKTI IX Demo",
    image: "/images/project/helpdesk.png",
    link: "",
    preview: "https://cshelpdesk-fe-v-2-2024-forked.vercel.app/",
    status: "On Development",
    privateRepo: true,
    description:
      "Sistem helpdesk untuk LLDIKTI IX yang bertujuan untuk mendemonstrasikan alur tiket dan manajemen dukungan pelanggan yang efisien.",
    tools: [
      "React.js",
      "Tailwind CSS",
      "Golang",
      "Gin",
      "Microsoft SQL Server",
    ],
  },
  {
    title: "Hero Hub - Digital Hero",
    image: "/images/project/learnhero.png",
    link: "",
    preview: "https://learn.digitalhero.id",
    status: "Contributor",
    privateRepo: true,
    description:
      "Platform Learning Management System (LMS) dari Digital Hero, di mana saya berkontribusi dalam pengembangan fitur-fitur utama.",
    tools: ["React.js", "Tailwind CSS", "Bun", "Express.js", "PostgreSQL"],
  },
  {
    title: "Digital Hero App",
    image: "/images/project/fronthero.png",
    link: "",
    preview: "https://digitalhero.id",
    status: "Deployed",
    privateRepo: true,
    description:
      "Website utama Digital Hero yang menampilkan profil perusahaan, layanan, dan portofolio. Dibangun dengan fokus pada kecepatan dan SEO.",
    tools: [
      "React.js",
      "TypeScript",
      "Tailwind CSS",
      "Bun",
      "Express.js",
      "PostgreSQL",
    ],
  },
  {
    title: "Sruput",
    image: "/images/project/sruput.jpg",
    link: "https://github.com/amrylil/coffeshop",
    preview: "https://sruput.gleeze.com/",
    status: "Deployed",
    description:
      "Aplikasi pemesanan kopi fiktif 'Sruput'. Pengguna dapat menelusuri menu, menambahkan ke troli, dan melakukan checkout.",
    tools: ["Laravel", "Inertia.js", "Vue.js", "TypeScript", "PostgreSQL"],
  },
  {
    title: "Liltech - Portfolio Website",
    image: "/images/project/liltech.png",
    link: "https://github.com/amrylil/modern-portfolio",
    preview: "https://liltech.me/",
    status: "Deployed",
    description:
      "Website portofolio pribadi saya sebelumnya, menampilkan proyek dan keahlian saya dengan desain yang modern dan responsif.",
    tools: ["Next.js", "Framer Motion", "Tailwind CSS", "Vercel"],
  },
  {
    title: "Kerjamail Clone - Test Case",
    image: "/images/project/kerjamail.png",
    link: "https://github.com/amrylil/dashboard_kerjamail",
    preview: "https://kerjamail.vercel.app/",
    status: "Deployed",
    description:
      "Sebuah test case di mana saya membuat klon UI dari dashboard Kerjamail. Fokus pada replikasi desain dan fungsionalitas frontend.",
    tools: ["React.js", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Hotel App",
    image: "/images/project/hotel.png",
    link: "https://github.com/amrylil/reservasi_hotel",
    preview: "",
    status: "Deployed",
    description:
      "Aplikasi reservasi hotel sederhana. Ini adalah salah satu proyek awal saya untuk mempraktikkan CRUD dan manajemen state.",
    tools: ["Laravel", "Tailwind CSS", "MySQL"],
  },
  {
    title: "Donor App",
    image: "/images/project/donor.jpg",
    link: "https://github.com/amrylil/modern-portfolio",
    preview: "",
    status: "Deployed",
    description:
      "Aplikasi untuk memfasilitasi donor darah, menghubungkan pendonor dengan mereka yang membutuhkan.",
    tools: ["Golang", "Gin", "Flutter"],
  },
];

const ProjectsPage: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section
      id="projects"
      className="py-12 border-t border-[#ffffff10] text-[var(--white)]"
    >
      <div className="md:px-24 px-5 mx-auto md:mt-20 mt-10">
        <h2 className="text-lg text-[var(--sec)] mb-2 shiny-sec">My work</h2>
        <h3 className="text-4xl md:text-5xl font-medium mb-8">Projects</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.title}
              className="group p-3 border border-neutral-600 rounded-lg cursor-pointer transition-all duration-300 hover:border-neutral-400"
              onClick={() => setSelectedProject(project)}
            >
              {project.preview ? (
                <div className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 mb-4 p-3">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 md:h-72 object-cover group-hover:scale-105 transition-transform duration-300 rounded-lg"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="overflow-hidden shadow-lg transition-shadow duration-300 mb-4 p-3 opacity-70">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 md:h-72 object-cover rounded-lg"
                    loading="lazy"
                  />
                </div>
              )}

              <div className="flex items-center px-3">
                <div className="flex-grow">
                  <h4 className="text-2xl font-semibold">{project.title}</h4>
                  <span className="py-1 text-sm text-[var(--white-icon)]">
                    {project.status}
                  </span>
                </div>

                <div className="flex gap-2 ml-auto">
                  {!project.privateRepo && project.link ? (
                    <a
                      target="_blank"
                      href={project.link}
                      aria-label="GitHub"
                      rel="noopener noreferrer"
                      className="size-14 flex justify-center items-center text-[var(--white-icon)] hover:text-white transition duration-300 ease-in-out border border-[var(--white-icon-tr)] p-3 rounded-xl bg-[#1414149c] hover:bg-[var(--white-icon-tr)]"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-7"
                      >
                        <path d="M24 12L18.3431 17.6569L16.9289 16.2426L21.1716 12L16.9289 7.75736L18.3431 6.34315L24 12ZM2.82843 12L7.07107 16.2426L5.65685 17.6569L0 12L5.65685 6.34315L7.07107 7.75736L2.82843 12ZM9.78845 21H7.66009L14.2116 3H16.3399L9.78845 21Z" />
                      </svg>
                    </a>
                  ) : (
                    <div
                      className="size-14 flex justify-center items-center text-neutral-500 border border-neutral-700 p-3 rounded-xl bg-[#14141450] cursor-not-allowed"
                      title="Private Repository"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className="size-7"
                      >
                        <path d="M12 17a1.5 1.5 0 0 0 0-3 1.5 1.5 0 0 0 0 3zm6-6V9a6 6 0 1 0-12 0v2a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zm-8-2a4 4 0 1 1 8 0v2H10V9z" />
                      </svg>
                    </div>
                  )}

                  {project.preview ? (
                    <a
                      target="_blank"
                      href={project.preview}
                      aria-label="Preview"
                      rel="noopener noreferrer"
                      className="size-14 flex justify-center items-center text-[var(--white-icon)] hover:text-white transition duration-300 ease-in-out border border-[var(--white-icon-tr)] p-3 rounded-xl bg-[#1414149c] hover:bg-[var(--white-icon-tr)]"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-7"
                      >
                        <path d="M16.0037 9.41421L7.39712 18.0208L5.98291 16.6066L14.5895 8H7.00373V6H18.0037V17H16.0037V9.41421Z" />
                      </svg>
                    </a>
                  ) : (
                    <div
                      className="size-14 flex justify-center items-center text-neutral-500 border border-neutral-700 p-3 rounded-xl bg-[#14141450] cursor-not-allowed"
                      title="Preview not available"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className="size-7"
                      >
                        <path d="M21.707 20.293 3.707 2.293 2.293 3.707l2.42 2.42A11.706 11.706 0 0 0 .62 12c1.73 4.35 6.36 7.5 11.38 7.5 2.17 0 4.26-.6 6.07-1.7l2.23 2.23 1.414-1.414zM12 17.5c-4.02 0-7.64-2.36-9.18-5.5a10.12 10.12 0 0 1 3.16-3.59l1.53 1.53A5 5 0 0 0 12 15a4.98 4.98 0 0 0 2.56-.7l1.41 1.41A10.73 10.73 0 0 1 12 17.5zM12 7a5 5 0 0 1 5 5 4.97 4.97 0 0 1-.32 1.73l1.55 1.55A10.93 10.93 0 0 0 23.38 12C21.65 7.65 17.02 4.5 12 4.5c-.8 0-1.6.07-2.36.2l1.65 1.65A5.07 5.07 0 0 1 12 7z" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <a
          target="_blank"
          href="https://github.com/amrylil?tab=repositories"
          aria-label="GitHub"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 mt-9 text-[var(--white-icon)] hover:text-white transition duration-300 ease-in-out border border-[var(--white-icon-tr)] p-3 rounded-full bg-[#1414149c] hover:bg-[var(--white-icon-tr)] hover:scale-105"
        >
          <span className="md:text-lg text-md">More projects on</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path d="M12.001 2C6.47598 2 2.00098 6.475 2.00098 12C2.00098 16.425 4.86348 20.1625 8.83848 21.4875C9.33848 21.575 9.52598 21.275 9.52598 21.0125C9.52598 20.775 9.51348 19.9875 9.51348 19.15C7.00098 19.6125 6.35098 18.5375 6.15098 17.975C6.03848 17.6875 5.55098 16.8 5.12598 16.5625C4.77598 16.375 4.27598 15.9125 5.11348 15.9C5.90098 15.8875 6.46348 16.625 6.65098 16.925C7.55098 18.4375 8.98848 18.0125 9.56348 17.75C9.65098 17.1 9.91348 16.6625 10.201 16.4125C7.97598 16.1625 5.65098 15.3 5.65098 11.475C5.65098 10.3875 6.03848 9.4875 6.67598 8.7875C6.57598 8.5375 6.22598 7.5125 6.77598 6.1375C6.77598 6.1375 7.61348 5.875 9.52598 7.1625C10.326 6.9375 11.176 6.825 12.026 6.825C12.876 6.825 13.726 6.9375 14.526 7.1625C16.4385 5.8625 17.276 6.1375 17.276 6.1375C17.826 7.5125 17.476 8.5375 17.376 8.7875C18.0135 9.4875 18.401 10.375 18.401 11.475C18.401 15.3125 16.0635 16.1625 13.8385 16.4125C14.201 16.725 14.5135 17.325 14.5135 18.2625C14.5135 19.6 14.501 20.675 14.501 21.0125C14.501 21.275 14.6885 21.5875 15.1885 21.4875C19.259 20.1133 21.9999 16.2963 22.001 12C22.001 6.475 17.526 2 12.001 2Z"></path>
          </svg>
        </a>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};

export default ProjectsPage;
