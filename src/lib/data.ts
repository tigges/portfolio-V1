import { Project, SiteConfig } from "./types";

export function getDefaultConfig(): SiteConfig {
  return {
    name: "Portfolio",
    tagline: "Art / Architecture / Design",
    email: "hello@example.com",
    instagram: "",
    linkedin: "",
  };
}

export function getFallbackProjects(): Project[] {
  return [
    {
      id: "concrete-horizon",
      title: "Concrete Horizon",
      category: "Architecture",
      year: "2025",
      description:
        "A residential complex that dissolves the boundary between landscape and structure. Raw concrete meets floor-to-ceiling glass, framing uninterrupted views of the surrounding terrain.",
      thumbnail:
        "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200&q=80",
        "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80",
      ],
      featured: true,
    },
    {
      id: "lumina-series",
      title: "Lumina Series",
      category: "Art",
      year: "2024",
      description:
        "A collection of light installations exploring the interplay between natural and artificial illumination in urban spaces. Each piece responds to its environment, shifting throughout the day.",
      thumbnail:
        "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1200&q=80",
        "https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=1200&q=80",
      ],
      featured: true,
    },
    {
      id: "form-function",
      title: "Form & Function",
      category: "Product Design",
      year: "2024",
      description:
        "A minimalist furniture line where each piece is reduced to its essential geometry. Oak, steel, and leather — nothing more than what is needed.",
      thumbnail:
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80",
        "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=1200&q=80",
      ],
      featured: true,
    },
    {
      id: "urban-fragments",
      title: "Urban Fragments",
      category: "Art",
      year: "2023",
      description:
        "Mixed-media compositions derived from deconstructed cityscapes. Photographic fragments layered with ink, charcoal, and metallic pigments.",
      thumbnail:
        "https://images.unsplash.com/photo-1482160549825-59d1b23cb208?w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1482160549825-59d1b23cb208?w=1200&q=80",
        "https://images.unsplash.com/photo-1494587416117-f102a2ac0a8d?w=1200&q=80",
      ],
      featured: true,
    },
    {
      id: "pavilion-zero",
      title: "Pavilion Zero",
      category: "Architecture",
      year: "2023",
      description:
        "A temporary pavilion constructed from recycled materials. The structure questions permanence in architecture — designed to be assembled, experienced, and returned to the earth.",
      thumbnail:
        "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=1200&q=80",
        "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=1200&q=80",
      ],
      featured: true,
    },
    {
      id: "mono-objects",
      title: "Mono Objects",
      category: "Product Design",
      year: "2022",
      description:
        "A series of ceramic vessels exploring single-color glazing techniques. Each piece is thrown by hand, then finished with a monochromatic glaze that reveals subtle surface textures.",
      thumbnail:
        "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200&q=80",
        "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=1200&q=80",
      ],
      featured: false,
    },
    {
      id: "shadow-studies",
      title: "Shadow Studies",
      category: "Art",
      year: "2022",
      description:
        "A photographic series documenting the ephemeral shadows cast by architectural elements across different times of day and seasons.",
      thumbnail:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
      ],
      featured: false,
    },
    {
      id: "bridge-house",
      title: "Bridge House",
      category: "Architecture",
      year: "2021",
      description:
        "A private residence that spans a narrow ravine, creating a living space that floats above the landscape. Steel and timber frame with full glazing on both long elevations.",
      thumbnail:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
      ],
      featured: false,
    },
  ];
}
