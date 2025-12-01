import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "ar"],

  // Default locale when no locale is detected
  defaultLocale: "en",

  // Locale prefix strategy
  localePrefix: "as-needed",
});

// RTL languages
export const rtlLocales = ["ar"] as const;

export type Locale = (typeof routing.locales)[number];
