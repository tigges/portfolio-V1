import { getFallbackProjects } from "@/lib/data";
import ProjectClient from "./ProjectClient";

export function generateStaticParams() {
  const projects = getFallbackProjects();
  return projects.map((p) => ({ id: p.id }));
}

export default function ProjectPage() {
  return <ProjectClient />;
}
