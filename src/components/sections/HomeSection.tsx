"use client";
import { motion } from "framer-motion";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { SiGithub, SiLinkedin, SiMailboxdotorg } from "react-icons/si";
import LogoLoop from "@/components/ui/LogoLoop";
import BlurText from "@/components/ui/BlurText";
import { techLogos } from "@/mock/data";

export function HomeSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full flex-col items-start justify-start overflow-hidden bg-black "
    >
      <BackgroundRippleEffect />
      <div className="mt-20 w-full px-20">
        <div className="max-w-7xl mx-auto w-full z-10">
          <div className="flex gap-2 justify-center items-center">
            <div className="">
              <BlurText
                text="Hi, I'm Ulil Amry Al Qadri"
                delay={160}
                animateBy="words"
                direction="top"
                className="text-neutral-400 text-lg"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-4">
                <BlurText
                  text="Software Developer"
                  delay={150}
                  animateBy="words"
                  direction="top"
                  className="text-6xl md:text-8xl tracking-tighter"
                />
              </div>

              <div className="flex flex-row gap-4 mt-12">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3  border border-gray-800 rounded hover:bg-neutral-700 transition-colors z-10"
                >
                  <SiGithub className="h-6 w-6" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3  border border-gray-800 rounded hover:bg-neutral-700 transition-colors z-10"
                >
                  <SiLinkedin className="h-6 w-6" />
                </a>
                <a
                  href="mailto:email@anda.com"
                  className="p-3  border border-gray-800 rounded hover:bg-neutral-700 transition-colors z-10"
                >
                  <SiMailboxdotorg className="h-6 w-6" />
                </a>
              </div>
            </div>
            <div className="relative md:p-8 p-6 -translate-y-10">
              <div className=" md:h-[450px] md:w-[450px] h-[230px] w-[230px] overflow-hidden   transition-all animate-fade-up animate-once animate-duration-[1000ms] rounded-lg mix-blend-lighten">
                <img
                  src="images/anuku2.png"
                  alt="photo"
                  className="overflow-hidden z-40 filter shadow-inner 0 grayscale brightness-75"
                />
              </div>

              <motion.svg
                className="transition-all animate-fade-up animate-once animate-duration-[2000ms] md:w-[450px] w-350px] absolute md:top-14 md:right-9 top-7 right-3"
                fill="transparent"
                viewBox="0 0 506 506"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.circle
                  cy="253"
                  cx="253"
                  r="250"
                  stroke="#ffffff"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ strokeDasharray: "24 10 0 0" }}
                  animate={{
                    strokeDasharray: [
                      "15 120 25 25",
                      "16 25 92 72",
                      "4 250 22 22",
                    ],
                    rotate: [120, 360],
                  }}
                  transition={{
                    duration: 60,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                ></motion.circle>
              </motion.svg>
            </div>
          </div>

          <LogoLoop
            className="mt-10 "
            logos={techLogos}
            speed={30}
            direction="left"
            logoHeight={48}
            gap={40}
            pauseOnHover
            scaleOnHover
            fadeOut
            fadeOutColor="black"
            ariaLabel="Technology partners"
          />
        </div>
      </div>
    </section>
  );
}
