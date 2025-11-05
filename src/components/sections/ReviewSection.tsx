"use client";

import BlurText from "../ui/BlurText";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";
import { testimonials } from "@/mock/data";

export default function ReviewSection() {
  return (
    <>
      <div className="md:px-20 px-5">
        <BlurText
          text="What Clients Say"
          delay={10}
          animateBy="words"
          direction="top"
          className="md:text-7xl text-4xl tracking-tighter text-center md:mb-16 mb-5 bg-clip-text from-neutral-50 to-neutral-400"
        />

        <BlurText
          className="font-light text-lg w-full justify-between"
          text="Here are some kind words and feedback from clients I’ve collaborated with. Their experiences reflect my dedication to delivering high-quality, reliable, and well-crafted solutions that meet their needs and exceed expectations."
          delay={5}
        />
      </div>
      <div className="text-xs md:text-xl mt-10 pb-10  rounded-md flex flex-col antialiased  items-center justify-center relative overflow-hidden">
        <InfiniteMovingCards
          items={testimonials}
          direction="right"
          speed="normal"
        />
      </div>
    </>
  );
}
