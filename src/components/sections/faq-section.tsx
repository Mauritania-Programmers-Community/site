"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  HelpCircle,
  Users,
  MessageCircle,
  Calendar,
  Lightbulb,
  Globe,
} from "lucide-react";
import { siteConfig } from "@/config/site";

const faqIcons = {
  about: HelpCircle,
  join: MessageCircle,
  topics: Lightbulb,
  events: Calendar,
  who: Users,
  language: Globe,
};

export function FAQSection() {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === "ar";

  const faqItems = [
    { id: "about", icon: faqIcons.about },
    { id: "join", icon: faqIcons.join },
    { id: "topics", icon: faqIcons.topics },
    { id: "events", icon: faqIcons.events },
    { id: "who", icon: faqIcons.who },
  ];

  return (
    <section className="relative overflow-hidden bg-muted/30 py-24">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(76,175,80,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(76,175,80,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="container relative mx-auto px-4">
        <div className="flex flex-col gap-10 md:flex-row md:gap-16">
          {/* Left column - Sticky header */}
          <motion.div
            className="md:w-1/3"
            initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="sticky top-24">
              {/* Badge */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-mpc-green-500/20 bg-mpc-green-500/5 px-4 py-2">
                <HelpCircle className="h-4 w-4 text-mpc-green-500" />
                <span className="text-sm font-medium text-mpc-green-600 dark:text-mpc-green-400">
                  {t("faq.badge")}
                </span>
              </div>

              <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
                {t("faq.title")}
              </h2>
              <p className="text-muted-foreground">
                {t("faq.subtitle")}{" "}
                <a
                  href={siteConfig.links.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-mpc-green-600 hover:underline dark:text-mpc-green-400"
                >
                  {t("faq.contact")}
                </a>
              </p>
            </div>
          </motion.div>

          {/* Right column - Accordion */}
          <motion.div
            className="md:w-2/3"
            initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Accordion type="single" collapsible className="w-full space-y-3">
              {faqItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                  >
                    <AccordionItem
                      value={item.id}
                      className="rounded-2xl border border-border/50 bg-card px-4 shadow-sm transition-all hover:border-mpc-green-500/30 hover:shadow-md data-[state=open]:border-mpc-green-500/50 data-[state=open]:shadow-lg"
                    >
                      <AccordionTrigger className="py-5 hover:no-underline [&[data-state=open]>div>svg]:text-mpc-green-500">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-mpc-green-500/10">
                            <IconComponent className="h-4 w-4 text-mpc-green-600 transition-colors dark:text-mpc-green-400" />
                          </div>
                          <span className="text-start text-base font-medium">
                            {t(`faq.items.${item.id}.question`)}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pb-5">
                        <div className="ps-11 text-muted-foreground">
                          <p className="text-base leading-relaxed">
                            {t(`faq.items.${item.id}.answer`)}
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                );
              })}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
