import { getTranslations, getLocale } from "next-intl/server";
import { siteConfig } from "@/config/site";
import { Users, Calendar, Clock, FolderGit, TrendingUp, Star } from "lucide-react";
import { SectionHeader } from "./section-header";
import { SectionBlobs } from "./section-decor";
import { StatCounter } from "./stat-counter";
import { Reveal } from "@/components/ui/reveal";

export async function StatsSection() {
  const t = await getTranslations();
  const locale = await getLocale();
  const isRTL = locale === "ar";

  const stats = [
    {
      value: siteConfig.stats.members,
      suffix: "+",
      label: t("stats.members"),
      icon: Users,
      color: "from-mpc-green-400 to-mpc-green-600",
      bgColor: "bg-mpc-green-500/10",
      textColor: "text-mpc-green-500",
    },
    {
      value: siteConfig.stats.events,
      suffix: "+",
      label: t("stats.events"),
      icon: Calendar,
      color: "from-mpc-gold-400 to-mpc-gold-600",
      bgColor: "bg-mpc-gold-500/10",
      textColor: "text-mpc-gold-500",
    },
    {
      value: 1,
      suffix: "+",
      label: t("stats.year"),
      icon: Clock,
      color: "from-mpc-green-600 to-mpc-green-800",
      bgColor: "bg-mpc-green-600/10",
      textColor: "text-mpc-green-600",
    },
    {
      value: siteConfig.stats.projects,
      suffix: "+",
      label: t("stats.projects"),
      icon: FolderGit,
      color: "from-mpc-gold-400 to-mpc-gold-600",
      bgColor: "bg-mpc-gold-500/10",
      textColor: "text-mpc-gold-500",
    },
  ];

  return (
    <section className="relative overflow-hidden py-24">
      {/* Background elements */}
      <div className="absolute inset-0">
        {/* Gradient mesh */}
        <div className="absolute inset-0 bg-linear-to-b from-background via-muted/30 to-background" />

        {/* Decorative blobs — animated on desktop, static on mobile/reduced-motion */}
        <SectionBlobs
          blobs={[
            { className: "absolute top-0 start-1/4 h-64 w-64 rounded-full bg-mpc-green-500/5 blur-3xl", duration: 8 },
            { className: "absolute bottom-0 end-1/4 h-64 w-64 rounded-full bg-mpc-gold-500/5 blur-3xl", duration: 8 },
          ]}
        />

        {/* Dotted pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(76,175,80,0.1)_1px,transparent_1px)] bg-size-[24px_24px]" />
      </div>

      <div className="container relative mx-auto px-4">
        <SectionHeader
          badge={{
            icon: TrendingUp,
            text: isRTL ? "إنجازاتنا" : "Our Impact",
          }}
          title={isRTL ? "أرقام تتحدث عنا" : "Numbers That Speak"}
        />

        {/* Stats grid - Bento-style layout */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal key={index} className="group relative" y={30} delay={index * 0.1}>
              <div className="relative h-full overflow-hidden rounded-3xl border border-border/50 bg-card p-8 transition-all duration-500 hover:border-mpc-green-500/30 hover:shadow-md hover:scale-[1.02]">
                {/* Background gradient on hover */}
                <div className={`absolute inset-0 bg-linear-to-br ${stat.color} opacity-0 transition-opacity duration-500 group-hover:opacity-5`} />

                {/* Icon with hover scale (CSS-driven, no JS) */}
                <div className="relative mb-6 transition-transform duration-300 group-hover:scale-110">
                  <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl ${stat.bgColor} ${stat.textColor} transition-all duration-300 group-hover:shadow-lg`}>
                    <stat.icon className="h-8 w-8" />
                  </div>
                  {/* Decorative ring */}
                  <div className={`absolute inset-0 h-16 w-16 rounded-2xl border-2 border-dashed ${stat.textColor} opacity-0 transition-opacity group-hover:opacity-30`}
                    style={{ transform: "scale(1.3)" }}
                  />
                </div>

                {/* Value with counter animation */}
                <div className="mb-2">
                  <span className={`bg-linear-to-r ${stat.color} bg-clip-text text-5xl font-bold text-transparent`}>
                    <StatCounter target={stat.value} suffix={stat.suffix} />
                  </span>
                </div>

                {/* Label */}
                <p className="text-lg font-medium text-muted-foreground">
                  {stat.label}
                </p>

                {/* Decorative corner accent */}
                <div className={`absolute -end-8 -top-8 h-24 w-24 rounded-full bg-linear-to-br ${stat.color} opacity-10 blur-2xl transition-all duration-500 group-hover:opacity-20 group-hover:scale-150`} />
              </div>
            </Reveal>
          ))}
        </div>

        {/* Bottom accent */}
        <Reveal delay={0.5} y={0} className="mt-16 flex items-center justify-center gap-2 text-muted-foreground">
          <Star className="h-4 w-4 text-mpc-gold-500" />
          <span className="text-sm">
            {isRTL ? "ونستمر في النمو كل يوم" : "And growing every day"}
          </span>
          <Star className="h-4 w-4 text-mpc-gold-500" />
        </Reveal>
      </div>
    </section>
  );
}
