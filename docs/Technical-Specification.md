# MPC Platform - Technical Specification Document

## مجتمع مبرمجي موريتانيا - المواصفات التقنية

**Version:** 1.0  
**Date:** November 30, 2025  
**Author:** MPC Development Team

---

## 1. System Architecture

### 1.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         VERCEL EDGE                              │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                    CDN / Edge Cache                      │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      NEXT.JS 16 APPLICATION                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  App Router  │  │  API Routes  │  │  Static Gen  │          │
│  │   (RSC)      │  │  (optional)  │  │   (SSG)      │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                              │                                   │
│  ┌──────────────────────────────────────────────────┐          │
│  │              CONTENT LAYER (Velite)               │          │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐          │          │
│  │  │ Events  │  │  Blog   │  │  Team   │          │          │
│  │  │  (MDX)  │  │  (MDX)  │  │ (JSON)  │          │          │
│  │  └─────────┘  └─────────┘  └─────────┘          │          │
│  └──────────────────────────────────────────────────┘          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                         GIT REPOSITORY                           │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  /content/events/*.mdx  /content/blog/*.mdx  /data/*.json│   │
│  └────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

### 1.2 Request Flow

1. User requests page (e.g., `/events/github-demo`)
2. Vercel Edge serves cached HTML if available
3. If not cached, Next.js generates page from MDX content
4. Page is cached at edge for subsequent requests
5. Client-side hydration for interactive components

---

## 2. Technology Stack Details

### 2.1 Core Framework

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.x | Framework with App Router |
| React | 19.x | UI Library (via Next.js) |
| TypeScript | 5.x | Type safety |
| Node.js | 20.x LTS | Runtime |

### 2.2 Styling & UI

| Technology | Version | Purpose |
|------------|---------|---------|
| Tailwind CSS | 4.x | Utility-first CSS |
| shadcn/ui | Latest | Base component library |
| Aceternity UI | Latest | Animation components |
| Magic UI | Latest | Special effects |
| Framer Motion | 11.x | Page transitions |

### 2.3 Content Management

| Technology | Version | Purpose |
|------------|---------|---------|
| Velite | Latest | MDX content processing |
| MDX | 3.x | Markdown + JSX |
| Zod | 3.x | Schema validation |

### 2.4 Internationalization

| Technology | Version | Purpose |
|------------|---------|---------|
| next-intl | Latest | i18n for App Router |
| Cairo (font) | - | Arabic typography |
| Inter (font) | - | English typography |

---

## 3. Project Structure

```
mpc-platform/
├── .github/
│   └── workflows/
│       └── ci.yml              # GitHub Actions (optional)
├── app/
│   ├── [locale]/               # i18n routing
│   │   ├── layout.tsx          # Root layout with providers
│   │   ├── page.tsx            # Landing page
│   │   ├── events/
│   │   │   ├── page.tsx        # Events listing
│   │   │   └── [slug]/
│   │   │       └── page.tsx    # Event detail
│   │   ├── blog/
│   │   │   ├── page.tsx        # Blog listing
│   │   │   └── [slug]/
│   │   │       └── page.tsx    # Blog post
│   │   └── team/
│   │       └── page.tsx        # Team page
│   ├── globals.css             # Global styles
│   └── template.tsx            # Page transitions
├── components/
│   ├── ui/                     # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── separator.tsx
│   │   └── avatar.tsx
│   ├── aceternity/             # Aceternity UI
│   │   ├── aurora-background.tsx
│   │   ├── spotlight.tsx
│   │   ├── text-generate-effect.tsx
│   │   ├── 3d-card.tsx
│   │   ├── focus-cards.tsx
│   │   └── background-beams.tsx
│   ├── magicui/                # Magic UI
│   │   ├── number-ticker.tsx
│   │   ├── marquee.tsx
│   │   ├── particles.tsx
│   │   └── dock.tsx
│   ├── sections/               # Page sections
│   │   ├── hero.tsx
│   │   ├── stats.tsx
│   │   ├── features.tsx
│   │   ├── events-preview.tsx
│   │   ├── team-showcase.tsx
│   │   └── cta.tsx
│   ├── layout/
│   │   ├── navbar.tsx
│   │   ├── mobile-nav.tsx
│   │   ├── footer.tsx
│   │   └── theme-toggle.tsx
│   └── mdx/                    # MDX components
│       ├── callout.tsx
│       ├── youtube.tsx
│       ├── code-block.tsx
│       └── event-gallery.tsx
├── content/
│   ├── events/
│   │   ├── 2024-09-21-community-launch.mdx
│   │   ├── 2024-10-26-github-demo.mdx
│   │   ├── 2024-11-02-tier-list.mdx
│   │   └── 2024-xx-xx-cybersecurity-night.mdx
│   └── blog/
│       ├── welcome-to-mpc.mdx
│       └── one-year-anniversary.mdx
├── data/
│   ├── team.json
│   └── stats.json
├── lib/
│   ├── utils.ts                # Utility functions (cn, etc.)
│   ├── fonts.ts                # Font configuration
│   └── mdx.ts                  # MDX utilities
├── messages/                   # i18n translations
│   ├── en.json
│   └── ar.json
├── public/
│   ├── images/
│   │   ├── team/
│   │   ├── events/
│   │   └── logos/
│   └── og-image.png            # Social sharing image
├── styles/
│   └── mdx.css                 # MDX-specific styles
├── .env.local                  # Environment variables
├── .eslintrc.json
├── .gitignore
├── components.json             # shadcn/ui config
├── mdx-components.tsx          # Global MDX components
├── middleware.ts               # i18n middleware
├── next.config.ts
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
└── velite.config.ts            # Content schema
```

---

## 4. Component Specifications

### 4.1 Hero Section

**File:** `components/sections/hero.tsx`

```typescript
interface HeroProps {
  title?: string;           // Override default title
  subtitle?: string;        // Override default subtitle
  showCTA?: boolean;        // Show/hide CTA buttons
}

// Default content from translations
// Background: Aurora gradient animation
// Effects: Spotlight following cursor
// Text: Typing animation for tagline
// CTAs: "Join WhatsApp", "View Events"
```

**Animations:**
- Aurora background: Continuous gradient animation
- Spotlight: Follows cursor position
- Text: TextGenerateEffect for tagline
- Buttons: Hover scale + glow effect

### 4.2 Event Card

**File:** `components/event-card.tsx`

```typescript
interface EventCardProps {
  event: Event;             // From Velite schema
  variant?: 'default' | 'featured';
}

// Uses Aceternity 3D Card
// Displays: cover image, title, date, speaker, status badge
// Link to: /events/[slug]
```

### 4.3 Number Ticker (Stats)

**File:** `components/magicui/number-ticker.tsx`

```typescript
interface NumberTickerProps {
  value: number;
  suffix?: string;          // e.g., "+"
  duration?: number;        // Animation duration in ms
  delay?: number;           // Delay before starting
}

// Animates from 0 to value on scroll into view
// Uses Intersection Observer for trigger
```

---

## 5. Content Schema (Velite)

### 5.1 Configuration

**File:** `velite.config.ts`

```typescript
import { defineConfig, s } from 'velite';

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true,
  },
  collections: {
    events: {
      name: 'Event',
      pattern: 'events/**/*.mdx',
      schema: s.object({
        title: s.string().max(100),
        titleAr: s.string().max(100).optional(),
        slug: s.slug('events'),
        date: s.isodate(),
        endDate: s.isodate().optional(),
        status: s.enum(['upcoming', 'completed', 'cancelled']),
        type: s.enum(['workshop', 'meetup', 'webinar', 'hackathon']),
        description: s.string().max(300),
        descriptionAr: s.string().max(300).optional(),
        coverImage: s.image(),
        speaker: s.object({
          name: s.string(),
          role: s.string(),
          image: s.image().optional(),
        }),
        platform: s.enum(['google_meet', 'zoom', 'youtube', 'in_person']),
        meetLink: s.string().url().optional(),
        youtubeRecording: s.string().url().optional(),
        gallery: s.array(s.image()).optional(),
        tags: s.array(s.string()).optional(),
        content: s.mdx(),
      }),
    },
    posts: {
      name: 'Post',
      pattern: 'blog/**/*.mdx',
      schema: s.object({
        title: s.string().max(100),
        titleAr: s.string().max(100).optional(),
        slug: s.slug('blog'),
        date: s.isodate(),
        author: s.string(),
        excerpt: s.string().max(200),
        excerptAr: s.string().max(200).optional(),
        coverImage: s.image(),
        tags: s.array(s.string()),
        featured: s.boolean().default(false),
        content: s.mdx(),
      }),
    },
  },
});
```

### 5.2 Usage in Components

```typescript
// Import generated content
import { events, posts } from '@/.velite';

