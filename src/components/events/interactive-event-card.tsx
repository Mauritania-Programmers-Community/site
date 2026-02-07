"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  MapPin,
  Video,
  Users,
  Share2,
  Download,
  Check,
} from "lucide-react";
import { formatDate, type Event } from "@/lib/content";
import { getAuthor, getAuthorName } from "@/lib/authors";
import { AvatarImage } from "@/components/ui/avatar-image";
import { MagicCard } from "@/components/ui/magic-card";
import {
  downloadCalendarFile,
  type EventData,
} from "@/lib/calendar-utils";
import { toast } from "sonner";

interface InteractiveEventCardProps {
  event: Event;
  locale: string;
  index?: number;
  attendeeCount?: number;
  capacity?: number;
}

const eventTypeColors: Record<string, string> = {
  workshop: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  meetup: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  hackathon: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  webinar: "bg-green-500/10 text-green-600 dark:text-green-400",
};

export function InteractiveEventCard({
  event,
  locale,
  index = 0,
  attendeeCount = 0,
  capacity,
}: InteractiveEventCardProps) {
  const t = useTranslations("events");
  const [isRSVPed, setIsRSVPed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isPast = event.status === "completed";

  const speaker = event.speaker ? getAuthor(event.speaker) : undefined;
  const speakerName = event.speaker
    ? getAuthorName(event.speaker, locale)
    : undefined;

  // TODO: Implement RSVP backend integration
  // - Add API endpoint for RSVP submission
  // - Store RSVPs in database with user info
  // - Send confirmation email to user
  // - Track attendee count and capacity
  // - Add user authentication requirement
  const handleRSVP = () => {
    setIsRSVPed(true);
    toast.success(t("toast.rsvpSuccess"));
  };

  // TODO: Improve calendar implementation
  // - Fix timezone handling (currently uses local time, should use UTC)
  // - Consider adding direct calendar links (Google Calendar, Outlook.com URLs)
  // - Improve mobile UX (consider alternative to .ics download)
  // - Test with major calendar apps (Apple, Google, Outlook)
  const handleDownloadCalendar = async () => {
    try {
      const eventData: EventData = {
        title: event.title,
        description: event.description,
        location: event.location || event.platform,
        url: `${window.location.origin}${event.permalink}`,
        startDate: new Date(event.date),
        endDate: event.endDate ? new Date(event.endDate) : undefined,
        organizer: {
          name: "MPC Community",
          email: "contact@mpc-community.org",
        },
      };
      await downloadCalendarFile(eventData, `${event.baseSlug}.ics`);
      toast.success(t("toast.calendarDownloaded"));
    } catch {
      toast.error(t("toast.downloadFailed"));
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: event.title,
      text: event.description,
      url: `${window.location.origin}${event.permalink}`,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        toast.success(t("toast.shared"));
      } catch {
        // User cancelled
      }
    } else {
      await navigator.clipboard.writeText(shareData.url);
      toast.success(t("toast.linkCopied"));
    }
  };

  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <MagicCard
        gradientSize={250}
        gradientOpacity={0.25}
        className="h-full rounded-xl"
      >
        <Card
          className={`group relative h-full flex flex-col overflow-hidden border-2 p-0 gap-0 transition-all duration-300 hover:border-mpc-green-500/50 hover:shadow-xl ${
            isPast ? "opacity-80" : ""
          }`}
        >
          {/* Cover Image */}
          {event.image && (
            <Link href={`/events/${event.baseSlug}`}>
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Status badge */}
                {!isPast && (
                  <Badge className="absolute top-4 start-4 bg-mpc-green-500 text-white shadow-sm">
                    {t("badge.upcoming")}
                  </Badge>
                )}
              </div>
            </Link>
          )}

          <CardContent className="p-5 flex-grow flex flex-col">
            {/* Header */}
            <div className="mb-3 flex items-center justify-between">
              <Badge
                className={
                  eventTypeColors[event.type] || eventTypeColors.meetup
                }
              >
                {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
              </Badge>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                {formatDate(event.date, locale)}
              </div>
            </div>

            {/* Title & Description */}
            <Link href={`/events/${event.baseSlug}`}>
              <h3 className="mb-2 line-clamp-2 text-lg font-semibold transition-colors group-hover:text-mpc-green-500 min-h-[3.5rem]">
                {event.title}
              </h3>
            </Link>
            <p className="mb-3 line-clamp-3 text-sm text-muted-foreground min-h-[4rem]">
              {event.description}
            </p>

            {/* Event details */}
            <div className="mb-3 flex flex-wrap gap-2 text-sm text-muted-foreground min-h-[1.75rem]">
              {speakerName && (
                <div className="flex items-center gap-1.5">
                  {speaker?.avatar && (
                    <div className="relative h-5 w-5 overflow-hidden rounded-full ring-1 ring-mpc-green-500/20">
                      <AvatarImage
                        src={speaker.avatar}
                        alt={speakerName}
                        size={20}
                        className="rounded-full"
                      />
                    </div>
                  )}
                  <span className="text-xs font-medium">{speakerName}</span>
                </div>
              )}
              {event.platform && (
                <span className="flex items-center gap-1 text-xs">
                  <Video className="h-3.5 w-3.5" />
                  {event.platform}
                </span>
              )}
              {event.location && (
                <span className="flex items-center gap-1 text-xs">
                  <MapPin className="h-3.5 w-3.5" />
                  {event.location}
                </span>
              )}
            </div>

            {/* Attendee progress (always visible if capacity exists) */}
            {capacity && (
              <div className="mb-3">
                <div className="mb-1.5 flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Users className="h-3 w-3" />
                    {t("badge.registered")}
                  </span>
                  <span className="font-medium">
                    {attendeeCount}/{capacity}
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full bg-mpc-green-500 transition-all"
                    style={{ width: `${(attendeeCount / capacity) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {/* Actions Panel - Overlays on hover (upcoming events only) */}
            {!isPast && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  y: isHovered ? 0 : 10,
                }}
                transition={{ duration: 0.3 }}
                className="absolute inset-x-0 bottom-0 pointer-events-none"
                style={{ pointerEvents: isHovered ? "auto" : "none" }}
              >
                <div className="bg-background/95 backdrop-blur-sm border-t p-3 space-y-2 shadow-lg">
                  {/* RSVP Button */}
                  {!isRSVPed && (
                    <Button
                      onClick={handleRSVP}
                      size="sm"
                      className="w-full bg-mpc-green-500 text-white hover:bg-mpc-green-600"
                    >
                      <Check className="me-1 h-3 w-3" />
                      {t("cta.rsvp")}
                    </Button>
                  )}

                  {isRSVPed && (
                    <Button
                      disabled
                      size="sm"
                      className="w-full bg-mpc-green-500/20 text-mpc-green-600"
                    >
                      <Check className="me-1 h-3 w-3" />
                      {t("cta.rsvpConfirmed")}
                    </Button>
                  )}

                  {/* Calendar & Share */}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleDownloadCalendar}
                      className="flex-1"
                    >
                      <Download className="me-1 h-3 w-3" />
                      {t("cta.calendar")}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleShare}
                      className="flex-1"
                    >
                      <Share2 className="me-1 h-3 w-3" />
                      {t("cta.share")}
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </MagicCard>
    </motion.div>
  );
}
