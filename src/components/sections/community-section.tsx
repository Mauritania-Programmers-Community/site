import { getTranslations, getLocale } from "next-intl/server";
import { Users } from "lucide-react";
import { SectionHeader } from "./section-header";
import { SectionBlobs } from "./section-decor";
import { Reveal } from "@/components/ui/reveal";
import AvatarGroup from "@/components/ui/avatar-group";

export async function CommunitySection() {
  const t = await getTranslations();
  const locale = await getLocale();

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
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-muted/20 to-transparent" />
        <SectionBlobs
          blobs={[
            { className: "absolute top-1/4 start-1/4 h-64 w-64 rounded-full bg-mpc-green-500/5 blur-3xl", duration: 10 },
            { className: "absolute bottom-1/4 end-1/4 h-64 w-64 rounded-full bg-mpc-gold-500/5 blur-3xl", duration: 10 },
          ]}
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
        <Reveal delay={0.2} className="mx-auto mb-12 flex justify-center">
          <AvatarGroup
            items={communityMembers}
            locale={locale}
            maxVisible={4}
            size="lg"
            totalCount={884}
          />
        </Reveal>
      </div>
    </section>
  );
}
