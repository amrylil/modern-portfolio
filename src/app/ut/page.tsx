"use client";

import FallingText from "@/components/FallingText";
import Ribbons from "@/components/Ribbons";
import ScrollReveal from "@/components/ScrollReveal";
import Stack from "@/components/Stack";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import BlurText from "@/components/ui/BlurText";
import { ParallaxScroll } from "@/components/ui/parallax-scroll";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { motion, useScroll, useTransform } from "framer-motion";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { useEffect, useRef, useState } from "react";
import Crosshair from "@/components/Crosshair";
import { Heart } from "lucide-react";

export default function UtPage() {
  const words = `Artia Jofi Fiorenthia `;

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const quoteRef = useRef(null);
  const { scrollY } = useScroll();
  const [range, setRange] = useState({ start: 1000, end: 1200 });

  const containerRef = useRef<HTMLDivElement | null>(null);

  // Tentukan range berbeda untuk HP dan Laptop
  useEffect(() => {
    const updateRange = () => {
      const width = window.innerWidth;

      if (width < 768) {
        // HP / tablet kecil
        setRange({ start: 600, end: 900 });
      } else if (width < 1024) {
        // tablet besar
        setRange({ start: 900, end: 1100 });
      } else {
        // laptop / desktop
        setRange({ start: 1000, end: 1200 });
      }
    };

    updateRange();
    window.addEventListener("resize", updateRange);

    return () => window.removeEventListener("resize", updateRange);
  }, []);

  const opacity = useTransform(scrollY, [range.start, range.end], [1, 0]);
  const blur = useTransform(
    scrollY,
    [range.start, range.end],
    ["blur(0px)", "blur(10px)"]
  );
  const y = useTransform(scrollY, [range.start, range.end], ["0%", "20%"]);

  const stackImage = [
    {
      id: 1,
      img: "images/ut/WhatsApp Image 2025-11-09 at 23.37.09_05e1f8fe.jpg",
    },
    {
      id: 2,
      img: "images/ut/WhatsApp Image 2025-11-09 at 23.37.09_c467960e.jpg",
    },
    {
      id: 3,
      img: "images/ut/WhatsApp Image 2025-11-09 at 23.42.33_f2eba214.jpg",
    },

    {
      id: 4,
      img: "images/ut/WhatsApp Image 2025-11-09 at 23.36.41_71e1abba.jpg",
    },
  ];

  return (
    <div ref={containerRef}>
      <Crosshair color="#ffffff" />
      <div className=" sm:px-8 md:px-16 lg:px-24 pt-20 bg-neutral-950 text-white">
        {/* Hero Section */}
        <BackgroundRippleEffect />

        <div className="min-h-[60vh] md:min-h-[70vh] flex items-center justify-center text-center">
          {/* <TextGenerateEffect words={words} duration={1} /> */}
          <BlurText
            text={words}
            delay={160}
            animateBy="words"
            direction="top"
            className="text-neutral-400 md:text-9xl font-bold flex justify-center  text-5xl md:mt-0 "
          />
        </div>
        {mounted && (
          <motion.div
            className="absolute top-[58%] left-1/2 -translate-x-[62%] -translate-y-1/2 z-40 mt-12 md:mt-0"
            initial={{ opacity: 0, y: -60, filter: "blur(20px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 1.2, duration: 0.5, ease: "easeOut" }}
          >
            <Stack
              randomRotation={true}
              sensitivity={180}
              sendToBackOnClick={false}
              cardDimensions={{ width: 200, height: 200 }}
              cardsData={stackImage}
            />
          </motion.div>
        )}
        {/* Quote Section */}
        <motion.div
          ref={quoteRef}
          style={{ opacity, filter: blur, y }}
          className="h-screen flex flex-col sticky top-0 z-10 items-center justify-center pointer-events-none md:mt-52 mb-96 px-4"
        >
          <div className="mx-auto text-xs text-white leading-relaxed">
            <ScrollReveal
              baseOpacity={0}
              enableBlur={true}
              baseRotation={5}
              blurStrength={10}
            >
              She is the woman I love the most after my family. To me, she is
              truly beautiful, kind, and rare. Even though we have different
              beliefs, my love for her never fades. I will always care for her,
              because she is the one who left a deep mark in my heart.
            </ScrollReveal>
          </div>
        </motion.div>

        {/* Gallery Section */}
        <a
          href="#"
          className="relative z-30 bg-neutral-950 flex flex-col justify-center items-center py-16 md:py-24"
        >
          <h1 className="text-2xl sm:text-xl md:text-5xl font-bold mb-10 ">
            Our Gallery
          </h1>
          <ParallaxScroll className="w-full scrollbar-hidden" images={images} />
        </a>

        {/* Footer Spacer */}
        <div className="relative z-10 md:h-20 bg-neutral-950" />

        <a
          href="#"
          className="relative group inline-block cursor-pointer select-none w-full my-52"
        >
          {/* Teks default */}
          <span className="block text-5xl font-extrabold text-center tracking-widest text-white uppercase transition-all duration-500 group-hover:opacity-0 group-hover:-translate-y-4 group-hover:blur-sm">
            Hover Me
          </span>

          {/* Teks saat hover */}
          <span className="absolute top-0 left-0 w-full text-center text-red-500 text-6xl font-extrabold uppercase opacity-0 translate-y-6 scale-90 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 drop-shadow-[0_0_10px_rgba(255,0,0,0.6)] ">
            I Love You Sayang
          </span>
        </a>

        {/* Falling Text Section */}
        <div className="h-[25vh] sm:h-[50vh] flex items-center justify-center px-4">
          <FallingText
            text={`Tiaa, I love you so much. You mean a lot to me, more than you can imagine. I’ll always care about you.`}
            highlightWords={[
              "Tiaa",
              "love",
              "so",
              "much",
              "mean",
              "lot",
              "care",
              "you",
            ]}
            trigger="hover"
            backgroundColor="transparent"
            wireframes={false}
            gravity={0.56}
            fontSize="clamp(1.25rem, 3vw, 2rem)" // ukuran teks fleksibel
            mouseConstraintStiffness={0.9}
          />
        </div>
      </div>
    </div>
  );
}

const images = [
  "images/ut/WhatsApp Image 2025-11-09 at 23.36.38_0566deec.jpg",
  "images/ut/WhatsApp Image 2025-11-09 at 23.36.41_0c09f5d8.jpg",
  "images/ut/WhatsApp Image 2025-11-09 at 23.36.41_71e1abba.jpg",
  "images/ut/WhatsApp Image 2025-11-09 at 23.42.32_862b47f3.jpg",
  "images/ut/WhatsApp Image 2025-11-09 at 23.42.32_99856cb1.jpg",
  "images/ut/WhatsApp Image 2025-11-09 at 23.42.32_c3fd5235.jpg",
  "images/ut/WhatsApp Image 2025-11-09 at 23.42.33_153b174c.jpg",
  "images/ut/WhatsApp Image 2025-11-09 at 23.36.54_2422b518.jpg",
  "images/ut/WhatsApp Image 2025-11-09 at 23.36.54_9c9eee12.jpg",
  "images/ut/WhatsApp Image 2025-11-09 at 23.36.58_fc1e7246.jpg",
  "images/ut/WhatsApp Image 2025-11-09 at 23.37.00_5b66ef8d.jpg",
  "images/ut/WhatsApp Image 2025-11-09 at 23.37.00_657a0779.jpg",
  "images/ut/WhatsApp Image 2025-11-09 at 23.37.08_e0dd62df.jpg",
  "images/ut/WhatsApp Image 2025-11-09 at 23.37.09_05e1f8fe.jpg",
  "images/ut/WhatsApp Image 2025-11-09 at 23.37.09_c467960e.jpg",
  "images/ut/WhatsApp Image 2025-11-09 at 23.37.11_e4124ebf.jpg",
  "images/ut/WhatsApp Image 2025-11-09 at 23.37.13_be87276f.jpg",
  "images/ut/WhatsApp Image 2025-11-09 at 23.37.14_7071ad8c.jpg",
  "images/ut/WhatsApp Image 2025-11-09 at 23.37.15_aaba3aff.jpg",
  "images/ut/WhatsApp Image 2025-11-09 at 23.37.16_93c7e4b6.jpg",
  "images/ut/WhatsApp Image 2025-11-09 at 23.40.38_8b96f5ff.jpg",
  "images/ut/WhatsApp Image 2025-11-09 at 23.41.22_117743fb.jpg",
  "images/ut/WhatsApp Image 2025-11-09 at 23.41.22_ceb167e7.jpg",
  "images/ut/WhatsApp Image 2025-11-09 at 23.42.27_3656b878.jpg",
  "images/ut/WhatsApp Image 2025-11-09 at 23.42.28_1fa53321.jpg",
  "images/ut/WhatsApp Image 2025-11-09 at 23.42.28_830ec479.jpg",
  "images/ut/WhatsApp Image 2025-11-09 at 23.42.28_c9afdeb2.jpg",
  "images/ut/WhatsApp Image 2025-11-09 at 23.42.29_15edf4d2.jpg",
  "images/ut/WhatsApp Image 2025-11-09 at 23.42.29_adcf5e72.jpg",
  "images/ut/WhatsApp Image 2025-11-09 at 23.42.30_c6cae063.jpg",
  "images/ut/WhatsApp Image 2025-11-09 at 23.42.31_3270d24a.jpg",
  "images/ut/WhatsApp Image 2025-11-09 at 23.42.31_68a2baf5.jpg",
  "images/ut/WhatsApp Image 2025-11-09 at 23.42.31_a40fb3a6.jpg",
];
