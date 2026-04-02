import Navigation from "@/components/Navigation";
import HeroCarousel from "@/components/HeroCarousel";
import ProjectGrid from "@/components/ProjectGrid";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { getProjects, getFeaturedProjects, getSiteConfig } from "@/lib/data";

export const revalidate = 60;

export default async function Home() {
  const [projects, featured, config] = await Promise.all([
    getProjects(),
    getFeaturedProjects(),
    getSiteConfig(),
  ]);

  return (
    <>
      <Navigation siteName={config.name} />
      <main className="pt-16">
        <HeroCarousel projects={featured} />
        <ProjectGrid projects={projects} />
        <ContactSection config={config} />
      </main>
      <Footer config={config} />
    </>
  );
}
