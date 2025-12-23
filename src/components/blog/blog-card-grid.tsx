"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { formatReadingTime, formatDate, type Post, type Locale } from "@/lib/content";
import { getAuthor, getAuthorName, getAuthorRole } from "@/lib/authors";
import { AvatarImage } from "@/components/ui/avatar-image";

interface BlogCardGridProps {
  post: Post;
  locale: string;
  showRightBorder?: boolean;
}

/**
 * MagicUI-style blog card with grid lines using pseudo-elements
 * Creates a newspaper-like grid layout
 */
export function BlogCardGrid({
  post,
  locale,
  showRightBorder = true,
}: BlogCardGridProps) {
  const author = getAuthor(post.author);
  const authorName = getAuthorName(post.author, locale);
  const authorRole = getAuthorRole(post.author, locale);
  const readingTime = (post as Post & { readingTime?: number }).readingTime;

  return (
    <Link
      href={`/${locale}/blog/${post.baseSlug}`}
      className={cn(
        // MagicUI grid-line style with pseudo-elements
        "group block relative",
        "before:absolute before:-start-px before:top-0 before:z-10 before:h-screen before:w-px before:bg-border before:content-['']",
        "after:absolute after:-top-px after:start-0 after:z-0 after:h-px after:w-screen after:bg-border after:content-['']",
        showRightBorder && "md:border-e border-border border-b-0"
      )}
    >
      <div className="flex flex-col">
        {/* Thumbnail */}
        {post.image && (
          <div className="relative w-full h-48 overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}

        {/* Content */}
        <div className="p-6 flex flex-col gap-3">
          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h3 className="text-xl font-semibold text-card-foreground group-hover:underline underline-offset-4">
            {post.title}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground text-sm line-clamp-2">
            {post.description}
          </p>

          {/* Meta: Author, Date, Reading Time */}
          <div className="flex items-center gap-3 text-sm text-muted-foreground mt-auto pt-2">
            {author?.avatar && (
              <div className="relative h-7 w-7 overflow-hidden rounded-full ring-1 ring-mpc-green-500/20">
                <AvatarImage
                  src={author.avatar}
                  alt={authorName}
                  size={28}
                  className="rounded-full"
                />
              </div>
            )}
            <div className="flex flex-col">
              <span className="font-medium text-foreground">{authorName}</span>
              {authorRole && (
                <span className="text-xs">{authorRole}</span>
              )}
            </div>
            <span>·</span>
            <time>{formatDate(post.date, locale)}</time>
            {readingTime && (
              <>
                <span>·</span>
                <span>{formatReadingTime(readingTime, locale as Locale)}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
