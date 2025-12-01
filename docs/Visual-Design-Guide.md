# MPC Platform - Visual Design Guide

## مجتمع مبرمجي موريتانيا - دليل التصميم المرئي

**Version:** 1.0  
**Date:** November 30, 2025

---

## 1. Brand Identity

### 1.1 Logo

The MPC logo features:
- Mauritanian national emblem (star and crescent)
- Code brackets `< >` symbolizing programming
- Circuit board patterns representing technology
- Green and gold colors from the Mauritanian flag

**Logo Usage:**
- Primary: Full logo with text
- Secondary: Icon only (for favicons, app icons)
- Dark backgrounds: Use light version
- Light backgrounds: Use dark version

### 1.2 Tagline

**English:** "Building Mauritania's Tech Future Together"
**Arabic:** "نبني مستقبل موريتانيا التقني معًا"

---

## 2. Color System

### 2.1 Primary Colors

```css
/* Brand Colors */
--mpc-green-50: #E8F5E9;
--mpc-green-100: #C8E6C9;
--mpc-green-200: #A5D6A7;
--mpc-green-300: #81C784;
--mpc-green-400: #66BB6A;
--mpc-green-500: #4CAF50;   /* Primary */
--mpc-green-600: #43A047;
--mpc-green-700: #388E3C;
--mpc-green-800: #2E7D32;
--mpc-green-900: #1B5E20;   /* Dark variant */

/* Gold Accent */
--mpc-gold-400: #FFD54F;
--mpc-gold-500: #FFC107;    /* Accent */
--mpc-gold-600: #FFB300;
```

### 2.2 Neutral Colors (Dark Theme)

```css
/* Background */
--background: #0A0A0A;       /* Near black */
--background-secondary: #141414;
--background-tertiary: #1F1F1F;

/* Borders */
--border: #262626;
--border-hover: #404040;

/* Text */
--foreground: #FAFAFA;       /* Primary text */
--foreground-muted: #A1A1AA; /* Secondary text */
--foreground-subtle: #71717A; /* Tertiary text */
```

### 2.3 Semantic Colors

```css
/* Status */
--success: #22C55E;   /* Event completed */
--warning: #F59E0B;   /* Upcoming event */
--error: #EF4444;     /* Cancelled */
--info: #3B82F6;      /* Information */
```

### 2.4 Gradient Definitions

```css
/* Hero gradient */
--gradient-hero: linear-gradient(
  135deg,
  rgba(27, 94, 32, 0.3) 0%,
  rgba(255, 193, 7, 0.2) 50%,
  rgba(27, 94, 32, 0.3) 100%
);

/* Button gradient */
--gradient-button: linear-gradient(
  135deg,
  #4CAF50 0%,
  #2E7D32 100%
);

/* Card glow */
--gradient-glow: radial-gradient(
  circle at center,
  rgba(76, 175, 80, 0.15) 0%,
  transparent 70%
);
```

---

## 3. Typography

### 3.1 Font Families

```css
/* English text */
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Arabic text */
--font-arabic: 'Cairo', 'Noto Sans Arabic', sans-serif;

/* Code */
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

### 3.2 Type Scale

| Name | Size | Weight | Line Height | Use Case |
|------|------|--------|-------------|----------|
| Display | 72px (4.5rem) | 700 | 1.1 | Hero title |
| H1 | 48px (3rem) | 700 | 1.2 | Page titles |
| H2 | 36px (2.25rem) | 600 | 1.25 | Section titles |
| H3 | 24px (1.5rem) | 600 | 1.3 | Card titles |
| H4 | 20px (1.25rem) | 600 | 1.4 | Subsections |
| Body Large | 18px (1.125rem) | 400 | 1.6 | Lead text |
| Body | 16px (1rem) | 400 | 1.6 | Default text |
| Body Small | 14px (0.875rem) | 400 | 1.5 | Captions |
| Caption | 12px (0.75rem) | 500 | 1.4 | Labels |

### 3.3 Typography Examples

```jsx
// Hero Title
<h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
  <span className="font-arabic">مبرمجي موريتانيا</span>
</h1>

// Section Title
<h2 className="text-3xl md:text-4xl font-semibold">
  Upcoming Events
</h2>

// Body Text
<p className="text-base md:text-lg text-foreground-muted leading-relaxed">
  Join our community of passionate developers...
