"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { VeliteBlogCard } from "@/components/blog/velite-blog-card";
import { ShiftBlogCard } from "@/components/blog/shift-blog-card";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { getPostsByLocale, getAllTags, type Locale } from "@/lib/content";
import {
  BookOpen,
  Search,
  TrendingUp,
  Filter,
  X,
  Tag,
} from "lucide-react";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from "@/components/ui/empty";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

interface BlogPageClientProps {
  locale: string;
  posts: ReturnType<typeof getPostsByLocale>;
  tags: ReturnType<typeof getAllTags>;
}

export function BlogPageClient({ locale, posts, tags }: BlogPageClientProps) {
  const t = useTranslations("blog");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allPosts = posts;
  const allTags = tags;

  // Filter posts
  const filteredPosts = allPosts.filter((post) => {
    const matchesSearch =
      !searchQuery ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesTag = !selectedTag || post.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  // Get recent posts for sidebar
  const recentPosts = allPosts.slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-mpc-green-500/5 py-20">
        {/* FlickeringGrid Background */}
        <div className="absolute inset-0 z-0 [mask-image:linear-gradient(to_bottom,white_20%,transparent_90%)]">
          <FlickeringGrid
            className="h-full w-full"
            squareSize={4}
            gridGap={6}
            color="rgb(76, 175, 80)"
            maxOpacity={0.15}
            flickerChance={0.05}
          />
        </div>

        <div className="container relative mx-auto px-4">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Badge
                variant="secondary"
                className="mb-6 gap-2 bg-mpc-green-500/10 px-4 py-2 text-mpc-green-600 dark:text-mpc-green-400"
              >
                <BookOpen className="h-4 w-4" />
                {t("badge")}
              </Badge>
            </motion.div>

            <motion.h1
              className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {t("title")}{" "}
              <span className="bg-gradient-to-r from-mpc-green-500 to-mpc-gold-500 bg-clip-text text-transparent">
                {t("titleHighlight")}
              </span>
            </motion.h1>

            <motion.p
              className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {t("subtitle")}
            </motion.p>

            {/* Search bar */}
            {allPosts.length > 0 && (
              <motion.div
                className="relative mx-auto max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Search className="absolute start-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder={t("search")}
                  className="h-14 rounded-full border-2 bg-background/80 ps-12 pe-4 text-lg backdrop-blur-sm focus:border-mpc-green-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute end-2 top-1/2 -translate-y-1/2"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Main content */}
      <section className="container mx-auto px-4 py-16">
        {allPosts.length === 0 ? (
          <motion.div
            className="mx-auto max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <BookOpen className="h-6 w-6" />
                </EmptyMedia>
                <EmptyTitle>
                  {t("empty.noPosts")}
                </EmptyTitle>
                <EmptyDescription>
                  {t("empty.noPostsDescription")}
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          </motion.div>
        ) : (
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Main column */}
            <div className="lg:col-span-2">
            {/* Tag filters */}
            {allTags.length > 0 && (
              <motion.div
                className="mb-8 flex flex-wrap items-center gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Button
                  variant={selectedTag === null ? "default" : "outline"}
                  size="sm"
                  className={
                    selectedTag === null
                      ? "bg-mpc-green-500 hover:bg-mpc-green-600"
                      : ""
                  }
                  onClick={() => setSelectedTag(null)}
                >
                  {t("filter.all")}
                </Button>
                {allTags.slice(0, 6).map((tag) => (
                  <Button
                    key={tag}
                    variant={selectedTag === tag ? "default" : "outline"}
                    size="sm"
                    className={
                      selectedTag === tag
                        ? "bg-mpc-green-500 hover:bg-mpc-green-600"
                        : ""
                    }
                    onClick={() =>
                      setSelectedTag(selectedTag === tag ? null : tag)
                    }
                  >
                    {tag}
                  </Button>
                ))}
              </motion.div>
            )}

            {/* All posts grid */}
            <motion.div
              className="mb-6 flex items-center gap-3"
              variants={fadeInUp}
            >
              <BookOpen className="h-5 w-5 text-mpc-green-500" />
              <h2 className="text-2xl font-bold">
                {t("allPosts")}
              </h2>
              <Badge variant="secondary">{filteredPosts.length}</Badge>
            </motion.div>

            <AnimatePresence mode="wait">
              {filteredPosts.length > 0 ? (
                <motion.div
                  key="posts"
                  className="grid gap-6 sm:grid-cols-2"
                  variants={staggerContainer}
                  initial="initial"
                  animate="animate"
                  exit={{ opacity: 0 }}
                >
                  {filteredPosts.map((post, index) => (
                    <ShiftBlogCard
                      key={post.baseSlug}
                      post={post}
                      locale={locale}
                      index={index}
                    />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  className="py-20 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <BookOpen className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                  <p className="text-lg text-muted-foreground">
                    {t("empty.noResults")}
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedTag(null);
                    }}
                  >
                    {t("clearFilters")}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent posts */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <TrendingUp className="h-5 w-5 text-mpc-green-500" />
                    {t("recentPosts")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-1">
                  {recentPosts.map((post, index) => (
                    <VeliteBlogCard
                      key={post.baseSlug}
                      post={post}
                      locale={locale}
                      index={index}
                      variant="compact"
                    />
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Tags card */}
            {allTags.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Tag className="h-5 w-5 text-mpc-green-500" />
                      {t("tags")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-2">
                    {allTags.map((tag) => {
                      const count = allPosts.filter((p) =>
                        p.tags.includes(tag)
                      ).length;
                      return (
                        <Badge
                          key={tag}
                          className="cursor-pointer border bg-muted/50 transition-transform hover:scale-105 hover:bg-mpc-green-500/10"
                          variant="outline"
                          onClick={() =>
                            setSelectedTag(selectedTag === tag ? null : tag)
                          }
                        >
                          {tag} ({count})
                        </Badge>
                      );
                    })}
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
        )}
      </section>
    </div>
  );
}
