import { Hero } from "@/components/hero";
import { VisionSection } from "@/components/vision-section";
import { EcosystemOverview } from "@/components/ecosystem-overview";
import { DesktopShowcase } from "@/components/desktop-showcase";
import { PhilosophySection } from "@/components/philosophy-section";
import { FeaturedProjects } from "@/components/featured-projects";
import { DeveloperSection } from "@/components/developer-section";

export default function Home() {
  return (
    <>
      <Hero />
      <VisionSection />
      <EcosystemOverview />
      <DesktopShowcase />
      <PhilosophySection />
      <FeaturedProjects />
      <DeveloperSection />
    </>
  );
}
