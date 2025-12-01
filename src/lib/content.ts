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

// ============================================
// Blog Post Helpers
// ============================================

/**
 * Get all published posts for a specific locale
 */
export function getPostsByLocale(locale: Locale): Post[] {
  return posts
    .filter((post) => post.locale === locale && post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Get a specific post by slug and locale
 */
export function getPost(slug: string, locale: Locale): Post | undefined {
  return posts.find(
    (post) =>
      post.baseSlug === slug && post.locale === locale && post.published
  );
}

/**
 * Get all unique post slugs (for static generation)
 */
export function getAllPostSlugs(): string[] {
  const slugs = new Set(posts.map((post) => post.baseSlug));
  return Array.from(slugs);
}

/**
 * Get posts by tag for a specific locale
 */
export function getPostsByTag(tag: string, locale: Locale): Post[] {
  return posts.filter(
    (post) =>
      post.locale === locale &&
      post.published &&
      post.tags.includes(tag)
  );
}

/**
 * Get all unique tags for a locale
 */
export function getAllTags(locale: Locale): string[] {
  const tags = new Set<string>();
  posts
    .filter((post) => post.locale === locale && post.published)
    .forEach((post) => {
      post.tags.forEach((tag) => tags.add(tag));
    });
  return Array.from(tags);
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
  return posts
    .filter(
      (p) =>
        p.baseSlug !== post.baseSlug &&
        p.locale === locale &&
        p.published &&
        p.tags.some((tag) => post.tags.includes(tag))
    )
    .slice(0, limit);
}

/**
 * Check if translation exists for a post
 */
export function hasTranslation(slug: string, locale: Locale): boolean {
  return posts.some(
    (post) => post.baseSlug === slug && post.locale === locale && post.published
  );
}

// ============================================
// Event Helpers
// ============================================

/**
 * Get all published events for a specific locale
 */
export function getEventsByLocale(locale: Locale): Event[] {
  return events
    .filter((event) => event.locale === locale && event.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Get a specific event by slug and locale
 */
export function getEvent(slug: string, locale: Locale): Event | undefined {
  return events.find(
    (event) =>
      event.baseSlug === slug && event.locale === locale && event.published
  );
}

/**
 * Get all unique event slugs (for static generation)
 */
export function getAllEventSlugs(): string[] {
  const slugs = new Set(events.map((event) => event.baseSlug));
  return Array.from(slugs);
}

/**
 * Get upcoming events for a locale
 */
export function getUpcomingEvents(locale: Locale): Event[] {
  return events.filter(
    (event) =>
      event.locale === locale &&
      event.published &&
      event.status === "upcoming"
  );
}

/**
 * Get past/completed events for a locale
 */
export function getPastEvents(locale: Locale): Event[] {
  return events.filter(
    (event) =>
      event.locale === locale &&
      event.published &&
      event.status === "completed"
  );
}

/**
 * Get events by type for a locale
 */
export function getEventsByType(
  type: Event["type"],
  locale: Locale
): Event[] {
  return events.filter(
    (event) =>
      event.locale === locale && event.published && event.type === type
  );
}

/**
 * Check if translation exists for an event
 */
export function hasEventTranslation(slug: string, locale: Locale): boolean {
  return events.some(
    (event) =>
      event.baseSlug === slug && event.locale === locale && event.published
  );
}

// ============================================
// Utility Functions
// ============================================

/**
 * Format date for display
 */
export function formatDate(
  date: string,
  locale: Locale,
  options?: Intl.DateTimeFormatOptions
): string {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...options,
  };
  return new Date(date).toLocaleDateString(
    locale === "ar" ? "ar-MR" : "en-US",
    defaultOptions
  );
}

/**
 * Get static params for blog posts (for generateStaticParams)
 */
export function getBlogStaticParams() {
  return posts
    .filter((post) => post.published)
    .map((post) => ({
      locale: post.locale,
      slug: post.baseSlug,
    }));
}

/**
 * Get static params for events (for generateStaticParams)
 */
export function getEventStaticParams() {
  return events
    .filter((event) => event.published)
    .map((event) => ({
      locale: event.locale,
      slug: event.baseSlug,
    }));
}

// Re-export raw collections for advanced use cases
export { posts, events };
