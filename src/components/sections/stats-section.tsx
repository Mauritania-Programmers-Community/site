"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import { Users, Calendar, Clock, Lightbulb, TrendingUp, Star } from "lucide-react";

interface CounterProps {
  target: number;
  suffix?: string;
  duration?: number;
}

function Counter({ target, suffix = "", duration = 2 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

      // Easing function for smooth deceleration
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * target));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === "ar";

  const stats = [
    {
      value: siteConfig.stats.members,
      suffix: "+",
      label: t("stats.members"),
      icon: Users,
      color: "from-mpc-green-400 to-mpc-green-600",
      bgColor: "bg-mpc-green-500/10",
      textColor: "text-mpc-green-500",
    },
    {
      value: siteConfig.stats.events,
      suffix: "",
      label: t("stats.events"),
      icon: Calendar,
      color: "from-mpc-gold-400 to-mpc-gold-600",
      bgColor: "bg-mpc-gold-500/10",
      textColor: "text-mpc-gold-500",
    },
    {
      value: 1,
      suffix: "",
      label: t("stats.year"),
      icon: Clock,
      color: "from-mpc-green-600 to-mpc-green-800",
      bgColor: "bg-mpc-green-600/10",
      textColor: "text-mpc-green-600",
    },
    {
      value: 100,
      suffix: "+",
      label: t("stats.ideas"),
      icon: Lightbulb,
      color: "from-mpc-gold-400 to-mpc-gold-600",
      bgColor: "bg-mpc-gold-500/10",
      textColor: "text-mpc-gold-500",
    },
  ];

  return (
    <section className="relative overflow-hidden py-24">
      {/* Background elements */}
      <div className="absolute inset-0">
        {/* Gradient mesh */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />

        {/* Decorative blobs */}
        <motion.div
          className="absolute top-0 start-1/4 h-64 w-64 rounded-full bg-mpc-green-500/5 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 end-1/4 h-64 w-64 rounded-full bg-mpc-gold-500/5 blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        {/* Dotted pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(76,175,80,0.1)_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="container relative mx-auto px-4">
        {/* Section header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-mpc-green-500/20 bg-mpc-green-500/5 px-4 py-2"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <TrendingUp className="h-4 w-4 text-mpc-green-500" />
            <span className="text-sm font-medium text-mpc-green-600 dark:text-mpc-green-400">
              {isRTL ? "إنجازاتنا" : "Our Impact"}
            </span>
          </motion.div>
          <h2 className="text-3xl font-bold sm:text-4xl">
            {isRTL ? "أرقام تتحدث عنا" : "Numbers That Speak"}
          </h2>
        </motion.div>

        {/* Stats grid - Bento-style layout */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative h-full overflow-hidden rounded-3xl border border-border/50 bg-card p-8 transition-all duration-500 hover:border-mpc-green-500/30 hover:shadow-2xl hover:shadow-mpc-green-500/5">
                {/* Background gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 transition-opacity duration-500 group-hover:opacity-5`} />

                {/* Icon with animated background */}
                <motion.div
                  className="relative mb-6"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl ${stat.bgColor} ${stat.textColor} transition-all duration-300 group-hover:shadow-lg`}>
                    <stat.icon className="h-8 w-8" />
                  </div>
                  {/* Decorative ring */}
                  <div className={`absolute inset-0 h-16 w-16 rounded-2xl border-2 border-dashed ${stat.textColor} opacity-0 transition-opacity group-hover:opacity-30`}
                    style={{ transform: "scale(1.3)" }}
                  />
                </motion.div>

                {/* Value with counter animation */}
                <div className="mb-2">
                  <span className={`bg-gradient-to-r ${stat.color} bg-clip-text text-5xl font-bold text-transparent`}>
                    <Counter target={stat.value} suffix={stat.suffix} />
                  </span>
                </div>

                {/* Label */}
                <p className="text-lg font-medium text-muted-foreground">
                  {stat.label}
                </p>

                {/* Decorative corner accent */}
                <div className={`absolute -end-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br ${stat.color} opacity-10 blur-2xl transition-all duration-500 group-hover:opacity-20 group-hover:scale-150`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom accent */}
        <motion.div
          className="mt-16 flex items-center justify-center gap-2 text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <Star className="h-4 w-4 text-mpc-gold-500" />
          <span className="text-sm">
            {isRTL ? "ونستمر في النمو كل يوم" : "And growing every day"}
          </span>
          <Star className="h-4 w-4 text-mpc-gold-500" />
        </motion.div>
      </div>
    </section>
  );
}
