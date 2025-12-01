---
name: nextjs-16
description: Next.js 16 App Router patterns including async params, async searchParams, generateMetadata, and route handlers. Activate when working with pages, layouts, route handlers, or metadata in Next.js 16.
---

# Next.js 16 Skill

## Auto-Activation Triggers
- Files in `src/app/[locale]/`
- Page components with params
- Layout files
- generateMetadata functions
- Route handlers in `api/`

## Getting Latest Docs
```
mcp__context7__get-library-docs context7CompatibleLibraryID="/vercel/next.js" topic="params"
```

## Critical Pattern: Async Params

**params and searchParams are now Promises in Next.js 16!**

See `patterns.md` for complete code examples.

## Quick Reference

```typescript
// WRONG (Next.js 15 and below)
export default function Page({ params }: { params: { slug: string } }) {
  return <h1>{params.slug}</h1>
}

// CORRECT (Next.js 16)
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <h1>{slug}</h1>
}
```

## Key Rules
1. Always `await params` before using
2. Type as `Promise<{ slug: string }>` not `{ slug: string }`
3. Client components use `React.use()` hook instead of async
4. Both params AND searchParams are Promises
