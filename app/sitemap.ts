import type { MetadataRoute } from "next";
import { allPages } from "./site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.120vc.com";
  return [
    { url: base, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/contact`, changeFrequency: "monthly", priority: 0.9 },
    ...allPages.map((page) => ({ url: `${base}/${page.slug}`, changeFrequency: "monthly" as const, priority: page.slug.includes("/") ? 0.7 : 0.8 })),
  ];
}
