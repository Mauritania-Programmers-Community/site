import {
  HeroSection,
  StatsSection,
  CommunitySection,
  FeaturesSection,
  FAQSection,
} from "@/components/sections";
import { RecentPostsSection } from "@/components/sections/recent-posts-section";
import { RecentEventsSection } from "@/components/sections/recent-events-section";
import { getRecentPosts, getRecentEvents, type Locale } from "@/lib/content";

// Force static generation for this page
export const dynamic = "force-static";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Fetch data for sections
  const posts = getRecentPosts(locale as Locale, 6);
  const events = getRecentEvents(locale as Locale, 6);

  return (
    <>
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <RecentPostsSection posts={posts} locale={locale} />
      <RecentEventsSection events={events} locale={locale} />
      <CommunitySection />
      <FAQSection />
    </>
  );
}
