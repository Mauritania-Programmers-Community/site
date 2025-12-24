import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import {
  getPost,
  getAllPostSlugs,
  getRelatedPosts,
  formatReadingTime,
  formatDate,
  type Locale,
  type Post,
} from "@/lib/content";
import type { Metadata } from "next";
import { MDXContent } from "@/components/mdx/mdx-content";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowLeft, Tag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { AuthorCard } from "@/components/blog/author-card";
import {
  TableOfContents,
  MobileTableOfContents,
} from "@/components/blog/table-of-contents";
import { VeliteBlogCard } from "@/components/blog/velite-blog-card";

export const dynamic = "force-static";
export const dynamicParams = false;
export const revalidate = 3600;

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  const locales = ["en", "ar"];

  return locales.flatMap((locale) =>
    slugs.map((slug) => ({
      locale,
      slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(slug, locale as Locale);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | MPC Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: post.image ? [post.image] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = getPost(slug, locale as Locale);

  if (!post) {
    notFound();
  }

  // Get reading time (may be undefined for posts created before this feature)
  const readingTime = (post as Post & { readingTime?: number }).readingTime;

  // Get related posts
  const relatedPosts = getRelatedPosts(post, locale as Locale, 3);

  return (
    <div className="min-h-screen bg-background relative">
      {/* FlickeringGrid Background - MagicUI Style */}
      <div className="absolute top-0 start-0 z-0 w-full h-[200px] [mask-image:linear-gradient(to_top,transparent_25%,black_95%)]">
        <FlickeringGrid
          className="absolute top-0 start-0 h-full w-full"
          squareSize={4}
          gridGap={6}
          color="#4CAF50"
          maxOpacity={0.2}
          flickerChance={0.05}
        />
      </div>

      {/* Header Section - MagicUI Style */}
      <div className="space-y-4 border-b border-border relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col gap-6 p-6">
          {/* Meta row: Back button, Tags, Date, Reading Time */}
          <div className="flex flex-wrap items-center gap-3 gap-y-4 text-sm text-muted-foreground">
            <Link
              href={`/${locale}/blog`}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border hover:bg-muted transition-colors"
            >
              <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
              <span className="sr-only">
                {locale === "ar" ? "العودة" : "Back"}
              </span>
            </Link>

            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="h-7 px-3 text-sm font-medium bg-muted text-muted-foreground rounded-md border flex items-center justify-center"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <time className="font-medium">{formatDate(post.date, locale as Locale, { weekday: "long" })}</time>

            {readingTime && (
              <>
                <span className="text-border">·</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {formatReadingTime(readingTime, locale as Locale)}
                </span>
              </>
            )}
          </div>

          {/* Title - MagicUI Style */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter text-balance">
            {post.title}
          </h1>

          {/* Description */}
          {post.description && (
            <p className="text-muted-foreground max-w-4xl md:text-lg text-balance">
              {post.description}
            </p>
          )}
        </div>
      </div>

      {/* Main Content with Sidebar - MagicUI Style */}
      <div className="flex divide-x divide-border relative max-w-7xl mx-auto px-4 md:px-0 z-10">
        {/* Border decoration */}
        <div className="absolute max-w-7xl mx-auto start-1/2 -translate-x-1/2 rtl:translate-x-1/2 w-[calc(100%-2rem)] lg:w-full h-full border-x border-border p-0 pointer-events-none" />

        {/* Main Content */}
        <main className="w-full p-0 overflow-hidden">
          {/* Cover Image - Full width like MagicUI */}
          {post.image && (
            <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                quality={90}
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Article Content */}
          <div className="p-6 lg:p-10">
            <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-balance prose-p:tracking-tight">
              <MDXContent code={post.body} />
            </article>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="border-t border-border p-6 lg:p-10">
              <h2 className="mb-6 text-2xl font-semibold tracking-tight">
                {locale === "ar" ? "اقرأ المزيد" : "Read More"}
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((relatedPost, index) => (
                  <VeliteBlogCard
                    key={relatedPost.baseSlug}
                    post={relatedPost}
                    locale={locale}
                    index={index}
                  />
                ))}
              </div>
            </div>
          )}
        </main>

        {/* Sidebar - MagicUI Style */}
        <aside className="hidden lg:block w-[350px] flex-shrink-0 p-6 lg:p-10 bg-muted/50 dark:bg-muted/20">
          <div className="sticky top-20 space-y-8">
            {/* Author Card */}
            <AuthorCard authorKey={post.author} locale={locale} />

            {/* Table of Contents */}
            <div className="border border-border rounded-lg p-6 bg-card">
              <TableOfContents
                title={locale === "ar" ? "في هذه الصفحة" : "On this page"}
              />
            </div>
          </div>
        </aside>
      </div>

      {/* Mobile TOC */}
      <MobileTableOfContents
        title="On this page"
        titleAr="في هذه الصفحة"
        locale={locale}
      />
    </div>
  );
}
