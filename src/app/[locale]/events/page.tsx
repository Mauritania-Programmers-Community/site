import { getEventsByLocale, type Locale } from "@/lib/content";
import { EventsPageClient } from "@/components/events/events-page-client";

// Force static generation for this page
export const dynamic = "force-static";

export default async function EventsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Pre-fetch events at build time for static generation
  const events = getEventsByLocale(locale as Locale);

  return <EventsPageClient locale={locale} events={events} />;
}
