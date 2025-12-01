"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight } from "lucide-react";
import type { Post } from "@/lib/content";

interface VeliteBlogCardProps {
  post: Post;
  locale: string;
  index?: number;
  variant?: "default" | "featured" | "compact";
}

function formatDate(date: string, locale: string): string {
  return new Date(date).toLocaleDateString(
    locale === "ar" ? "ar-MR" : "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );
}

export function VeliteBlogCard({
  post,
  locale,
  index = 0,
  variant = "default",
}: VeliteBlogCardProps) {
  if (variant === "compact") {
    return (
      <Link
        href={`/${locale}/blog/${post.baseSlug}`}
        className="group flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted/50"
      >
        <span className="text-2xl font-bold text-muted-foreground/50 group-hover:text-mpc-green-500">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="flex-1 min-w-0">
          <p className="truncate font-medium group-hover:text-mpc-green-500">
            {post.title}
          </p>
          <p className="text-xs text-muted-foreground">
            {formatDate(post.date, locale)}
          </p>
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
        <Link href={`/${locale}/blog/${post.baseSlug}`}>
          <Card className="group overflow-hidden border-2 transition-all duration-300 hover:border-mpc-green-500/50 hover:shadow-xl">
            <div className="grid md:grid-cols-2">
              {post.image && (
                <div className="relative aspect-video md:aspect-auto overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
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
                  <span className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {post.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatDate(post.date, locale)}
                  </span>
                </div>
              </CardContent>
            </div>
          </Card>
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
      <Link href={`/${locale}/blog/${post.baseSlug}`}>
        <Card className="group h-full overflow-hidden border-2 transition-all duration-300 hover:border-mpc-green-500/50 hover:shadow-xl">
          {post.image && (
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
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
                <span className="flex items-center gap-1">
                  <User className="h-3.5 w-3.5" />
                  {post.author}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {formatDate(post.date, locale)}
                </span>
              </div>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
