"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Users, ArrowRight, ArrowLeft, Heart } from "lucide-react";
import teamData from "@/data/team.json";

export function CommunitySection() {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === "ar";
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  // Combine founders and admins for avatar display
  const allMembers = [...teamData.founders, ...teamData.admins];

  return (
    <section className="relative overflow-hidden py-24">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-transparent" />
        {/* Decorative blobs */}
        <motion.div
          className="absolute top-1/4 start-1/4 h-64 w-64 rounded-full bg-mpc-green-500/5 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 end-1/4 h-64 w-64 rounded-full bg-mpc-gold-500/5 blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
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
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-mpc-green-500/20 bg-mpc-green-500/5 px-4 py-2"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Users className="h-4 w-4 text-mpc-green-500" />
            <span className="text-sm font-medium text-mpc-green-600 dark:text-mpc-green-400">
              {t("community.badge")}
            </span>
          </motion.div>

          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
            {t("community.title")}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {t("community.subtitle")}
          </p>
        </motion.div>

        {/* Avatar grid */}
        <motion.div
          className="mx-auto mb-12 flex max-w-lg flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {allMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + index * 0.1 }}
              whileHover={{ scale: 1.1, y: -5 }}
              className="group relative"
            >
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-mpc-green-500 to-mpc-gold-500 opacity-0 blur transition-opacity group-hover:opacity-50" />
              <Avatar className="relative h-16 w-16 border-2 border-background shadow-lg ring-2 ring-mpc-green-500/20 transition-all group-hover:ring-mpc-green-500/50">
                <AvatarImage
                  src={member.image}
                  alt={isRTL ? member.nameAr : member.name}
                />
                <AvatarFallback className="bg-mpc-green-500/10 text-mpc-green-600 dark:text-mpc-green-400">
                  {member.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              {/* Tooltip on hover */}
              <div className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-card px-2 py-1 text-xs font-medium opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                {isRTL ? member.nameAr : member.name}
              </div>
            </motion.div>
          ))}

          {/* Plus indicator for more members */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-dashed border-mpc-green-500/30 bg-mpc-green-500/5"
          >
            <span className="text-sm font-bold text-mpc-green-600 dark:text-mpc-green-400">
              880+
            </span>
          </motion.div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="flex flex-col items-center gap-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-2 text-muted-foreground">
            <Heart className="h-4 w-4 text-red-500" />
            <span className="text-sm">{t("community.madeWith")}</span>
          </div>

          <Button
            variant="outline"
            className="group gap-2 border-mpc-green-500/30 hover:border-mpc-green-500 hover:bg-mpc-green-500/10"
            asChild
          >
            <Link href={`/${locale}/team`}>
              {t("community.viewTeam")}
              <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
