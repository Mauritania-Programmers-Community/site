# MPC Community Platform - Technical Plan
## مجتمع مبرمجي موريتانيا - الخطة التقنية

**Version**: 2.0 (Updated with Community Research)  
**Date**: November 2025  
**Stack**: Next.js 16 + TypeScript + MDX + shadcn/ui

---

## Executive Summary

This document outlines a **practical, cost-effective** approach to building the Mauritania Programmers Community platform. The recommendation prioritizes:

- **$0/month hosting** on Vercel free tier
- **MDX-based content** managed by developers (no CMS overhead)
- **Futuristic design** using Aceternity UI + Magic UI + shadcn/ui
- **Scalable architecture** that can add a CMS later if needed

---

## What Other Developer Communities Actually Use

Based on research, here's what successful developer communities use:

### Major Open Source Community Platforms

| Platform | Stack | Cost | Best For |
|----------|-------|------|----------|
| **DEV.to (Forem)** | Preact, PostgreSQL, Heroku | Self-hosted free | Large communities with user accounts |
| **Discourse** | Ember.js, Ruby on Rails, PostgreSQL | Self-hosted free / $100+/mo hosted | Discussion forums |
| **VuePress** | Vue.js, Markdown | $0 (static) | Documentation sites |
| **Nextra** | Next.js, MDX | $0 (static) | Docs + blogs |
| **Astro** | Any framework, MDX | $0 (static) | Landing pages, blogs |

### What Most Small Communities Use (Similar to MPC)

Most developer communities your size use:
1. **Static site + MDX** — Simple, version-controlled, $0/month
2. **WhatsApp/Discord** — Community chat (you already have this!)
3. **GitHub** — Code hosting and collaboration
4. **Google Meet/Zoom** — Events (you already use this!)

**The pattern is clear**: Small developer communities don't need complex platforms. They use simple, static websites paired with chat tools.

---

## Part 1: Why NOT Payload CMS (For Now)

### Your Current Reality

| Factor | Current State | CMS Requirement |
|--------|---------------|-----------------|
| Team size | 3 active admins | Not needed until 5+ |
| Content frequency | 1-2 events/month | MDX is sufficient |
| Non-technical editors | None currently | CMS main benefit |
| Budget | Community project | $0 is ideal |
| Content complexity | Simple posts/events | MDX handles this |

### When to Add a CMS Later

You should migrate to Payload CMS when:
- [ ] You have 5+ people regularly adding content
- [ ] Non-technical members need to publish content
- [ ] You're running 10+ events per month
- [ ] You need user authentication/registration
- [ ] You have budget for $20-35/month hosting

**My recommendation**: Start with MDX, add Payload CMS in 6-12 months if needed.

---

## Part 2: Technology Stack

### Core Stack

```
Framework:        Next.js 16 (latest - released October 2025)
Language:         TypeScript (strict mode)
Styling:          Tailwind CSS v4
UI Components:    shadcn/ui (base components)
Animations:       Aceternity UI + Magic UI
Content:          MDX with Contentlayer/Velite
Hosting:          Vercel (free tier)
Domain:           Your existing domain
```

### Why Next.js 16?

Next.js 16 was released October 2025 with major improvements:

1. **Turbopack is now DEFAULT** - 5-10x faster Fast Refresh, 2-5x faster builds
2. **Cache Components** - Better caching with `use cache` directive
3. **React 19.2** - View Transitions, useEffectEvent, Activity API
4. **Build Adapters API** - Easier self-hosting on any platform

```bash
# Create new project
npx create-next-app@latest mpc-platform --typescript --tailwind --app
```

---

## Part 3: Project Architecture

### Folder Structure

