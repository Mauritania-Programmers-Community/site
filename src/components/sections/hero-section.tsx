"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import {
  ArrowRight,
  ArrowLeft,
  MessageCircle,
  Play,
  Code2,
  Users,
  Zap,
  Terminal,
  Braces,
  GitBranch,
  ChevronRight,
} from "lucide-react";
import { useRef, useState, useEffect, useMemo } from "react";

// Animated background mesh
function MeshGradient({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20" />

      {/* Animated mesh gradient */}
      <motion.div
        className="absolute -top-1/2 -start-1/2 h-full w-full"
        animate={prefersReducedMotion ? {} : {
          background: [
            "radial-gradient(circle at 30% 30%, rgba(76,175,80,0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 70% 70%, rgba(76,175,80,0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 30% 70%, rgba(76,175,80,0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 30% 30%, rgba(76,175,80,0.15) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        style={{ width: "200%", height: "200%" }}
      />

      {/* Secondary gradient */}
      <motion.div
        className="absolute -bottom-1/2 -end-1/2 h-full w-full"
        animate={prefersReducedMotion ? {} : {
          background: [
            "radial-gradient(circle at 70% 70%, rgba(255,193,7,0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 30% 30%, rgba(255,193,7,0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 70% 30%, rgba(255,193,7,0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 70% 70%, rgba(255,193,7,0.1) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        style={{ width: "200%", height: "200%" }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(76,175,80,0.02)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(76,175,80,0.02)_1.5px,transparent_1.5px)] bg-[size:50px_50px]" />

      {/* Noise texture */}
      <div className="absolute inset-0 opacity-20 mix-blend-soft-light" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")" }} />
    </div>
  );
}

// Floating icon component
function FloatingIcon({
  icon: Icon,
  className,
  delay = 0,
  prefersReducedMotion = false
}: {
  icon: typeof Code2;
  className: string;
  delay?: number;
  prefersReducedMotion?: boolean;
}) {
  return (
    <motion.div
      className={`absolute rounded-2xl border bg-card/80 p-3 shadow-lg backdrop-blur-sm ${className}`}
      aria-hidden="true"
      initial={{ opacity: 0, scale: 0 }}
      animate={prefersReducedMotion ? { opacity: 1, scale: 1 } : {
        opacity: 1,
        scale: 1,
        y: [0, -10, 0],
      }}
      transition={{
        opacity: { delay, duration: 0.5 },
        scale: { delay, duration: 0.5 },
        y: { delay: delay + 0.5, duration: 3, repeat: Infinity, ease: "easeInOut" }
      }}
    >
      <Icon className="h-5 w-5 text-mpc-green-500 sm:h-6 sm:w-6" />
    </motion.div>
  );
}

// Interactive Terminal Component
function InteractiveTerminal({ isRTL }: { isRTL: boolean }) {
  const [lines, setLines] = useState<Array<{ type: "command" | "output" | "success" | "info"; text: string }>>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  const terminalSequence = useMemo(() => [
    { type: "command" as const, text: "$ npx create-mpc-developer", delay: 100 },
    { type: "info" as const, text: isRTL ? "جاري التحضير..." : "Initializing...", delay: 800 },
    { type: "success" as const, text: isRTL ? "✓ مرحباً بك في مجتمع MPC!" : "✓ Welcome to MPC Community!", delay: 600 },
    { type: "output" as const, text: "", delay: 300 },
    { type: "command" as const, text: "$ mpc status", delay: 500 },
    { type: "output" as const, text: isRTL ? "  المطورين النشطين: 880+" : "  Active developers: 880+", delay: 400 },
    { type: "output" as const, text: isRTL ? "  المجالات: ويب، أمن، ذكاء، موبايل" : "  Domains: web, security, ai, mobile", delay: 400 },
    { type: "output" as const, text: isRTL ? "  الحالة: نشط 24/7" : "  Status: Active 24/7", delay: 400 },
    { type: "output" as const, text: "", delay: 300 },
    { type: "command" as const, text: "$ mpc join --now", delay: 500 },
    { type: "success" as const, text: isRTL ? "✓ جاهز للانضمام!" : "✓ Ready to join!", delay: 600 },
  ], [isRTL]);

  useEffect(() => {
    if (currentLineIndex < terminalSequence.length) {
      const currentItem = terminalSequence[currentLineIndex];
      const timer = setTimeout(() => {
        if (currentItem.type === "command") {
          // Type command character by character
          let charIndex = 0;
          const typeInterval = setInterval(() => {
            if (charIndex <= currentItem.text.length) {
              setLines(prev => {
                const newLines = [...prev];
                if (newLines.length === 0 || newLines[newLines.length - 1].text !== currentItem.text.substring(0, charIndex)) {
                  if (charIndex === 0) {
                    newLines.push({ type: "command", text: "" });
                  } else {
                    newLines[newLines.length - 1] = { type: "command", text: currentItem.text.substring(0, charIndex) };
                  }
                }
                return newLines;
              });
              charIndex++;
            } else {
              clearInterval(typeInterval);
              setCurrentLineIndex(prev => prev + 1);
            }
          }, 50);
        } else {
          setLines(prev => [...prev, { type: currentItem.type, text: currentItem.text }]);
          setCurrentLineIndex(prev => prev + 1);
        }
      }, currentItem.delay);

      return () => clearTimeout(timer);
    }
  }, [currentLineIndex, terminalSequence]);

  return (
    <div className="space-y-1.5 font-mono text-xs sm:text-sm">
      {lines.map((line, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className={`flex items-start gap-2 ${
            line.type === "success" ? "text-mpc-green-400" :
            line.type === "info" ? "text-mpc-gold-400" :
            line.type === "command" ? "text-foreground" :
            "text-muted-foreground"
          }`}
        >
          {line.type === "command" && <ChevronRight className="h-3 w-3 mt-1 text-mpc-green-500 flex-shrink-0" />}
          <span className={line.type === "output" ? "ps-5" : ""}>{line.text}</span>
        </motion.div>
      ))}

      {/* Blinking cursor */}
      {currentLineIndex >= terminalSequence.length && (
        <div className="flex items-center gap-2 pt-2 border-t border-border/30 mt-3">
          <span className="text-mpc-green-500">$</span>
          <motion.span
            className="inline-block h-4 w-2 bg-mpc-green-500"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </div>
      )}
    </div>
  );
}

export function HeroSection() {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === "ar";
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const codeY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 100]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 50]);

  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden bg-background">
      <MeshGradient prefersReducedMotion={!!prefersReducedMotion} />

      <div className="container relative mx-auto flex min-h-screen items-center px-4 py-20 lg:py-0">
        <div className="grid w-full gap-8 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          {/* Left content */}
          <motion.div
            className="flex flex-col justify-center order-2 lg:order-1"
            style={{ y: contentY }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 sm:mb-8"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-mpc-green-500/30 bg-mpc-green-500/5 px-4 py-2 text-sm font-medium text-mpc-green-600 backdrop-blur-sm dark:text-mpc-green-400">
                <Terminal className="h-4 w-4" />
                {t("hero.badge")}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              className="mb-4 text-3xl font-bold tracking-tight sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <span className="block">{t("hero.title")}</span>
              <motion.span
                className="block bg-gradient-to-r from-mpc-green-500 via-mpc-green-400 to-mpc-gold-500 bg-clip-text text-transparent"
                animate={prefersReducedMotion ? {} : {
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
              className="mb-6 max-w-lg text-base text-muted-foreground sm:mb-8 sm:text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {t("hero.description")}
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-col gap-3 sm:flex-row sm:gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Button
                size="lg"
                className="group h-12 gap-2 bg-mpc-green-500 px-6 font-semibold text-white shadow-lg shadow-mpc-green-500/25 hover:bg-mpc-green-600 hover:shadow-mpc-green-500/40 transition-all duration-300"
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
                className="group h-12 gap-2 border-2 px-6 font-semibold hover:border-mpc-green-500 hover:bg-mpc-green-500/10 transition-all duration-300"
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
              className="mt-10 flex flex-wrap gap-6 sm:mt-12 sm:gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {[
                { value: "880+", labelEn: "Members", labelAr: "عضو", icon: Users },
                { value: "4+", labelEn: "Domains", labelAr: "مجالات", icon: Code2 },
                { value: "24/7", labelEn: "Active", labelAr: "نشط", icon: Zap },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-mpc-green-500/10 sm:h-12 sm:w-12">
                    <stat.icon className="h-4 w-4 text-mpc-green-500 sm:h-5 sm:w-5" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-foreground sm:text-2xl">{stat.value}</div>
                    <div className="text-xs text-muted-foreground sm:text-sm">
                      {isRTL ? stat.labelAr : stat.labelEn}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right visual - Interactive Terminal */}
          <motion.div
            className="relative flex items-center justify-center order-1 lg:order-2"
            style={{ y: codeY }}
          >
            {/* Floating icons */}
            <FloatingIcon
              icon={Braces}
              className="hidden -start-4 top-1/4 lg:block"
              delay={0.8}
              prefersReducedMotion={!!prefersReducedMotion}
            />
            <FloatingIcon
              icon={GitBranch}
              className="hidden -end-4 bottom-1/3 lg:block"
              delay={1}
              prefersReducedMotion={!!prefersReducedMotion}
            />

            {/* Main terminal card */}
            <motion.div
              className="relative w-full max-w-md"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {/* Glow effect */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-mpc-green-500/20 to-mpc-gold-500/20 blur-2xl" aria-hidden="true" />

              {/* Background layers */}
              <div className="absolute -end-4 -top-4 h-full w-full rounded-2xl border border-mpc-green-500/20 bg-mpc-green-500/5 sm:-end-6 sm:-top-6" aria-hidden="true" />
              <div className="absolute -end-8 -top-8 h-full w-full rounded-2xl border border-mpc-gold-500/10 bg-mpc-gold-500/5 sm:-end-12 sm:-top-12" aria-hidden="true" />

              {/* Main card */}
              <motion.div
                className="relative z-10 rounded-2xl border border-border/50 bg-card/95 p-4 shadow-2xl backdrop-blur-xl sm:p-6"
                whileHover={prefersReducedMotion ? {} : { y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Window controls */}
                <div className="mb-4 flex items-center justify-between border-b border-border/50 pb-4">
                  <div className="flex gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-400" />
                    <div className="h-3 w-3 rounded-full bg-yellow-400" />
                    <div className="h-3 w-3 rounded-full bg-green-400" />
                  </div>
                  <span className="text-xs text-muted-foreground font-mono flex items-center gap-1">
                    <Terminal className="h-3 w-3" />
                    mpc-terminal
                  </span>
                </div>

                {/* Interactive Terminal content */}
                <div className="min-h-[200px]">
                  <InteractiveTerminal isRTL={isRTL} />
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" aria-hidden="true" />
    </section>
  );
}
