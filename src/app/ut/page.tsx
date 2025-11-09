"use client";

import FallingText from "@/components/FallingText";
import ScrollReveal from "@/components/ScrollReveal";
import { ParallaxScroll } from "@/components/ui/parallax-scroll";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

export default function UtPage() {
  const words = `Artia Jofi Fiorenthia`;

  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-24 pt-20 bg-neutral-950 text-white">
      {/* Hero Section */}
      <div className="min-h-[60vh] md:min-h-[70vh] flex items-center justify-center text-center">
        <TextGenerateEffect words={words} duration={1} />
      </div>

      {/* Quote Section */}
      <div className="h-screen flex flex-col sticky top-0 z-10 items-center justify-center pointer-events-none md:mt-52 mb-96">
        <div className="mx-auto text-xs   text-white leading-relaxed">
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
      </div>

      {/* Gallery Section */}
      <div className="relative z-30 bg-neutral-950 flex flex-col justify-center items-center py-16 md:py-24">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold mb-10">
          Our Gallery
        </h1>
        <ParallaxScroll className="w-full scrollbar-hidden" images={images} />
      </div>

      {/* Footer Spacer */}
      <div className="relative z-10 md:h-20 bg-neutral-950" />

      {/* Falling Text Section */}
      <div className="h-[20vh] sm:h-[70vh] flex items-center justify-center px-4">
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
