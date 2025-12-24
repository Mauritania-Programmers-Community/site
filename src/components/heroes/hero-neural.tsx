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
} from "lucide-react";

// Dynamically import the neural network component (requires Three.js)
const NeuralNetworkHero = dynamic(
  () => import("@/components/neural-network-hero"),
  { ssr: false }
);

export function HeroNeural() {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === "ar";
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Neural Network Background */}
      <NeuralNetworkHero
        title=""
        description=""
        badgeText=""
        badgeLabel=""
        ctaButtons={[]}
        microDetails={[]}
      />

      {/* Content overlay */}
      <div className="absolute inset-0 z-10">
        <div className="container mx-auto flex min-h-screen flex-col items-start justify-center px-6 py-20 md:px-10 lg:px-16">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-light tracking-wide text-white/80 backdrop-blur-sm">
              <span className="h-1 w-1 rounded-full bg-mpc-green-500" />
              {t("hero.badge")}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="mb-6 max-w-3xl text-4xl font-extralight leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.1, duration: 0.8 }}
          >
            <span className="block">{t("hero.title")}</span>
            <span className="block font-normal bg-linear-to-r from-mpc-green-400 via-emerald-300 to-mpc-gold-400 bg-clip-text text-transparent">
              {t("hero.titleHighlight")}
            </span>
            <span className="block">{t("hero.titleEnd")}</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            className="mb-10 max-w-xl text-base font-light leading-relaxed text-white/70 sm:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {t("hero.description")}
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Button
              size="lg"
              className="group h-12 gap-2 rounded-2xl border border-white/10 bg-white/10 px-6 font-light text-white backdrop-blur-sm hover:bg-white/20 transition-all duration-300 sm:h-14 sm:px-8"
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
              variant="ghost"
              className="group h-12 gap-2 rounded-2xl px-6 font-light text-white/80 hover:bg-white/5 hover:text-white transition-all duration-300 sm:h-14 sm:px-8"
              asChild
            >
              <Link href={`/${locale}/events`}>
                <Play className="h-4 w-4" />
                {t("hero.cta.events")}
              </Link>
            </Button>
          </motion.div>

          {/* Micro details */}
          <motion.ul
            className="mt-12 flex flex-wrap gap-6 text-xs font-extralight tracking-tight text-white/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            {[
              isRTL ? "900+ مطور" : "900+ Developers",
              isRTL ? "4 مجالات تقنية" : "4 Tech Domains",
              isRTL ? "مجتمع نشط 24/7" : "24/7 Active Community",
            ].map((detail, index) => (
              <motion.li
                key={index}
                className="flex items-center gap-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <span className="h-1 w-1 rounded-full bg-white/40" />
                {detail}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
