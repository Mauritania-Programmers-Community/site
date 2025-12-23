"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { LocaleSwitcher } from "./locale-switcher";
import { ThemeToggle } from "./theme-toggle";
import { siteConfig } from "@/config/site";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [menuState, setMenuState] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: `/${locale}/events`, label: t("events") },
    { href: `/${locale}/blog`, label: t("blog") },
  ];

  return (
    <header>
      <nav
        data-state={menuState ? "active" : undefined}
        className="fixed z-50 w-full px-2"
      >
        <div className={cn(
          "mx-auto mt-2 max-w-7xl px-6 transition-all duration-300 lg:px-12",
          scrolled && "bg-background/50 max-w-5xl rounded-2xl border backdrop-blur-lg lg:px-8"
        )}>
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            {/* Logo & Mobile Toggle */}
            <div className="flex w-full items-center justify-between gap-12 lg:w-auto">
              <Link
                href={`/${locale}`}
                aria-label="home"
                className="flex items-center gap-2"
              >
                <Image
                  src="/images/logos/mpc_logo.webp"
                  alt={siteConfig.name}
                  width={40}
                  height={40}
                  className="h-10 w-10"
                />
                <span className="hidden text-xl font-bold text-mpc-green-500 sm:inline">
                  {siteConfig.name}
                </span>
              </Link>

              {/* Mobile Menu Button with animated icons */}
              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState ? "Close Menu" : "Open Menu"}
                className="relative z-20 -m-2.5 -me-4 block cursor-pointer p-2.5 lg:hidden"
              >
                <Menu
                  className={cn(
                    "m-auto size-6 transition-all duration-200",
                    menuState && "rotate-180 scale-0 opacity-0"
                  )}
                />
                <X
                  className={cn(
                    "absolute inset-0 m-auto size-6 transition-all duration-200",
                    menuState
                      ? "rotate-0 scale-100 opacity-100"
                      : "-rotate-180 scale-0 opacity-0"
                  )}
                />
              </button>

              {/* Desktop Navigation */}
              <div className="hidden lg:block">
                <ul className="flex gap-8 text-sm">
                  {navItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-muted-foreground hover:text-foreground block font-medium transition-colors duration-150"
                      >
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Desktop Actions & Mobile Menu */}
            <div
              className={cn(
                "bg-background mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent",
                menuState && "block"
              )}
            >
              {/* Mobile Navigation Links */}
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  {navItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setMenuState(false)}
                        className="text-muted-foreground hover:text-foreground block font-medium transition-colors duration-150"
                      >
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex w-full flex-col gap-3 sm:flex-row md:w-fit">
                <div className="flex h-10 items-center gap-2">
                  <LocaleSwitcher />
                  <ThemeToggle />
                </div>
                <RainbowButton className="h-10 w-full sm:w-auto" asChild>
                  <a
                    href={siteConfig.links.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("join")}
                  </a>
                </RainbowButton>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {/* Spacer to account for fixed navbar */}
      <div className="h-[72px] lg:h-20" />
    </header>
  );
}
