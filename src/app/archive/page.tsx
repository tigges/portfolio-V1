"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ArchiveClient from "./ArchiveClient";
import { useData } from "@/lib/DataProvider";

export default function ArchivePage() {
  const { projects, config } = useData();

  return (
    <>
      <Navigation siteName={config.name} />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h1 className="text-3xl font-light tracking-tight text-neutral-900 mb-2">
            Archive
          </h1>
          <p className="text-sm text-neutral-400 mb-12">
            All projects — {projects.length} works
          </p>
          <ArchiveClient projects={projects} />
        </div>
      </main>
      <Footer config={config} />
    </>
  );
}
