import { getEventsByLocale } from "@/lib/content";
import { EventsPageClient } from "@/components/events/events-page-client";
import { toLocale } from "@/i18n/routing";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getLocaleAlternates, getLocalizedUrl } from "@/lib/seo";

// Force static generation for this page
export const dynamic = "force-static";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const resolvedLocale = toLocale(locale);
  const tEvents = await getTranslations({ locale: resolvedLocale, namespace: "events" });
  const title =
    resolvedLocale === "ar" ? "فعاليات مجتمع MPC" : "MPC Community Events";

  return {
    title,
    description: tEvents("subtitle"),
    alternates: getLocaleAlternates(
      {
        en: "/events",
        ar: "/events",
      },
      resolvedLocale
    ),
    openGraph: {
      title,
      description: tEvents("subtitle"),
      url: getLocalizedUrl(resolvedLocale, "/events"),
      type: "website",
    },
  };
}

export default async function EventsPage({
  params,
}: PageProps) {
  const { locale } = await params;
  const resolvedLocale = toLocale(locale);

  // Pre-fetch events at build time for static generation
  const events = getEventsByLocale(resolvedLocale);

  return <EventsPageClient locale={resolvedLocale} events={events} />;
}
