---
name: tailwind-v4
description: Tailwind CSS v4 patterns including @theme directive, CSS-first configuration, @custom-variant for dark mode, and RTL support with logical properties. Activate when working with globals.css, custom colors, or dark mode setup.
---

# Tailwind CSS v4 Skill

## Auto-Activation Triggers
- `src/app/globals.css` edits
- Custom color configuration
- Dark mode setup
- RTL styling questions

## Getting Latest Docs
```
mcp__context7__get-library-docs context7CompatibleLibraryID="/tailwindlabs/tailwindcss" topic="theme"
mcp__firecrawl-mcp__firecrawl_scrape url="https://tailwindcss.com/docs/v4-beta"
```

## Critical: No tailwind.config.js

Tailwind v4 uses CSS-first configuration with `@theme` directive.

See `patterns.md` for complete setup.

## Quick Reference

```css
@import "tailwindcss";

@theme {
  --color-mpc-green: #4CAF50;
  --color-mpc-gold: #FFC107;
}

@custom-variant dark (&:where(.dark, .dark *));
```

## Key Rules
1. Use `@theme` not `:root` for color utilities
2. Namespace: `--color-*` generates color classes
3. Import order: `@import "tailwindcss"` BEFORE `@theme`
4. RTL: Use logical properties (`ms-*`, `me-*`, `ps-*`, `pe-*`)
