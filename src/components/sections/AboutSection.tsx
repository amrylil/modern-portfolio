"use client";
import { Timeline } from "@/components/ui/timeline";
import { timelineData } from "@/mock/data";
import BlurText from "../ui/BlurText";
import GitHubProfile from "./GitHubProfile";

import GitHubCalendar from "react-github-calendar";
import { motion } from "framer-motion";

export function AboutSection() {
  return (
    <section id="about" className="md:py-20  font-mono ">
      <div className="flex flex-col items-center px-4 sm:px-8 md:px-12 lg:px-20">
        <BlurText
          text="About Me"
          delay={160}
          animateBy="words"
          direction="top"
          className="md:text-7xl text-4xl tracking-tighter text-center md:mb-16 mb-5 bg-clip-text from-neutral-50 to-neutral-400"
        />

        <BlurText
          className="font-light text-xs md:text-lg w-full justify-between hidden md:flex"
          text="I am a passionate Software Developer with strong expertise in backend development, primarily using Golang, Laravel, and JavaScript to build reliable and high-performance web applications. I have hands-on experience in designing and developing RESTful APIs, optimizing database performance, and integrating modern tools such as Express.js, React, Docker, and CI/CD pipelines to streamline development workflows. My interest in programming began with curiosity about how websites and systems work, which later grew into a deep commitment to mastering backend engineering and software architecture. Born on November 11, 2003, in North Kolaka, Southeast Sulawesi, I am currently pursuing a degree in Informatics Engineering at Universitas Dipa Makassar, where I continue to expand my technical knowledge and practical experience through academic projects and personal explorations. I strive to write clean, efficient, and maintainable code while constantly learning new technologies that enhance scalability and user experience. With a strong work ethic, attention to detail, and a passion for continuous growth, I aim to contribute meaningfully to teams and projects that create innovative and impactful digital solutions."
          delay={10}
        />

        <p className="font-light text-xs md:text-lg w-full text-justify md:hidden blur-text">
          I am a passionate Software Developer with strong expertise in backend
          development, primarily using Golang, Laravel, and JavaScript to build
          reliable and high-performance web applications. I have hands-on
          experience in designing and developing RESTful APIs, optimizing
          database performance, and integrating modern tools such as Express.js,
          React, Docker, and CI/CD pipelines to streamline development
          workflows. My interest in programming began with curiosity about how
          websites and systems work, which later grew into a deep commitment to
          mastering backend engineering{" "}
        </p>
        <motion.div
          className="flex flex-col md:flex-row rounded-lg shadow-lg border border-neutral-800 p-4 md:p-6 my-16 gap-7 w-full"
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.5, ease: "easeIn", delay: 0.5 }}
          viewport={{ once: true }}
        >
          <GitHubProfile />
          <div className="w-full overflow-x-auto ">
            <GitHubCalendar username="amrylil" />
          </div>
        </motion.div>
      </div>
      <div className="relative w-full overflow-clip mx-auto">
        <Timeline data={timelineData} />
      </div>
    </section>
  );
}
