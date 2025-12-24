import { getPostsByLocale, getAllTags, type Locale } from "@/lib/content";
import { BlogPageClient } from "@/components/blog/blog-page-client";

// Force static generation for this page
export const dynamic = "force-static";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Pre-fetch all data at build time for static generation
  const allPosts = getPostsByLocale(locale as Locale);
  const allTags = getAllTags(locale as Locale);

  return <BlogPageClient locale={locale} posts={allPosts} tags={allTags} />;
}
