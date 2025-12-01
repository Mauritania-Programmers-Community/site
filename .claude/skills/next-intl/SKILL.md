---
name: next-intl
description: next-intl i18n patterns for Next.js 16 App Router including routing setup, middleware, useTranslations hook, and RTL support for Arabic. Activate when working with i18n, translations, locale switching, or RTL layout.
---

# next-intl Skill

## Auto-Activation Triggers
- `src/i18n/` files
- `messages/` translation files
- Locale-related components
- RTL direction handling

## Getting Latest Docs
```
mcp__context7__get-library-docs context7CompatibleLibraryID="/amannn/next-intl" topic="routing"
mcp__firecrawl-mcp__firecrawl_scrape url="https://next-intl.dev/docs/getting-started/app-router"
```

## MPC Locales
- `en` - English (LTR, default)
- `ar` - Arabic (RTL)

See `patterns.md` for complete setup.

## Quick Reference

```typescript
// src/i18n/routing.ts
import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en', 'ar'],
  defaultLocale: 'en',
  localePrefix: 'as-needed'
})
```

## Key Rules
1. Use `await requestLocale` in request.ts (Next.js 16)
2. RTL: Set `dir="rtl"` on `<html>` for Arabic
3. Use logical CSS properties for RTL support
4. Import navigation from `@/i18n/navigation`, not `next/navigation`