// Get all upcoming events
const upcomingEvents = events
  .filter(e => e.status === 'upcoming')
  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

// Get single event by slug
const event = events.find(e => e.slug === params.slug);
```

---

## 6. Internationalization (i18n)

### 6.1 Middleware Configuration

**File:** `middleware.ts`

```typescript
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'ar'],
  defaultLocale: 'en',
  localeDetection: true,
  localePrefix: 'as-needed', // Only show /ar for Arabic
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
```

### 6.2 Translation Structure

**File:** `messages/en.json`

```json
{
  "nav": {
    "home": "Home",
    "events": "Events",
    "blog": "Blog",
    "team": "Team"
  },
  "hero": {
    "title": "Mauritania Programmers Community",
    "subtitle": "Building Mauritania's Tech Future Together",
    "joinCta": "Join WhatsApp Group",
    "eventsCta": "View Events"
  },
  "stats": {
    "members": "Members",
    "events": "Events Hosted",
    "year": "Year Strong"
  }
}
```

**File:** `messages/ar.json`

```json
{
  "nav": {
    "home": "الرئيسية",
    "events": "الفعاليات",
    "blog": "المدونة",
    "team": "الفريق"
  },
  "hero": {
    "title": "مجتمع مبرمجي موريتانيا",
    "subtitle": "نبني مستقبل موريتانيا التقني معًا",
    "joinCta": "انضم لمجموعة واتساب",
    "eventsCta": "عرض الفعاليات"
  },
  "stats": {
    "members": "عضو",
    "events": "فعالية",
    "year": "سنة"
  }
}
```

### 6.3 RTL Support

```typescript
// app/[locale]/layout.tsx
export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const isRTL = locale === 'ar';

  return (
    <html lang={locale} dir={isRTL ? 'rtl' : 'ltr'}>
      <body className={cn(
        isRTL ? 'font-cairo' : 'font-inter',
        'antialiased'
      )}>
        {children}
      </body>
    </html>
  );
}
```

**Tailwind RTL Classes:**
- Use `ms-*` (margin-start) instead of `ml-*`
- Use `me-*` (margin-end) instead of `mr-*`
- Use `ps-*` (padding-start) instead of `pl-*`
- Use `pe-*` (padding-end) instead of `pr-*`

---

## 7. Performance Requirements

### 7.1 Core Web Vitals Targets

| Metric | Target | Measurement |
|--------|--------|-------------|
| LCP (Largest Contentful Paint) | < 2.5s | Time to render largest element |
| FID (First Input Delay) | < 100ms | Time to interactive |
| CLS (Cumulative Layout Shift) | < 0.1 | Visual stability |
| TTFB (Time to First Byte) | < 600ms | Server response time |

### 7.2 Lighthouse Targets

| Category | Target Score |
|----------|-------------|
| Performance | 90+ |
| Accessibility | 95+ |
| Best Practices | 95+ |
| SEO | 95+ |

### 7.3 Optimization Strategies

1. **Image Optimization**
   - Use `next/image` for automatic optimization
   - WebP format with fallbacks
   - Lazy loading for below-fold images

2. **JavaScript Optimization**
   - Dynamic imports for heavy components
   - Lazy load 3D/animation components
   - Tree shaking unused code

3. **CSS Optimization**
   - Tailwind CSS purging
   - Critical CSS inlining
   - No unused styles

4. **Caching Strategy**
   - Static pages cached at edge
   - Immutable assets with long cache
   - Stale-while-revalidate for dynamic content

---

## 8. SEO Specifications

### 8.1 Meta Tags

```typescript
// app/[locale]/layout.tsx
export const metadata: Metadata = {
  title: {
    default: 'MPC - مجتمع مبرمجي موريتانيا',
    template: '%s | MPC',
  },
  description: 'Join 600+ Mauritanian developers...',
  keywords: ['mauritania', 'programmers', 'developers', 'tech community'],
  authors: [{ name: 'MPC Team' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'ar_MR',
    url: 'https://mpc.mr',
    siteName: 'Mauritania Programmers Community',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@mpc_mauritania',
  },
  robots: {
    index: true,
    follow: true,
  },
};
```

### 8.2 JSON-LD Structured Data

```typescript
// For events
const eventJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: event.title,
  startDate: event.date,
  location: {
    '@type': 'VirtualLocation',
    url: event.meetLink,
  },
  organizer: {
    '@type': 'Organization',
    name: 'Mauritania Programmers Community',
    url: 'https://mpc.mr',
  },
  performer: {
    '@type': 'Person',
    name: event.speaker.name,
  },
};
```

---

## 9. Deployment Configuration

### 9.1 Vercel Configuration

**File:** `vercel.json`

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "installCommand": "npm install",
  "regions": ["cdg1"],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

### 9.2 Environment Variables

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://mpc.mr
NEXT_PUBLIC_WHATSAPP_LINK=https://chat.whatsapp.com/xxxxx
NEXT_PUBLIC_GA_ID=G-XXXXXXX  # Optional: Google Analytics
```

