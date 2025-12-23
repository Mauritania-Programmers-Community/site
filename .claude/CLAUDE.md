# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**MPC Platform** - Community website for Mauritanian Programmers Community (مجتمع مبرمجي موريتانيا)
- **GitHub:** https://github.com/Mauritania-Programmers-Community/mpc_website
- **Stack:** Next.js 16 + React 19 + TypeScript + Tailwind v4 + Velite + next-intl
- **i18n:** English + Arabic (RTL support)

## Essential Commands

```bash
# Development
pnpm dev              # Start with Turbopack (default)
pnpm dev:webpack      # Start with Webpack

# Build
pnpm build            # Runs Velite content build + Next.js build

# Linting
pnpm lint             # ESLint check

# shadcn/ui
pnpm dlx shadcn@latest add [component]
```

## Critical Next.js 16 Requirements

**MUST await params** - Next.js 16 changed params to be async:

```typescript
// Pages
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
}

// Metadata
export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params;
}
```

## Tailwind CSS v4 Architecture

**CSS-first configuration** - No `tailwind.config.js`. All theme config in `src/app/globals.css`:

```css
@theme {
  --color-mpc-green-500: #4CAF50;
  --color-mpc-gold-500: #FFC107;
}

/* Dark mode */
@custom-variant dark (&:where(.dark, .dark *));

/* RTL support - use logical properties */
ms-4  /* Instead of ml-4 */
me-4  /* Instead of mr-4 */
ps-4  /* Instead of pl-4 */
pe-4  /* Instead of pr-4 */
```

## Content Management (Velite)

**Bilingual MDX system** - Content in `content/{collection}/{locale}/`:

```
content/
├── blog/
│   ├── en/post-name.mdx
│   └── ar/post-name.mdx
└── events/
    ├── en/event-name.mdx
    └── ar/event-name.mdx
```

**Key transforms** in `velite.config.ts`:
- `baseSlug` - Filename without extension (e.g., `post-name`)
- `locale` - Extracted from path (`en` or `ar`)
- `permalink` - Full URL path (e.g., `/en/blog/post-name`)
- `readingTime` - Auto-calculated for posts

**Content schemas** - Valid frontmatter fields (see `velite.config.ts`):

Blog Posts:
```yaml
locale: en | ar              # Required
title: string                # Required (max 99 chars)
description: string          # Required (max 999 chars)
date: YYYY-MM-DD            # Required (ISO date)
published: boolean           # Default: true
author: string               # Required (must exist in authors.ts)
image: string                # Optional (path to image)
tags: string[]               # Optional (default: [])
```

Events:
```yaml
locale: en | ar                                      # Required
title: string                                        # Required (max 99 chars)
description: string                                  # Required (max 999 chars)
date: YYYY-MM-DD                                    # Required (ISO date)
type: workshop | meetup | hackathon | webinar       # Required
status: upcoming | completed | cancelled             # Default: upcoming
published: boolean                                   # Default: true
speaker: string                                      # Optional
platform: string                                     # Optional (e.g., "Google Meet")
image: string                                        # Optional
endDate: YYYY-MM-DD                                 # Optional (ISO date)
location: string                                     # Optional
registrationUrl: string                              # Optional (URL for registration)
recordingUrl: string                                 # Optional (URL for video recording)
```

**Content helpers** in `src/lib/content.ts`:
- `getPostsByLocale(locale)` - Published posts for locale
- `getPost(slug, locale)` - Single post by slug + locale
- `getEventsByLocale(locale)` - Published events for locale
- `hasTranslation(slug, locale)` - Check if translation exists

**Velite integration** - Custom webpack plugin runs Velite before Next.js build:
- Generates `.velite/` directory (gitignored)
- Watch mode in dev, clean build in prod
- Import content: `import { posts, events } from "#site/content"`

## i18n Architecture (next-intl)

**Routing setup** in `src/i18n/routing.ts`:
- Locales: `["en", "ar"]`
- Default: `"en"`
- Prefix strategy: `"as-needed"` (no `/en` prefix for default locale)

**Locale detection**:
- URL-based routing via `[locale]` dynamic segment
- All pages under `src/app/[locale]/`
- Translation files in `messages/{locale}.json`

**RTL support**:
- Arabic pages get `dir="rtl"` attribute
- Use logical CSS properties (`ms-*`, `me-*`, `ps-*`, `pe-*`)
- Fonts: Inter (English), Cairo (Arabic)

## Author System

**Type-safe authors** in `src/lib/authors.ts`:
- Authors defined as `Record<string, Author>`
- DiceBear avatars with MPC brand colors
- Bilingual names and roles

```typescript
// Usage in content
author: "ahmed-abdat"  // References authors.ts

// Get author data
import { getAuthor, getAuthorName } from "@/lib/authors";
const author = getAuthor("ahmed-abdat");
const name = getAuthorName("ahmed-abdat", locale);
```

## Architecture Decisions

1. **`src/` directory** - All source code inside `src/`
2. **Content outside `src/`** - MDX files in top-level `content/`
3. **`[locale]` routing** - All pages under `app/[locale]/` for i18n
4. **No barrel exports** - Import directly from files for tree-shaking
5. **Velite webpack plugin** - Turbopack-compatible content builds

## Key Files

| File | Purpose |
|------|---------|
| `src/app/globals.css` | Tailwind v4 theme (MPC colors, dark mode, RTL) |
| `velite.config.ts` | Content schemas, MDX plugins, reading time |
| `src/i18n/routing.ts` | i18n config (locales, default, prefix) |
| `src/lib/content.ts` | Content helper functions |
| `src/lib/authors.ts` | Author definitions with DiceBear avatars |
| `next.config.ts` | Velite webpack plugin + next-intl setup |

## MPC Brand

**Colors:**
- Primary: `#4CAF50` (MPC Green)
- Accent: `#FFC107` (Gold)

**Fonts:**
- English: Inter
- Arabic: Cairo
- Code: JetBrains Mono

## Critical Gotchas

1. **Always await params** in Next.js 16 pages/metadata
2. **Use `@theme`** in `globals.css` for Tailwind v4 (not config file)
3. **`.velite` directory** is gitignored - regenerated on build
4. **Logical CSS properties** for RTL (`ms-*`, `me-*` not `ml-*`, `mr-*`)
5. **Content import path** is `#site/content` (aliased to `.velite`)
6. **Velite runs via webpack plugin** - no separate CLI command needed
