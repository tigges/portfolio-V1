"use client";

import Navigation from "@/components/Navigation";
import HeroCarousel from "@/components/HeroCarousel";
import ProjectGrid from "@/components/ProjectGrid";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { useData } from "@/lib/DataProvider";

export default function Home() {
  const { projects, featured, config } = useData();

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