```
mpc-platform/
├── app/                          # Next.js 16 App Router
│   ├── (marketing)/              # Public pages group
│   │   ├── page.tsx              # Landing page (homepage)
│   │   ├── about/page.tsx        # About the community
│   │   └── team/page.tsx         # Team members
│   ├── events/
│   │   ├── page.tsx              # Events listing
│   │   └── [slug]/page.tsx       # Event detail
│   ├── blog/
│   │   ├── page.tsx              # Blog listing
│   │   └── [slug]/page.tsx       # Blog post
│   ├── layout.tsx                # Root layout
│   ├── globals.css               # Global styles
│   └── template.tsx              # Page transitions
│
├── components/
│   ├── ui/                       # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── ...
│   ├── aceternity/               # Aceternity UI components
│   │   ├── aurora-background.tsx
│   │   ├── spotlight.tsx
│   │   ├── 3d-card.tsx
│   │   ├── text-generate-effect.tsx
│   │   └── focus-cards.tsx
│   ├── magicui/                  # Magic UI components
│   │   ├── marquee.tsx
│   │   ├── number-ticker.tsx
│   │   ├── particles.tsx
│   │   └── dock.tsx
│   ├── sections/                 # Page sections
│   │   ├── hero.tsx
│   │   ├── stats.tsx
│   │   ├── features.tsx
│   │   ├── events-preview.tsx
│   │   ├── team-showcase.tsx
│   │   └── footer.tsx
│   └── layout/
│       ├── navbar.tsx
│       └── mobile-nav.tsx
│
├── content/                      # MDX Content (THE SIMPLE CMS)
│   ├── events/
│   │   ├── 2024-09-21-community-launch.mdx
│   │   ├── 2024-10-26-github-demo.mdx
│   │   ├── 2024-11-02-tier-list.mdx
│   │   └── 2025-01-15-cybersecurity-night.mdx
│   ├── blog/
│   │   ├── welcome-to-mpc.mdx
│   │   └── one-year-anniversary.mdx
│   └── pages/
│       └── about.mdx
│
├── data/                         # JSON data files
│   ├── team.json                 # Team members
│   ├── stats.json                # Community statistics
│   └── sponsors.json             # If any sponsors
│
├── lib/
│   ├── mdx.ts                    # MDX utilities
│   ├── utils.ts                  # General utilities
│   └── fonts.ts                  # Font configuration
│
├── public/
│   ├── images/
│   │   ├── team/                 # Team member photos
│   │   ├── events/               # Event images
│   │   └── logos/                # MPC logos
│   └── videos/                   # Event recordings (or embed YouTube)
│
├── styles/
│   └── mdx.css                   # MDX-specific styles
│
├── next.config.ts
├── tailwind.config.ts
├── contentlayer.config.ts        # OR velite.config.ts
└── package.json
```

---

## Part 4: Content Management with MDX

### Why MDX?

- **Version controlled** - All content in Git, full history
- **Developer-friendly** - Your team ARE developers
- **Zero cost** - No CMS subscription
- **Type-safe** - Frontmatter validated with Zod
- **Custom components** - Embed React components in markdown

### Content Layer Options

**Option A: Velite (Recommended for Next.js 16)**
```bash
npm install velite
```

**Option B: Contentlayer (Popular but slower updates)**
```bash
npm install contentlayer next-contentlayer
```

**Option C: @next/mdx (Simple, built-in)**
```bash
npm install @next/mdx @mdx-js/loader @mdx-js/react
```

### Event MDX Schema

```typescript
// velite.config.ts
import { defineConfig, s } from 'velite'

export default defineConfig({
  collections: {
    events: {
      name: 'Event',
      pattern: 'events/**/*.mdx',
      schema: s.object({
        title: s.string(),
        titleAr: s.string().optional(),
        slug: s.slug('events'),
        date: s.isodate(),
        endDate: s.isodate().optional(),
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
        meetLink: s.string().optional(),
        youtubeRecording: s.string().optional(),
        gallery: s.array(s.image()).optional(),
        content: s.mdx(),
      }),
    },
    
    posts: {
      name: 'Post',
      pattern: 'blog/**/*.mdx',
      schema: s.object({
        title: s.string(),
        titleAr: s.string().optional(),
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
})
```

### Example Event MDX File

