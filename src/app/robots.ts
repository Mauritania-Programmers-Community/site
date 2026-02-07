import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/hero-showcase",
          "/hero-comparison",
          "/en/hero-showcase",
          "/en/hero-comparison",
          "/ar/hero-showcase",
          "/ar/hero-comparison",
        ],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
