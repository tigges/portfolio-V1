export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  thumbnail: string;
  images: string[];
  featured: boolean;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  email: string;
  instagram: string;
  linkedin: string;
}
