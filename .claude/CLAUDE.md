# CLAUDE.md - Project Memory

## Project Overview

**Name:** MPC Platform (مجتمع مبرمجي موريتانيا)
**Type:** Community website for Mauritanian Programmers
**Status:** In Development (Phase 1)

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| pnpm | 10.x | Package manager (fast, efficient) |
| Next.js | 16.0.5 | Framework (App Router) |
| React | 19.2.0 | UI Library |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4.x | Styling (CSS-first) |
| shadcn/ui | Latest | UI components |
| Velite | Latest | MDX content management |
| next-intl | Latest | i18n (English + Arabic) |
| Framer Motion | 12.x | Animations |

---

## Repository

**GitHub:** https://github.com/Mauritania-Programmers-Community/mpc_website

---

## Key Commands

```bash
# Development
pnpm dev

# Build
pnpm build

# Add shadcn component
pnpm dlx shadcn@latest add [component]

# Install dependencies
pnpm install
```

---

## Architecture Decisions

1. **`src/` directory** - Cleaner separation of source code
2. **`[locale]` at route level** - i18n with clean URLs
3. **Route groups `(marketing)`** - Organize without URL impact
4. **Content outside `src/`** - Clear code/content separation
5. **No barrel exports** - Better tree-shaking
6. **No over-engineering** - Keep it simple, add complexity when needed

---

## Critical Next.js 16 Patterns

### Async Params (MUST USE)
```typescript
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // ...
}
```

### Async Metadata
```typescript
export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params;
  // ...
}
```

---

## Tailwind CSS v4 Patterns

### Color System (use @theme)
```css
@import "tailwindcss";

@theme {
  --color-mpc-green: #4CAF50;
  --color-mpc-gold: #FFC107;
  --color-background: #0A0A0A;
}
```

### Dark Mode
```css
@custom-variant dark (&:where(.dark, .dark *));
```

### RTL Support
Use logical properties: `ms-*`, `me-*`, `ps-*`, `pe-*`

---

## Folder Structure

```
mpc-platform/
├── src/
│   ├── app/[locale]/          # Pages with i18n
│   ├── components/
│   │   ├── ui/                # shadcn/ui
│   │   ├── sections/          # Page sections
│   │   ├── layout/            # Navbar, Footer
│   │   └── mdx/               # MDX components
│   ├── lib/                   # Utilities
│   ├── hooks/                 # Custom hooks
│   ├── config/                # Site config
│   └── i18n/                  # i18n setup
├── content/                   # MDX files
│   ├── events/
│   └── blog/
├── data/                      # JSON data
├── messages/                  # i18n translations
└── public/                    # Static assets
```

---

## Content Schemas (Velite)

### Event
- title, titleAr, slug, date, status, type
- description, coverImage, speaker, platform
- youtubeRecording, gallery, content (MDX)

### Post
- title, slug, date, author, excerpt
- coverImage, tags, content (MDX)

---

## i18n Setup

- **Locales:** `en`, `ar`
- **Default:** `en`
- **RTL:** Arabic uses `dir="rtl"`
- **Fonts:** Inter (English), Cairo (Arabic)

---

## Design System

### Colors
- **Primary:** MPC Green (#4CAF50)
- **Accent:** Gold (#FFC107)
- **Background:** Near black (#0A0A0A)
- **Foreground:** Off-white (#FAFAFA)

### Fonts
- **English:** Inter
- **Arabic:** Cairo
- **Code:** JetBrains Mono

---

## Important Files

| File | Purpose |
|------|---------|
| `src/app/globals.css` | Tailwind v4 theme config |
| `velite.config.ts` | Content schemas |
| `src/i18n/routing.ts` | i18n routing config |
| `src/i18n/request.ts` | i18n request config |
| `next.config.ts` | Next.js + Velite config |

---

## Documentation Files

| File | Purpose |
|------|---------|
| `.claude/PLAN.md` | Implementation roadmap |
| `.claude/PROGRESS.md` | Task tracking |
| `.claude/ARCHITECTURE.md` | Architecture decisions |
| `.claude/RESEARCH.md` | Technical research |
| `.claude/CLAUDE.md` | This file - AI memory |

---

## External Docs Reference

| Resource | Location |
|----------|----------|
| Original Plan | `docs/mpc-platform-plan-v2.md` |
| Checklist | `docs/Project-Checklist.md` |
| Tech Spec | `docs/Technical-Specification.md` |
| User Stories | `docs/User-Stories.md` |
| Design Guide | `docs/Visual-Design-Guide.md` |

---

## Team Data

- **Founder:** Deidin
- **AI Lead:** Ahmed Abdat
- **Security Lead:** Aziz
- **General Supervisor:** Mohamed Salem
- **Members:** 880+
- **Founded:** September 21, 2024

---

## Current Phase

**Phase 1: Foundation**
- ✅ Project initialized
- ✅ pnpm install complete (migrated from npm)
- ✅ Folder structure created
- ✅ MPC color system
- ✅ shadcn/ui setup
- ✅ Hero sections implemented

---

## Gotchas & Reminders

1. **Always await params** in Next.js 16
2. **Use @theme** for Tailwind v4 colors (not tailwind.config.js)
3. **Add .velite to .gitignore**
4. **Use logical CSS properties** for RTL support
5. **Run shadcn with --force** if Next.js version issues
6. **Velite uses next.config.ts approach** for Turbopack compatibility

---

## Session Context

When resuming work on this project:
1. Check `.claude/PROGRESS.md` for current status
2. Review `.claude/PLAN.md` for next tasks
3. Use `.claude/RESEARCH.md` for implementation details
4. Reference original docs in project root for requirements
