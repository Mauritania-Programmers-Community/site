# MPC Platform - Project Setup & Checklist

## مجتمع مبرمجي موريتانيا - دليل الإعداد وقائمة المهام

**Version:** 1.0  
**Date:** November 30, 2025

---

## Quick Start Commands

```bash
# Create project
npx create-next-app@latest mpc-platform --typescript --tailwind --app --src-dir

# Navigate to project
cd mpc-platform

# Install dependencies
npm install velite framer-motion next-intl next-themes lucide-react clsx tailwind-merge

# Install shadcn/ui
npx shadcn@latest init
npx shadcn@latest add button card badge avatar separator sheet

# Create folders
mkdir -p content/events content/blog data components/{ui,aceternity,magicui,sections,layout,mdx} messages public/images/{team,events,logos}

# Start development
npm run dev
```

---

## Phase 1: Foundation (Week 1)

### Day 1-2: Project Setup

- [ ] **Create Next.js 16 Project**
  ```bash
  npx create-next-app@latest mpc-platform --typescript --tailwind --app --src-dir
  ```

- [ ] **Configure TypeScript** (`tsconfig.json`)
  - Enable strict mode
  - Add path aliases (@/*)

- [ ] **Set up Tailwind CSS v4**
  - Configure custom colors (MPC green, gold)
  - Add custom fonts (Inter, Cairo)
  - Configure dark mode

- [ ] **Install Core Dependencies**
  ```bash
  npm install framer-motion next-intl next-themes lucide-react clsx tailwind-merge
  ```

- [ ] **Set up shadcn/ui**
  ```bash
  npx shadcn@latest init
  npx shadcn@latest add button card badge avatar separator sheet
  ```

- [ ] **Create Folder Structure**
  - app/[locale]/
  - components/{ui, sections, layout, aceternity, magicui, mdx}
  - content/{events, blog}
  - data/
  - messages/{en.json, ar.json}
  - lib/

### Day 3-4: Content System

- [ ] **Install Velite**
  ```bash
  npm install velite
  ```

- [ ] **Create velite.config.ts**
  - Define Event schema
  - Define Post schema
  - Configure output directory

- [ ] **Update next.config.ts**
  - Add Velite integration
  - Configure MDX support

- [ ] **Create Sample Content**
  - content/events/2024-10-26-github-demo.mdx
  - content/events/2024-11-02-tier-list.mdx
  - content/blog/welcome-to-mpc.mdx

- [ ] **Create Data Files**
  - data/team.json
  - data/stats.json

### Day 5: Deployment Setup

- [ ] **Initialize Git**
  ```bash
  git init
  git add .
  git commit -m "Initial commit"
  ```

- [ ] **Create GitHub Repository**
  - Push to GitHub
  - Set up branch protection (optional)

- [ ] **Deploy to Vercel**
  - Connect GitHub repository
  - Configure environment variables
  - Test deployment works

- [ ] **Set up Domain** (if available)
  - Add custom domain in Vercel
  - Configure DNS

---

## Phase 2: Core Components (Week 2)

### Day 1-2: Animation Components

- [ ] **Install Aceternity UI Components**
  - Copy aurora-background.tsx
  - Copy spotlight.tsx
  - Copy text-generate-effect.tsx
  - Copy 3d-card.tsx
  - Copy focus-cards.tsx

- [ ] **Install Magic UI Components**
  - Copy number-ticker.tsx
  - Copy marquee.tsx
  - Copy particles.tsx (optional)

- [ ] **Test All Animations**
  - Verify no console errors
  - Test on mobile device
  - Check performance

### Day 3-4: Layout Components

- [ ] **Build Navigation**
  - Desktop navbar with floating style
  - Mobile menu with Sheet component
  - Logo component
  - Theme toggle button
  - Language toggle button

- [ ] **Build Footer**
  - Logo and tagline
  - Navigation links
  - Social media links
  - Copyright notice

- [ ] **Create Root Layout**
  - Font loading (Inter, Cairo)
  - Theme provider
  - i18n provider
  - Metadata configuration

### Day 5: Hero & Stats

- [ ] **Build Hero Section**
  - Aurora background
  - Spotlight effect
  - Title with Arabic text
  - Subtitle with typing effect
  - CTA buttons
  - Scroll indicator

- [ ] **Build Stats Section**
  - Number ticker for each stat
  - Scroll-triggered animation
  - Responsive grid layout

---

## Phase 3: Pages (Week 3)

### Day 1-2: Landing Page

- [ ] **Complete Hero Section**
- [ ] **Add Stats Section**
- [ ] **Add Features/What We Do Section**
  - Bento grid layout
  - Icon cards for each category
- [ ] **Add Events Preview Section**
  - Show 2-3 recent/upcoming events
  - Link to events page
- [ ] **Add Team Section**
  - Focus cards with hover effect
  - Link to team page
- [ ] **Add CTA Section**
  - Gradient background
  - Join button

### Day 3: Events Pages

- [ ] **Events Listing Page**
  - Page header
  - Filter buttons (Upcoming/Past/All)
  - Event card grid
  - Empty state design

- [ ] **Event Detail Page**
  - Cover image with overlay
  - Event metadata (date, type, speaker)
  - MDX content rendering
  - YouTube embed component
  - Photo gallery component

### Day 4: Blog Pages

- [ ] **Blog Listing Page**
  - Page header
  - Post card grid
  - Tags display

- [ ] **Blog Post Page**
  - Cover image
  - Post metadata
  - MDX content with custom components
  - Code syntax highlighting

### Day 5: Team Page

- [ ] **Team Page**
  - Page header
  - Team member cards
  - Founder section
  - Admin section
  - Social links

---

## Phase 4: Polish & Launch (Week 4)

### Day 1: Internationalization

- [ ] **Configure next-intl**
  - Set up middleware
  - Create message files
  - Implement language toggle

- [ ] **Translate UI Text**
  - Navigation labels
  - Button text
  - Section headings
  - Footer text

- [ ] **RTL Support**
  - Test Arabic layout
  - Fix any RTL issues
  - Verify fonts load correctly

### Day 2: Animations & Transitions

- [ ] **Page Transitions**
  - Create template.tsx
  - Add fade-up animation
  - Test all route transitions

- [ ] **Micro-interactions**
  - Button hover effects
  - Card hover states
  - Link underline animations

- [ ] **Loading States**
  - Skeleton components
  - Loading spinners where needed

### Day 3: SEO & Performance

- [ ] **SEO Optimization**
  - Meta tags for all pages
  - JSON-LD for events
  - Generate sitemap
  - Create robots.txt
  - Set up OG images

- [ ] **Performance Optimization**
  - Run Lighthouse audit
  - Optimize images
  - Lazy load heavy components
  - Check bundle size

- [ ] **Accessibility**
  - Test with screen reader
  - Check color contrast
  - Verify keyboard navigation
  - Add ARIA labels

### Day 4: Content Migration

- [ ] **Create All Event MDX Files**
  - Community Launch (Sept 21, 2024)
  - GitHub Demo (Oct 26, 2024)
  - Tier List (Nov 2, 2024)
  - Cybersecurity Night

- [ ] **Add Event Images**
  - Cover images for each event
  - Speaker photos
  - Gallery images (if available)

- [ ] **Create Team Data**
  - All team member information
  - Photos for each member
  - Accurate bios and links

- [ ] **Write Blog Posts**
  - Welcome post
  - One year anniversary (if applicable)

### Day 5: Testing & Launch

- [ ] **Cross-Browser Testing**
  - Chrome
  - Firefox
  - Safari
  - Edge

- [ ] **Mobile Testing**
  - iOS Safari
  - Android Chrome
  - Various screen sizes

- [ ] **Final Checks**
  - All links work
  - Forms work (if any)
  - No console errors
  - No 404 pages
  - Images all load

- [ ] **Launch!**
  - Merge to main branch
  - Monitor deployment
  - Announce to community

---

## Post-Launch Checklist

- [ ] Set up analytics (Google Analytics / Vercel Analytics)
- [ ] Monitor Core Web Vitals
- [ ] Create documentation for content updates
- [ ] Train team on adding events/posts
- [ ] Set up error monitoring (optional)
- [ ] Plan content calendar for blog

---

## Component Reference

### Must-Have Components

| Component | Location | Status |
|-----------|----------|--------|
| Button | components/ui/button.tsx | ⬜ |
| Card | components/ui/card.tsx | ⬜ |
| Badge | components/ui/badge.tsx | ⬜ |
| Avatar | components/ui/avatar.tsx | ⬜ |
| Sheet | components/ui/sheet.tsx | ⬜ |
| Aurora Background | components/aceternity/aurora-background.tsx | ⬜ |
| Spotlight | components/aceternity/spotlight.tsx | ⬜ |
| Text Generate | components/aceternity/text-generate-effect.tsx | ⬜ |
| 3D Card | components/aceternity/3d-card.tsx | ⬜ |
| Focus Cards | components/aceternity/focus-cards.tsx | ⬜ |
| Number Ticker | components/magicui/number-ticker.tsx | ⬜ |
| Marquee | components/magicui/marquee.tsx | ⬜ |

### Section Components

| Component | Location | Status |
|-----------|----------|--------|
| Hero | components/sections/hero.tsx | ⬜ |
| Stats | components/sections/stats.tsx | ⬜ |
| Features | components/sections/features.tsx | ⬜ |
| Events Preview | components/sections/events-preview.tsx | ⬜ |
| Team Showcase | components/sections/team-showcase.tsx | ⬜ |
| CTA | components/sections/cta.tsx | ⬜ |

### Layout Components

| Component | Location | Status |
|-----------|----------|--------|
| Navbar | components/layout/navbar.tsx | ⬜ |
| Mobile Nav | components/layout/mobile-nav.tsx | ⬜ |
| Footer | components/layout/footer.tsx | ⬜ |
| Theme Toggle | components/layout/theme-toggle.tsx | ⬜ |
| Language Toggle | components/layout/language-toggle.tsx | ⬜ |

### MDX Components

| Component | Location | Status |
|-----------|----------|--------|
| Callout | components/mdx/callout.tsx | ⬜ |
| YouTube | components/mdx/youtube.tsx | ⬜ |
| Code Block | components/mdx/code-block.tsx | ⬜ |
| Event Gallery | components/mdx/event-gallery.tsx | ⬜ |

---

## Environment Variables

```bash
# .env.local

# Required
NEXT_PUBLIC_SITE_URL=https://mpc.mr
NEXT_PUBLIC_WHATSAPP_LINK=https://chat.whatsapp.com/YOUR_LINK

# Optional - Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXX

# Optional - If using API routes
# API_SECRET_KEY=your_secret
```

---

## Useful Commands

```bash
# Development
npm run dev              # Start dev server with Turbopack
npm run build           # Build for production
npm run start           # Start production server
npm run lint            # Run ESLint

# Type Checking
npx tsc --noEmit        # Check types without building

# Dependencies
npm outdated            # Check for updates
npm update              # Update packages

# Vercel
vercel                  # Deploy preview
vercel --prod          # Deploy production
vercel env pull        # Pull env variables
```

---

## Resources

### Documentation
- [Next.js 16 Docs](https://nextjs.org/docs)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Aceternity UI](https://ui.aceternity.com)
- [Magic UI](https://magicui.design)
- [Velite](https://velite.js.org)
- [next-intl](https://next-intl-docs.vercel.app)
- [Framer Motion](https://www.framer.com/motion)

### Design Inspiration
- [Vercel.com](https://vercel.com)
- [Linear.app](https://linear.app)
- [Raycast.com](https://raycast.com)

---

**Document End**

*Last Updated: November 30, 2025*
