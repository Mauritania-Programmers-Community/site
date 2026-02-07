"use client";

import React, { useState } from "react";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";

// Import all hero variants
import { HeroSection as CurrentHero } from "@/components/sections/hero-section";
import { HeroTailark } from "@/components/heroes/hero-tailark";
import { HeroPong } from "@/components/heroes/hero-pong";
import { HeroMinimal } from "@/components/heroes/hero-minimal";

const heroOptions = [
  { id: "current", label: "Current Hero", labelAr: "الرئيسية الحالية" },
  { id: "tailark", label: "Tailark Style", labelAr: "ستايل Tailark" },
  { id: "pong", label: "Pong Game", labelAr: "لعبة Pong" },
  { id: "minimal", label: "Minimal Modern", labelAr: "تصميم بسيط" },
];

export function HeroComparisonPageClient() {
  const locale = useLocale();
  const isRTL = locale === "ar";
  const [activeHero, setActiveHero] = useState("current");

  return (
    <div className="min-h-screen">
      {/* Hero Selector */}
      <div className="fixed top-20 left-1/2 z-50 -translate-x-1/2">
        <div className="flex gap-2 rounded-full border bg-background/80 p-2 shadow-lg backdrop-blur-md">
          {heroOptions.map((option) => (
            <Button
              key={option.id}
              variant={activeHero === option.id ? "default" : "ghost"}
              size="sm"
              className={activeHero === option.id ? "bg-mpc-green-500 hover:bg-mpc-green-600" : ""}
              onClick={() => setActiveHero(option.id)}
            >
              {isRTL ? option.labelAr : option.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Hero Display */}
      {activeHero === "current" && <CurrentHero />}
      {activeHero === "tailark" && <HeroTailark />}
      {activeHero === "pong" && <HeroPong />}
      {activeHero === "minimal" && <HeroMinimal />}
    </div>
  );
}
