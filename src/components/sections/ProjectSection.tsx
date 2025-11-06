import { HeroParallax } from "@/components/ui/hero-parallax";
import { products } from "@/mock/data";
import { HoverBorderGradient } from "../ui/hover-border-gradient";
export function ProjectSection() {
  return (
    <section id="project">
      <HeroParallax products={products} />
      <div className="flex justify-center text-center md:mb-20  -translate-y-1 md:translate-y-0">
        <HoverBorderGradient
          containerClassName="rounded"
          as="button"
          className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
        >
          Open All Project
        </HoverBorderGradient>
      </div>
    </section>
  );
}
