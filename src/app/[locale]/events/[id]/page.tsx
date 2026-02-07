import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getEvent, getEventStaticParams, hasEventTranslation } from "@/lib/content";
import type { Metadata } from "next";
import { MDXContent } from "@/components/mdx/mdx-content";
import { EventHero } from "@/components/events/event-hero";
import { toLocale } from "@/i18n/routing";
import { getLocaleAlternates, getLocalizedUrl, toAbsoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";
export const dynamicParams = false;
export const revalidate = 1800;

type PageProps = {
  params: Promise<{ locale: string; id: string }>;
};

export async function generateStaticParams() {
  return getEventStaticParams();
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, id } = await params;
  const resolvedLocale = toLocale(locale);
  const event = getEvent(id, resolvedLocale);

  if (!event) {
    return {
      title: "Event Not Found",
    };
  }

  const localePaths: { en?: string; ar?: string } = {};
  if (hasEventTranslation(id, "en")) localePaths.en = `/events/${id}`;
  if (hasEventTranslation(id, "ar")) localePaths.ar = `/events/${id}`;
  if (Object.keys(localePaths).length === 0) {
    localePaths[resolvedLocale] = `/events/${id}`;
  }

  return {
    title: `${event.title} | MPC Events`,
    description: event.description,
    alternates: getLocaleAlternates(localePaths, resolvedLocale),
    openGraph: {
      title: event.title,
      description: event.description,
      url: getLocalizedUrl(resolvedLocale, `/events/${id}`),
      images: event.image ? [toAbsoluteUrl(event.image)] : [],
    },
  };
}

export default async function EventPage({ params }: PageProps) {
  const { locale, id } = await params;
  const resolvedLocale = toLocale(locale);
  setRequestLocale(resolvedLocale);

  const event = getEvent(id, resolvedLocale);

  if (!event) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <EventHero event={event} locale={resolvedLocale} />

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