### 9.3 Build Commands

```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "velite && next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  }
}
```

---

## 10. Testing Strategy

### 10.1 Manual Testing Checklist

**Landing Page:**
- [ ] Hero section renders correctly
- [ ] Animations work smoothly
- [ ] Stats counter animates on scroll
- [ ] CTAs link to correct destinations
- [ ] Mobile menu works

**Events:**
- [ ] Event listing shows all events
- [ ] Filter by status works
- [ ] Event detail page renders MDX
- [ ] YouTube embeds work
- [ ] Gallery displays correctly

**i18n:**
- [ ] Language toggle switches content
- [ ] RTL layout works for Arabic
- [ ] All text is translated
- [ ] URLs update with locale

**Performance:**
- [ ] Lighthouse score 90+
- [ ] No layout shifts
- [ ] Images lazy load
- [ ] Fonts load correctly

---

## 11. Maintenance Guide

### 11.1 Adding New Content

**New Event:**
1. Create file: `content/events/YYYY-MM-DD-event-name.mdx`
2. Add frontmatter with required fields
3. Write event content in MDX
4. Add images to `public/images/events/`
5. Commit and push to trigger deployment

**New Blog Post:**
1. Create file: `content/blog/post-name.mdx`
2. Add frontmatter
3. Write content
4. Push to deploy

### 11.2 Updating Team Information

1. Edit `data/team.json`
2. Add team member photos to `public/images/team/`
3. Push to deploy

### 11.3 Common Troubleshooting

| Issue | Solution |
|-------|----------|
| Build fails | Check MDX frontmatter validation |
| Images not showing | Verify path in public folder |
| Styles not applying | Clear Tailwind cache, rebuild |
| i18n not working | Check middleware configuration |

---

**Document End**

*Last Updated: November 30, 2025*
