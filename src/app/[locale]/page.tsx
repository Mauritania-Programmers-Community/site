import {
  HeroSection,
  StatsSection,
  CommunitySection,
  FeaturesSection,
  FAQSection,
} from "@/components/sections";
import { RecentPostsSection } from "@/components/sections/recent-posts-section";
import { RecentEventsSection } from "@/components/sections/recent-events-section";
import { getRecentPosts, getRecentEvents } from "@/lib/content";
import { toLocale } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { getLocaleAlternates, getLocalizedUrl } from "@/lib/seo";

// Force static generation for this page
export const dynamic = "force-static";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const resolvedLocale = toLocale(locale);
  const t = await getTranslations({ locale: resolvedLocale, namespace: "metadata" });

  return {
    title: {
      absolute: t("title"),
    },
    description: t("description"),
    alternates: getLocaleAlternates(
      {
        en: "/",
        ar: "/",
      },
      resolvedLocale
    ),
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: getLocalizedUrl(resolvedLocale, "/"),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  };
}

export default async function HomePage({
  params,
}: PageProps) {
  const { locale } = await params;
  const resolvedLocale = toLocale(locale);

  // Fetch data for sections
  const posts = getRecentPosts(resolvedLocale, 6);
  const events = getRecentEvents(resolvedLocale, 6);

  return (
    <>
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <RecentPostsSection posts={posts} locale={resolvedLocale} />
      <RecentEventsSection events={events} locale={resolvedLocale} />
      <CommunitySection />
      <FAQSection />
    </>
  );
}
