"use client";

import React from "react";
import { useLocale } from "next-intl";
import dynamic from "next/dynamic";

// Import all hero variants
import { HeroSection as CurrentHero } from "@/components/sections/hero-section";
import { HeroTailark } from "@/components/heroes/hero-tailark";
import { HeroPong } from "@/components/heroes/hero-pong";
import { HeroMinimal } from "@/components/heroes/hero-minimal";
import { HeroGrid } from "@/components/heroes/hero-grid";
import { HeroBoxes } from "@/components/heroes/hero-boxes";
import { HeroParticle } from "@/components/heroes/hero-particle";

// Dynamic imports for Three.js heroes (SSR disabled)
const HeroNeural = dynamic(
  () => import("@/components/heroes/hero-neural").then((mod) => mod.HeroNeural),
  { ssr: false, loading: () => <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading Neural Hero...</div> }
);

const HeroNeon = dynamic(
  () => import("@/components/heroes/hero-neon").then((mod) => mod.HeroNeon),
  { ssr: false, loading: () => <div className="min-h-screen bg-neutral-950 flex items-center justify-center text-white">Loading Neon Hero...</div> }
);

const heroSections = [
  {
    id: "tailark",
    label: "Tailark Style",
    labelAr: "ستايل Tailark",
    description: "Clean text animations with terminal visualization",
    descriptionAr: "نصوص متحركة نظيفة مع تصور الطرفية",
    Component: HeroTailark,
    recommended: true
  },
  {
    id: "minimal",
    label: "Minimal Modern",
    labelAr: "تصميم بسيط",
    description: "Split layout with code editor visualization",
    descriptionAr: "تخطيط منقسم مع محرر الكود",
    Component: HeroMinimal,
    recommended: true
  },
  {
    id: "grid",
    label: "Animated Grid",
    labelAr: "شبكة متحركة",
    description: "Animated grid pattern with centered layout",
    descriptionAr: "شبكة متحركة مع تخطيط متمركز",
    Component: HeroGrid
  },
  {
    id: "boxes",
    label: "Interactive Boxes",
    labelAr: "صناديق تفاعلية",
    description: "3D isometric boxes with hover effects",
    descriptionAr: "صناديق ثلاثية الأبعاد مع تأثيرات التفاعل",
    Component: HeroBoxes
  },
  {
    id: "particle",
    label: "Particle Effect",
    labelAr: "تأثير الجسيمات",
    description: "Floating particles with animated reveal",
    descriptionAr: "جسيمات عائمة مع كشف متحرك",
    Component: HeroParticle
  },
  {
    id: "neon",
    label: "Neon Raymarcher",
    labelAr: "تأثير النيون",
    description: "WebGL raymarched neon geometry",
    descriptionAr: "هندسة النيون ثلاثية الأبعاد",
    Component: HeroNeon
  },
  {
    id: "neural",
    label: "Neural Network",
    labelAr: "شبكة عصبية",
    description: "Generative shader with GSAP animations",
    descriptionAr: "شيدر توليدي مع حركات GSAP",
    Component: HeroNeural
  },
  {
    id: "current",
    label: "Current (Original)",
    labelAr: "الحالي (الأصلي)",
    description: "Morphing gradients with floating icons",
    descriptionAr: "تدرجات متحركة مع أيقونات عائمة",
    Component: CurrentHero
  },
  {
    id: "pong",
    label: "Pong Game",
    labelAr: "لعبة Pong",
    description: "Interactive canvas game spelling MPC",
    descriptionAr: "لعبة تفاعلية تكتب MPC",
    Component: HeroPong
  },
];

export default function HeroShowcasePage() {
  const locale = useLocale();
  const isRTL = locale === "ar";

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">
            {isRTL ? "معرض تصاميم Hero" : "Hero Designs Showcase"}
          </h1>
          <p className="mt-2 text-muted-foreground">
            {isRTL
              ? `${heroSections.length} تصاميم متاحة - تصفح واختر الأفضل`
              : `${heroSections.length} designs available - Browse and choose the best`
            }
          </p>
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="sticky top-[89px] z-40 border-b bg-muted/50 backdrop-blur-md overflow-x-auto">
        <div className="container mx-auto px-4 py-3">
          <div className="flex gap-2 min-w-max">
            {heroSections.map((hero) => (
              <a
                key={hero.id}
                href={`#${hero.id}`}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors hover:bg-mpc-green-500/10 hover:border-mpc-green-500/50 whitespace-nowrap ${
                  hero.recommended
                    ? "bg-mpc-green-500/10 border-mpc-green-500/30 text-mpc-green-600 dark:text-mpc-green-400"
                    : "bg-background"
                }`}
              >
                {isRTL ? hero.labelAr : hero.label}
                {hero.recommended && (
                  <span className="ms-1 text-xs">★</span>
                )}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* All Heroes Display */}
      {heroSections.map((hero, index) => (
        <section key={hero.id} id={hero.id} className="relative">
          {/* Section Divider */}
          {index > 0 && (
            <div className="h-px bg-gradient-to-r from-transparent via-mpc-green-500/50 to-transparent" />
          )}

          {/* Section Label */}
          <div className="absolute top-4 start-4 z-30">
            <div className={`rounded-lg border px-4 py-3 shadow-lg backdrop-blur-md ${
              hero.recommended
                ? "bg-mpc-green-500/90 border-mpc-green-400"
                : "bg-background/90"
            }`}>
              <div className="flex items-center gap-3">
                <span className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                  hero.recommended
                    ? "bg-white text-mpc-green-600"
                    : "bg-mpc-green-500 text-white"
                }`}>
                  {index + 1}
                </span>
                <div>
                  <h2 className={`font-bold ${hero.recommended ? "text-white" : ""}`}>
                    {isRTL ? hero.labelAr : hero.label}
                    {hero.recommended && (
                      <span className="ms-2 text-xs font-normal opacity-80">
                        {isRTL ? "(موصى به)" : "(Recommended)"}
                      </span>
                    )}
                  </h2>
                  <p className={`text-xs ${hero.recommended ? "text-white/80" : "text-muted-foreground"}`}>
                    {isRTL ? hero.descriptionAr : hero.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Component */}
          <div className="relative">
            <hero.Component />
          </div>
        </section>
      ))}

      {/* Footer */}
      <div className="border-t bg-muted/30 py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            {isRTL
              ? "اختر التصميم الذي يناسب رؤية MPC"
              : "Choose the design that best fits the MPC vision"
            }
          </p>
        </div>
      </div>
    </div>
  );
}
