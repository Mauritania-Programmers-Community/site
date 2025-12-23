"use client";

import { useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Languages, ChevronDown, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const languages = [
  { code: "en", label: "English", flag: "/flags/en.svg" },
  { code: "ar", label: "العربية", flag: "/flags/ar.svg" },
] as const;

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("common");

  const handleLocaleChange = (newLocale: string) => {
    if (newLocale === locale) return;

    localStorage.setItem("preferred-locale", newLocale);

    const pathWithoutLocale = pathname.replace(/^\/(en|ar)/, "");
    const newPath = `/${newLocale}${pathWithoutLocale || ""}`;
    router.push(newPath);
  };

  useEffect(() => {
    const saved = localStorage.getItem("preferred-locale");
    if (saved && saved !== locale && languages.some(lang => lang.code === saved)) {
      handleLocaleChange(saved);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentLocale = locale.toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex h-10 items-center gap-2 rounded-full bg-muted/20 px-3 transition-colors hover:bg-muted/30"
          aria-label={`${t("changeLanguage")}. ${t("currentLanguage")}: ${currentLocale}`}
        >
          <Languages className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
          <span className="text-sm font-medium">{currentLocale}</span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        {languages.map((lang) => {
          const isActive = locale === lang.code;

          return (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => handleLocaleChange(lang.code)}
              disabled={isActive}
              className="flex cursor-pointer items-center gap-3"
            >
              <div className="relative h-6 w-6 shrink-0 overflow-hidden rounded-full">
                <Image
                  src={lang.flag}
                  alt=""
                  fill
                  className="object-cover"
                  aria-hidden="true"
                />
              </div>
              <span className="flex-1 text-sm font-medium">{lang.label}</span>
              {isActive && <Check className="h-4 w-4" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
