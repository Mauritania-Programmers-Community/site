"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Code2,
  Shield,
  Brain,
  Calendar,
} from "lucide-react";
import { SectionHeader } from "./section-header";

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
        <div className="absolute inset-0 bg-[linear-gradient(rgba(76,175,80,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(76,175,80,0.02)_1px,transparent_1px)] bg-size-[80px_80px]" />
      </div>

      <div className="container relative mx-auto px-4">
        <SectionHeader
          badge={{
            text: isRTL ? "ماذا نقدم" : "What We Offer",
          }}
          title={t("features.title")}
          description={t("features.subtitle")}
        />

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
                <div className="relative h-full overflow-hidden rounded-3xl border border-border/50 bg-card p-8 transition-all duration-500 hover:border-transparent hover:shadow-lg">
                  {/* Gradient border on hover */}
                  <motion.div
                    className={`absolute inset-0 rounded-3xl bg-linear-to-br ${feature.gradient} transition-opacity duration-500`}
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
                        <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br ${feature.gradient} text-white shadow-md`}>
                          <feature.icon className="h-8 w-8" />
                        </div>
                        {/* Glow effect */}
                        <motion.div
                          className={`absolute inset-0 rounded-2xl bg-linear-to-br ${feature.gradient} blur-xl transition-opacity duration-500`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: isHovered ? 0.3 : 0 }}
                        />
                      </motion.div>

                      {/* Feature number */}
                      <span className={`bg-linear-to-r ${feature.gradient} bg-clip-text text-5xl font-bold text-transparent opacity-20`}>
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
                  </div>

                  {/* Decorative elements */}
                  <motion.div
                    className={`absolute -end-16 -bottom-16 h-48 w-48 rounded-full bg-linear-to-br ${feature.bgGradient} blur-3xl`}
                    animate={{ scale: isHovered ? 1.5 : 1, opacity: isHovered ? 0.5 : 0.2 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
