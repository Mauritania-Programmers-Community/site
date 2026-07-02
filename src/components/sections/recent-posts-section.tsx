import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "./section-header";
import { Reveal } from "@/components/ui/reveal";
import { VeliteBlogCard } from "@/components/blog/velite-blog-card";
import type { Post } from "@/lib/content";

interface RecentPostsSectionProps {
  posts: Post[];
  locale: string;
}

export async function RecentPostsSection({ posts, locale }: RecentPostsSectionProps) {
  // Hide section only if no posts at all
  if (!posts || posts.length === 0) {
    return null;
  }

  const t = await getTranslations("recentPosts");

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
            <Reveal key={post.baseSlug} delay={index * 0.1} duration={0.4}>
              <VeliteBlogCard
                post={post}
                locale={locale}
                index={index}
                variant="default"
              />
            </Reveal>
          ))}
        </div>

        {/* CTA Button */}
        <Reveal delay={0.6} className="mt-12 flex justify-center">
          <Link href="/blog">
            <Button size="lg" className="group bg-mpc-green-600 hover:bg-mpc-green-700">
              {t("viewAll")}
              <ArrowRight className="ms-2 h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
            </Button>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
