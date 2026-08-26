import type { MetadataRoute } from "next";
import { allPages, pageHasApprovalHold } from "./site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.120vc.com";
  const lastModified = new Date("2026-08-26");
  return [
    { url: base, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/consultation`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    ...allPages.filter((page) => !pageHasApprovalHold(page)).map((page) => ({ url: `${base}/${page.slug}`, lastModified, changeFrequency: "monthly" as const, priority: page.slug.includes("/") ? 0.7 : 0.8 })),
  ];
}