```mdx
---
title: "GitHub Organization Demo"
titleAr: "عرض تنظيم GitHub"
slug: "github-organization-demo"
date: 2024-10-26
status: completed
type: workshop
description: "A live demo on how to start contributing to open-source projects on GitHub."
coverImage: /images/events/github-demo-cover.png
speaker:
  name: Ahmed Abdat
  role: GitHub Organization Manager
  image: /images/team/ahmed.jpg
platform: google_meet
meetLink: https://meet.google.com/xxx-xxxx-xxx
youtubeRecording: https://youtube.com/watch?v=xxxxx
gallery:
  - /images/events/github-demo-1.png
  - /images/events/github-demo-2.png
---

## About This Event

Join Ahmed Abdat, our GitHub Organization Manager, as he walks through 
the process of contributing to open-source projects.

<Callout type="info">
This session is perfect for beginners who want to start their open-source journey!
</Callout>

## What We Covered

1. Setting up your GitHub profile
2. Finding beginner-friendly projects
3. Making your first pull request
4. Understanding Git workflow

<YouTube id="xxxxx" />

## Resources

- [GitHub's Open Source Guide](https://opensource.guide)
- [First Contributions Repo](https://github.com/firstcontributions/first-contributions)

## Gallery

<EventGallery images={gallery} />
```

### Team Data (JSON)

```json
// data/team.json
{
  "founders": [
    {
      "id": "deidin",
      "name": "Deidin",
      "nameAr": "ديدين",
      "role": "Founder & Advisor",
      "roleAr": "المؤسس والمستشار",
      "bio": "The visionary behind MPC. Started the community on September 21, 2024.",
      "image": "/images/team/deidin.jpg",
      "links": {
        "github": "https://github.com/deidin",
        "linkedin": "https://linkedin.com/in/deidin"
      }
    }
  ],
  "admins": [
    {
      "id": "ahmed-abdat",
      "name": "Ahmed Abdat",
      "nameAr": "أحمد عبدات",
      "role": "AI & Web Development Lead",
      "roleAr": "مشرف الذكاء الاصطناعي والتطوير",
      "bio": "Full-stack developer (Next.js), AI enthusiast, known as Claude AI's friend.",
      "image": "/images/team/ahmed.jpg",
      "skills": ["Next.js", "TypeScript", "AI", "Cybersecurity"],
      "links": {
        "github": "https://github.com/ahmedabdat",
        "linkedin": "https://linkedin.com/in/ahmedabdat"
      }
    },
    {
      "id": "aziz",
      "name": "Aziz",
      "nameAr": "عزيز",
      "role": "Cybersecurity Lead",
      "roleAr": "المشرف التقني",
      "bio": "Member of Deyloul cybersecurity team, Arch Linux enthusiast.",
      "image": "/images/team/aziz.jpg",
      "skills": ["Cybersecurity", "Linux", "Ethical Hacking"],
      "links": {
        "github": "https://github.com/aziz"
      }
    },
    {
      "id": "mohamed-salem",
      "name": "Mohamed Salem",
      "nameAr": "محمد سالم",
      "role": "General Supervisor",
      "roleAr": "المشرف العام",
      "bio": "Developer and community organizer, manages activities and coordination.",
      "image": "/images/team/mohamed-salem.jpg",
      "links": {
        "github": "https://github.com/mohamedsalem"
      }
    }
  ],
  "stats": {
    "members": 600,
    "events": 3,
    "yearFounded": 2024
  }
}
```

---

## Part 5: Design System & Components

### Color Palette (Based on Your Existing Brand)

```css
/* globals.css */
@import "tailwindcss";

@theme {
  /* MPC Brand Colors - derived from your logo */
  --color-mpc-green: oklch(0.45 0.15 145);      /* Primary green */
  --color-mpc-gold: oklch(0.75 0.12 85);        /* Gold accent */
  --color-mpc-red: oklch(0.55 0.18 25);         /* Red from flag */
  
  /* Dark theme (recommended default for dev community) */
  --color-background: oklch(0.08 0.01 250);     /* Near black */
  --color-foreground: oklch(0.98 0 0);          /* Off-white */
  --color-muted: oklch(0.25 0.01 250);          /* Muted backgrounds */
  --color-border: oklch(0.20 0.01 250);         /* Subtle borders */
  
  /* Gradients */
  --gradient-hero: linear-gradient(135deg, var(--color-mpc-green), var(--color-mpc-gold));
  --gradient-glass: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
}
```

### Component Library Setup

