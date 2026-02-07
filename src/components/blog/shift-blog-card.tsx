"use client";

import { useState, useEffect } from "react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  Bookmark,
  Linkedin,
  Link as LinkIcon,
  Check,
} from "lucide-react";
import { formatReadingTime, formatDate, type Post, type Locale } from "@/lib/content";
import { getAuthor, getAuthorName } from "@/lib/authors";
import { AvatarImage } from "@/components/ui/avatar-image";
import { XIcon } from "@/components/icons/x-icon";
import {
  getTwitterShareUrl,
  getLinkedInShareUrl,
  copyToClipboard,
  type ShareData,
} from "@/lib/social-share";
import { toast } from "sonner";

interface ShiftBlogCardProps {
  post: Post;
  locale: string;
  index?: number;
}

export function ShiftBlogCard({ post, locale, index = 0 }: ShiftBlogCardProps) {
  const getInitialBookmarkState = () => {
    if (typeof window !== "undefined") {
      const bookmarks = JSON.parse(
        localStorage.getItem("mpc-bookmarks") || "[]"
      );
      return bookmarks.includes(post.baseSlug);
    }
    return false;
  };

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsBookmarked(getInitialBookmarkState());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post.baseSlug]);

  const author = getAuthor(post.author);
  const authorName = getAuthorName(post.author, locale);
  const readingTime = (post as Post & { readingTime?: number }).readingTime;
  const isRTL = locale === "ar";

  const shareData: ShareData = {
    title: post.title,
    description: post.description,
    url: mounted ? `${window.location.origin}${post.permalink}` : post.permalink,
    hashtags: post.tags.slice(0, 3),
  };

  const handleBookmark = () => {
    const bookmarks = JSON.parse(
      localStorage.getItem("mpc-bookmarks") || "[]"
    );
    if (isBookmarked) {
      const updated = bookmarks.filter((slug: string) => slug !== post.baseSlug);
      localStorage.setItem("mpc-bookmarks", JSON.stringify(updated));
      setIsBookmarked(false);
      toast.success(isRTL ? "تمت الإزالة من المفضلة" : "Removed from bookmarks");
    } else {
      bookmarks.push(post.baseSlug);
      localStorage.setItem("mpc-bookmarks", JSON.stringify(bookmarks));
      setIsBookmarked(true);
      toast.success(isRTL ? "تمت الإضافة للمفضلة" : "Added to bookmarks");
    }
  };

  const handleShare = async (platform: "twitter" | "linkedin" | "copy") => {
    if (platform === "copy") {
      const success = await copyToClipboard(shareData.url);
      if (success) {
        toast.success(isRTL ? "تم نسخ الرابط" : "Link copied");
      } else {
        toast.error(isRTL ? "فشل النسخ" : "Copy failed");
      }
    } else if (platform === "twitter") {
      window.open(getTwitterShareUrl(shareData), "_blank");
    } else if (platform === "linkedin") {
      window.open(getLinkedInShareUrl(shareData), "_blank");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/blog/${post.baseSlug}`}>
        <Card className="group overflow-hidden border-2 p-0 transition-all duration-300 hover:border-mpc-green-500/50 hover:shadow-md hover:scale-[1.02] cursor-pointer">
          {/* Cover Image */}
          {post.image && (
            <div className="relative aspect-video overflow-hidden">
              <motion.div
                animate={{ scale: isHovered ? 1.05 : 1 }}
                transition={{ duration: 0.4 }}
              >
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  priority={index === 0}
                  loading={index === 0 ? undefined : "lazy"}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-linear-to-t from-background/60 to-transparent" />
            </div>
          )}

          <CardContent className="p-5">
            {/* Tags */}
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

            {/* Title & Description */}
            <h3 className="mb-2 line-clamp-2 text-lg font-semibold transition-colors group-hover:text-mpc-green-500">
              {post.title}
            </h3>
            <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
              {post.description}
            </p>

            {/* Author & Meta - Always visible */}
            <div className="mb-3 flex items-center justify-between text-sm text-muted-foreground">
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
                  <span className="font-medium">{authorName}</span>
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
            </div>

            {/* Shifted Actions Panel - Revealed on hover */}
            <motion.div
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{
                scaleY: isHovered ? 1 : 0,
                opacity: isHovered ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
              style={{ transformOrigin: "top" }}
              className="overflow-hidden"
              onClick={(e) => e.preventDefault()}
            >
              <div className="border-t pt-3">
                {/* Share buttons */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-muted-foreground">
                    {isRTL ? "مشاركة:" : "Share:"}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault();
                      handleShare("twitter");
                    }}
                    className="h-8 w-8 p-0 cursor-pointer"
                  >
                    <XIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault();
                      handleShare("linkedin");
                    }}
                    className="h-8 w-8 p-0 cursor-pointer"
                  >
                    <Linkedin className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault();
                      handleShare("copy");
                    }}
                    className="h-8 w-8 p-0 cursor-pointer"
                  >
                    <LinkIcon className="h-4 w-4" />
                  </Button>
                  <div className="flex-1" />
                  {/* Bookmark button */}
                  <Button
                    variant={isBookmarked ? "default" : "outline"}
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault();
                      handleBookmark();
                    }}
                    className={
                      isBookmarked
                        ? "bg-mpc-green-500 text-white hover:bg-mpc-green-600 cursor-pointer"
                        : "cursor-pointer"
                    }
                  >
                    {isBookmarked ? (
                      <Check className="me-1 h-3 w-3" />
                    ) : (
                      <Bookmark className="me-1 h-3 w-3" />
                    )}
                    {isBookmarked
                      ? isRTL
                        ? "محفوظ"
                        : "Saved"
                      : isRTL
                        ? "حفظ"
                        : "Save"}
                  </Button>
                </div>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
