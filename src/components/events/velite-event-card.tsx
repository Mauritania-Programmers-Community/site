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
  User,
} from "lucide-react";
import type { Event } from "@/lib/content";

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

function formatEventDate(date: string, locale: string): string {
  return new Date(date).toLocaleDateString(
    locale === "ar" ? "ar-MR" : "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );
}

export function VeliteEventCard({ event, locale, index = 0 }: VeliteEventCardProps) {
  const isPast = event.status === "completed";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
    >
      <Card
        className={`group h-full overflow-hidden border-2 transition-all duration-300 hover:border-mpc-green-500/50 hover:shadow-xl ${
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
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          </div>
        )}

        <CardContent className="p-6">
          {/* Header with type badge and date */}
          <div className="mb-4 flex items-center justify-between">
            <Badge className={eventTypeColors[event.type] || eventTypeColors.meetup}>
              {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
            </Badge>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              {formatEventDate(event.date, locale)}
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
            {event.speaker && (
              <span className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {event.speaker}
              </span>
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
            <Link href={`/${locale}/events/${event.baseSlug}`}>
              {isPast ? (
                <>
                  View Details
                  <ArrowRight className="ms-2 h-4 w-4" />
                </>
              ) : (
                <>
                  Learn More
                  <ArrowRight className="ms-2 h-4 w-4" />
                </>
              )}
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
