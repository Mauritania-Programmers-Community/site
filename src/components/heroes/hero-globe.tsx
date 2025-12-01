"use client"

import { useTranslations, useLocale } from "next-intl"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Globe } from "@/components/ui/globe"
import { siteConfig } from "@/config/site"
import {
  ArrowRight,
  ArrowLeft,
  MessageCircle,
  Play,
  Users,
  Code2,
  Zap,
  MapPin,
} from "lucide-react"
import type { COBEOptions } from "cobe"

// MPC Globe Configuration - Featuring Mauritania
const MPC_GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 1, // Dark mode
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  // Dark base for contrast
  baseColor: [0.15, 0.15, 0.15],
  // MPC Green markers
  markerColor: [76 / 255, 175 / 255, 80 / 255],
  // Subtle green glow
  glowColor: [76 / 255, 175 / 255, 80 / 255],
  markers: [
    // Mauritania - Nouakchott (Main marker - larger)
    { location: [18.0735, -15.9582], size: 0.12 },
    // Other African tech hubs
    { location: [14.6928, -17.4467], size: 0.04 }, // Dakar, Senegal
    { location: [33.9716, -6.8498], size: 0.04 }, // Rabat, Morocco
    { location: [36.8065, 10.1815], size: 0.03 }, // Tunis, Tunisia
    { location: [30.0444, 31.2357], size: 0.04 }, // Cairo, Egypt
    { location: [6.5244, 3.3792], size: 0.04 }, // Lagos, Nigeria
    // Global tech centers where Mauritanians might be
    { location: [48.8566, 2.3522], size: 0.03 }, // Paris, France
    { location: [25.2048, 55.2708], size: 0.03 }, // Dubai, UAE
    { location: [40.7128, -74.006], size: 0.03 }, // New York, USA
    { location: [51.5074, -0.1278], size: 0.03 }, // London, UK
  ],
}

export function HeroGlobe() {
  const t = useTranslations()
  const locale = useLocale()
  const isRTL = locale === "ar"
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight

  return (
    <section className="relative min-h-screen overflow-hidden bg-background">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-mpc-green-950/20 via-background to-background" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(76,175,80,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(76,175,80,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="container relative mx-auto flex min-h-screen items-center px-4 py-20">
        <div className="grid w-full gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left content */}
          <motion.div
            className="relative z-10 flex flex-col justify-center order-2 lg:order-1"
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Location badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-mpc-green-500/30 bg-mpc-green-500/10 px-4 py-2 text-sm font-medium text-mpc-green-500">
                <MapPin className="h-4 w-4" />
                {isRTL ? "نواكشوط، موريتانيا" : "Nouakchott, Mauritania"}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="block text-foreground">{t("hero.title")}</span>
              <span className="block bg-gradient-to-r from-mpc-green-400 via-mpc-green-500 to-mpc-gold-500 bg-clip-text text-transparent">
                {t("hero.titleHighlight")}
              </span>
              <span className="block text-foreground">{t("hero.titleEnd")}</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              className="mb-8 max-w-lg text-lg text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {t("hero.description")}
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-col gap-4 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                size="lg"
                className="group h-12 gap-2 bg-mpc-green-500 px-6 font-semibold text-white shadow-lg shadow-mpc-green-500/25 hover:bg-mpc-green-600 hover:shadow-mpc-green-500/40 transition-all"
                asChild
              >
                <a
                  href={siteConfig.links.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-5 w-5" />
                  {t("hero.cta.join")}
                  <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                </a>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="group h-12 gap-2 border-2 px-6 font-semibold hover:border-mpc-green-500 hover:bg-mpc-green-500/10 transition-all"
                asChild
              >
                <Link href={`/${locale}/events`}>
                  <Play className="h-4 w-4" />
                  {t("hero.cta.events")}
                </Link>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="mt-12 flex flex-wrap gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {[
                { value: "880+", labelEn: "Members", labelAr: "عضو", icon: Users },
                { value: "4+", labelEn: "Domains", labelAr: "مجالات", icon: Code2 },
                { value: "24/7", labelEn: "Active", labelAr: "نشط", icon: Zap },
              ].map((stat, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-mpc-green-500/10">
                    <stat.icon className="h-5 w-5 text-mpc-green-500" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {isRTL ? stat.labelAr : stat.labelEn}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right - Globe */}
          <motion.div
            className="relative flex items-center justify-center order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Glow effect behind globe */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-[400px] w-[400px] rounded-full bg-mpc-green-500/20 blur-[100px] lg:h-[500px] lg:w-[500px]" />
            </div>

            {/* Globe container */}
            <div className="relative h-[350px] w-[350px] sm:h-[400px] sm:w-[400px] lg:h-[500px] lg:w-[500px]">
              <Globe
                config={MPC_GLOBE_CONFIG}
                className="relative h-full w-full"
              />
            </div>

            {/* Floating label for Mauritania */}
            <motion.div
              className="absolute bottom-1/4 end-0 hidden lg:block"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <div className="flex items-center gap-2 rounded-lg border border-mpc-green-500/30 bg-card/80 px-3 py-2 backdrop-blur-sm">
                <div className="h-2 w-2 animate-pulse rounded-full bg-mpc-green-500" />
                <span className="text-sm font-medium text-foreground">
                  {isRTL ? "موريتانيا" : "Mauritania"}
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
