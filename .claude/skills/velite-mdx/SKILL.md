---
name: velite-mdx
description: Velite MDX content management patterns including velite.config.ts setup, collection schemas, MDX rendering, and Next.js 16 integration. Activate when working with content/, velite.config.ts, MDX files, or content collections.
---

# Velite MDX Skill

## Auto-Activation Triggers
- `velite.config.ts` edits
- Files in `content/` directory
- MDX content components
- Collection schema changes

## Getting Latest Docs
```
mcp__context7__get-library-docs context7CompatibleLibraryID="/zce/velite" topic="collections"
mcp__firecrawl-mcp__firecrawl_scrape url="https://velite.js.org/guide/quick-start"
```

## Critical: Turbopack Compatibility

Use next.config.ts approach, NOT VeliteWebpackPlugin.

See `patterns.md` for complete setup.

## Quick Reference

```typescript
// velite.config.ts
import { defineConfig, defineCollection, s } from 'velite'

const events = defineCollection({
  name: 'Event',
  pattern: 'events/**/*.mdx',
  schema: s.object({
    title: s.string(),
    slug: s.slug('events'),
    date: s.isodate(),
    code: s.mdx(),
  })
})

export default defineConfig({
  root: 'content',
  collections: { events }
})
```

## Key Rules
1. Add `.velite` to `.gitignore`
2. Use next.config.ts integration for Turbopack
3. `s.mdx()` returns function-body, needs MDXContent wrapper
4. `s.markdown()` returns HTML string
5. Images use relative paths: `./cover.jpg`
