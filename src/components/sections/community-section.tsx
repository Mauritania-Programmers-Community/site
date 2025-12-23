"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { SectionHeader } from "./section-header";
import AvatarGroup from "@/components/ui/avatar-group";

export function CommunitySection() {
  const t = useTranslations();
  const locale = useLocale();

  // Mock community members for avatar display (no team.json needed)
  const communityMembers = [
    {
      id: "1",
      name: "Deidin",
      nameAr: "ديدين",
      image: "/images/team/deidin.png",
      role: "Founder",
      roleAr: "المؤسس",
      link: "https://github.com/deidine",
    },
    {
      id: "2",
      name: "Ahmed Abdat",
      nameAr: "أحمد عبدات",
      image: "/images/team/ahmed.png",
      role: "Admin",
      roleAr: "مشرف",
      link: "https://github.com/ahmed-abdat",
    },
    {
      id: "3",
      name: "Aziz",
      nameAr: "عزيز",
      image: "/images/team/aziz.png",
      role: "Admin",
      roleAr: "مشرف",
      link: "https://github.com/aziz0x00",
    },
    {
      id: "4",
      name: "Mohamed Salem",
      nameAr: "محمد سالم",
      image: "/images/team/mohamed-salem.png",
      role: "Admin",
      roleAr: "مشرف",
      link: "https://github.com/Muhammed-OTP",
    },
  ];

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
        <SectionHeader
          badge={{
            icon: Users,
            text: t("community.badge"),
          }}
          title={t("community.title")}
          description={t("community.subtitle")}
        />

        {/* Avatar group badges */}
        <motion.div
          className="mx-auto mb-12 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <AvatarGroup
            items={communityMembers}
            locale={locale}
            maxVisible={4}
            size="lg"
            totalCount={884}
          />
        </motion.div>
      </div>
    </section>
  );
}
