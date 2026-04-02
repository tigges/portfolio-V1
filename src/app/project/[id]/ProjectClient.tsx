"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProjectGallery from "@/components/ProjectGallery";
import { useData } from "@/lib/DataProvider";

export default function ProjectClient() {
  const params = useParams();
  const id = params.id as string;
  const { projects, config, loading } = useData();
  const project = projects.find((p) => p.id === id);

  if (!project && loading) {
    return (
      <>
        <Navigation siteName={config.name} />
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-6 py-32 text-center">
            <div className="w-5 h-5 border border-neutral-300 border-t-neutral-900 rounded-full animate-spin mx-auto" />
          </div>
        </main>
      </>
    );
  }

  if (!project) {
    return (
      <>
        <Navigation siteName={config.name} />
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-6 py-32 text-center">
            <h1 className="text-2xl font-light text-neutral-900 mb-4">
              Project not found
            </h1>
            <Link
              href="/"
              className="text-xs tracking-[0.15em] uppercase text-neutral-400 hover:text-neutral-900 transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </main>
        <Footer config={config} />
      </>
    );
  }

  return (
    <>
      <Navigation siteName={config.name} />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <Link
            href="/"
            className="text-xs tracking-[0.15em] uppercase text-neutral-400 hover:text-neutral-900 transition-colors"
          >
            ← Back
          </Link>

          <div className="mt-8 mb-12">
            <p className="text-xs tracking-[0.2em] uppercase text-neutral-400 mb-2">
              {project.category} — {project.year}
            </p>
            <h1 className="text-4xl md:text-5xl font-light tracking-tight text-neutral-900 mb-6">
              {project.title}
            </h1>
            <p className="text-neutral-500 text-base leading-relaxed max-w-2xl">
              {project.description}
            </p>
          </div>

          <ProjectGallery images={project.images} title={project.title} />
        </div>
      </main>
      <Footer config={config} />
    </>
  );
}
