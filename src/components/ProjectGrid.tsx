import Image from "next/image";
import Link from "next/link";
import { Project } from "@/lib/types";

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex items-baseline justify-between mb-12">
        <h2 className="text-2xl font-light tracking-tight text-neutral-900">
          Selected Work
        </h2>
        <Link
          href="/archive"
          className="text-xs tracking-[0.15em] uppercase text-neutral-400 hover:text-neutral-900 transition-colors"
        >
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/project/${project.id}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          unoptimized
        />
      </div>
      <div className="mt-4 mb-8">
        <div className="flex items-baseline justify-between">
          <h3 className="text-sm font-medium text-neutral-900">
            {project.title}
          </h3>
          <span className="text-xs text-neutral-400">{project.year}</span>
        </div>
        <p className="text-xs text-neutral-500 mt-1 tracking-wide uppercase">
          {project.category}
        </p>
      </div>
    </Link>
  );
}
