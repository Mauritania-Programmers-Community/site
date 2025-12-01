import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getEvent, getAllEventSlugs, type Locale } from "@/lib/content";
import type { Metadata } from "next";
import { MDXContent } from "@/components/mdx/mdx-content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Video, User, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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

function formatDate(date: string, locale: string): string {
  return new Date(date).toLocaleDateString(
    locale === "ar" ? "ar-MR" : "en-US",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );
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

  const isPast = event.status === "completed";

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-mpc-green-500/10 py-12">
        <div className="container mx-auto px-4">
          {/* Back button */}
          <Link
            href={`/${locale}/events`}
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {locale === "ar" ? "العودة إلى الأحداث" : "Back to Events"}
          </Link>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Event Info */}
            <div>
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <Badge className={eventTypeColors[event.type] || eventTypeColors.meetup}>
                  {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                </Badge>
                {isPast && (
                  <Badge variant="secondary">
                    {locale === "ar" ? "انتهى" : "Completed"}
                  </Badge>
                )}
                {event.status === "upcoming" && (
                  <Badge className="bg-mpc-green-500 text-white">
                    {locale === "ar" ? "قادم" : "Upcoming"}
                  </Badge>
                )}
              </div>

              <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                {event.title}
              </h1>

              <p className="mb-6 text-lg text-muted-foreground">
                {event.description}
              </p>

              {/* Event Details */}
              <div className="mb-6 space-y-3">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Calendar className="h-5 w-5 text-mpc-green-500" />
                  <span>{formatDate(event.date, locale)}</span>
                </div>

                {event.speaker && (
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <User className="h-5 w-5 text-mpc-green-500" />
                    <span>{event.speaker}</span>
                  </div>
                )}

                {event.platform && (
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Video className="h-5 w-5 text-mpc-green-500" />
                    <span>{event.platform}</span>
                  </div>
                )}

                {event.location && (
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <MapPin className="h-5 w-5 text-mpc-green-500" />
                    <span>{event.location}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                {event.registrationUrl && !isPast && (
                  <Button
                    asChild
                    className="bg-mpc-green-500 hover:bg-mpc-green-600"
                  >
                    <a href={event.registrationUrl} target="_blank" rel="noopener noreferrer">
                      {locale === "ar" ? "سجل الآن" : "Register Now"}
                    </a>
                  </Button>
                )}
                {event.recordingUrl && isPast && (
                  <Button
                    asChild
                    className="bg-mpc-green-500 hover:bg-mpc-green-600"
                  >
                    <a href={event.recordingUrl} target="_blank" rel="noopener noreferrer">
                      {locale === "ar" ? "شاهد التسجيل" : "Watch Recording"}
                    </a>
                  </Button>
                )}
              </div>
            </div>

            {/* Event Image */}
            {event.image && (
              <div className="relative aspect-video overflow-hidden rounded-xl border-2 border-muted">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}
          </div>
        </div>
      </section>

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
