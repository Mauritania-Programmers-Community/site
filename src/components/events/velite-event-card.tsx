"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  MapPin,
  Video,
  ArrowRight,
} from "lucide-react";
import { formatDate, type Event } from "@/lib/content";
import { getAuthor, getAuthorName, getAuthorRole } from "@/lib/authors";
import { AvatarImage } from "@/components/ui/avatar-image";
import { useTranslations } from "next-intl";

interface VeliteEventCardProps {
  event: Event;
  locale: string;
  index?: number;
}

const eventTypeColors: Record<string, string> = {
  workshop: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  meetup: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  hackathon: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  webinar: "bg-green-500/10 text-green-600 dark:text-green-400",
};

export function VeliteEventCard({ event, locale, index = 0 }: VeliteEventCardProps) {
  const t = useTranslations("events");
  const isPast = event.status === "completed";

  // Get speaker info from author system
  const speaker = event.speaker ? getAuthor(event.speaker) : undefined;
  const speakerName = event.speaker ? getAuthorName(event.speaker, locale) : undefined;
  const speakerRole = event.speaker ? getAuthorRole(event.speaker, locale) : undefined;

  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
    >
        <Card
          className={`group h-full flex flex-col overflow-hidden border-2 p-0 gap-0 transition-all duration-300 hover:border-mpc-green-500/50 hover:shadow-md ${
            isPast ? "opacity-80" : ""
          }`}
        >
        {/* Cover Image */}
        {event.image && (
          <div className="relative aspect-video w-full overflow-hidden">
            <Image
              src={event.image}
              alt={event.title}
              fill
              priority={index === 0}
              loading={index === 0 ? undefined : "lazy"}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}

        <CardContent className="p-6 flex-grow flex flex-col">
          {/* Header with type badge and date */}
          <div className="mb-4 flex items-center justify-between">
            <Badge className={eventTypeColors[event.type] || eventTypeColors.meetup}>
              {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
            </Badge>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              {formatDate(event.date, locale)}
            </div>
          </div>

          {/* Title */}
          <h3 className="mb-2 text-xl font-semibold transition-colors group-hover:text-mpc-green-500">
            {event.title}
          </h3>

          {/* Description */}
          <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
            {event.description}
          </p>

          {/* Event details */}
          <div className="mb-4 flex flex-wrap gap-3 text-sm text-muted-foreground">
            {speakerName && (
              <div className="flex items-center gap-2">
                {speaker?.avatar && (
                  <div className="relative h-6 w-6 overflow-hidden rounded-full ring-1 ring-mpc-green-500/20">
                    <AvatarImage
                      src={speaker.avatar}
                      alt={speakerName}
                      size={24}
                      className="rounded-full"
                    />
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="font-medium text-foreground">{speakerName}</span>
                  {speakerRole && (
                    <span className="text-xs">{speakerRole}</span>
                  )}
                </div>
              </div>
            )}
            {event.platform && (
              <span className="flex items-center gap-1">
                <Video className="h-4 w-4" />
                {event.platform}
              </span>
            )}
            {event.location && (
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {event.location}
              </span>
            )}
          </div>
        </CardContent>

        <CardFooter className="border-t bg-muted/30 px-6 py-4">
          <Button
            variant={isPast ? "outline" : "default"}
            className={`w-full ${
              !isPast
                ? "bg-mpc-green-500 text-white hover:bg-mpc-green-600"
                : ""
            }`}
            asChild
          >
            <Link
              href={`/${locale}/events/${event.baseSlug}`}
              aria-label={`${t("viewDetails")}: ${event.title}`}
            >
              {t("viewDetails")}
              <ArrowRight className="ms-2 h-4 w-4 rtl:rotate-180" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
