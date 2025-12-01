---
description: Explore codebase, create implementation plan, code, and test following EPCT workflow
allowed-tools: Task, Read, Write, Edit, Glob, Grep, Bash, TodoWrite, mcp__context7__*, mcp__Ref__*, mcp__firecrawl-mcp__*, mcp__sequential-thinking__*, mcp__chrome-devtools__*, WebSearch, WebFetch
argument-hint: "[task-description]"
---

# Explore, Plan, Code, Test Workflow

At the end of this message, I will ask you to do something.
Please follow the "Explore, Plan, Code, Test" workflow when you start.

## Explore

First, use parallel subagents to find and read all files that may be useful for implementing the task, either as examples or as edit targets. The subagents should return relevant file paths, and any other info that may be useful.

**For MPC project, check:**
- `src/app/[locale]/` - Page patterns
- `src/components/` - Component patterns
- `content/` - MDX content structure
- `velite.config.ts` - Content schemas

## Plan

Next, use `mcp__sequential-thinking__sequentialthinking` to think hard and write up a detailed implementation plan.

**If you need docs**, use MCP tools:
- `mcp__context7__get-library-docs` - Official docs (Next.js, Tailwind, Velite, next-intl)
- `mcp__Ref__ref_search_documentation` - GitHub docs
- `mcp__firecrawl-mcp__firecrawl_scrape` - Specific doc URLs

If there are things you still do not understand, pause here to ask the user before continuing.

## Code

When you have a thorough implementation plan, start writing code:
- Follow existing codebase patterns
- Use `await params` for Next.js 16 async params
- Use `@theme` for Tailwind v4 colors
- Support RTL with logical properties (`ms-*`, `me-*`, `ps-*`, `pe-*`)

Run lint when done: `npm run lint`

## Test

Use `mcp__chrome-devtools__*` to test UI if needed:
1. Take snapshot of the page
2. Verify components render correctly
3. Test both `/en` and `/ar` locales

If tests show problems, go back to planning and think ultrahard.

## Write up

When done, write a short report for PR description:
- What you set out to do
- Choices made with brief justification
- Commands that may be useful for future developers
