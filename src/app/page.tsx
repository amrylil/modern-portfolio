import { HomeSection } from "@/components/sections/HomeSection";
import { ProjectSection } from "@/components/sections/ProjectSection";
import { AboutSection } from "@/components/sections/AboutSection";
import ReviewSection from "@/components/sections/ReviewSection";

export default function Home() {
  return (
    <div>
      <HomeSection />
      <AboutSection />
      <ProjectSection />
      <ReviewSection />
    </div>
  );
}
