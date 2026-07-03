"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { formatReadingTime, formatDate, type Post, type Locale } from "@/lib/content";
import { getAuthor, getAuthorName, getAuthorRole } from "@/lib/authors";
import { AvatarImage } from "@/components/ui/avatar-image";
import { MagicCard } from "@/components/ui/magic-card";

interface VeliteBlogCardProps {
  post: Post;
  locale: string;
  index?: number;
  variant?: "default" | "featured" | "compact";
  /** Only set for above-the-fold cards — preloads the image and skips lazy loading. */
  priority?: boolean;
}

export function VeliteBlogCard({
  post,
  locale,
  index = 0,
  variant = "default",
  priority = false,
}: VeliteBlogCardProps) {
  const author = getAuthor(post.author);
  const authorName = getAuthorName(post.author, locale);
  const authorRole = getAuthorRole(post.author, locale);
  const readingTime = (post as Post & { readingTime?: number }).readingTime;

  if (variant === "compact") {
    return (
      <Link
        href={`/blog/${post.baseSlug}`}
        className="group flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted/50"
      >
        <span className="text-2xl font-bold text-muted-foreground/50 group-hover:text-mpc-green-500">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="flex-1 min-w-0">
          <p className="truncate font-medium group-hover:text-mpc-green-500">
            {post.title}
          </p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{formatDate(post.date, locale)}</span>
            {readingTime && (
              <>
                <span>·</span>
                <span>{formatReadingTime(readingTime, locale as Locale)}</span>
              </>
            )}
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "featured") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
      >
        <Link href={`/blog/${post.baseSlug}`}>
          <MagicCard gradientSize={300} gradientOpacity={0.25} className="rounded-xl">
            <Card className="group overflow-hidden border-2 p-0 transition-all duration-300 hover:border-mpc-green-500/50 hover:shadow-md">
            <div className="grid md:grid-cols-2">
              {post.image && (
                <div className="relative aspect-video md:aspect-auto overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    priority={priority}
                    loading={priority ? undefined : "lazy"}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}
              <CardContent className="flex flex-col justify-center p-6">
                <div className="mb-3 flex flex-wrap gap-2">
                  {post.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <h3 className="mb-2 text-xl font-semibold transition-colors group-hover:text-mpc-green-500">
                  {post.title}
                </h3>
                <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
                  {post.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    {author?.avatar && (
                      <div className="relative h-8 w-8 overflow-hidden rounded-full ring-2 ring-mpc-green-500/20">
                        <AvatarImage
                          src={author.avatar}
                          alt={authorName}
                          size={32}
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
                  </div>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatDate(post.date, locale)}
                  </span>
                  {readingTime && (
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {formatReadingTime(readingTime, locale as Locale)}
                    </span>
                  )}
                </div>
              </CardContent>
            </div>
          </Card>
          </MagicCard>
        </Link>
      </motion.div>
    );
  }

  // Default variant
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
    >
      <Link href={`/blog/${post.baseSlug}`}>
          <Card className="group h-full overflow-hidden border-2 p-0 transition-all duration-300 hover:border-mpc-green-500/50 hover:shadow-md hover:scale-[1.02]">
          {post.image && (
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority={priority}
                loading={priority ? undefined : "lazy"}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-background/60 to-transparent" />
            </div>
          )}
          <CardContent className="p-5">
            <div className="mb-3 flex flex-wrap gap-1.5">
              {post.tags.slice(0, 3).map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="text-xs font-normal"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <h3 className="mb-2 line-clamp-2 text-lg font-semibold transition-colors group-hover:text-mpc-green-500">
              {post.title}
            </h3>
            <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
              {post.description}
            </p>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  {author?.avatar && (
                    <div className="relative h-6 w-6 overflow-hidden rounded-full ring-1 ring-mpc-green-500/20">
                      <AvatarImage
                        src={author.avatar}
                        alt={authorName}
                        size={24}
                        className="rounded-full"
                      />
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="font-medium">{authorName}</span>
                    {authorRole && (
                      <span className="text-xs text-muted-foreground/80 hidden sm:block">{authorRole}</span>
                    )}
                  </div>
                </div>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {formatDate(post.date, locale)}
                </span>
                {readingTime && (
                  <span className="hidden sm:flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {formatReadingTime(readingTime, locale as Locale)}
                  </span>
                )}
              </div>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