</p>
```

---

## 4. Spacing System

### 4.1 Base Unit

Base unit: **4px**

### 4.2 Spacing Scale

| Token | Value | Use Case |
|-------|-------|----------|
| space-1 | 4px | Tight spacing |
| space-2 | 8px | Component padding |
| space-3 | 12px | Small gaps |
| space-4 | 16px | Default gap |
| space-6 | 24px | Section padding |
| space-8 | 32px | Large gaps |
| space-12 | 48px | Section margins |
| space-16 | 64px | Page sections |
| space-24 | 96px | Hero padding |
| space-32 | 128px | Large sections |

### 4.3 Component Spacing

```jsx
// Card
<Card className="p-6 space-y-4">
  <CardTitle className="mb-2">...</CardTitle>
  <CardContent className="space-y-2">...</CardContent>
</Card>

// Section
<section className="py-16 md:py-24 px-4 md:px-8">
  <div className="max-w-7xl mx-auto space-y-12">
    ...
  </div>
</section>
```

---

## 5. Component Design

### 5.1 Buttons

**Primary Button:**
```jsx
<Button className="
  bg-gradient-to-r from-green-500 to-green-600
  hover:from-green-600 hover:to-green-700
  text-white font-semibold
  px-6 py-3 rounded-lg
  shadow-lg shadow-green-500/25
  transition-all duration-200
  hover:shadow-xl hover:shadow-green-500/30
  hover:-translate-y-0.5
">
  Join Community
</Button>
```

**Secondary Button:**
```jsx
<Button variant="outline" className="
  border-gray-700 text-gray-300
  hover:bg-gray-800 hover:text-white
  px-6 py-3 rounded-lg
  transition-all duration-200
">
  Learn More
</Button>
```

**Ghost Button:**
```jsx
<Button variant="ghost" className="
  text-gray-400 hover:text-white
  hover:bg-white/5
  px-4 py-2 rounded-md
">
  View All →
</Button>
```

### 5.2 Cards

**Event Card:**
```jsx
<CardContainer>
  <CardBody className="
    bg-gray-950/50
    backdrop-blur-sm
    border border-white/10
    rounded-2xl
    p-6
    hover:border-green-500/30
    transition-colors duration-300
  ">
    {/* 3D Transform effect from Aceternity */}
    <CardItem translateZ={50}>
      <img src={coverImage} className="rounded-lg" />
    </CardItem>
    <CardItem translateZ={40} className="mt-4">
      <h3 className="text-xl font-bold">{title}</h3>
    </CardItem>
  </CardBody>
</CardContainer>
```

**Feature Card:**
```jsx
<div className="
  group
  bg-gradient-to-b from-gray-900 to-gray-950
  border border-gray-800
  rounded-xl
  p-6
  hover:border-green-500/50
  hover:shadow-lg hover:shadow-green-500/10
  transition-all duration-300
">
  <div className="
    w-12 h-12
    bg-green-500/10
    rounded-lg
    flex items-center justify-center
    mb-4
    group-hover:bg-green-500/20
    transition-colors
  ">
    <Icon className="w-6 h-6 text-green-500" />
  </div>
  <h3 className="text-lg font-semibold mb-2">Feature Title</h3>
  <p className="text-gray-400">Description text...</p>
</div>
```

### 5.3 Navigation

**Desktop Nav:**
```jsx
<nav className="
  fixed top-4 left-1/2 -translate-x-1/2
  z-50
  bg-gray-950/80
  backdrop-blur-xl
  border border-white/10
  rounded-full
  px-6 py-3
  flex items-center gap-6
">
  <Logo />
  <NavLinks />
  <CTAButton />
</nav>
```

**Mobile Nav:**
```jsx
<Sheet>
  <SheetTrigger className="md:hidden">
    <Menu className="w-6 h-6" />
  </SheetTrigger>
  <SheetContent className="bg-gray-950 border-gray-800">
    <nav className="flex flex-col gap-4 mt-8">
      {links.map(link => (
        <Link key={link.href} href={link.href} className="
          text-lg font-medium
          text-gray-300 hover:text-white
          py-2
        ">
          {link.label}
        </Link>
      ))}
    </nav>
  </SheetContent>
</Sheet>
```

### 5.4 Badges

```jsx
// Status badges
<Badge className="bg-green-500/20 text-green-400 border-green-500/30">
  Upcoming
</Badge>

<Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">
  Completed
</Badge>

<Badge className="bg-red-500/20 text-red-400 border-red-500/30">
  Cancelled
</Badge>

// Category badges
<Badge variant="outline" className="border-gray-700 text-gray-400">
  Workshop
