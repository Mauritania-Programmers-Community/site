"use client";

import { Badge } from "@/components/ui/badge";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { Calendar, MapPin, Video, ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { AuthorCard } from "@/components/blog/author-card";
import { formatDate, type Locale } from "@/lib/content";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import type { events } from "#site/content";

const eventTypeColors: Record<string, string> = {
  workshop: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  meetup: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  hackathon: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  webinar: "bg-green-500/10 text-green-600 dark:text-green-400",
};

type Event = (typeof events)[number];

interface EventHeroProps {
  event: Event;
  locale: Locale;
}

export function EventHero({ event, locale }: EventHeroProps) {
  const t = useTranslations("events");
  const isPast = event.status === "completed";

  return (
    <section className="relative overflow-hidden bg-linear-to-br from-background via-background to-mpc-green-500/10 py-12">
      <div className="container mx-auto px-4">
        {/* Back button */}
        <Link
          href="/events"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
          {t("backToEvents")}
        </Link>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Event Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <Badge className={eventTypeColors[event.type] || eventTypeColors.meetup}>
                {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
              </Badge>
              {isPast && (
                <Badge variant="secondary">
                  {t("status.completed")}
                </Badge>
              )}
              {event.status === "upcoming" && (
                <Badge className="bg-mpc-green-500 text-white">
                  {t("status.upcoming")}
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
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Calendar className="h-5 w-5 text-mpc-green-500" />
                <span>{formatDate(event.date, locale, { weekday: "long" })}</span>
              </div>

              {event.speaker && (
                <div className="flex items-center gap-3">
                  <AuthorCard
                    authorKey={event.speaker}
                    locale={locale}
                    variant="compact"
                  />
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

              {/* Action Buttons - Inline with details */}
              <div className="flex items-center gap-3 pt-3">
                {event.registrationUrl && !isPast && (
                  <a href={event.registrationUrl} target="_blank" rel="noopener noreferrer">
                    <ShimmerButton
                      shimmerColor="#4CAF50"
                      background="linear-gradient(to right, #4CAF50, #66BB6A)"
                      className="font-semibold"
                    >
                      {t("cta.register")}
                    </ShimmerButton>
                  </a>
                )}
                {event.recordingUrl && isPast && (
                  <a href={event.recordingUrl} target="_blank" rel="noopener noreferrer">
                    <ShimmerButton
                      shimmerColor="#4CAF50"
                      background="linear-gradient(to right, #4CAF50, #66BB6A)"
                      className="font-semibold"
                    >
                      {t("cta.watchRecording")}
                    </ShimmerButton>
                  </a>
                )}
              </div>
            </div>
          </motion.div>

          {/* Event Image */}
          {event.image && (
            <motion.div
              className="relative aspect-video overflow-hidden rounded-xl border-2 border-muted"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Image
                src={event.image}
                alt={event.title}
                fill
                quality={90}
                className="object-cover object-center"
                priority
              />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
