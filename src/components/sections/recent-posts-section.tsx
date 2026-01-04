"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "./section-header";
import { VeliteBlogCard } from "@/components/blog/velite-blog-card";
import type { Post } from "@/lib/content";

interface RecentPostsSectionProps {
  posts: Post[];
  locale: string;
}

export function RecentPostsSection({ posts, locale }: RecentPostsSectionProps) {
  const t = useTranslations("recentPosts");

  // Hide section only if no posts at all
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <section className="relative overflow-hidden bg-background py-24">
      <div className="container mx-auto px-4">
        <SectionHeader
          badge={{
            text: t("badge"),
          }}
          title={t("title")}
          description={t("subtitle")}
        />

        {/* 3-column grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <motion.div
              key={post.baseSlug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <VeliteBlogCard
                post={post}
                locale={locale}
                index={index}
                variant="default"
              />
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 flex justify-center"
        >
          <Link href={`/${locale}/blog`}>
            <Button size="lg" className="group bg-mpc-green-600 hover:bg-mpc-green-700">
              {t("viewAll")}
              <ArrowRight className="ms-2 h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
