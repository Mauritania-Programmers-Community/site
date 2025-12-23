import { defineConfig, defineCollection, s } from "velite";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";

/**
 * Calculate reading time from MDX content
 * Average reading speed: 200 words per minute
 */
const calculateReadingTime = (content: string): number => {
  // Remove MDX/JSX components and code blocks
  const cleanContent = content
    .replace(/<[^>]+>/g, "") // Remove HTML/JSX tags
    .replace(/```[\s\S]*?```/g, "") // Remove code blocks
    .replace(/`[^`]+`/g, "") // Remove inline code
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // Convert links to text
    .replace(/[#*_~]/g, ""); // Remove markdown formatting

  const words = cleanContent.trim().split(/\s+/).length;
  const readingTime = Math.ceil(words / 200);
  return Math.max(1, readingTime); // Minimum 1 minute
};

/**
 * Extract locale from content file path
 * Path format: blog/en/post-name.mdx -> 'en'
 */
const extractLocale = (path: string): "en" | "ar" => {
  const parts = path.split("/");
  // Format: {collection}/{locale}/{filename}.mdx
  const locale = parts[1];
  return locale === "ar" ? "ar" : "en";
};

/**
 * Extract base slug (filename without extension)
 * Path format: blog/en/post-name.mdx -> 'post-name'
 */
const extractBaseSlug = (path: string): string => {
  const parts = path.split("/");
  const filename = parts[parts.length - 1];
  return filename.replace(/\.mdx?$/, "");
};

const posts = defineCollection({
  name: "Post",
  pattern: "blog/{en,ar}/**/*.mdx",
  schema: s
    .object({
      slug: s.path(),
      locale: s.enum(["en", "ar"]),
      title: s.string().max(99),
      description: s.string().max(999),
      date: s.isodate(),
      published: s.boolean().default(true),
      image: s.string().optional(),
      author: s.string(),
      tags: s.array(s.string()).default([]),
      body: s.mdx(),
    })
    .transform((data, { meta }) => {
      const path = meta.path as string;
      const locale = data.locale || extractLocale(path);
      const baseSlug = extractBaseSlug(path);
      const content = meta.content as string;
      const readingTime = calculateReadingTime(content);

      return {
        ...data,
        locale,
        baseSlug,
        slugAsParams: baseSlug,
        permalink: `/${locale}/blog/${baseSlug}`,
        readingTime,
      };
    }),
});

const events = defineCollection({
  name: "Event",
  pattern: "events/{en,ar}/**/*.mdx",
  schema: s
    .object({
      slug: s.path(),
      locale: s.enum(["en", "ar"]),
      title: s.string().max(99),
      description: s.string().max(999),
      date: s.isodate(),
      endDate: s.isodate().optional(),
      location: s.string().optional(),
      type: s.enum(["workshop", "meetup", "hackathon", "webinar"]),
      status: s.enum(["upcoming", "completed", "cancelled"]).default("upcoming"),
      image: s.string().optional(),
      speaker: s.string().optional(),
      platform: s.string().optional(),
      registrationUrl: s.string().optional(),
      recordingUrl: s.string().optional(),
      published: s.boolean().default(true),
      body: s.mdx(),
    })
    .transform((data, { meta }) => {
      const path = meta.path as string;
      const locale = data.locale || extractLocale(path);
      const baseSlug = extractBaseSlug(path);

      return {
        ...data,
        locale,
        baseSlug,
        slugAsParams: baseSlug,
        permalink: `/${locale}/events/${baseSlug}`,
      };
    }),
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { posts, events },
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      [rehypePrettyCode, { theme: "github-dark-default" }],
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          properties: {
            className: ["subheading-anchor"],
            ariaLabel: "Link to section",
          },
        },
      ],
    ],
    remarkPlugins: [],
  },
});
