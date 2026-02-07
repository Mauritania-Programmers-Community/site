"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";
import { Github, Linkedin, Facebook } from "lucide-react";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations();
  const [currentYear, setCurrentYear] = useState(2025);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear()); // eslint-disable-line react-hooks/set-state-in-effect
  }, []);

  return (
    <footer className="border-t py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-3">
            <Image
              src="/images/logos/mpc_logo.webp"
              alt={siteConfig.name}
              width={48}
              height={48}
              className="h-12 w-12"
            />
            <div>
              <h3 className="text-xl font-bold">{siteConfig.name}</h3>
              <p className="text-sm text-muted-foreground">
                {t("footer.tagline")}
              </p>
            </div>
          </div>
          <nav className="flex gap-6">
            <Link
              href="/events"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {t("nav.events")}
            </Link>
            <Link
              href="/blog"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {t("nav.blog")}
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("footer.social.github")}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("footer.social.linkedin")}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href={siteConfig.links.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("footer.social.facebook")}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <div className="ms-4 border-s ps-4">
              <LocaleSwitcher />
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          {t("footer.copyright", { year: currentYear })}
        </div>
      </div>
    </footer>
  );
}
