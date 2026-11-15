import type { MetadataRoute } from "next";
import { getAllGuides } from "@/lib/guides";

const SITE = "https://richardtuharsky.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const guides = getAllGuides().map((guide) => ({
    url: `${SITE}/guides/${guide.slug}`,
    lastModified: new Date(`${guide.publishedAt}T00:00:00Z`),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: SITE,
      lastModified: guides[0]?.lastModified ?? new Date("2026-11-12T00:00:00Z"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE}/articles`,
      lastModified: guides[0]?.lastModified ?? new Date("2026-11-12T00:00:00Z"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...guides,
  ];
}
