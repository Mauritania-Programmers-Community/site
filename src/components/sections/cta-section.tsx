"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import {
  ArrowRight,
  ArrowLeft,
  Users,
  Sparkles,
  MessageCircle,
  Rocket,
  Heart,
} from "lucide-react";

// Floating particles for visual depth - deterministic to avoid hydration mismatch
const GOLDEN_RATIO = 0.618033988749;
const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  size: ((i * GOLDEN_RATIO * 4) % 4) + 2,
  x: (i * GOLDEN_RATIO * 100) % 100,
  y: ((i * GOLDEN_RATIO * 61.8) + 10) % 100,
  delay: (i * GOLDEN_RATIO * 5) % 5,
  duration: ((i * GOLDEN_RATIO * 10) % 10) + 10,
}));

export function CTASection() {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === "ar";

  // Direction-aware arrow
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const socialProof = [
    { icon: Users, labelEn: "Active Community", labelAr: "مجتمع نشط" },
    { icon: MessageCircle, labelEn: "Daily Discussions", labelAr: "نقاشات يومية" },
    { icon: Sparkles, labelEn: "Free Resources", labelAr: "موارد مجانية" },
  ];

  return (
    <section className="relative overflow-hidden py-32">
      {/* Background with gradient mesh */}
      <div className="absolute inset-0">
        {/* Main gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-mpc-green-600 via-mpc-green-500 to-emerald-600" />

        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-mpc-gold-500/20 via-transparent to-emerald-400/20"
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full bg-white/20"
              style={{
                width: particle.size,
                height: particle.size,
                left: `${particle.x}%`,
                top: `${particle.y}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: "linear",
              }}
            />
          ))}
        </div>

        {/* Decorative circles */}
        <motion.div
          className="absolute -top-32 -start-32 h-96 w-96 rounded-full border border-white/10"
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-32 -end-32 h-96 w-96 rounded-full border border-white/10"
          animate={{ rotate: -360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        />

        {/* Glowing orbs */}
        <motion.div
          className="absolute top-1/4 start-1/4 h-64 w-64 rounded-full bg-white/10 blur-[100px]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 end-1/4 h-64 w-64 rounded-full bg-mpc-gold-500/20 blur-[100px]"
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        {/* Subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Animated badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mb-8"
            >
              <span className="group relative inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mpc-gold-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-mpc-gold-400" />
                </span>
                <Rocket className="h-4 w-4" />
                {t("cta.badge")}
              </span>
            </motion.div>

            {/* Heading with gradient text */}
            <motion.h2
              className="mb-8 text-4xl font-bold text-white sm:text-5xl md:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <span className="block">{t("cta.title")}</span>
            </motion.h2>

            {/* Description */}
            <motion.p
              className="mx-auto mb-12 max-w-2xl text-xl text-white/80"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              {t("cta.description")}
            </motion.p>

            {/* CTA button with enhanced styling */}
            <motion.div
              className="mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-block"
              >
                <Button
                  size="lg"
                  className="group relative h-16 gap-3 overflow-hidden bg-white px-10 text-lg font-bold text-mpc-green-600 shadow-2xl transition-all hover:bg-white hover:shadow-white/30"
                  asChild
                >
                  <a
                    href={siteConfig.links.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      <MessageCircle className="h-6 w-6" />
                      {t("cta.button")}
                      <ArrowIcon className="h-5 w-5 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                    </span>
                    {/* Shine effect on hover */}
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-mpc-green-100/50 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  </a>
                </Button>
              </motion.div>
            </motion.div>

            {/* Social proof badges */}
            <motion.div
              className="flex flex-wrap items-center justify-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              {socialProof.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 backdrop-blur-sm"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                >
                  <item.icon className="h-5 w-5 text-mpc-gold-400" />
                  <span className="text-sm font-medium text-white/90">
                    {isRTL ? item.labelAr : item.labelEn}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Bottom heart decoration */}
            <motion.div
              className="mt-12 flex items-center justify-center gap-2 text-white/50"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              <span className="text-sm">
                {isRTL ? "صنع بكل" : "Made with"}
              </span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart className="h-4 w-4 fill-red-400 text-red-400" />
              </motion.div>
              <span className="text-sm">
                {isRTL ? "في موريتانيا" : "in Mauritania"}
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            className="fill-background"
          />
        </svg>
      </div>
    </section>
  );
}
