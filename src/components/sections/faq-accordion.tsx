"use client";

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
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const faqIcons: Record<string, LucideIcon> = {
  about: HelpCircle,
  join: MessageCircle,
  topics: Lightbulb,
  events: Calendar,
  who: Users,
};

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

/**
 * Client island: the interactive Radix accordion for the FAQ section.
 * The section itself stays a server component and passes translated items in.
 */
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <Accordion type="single" collapsible className="w-full space-y-3">
      {items.map((item, index) => {
        const IconComponent = faqIcons[item.id] ?? HelpCircle;
        return (
          <Reveal key={item.id} delay={0.1 + index * 0.1}>
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
                    {item.question}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-5">
                <div className="ps-11 text-muted-foreground">
                  <p className="text-base leading-relaxed">{item.answer}</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Reveal>
        );
      })}
    </Accordion>
  );
}
