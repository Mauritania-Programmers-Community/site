import type { MetadataRoute } from "next";
import { posts, events } from "@/lib/content";
import { routing } from "@/i18n/routing";
import { getLocalizedUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const items: MetadataRoute.Sitemap = [];
  const locales = routing.locales;
  const now = new Date();

  const staticPaths = ["/", "/blog", "/events"];
  for (const locale of locales) {
    for (const path of staticPaths) {
      items.push({
        url: getLocalizedUrl(locale, path),
        lastModified: now,
        changeFrequency: path === "/" ? "weekly" : "daily",
        priority: path === "/" ? 1 : 0.8,
      });
    }
  }

  for (const post of posts.filter((item) => item.published)) {
    items.push({
      url: getLocalizedUrl(post.locale, `/blog/${post.baseSlug}`),
      lastModified: new Date(post.date),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  for (const event of events.filter((item) => item.published)) {
    items.push({
      url: getLocalizedUrl(event.locale, `/events/${event.baseSlug}`),
      lastModified: new Date(event.date),
      changeFrequency: "weekly",
      priority: event.status === "upcoming" ? 0.8 : 0.6,
    });
  }

  return items;
}
