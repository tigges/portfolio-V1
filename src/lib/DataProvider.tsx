"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Project, SiteConfig } from "./types";
import { getFallbackProjects, getDefaultConfig } from "./data";

interface DataContextType {
  projects: Project[];
  featured: Project[];
  config: SiteConfig;
  loading: boolean;
}

const DataContext = createContext<DataContextType>({
  projects: [],
  featured: [],
  config: getDefaultConfig(),
  loading: true,
});

export function useData() {
  return useContext(DataContext);
}

interface RawProject {
  id?: string;
  title?: string;
  category?: string;
  year?: string;
  description?: string;
  thumbnail?: string;
  images?: string;
  featured?: string;
}

interface RawConfig {
  key?: string;
  value?: string;
}

function parseProject(raw: RawProject, index: number): Project {
  return {
    id: raw.id || `project-${index}`,
    title: raw.title || "Untitled",
    category: raw.category || "Other",
    year: raw.year || new Date().getFullYear().toString(),
    description: raw.description || "",
    thumbnail: raw.thumbnail || "/images/placeholder.svg",
    images: raw.images
      ? raw.images.split(",").map((s: string) => s.trim())
      : [raw.thumbnail || "/images/placeholder.svg"],
    featured: raw.featured?.toLowerCase() === "true" || raw.featured === "1",
  };
}

export function DataProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(getFallbackProjects());
  const [config, setConfig] = useState<SiteConfig>(getDefaultConfig());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sheetId = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID;
    if (!sheetId) {
      setLoading(false);
      return;
    }

    const projectsTab =
      process.env.NEXT_PUBLIC_PROJECTS_TAB || "Projects";
    const configTab = process.env.NEXT_PUBLIC_CONFIG_TAB || "Config";

    async function fetchData() {
      try {
        const [rawProjects, rawConfig] = await Promise.all([
          fetch(
            `https://opensheet.elk.sh/${sheetId}/${encodeURIComponent(projectsTab)}`,
          ).then((r) => (r.ok ? r.json() : [])),
          fetch(
            `https://opensheet.elk.sh/${sheetId}/${encodeURIComponent(configTab)}`,
          ).then((r) => (r.ok ? r.json() : [])),
        ]);

        if (rawProjects.length > 0) {
          setProjects(rawProjects.map(parseProject));
        }

        if (rawConfig.length > 0) {
          const map: Record<string, string> = {};
          rawConfig.forEach((row: RawConfig) => {
            if (row.key && row.value) map[row.key] = row.value;
          });
          setConfig({
            name: map.name || "Portfolio",
            tagline: map.tagline || "Art / Architecture / Design",
            email: map.email || "hello@example.com",
            instagram: map.instagram || "",
            linkedin: map.linkedin || "",
          });
        }
      } catch {
        // Keep fallback data on error
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const featured = projects.filter((p) => p.featured);
  const featuredList = featured.length > 0 ? featured : projects.slice(0, 5);

  return (
    <DataContext.Provider
      value={{ projects, featured: featuredList, config, loading }}
    >
      {children}
    </DataContext.Provider>
  );
}
