import { siteConfig } from "@/config/site";
import { routing, type Locale } from "@/i18n/routing";

function ensureLeadingSlash(pathname: string): string {
  return pathname.startsWith("/") ? pathname : `/${pathname}`;
}

export function getLocalizedPath(locale: Locale, pathname: string = "/"): string {
  const normalized = ensureLeadingSlash(pathname);
  const defaultLocale = routing.defaultLocale as Locale;
  if (locale === defaultLocale) {
    return normalized;
  }
  return normalized === "/" ? `/${locale}` : `/${locale}${normalized}`;
}

export function getLocalizedUrl(locale: Locale, pathname: string = "/"): string {
  return new URL(getLocalizedPath(locale, pathname), siteConfig.url).toString();
}

export function toAbsoluteUrl(url: string): string {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  return new URL(ensureLeadingSlash(url), siteConfig.url).toString();
}

export function getLocaleAlternates(
  localePaths: Partial<Record<Locale, string>>,
  canonicalLocale: Locale
) {
  const languages: Record<string, string> = {};

  for (const locale of routing.locales) {
    const path = localePaths[locale];
    if (!path) continue;
    languages[locale] = getLocalizedPath(locale, path);
  }

  const canonicalPath = localePaths[canonicalLocale] || "/";

  return {
    canonical: getLocalizedPath(canonicalLocale, canonicalPath),
    languages,
  };
}
