import type { Metadata } from "next";
import { HeroShowcasePageClient } from "@/components/heroes/hero-showcase-page-client";

export const metadata: Metadata = {
  title: "Hero Showcase",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function HeroShowcasePage() {
  return <HeroShowcasePageClient />;
}