</Badge>
```

---

## 6. Animation Guidelines

### 6.1 Timing Functions

```css
/* Smooth ease for most animations */
--ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);

/* Bounce for playful interactions */
--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);

/* Quick snap for micro-interactions */
--ease-snap: cubic-bezier(0.25, 0.1, 0.25, 1);
```

### 6.2 Duration Guidelines

| Interaction | Duration | Use Case |
|-------------|----------|----------|
| Micro | 100-150ms | Hover states, toggles |
| Short | 200-250ms | Button clicks, card hovers |
| Medium | 300-400ms | Page transitions, modals |
| Long | 500-700ms | Complex animations |
| Entrance | 600-800ms | Hero text, page load |

### 6.3 Animation Examples

**Fade Up Entrance:**
```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
>
  Content
</motion.div>
```

**Stagger Children:**
```jsx
<motion.div
  initial="hidden"
  animate="visible"
  variants={{
    visible: {
      transition: { staggerChildren: 0.1 }
    }
  }}
>
  {items.map(item => (
    <motion.div
      key={item.id}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
    >
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

**Hover Lift:**
```jsx
<motion.div
  whileHover={{ y: -4, scale: 1.02 }}
  transition={{ duration: 0.2 }}
>
  Card content
</motion.div>
```

---

## 7. Page Layouts

### 7.1 Landing Page Structure

```
┌─────────────────────────────────────────────────────────┐
│                    FLOATING NAV                          │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                                                          │
│                    HERO SECTION                          │
│              (Aurora + Spotlight + Text)                 │
│                    100vh height                          │
│                                                          │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                    STATS SECTION                         │
│              [600+]  [3]  [1]  [∞]                      │
│             Members Events Year Potential               │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                  FEATURES SECTION                        │
│                                                          │
│   ┌─────────┐  ┌─────────┐  ┌─────────┐               │
│   │ Web Dev │  │Security │  │  AI/ML  │               │
│   └─────────┘  └─────────┘  └─────────┘               │
│   ┌───────────────┐  ┌───────────────┐                │
│   │   Workshops   │  │   Resources   │                │
│   └───────────────┘  └───────────────┘                │
│                                                          │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                  EVENTS SECTION                          │
│                                                          │
│        ┌──────────┐        ┌──────────┐                │
│        │  Event   │        │  Event   │                │
│        │  Card 1  │        │  Card 2  │                │
│        └──────────┘        └──────────┘                │
│                                                          │
│                  [View All Events →]                    │
│                                                          │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                   TEAM SECTION                           │
│                                                          │
│   [Deidin]  [Ahmed]  [Aziz]  [Mohamed]                 │
│                                                          │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                    CTA SECTION                           │
│           "Ready to Level Up Your Skills?"              │
│              [Join WhatsApp Group]                       │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                      FOOTER                              │
│  Logo    Links          Social         © 2024-2025     │
└─────────────────────────────────────────────────────────┘
```

### 7.2 Events Page Layout

```
┌─────────────────────────────────────────────────────────┐
│                    PAGE HEADER                           │
│                "Community Events"                        │
│                "الفعاليات المجتمعية"                     │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                   FILTER BAR                             │
│  [All] [Upcoming] [Past]  |  [Workshop] [Meetup] [All] │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                   EVENT GRID                             │
│                                                          │
│   ┌──────────┐  ┌──────────┐  ┌──────────┐            │
│   │  Event   │  │  Event   │  │  Event   │            │
│   │  Card    │  │  Card    │  │  Card    │            │
│   └──────────┘  └──────────┘  └──────────┘            │
│                                                          │
│   ┌──────────┐  ┌──────────┐  ┌──────────┐            │
│   │  Event   │  │  Event   │  │  Event   │            │
│   │  Card    │  │  Card    │  │  Card    │            │
│   └──────────┘  └──────────┘  └──────────┘            │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### 7.3 Event Detail Layout

```
┌─────────────────────────────────────────────────────────┐
│                    COVER IMAGE                           │
│                  (Full width, 40vh)                      │
│                                                          │
│   ┌─────────────────────────────────────────────────┐  │
│   │                                                   │  │
│   │                   Event Image                    │  │
│   │                                                   │  │
│   └─────────────────────────────────────────────────┘  │
│                                                          │
│         ┌────────────────────────────────┐              │
│         │ [Status Badge] [Type Badge]    │              │
│         │                                │              │
│         │     Event Title                │              │
│         │                                │              │
│         │ 📅 Date  |  🎤 Speaker Name   │              │
│         │                                │              │
│         │ [Join/Watch Recording]         │              │
│         └────────────────────────────────┘              │
│                                                          │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                   CONTENT AREA                           │
│                                                          │
│   ┌─────────────────┐  ┌─────────────────────────────┐ │
│   │                 │  │                              │ │
│   │  SPEAKER        │  │     MDX CONTENT             │ │
│   │  CARD           │  │                              │ │
│   │                 │  │     ## About                 │ │
│   │  [Photo]        │  │     Event description...     │ │
│   │  Name           │  │                              │ │
│   │  Role           │  │     ## What We Covered       │ │
│   │  [LinkedIn]     │  │     - Topic 1                │ │
│   │                 │  │     - Topic 2                │ │
│   │                 │  │                              │ │
│   │                 │  │     [YouTube Embed]          │ │
│   │                 │  │                              │ │
│   │                 │  │     ## Gallery               │ │
│   │                 │  │     [Image Grid]             │ │
│   │                 │  │                              │ │
│   └─────────────────┘  └─────────────────────────────┘ │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## 8. Responsive Breakpoints

### 8.1 Breakpoint System

| Name | Width | Tailwind |
|------|-------|----------|
| Mobile | < 640px | Default |
| Tablet | ≥ 640px | `sm:` |
| Small Laptop | ≥ 768px | `md:` |
| Desktop | ≥ 1024px | `lg:` |
| Large Desktop | ≥ 1280px | `xl:` |
| Ultra Wide | ≥ 1536px | `2xl:` |

### 8.2 Responsive Patterns

**Typography:**
```jsx
<h1 className="
  text-4xl          // Mobile
  sm:text-5xl       // Tablet
  md:text-6xl       // Small Laptop
  lg:text-7xl       // Desktop
">
  Title
</h1>
```

**Grid:**
```jsx
<div className="
  grid
  grid-cols-1       // Mobile: single column
  sm:grid-cols-2    // Tablet: 2 columns
  lg:grid-cols-3    // Desktop: 3 columns
  gap-6
">
  {items}
</div>
```

**Container:**
```jsx
<div className="
  max-w-7xl
  mx-auto
  px-4          // Mobile: 16px padding
  sm:px-6       // Tablet: 24px padding
  lg:px-8       // Desktop: 32px padding
">
  Content
</div>
```

---

## 9. Accessibility Guidelines

### 9.1 Color Contrast

- Text on dark background: Minimum 4.5:1 ratio
- Large text (18px+): Minimum 3:1 ratio
- Interactive elements: Minimum 3:1 ratio

### 9.2 Focus States

```jsx
<Button className="
  focus:outline-none
  focus:ring-2
  focus:ring-green-500
  focus:ring-offset-2
  focus:ring-offset-gray-950
">
  Button
</Button>
```

### 9.3 ARIA Labels

```jsx
// Language toggle
<button
  aria-label={locale === 'en' ? 'Switch to Arabic' : 'التبديل إلى الإنجليزية'}
  aria-pressed={locale === 'ar'}
>
  {locale === 'en' ? 'عربي' : 'EN'}
</button>

// Navigation
<nav aria-label="Main navigation">
  ...
</nav>

// Event card
<article aria-labelledby={`event-${event.slug}`}>
  <h3 id={`event-${event.slug}`}>{event.title}</h3>
</article>
```

### 9.4 Reduced Motion

```jsx
// Check user preference
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

// Conditional animation
<motion.div
  initial={prefersReducedMotion ? false : { opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5 }}
>
  Content
</motion.div>
```

---

## 10. Asset Specifications

### 10.1 Image Sizes

| Asset | Dimensions | Format | Use |
|-------|------------|--------|-----|
| Event Cover | 1200 × 630 | WebP/JPG | Event cards, OG image |
| Team Photo | 400 × 400 | WebP/JPG | Team section |
| Blog Cover | 1200 × 630 | WebP/JPG | Blog posts |
| Logo (Full) | 200 × 60 | SVG | Navigation |
| Logo (Icon) | 64 × 64 | SVG/PNG | Favicon |
| OG Image | 1200 × 630 | PNG | Social sharing |

### 10.2 Favicon Set

```html
<link rel="icon" href="/favicon.ico" sizes="32x32" />
<link rel="icon" href="/icon.svg" type="image/svg+xml" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
<link rel="manifest" href="/manifest.webmanifest" />
```

---

**Document End**

*Last Updated: November 30, 2025*
