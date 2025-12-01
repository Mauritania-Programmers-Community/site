# MPC Platform - Implementation Plan

## Project Status: 🟡 In Progress

**Last Updated:** November 30, 2025
**Current Phase:** Phase 1 - Foundation
**Project Initialized:** ✅ Next.js 16.0.5 + React 19.2.0 + Tailwind v4

---

## Quick Reference

| Document | Purpose |
|----------|---------|
| `PLAN.md` | This file - Implementation roadmap |
| `PROGRESS.md` | Detailed task tracking |
| `ARCHITECTURE.md` | Architecture decisions |
| `RESEARCH.md` | Technical research & best practices |

---

## Architecture Overview

### Next.js 16 Best Practices Applied

```
mpc-platform/
├── src/
│   ├── app/                      # App Router (Next.js 16)
│   │   ├── [locale]/             # i18n dynamic segment
│   │   │   ├── (marketing)/      # Route group (no URL impact)
│   │   │   │   ├── page.tsx      # Landing page
│   │   │   │   ├── about/
│   │   │   │   └── team/
│   │   │   ├── events/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/
│   │   │   ├── layout.tsx        # Locale layout with providers
│   │   │   └── not-found.tsx
│   │   ├── layout.tsx            # Root layout (minimal)
│   │   ├── globals.css
│   │   └── manifest.ts           # Web manifest
│   │
│   ├── components/
│   │   ├── ui/                   # shadcn/ui (atomic)
│   │   ├── common/               # Shared components
│   │   ├── sections/             # Page sections (organisms)
│   │   ├── layout/               # Layout components
│   │   └── mdx/                  # MDX custom components
│   │
│   ├── lib/                      # Utilities & configs
│   │   ├── utils.ts              # cn() and helpers
│   │   ├── fonts.ts              # Font configuration
│   │   └── constants.ts          # App constants
│   │
│   ├── hooks/                    # Custom React hooks
│   │   └── use-scroll.ts
│   │
│   ├── types/                    # TypeScript types
│   │   └── index.ts
│   │
│   └── config/                   # App configuration
│       ├── site.ts               # Site metadata
│       └── navigation.ts         # Nav links
│
├── content/                      # MDX content (outside src)
│   ├── events/
│   └── blog/
│
├── data/                         # Static JSON data
│   ├── team.json
│   └── stats.json
│
├── messages/                     # i18n translations
│   ├── en.json
│   └── ar.json
│
├── public/                       # Static assets
│   ├── images/
│   └── fonts/
│
├── .claude/                      # Project planning
│   ├── PLAN.md                   # This file
│   └── PROGRESS.md               # Progress tracking
│
├── velite.config.ts              # Content schema
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

### Key Architecture Decisions

| Decision | Rationale |
|----------|-----------|
| `src/` directory | Cleaner separation, Next.js 16 recommended |
| Route groups `(marketing)` | Organize without URL impact |
| `[locale]` at top | i18n without middleware complexity |
| Content outside `src/` | Clear separation of code vs content |
| Collocated types | Types near usage, shared in `/types` |
| Feature-based sections | Each section self-contained |

---

## Phase 1: Foundation (Week 1)

### 1.1 Project Initialization
- [x] Create Next.js 16 project with TypeScript ✅
- [x] Configure `src/` directory structure ✅
- [x] Set up path aliases (@/*) ✅
- [x] Configure ESLint ✅
- [ ] Initialize Git repository

### 1.2 Styling Setup
- [x] Configure Tailwind CSS v4 ✅ (basic setup done)
- [ ] Set up CSS variables for MPC colors
- [ ] Configure dark mode (@custom-variant)
- [ ] Add Inter & Cairo fonts

### 1.3 Core Dependencies
- [ ] Install shadcn/ui and configure
- [ ] Install Framer Motion
- [ ] Install next-intl
- [ ] Install next-themes
- [ ] Install Lucide icons

### 1.4 Content System
- [ ] Install and configure Velite
- [ ] Define Event schema
- [ ] Define Post schema
- [ ] Create sample event MDX
- [ ] Create sample blog post MDX

### 1.5 Data & Config
- [ ] Create team.json with real data
- [ ] Create stats.json
- [ ] Create site.ts config
- [ ] Create navigation.ts config

### 1.6 Folder Structure (To Create)
- [ ] `src/components/ui/` - shadcn/ui
- [ ] `src/components/sections/` - Page sections
- [ ] `src/components/layout/` - Layout components
- [ ] `src/components/mdx/` - MDX components
- [ ] `src/lib/` - Utilities
- [ ] `src/hooks/` - Custom hooks
- [ ] `src/config/` - App configuration
- [ ] `src/i18n/` - Internationalization
- [ ] `content/events/` - Event MDX files
- [ ] `content/blog/` - Blog MDX files
- [ ] `data/` - JSON data files
- [ ] `messages/` - i18n translations

---

## Phase 2: Core Components (Week 2)

### 2.1 UI Components (shadcn/ui)
- [ ] Button (with MPC variants)
- [ ] Card
- [ ] Badge
- [ ] Avatar
- [ ] Sheet (mobile nav)
- [ ] Separator

### 2.2 Animation Components
- [ ] Aurora Background (Aceternity)
- [ ] Spotlight (Aceternity)
- [ ] Text Generate Effect (Aceternity)
- [ ] 3D Card (Aceternity)
- [ ] Number Ticker (Magic UI)
- [ ] Marquee (Magic UI)

### 2.3 Layout Components
- [ ] Navbar (floating, glassmorphism)
- [ ] Mobile Navigation
- [ ] Footer
- [ ] Theme Toggle
- [ ] Language Toggle

### 2.4 Section Components
- [ ] Hero Section
- [ ] Stats Section
- [ ] Features Section (Bento Grid)
- [ ] Events Preview Section
- [ ] Team Showcase Section
- [ ] CTA Section

---

## Phase 3: Pages (Week 3)

### 3.1 Landing Page
- [ ] Compose all sections
- [ ] Add page transitions
- [ ] Optimize for performance
- [ ] Test responsiveness

### 3.2 Events System
- [ ] Events listing page
- [ ] Event filters (status, type)
- [ ] Event detail page
- [ ] YouTube embed component
- [ ] Photo gallery component

### 3.3 Blog System
- [ ] Blog listing page
- [ ] Blog post page
- [ ] Code syntax highlighting
- [ ] MDX custom components
- [ ] Tag filtering

### 3.4 Team Page
- [ ] Team listing layout
- [ ] Team member cards
- [ ] Social links

---

## Phase 4: Polish & Launch (Week 4)

### 4.1 Internationalization
- [ ] Configure next-intl middleware
- [ ] Create en.json translations
- [ ] Create ar.json translations
- [ ] Implement RTL layout
- [ ] Test language switching

### 4.2 SEO & Meta
- [ ] Configure metadata for all pages
- [ ] Add JSON-LD for events
- [ ] Generate sitemap.xml
- [ ] Configure robots.txt
- [ ] Create OG images

### 4.3 Performance
- [ ] Run Lighthouse audit
- [ ] Optimize images
- [ ] Lazy load heavy components
- [ ] Test Core Web Vitals

### 4.4 Deployment
- [ ] Push to GitHub
- [ ] Deploy to Vercel
- [ ] Configure domain
- [ ] Test production build

---

## Future Enhancements (Post-Launch)

### Short-term (1-2 months)
- [ ] Event registration system
- [ ] Newsletter subscription
- [ ] Search functionality
- [ ] RSS feed

### Medium-term (3-6 months)
- [ ] Member profiles
- [ ] Project showcase
- [ ] Job board
- [ ] Discord integration

### Long-term (6-12 months)
- [ ] Migrate to Payload CMS (if needed)
- [ ] User authentication
- [ ] Community forum
- [ ] Learning resources section

---

## Technical Constraints

1. **Budget**: $0/month (Vercel free tier)
2. **Team**: 3 developer admins
3. **Content**: 1-2 events/month initially
4. **Languages**: English + Arabic (RTL)
5. **Performance**: Lighthouse 90+

---

## Dependencies

```json
{
  "dependencies": {
    "next": "^16.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "typescript": "^5.0.0",
    "tailwindcss": "^4.0.0",
    "framer-motion": "^11.0.0",
    "next-intl": "^3.0.0",
    "next-themes": "^0.4.0",
    "velite": "^0.2.0",
    "lucide-react": "^0.400.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0"
  }
}
```

---

## Commands Reference

```bash
# Development
npm run dev          # Start with Turbopack

# Build
npm run build        # Build for production

# Content
# Just edit MDX files and push - Velite rebuilds automatically

# Deployment
vercel               # Deploy preview
vercel --prod        # Deploy production
```
