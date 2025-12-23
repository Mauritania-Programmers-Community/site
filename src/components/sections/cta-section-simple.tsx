"use client";

import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { MessageCircle, ArrowRight, ArrowLeft } from "lucide-react";

export function CTASection() {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === "ar";
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section className="border-t bg-muted/30 py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
            {t("cta.title")}
          </h2>
          <p className="mb-8 text-lg text-muted-foreground">
            {t("cta.description")}
          </p>
          <Button
            size="lg"
            className="gap-2 bg-mpc-green-500 text-white hover:bg-mpc-green-600"
            asChild
          >
            <a
              href={siteConfig.links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="h-5 w-5" />
              {t("cta.button")}
              <ArrowIcon className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
