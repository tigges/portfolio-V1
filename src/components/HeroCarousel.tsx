"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/lib/types";

export default function HeroCarousel({ projects }: { projects: Project[] }) {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrent(index);
      setTimeout(() => setIsTransitioning(false), 700);
    },
    [isTransitioning],
  );

  const next = useCallback(() => {
    goTo((current + 1) % projects.length);
  }, [current, projects.length, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  if (projects.length === 0) return null;

  const project = projects[current];

  return (
    <section className="relative w-full h-[85vh] min-h-[600px] bg-neutral-100 overflow-hidden">
      {projects.map((p, i) => (
        <div
          key={p.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={p.thumbnail}
            alt={p.title}
            fill
            className="object-cover"
            priority={i === 0}
            sizes="100vw"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        </div>
      ))}

      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-16">
        <div className="max-w-7xl mx-auto">
          <Link href={`/project/${project.id}`} className="group">
            <p className="text-white/70 text-xs tracking-[0.2em] uppercase mb-2">
              {project.category} — {project.year}
            </p>
            <h2 className="text-white text-3xl md:text-5xl lg:text-6xl font-light tracking-tight mb-4 group-hover:opacity-80 transition-opacity">
              {project.title}
            </h2>
            <p className="text-white/60 text-sm md:text-base max-w-xl leading-relaxed">
              {project.description.slice(0, 120)}
              {project.description.length > 120 ? "…" : ""}
            </p>
          </Link>

          <div className="flex items-center gap-3 mt-8">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-0.5 transition-all duration-500 ${
                  i === current
                    ? "w-10 bg-white"
                    : "w-5 bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
