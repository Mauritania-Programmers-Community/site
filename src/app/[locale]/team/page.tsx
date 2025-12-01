"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { TeamMemberCard } from "@/components/team";
import { getFounders, getAdmins } from "@/lib/team";
import { Users, Crown, Shield, Heart, Sparkles } from "lucide-react";

interface TeamPageClientProps {
  locale: string;
}

function TeamPageClient({ locale }: TeamPageClientProps) {
  const t = useTranslations("team");

  const founders = getFounders();
  const admins = getAdmins();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-mpc-green-500/10 py-20">
        {/* Animated background blobs */}
        <motion.div
          className="absolute -top-40 -end-40 h-96 w-96 rounded-full bg-mpc-green-500/20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 -start-40 h-96 w-96 rounded-full bg-mpc-gold-500/20 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(76,175,80,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(76,175,80,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

        <div className="container relative mx-auto px-4">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Badge
                variant="secondary"
                className="mb-6 gap-2 bg-mpc-green-500/10 px-4 py-2 text-mpc-green-600 dark:text-mpc-green-400"
              >
                <Users className="h-4 w-4" />
                {t("title")}
              </Badge>
            </motion.div>

            <motion.h1
              className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {locale === "ar" ? (
                <>
                  تعرف على{" "}
                  <span className="bg-gradient-to-r from-mpc-green-500 to-mpc-gold-500 bg-clip-text text-transparent">
                    فريقنا
                  </span>
                </>
              ) : (
                <>
                  Meet the{" "}
                  <span className="bg-gradient-to-r from-mpc-green-500 to-mpc-gold-500 bg-clip-text text-transparent">
                    Team
                  </span>
                </>
              )}
            </motion.h1>

            <motion.p
              className="mx-auto max-w-2xl text-lg text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {t("subtitle")}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          className="mb-10 flex items-center justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Crown className="h-6 w-6 text-mpc-gold-500" />
          <h2 className="text-2xl font-bold">{t("founder")}</h2>
          <div className="h-px flex-1 max-w-20 bg-gradient-to-r from-mpc-gold-500/50 to-transparent" />
        </motion.div>

        <div className="mx-auto max-w-md">
          {founders.map((member, index) => (
            <TeamMemberCard
              key={member.id}
              member={member}
              locale={locale}
              index={index}
              variant="founder"
            />
          ))}
        </div>
      </section>

      {/* Admin Team Section */}
      <section className="border-t bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="mb-10 flex items-center justify-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Shield className="h-6 w-6 text-mpc-green-500" />
            <h2 className="text-2xl font-bold">{t("admins")}</h2>
            <div className="h-px flex-1 max-w-20 bg-gradient-to-r from-mpc-green-500/50 to-transparent" />
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {admins.map((member, index) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                locale={locale}
                index={index}
                variant="admin"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Join Team CTA */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="overflow-hidden border-2 border-dashed border-mpc-green-500/30 bg-gradient-to-br from-mpc-green-500/5 to-mpc-gold-500/5">
            <CardContent className="flex flex-col items-center p-8 text-center md:p-12">
              <motion.div
                className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-mpc-green-500/10"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Heart className="h-8 w-8 text-mpc-green-500" />
              </motion.div>

              <h3 className="mb-3 text-2xl font-bold">
                {locale === "ar"
                  ? "انضم إلى فريقنا"
                  : "Want to Join Our Team?"}
              </h3>

              <p className="mb-6 max-w-md text-muted-foreground">
                {locale === "ar"
                  ? "نحن دائماً نبحث عن أشخاص متحمسين للمساهمة في مجتمعنا. إذا كنت مهتماً، تواصل معنا!"
                  : "We're always looking for passionate individuals to contribute to our community. If you're interested, reach out to us!"}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                {[
                  { icon: Sparkles, label: "Contribute" },
                  { icon: Users, label: "Collaborate" },
                  { icon: Heart, label: "Grow Together" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-2 rounded-full bg-background px-4 py-2"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <item.icon className="h-4 w-4 text-mpc-green-500" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </div>
  );
}

export default function TeamPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = React.use(params);
  return <TeamPageClient locale={locale} />;
}
