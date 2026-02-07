/**
 * Content helper functions for Velite-generated content
 * Uses locale-based content filtering for i18n support
 */

// Import from Velite-generated content
// Note: .velite directory is generated during build
import { posts, events } from "#site/content";

export type Locale = "en" | "ar";
export type Post = (typeof posts)[number];
export type Event = (typeof events)[number];

const LOCALES: Locale[] = ["en", "ar"];

type DatedContent = { date: string };
type LocalizedContent = { locale: Locale };
type SluggedContent = { locale: Locale; baseSlug: string };

const toTimestamp = (value: string): number => new Date(value).getTime();
const sortByDateDesc = <T extends DatedContent>(a: T, b: T) =>
  toTimestamp(b.date) - toTimestamp(a.date);
const sortByDateAsc = <T extends DatedContent>(a: T, b: T) =>
  toTimestamp(a.date) - toTimestamp(b.date);

function createLocaleBuckets<T extends LocalizedContent>(items: T[]): Record<Locale, T[]> {
  const buckets: Record<Locale, T[]> = {
    en: [],
    ar: [],
  };

  for (const item of items) {
    buckets[item.locale].push(item);
  }

  return buckets;
}

function createSlugIndex<T extends SluggedContent>(items: T[]): Map<string, T> {
  const index = new Map<string, T>();
  for (const item of items) {
    index.set(`${item.locale}:${item.baseSlug}`, item);
  }
  return index;
}

function uniqueSorted<T>(values: Iterable<T>): T[] {
  return Array.from(new Set(values)).sort();
}

// Build immutable indexes from Velite output once per process for fast runtime lookups.
const publishedPosts = posts.filter((post) => post.published);
const publishedEvents = events.filter((event) => event.published);

const postSlugs = uniqueSorted(publishedPosts.map((post) => post.baseSlug));
const eventSlugs = uniqueSorted(publishedEvents.map((event) => event.baseSlug));

const postsByLocale = createLocaleBuckets(publishedPosts);
const eventsByLocale = createLocaleBuckets(publishedEvents);

for (const locale of LOCALES) {
  postsByLocale[locale].sort(sortByDateDesc);
  eventsByLocale[locale].sort(sortByDateDesc);
}

const postIndex = createSlugIndex(publishedPosts);
const eventIndex = createSlugIndex(publishedEvents);

const tagsByLocale: Record<Locale, string[]> = {
  en: uniqueSorted(
    postsByLocale.en.flatMap((post) => post.tags).filter((tag) => tag.trim() !== "")
  ),
  ar: uniqueSorted(
    postsByLocale.ar.flatMap((post) => post.tags).filter((tag) => tag.trim() !== "")
  ),
};

/**
 * Get all published posts for a specific locale
 */
export function getPostsByLocale(locale: Locale): Post[] {
  return [...postsByLocale[locale]];
}

/**
 * Get a specific post by slug and locale
 */
export function getPost(slug: string, locale: Locale): Post | undefined {
  return postIndex.get(`${locale}:${slug}`);
}

/**
 * Get all unique post slugs (for static generation)
 */
export function getAllPostSlugs(): string[] {
  return [...postSlugs];
}

/**
 * Get posts by tag for a specific locale
 */
export function getPostsByTag(tag: string, locale: Locale): Post[] {
  return postsByLocale[locale].filter((post) => post.tags.includes(tag));
}

/**
 * Get all unique tags for a locale
 */
export function getAllTags(locale: Locale): string[] {
  return [...tagsByLocale[locale]];
}

/**
 * Get recent posts
 */
export function getRecentPosts(locale: Locale, limit: number = 5): Post[] {
  return getPostsByLocale(locale).slice(0, limit);
}

/**
 * Get related posts based on tags
 */
export function getRelatedPosts(
  post: Post,
  locale: Locale,
  limit: number = 3
): Post[] {
  return postsByLocale[locale]
    .filter(
      (candidate) =>
        candidate.baseSlug !== post.baseSlug &&
        candidate.tags.some((tag) => post.tags.includes(tag))
    )
    .sort((a, b) => {
      const aOverlap = a.tags.filter((tag) => post.tags.includes(tag)).length;
      const bOverlap = b.tags.filter((tag) => post.tags.includes(tag)).length;
      if (bOverlap !== aOverlap) return bOverlap - aOverlap;
      return sortByDateDesc(a, b);
    })
    .slice(0, limit);
}

/**
 * Check if translation exists for a post
 */
export function hasTranslation(slug: string, locale: Locale): boolean {
  return postIndex.has(`${locale}:${slug}`);
}

// ============================================
// Event Helpers
// ============================================

/**
 * Get all published events for a specific locale
 */
export function getEventsByLocale(locale: Locale): Event[] {
  return [...eventsByLocale[locale]];
}

/**
 * Get a specific event by slug and locale
 */
export function getEvent(slug: string, locale: Locale): Event | undefined {
  return eventIndex.get(`${locale}:${slug}`);
}

/**
 * Get all unique event slugs (for static generation)
 */
export function getAllEventSlugs(): string[] {
  return [...eventSlugs];
}

/**
 * Get upcoming events for a locale
 */
export function getUpcomingEvents(locale: Locale): Event[] {
  return eventsByLocale[locale]
    .filter((event) => event.status === "upcoming")
    .sort(sortByDateAsc);
}

/**
 * Get past/completed events for a locale
 */
export function getPastEvents(locale: Locale): Event[] {
  return eventsByLocale[locale]
    .filter((event) => event.status === "completed")
    .sort(sortByDateDesc);
}

/**
 * Get recent events - last N events regardless of status
 * Returns events sorted by date (newest first)
 */
export function getRecentEvents(locale: Locale, limit: number = 3): Event[] {
  return getEventsByLocale(locale).slice(0, limit);
}

/**
 * Get events by type for a locale
 */
export function getEventsByType(
  type: Event["type"],
  locale: Locale
): Event[] {
  return eventsByLocale[locale].filter((event) => event.type === type);
}

/**
 * Check if translation exists for an event
 */
export function hasEventTranslation(slug: string, locale: Locale): boolean {
  return eventIndex.has(`${locale}:${slug}`);
}

// ============================================
// Utility Functions
// ============================================

/**
 * Format reading time for display
 */
export function formatReadingTime(minutes: number, locale: Locale): string {
  if (locale === "ar") {
    if (minutes === 1) return "دقيقة واحدة للقراءة";
    if (minutes === 2) return "دقيقتان للقراءة";
    if (minutes <= 10) return `${minutes} دقائق للقراءة`;
    return `${minutes} دقيقة للقراءة`;
  }
  return `${minutes} min read`;
}

/**
 * Format date for display with Western numerals
 */
export function formatDate(
  date: string,
  locale: string,
  options?: Intl.DateTimeFormatOptions
): string {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...options,
  };
  return new Date(date).toLocaleDateString(
    locale === "ar" ? "ar-u-nu-latn" : "en-US",
    defaultOptions
  );
}

/**
 * Get static params for blog posts (for generateStaticParams)
 */
export function getBlogStaticParams() {
  return publishedPosts.map((post) => ({
      locale: post.locale,
      slug: post.baseSlug,
    }));
}

/**
 * Get static params for events (for generateStaticParams)
 */
export function getEventStaticParams() {
  return publishedEvents.map((event) => ({
      locale: event.locale,
      id: event.baseSlug,
    }));
}

// Re-export raw collections for advanced use cases
export { posts, events };