```bash
# 1. Initialize shadcn/ui
npx shadcn@latest init

# 2. Add base components
npx shadcn@latest add button card badge separator avatar

# 3. Copy Aceternity components manually from:
#    https://ui.aceternity.com/components
#    - aurora-background
#    - spotlight  
#    - text-generate-effect
#    - 3d-card
#    - focus-cards
#    - background-beams

# 4. Copy Magic UI components from:
#    https://magicui.design/docs/components
#    - marquee
#    - number-ticker
#    - particles
#    - animated-beam
```

### Landing Page Sections Blueprint

```
┌─────────────────────────────────────────────────────────────┐
│ NAVBAR                                                       │
│ [Logo]    Home  Events  Blog  Team  [Join WhatsApp] [🌙/☀️]│
├─────────────────────────────────────────────────────────────┤
│                                                              │
│ HERO SECTION (Aurora Background + Spotlight)                 │
│                                                              │
│           <مبرمجي موريتانيا>                                │
│                                                              │
│     Building Mauritania's Tech Future Together               │
│                                                              │
│     [Join Community]        [View Events]                    │
│                                                              │
│     ⬇️ Scroll indicator                                      │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│ STATS SECTION (Number Ticker animation)                      │
│                                                              │
│   [600+]         [3]           [1]            [∞]           │
│   Members     Events       Year Old        Potential        │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│ WHAT WE DO (Bento Grid / Feature Cards)                     │
│                                                              │
│   ┌──────────┐  ┌──────────┐  ┌──────────┐                 │
│   │ 💻       │  │ 🔒       │  │ 🤖       │                 │
│   │ Web Dev  │  │ Security │  │ AI/ML    │                 │
│   └──────────┘  └──────────┘  └──────────┘                 │
│   ┌──────────────────┐  ┌──────────────────┐               │
│   │ 🎯 Workshops    │  │ 💼 Job Board     │               │
│   └──────────────────┘  └──────────────────┘               │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│ UPCOMING EVENTS (3D Card Effect)                            │
│                                                              │
│   ┌────────────────┐    ┌────────────────┐                  │
│   │  🎤            │    │  Coming Soon   │                  │
│   │  Next Event    │    │                │                  │
│   │  Jan 15, 2025  │    │  Stay tuned!   │                  │
│   │  [Register]    │    │                │                  │
│   └────────────────┘    └────────────────┘                  │
│                                                              │
│                    [View All Events →]                       │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│ PAST EVENTS MARQUEE (Infinite scroll)                       │
│                                                              │
│ ← GitHub Demo | Tier List | Cyber Night | GitHub Demo | →   │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│ TEAM SECTION (Focus Cards)                                  │
│                                                              │
│     The People Behind MPC                                    │
│                                                              │
│   [Deidin]    [Ahmed]    [Aziz]    [Mohamed]                │
│   Founder     AI Lead    Security   Supervisor              │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│ JOIN CTA (Gradient background)                              │
│                                                              │
│     Ready to Level Up Your Skills?                          │
│                                                              │
│     [Join WhatsApp Group]                                   │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│ FOOTER                                                       │
│                                                              │
│ [Logo]                   Links              Social          │
│ مبرمجي موريتانيا        Home               [FB] [LI] [GH]  │
│                          Events             [WA]            │
│ © 2024-2025              Blog                               │
│                          Team                               │
└─────────────────────────────────────────────────────────────┘
```

---

## Part 6: Key Component Examples

### Hero Section

```tsx
// components/sections/hero.tsx
'use client'

import { AuroraBackground } from '@/components/aceternity/aurora-background'
import { Spotlight } from '@/components/aceternity/spotlight'
import { TextGenerateEffect } from '@/components/aceternity/text-generate-effect'
import { Button } from '@/components/ui/button'
import { ArrowRight, Users } from 'lucide-react'
import Link from 'next/link'

export function Hero() {
  return (
    <AuroraBackground className="relative min-h-screen flex items-center justify-center">
      <Spotlight 
        className="-top-40 left-0 md:left-60" 
        fill="rgba(34, 197, 94, 0.3)" // MPC green
      />
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Arabic Logo Text */}
        <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent font-arabic">
          &lt;مبرمجي&gt;
        </h1>
        <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent font-arabic">
          &lt;موريتانيا/&gt;
        </h2>
        
        {/* Tagline with typing effect */}
        <TextGenerateEffect 
          words="Building Mauritania's Tech Future Together"
          className="text-xl md:text-2xl text-gray-300 mb-8"
        />
        
        {/* Stats inline */}
        <p className="text-lg text-gray-400 mb-8">
          Join <span className="text-green-400 font-bold">600+</span> developers 
          sharing knowledge, opportunities, and memes 🚀
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
            asChild
          >
            <Link href="https://chat.whatsapp.com/YOUR_LINK">
              <Users className="mr-2 h-5 w-5" />
              Join WhatsApp Group
            </Link>
          </Button>
          
          <Button 
            size="lg" 
            variant="outline" 
            className="border-gray-700 hover:bg-gray-800"
            asChild
          >
            <Link href="/events">
              View Events
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-scroll" />
        </div>
      </div>
    </AuroraBackground>
  )
}
```

