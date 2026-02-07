import { getPostsByLocale, getAllTags } from "@/lib/content";
import { BlogPageClient } from "@/components/blog/blog-page-client";
import { toLocale } from "@/i18n/routing";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getLocaleAlternates, getLocalizedUrl } from "@/lib/seo";

// Force static generation for this page
export const dynamic = "force-static";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const resolvedLocale = toLocale(locale);
  const tBlog = await getTranslations({ locale: resolvedLocale, namespace: "blog" });
  const title = resolvedLocale === "ar" ? "مدونة MPC" : "MPC Blog";

  return {
    title,
    description: tBlog("subtitle"),
    alternates: getLocaleAlternates(
      {
        en: "/blog",
        ar: "/blog",
      },
      resolvedLocale
    ),
    openGraph: {
      title,
      description: tBlog("subtitle"),
      url: getLocalizedUrl(resolvedLocale, "/blog"),
      type: "website",
    },
  };
}

export default async function BlogPage({
  params,
}: PageProps) {
  const { locale } = await params;
  const resolvedLocale = toLocale(locale);

  // Pre-fetch all data at build time for static generation
  const allPosts = getPostsByLocale(resolvedLocale);
  const allTags = getAllTags(resolvedLocale);

  return (
    <BlogPageClient locale={resolvedLocale} posts={allPosts} tags={allTags} />
  );
}
