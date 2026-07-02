"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { useAmbientMotion } from "@/hooks/use-ambient-motion";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import {
  ArrowRight,
  ArrowLeft,
  Play,
  Terminal as TerminalIcon,
  Braces,
  GitBranch,
  Code2,
} from "lucide-react";
import { useRef, useCallback, useState, useEffect } from "react";
import { InteractiveTerminal, Terminal, TypingAnimation, AnimatedSpan } from "@/components/magicui/terminal";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import Image from "next/image";

// Animated background mesh
function MeshGradient({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-background via-background to-muted/20" />

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
      <div className="absolute inset-0 bg-[linear-gradient(rgba(76,175,80,0.02)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(76,175,80,0.02)_1.5px,transparent_1.5px)] bg-size-[50px_50px]" />

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

// Static terminal for mobile (no user input)
function StaticTerminal({
  t,
  ArrowIcon
}: {
  t: ReturnType<typeof useTranslations>;
  ArrowIcon: typeof ArrowRight | typeof ArrowLeft;
}) {
  return (
    <Terminal className="min-h-[200px]">
      <TypingAnimation typingSpeed={30}>
        $ whoami
      </TypingAnimation>
      <AnimatedSpan className="text-muted-foreground">
        {t("terminal.commands.whoami")}
      </AnimatedSpan>
      <AnimatedSpan>{""}</AnimatedSpan>

      <TypingAnimation typingSpeed={30}>
        $ uname -a
      </TypingAnimation>
      <AnimatedSpan className="text-muted-foreground">
        {t("terminal.commands.uname")}
      </AnimatedSpan>
      <AnimatedSpan>{""}</AnimatedSpan>

      <TypingAnimation typingSpeed={30}>
        $ sudo join mpc-community
      </TypingAnimation>
      <AnimatedSpan className="text-muted-foreground">
        {t("terminal.commands.sudoPassword")}
      </AnimatedSpan>
      <AnimatedSpan className="text-mpc-green-400">
        {t("terminal.commands.sudoSuccess")}
      </AnimatedSpan>

      {/* Join button - rendered after animation */}
      <div className="mt-4 flex justify-start">
        <a
          href={siteConfig.links.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-mpc-green-500/10 border border-mpc-green-500/30 text-mpc-green-500 hover:bg-mpc-green-500/20 hover:border-mpc-green-500/50 transition-all duration-200 font-medium text-xs sm:text-sm group"
        >
          <Image src="/images/whatsapp-icon.svg" alt="WhatsApp" width={16} height={16} className="h-4 w-4" />
          <span>{t("hero.cta.join")}</span>
          <ArrowIcon className="h-3 w-3 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
        </a>
      </div>
    </Terminal>
  );
}


export function HeroSection() {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === "ar";
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;
  const containerRef = useRef<HTMLElement>(null);
  // Ambient/infinite hero effects run on desktop only (mobile + reduced-motion stay calm).
  const ambient = useAmbientMotion();
  const calm = !ambient;
  const [isMounted, setIsMounted] = useState(false);

  // Avoid hydration mismatch by only rendering terminal on client
  useEffect(() => {
    setIsMounted(true); // eslint-disable-line react-hooks/set-state-in-effect
  }, []);

  // Terminal command handler
  const handleCommand = useCallback((command: string): string | string[] | React.ReactNode => {
    const cmd = command.toLowerCase().trim();
    const availableCommands = [
      'whoami',
      'uname',
      'uname -a',
      'sudo join mpc-community',
      'help',
      'clear'
    ];

    if (cmd === "whoami") {
      return t("terminal.commands.whoami");
    } else if (cmd === "uname" || cmd === "uname -a") {
      return t("terminal.commands.uname");
    } else if (cmd.startsWith("sudo join") || cmd === "sudo join mpc-community") {
      return (
        <div className="space-y-2">
          <div className="text-muted-foreground">
            {t("terminal.commands.sudoPassword")}
          </div>
          <div className="text-mpc-green-400">
            {t("terminal.commands.sudoSuccess")}
          </div>
          <a
            href={siteConfig.links.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-2 px-4 py-2 rounded-md bg-mpc-green-500/10 border border-mpc-green-500/30 text-mpc-green-500 hover:bg-mpc-green-500/20 hover:border-mpc-green-500/50 transition-all duration-200 font-medium text-xs sm:text-sm group"
          >
            <Image src="/images/whatsapp-icon.svg" alt="WhatsApp" width={16} height={16} className="h-4 w-4" />
            <span>{t("hero.cta.join")}</span>
            <ArrowIcon className="h-3 w-3 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
          </a>
        </div>
      );
    } else if (cmd === "help") {
      return [
        t("terminal.commands.help.title"),
        t("terminal.commands.help.whoami"),
        t("terminal.commands.help.uname"),
        t("terminal.commands.help.sudo"),
        t("terminal.commands.help.help"),
        t("terminal.commands.help.clear")
      ];
    } else if (cmd === "clear") {
      return ""; // Special case - will be handled by component
    } else {
      // Find closest match for suggestion
      const firstWord = cmd.split(' ')[0];
      const matches = availableCommands.filter(availCmd =>
        availCmd.toLowerCase().includes(firstWord) ||
        firstWord.includes(availCmd.toLowerCase().split(' ')[0])
      );

      const errorMessages = [
        t("terminal.errors.unknown", { command: cmd })
      ];

      if (matches.length > 0) {
        errorMessages.push(t("terminal.errors.didYouMean", { suggestion: matches[0] }));
      }

      errorMessages.push(t("terminal.errors.tryHelp"));

      return errorMessages;
    }
  }, [t, ArrowIcon]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const codeY = useTransform(scrollYProgress, [0, 1], [0, calm ? 0 : 100]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, calm ? 0 : 50]);

  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden bg-background">
      <MeshGradient prefersReducedMotion={calm} />

      <div className="container relative mx-auto flex min-h-screen items-center px-4 py-16 sm:py-20 xl:py-0">
        <div className="flex w-full flex-col gap-10 xl:grid xl:grid-cols-2 xl:gap-16 2xl:gap-24">
          {/* Title and description */}
          <motion.div
            className="flex flex-col justify-center xl:row-span-1"
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
                <TerminalIcon className="h-4 w-4" />
                {t("hero.badge")}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              className="mb-6 text-4xl font-bold tracking-tight sm:mb-8 sm:text-5xl md:text-6xl xl:text-7xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <span>{t("hero.title")} </span>
              <motion.span
                className={`${isRTL ? 'bg-linear-to-l' : 'bg-linear-to-r'} from-mpc-green-500 via-mpc-green-400 to-mpc-gold-500 bg-clip-text text-transparent`}
                animate={calm || isRTL ? {} : {
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                style={{ backgroundSize: isRTL ? "100% auto" : "200% auto" }}
              >
                {t("hero.titleHighlight")}
              </motion.span>
              <span> {t("hero.titleEnd")}</span>
            </motion.h1>

            {/* Description */}
            <motion.div
              className="mb-8 sm:max-w-lg sm:mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <ScrollReveal
                containerClassName="text-base text-muted-foreground sm:text-lg"
                baseOpacity={0.3}
                baseRotation={1}
                blurStrength={2}
              >
                {t("hero.description")}
              </ScrollReveal>
            </motion.div>

            {/* CTAs */}
            <motion.div
              className="flex flex-col gap-3 sm:flex-row sm:gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <RainbowButton
                size="lg"
                className="group h-12 gap-2 px-6"
                asChild
              >
                <a
                  href={siteConfig.links.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image src="/images/whatsapp-icon.svg" alt="" width={20} height={20} className="h-5 w-5" />
                  {t("hero.cta.join")}
                  <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                </a>
              </RainbowButton>

              <Button
                size="lg"
                variant="outline"
                className="group h-12 gap-2 border-2 px-6 font-semibold hover:border-mpc-green-500 hover:bg-mpc-green-500/10 transition-all duration-300"
                asChild
              >
                <Link href="/events">
                  <Play className="h-4 w-4 order-first rtl:order-last" />
                  {t("hero.cta.events")}
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Interactive Terminal */}
          <motion.div
            className="relative flex items-center justify-center xl:col-start-2 xl:row-start-1 xl:row-span-2"
            style={{ y: codeY }}
          >
            {/* Floating icons */}
            <FloatingIcon
              icon={Braces}
              className="hidden -start-4 top-1/4 lg:block"
              delay={0.8}
              prefersReducedMotion={calm}
            />
            <FloatingIcon
              icon={GitBranch}
              className="hidden -end-4 bottom-1/3 lg:block"
              delay={1}
              prefersReducedMotion={calm}
            />

            {/* Main terminal card */}
            <motion.div
              className="relative w-full max-w-sm sm:max-w-md"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {/* Glow effect */}
              <div className="absolute -inset-4 rounded-3xl bg-linear-to-r from-mpc-green-500/20 to-mpc-gold-500/20 blur-2xl" aria-hidden="true" />

              {/* Background layers */}
              <div className="absolute -end-4 -top-4 h-full w-full rounded-2xl border border-mpc-green-500/20 bg-mpc-green-500/5 sm:-end-6 sm:-top-6" aria-hidden="true" />
              <div className="absolute -end-8 -top-8 h-full w-full rounded-2xl border border-mpc-gold-500/10 bg-mpc-gold-500/5 sm:-end-12 sm:-top-12" aria-hidden="true" />

              {/* Main card */}
              <motion.div
                className="relative z-10 rounded-2xl border border-border/50 bg-card/95 p-4 shadow-2xl backdrop-blur-xl sm:p-6"
                whileHover={calm ? {} : { y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Window controls */}
                <div className="mb-4 flex items-center justify-between border-b border-border/50 pb-4">
                  <div className="flex gap-2">
                    <div className="h-3 w-3 rounded-full bg-traffic-red hover:brightness-110 transition-all" />
                    <div className="h-3 w-3 rounded-full bg-traffic-yellow hover:brightness-110 transition-all" />
                    <div className="h-3 w-3 rounded-full bg-traffic-green hover:brightness-110 transition-all" />
                  </div>
                  <span className="text-xs text-muted-foreground font-mono flex items-center gap-1">
                    <TerminalIcon className="h-3 w-3" />
                    mpc-terminal
                  </span>
                </div>

                {/* Terminal content - responsive switching */}
                <div className="min-h-[200px]">
                  {!isMounted ? (
                    // SSR placeholder - prevents hydration mismatch
                    <div className="space-y-1.5 font-mono text-xs sm:text-sm text-muted-foreground/60">
                      <div className="flex items-start gap-2">
                        <span className="text-mpc-green-500">$</span>
                        <span>Loading terminal...</span>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Mobile: Static animation (no input) */}
                      <div className="block lg:hidden">
                        <StaticTerminal t={t} ArrowIcon={ArrowIcon} />
                      </div>

                      {/* Desktop: Interactive terminal with hint */}
                      <div className="hidden lg:block">
                        <div className="mb-2 text-xs text-muted-foreground/60">
                          💡 {t("terminal.hint")}
                        </div>
                        <InteractiveTerminal
                          commandHandler={handleCommand}
                          placeholder={t("terminal.commands.placeholder")}
                          initialCommands={[
                            { type: "command", content: "$ whoami" },
                            { type: "output", content: t("terminal.commands.whoami"), className: "text-muted-foreground" },
                            { type: "output", content: "" },
                            { type: "command", content: "$ uname -a" },
                            { type: "output", content: t("terminal.commands.uname"), className: "text-muted-foreground" },
                            { type: "output", content: "" },
                            { type: "command", content: "$ sudo join mpc-community" },
                            { type: "output", content: t("terminal.commands.sudoPassword"), className: "text-muted-foreground" },
                            { type: "output", content: t("terminal.commands.sudoSuccess"), className: "text-mpc-green-400" },
                          ]}
                        />
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-background to-transparent" aria-hidden="true" />
    </section>
  );
}
