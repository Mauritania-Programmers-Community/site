---
description: Research docs for a topic using MCP tools (Context7, Ref, Firecrawl)
allowed-tools: Task, mcp__context7__*, mcp__Ref__*, mcp__firecrawl-mcp__*, WebSearch, WebFetch, Read, Glob, Grep
argument-hint: "[topic] - e.g. 'Next.js 16 async params' or 'Tailwind v4 @theme'"
---

# Research Command

Use MCP tools to find up-to-date documentation for: $ARGUMENTS

## Research Flow

1. **Context7** - Check official library docs first
2. **Ref** - Search GitHub documentation
3. **Firecrawl** - Scrape specific doc URLs if needed
4. **WebSearch** - Find recent articles/guides

## For MPC Stack, use these Context7 library IDs:
- Next.js: `/vercel/next.js`
- Tailwind: `/tailwindlabs/tailwindcss`
- Velite: `/zce/velite`
- next-intl: `/amannn/next-intl`
- Framer Motion: `/framer/motion`

## Output Format
Provide:
1. **Key patterns** with code examples
2. **Version-specific** gotchas
3. **Best practices** for MPC project context

Keep response focused and actionable.
