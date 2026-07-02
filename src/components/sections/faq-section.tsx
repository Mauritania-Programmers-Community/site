import { getTranslations, getLocale } from "next-intl/server";
import { HelpCircle } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/ui/reveal";
import { FaqAccordion, type FaqItem } from "./faq-accordion";

const faqIds = ["about", "join", "topics", "events", "who"];

export async function FAQSection() {
  const t = await getTranslations();
  const locale = await getLocale();
  const isRTL = locale === "ar";

  const faqItems: FaqItem[] = faqIds.map((id) => ({
    id,
    question: t(`faq.items.${id}.question`),
    answer: t(`faq.items.${id}.answer`),
  }));

  return (
    <section className="relative overflow-hidden bg-muted/30 py-24">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(76,175,80,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(76,175,80,0.02)_1px,transparent_1px)] bg-size-[60px_60px]" />
      </div>

      <div className="container relative mx-auto px-4">
        <div className="flex flex-col gap-10 md:flex-row md:gap-16">
          {/* Left column - Sticky header */}
          <Reveal className="md:w-1/3" y={0} x={isRTL ? 20 : -20}>
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
          </Reveal>

          {/* Right column - Accordion */}
          <Reveal className="md:w-2/3" y={0} x={isRTL ? -20 : 20} delay={0.2}>
            <FaqAccordion items={faqItems} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
