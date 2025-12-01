"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Code2,
  Shield,
  Brain,
  Calendar,
  Sparkles,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

const features = [
  {
    id: "webdev",
    icon: Code2,
    gradient: "from-mpc-green-400 to-mpc-green-600",
    bgGradient: "from-mpc-green-400/20 to-mpc-green-600/20",
  },
  {
    id: "security",
    icon: Shield,
    gradient: "from-mpc-green-600 to-mpc-green-800",
    bgGradient: "from-mpc-green-600/20 to-mpc-green-800/20",
  },
  {
    id: "ai",
    icon: Brain,
    gradient: "from-mpc-green-400 to-mpc-gold-500",
    bgGradient: "from-mpc-green-400/20 to-mpc-gold-500/20",
  },
  {
    id: "workshops",
    icon: Calendar,
    gradient: "from-mpc-gold-400 to-mpc-gold-600",
    bgGradient: "from-mpc-gold-400/20 to-mpc-gold-600/20",
  },
];

export function FeaturesSection() {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === "ar";
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Direction-aware chevron
  const ChevronIcon = isRTL ? ChevronLeft : ChevronRight;

  return (
    <section className="relative overflow-hidden bg-muted/30 py-24">
      {/* Background */}
      <div className="absolute inset-0">
        {/* Animated gradient blobs */}
        <motion.div
          className="absolute top-1/4 -start-32 h-96 w-96 rounded-full bg-mpc-green-500/10 blur-[120px]"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 -end-32 h-96 w-96 rounded-full bg-mpc-gold-500/10 blur-[120px]"
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity }}
        />

        {/* Grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(76,175,80,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(76,175,80,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="container relative mx-auto px-4">
        {/* Section header */}
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-mpc-green-500/20 bg-gradient-to-r from-mpc-green-500/10 to-mpc-gold-500/10 px-5 py-2.5"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Sparkles className="h-4 w-4 text-mpc-green-500" />
            <span className="text-sm font-medium text-mpc-green-600 dark:text-mpc-green-400">
              {isRTL ? "ماذا نقدم" : "What We Offer"}
            </span>
          </motion.div>

          <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">
            {t("features.title")}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {t("features.subtitle")}
          </p>
        </motion.div>

        {/* Features grid - Interactive cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {features.map((feature, index) => {
            const isHovered = hoveredIndex === index;

            return (
              <motion.div
                key={feature.id}
                className="group relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="relative h-full overflow-hidden rounded-3xl border border-border/50 bg-card p-8 transition-all duration-500 hover:border-transparent hover:shadow-2xl">
                  {/* Gradient border on hover */}
                  <motion.div
                    className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.gradient} transition-opacity duration-500`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    style={{ padding: "2px" }}
                  >
                    <div className="h-full w-full rounded-3xl bg-card" />
                  </motion.div>

                  {/* Content wrapper */}
                  <div className="relative z-10">
                    {/* Icon and number row */}
                    <div className="mb-8 flex items-start justify-between">
                      {/* Icon container with animated background */}
                      <motion.div
                        className="relative"
                        animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient} text-white shadow-lg`}>
                          <feature.icon className="h-8 w-8" />
                        </div>
                        {/* Glow effect */}
                        <motion.div
                          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} blur-xl transition-opacity duration-500`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: isHovered ? 0.5 : 0 }}
                        />
                      </motion.div>

                      {/* Feature number */}
                      <span className={`bg-gradient-to-r ${feature.gradient} bg-clip-text text-5xl font-bold text-transparent opacity-20`}>
                        0{index + 1}
                      </span>
                    </div>

                    {/* Title and description */}
                    <div className="mb-6">
                      <h3 className="mb-3 text-2xl font-bold transition-colors">
                        {t(`features.items.${feature.id}.title`)}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {t(`features.items.${feature.id}.description`)}
                      </p>
                    </div>

                    {/* CTA link */}
                    <motion.div
                      className="flex items-center gap-2 text-sm font-semibold"
                      animate={{ x: isHovered ? (isRTL ? -5 : 5) : 0 }}
                    >
                      <span className={`bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>
                        {isRTL ? "اكتشف المزيد" : "Explore More"}
                      </span>
                      <span className={`bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>
                        <ChevronIcon className="h-4 w-4" />
                      </span>
                    </motion.div>
                  </div>

                  {/* Decorative elements */}
                  <motion.div
                    className={`absolute -end-16 -bottom-16 h-48 w-48 rounded-full bg-gradient-to-br ${feature.bgGradient} blur-3xl`}
                    animate={{ scale: isHovered ? 1.5 : 1, opacity: isHovered ? 0.8 : 0.3 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom decorative line */}
        <motion.div
          className="mx-auto mt-20 flex max-w-md items-center gap-4"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-mpc-green-500/50 to-transparent" />
          <Sparkles className="h-5 w-5 text-mpc-green-500" />
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-mpc-green-500/50 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
