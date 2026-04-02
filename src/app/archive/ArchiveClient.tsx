"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/lib/types";

export default function ArchiveClient({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState("All");
  const [view, setView] = useState<"grid" | "list">("grid");

  const categories = useMemo(() => {
    const cats = Array.from(new Set(projects.map((p) => p.category)));
    return ["All", ...cats.sort()];
  }, [projects]);

  const filtered = useMemo(() => {
    if (filter === "All") return projects;
    return projects.filter((p) => p.category === filter);
  }, [projects, filter]);

  return (
    <>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
        <div className="flex flex-wrap items-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`text-xs tracking-[0.1em] uppercase px-3 py-1.5 transition-colors ${
                filter === cat
                  ? "bg-neutral-900 text-white"
                  : "text-neutral-400 hover:text-neutral-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setView("grid")}
            className={`p-1.5 ${view === "grid" ? "text-neutral-900" : "text-neutral-300"}`}
            aria-label="Grid view"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <rect x="0" y="0" width="7" height="7" />
              <rect x="9" y="0" width="7" height="7" />
              <rect x="0" y="9" width="7" height="7" />
              <rect x="9" y="9" width="7" height="7" />
            </svg>
          </button>
          <button
            onClick={() => setView("list")}
            className={`p-1.5 ${view === "list" ? "text-neutral-900" : "text-neutral-300"}`}
            aria-label="List view"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <rect x="0" y="1" width="16" height="2" />
              <rect x="0" y="7" width="16" height="2" />
              <rect x="0" y="13" width="16" height="2" />
            </svg>
          </button>
        </div>
      </div>

      {view === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((project) => (
            <Link
              key={project.id}
              href={`/project/${project.id}`}
              className="group block"
            >
              <div className="relative aspect-square overflow-hidden bg-neutral-100">
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  unoptimized
                />
              </div>
              <div className="mt-3 mb-6">
                <h3 className="text-sm font-medium text-neutral-900">
                  {project.title}
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  {project.category} — {project.year}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="divide-y divide-neutral-100">
          {filtered.map((project) => (
            <Link
              key={project.id}
              href={`/project/${project.id}`}
              className="group flex items-center gap-6 py-5 hover:bg-neutral-50 transition-colors -mx-3 px-3"
            >
              <div className="relative w-16 h-16 shrink-0 overflow-hidden bg-neutral-100">
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="64px"
                  unoptimized
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-neutral-900 truncate">
                  {project.title}
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  {project.description.slice(0, 80)}
                  {project.description.length > 80 ? "…" : ""}
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-8 shrink-0">
                <span className="text-xs text-neutral-400 uppercase tracking-wide">
                  {project.category}
                </span>
                <span className="text-xs text-neutral-400 tabular-nums">
                  {project.year}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-sm text-neutral-400">No projects found.</p>
        </div>
      )}
    </>
  );
}
