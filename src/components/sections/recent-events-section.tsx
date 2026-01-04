"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "./section-header";
import { VeliteEventCard } from "@/components/events/velite-event-card";
import type { Event } from "@/lib/content";

interface RecentEventsSectionProps {
  events: Event[];
  locale: string;
}

export function RecentEventsSection({ events, locale }: RecentEventsSectionProps) {
  const t = useTranslations("recentEvents");

  // Hide section only if no events at all
  if (!events || events.length === 0) {
    return null;
  }

  return (
    <section className="relative overflow-hidden bg-muted/30 py-24">
      <div className="container mx-auto px-4">
        <SectionHeader
          badge={{
            text: t("badge"),
          }}
          title={t("title")}
          description={t("subtitle")}
        />

        {/* 3-column grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event, index) => (
            <motion.div
              key={event.baseSlug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <VeliteEventCard
                event={event}
                locale={locale}
                index={index}
              />
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 flex justify-center"
        >
          <Link href={`/${locale}/events`}>
            <Button size="lg" variant="outline" className="group border-mpc-gold-500 hover:bg-mpc-gold-500/10">
              {t("viewAll")}
              <ArrowRight className="ms-2 h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
