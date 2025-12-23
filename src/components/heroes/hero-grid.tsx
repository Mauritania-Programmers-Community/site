"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { siteConfig } from "@/config/site";
import {
  ArrowRight,
  ArrowLeft,
  MessageCircle,
  Play,
  Code2,
  Shield,
  Brain,
  Smartphone,
} from "lucide-react";
import { cn } from "@/lib/utils";

const domains = [
  { icon: Code2, labelEn: "Web Dev", labelAr: "تطوير الويب" },
  { icon: Shield, labelEn: "Security", labelAr: "الأمن السيبراني" },
  { icon: Brain, labelEn: "AI/ML", labelAr: "الذكاء الاصطناعي" },
  { icon: Smartphone, labelEn: "Mobile", labelAr: "تطبيقات الموبايل" },
];

export function HeroGrid() {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === "ar";
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section className="relative min-h-screen overflow-hidden bg-background">
      {/* Animated Grid Pattern Background */}
      <AnimatedGridPattern
        numSquares={40}
        maxOpacity={0.3}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
          "fill-mpc-green-500/30 stroke-mpc-green-500/20"
        )}
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(76,175,80,0.15),transparent_50%)]" />

      <div className="container relative mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-20 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-mpc-green-500/30 bg-mpc-green-500/10 px-5 py-2 text-sm font-medium text-mpc-green-600 backdrop-blur-sm dark:text-mpc-green-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mpc-green-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-mpc-green-500" />
            </span>
            {t("hero.badge")}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="mb-6 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <span className="block">{t("hero.title")}</span>
          <motion.span
            className="block bg-gradient-to-r from-mpc-green-400 via-mpc-green-500 to-mpc-gold-500 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            style={{ backgroundSize: "200% auto" }}
          >
            {t("hero.titleHighlight")}
          </motion.span>
          <span className="block">{t("hero.titleEnd")}</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {t("hero.description")}
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mb-16 flex flex-col gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Button
            size="lg"
            className="group h-14 gap-3 bg-mpc-green-500 px-8 text-lg font-semibold text-white shadow-lg shadow-mpc-green-500/25 hover:bg-mpc-green-600 hover:shadow-mpc-green-500/40 transition-all duration-300"
            asChild
          >
            <a
              href={siteConfig.links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="h-5 w-5" />
              {t("hero.cta.join")}
              <ArrowIcon className="h-5 w-5 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
            </a>
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="group h-14 gap-3 border-2 px-8 text-lg font-semibold hover:border-mpc-green-500 hover:bg-mpc-green-500/10 transition-all duration-300"
            asChild
          >
            <Link href={`/${locale}/events`}>
              <Play className="h-5 w-5" />
              {t("hero.cta.events")}
            </Link>
          </Button>
        </motion.div>

        {/* Domain icons */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {domains.map((domain, index) => (
            <motion.div
              key={index}
              className="group flex flex-col items-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.1 }}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 group-hover:border-mpc-green-500/50 group-hover:bg-mpc-green-500/10 sm:h-16 sm:w-16">
                <domain.icon className="h-6 w-6 text-mpc-green-500 sm:h-7 sm:w-7" />
              </div>
              <span className="text-xs text-muted-foreground sm:text-sm">
                {isRTL ? domain.labelAr : domain.labelEn}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="mt-16 flex items-center gap-8 sm:gap-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          {[
            { value: "900+", labelEn: "Members", labelAr: "عضو" },
            { value: "10+", labelEn: "Events", labelAr: "فعالية" },
            { value: "1", labelEn: "Year", labelAr: "سنة" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl font-bold text-mpc-green-500 sm:text-3xl">{stat.value}</div>
              <div className="text-sm text-muted-foreground">
                {isRTL ? stat.labelAr : stat.labelEn}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
