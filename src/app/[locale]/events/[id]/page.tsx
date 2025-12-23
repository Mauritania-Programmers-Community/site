import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getEvent, getAllEventSlugs, formatDate, type Locale } from "@/lib/content";
import type { Metadata } from "next";
import { MDXContent } from "@/components/mdx/mdx-content";
import { EventHero } from "@/components/events/event-hero";

type PageProps = {
  params: Promise<{ locale: string; id: string }>;
};

export async function generateStaticParams() {
  const slugs = getAllEventSlugs();
  const locales = ["en", "ar"];

  return locales.flatMap((locale) =>
    slugs.map((slug) => ({
      locale,
      id: slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, id } = await params;
  const event = getEvent(id, locale as Locale);

  if (!event) {
    return {
      title: "Event Not Found",
    };
  }

  return {
    title: `${event.title} | MPC Events`,
    description: event.description,
    openGraph: {
      title: event.title,
      description: event.description,
      images: event.image ? [event.image] : [],
    },
  };
}

const eventTypeColors: Record<string, string> = {
  workshop: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  meetup: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  hackathon: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  webinar: "bg-green-500/10 text-green-600 dark:text-green-400",
};

export default async function EventPage({ params }: PageProps) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const event = getEvent(id, locale as Locale);

  if (!event) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <EventHero event={event} locale={locale as Locale} />

      {/* Content Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <article className="prose prose-lg dark:prose-invert max-w-none">
            <MDXContent code={event.body} />
          </article>
        </div>
      </section>
    </div>
  );
}
