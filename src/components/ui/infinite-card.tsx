"use client";
import React from "react";
import { motion } from "framer-motion";

interface TechItem {
  name: string;
  icon: React.ReactNode;
}

interface InfiniteMovingCardsProps {
  items: TechItem[];
  direction?: "left" | "right";
  speed?: "slow" | "normal" | "fast";
}

export const InfiniteMovingCards: React.FC<InfiniteMovingCardsProps> = ({
  items,
  direction = "right",
  speed = "normal",
}) => {
  const speedMap = {
    slow: 40,
    normal: 20,
    fast: 10,
  };

  return (
    <div className="relative mt-20 overflow-hidden w-full">
      <motion.div
        animate={{
          x: direction === "right" ? ["0%", "-100%"] : ["-100%", "0%"],
        }}
        transition={{
          repeat: Infinity,
          duration: speedMap[speed],
          ease: "linear",
        }}
        className="flex gap-10"
      >
        {[...items, ...items].map((item, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center p-4 rounded-xl bg-neutral-900/50 border border-neutral-800 shadow-md min-w-[120px]"
          >
            <div className="text-purple-400 mb-2">{item.icon}</div>
            <span className="text-neutral-200 text-sm font-medium">
              {item.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
