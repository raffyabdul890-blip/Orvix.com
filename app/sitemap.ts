import type { MetadataRoute } from "next";

import { getAllServices } from "@/lib/data/services";

const BASE_URL = "https://orvix-com.vercel.app";

const PUBLIC_ROUTES = ["/", "/about", "/services", "/contact", "/privacy", "/terms", "/refund"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = PUBLIC_ROUTES.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 1.0,
  }));

  const serviceEntries: MetadataRoute.Sitemap = getAllServices().map((service) => ({
    url: `${BASE_URL}/services/${service.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 1.0,
  }));

  return [...staticEntries, ...serviceEntries];
}
