import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getPost, getAllPostSlugs, type Locale } from "@/lib/content";
import type { Metadata } from "next";
import { MDXContent } from "@/components/mdx/mdx-content";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowLeft, Tag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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

function formatDate(date: string, locale: string): string {
  return new Date(date).toLocaleDateString(
    locale === "ar" ? "ar-MR" : "en-US",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );
}

export default async function BlogPostPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = getPost(slug, locale as Locale);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-mpc-green-500/10 py-12">
        <div className="container mx-auto px-4">
          {/* Back button */}
          <Link
            href={`/${locale}/blog`}
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {locale === "ar" ? "العودة إلى المدونة" : "Back to Blog"}
          </Link>

          <div className="mx-auto max-w-3xl">
            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    <Tag className="mr-1 h-3 w-3" />
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>

            {/* Description */}
            <p className="mb-6 text-lg text-muted-foreground">
              {post.description}
            </p>

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <User className="h-4 w-4 text-mpc-green-500" />
                {post.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-mpc-green-500" />
                {formatDate(post.date, locale)}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Cover Image */}
      {post.image && (
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <div className="relative -mt-6 mb-8 aspect-video overflow-hidden rounded-xl border-2 border-muted">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      )}

      {/* Content Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <article className="prose prose-lg dark:prose-invert max-w-none">
            <MDXContent code={post.body} />
          </article>
        </div>
      </section>
    </div>
  );
}
