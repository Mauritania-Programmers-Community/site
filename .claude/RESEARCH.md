# MPC Platform - Technical Research

## Last Updated: November 30, 2025

---

## 1. Next.js 16 Key Changes

### Async Params (CRITICAL)

In Next.js 16, `params` and `searchParams` are now **Promises** that must be awaited:

```typescript
// Next.js 16 Pattern
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <div>{slug}</div>;
}
```

### generateStaticParams

```typescript
export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
```

### generateMetadata

```typescript
export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  return {
    title: post?.title,
    description: post?.description,
  };
}
```

---

## 2. Tailwind CSS v4 Configuration

### CSS-First Approach

Tailwind v4 moves configuration from JS to CSS using `@theme`:

```css
@import "tailwindcss";

@theme {
  /* MPC Brand Colors */
  --color-mpc-green: #4CAF50;
  --color-mpc-green-dark: #1B5E20;
  --color-mpc-gold: #FFC107;

  /* Dark Theme */
  --color-background: #0A0A0A;
  --color-foreground: #FAFAFA;
  --color-muted: #A1A1AA;
  --color-border: #262626;

  /* Fonts */
  --font-sans: 'Inter', sans-serif;
  --font-arabic: 'Cairo', sans-serif;
}
```

### Dark Mode with @custom-variant

```css
@custom-variant dark (&:where(.dark, .dark *));

/* Or for data attribute */
@custom-variant dark (&:where([data-theme="dark"], [data-theme="dark"] *));
```

### RTL Support

Use logical properties:
```css
.card {
  margin-inline-start: 1rem;  /* instead of margin-left */
  padding-inline-end: 1rem;   /* instead of padding-right */
}
```

Tailwind classes:
- `ms-*` (margin-start) instead of `ml-*`
- `me-*` (margin-end) instead of `mr-*`
- `ps-*` (padding-start) instead of `pl-*`
- `pe-*` (padding-end) instead of `pr-*`

---

## 3. shadcn/ui Setup

### Installation

```bash
npx shadcn@latest init
```

### Adding Components

```bash
npx shadcn@latest add button card badge avatar sheet separator
```

### Usage

```typescript
import { Button } from "@/components/ui/button"

export default function Home() {
  return <Button variant="outline">Click me</Button>
}
```

### Key Points

- Components are copied to your codebase (not a dependency)
- Full customization control
- Built on Radix UI for accessibility
- Tailwind CSS for styling

---

## 4. Velite MDX Configuration

### Installation

```bash
npm install velite -D
```

### next.config.ts Integration (Turbopack Compatible)

```typescript
import type { NextConfig } from 'next';

const isDev = process.argv.indexOf('dev') !== -1;
const isBuild = process.argv.indexOf('build') !== -1;

if (!process.env.VELITE_STARTED && (isDev || isBuild)) {
  process.env.VELITE_STARTED = '1';
  import('velite').then((m) =>
    m.build({ watch: isDev, clean: !isDev })
  );
}

const config: NextConfig = {
  // your config
};

export default config;
```

### velite.config.ts Schema

```typescript
import { defineConfig, s } from 'velite';

export default defineConfig({
  collections: {
    events: {
      name: 'Event',
      pattern: 'events/**/*.mdx',
      schema: s.object({
        title: s.string().max(100),
        titleAr: s.string().optional(),
        slug: s.slug('events'),
        date: s.isodate(),
        status: s.enum(['upcoming', 'completed', 'cancelled']),
        type: s.enum(['workshop', 'meetup', 'webinar', 'hackathon']),
        description: s.string(),
        coverImage: s.image(),
        speaker: s.object({
          name: s.string(),
          role: s.string(),
          image: s.image().optional(),
        }),
        platform: s.enum(['google_meet', 'zoom', 'youtube', 'in_person']),
        youtubeRecording: s.string().optional(),
        content: s.mdx(),
      }),
    },
    posts: {
      name: 'Post',
      pattern: 'blog/**/*.mdx',
      schema: s.object({
        title: s.string(),
        slug: s.slug('blog'),
        date: s.isodate(),
        author: s.string(),
        excerpt: s.string(),
        coverImage: s.image(),
        tags: s.array(s.string()),
        content: s.mdx(),
      }),
    },
  },
});
```

### Usage

```typescript
import { events, posts } from '@/.velite';

// Filter upcoming events
const upcomingEvents = events.filter(e => e.status === 'upcoming');

// Get single event
const event = events.find(e => e.slug === params.slug);
```

---

## 5. next-intl i18n Setup

### Installation

```bash
npm install next-intl
```

### File Structure

```
src/
├── i18n/
│   ├── routing.ts
│   └── request.ts
├── messages/
│   ├── en.json
│   └── ar.json
└── app/
    └── [locale]/
        ├── layout.tsx
        └── page.tsx
```

### i18n/routing.ts

```typescript
import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['en', 'ar'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
});

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
```

### i18n/request.ts

```typescript
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ locale }) => {
  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
```

### next.config.ts

```typescript
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

export default withNextIntl({
  // your config
});
```

### RTL Detection in Layout

```typescript
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const direction = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={direction}>
      <body className={direction === 'rtl' ? 'font-arabic' : 'font-sans'}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

### Usage

Server Components:
```typescript
import { getTranslations } from 'next-intl/server';

export default async function Page() {
  const t = await getTranslations();
  return <h1>{t('hero.title')}</h1>;
}
```

Client Components:
```typescript
'use client';
import { useTranslations } from 'next-intl';

export function Navigation() {
  const t = useTranslations();
  return <nav>{t('nav.home')}</nav>;
}
```

---

## 6. Font Configuration

### Inter + Cairo with next/font

```typescript
// src/lib/fonts.ts
import { Inter, Cairo } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const cairo = Cairo({
  subsets: ['arabic'],
  variable: '--font-cairo',
  display: 'swap',
});
```

### Layout Usage

```typescript
import { inter, cairo } from '@/lib/fonts';

export default function RootLayout({ children }) {
  return (
    <html className={`${inter.variable} ${cairo.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

### Tailwind CSS

```css
@theme {
  --font-sans: var(--font-inter), sans-serif;
  --font-arabic: var(--font-cairo), sans-serif;
}
```

---

## 7. Key Gotchas

1. **Next.js 16**: Always await `params`, `searchParams`, `cookies()`, `headers()`

2. **Tailwind v4**: No more `tailwind.config.js` for theme - use `@theme` in CSS

3. **Velite**:
   - Add `.velite` to `.gitignore`
   - Use next.config.ts approach for Turbopack
   - Don't use MDXRemote - Velite pre-compiles

4. **next-intl**:
   - For RTL, use logical CSS properties
   - Test with Arabic content thoroughly

5. **shadcn/ui**:
   - Run with `--force` for beta Next.js versions if needed
   - Components are in your codebase - customize freely

---

## 8. Dependencies to Install

```bash
# Core
npm install framer-motion next-intl next-themes lucide-react clsx tailwind-merge

# Content
npm install velite -D

# shadcn/ui (run separately)
npx shadcn@latest init
npx shadcn@latest add button card badge avatar sheet separator
```
