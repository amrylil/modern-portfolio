"use client";

import BlurText from "../ui/BlurText";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";
import { testimonials } from "@/mock/data";

export default function ReviewSection() {
  return (
    <>
      <div className="px-20">
        <BlurText
          text="What Clients Say"
          delay={160}
          animateBy="words"
          direction="top"
          className="text-7xl tracking-tighter text-center mb-16 bg-clip-text from-neutral-50 to-neutral-400"
        />

        <BlurText
          className="font-light text-lg w-full justify-between"
          text="Here are some kind words and feedback from clients I’ve collaborated with. Their experiences reflect my dedication to delivering high-quality, reliable, and well-crafted solutions that meet their needs and exceed expectations."
          delay={10}
        />
      </div>
      <div className="mt-10 pb-10 rounded-md flex flex-col antialiased  items-center justify-center relative overflow-hidden">
        <InfiniteMovingCards
          items={testimonials}
          direction="right"
          speed="normal"
        />
      </div>
    </>
  );
}
