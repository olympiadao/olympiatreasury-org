import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: "https://olympiatreasury.org",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://olympiatreasury.org/upgrade",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
  ];
}
