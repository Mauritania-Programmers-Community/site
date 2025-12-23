# MPC Platform - Developer Context

## Project Overview
This is the official website for the **Mauritania Programmers Community (MPC)**. It is a modern, bilingual (English/Arabic) web application built to showcase the community, its events, and blog content.

### Tech Stack
*   **Framework:** Next.js 16 (App Router)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS v4
*   **UI Components:** shadcn/ui
*   **Content Management:** Velite (MDX)
*   **Internationalization:** next-intl (RTL support for Arabic)
*   **Animations:** Framer Motion, GSAP, Three.js (via React Three Fiber)

## Architecture & Structure

### Directory Layout
*   `src/app/[locale]/`: Main application routes. The `[locale]` segment handles internationalization (e.g., `/en`, `/ar`).
    *   `(marketing)/`: Route group for landing, about, and team pages.
    *   `blog/`, `events/`: Feature-specific routes.
*   `content/`: **External to `src`**. Contains MDX files for content.
    *   `blog/{locale}/`: Blog posts.
    *   `events/{locale}/`: Event details.
*   `components/`:
    *   `ui/`: Atomic components (shadcn/ui).
    *   `sections/`: larger, page-specific sections.
    *   `layout/`: Navbar, Footer, etc.
    *   `heroes/`: Hero section variants.
*   `messages/`: JSON files for `next-intl` translations (`en.json`, `ar.json`).
*   `src/lib/`: Utility functions.

### Key Configuration Files
*   `velite.config.ts`: Defines content schemas (Post, Event) and MDX processing.
*   `next.config.ts`: Next.js configuration.
*   `tailwind.config.ts`: Tailwind configuration (v4).
*   `src/config/site.ts`: Global site configuration (metadata, links).

## Development Workflow

### Commands
*   **Start Dev Server:** `npm run dev` (uses Turbopack)
*   **Build Production:** `npm run build` (runs Velite content generation + Next.js build)
*   **Start Production:** `npm run start`
*   **Lint:** `npm run lint`

### Content Creation
Content is managed via MDX files in the `content/` directory.
*   **Blog Posts:** `content/blog/{locale}/{slug}.mdx`
*   **Events:** `content/events/{locale}/{slug}.mdx`

There are helper "slash commands" documented in the project (e.g., `/create-post`), but as a developer, you can manually create these files following the schema in `velite.config.ts`.

### Coding Conventions
*   **i18n:** Always use `next-intl` for text. Use `useTranslations` hook in components.
*   **Styling:** Use Tailwind utility classes.
*   **Components:** Prefer server components (`async function`). Use `'use client'` only when interactivity (hooks, event listeners) is required.
*   **Imports:** Use path aliases (e.g., `@/components`, `@/lib`, `@/content`).
*   **File Naming:** PascalCase for components (`EventCard.tsx`), kebab-case for utilities/hooks.

## Architecture Decisions
*   **`src/` Directory:** Used to keep the root clean.
*   **Static Generation:** The site is statically generated for performance.
*   **No API Routes:** Currently purely static; no backend API routes are used.
*   **Velite:** Used instead of Contentlayer for better type safety and DX with Next.js 16.

## Critical Implementation Rules

### Next.js 16
*   **AWAIT PARAMS:** Next.js 16 requires `params` to be awaited in Page components and `generateMetadata`.
    ```typescript
    export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
      const { slug } = await params;
    }
    ```

### Tailwind CSS v4
*   **CSS-First Config:** Theme configuration is primarily in `src/app/globals.css` using `@theme` blocks.
*   **RTL Support:** **MUST** use logical properties for spacing and alignment to support Arabic.
    *   Use `ms-*` (margin-start) instead of `ml-*`.
    *   Use `me-*` (margin-end) instead of `mr-*`.
    *   Use `ps-*` / `pe-*` for padding.

### Content & Data
*   **Velite Imports:** Import generated content from `#site/content`.
*   **Authors:** Defined in `src/lib/authors.ts`. Use keys (e.g., "ahmed-abdat") to reference them in MDX.

## Brand Guidelines
*   **Colors:**
    *   Primary: `#4CAF50` (MPC Green)
    *   Accent: `#FFC107` (Gold)
*   **Fonts:**
    *   English: Inter
    *   Arabic: Cairo
    *   Code: JetBrains Mono
