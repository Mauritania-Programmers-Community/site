# MPC Platform - Architecture Decisions

## Next.js 16 Best Practices

### Why This Structure?

```
src/
├── app/[locale]/          # i18n at route level
├── components/            # Reusable UI
├── lib/                   # Utilities
├── hooks/                 # Custom hooks
├── types/                 # TypeScript types
└── config/                # App configuration
```

---

## Key Decisions

### 1. `src/` Directory

**Decision:** Use `src/` directory

**Why:**
- Cleaner root directory
- Clear separation of source code vs config files
- Next.js 16 officially supports and recommends
- Easier to add tooling (tests, stories)

---

### 2. Route Groups `(marketing)`

**Decision:** Use route groups for organization

```
app/[locale]/
├── (marketing)/      # Landing, About, Team
│   ├── page.tsx
│   ├── about/
│   └── team/
├── events/           # Events system
└── blog/             # Blog system
```

**Why:**
- Group related pages without affecting URL
- Can have different layouts per group
- Scalable for future additions (dashboard, auth, etc.)

---

### 3. i18n with `[locale]` Segment

**Decision:** Dynamic `[locale]` segment at top level

```
app/
├── [locale]/
│   ├── layout.tsx    # Handles RTL, fonts, providers
│   └── ...pages
└── layout.tsx        # Root (html, body only)
```

**Why:**
- Clean URLs: `/events`, `/ar/events`
- Works with static generation
- Easy to add more languages later
- Better SEO with hreflang tags

---

### 4. Content Outside `src/`

**Decision:** Keep `content/` and `data/` at root

```
project/
├── src/              # Code
├── content/          # MDX files
├── data/             # JSON data
└── messages/         # i18n translations
```

**Why:**
- Clear separation: code vs content
- Non-developers can find content easily
- Velite watches content folder separately
- Follows MDX community conventions

---

### 5. Component Organization

**Decision:** Feature-based with clear layers

```
components/
├── ui/           # Atomic (shadcn/ui)
├── common/       # Shared across features
├── sections/     # Page sections (organisms)
├── layout/       # App layout
└── mdx/          # MDX-specific
```

**Why:**
- `ui/` stays clean (only shadcn/ui)
- `sections/` are self-contained page blocks
- Easy to find components
- Scalable without deep nesting

---

### 6. No Over-Engineering

**What We're NOT Doing:**

| Pattern | Why Not |
|---------|---------|
| Barrel exports (index.ts) | Adds complexity, breaks tree-shaking |
| Feature folders | Overkill for current size |
| State management library | React 19 + Server Components enough |
| API routes | Static site, no backend needed |
| Middleware (complex) | Only simple i18n redirect |
| Custom caching | Vercel handles this |

---

## Scalability Path

### Current (MVP)
```
components/
├── ui/
├── sections/
└── layout/
```

### Future (If Needed)
```
components/
├── ui/
├── sections/
├── layout/
├── features/           # Add when features grow
│   ├── auth/
│   ├── events/
│   └── blog/
└── providers/          # Add when providers grow
```

---

## File Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `EventCard.tsx` |
| Pages | lowercase | `page.tsx` |
| Utilities | camelCase | `formatDate.ts` |
| Hooks | use-prefix | `use-scroll.ts` |
| Types | PascalCase | `Event.ts` |
| Constants | UPPER_SNAKE | `SITE_CONFIG` |

---

## Import Aliases

```json
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@/content": ["./content"],
      "@/data": ["./data"]
    }
  }
}
```

**Usage:**
```typescript
import { Button } from '@/components/ui/button'
import { events } from '@/content'
import team from '@/data/team.json'
```

---

## Performance Considerations

### Server Components (Default)
- All components are Server Components by default
- Only add `'use client'` when needed (interactivity)

### When to Use Client Components
- Event handlers (onClick, onChange)
- Browser APIs (localStorage, window)
- Hooks (useState, useEffect)
- Animation libraries (Framer Motion)

### Static Generation
- All pages are statically generated
- Content from MDX → HTML at build time
- Cached at Vercel edge

---

## Adding New Features

### New Page
1. Create folder in `app/[locale]/`
2. Add `page.tsx`
3. Add to navigation config
4. Add translations to messages

### New Section
1. Create in `components/sections/`
2. Import in page
3. Self-contained with own styles

### New Content Type
1. Add schema in `velite.config.ts`
2. Create content folder
3. Add sample MDX file
4. Create listing + detail pages

---

## Dependencies Philosophy

**Add only when needed:**
- No CSS-in-JS (Tailwind is enough)
- No state management (React 19 is enough)
- No form library (no forms yet)
- No validation library (Velite uses Zod)
- No date library (native Intl API)

**When to add:**
- Form library → When we add event registration
- Auth library → When we add user accounts
- State management → When server state isn't enough
