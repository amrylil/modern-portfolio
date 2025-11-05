"use client";
// 1. Impor 'Variants' dari framer-motion
import { motion, Variants } from "framer-motion";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { SiGithub, SiLinkedin, SiMailboxdotorg } from "react-icons/si";
import LogoLoop from "@/components/ui/LogoLoop";
import BlurText from "@/components/ui/BlurText";
import { techLogos } from "@/mock/data";

// 2. Tambahkan tipe ': Variants' ke konstanta Anda
const iconContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
};

// 3. Tambahkan tipe ': Variants' di sini juga
const iconVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 },
  },
  exit: {
    y: 20,
    opacity: 0,
  },
};

export function HomeSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full flex-col items-start justify-start overflow-hidden bg-black "
    >
      <BackgroundRippleEffect />
      <div className="md:mt-28 mt-24 w-full md:px-20 px-5">
        <div className="max-w-7xl mx-auto w-full z-10">
          <div className="flex gap-2 justify-center items-center flex-col md:flex-row">
            <div className="order-2 md:order-1 flex flex-col justify-center items-center md:items-start">
              <BlurText
                text="Hi, I'm Ulil Amry Al Qadri"
                delay={160}
                animateBy="words"
                direction="top"
                className="text-neutral-400 md:text-lg"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-4">
                <BlurText
                  text="Software Developer"
                  delay={150}
                  animateBy="words"
                  direction="top"
                  className="text-5xl md:text-8xl tracking-tighter hidden md:flex"
                />

                <div className="flex flex-col justify-center items-center md:hidden">
                  <BlurText
                    text="Software"
                    delay={150}
                    animateBy="letters"
                    direction="top"
                    className="text-5xl  tracking-tighter "
                  />
                  <BlurText
                    text="Developer"
                    delay={150}
                    animateBy="letters"
                    direction="top"
                    className="text-5xl tracking-tighter "
                  />
                </div>
              </div>

              {/* --- ANIMASI IKON SOSMED DIMULAI --- */}
              <motion.div
                className="flex flex-row gap-4 md:mt-12 mt-8 "
                variants={iconContainerVariants} // Sekarang ini sudah benar tipenya
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <motion.a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3  border border-gray-800 rounded hover:bg-neutral-700 transition-colors z-10"
                  variants={iconVariants} // Sekarang ini sudah benar tipenya
                >
                  <SiGithub className="h-6 w-6" />
                </motion.a>
                <motion.a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3  border border-gray-800 rounded hover:bg-neutral-700 transition-colors z-10"
                  variants={iconVariants} // Sekarang ini sudah benar tipenya
                >
                  <SiLinkedin className="h-6 w-6" />
                </motion.a>
                <motion.a
                  href="mailto:email@anda.com"
                  className="p-3  border border-gray-800 rounded hover:bg-neutral-700 transition-colors z-10"
                  variants={iconVariants} // Sekarang ini sudah benar tipenya
                >
                  <SiMailboxdotorg className="h-6 w-6" />
                </motion.a>
              </motion.div>
              {/* --- ANIMASI IKON SOSMED SELESAI --- */}
            </div>

            {/* --- ANIMASI GAMBAR DAN SVG DIMULAI --- */}
            <motion.div
              className="relative md:p-8 p-6 -translate-y-10 order-1 md:order-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className=" md:h-[450px] md:w-[450px] h-[230px] w-[230px] overflow-hidden transition-all rounded-lg mix-blend-lighten">
                <img
                  src="images/anuku2.png"
                  alt="photo"
                  className="overflow-hidden z-40 filter shadow-inner 0 grayscale brightness-75"
                />
              </div>

              <motion.svg
                className="md:w-[450px] w-[250px] absolute md:top-14 md:right-9 top-7 right-4"
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
            </motion.div>
            {/* --- ANIMASI GAMBAR DAN SVG SELESAI --- */}
          </div>

          {/* --- ANIMASI LOGOLOOP 1 (DESKTOP) --- */}
          <motion.div
            className="mt-10 "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
          >
            <LogoLoop
              logos={techLogos}
              speed={30}
              direction="left"
              logoHeight={18}
              gap={30}
              pauseOnHover
              scaleOnHover={true}
              fadeOut
              fadeOutColor="black"
              ariaLabel="Technology partners"
            />
          </motion.div>

          {/* --- ANIMASI LOGOLOOP 2 (MOBILE) --- */}
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <LogoLoop
              logos={techLogos}
              speed={30}
              direction="right"
              logoHeight={18}
              gap={30}
              pauseOnHover
              scaleOnHover={true}
              fadeOut
              fadeOutColor="black"
              ariaLabel="Technology partners"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
