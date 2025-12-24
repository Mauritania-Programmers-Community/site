"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { BookOpen, Presentation, Code2, Users, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

interface ContributionSectionProps {
  locale: string;
}

const pathwayIcons = {
  blog: BookOpen,
  workshop: Presentation,
  project: Code2,
  mentor: Users,
} as const;

const pathwayColors = {
  blog: "bg-linear-to-br from-mpc-green-500 to-mpc-green-600",
  workshop: "bg-linear-to-br from-mpc-gold-500 to-mpc-gold-600",
  project: "bg-linear-to-br from-mpc-green-600 to-mpc-green-700",
  mentor: "bg-linear-to-br from-mpc-gold-600 to-mpc-gold-700",
} as const;

function PathwayCard({
  pathway,
  locale,
  index,
}: {
  pathway: "blog" | "workshop" | "project" | "mentor";
  locale: string;
  index: number;
}) {
  const t = useTranslations(`contribution.pathways.${pathway}`);
  const [isFlipped, setIsFlipped] = useState(false);
  const Icon = pathwayIcons[pathway];
  const ArrowIcon = ArrowRight;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="perspective-1000"
      onHoverStart={() => setIsFlipped(true)}
      onHoverEnd={() => setIsFlipped(false)}
    >
      <motion.div
        className="relative h-64 cursor-pointer"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front of card */}
        <Card
          className="absolute inset-0 overflow-hidden border-2 transition-all duration-300"
          style={{
            backfaceVisibility: "hidden",
          }}
        >
          <div className={`h-full ${pathwayColors[pathway]} relative p-6 text-white`}>
            {/* Geometric pattern overlay */}
            <div className="absolute inset-0 opacity-10 pattern-geometric" />

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div className="flex items-start justify-between">
                <div className="rounded-lg bg-white/20 p-3 backdrop-blur">
                  <Icon className="h-8 w-8" />
                </div>
                <div className="text-xs font-mono opacity-60">0{index + 1}</div>
              </div>

              <div>
                <h3 className="mb-2 text-2xl font-bold text-editorial">
                  {t("title")}
                </h3>
                <p className="text-sm opacity-90">
                  {t("description")}
                </p>
              </div>
            </div>

            {/* Decorative corner accent */}
            <div className="absolute -bottom-4 -end-4 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
          </div>
        </Card>

        {/* Back of card */}
        <Card
          className="absolute inset-0 overflow-hidden border-2 border-mpc-green-500/50 bg-background"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <CardContent className="flex h-full flex-col justify-between p-6">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className={`rounded-lg ${pathwayColors[pathway]} p-2`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-bold text-editorial">{t("title")}</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                {t("howTo")}
              </p>
            </div>

            <Button
              asChild
              className={`group w-full ${pathwayColors[pathway]} text-white hover:opacity-90`}
            >
              <Link href={`/${locale}/${pathway === "blog" ? "blog" : "events"}`}>
                {t("cta")}
                <ArrowIcon className="ms-2 h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}

export function ContributionSection({ locale }: ContributionSectionProps) {
  const t = useTranslations("contribution");
  const pathways = ["blog", "workshop", "project", "mentor"] as const;

  return (
    <section className="relative overflow-hidden py-24">
      {/* Background with subtle tilt */}
      <div className="absolute inset-0 bg-muted/30 pattern-geometric" />

      <div className="container relative mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <Badge variant="outline" className="mb-4 border-mpc-gold-500/50 text-mpc-gold-600 dark:text-mpc-gold-400">
            {t("badge")}
          </Badge>
          <h2 className="mb-4 text-4xl font-bold text-editorial md:text-5xl">
            {t("title")}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Pathway Cards Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {pathways.map((pathway, index) => (
            <PathwayCard
              key={pathway}
              pathway={pathway}
              locale={locale}
              index={index}
            />
          ))}
        </div>

        {/* Bottom decorative accent */}
        <div className="mt-16 flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="h-1 w-32 rounded-full bg-linear-to-r from-mpc-green-500 via-mpc-gold-500 to-mpc-green-500"
          />
        </div>
      </div>
    </section>
  );
}
