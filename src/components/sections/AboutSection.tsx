"use client";
import { Timeline } from "@/components/ui/timeline";
import { timelineData } from "@/mock/data";
import GitHubProfile from "./GitHubProfile";

import GitHubCalendar from "react-github-calendar";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

import { useTheme } from "@/components/theme-provider";

export function AboutSection() {
  const { resolvedTheme } = useTheme();

  return (
    <motion.section
      id="about"
      className="md:py-20 font-mono md:px-20 px-5 text-neutral-900 dark:text-neutral-100"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="flex flex-col items-center max-w-7xl mx-auto">
        <motion.h2
          className="md:text-7xl text-4xl tracking-tighter text-center md:mb-16 mb-5 bg-clip-text text-transparent bg-linear-to-r from-neutral-900 via-neutral-700 to-neutral-500 dark:from-neutral-50 dark:to-neutral-400 font-bold"
          variants={itemVariants}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0 }}
        >
          About Me
        </motion.h2>

        <motion.p
          className="font-light text-sm md:text-lg w-full text-justify hidden md:block text-neutral-700 dark:text-neutral-300 leading-relaxed"
          variants={itemVariants}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          I am a passionate Software Developer with strong expertise in backend development, primarily using Golang, Laravel, and JavaScript to build reliable and high-performance web applications. I have hands-on experience in designing and developing RESTful APIs, optimizing database performance, and integrating modern tools such as Express.js, React, Docker, and CI/CD pipelines to streamline development workflows. My interest in programming began with curiosity about how websites and systems work, which later grew into a deep commitment to mastering backend engineering and software architecture. Born on November 11, 2003, in North Kolaka, Southeast Sulawesi, I am currently pursuing a degree in Informatics Engineering at Universitas Dipa Makassar, where I continue to expand my technical knowledge and practical experience through academic projects and personal explorations. I strive to write clean, efficient, and maintainable code while constantly learning new technologies that enhance scalability and user experience. With a strong work ethic, attention to detail, and a passion for continuous growth, I aim to contribute meaningfully to teams and projects that create innovative and impactful digital solutions.
        </motion.p>

        <motion.p
          className="font-light text-xs md:text-lg w-full text-justify md:hidden text-neutral-700 dark:text-neutral-300 leading-relaxed"
          variants={itemVariants}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          I am a passionate Software Developer with strong expertise in backend
          development, primarily using Golang, Laravel, and JavaScript to build
          reliable and high-performance web applications. I have hands-on
          experience in designing and developing RESTful APIs, optimizing
          database performance, and integrating modern tools such as Express.js,
          React, Docker, and CI/CD pipelines to streamline development
          workflows. My interest in programming began with curiosity about how
          websites and systems work, which later grew into a deep commitment to
          mastering backend engineering and software architecture. Born on November 11, 2003, in North Kolaka, Southeast Sulawesi, I am currently pursuing a degree in Informatics Engineering at Universitas Dipa Makassar, where I continue to expand my technical knowledge and practical experience.
        </motion.p>

        <motion.div
          className="flex flex-col md:flex-row rounded-xl shadow-sm dark:shadow-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-950/40 p-4 md:p-6 my-16 gap-7 w-full"
          variants={itemVariants}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
        >
          <GitHubProfile />
          <div className="w-full overflow-x-auto flex items-center">
            <GitHubCalendar username="amrylil" colorScheme={resolvedTheme} />
          </div>
        </motion.div>
      </div>

      <Timeline data={timelineData} />
    </motion.section>
  );
}
