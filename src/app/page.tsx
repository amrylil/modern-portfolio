import { HomeSection } from "@/components/sections/HomeSection";
import { ProjectSection } from "@/components/sections/ProjectSection";
import { AboutSection } from "@/components/sections/AboutSection";
import FeaturesSectionDemo from "@/components/features-section-demo-1";
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
