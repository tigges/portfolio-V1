"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useData } from "@/lib/DataProvider";

export default function ProjectClient() {
  const params = useParams();
  const id = params.id as string;
  const { projects, config } = useData();
  const project = projects.find((p) => p.id === id);

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

          <div className="space-y-3">
            {project.images.map((img, i) => (
              <div
                key={i}
                className="relative w-full aspect-[16/10] bg-neutral-100 overflow-hidden"
              >
                <Image
                  src={img}
                  alt={`${project.title} — Image ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  priority={i === 0}
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer config={config} />
    </>
  );
}
