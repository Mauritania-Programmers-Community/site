import type { Metadata } from "next";
import { HeroComparisonPageClient } from "@/components/heroes/hero-comparison-page-client";

export const metadata: Metadata = {
  title: "Hero Comparison",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function HeroComparisonPage() {
  return <HeroComparisonPageClient />;
}
