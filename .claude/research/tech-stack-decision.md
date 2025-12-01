# Tech Stack Decision

> Researched: November 30, 2025
> Project: MPC Platform (Mauritanian Programmers Community)

## Verdict: Current Stack is Optimal

| Technology | Status | Decision |
|------------|--------|----------|
| Next.js 16 | ✅ Keep | Best i18n ecosystem, largest community |
| Tailwind v4 | ✅ Keep | Superior RTL via logical properties |
| Velite | ✅ Keep | Contentlayer is abandoned, this is the replacement |
| next-intl | ✅ Keep | Lightest bundle, native App Router |
| shadcn/ui | ✅ Keep* | *RTL requires manual work (~2-4h per 10 components) |

---

## Framework: Next.js 16

### Why Next.js over alternatives?

| Alternative | Considered | Why Rejected |
|-------------|------------|--------------|
| **Astro** | Yes | 2x faster for static, but too limited for dynamic features (member directory, interactive components) |
| **SvelteKit** | Yes | 50% smaller bundles, but much smaller i18n ecosystem for Arabic |
| **Remix** | Yes | Good for data-heavy apps, but smaller community and less mature |

### Why Next.js wins for MPC

- **119k GitHub stars** - Largest ecosystem
- **Best i18n support** - `next-intl` is industry standard
- **ISR perfect for content** - Events/blog always fresh
- **Server Components** - Reduce JS for member directory
- **Vercel backing** - Enterprise-grade support

---

## Styling: Tailwind CSS v4

### Why v4 over v3?

| Feature | v3 | v4 |
|---------|----|----|
| Build speed | Baseline | **5-10x faster** |
| RTL support | Manual setup | **Logical properties first-class** |
| Config | JavaScript | **CSS-first (@theme)** |
| Modern CSS | Limited | **oklch, container queries native** |

### Browser requirement

⚠️ Tailwind v4 requires Safari 16.4+, Chrome 111+, Firefox 128+

**Acceptable for MPC** - Developer community uses modern browsers.

---

## Content: Velite

### Why Velite over alternatives?

| Alternative | Status | Why Not |
|-------------|--------|---------|
| **Contentlayer** | ❌ Abandoned | Developer: "one day a month" - community migrating away |
| **next-mdx-remote** | Active | No type safety, no schema validation, runtime overhead |
| **mdx-bundler** | Active | Overkill for our needs, +400% bundle size |

### Why Velite wins

- **Contentlayer replacement** - Same DX, actively maintained
- **Type-safe** - Zod validation catches errors at build time
- **Fast** - 50-90ms hot reloads
- **Used by** - Chakra UI, Ark UI, Park UI (production-proven)

---

## i18n: next-intl

### Why next-intl over alternatives?

| Library | Bundle Size | App Router | RSC Support |
|---------|-------------|------------|-------------|
| **next-intl** | ~3-5KB | Native | Native |
| next-i18next | ~27KB | Limited | Not designed |
| react-intl | ~8-10KB | Manual | Not designed |

### Why next-intl wins

- **5x smaller** than next-i18next
- **Designed for App Router** - Not a Pages Router afterthought
- **RSC-first** - Server translations don't bloat client bundle
- **TypeScript autocomplete** - Translation keys are typed

---

## Components: shadcn/ui

### Why shadcn/ui over alternatives?

| Library | Approach | RTL | Tailwind |
|---------|----------|-----|----------|
| **shadcn/ui** | Copy-paste | Manual* | Native |
| Chakra UI | npm package | Native | Style props |
| MUI | npm package | Native | Material Design |
| Radix UI | Unstyled | N/A | Manual styling |

### RTL Caveat

**shadcn/ui does not have native RTL support.**

Required work:
- Convert physical properties (`ml-*`) to logical (`ms-*`)
- Estimate: ~2-4 hours per 10 components
- Or use Radix `DirectionProvider` for primitives

### Why still choosing shadcn/ui

- **101k GitHub stars** - Fastest growing UI library
- **Code ownership** - No dependency lock-in
- **Tailwind native** - Matches our styling approach
- **Accessible** - Built on Radix primitives

**Alternative if RTL is blocker:** Chakra UI has native RTL support.

---

## Summary

```
Next.js 16   → No viable alternative for bilingual community site
Tailwind v4  → RTL superiority justifies browser requirement
Velite       → Only maintained type-safe MDX solution
next-intl    → Smallest, fastest, designed for our use case
shadcn/ui    → Best fit despite RTL manual work
```

## When to Re-evaluate

- Next.js 17 with breaking changes
- RTL-native Tailwind component library emerges
- Velite development stalls
- Project scope changes significantly
