"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Boxes } from "@/components/ui/background-boxes";
import { siteConfig } from "@/config/site";
import {
  ArrowRight,
  ArrowLeft,
  MessageCircle,
  Play,
  Users,
  Calendar,
  Sparkles,
} from "lucide-react";

export function HeroBoxes() {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === "ar";
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-slate-900">
      {/* Boxes Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Boxes />
      </div>

      {/* Gradient overlays for better text readability */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/60" />
      <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(15,23,42,0.8)_70%)]" />

      <div className="container relative z-20 mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-20 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-mpc-green-500/40 bg-mpc-green-500/10 px-5 py-2.5 text-sm font-medium text-mpc-green-400 backdrop-blur-md">
            <Sparkles className="h-4 w-4" />
            {t("hero.badge")}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="mb-6 max-w-5xl text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <span className="block">{t("hero.title")}</span>
          <motion.span
            className="relative block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <span className="bg-gradient-to-r from-mpc-green-400 via-emerald-400 to-mpc-gold-400 bg-clip-text text-transparent">
              {t("hero.titleHighlight")}
            </span>
            {/* Underline decoration */}
            <motion.div
              className="absolute -bottom-2 left-1/2 h-1 -translate-x-1/2 rounded-full bg-gradient-to-r from-mpc-green-500 to-mpc-gold-500"
              initial={{ width: 0 }}
              animate={{ width: "60%" }}
              transition={{ delay: 0.6, duration: 0.8 }}
            />
          </motion.span>
          <span className="block">{t("hero.titleEnd")}</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          className="mx-auto mb-10 max-w-2xl text-lg text-slate-300 sm:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {t("hero.description")}
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mb-16 flex flex-col gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
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
            className="group h-14 gap-3 border-2 border-slate-600 bg-slate-800/50 px-8 text-lg font-semibold text-white backdrop-blur-sm hover:border-mpc-green-500 hover:bg-mpc-green-500/20 transition-all duration-300"
            asChild
          >
            <Link href={`/${locale}/events`}>
              <Play className="h-5 w-5" />
              {t("hero.cta.events")}
            </Link>
          </Button>
        </motion.div>

        {/* Stats cards */}
        <motion.div
          className="grid grid-cols-2 gap-4 sm:flex sm:gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          {[
            { value: "880+", labelEn: "Members", labelAr: "عضو", icon: Users },
            { value: "10+", labelEn: "Events", labelAr: "فعالية", icon: Calendar },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-3 rounded-2xl border border-slate-700/50 bg-slate-800/50 px-6 py-4 backdrop-blur-md"
              whileHover={{ scale: 1.05, borderColor: "rgba(76,175,80,0.5)" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-mpc-green-500/20">
                <stat.icon className="h-5 w-5 text-mpc-green-400" />
              </div>
              <div className="text-start">
                <div className="text-xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-slate-400">
                  {isRTL ? stat.labelAr : stat.labelEn}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 z-20 h-32 bg-gradient-to-t from-slate-900 to-transparent" />
    </section>
  );
}
