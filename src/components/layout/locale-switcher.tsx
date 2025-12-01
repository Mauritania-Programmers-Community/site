"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const newLocale = locale === "en" ? "ar" : "en";

    // Remove the current locale prefix and add the new one
    const pathWithoutLocale = pathname.replace(/^\/(en|ar)/, "");
    const newPath = `/${newLocale}${pathWithoutLocale || ""}`;

    router.push(newPath);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLocale}
      className="gap-2"
    >
      <Languages className="h-4 w-4" />
      <span className="hidden sm:inline">
        {locale === "en" ? "العربية" : "English"}
      </span>
    </Button>
  );
}
