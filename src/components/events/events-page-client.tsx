"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InteractiveEventCard } from "@/components/events/interactive-event-card";
import { getEventsByLocale, type Locale } from "@/lib/content";
import { Calendar } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { BREAKPOINTS, BLOB_ANIMATION } from "@/lib/constants";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from "@/components/ui/empty";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

interface EventsPageClientProps {
  locale: string;
  events: ReturnType<typeof getEventsByLocale>;
}

export function EventsPageClient({ locale, events }: EventsPageClientProps) {
  const t = useTranslations("events");
  const isRTL = locale === "ar";
  const isMobile = useMediaQuery(BREAKPOINTS.MOBILE);

  const upcomingEvents = events.filter((e) => e.status === "upcoming");
  const pastEvents = events.filter((e) => e.status === "completed");

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-background via-background to-mpc-green-500/10 py-20">
        {/* Animated background elements - disabled on mobile for performance */}
        {!isMobile && (
          <>
            <motion.div
              className="absolute -top-20 -end-20 h-60 w-60 rounded-full bg-mpc-green-500/20 blur-3xl"
              animate={{
                scale: [...BLOB_ANIMATION.SCALE_RANGE],
                opacity: [...BLOB_ANIMATION.OPACITY_RANGE],
              }}
              transition={{
                duration: BLOB_ANIMATION.DURATION,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute -bottom-20 -start-20 h-60 w-60 rounded-full bg-mpc-gold-500/20 blur-3xl"
              animate={{
                scale: [BLOB_ANIMATION.SCALE_RANGE[1], BLOB_ANIMATION.SCALE_RANGE[0], BLOB_ANIMATION.SCALE_RANGE[1]],
                opacity: [...BLOB_ANIMATION.OPACITY_RANGE],
              }}
              transition={{
                duration: BLOB_ANIMATION.DURATION,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </>
        )}

        <div className="container relative mx-auto px-4">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Badge
                variant="secondary"
                className="mb-6 gap-2 bg-mpc-green-500/10 px-4 py-2 text-mpc-green-600 dark:text-mpc-green-400"
              >
                <Calendar className="h-4 w-4" />
                {t("title")}
              </Badge>
            </motion.div>

            <motion.h1
              className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {t("title")}
            </motion.h1>

            <motion.p
              className="mx-auto max-w-2xl text-lg text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {t("subtitle")}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Events Section */}
      <section className="container mx-auto px-4 py-16">
        <Tabs defaultValue="all" className="w-full" dir={isRTL ? "rtl" : "ltr"}>
          <motion.div
            className="mb-8 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="all" className="gap-2">
                {t("all")}
                <Badge variant="secondary" className="h-5 px-1.5 text-xs">
                  {events.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="upcoming" className="gap-2">
                {t("upcoming")}
                <Badge className="h-5 bg-mpc-green-500 px-1.5 text-xs">
                  {upcomingEvents.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="past" className="gap-2">
                {t("past")}
                <Badge variant="secondary" className="h-5 px-1.5 text-xs">
                  {pastEvents.length}
                </Badge>
              </TabsTrigger>
            </TabsList>
          </motion.div>

          <TabsContent value="all">
            {events.length === 0 ? (
              <motion.div
                className="mx-auto max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Empty>
                  <EmptyHeader>
                    <EmptyMedia variant="icon">
                      <Calendar className="h-6 w-6" />
                    </EmptyMedia>
                    <EmptyTitle>
                      {t("empty.noEvents")}
                    </EmptyTitle>
                    <EmptyDescription>
                      {t("empty.noEventsDescription")}
                    </EmptyDescription>
                  </EmptyHeader>
                </Empty>
              </motion.div>
            ) : (
              <>
                {/* Upcoming Events */}
                {upcomingEvents.length > 0 && (
                  <motion.div
                    className="mb-12"
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                  >
                    <motion.div
                      className="mb-6 flex items-center gap-3"
                      variants={fadeInUp}
                    >
                      <Calendar className="h-5 w-5 text-mpc-green-500" />
                      <h2 className="text-2xl font-bold">{t("upcoming")}</h2>
                      <Badge className="bg-mpc-green-500 text-white">
                        {upcomingEvents.length} events
                      </Badge>
                    </motion.div>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-stretch">
                      {upcomingEvents.map((event, index) => (
                        <InteractiveEventCard
                          key={event.baseSlug}
                          event={event}
                          locale={locale}
                          index={index}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Past Events */}
                {pastEvents.length > 0 && (
                  <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                  >
                    <motion.div
                      className="mb-6 flex items-center gap-3"
                      variants={fadeInUp}
                    >
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <h2 className="text-2xl font-bold">{t("past")}</h2>
                      <Badge variant="secondary">
                        {pastEvents.length} events
                      </Badge>
                    </motion.div>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-stretch">
                      {pastEvents.map((event, index) => (
                        <InteractiveEventCard
                          key={event.baseSlug}
                          event={event}
                          locale={locale}
                          index={index}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </>
            )}
          </TabsContent>

          <TabsContent value="upcoming">
            {upcomingEvents.length > 0 ? (
              <motion.div
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
              >
                {upcomingEvents.map((event, index) => (
                  <InteractiveEventCard
                    key={event.baseSlug}
                    event={event}
                    locale={locale}
                    index={index}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                className="mx-auto max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Empty>
                  <EmptyHeader>
                    <EmptyMedia variant="icon">
                      <Calendar className="h-6 w-6" />
                    </EmptyMedia>
                    <EmptyTitle>
                      {t("empty.noUpcoming")}
                    </EmptyTitle>
                    <EmptyDescription>
                      {t("empty.noUpcomingDescription")}
                    </EmptyDescription>
                  </EmptyHeader>
                </Empty>
              </motion.div>
            )}
          </TabsContent>

          <TabsContent value="past">
            {pastEvents.length > 0 ? (
              <motion.div
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
              >
                {pastEvents.map((event, index) => (
                  <InteractiveEventCard
                    key={event.baseSlug}
                    event={event}
                    locale={locale}
                    index={index}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                className="mx-auto max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Empty>
                  <EmptyHeader>
                    <EmptyMedia variant="icon">
                      <Calendar className="h-6 w-6" />
                    </EmptyMedia>
                    <EmptyTitle>
                      {t("empty.noPast")}
                    </EmptyTitle>
                    <EmptyDescription>
                      {t("empty.noPastDescription")}
                    </EmptyDescription>
                  </EmptyHeader>
                </Empty>
              </motion.div>
            )}
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}