### Stats Section with Number Ticker

```tsx
// components/sections/stats.tsx
'use client'

import { NumberTicker } from '@/components/magicui/number-ticker'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const stats = [
  { value: 600, label: 'Members', suffix: '+' },
  { value: 3, label: 'Events Hosted', suffix: '' },
  { value: 1, label: 'Year Strong', suffix: '' },
  { value: 100, label: 'Ideas Shared', suffix: '+' },
]

export function Stats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  
  return (
    <section ref={ref} className="py-20 bg-black/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                {isInView ? (
                  <>
                    <NumberTicker value={stat.value} />
                    {stat.suffix}
                  </>
                ) : (
                  '0'
                )}
              </div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

### Event Card with 3D Effect

```tsx
// components/event-card.tsx
'use client'

import { CardContainer, CardBody, CardItem } from '@/components/aceternity/3d-card'
import { Badge } from '@/components/ui/badge'
import { Calendar, MapPin, Video } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import type { Event } from '@/.velite'

interface EventCardProps {
  event: Event
}

export function EventCard({ event }: EventCardProps) {
  const statusColors = {
    upcoming: 'bg-green-500',
    completed: 'bg-gray-500',
    cancelled: 'bg-red-500',
  }
  
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-950 relative group/card border-white/[0.1] w-full h-auto rounded-xl p-6 border">
        {/* Cover Image */}
        <CardItem translateZ={50} className="w-full">
          <Image
            src={event.coverImage}
            alt={event.title}
            width={400}
            height={200}
            className="h-48 w-full object-cover rounded-lg group-hover/card:shadow-xl"
          />
        </CardItem>
        
        {/* Status Badge */}
        <CardItem translateZ={60} className="absolute top-8 right-8">
          <Badge className={statusColors[event.status]}>
            {event.status}
          </Badge>
        </CardItem>
        
        {/* Title */}
        <CardItem translateZ={40} className="mt-4">
          <h3 className="text-xl font-bold text-white">{event.title}</h3>
        </CardItem>
        
        {/* Date & Platform */}
        <CardItem translateZ={30} className="mt-2 flex items-center gap-4 text-gray-400 text-sm">
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {new Date(event.date).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric',
              year: 'numeric'
            })}
          </span>
          <span className="flex items-center gap-1">
            <Video className="h-4 w-4" />
            {event.platform.replace('_', ' ')}
          </span>
        </CardItem>
        
        {/* Description */}
        <CardItem translateZ={20} className="mt-4 text-gray-300 text-sm line-clamp-2">
          {event.description}
        </CardItem>
        
        {/* Speaker */}
        {event.speaker && (
          <CardItem translateZ={35} className="mt-4 flex items-center gap-2">
            {event.speaker.image && (
              <Image
                src={event.speaker.image}
                alt={event.speaker.name}
                width={32}
                height={32}
                className="rounded-full"
              />
            )}
            <div>
              <p className="text-white text-sm font-medium">{event.speaker.name}</p>
              <p className="text-gray-500 text-xs">{event.speaker.role}</p>
            </div>
          </CardItem>
        )}
        
        {/* View Button */}
        <CardItem translateZ={50} className="mt-6 w-full">
          <Link 
            href={`/events/${event.slug}`}
            className="block w-full py-2 text-center bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-lg text-white font-medium transition-all"
          >
            {event.status === 'upcoming' ? 'Register Now' : 'View Recap'}
          </Link>
        </CardItem>
      </CardBody>
    </CardContainer>
  )
}
```

---

## Part 7: Bilingual Support (Arabic + English)

### Using next-intl

```bash
npm install next-intl
```

```typescript
// middleware.ts
import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  locales: ['en', 'ar'],
  defaultLocale: 'en',
  localeDetection: true,
})

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}
```

```tsx
// app/[locale]/layout.tsx
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { Cairo, Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const cairo = Cairo({ subsets: ['arabic'], variable: '--font-cairo' })

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const messages = await getMessages()
  const isRTL = locale === 'ar'
  
  return (
    <html lang={locale} dir={isRTL ? 'rtl' : 'ltr'}>
      <body className={`${inter.variable} ${cairo.variable} ${isRTL ? 'font-cairo' : 'font-inter'}`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
```

### RTL-Safe Tailwind

```css
/* Use logical properties */
.card {
  /* ❌ Avoid directional */
  /* margin-left: 1rem; */
  
  /* ✅ Use logical */
  margin-inline-start: 1rem;  /* ms-4 in Tailwind */
}
```

```tsx
// Use Tailwind logical utilities
<div className="ms-4 me-2 ps-4 pe-2">
  {/* ms = margin-start, me = margin-end */}
  {/* ps = padding-start, pe = padding-end */}
</div>
```

---

## Part 8: Deployment

### Vercel (Recommended - FREE)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Or connect GitHub repo for automatic deployments
```

**Free tier includes:**
- Unlimited static sites
- 100GB bandwidth/month
- Serverless functions
- Edge functions
- Automatic HTTPS
- Preview deployments

### Environment Variables

```env
# .env.local
NEXT_PUBLIC_SITE_URL=https://mpc.mr
NEXT_PUBLIC_WHATSAPP_LINK=https://chat.whatsapp.com/xxx

# Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXX
```

### Build Configuration

```typescript
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'img.youtube.com' }, // YouTube thumbnails
    ],
  },
  // Enable experimental features
  experimental: {
    typedRoutes: true,
  },
}

export default nextConfig
```

---

## Part 9: Implementation Roadmap

### Phase 1: Foundation (Week 1)
- [ ] Initialize Next.js 16 project
- [ ] Configure Tailwind CSS v4
- [ ] Set up shadcn/ui
- [ ] Create folder structure
- [ ] Configure Velite/Contentlayer for MDX
- [ ] Add first event MDX file

### Phase 2: Core Components (Week 2)
- [ ] Install Aceternity UI components
- [ ] Install Magic UI components
- [ ] Build Hero section
- [ ] Build Stats section
- [ ] Build Navbar with mobile menu

### Phase 3: Content Pages (Week 3)
- [ ] Events listing page
- [ ] Event detail page with MDX
- [ ] Blog listing page
- [ ] Blog post page
- [ ] Team page

### Phase 4: Polish & Launch (Week 4)
- [ ] Add page transitions (Framer Motion)
- [ ] SEO optimization (metadata, JSON-LD)
- [ ] Performance optimization
- [ ] Arabic language support
- [ ] Deploy to Vercel
- [ ] Connect custom domain

---

## Part 10: Future Upgrades

### When to Add Payload CMS

If you reach these milestones:
- 5+ regular content editors
- 10+ events per month
- Need user registration

**Migration path:**
```bash
# Add Payload to existing Next.js project
npx create-payload-app@latest --init-next
```

### Potential Features

| Feature | Complexity | Priority |
|---------|------------|----------|
| Event registration | Medium | High (when needed) |
| Member profiles | High | Medium |
| Job board | Medium | Medium |
| Project showcase | Low | Low |
| Discord integration | Low | Low |

---

## Resources

### Documentation
- [Next.js 16 Docs](https://nextjs.org/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Aceternity UI](https://ui.aceternity.com)
- [Magic UI](https://magicui.design)
- [Velite](https://velite.js.org)

### Inspiration
- [Vercel.com](https://vercel.com) - Clean, animated landing
- [Linear.app](https://linear.app) - Dark theme, glassmorphism
- [Raycast.com](https://raycast.com) - Beautiful gradients

---

**Created for مجتمع مبرمجي موريتانيا (MPC)**  
**November 2025**
