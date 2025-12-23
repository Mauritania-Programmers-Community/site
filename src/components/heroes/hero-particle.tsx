"use client";

import { useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import {
  ArrowRight,
  ArrowLeft,
  MessageCircle,
  Play,
  Sparkles,
} from "lucide-react";

// Simple particle animation without canvas for better performance
function ParticleField() {
  // Deterministic particle positions to avoid hydration mismatch
  const particles = useMemo(() => {
    const goldenRatio = 0.618033988749;
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: (i * goldenRatio * 100) % 100,
      y: (i * goldenRatio * 61.8 + 10) % 100,
      size: (i % 3) + 1.5,
      delay: (i * 0.1) % 5,
      duration: 2 + (i % 3),
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-mpc-green-500/40"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Animated text with particle-like reveal
function AnimatedTitle({ children, delay = 0 }: { children: string; delay?: number }) {
  return (
    <motion.span
      className="inline-block"
      initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ delay, duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.span>
  );
}

export function HeroParticle() {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === "ar";
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section className="relative min-h-screen overflow-hidden bg-background">
      {/* Gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/10 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(76,175,80,0.15),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,193,7,0.1),transparent_50%)]" />
      </div>

      {/* Particle field */}
      <ParticleField />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(76,175,80,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(76,175,80,0.03)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />

      <div className="container relative mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-20 text-center">
        {/* Floating badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-mpc-green-500/30 bg-gradient-to-r from-mpc-green-500/10 to-mpc-gold-500/10 px-6 py-3 text-sm font-medium text-mpc-green-600 shadow-lg shadow-mpc-green-500/10 backdrop-blur-md dark:text-mpc-green-400">
            <Sparkles className="h-4 w-4" />
            {t("hero.badge")}
            <motion.span
              className="h-2 w-2 rounded-full bg-mpc-green-500"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </span>
        </motion.div>

        {/* Main title with animated reveal */}
        <h1 className="mb-6 max-w-5xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
          <AnimatedTitle delay={0.1}>{t("hero.title")}</AnimatedTitle>
          <br />
          <motion.span
            className="inline-block bg-gradient-to-r from-mpc-green-400 via-mpc-green-500 to-mpc-gold-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {t("hero.titleHighlight")}
          </motion.span>
          <br />
          <AnimatedTitle delay={0.5}>{t("hero.titleEnd")}</AnimatedTitle>
        </h1>

        {/* Description with staggered animation */}
        <motion.p
          className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl md:text-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          {t("hero.description")}
        </motion.p>

        {/* CTAs with hover effects */}
        <motion.div
          className="flex flex-col gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <Button
            size="lg"
            className="group relative h-14 gap-3 overflow-hidden bg-mpc-green-500 px-8 text-lg font-semibold text-white transition-all duration-300 hover:bg-mpc-green-600"
            asChild
          >
            <a
              href={siteConfig.links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              />
              <MessageCircle className="h-5 w-5" />
              {t("hero.cta.join")}
              <ArrowIcon className="h-5 w-5 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
            </a>
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="group h-14 gap-3 border-2 px-8 text-lg font-semibold transition-all duration-300 hover:border-mpc-green-500 hover:bg-mpc-green-500/10 hover:shadow-lg hover:shadow-mpc-green-500/20"
            asChild
          >
            <Link href={`/${locale}/events`}>
              <Play className="h-5 w-5" />
              {t("hero.cta.events")}
            </Link>
          </Button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="mt-20 flex flex-wrap items-center justify-center gap-8 sm:gap-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          {[
            { value: "900+", labelEn: "Developers", labelAr: "مطور" },
            { value: "4", labelEn: "Tech Domains", labelAr: "مجالات تقنية" },
            { value: "10+", labelEn: "Events", labelAr: "فعالية" },
            { value: "1", labelEn: "Year Strong", labelAr: "سنة قوية" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 + index * 0.1 }}
              whileHover={{ scale: 1.1 }}
            >
              <div className="text-3xl font-bold text-mpc-green-500 sm:text-4xl">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {isRTL ? stat.labelAr : stat.labelEn}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
