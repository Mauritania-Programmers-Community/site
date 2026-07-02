import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "./section-header";
import { Reveal } from "@/components/ui/reveal";
import { VeliteEventCard } from "@/components/events/velite-event-card";
import type { Event } from "@/lib/content";

interface RecentEventsSectionProps {
  events: Event[];
  locale: string;
}

export async function RecentEventsSection({ events, locale }: RecentEventsSectionProps) {
  // Hide section only if no events at all
  if (!events || events.length === 0) {
    return null;
  }

  const t = await getTranslations("recentEvents");

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
            <Reveal key={event.baseSlug} delay={index * 0.1} duration={0.4}>
              <VeliteEventCard event={event} locale={locale} index={index} />
            </Reveal>
          ))}
        </div>

        {/* CTA Button */}
        <Reveal delay={0.6} className="mt-12 flex justify-center">
          <Link href="/events">
            <Button size="lg" variant="outline" className="group border-mpc-gold-500 hover:bg-mpc-gold-500/10">
              {t("viewAll")}
              <ArrowRight className="ms-2 h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
            </Button>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
