"use client";

import { useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { ArrowRight, ArrowLeft, MessageCircle, Play, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { TextEffect } from "@/components/ui/text-effect";
import { siteConfig } from "@/config/site";

// Animated gradient orb component
function GradientOrb({
  className,
  delay = 0,
  duration = 20
}: {
  className: string;
  delay?: number;
  duration?: number;
}) {
  return (
    <motion.div
      className={className}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3],
        x: [0, 30, 0],
        y: [0, -20, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  );
}

// Floating particle component
function FloatingParticle({ delay, x, y }: { delay: number; x: string; y: string }) {
  return (
    <motion.div
      className="absolute h-1 w-1 rounded-full bg-mpc-green-500/60"
      style={{ left: x, top: y }}
      animate={{
        y: [0, -30, 0],
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  );
}

export function HeroTailark() {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === "ar";
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;
  const prefersReducedMotion = useReducedMotion();

  const titleHighlight = t("hero.titleHighlight");

  // Deterministic particle positions to avoid hydration mismatch
  const particles = useMemo(() => {
    const goldenRatio = 0.618033988749;
    return Array.from({ length: 10 }, (_, i) => ({
      id: i,
      delay: i * 0.2,
      x: `${((i * goldenRatio * 100 + 20) % 100).toFixed(2)}%`,
      y: `${((i * goldenRatio * 50 + 25) % 100).toFixed(2)}%`,
    }));
  }, []);

  return (
    <main className="overflow-hidden">
      <section className="relative min-h-screen">
        {/* Enhanced background */}
        <div className="absolute inset-0 -z-10">
          {/* Base gradient */}
          <div className="absolute inset-0 bg-linear-to-b from-background via-background to-muted/30" />

          {/* Animated gradient orbs */}
          <GradientOrb
            className="absolute -top-40 start-1/4 h-[500px] w-[500px] rounded-full bg-mpc-green-500/20 blur-[120px]"
            delay={0}
          />
          <GradientOrb
            className="absolute top-1/3 -end-20 h-[400px] w-[400px] rounded-full bg-mpc-gold-500/15 blur-[100px]"
            delay={5}
          />
          <GradientOrb
            className="absolute -bottom-20 start-1/3 h-[600px] w-[600px] rounded-full bg-mpc-green-600/10 blur-[150px]"
            delay={10}
          />

          {/* Grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(76,175,80,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(76,175,80,0.03)_1px,transparent_1px)] bg-size-[60px_60px] mask-[radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

          {/* Radial gradient overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(76,175,80,0.1),transparent_50%)]" />

          {/* Floating particles */}
          {particles.map((particle) => (
            <FloatingParticle key={particle.id} {...particle} />
          ))}
        </div>

        <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-32 lg:pt-44">
          <div className="relative z-10 mx-auto max-w-4xl text-center">
            {/* Badge */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-mpc-green-500/30 bg-mpc-green-500/10 px-5 py-2.5 text-sm font-medium text-mpc-green-600 dark:text-mpc-green-400 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mpc-green-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-mpc-green-500" />
                </span>
                {t("hero.badge")}
              </span>
            </motion.div>

            {/* Main Title with Text Effect */}
            <TextEffect
              preset="fade-in-blur"
              speedSegment={0.3}
              as="h1"
              className="text-balance text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl"
            >
              {t("hero.title")}
            </TextEffect>

            <motion.div
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-2"
            >
              <span className="text-balance text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl bg-linear-to-r from-mpc-green-400 via-mpc-green-500 to-mpc-gold-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient_3s_linear_infinite]">
                {titleHighlight}
              </span>
            </motion.div>

            <TextEffect
              preset="fade-in-blur"
              speedSegment={0.3}
              delay={0.5}
              as="span"
              className="mt-2 block text-balance text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl"
            >
              {t("hero.titleEnd")}
            </TextEffect>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mx-auto mt-8 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg md:text-xl"
            >
              {t("hero.description")}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:mt-12 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              <Button
                size="lg"
                className="group h-12 w-full gap-3 bg-mpc-green-500 px-6 text-base font-semibold text-white shadow-lg shadow-mpc-green-500/25 hover:bg-mpc-green-600 hover:shadow-mpc-green-500/40 transition-all duration-300 sm:h-14 sm:w-auto sm:px-8 sm:text-lg"
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
                className="group h-12 w-full gap-3 border-2 px-6 text-base font-semibold hover:border-mpc-green-500 hover:bg-mpc-green-500/10 transition-all duration-300 sm:h-14 sm:w-auto sm:px-8 sm:text-lg"
                asChild
              >
                <Link href={`/${locale}/events`}>
                  <Play className="h-5 w-5" />
                  {t("hero.cta.events")}
                </Link>
              </Button>
            </motion.div>

            {/* Visual element - Enhanced Terminal */}
            <motion.div
              className="mt-16 sm:mt-20"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
            >
              <div
                aria-hidden
                className="relative mx-auto max-w-3xl"
              >
                {/* Background decorative card */}
                <motion.div
                  className="absolute inset-0 mx-auto w-72 -translate-y-8 rounded-[2rem] border border-border/30 bg-card/50 p-2 opacity-40 sm:w-80 sm:-translate-x-6 sm:-translate-y-12 mask-[linear-gradient(to_bottom,#000_30%,transparent_80%)]"
                  animate={{ y: [-12, -8, -12] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="relative h-48 overflow-hidden rounded-[1.5rem] border bg-muted/30 p-4 sm:h-64">
                    <div className="flex gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-400/60" />
                      <div className="h-3 w-3 rounded-full bg-yellow-400/60" />
                      <div className="h-3 w-3 rounded-full bg-green-400/60" />
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="h-3 w-3/4 rounded bg-mpc-green-500/20" />
                      <div className="h-3 w-1/2 rounded bg-mpc-green-500/20" />
                      <div className="h-3 w-2/3 rounded bg-mpc-gold-500/20" />
                    </div>
                  </div>
                </motion.div>

                {/* Main terminal card */}
                <motion.div
                  className="relative mx-auto w-72 rounded-[2rem] border border-mpc-green-500/30 bg-card/90 p-2 shadow-2xl shadow-mpc-green-500/10 backdrop-blur-xl sm:w-80 sm:translate-x-6 mask-[linear-gradient(to_bottom,#000_50%,transparent_95%)]"
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="overflow-hidden rounded-[1.5rem] border bg-background/80 p-4 shadow-inner backdrop-blur-sm">
                    {/* Terminal header */}
                    <div className="flex items-center gap-2 border-b border-border/50 pb-3">
                      <div className="h-3 w-3 rounded-full bg-red-400" />
                      <div className="h-3 w-3 rounded-full bg-yellow-400" />
                      <div className="h-3 w-3 rounded-full bg-green-400" />
                      <span className="ms-2 text-xs text-muted-foreground font-mono">terminal</span>
                    </div>

                    {/* Terminal content */}
                    <div className="mt-4 space-y-3 font-mono text-xs sm:text-sm">
                      <motion.div
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.3 }}
                      >
                        <span className="text-mpc-green-500">$</span>
                        <span className="text-muted-foreground">npm create mpc-app</span>
                      </motion.div>
                      <motion.div
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.5 }}
                      >
                        <span className="text-mpc-gold-500">→</span>
                        <span className="text-foreground">
                          {isRTL ? "مرحباً بك في MPC!" : "Welcome to MPC!"}
                        </span>
                      </motion.div>
                      <motion.div
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.7 }}
                      >
                        <span className="text-mpc-green-500">✓</span>
                        <span className="text-muted-foreground">
                          {isRTL ? "900+ مطور نشط" : "900+ active developers"}
                        </span>
                      </motion.div>
                      <motion.div
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.9 }}
                      >
                        <span className="text-mpc-green-500">✓</span>
                        <span className="text-muted-foreground">
                          {isRTL ? "4 مجالات تقنية" : "4 tech domains"}
                        </span>
                      </motion.div>
                      <div className="flex items-center gap-2 pt-2">
                        <span className="text-mpc-green-500">$</span>
                        <motion.div
                          className="h-4 w-2 bg-mpc-green-500"
                          animate={{ opacity: [1, 0, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Decorative elements */}
                <motion.div
                  className="absolute -start-4 top-1/3 hidden rounded-xl border bg-card/80 p-2 shadow-lg backdrop-blur-sm sm:block sm:-start-8"
                  animate={{ y: [0, -8, 0], rotate: [0, 5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Sparkles className="h-5 w-5 text-mpc-gold-500 sm:h-6 sm:w-6" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Tech cloud */}
        <motion.div
          className="mx-auto max-w-5xl border-t border-border/50 px-6 py-10 sm:py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <p className="mb-6 text-center text-sm text-muted-foreground sm:mb-8">
            {isRTL ? "التقنيات التي نتعلمها ونستخدمها" : "Technologies we learn and use"}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
            {["React", "Next.js", "Python", "TypeScript", "Node.js", "AI/ML"].map((tech, index) => (
              <motion.span
                key={tech}
                className="text-sm font-medium text-muted-foreground/70 transition-colors hover:text-mpc-green-500 sm:text-base lg:text-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 + index * 0.1 }}
                whileHover={{ scale: 1.1 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </section>
    </main>
  );
}
