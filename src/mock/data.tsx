"use client";

import BlurText from "@/components/ui/BlurText";
import {
  SiGo,
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

export const testimonials = [
  {
    quote:
      "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
    name: "Gabriel Riswanda",
    title: "Client — Sruput Application",
  },
  {
    quote:
      "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
    name: "Harry Habil",
    title: "Master — Help Everything",
  },
  {
    quote: "All that we see or seem is but a dream within a dream.",
    name: "Artia Jofi",
    title: "Client — Skincare App",
  },
  {
    quote:
      "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
    name: "Zea Van Boukering",
    title: "Owner — Mintol App",
  },
  {
    quote:
      "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
    name: "Ismail Al Buraika",
    title: "Client — Cloth E-Commerce",
  },
];

export const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  {
    node: <SiTypescript />,
    title: "TypeScript",
    href: "https://www.typescriptlang.org",
  },
  {
    node: <SiTailwindcss />,
    title: "Tailwind CSS",
    href: "https://tailwindcss.com",
  },
  {
    node: <SiGo />,
    title: "Golang",
    href: "https://golang.com",
  },
];

export const products = [
  {
    title: "Sruput",
    link: "https://sruput.gleeze.com",
    thumbnail: "images/project/sruput.jpg",
  },
  {
    title: "Digital Hero",
    link: "https://digitalhero.id",
    thumbnail: "images/project/fronthero.png",
  },
  {
    title: "Hero Hub - Digital Hero",
    link: "https://learn.digitalhero.id",
    thumbnail: "images/project/learnhero.png",
  },

  {
    title: "Portal - Digital Hero",
    link: "https://portal.digitalhero.id",
    thumbnail: "images/project/portalhero.png",
  },
  {
    title: "Helpdesk - LLDIKTI IX",
    link: "https://learn.digitalhero.id",
    thumbnail: "images/project/helpdesk.png",
  },
  {
    title: "Pixel Perfect",
    link: "https://app.pixelperfect.quest",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/pixelperfect.png",
  },

  {
    title: "Algochurn",
    link: "https://algochurn.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/algochurn.png",
  },
  {
    title: "Aceternity UI",
    link: "https://ui.aceternity.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/aceternityui.png",
  },
  {
    title: "Tailwind Master Kit",
    link: "https://tailwindmasterkit.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/tailwindmasterkit.png",
  },
  {
    title: "SmartBridge",
    link: "https://smartbridgetech.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/smartbridge.png",
  },
  {
    title: "Renderwork Studio",
    link: "https://renderwork.studio",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/renderwork.png",
  },

  {
    title: "Creme Digital",
    link: "https://cremedigital.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/cremedigital.png",
  },
  {
    title: "Golden Bells Academy",
    link: "https://goldenbellsacademy.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/goldenbellsacademy.png",
  },
  {
    title: "Invoker Labs",
    link: "https://invoker.lol",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/invoker.png",
  },
  {
    title: "E Free Invoice",
    link: "https://efreeinvoice.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/efreeinvoice.png",
  },
];
export const timelineData = [
  {
    title: "2024",
    content: (
      <div>
        <BlurText
          text="As a Backend Developer Intern at LLDIKTI Wilayah IX through the MSIB
          Batch 7 program, I was responsible for developing and maintaining web
          applications. My primary tech stack included Golang (using the Gin
          framework) for building robust APIs, React for the frontend interface,
          and Microsoft SQL Server for database management."
          delay={3}
          animateBy="words"
          direction="top"
          className="mb-4 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200 w-full justify-start"
        />

        <div className="grid grid-cols-2 gap-4">
          <img
            src="images/sisfoy.jpg"
            alt="startup template"
            width={500}
            height={500}
            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60 filter brightness-75  transition-all duration-300 "
          />
          <img
            src="images/project/helpdesk.png"
            alt="startup template"
            width={500}
            height={500}
            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60 filter brightness-75  transition-all duration-300 "
          />
          <img
            src="images/sertif.png"
            alt="startup template"
            width={500}
            height={500}
            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60 filter brightness-75  transition-all duration-300 "
          />
          <img
            src="images/sisfoy2.jpg"
            alt="startup template"
            width={500}
            height={500}
            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60 filter brightness-75  transition-all duration-300 "
          />
        </div>
      </div>
    ),
  },
  {
    title: "Early 2025",
    content: (
      <div>
        <BlurText
          text="I successfully completed the AWS re/Start program, an intensive,
          full-time skills development program focused on cloud computing.
          Delivered by Future Academy, the curriculum provided hands-on
          experience with AWS services, Linux, Python, and database
          fundamentals, preparing me for a career in cloud infrastructure and
          development."
          delay={3}
          animateBy="words"
          direction="top"
          className="mb-4 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200 w-full justify-start"
        />

        <div className="grid grid-cols-2 gap-4">
          <img
            src="images/awsmeet.png"
            alt="hero template"
            width={500}
            height={500}
            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60 filter brightness-75  transition-all duration-300 "
          />
          <img
            src="images/aws-sertif.jpeg"
            alt="feature template"
            width={500}
            height={500}
            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60 filter brightness-75  transition-all duration-300 "
          />
          <img
            src="images/arch.png"
            alt="bento template"
            width={500}
            height={500}
            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60 filter brightness-75  transition-all duration-300 "
          />
          <img
            src="images/awsmeet.png"
            alt="cards template"
            width={500}
            height={500}
            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60 filter brightness-75  transition-all duration-300 "
          />
        </div>
      </div>
    ),
  },
  {
    title: "Mid 2025",
    content: (
      <div>
        <BlurText
          text="As a Lead Fullstack Developer Intern at Digitalhero Indonesia
          (Remote), I managed projects using a modern stack including
          TypeScript, Express.js, React, Bun, and PostgreSQL. A key
          responsibility was single-handedly handling the deployment of four
          separate applications, for which I successfully implemented automated
          CI/CD pipelines using Docker."
          delay={3}
          animateBy="words"
          direction="top"
          className="mb-4 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200 w-full justify-start"
        />

        <div className="grid grid-cols-2 gap-4">
          <img
            src="images/digitalhero.jpg"
            alt="hero template"
            width={500}
            height={500}
            className="h-20 w-full rounded-lg object-contain shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60 filter brightness-75  transition-all duration-300 "
          />
          <img
            src="images/project/fronthero.png"
            alt="feature template"
            width={500}
            height={500}
            className="h-20 w-full rounded-lg object-contain shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60 filter brightness-75  transition-all duration-300 "
          />
          <img
            src="images/project/learnhero.png"
            alt="bento template"
            width={500}
            height={500}
            className="h-20 w-full rounded-lg object-contain shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60 filter brightness-75  transition-all duration-300 "
          />
          <img
            src="images/project/portalhero.png"
            alt="cards template"
            width={500}
            height={500}
            className="h-20 w-full rounded-lg object-contain shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60 filter brightness-75  transition-all duration-300 "
          />
        </div>
      </div>
    ),
  },
];
