"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import dynamic from "next/dynamic";
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

// Dynamically import the neon raymarcher (requires Three.js)
const NeonScene = dynamic(
  () => import("@/components/neon-raymarcher").then((mod) => mod.Scene),
  { ssr: false }
);

const domains = [
  { icon: Code2, labelEn: "Web", labelAr: "ويب" },
  { icon: Shield, labelEn: "Security", labelAr: "أمن" },
  { icon: Brain, labelEn: "AI", labelAr: "ذكاء" },
  { icon: Smartphone, labelEn: "Mobile", labelAr: "موبايل" },
];

export function HeroNeon() {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === "ar";
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Neon Raymarcher Background */}
      <div className="absolute inset-0 z-0">
        <NeonScene />
      </div>

      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-neutral-950/90 via-neutral-950/50 to-transparent" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/50" />

      {/* Content */}
      <div className="container relative z-20 mx-auto flex min-h-screen items-center px-6 py-20 lg:px-16">
        <div className="max-w-2xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 rounded-xl border border-mpc-green-500/30 bg-mpc-green-500/10 px-4 py-2 text-sm font-medium text-mpc-green-400 backdrop-blur-sm">
              <motion.span
                className="h-2 w-2 rounded-full bg-mpc-green-500"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              {t("hero.badge")}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="mb-6 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <span className="block">{t("hero.title")}</span>
            <span className="block bg-gradient-to-r from-mpc-green-400 to-emerald-300 bg-clip-text text-transparent">
              {t("hero.titleHighlight")}
            </span>
            <span className="block">{t("hero.titleEnd")}</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            className="mb-8 max-w-lg text-base text-neutral-300 sm:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {t("hero.description")}
          </motion.p>

          {/* Domain pills */}
          <motion.div
            className="mb-10 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {domains.map((domain, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-800/50 px-4 py-2 backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ borderColor: "rgba(76,175,80,0.5)", scale: 1.05 }}
              >
                <domain.icon className="h-4 w-4 text-mpc-green-500" />
                <span className="text-sm text-neutral-300">
                  {isRTL ? domain.labelAr : domain.labelEn}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="flex flex-col gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Button
              size="lg"
              className="group h-14 gap-3 bg-mpc-green-500 px-8 text-lg font-semibold text-white shadow-lg shadow-mpc-green-500/30 hover:bg-mpc-green-600 hover:shadow-mpc-green-500/50 transition-all duration-300"
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
              className="group h-14 gap-3 border-2 border-neutral-600 bg-neutral-800/50 px-8 text-lg font-semibold text-white backdrop-blur-sm hover:border-mpc-green-500 hover:bg-mpc-green-500/20 transition-all duration-300"
              asChild
            >
              <Link href={`/${locale}/events`}>
                <Play className="h-5 w-5" />
                {t("hero.cta.events")}
              </Link>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="mt-12 flex gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            {[
              { value: "880+", labelEn: "Members", labelAr: "عضو" },
              { value: "10+", labelEn: "Events", labelAr: "فعالية" },
              { value: "4", labelEn: "Domains", labelAr: "مجالات" },
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-2xl font-bold text-mpc-green-400">{stat.value}</div>
                <div className="text-sm text-neutral-500">
                  {isRTL ? stat.labelAr : stat.labelEn}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
