import { HomeSection } from "@/components/sections/HomeSection";
import { ProjectSection } from "@/components/sections/ProjectSection";
import { AboutSection } from "@/components/sections/AboutSection";
import ReviewSection from "@/components/sections/ReviewSection";
import ServiceSection from "@/components/sections/ServiceSection";
import ContactSections from "@/components/sections/ContactSections";

export default function Home() {
  return (
    <div>
      <HomeSection />
      <AboutSection />
      <ProjectSection />
      <ServiceSection />
      {/* <ReviewSection /> */}
      <ContactSections />
    </div>
  );
}
