"use client";
import { useScroll, useTransform, motion } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export const ParallaxScroll = ({
  images,
  className,
}: {
  images: string[];
  className?: string;
}) => {
  const gridRef = useRef<any>(null);

  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: gridRef,
    offset: ["start end", "end start"],
  });

  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const translateThird = useTransform(scrollYProgress, [0, 1], [0, -200]);

  // Bagi gambar ke 3 bagian tetap, agar parallax tidak hilang
  const third = Math.ceil(images.length / 3);
  const firstPart = images.slice(0, third);
  const secondPart = images.slice(third, 2 * third);
  const thirdPart = images.slice(2 * third);

  return (
    <section
      ref={gridRef}
      className={cn(
        "relative w-full flex justify-center items-start py-20 sm:py-32",
        className
      )}
    >
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto px-4 sm:px-8">
        {/* Kolom 1 */}
        <div className="grid gap-4 sm:gap-6">
          {firstPart.map((el, idx) => (
            <motion.div style={{ y: translateFirst }} key={"grid-1" + idx}>
              <img
                src={el}
                className="w-full h-56 sm:h-64 md:h-80 object-cover object-center rounded-xl"
                alt="thumbnail"
              />
            </motion.div>
          ))}
        </div>

        {/* Kolom 2 */}
        <div className="grid gap-4 sm:gap-6">
          {secondPart.map((el, idx) => (
            <motion.div style={{ y: translateSecond }} key={"grid-2" + idx}>
              <img
                src={el}
                className="w-full h-56 sm:h-64 md:h-80 object-cover object-center rounded-xl"
                alt="thumbnail"
              />
            </motion.div>
          ))}
        </div>

        {/* Kolom 3 — disembunyikan di layar kecil */}
        <div className="hidden lg:grid gap-4 sm:gap-6">
          {thirdPart.map((el, idx) => (
            <motion.div style={{ y: translateThird }} key={"grid-3" + idx}>
              <img
                src={el}
                className="w-full h-56 sm:h-64 md:h-80 object-cover object-left-top rounded-xl"
                alt="thumbnail"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
