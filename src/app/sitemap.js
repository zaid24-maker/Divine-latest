import { AGENTS } from "@/data/agents";
import { AREAS } from "@/data/areas";
import { PROJECTS } from "@/data/projects";
import { PROPERTIES } from "@/data/properties";
import { absoluteUrl } from "@/lib/seo";

const STATIC = [
  "/",
  "/properties",
  "/properties/buy",
  "/properties/rent",
  "/properties/residential",
  "/properties/commercial",
  "/search",
  "/map-search",
  "/agents",
  "/projects",
  "/areas",
  "/sell",
  "/rent-out",
  "/list-property",
  "/about",
  "/contact",
];

export default function sitemap() {
  return [
    ...STATIC.map((path) => ({
      url: absoluteUrl(path),
      changeFrequency: "daily",
      priority: path === "/" ? 1 : 0.7,
    })),
    ...PROPERTIES.map((p) => ({
      url: absoluteUrl(`/properties/${p.slug}`),
      lastModified: p.listedAt,
      changeFrequency: "weekly",
      priority: 0.8,
    })),
    ...PROJECTS.map((p) => ({
      url: absoluteUrl(`/projects/${p.slug}`),
      changeFrequency: "weekly",
      priority: 0.7,
    })),
    ...AGENTS.map((a) => ({
      url: absoluteUrl(`/agents/${a.slug}`),
      changeFrequency: "monthly",
      priority: 0.5,
    })),
    ...AREAS.map((a) => ({
      url: absoluteUrl(`/areas/${a.slug}`),
      changeFrequency: "weekly",
      priority: 0.6,
    })),
  ];
}
