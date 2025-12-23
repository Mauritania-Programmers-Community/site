# MagicUI Blog Integration Plan

## Project Status: 🟢 Phase 1 & 2 Complete + Events Integration

**Created:** December 1, 2025
**Last Updated:** December 1, 2025
**Source Template:** https://github.com/magicuidesign/blog-template
**Goal:** Enhance MPC blog with MagicUI design patterns

---

## Overview

Integrate best design patterns from MagicUI blog template while maintaining:
- Bilingual support (EN/AR)
- RTL compatibility
- Next.js 16 best practices
- Velite content management
- MPC branding (Green/Gold)

---

## Phase 1: Quick Wins (High Impact, Low Effort)

### 1.1 FlickeringGrid Background
| Task | Status | Notes |
|------|--------|-------|
| Install FlickeringGrid from MagicUI | ✅ | Copied manually to `src/components/magicui/` |
| Integrate in blog hero section | ✅ | Replaced animated blobs with grid |
| Add mask gradient for fade effect | ✅ | `[mask-image:linear-gradient(...)]` |
| Test performance (canvas animation) | ⬜ | Check FPS on mobile |

### 1.2 Reading Time
| Task | Status | Notes |
|------|--------|-------|
| Add readingTime to Velite schema | ✅ | Auto-calculate from content in transform |
| Display in blog card | ✅ | "5 min read" format |
| Display in blog detail page | ✅ | Near date/author |
| Localize for Arabic | ✅ | Proper Arabic grammar for numbers |

### 1.3 Author System
| Task | Status | Notes |
|------|--------|-------|
| Create `src/lib/authors.ts` | ✅ | Type-safe author definitions |
| Add DiceBear placeholder avatars | ✅ | Using lorelei style with MPC gradient |
| Create AuthorCard component | ✅ | Avatar + name + role + social links |
| Update blog cards to show avatar + role | ✅ | Avatar, name, and role displayed |
| Update blog detail to show full author card | ✅ | Sidebar + header compact version |
| Handle external SVG avatars | ✅ | Using `<img>` for DiceBear URLs |

---

## Phase 1.5: Events Integration (Added Dec 1, 2025)

### Events Author System
| Task | Status | Notes |
|------|--------|-------|
| Update event content files to use author keys | ✅ | Changed "Ahmed Abdat" → "ahmed-abdat" |
| Update VeliteEventCard with author system | ✅ | Shows avatar + name + role |
| Update event detail page with AuthorCard | ✅ | Uses compact variant |
| Create shared AvatarImage component | ✅ | `src/components/ui/avatar-image.tsx` |
| Remove duplicate avatar code | ✅ | 4 files consolidated to 1 |
| Replace logos with webp version | ✅ | `mpc_logo.webp` in logos folder |

---

## Phase 2: Enhanced UX

### 2.1 Table of Contents
| Task | Status | Notes |
|------|--------|-------|
| Create TableOfContents component | ✅ | IntersectionObserver for scroll tracking |
| Add to blog detail sidebar | ✅ | Desktop only, sticky positioning |
| Create MobileTableOfContents | ✅ | Floating button + drawer |
| Add smooth scroll with offset | ✅ | Account for sticky header |
| Add copy-to-clipboard for headings | ✅ | URL hash + clipboard |

### 2.2 CopyHeader Component
| Task | Status | Notes |
|------|--------|-------|
| Create CopyHeader for MDX | ⬜ | Wrap h1/h2 with copy functionality |
| Add link icon on hover | ⬜ | Show on group hover |
| Update URL hash on click | ⬜ | history.pushState |
| Add copy confirmation | ⬜ | Optional toast |

### 2.3 Mobile Tag Drawer
| Task | Status | Notes |
|------|--------|-------|
| Install Drawer component | ⬜ | From shadcn/ui or custom |
| Create responsive TagFilter | ⬜ | Desktop: inline, Mobile: drawer |
| Add tag counts | ⬜ | Badge with post count |
| Animate drawer with Framer Motion | ⬜ | Bottom sheet style |

---

## Phase 3: Visual Polish

### 3.1 Enhanced Blog Cards
| Task | Status | Notes |
|------|--------|-------|
| Add pseudo-element grid lines | ⬜ | MagicUI style borders |
| Improve hover animations | ⬜ | Scale + shadow + border |
| Add image zoom effect | ⬜ | `scale-105` on hover |
| Add skeleton loading state | ⬜ | For async content |

### 3.2 Related Posts Section
| Task | Status | Notes |
|------|--------|-------|
| Create ReadMoreSection component | ⬜ | Based on shared tags |
| Style like MagicUI | ⬜ | Simple card list |
| Add to blog detail page | ⬜ | After content |

### 3.3 Code Block Enhancements
| Task | Status | Notes |
|------|--------|-------|
| Add copy button to code blocks | ⬜ | Top-right corner |
| Add language badge | ⬜ | Show "typescript", "bash", etc. |
| Add line numbers option | ⬜ | Via rehype-pretty-code |
| Add line highlighting | ⬜ | For tutorials |

---

## Phase 4: Advanced Features

### 4.1 Search Enhancement
| Task | Status | Notes |
|------|--------|-------|
| Add search suggestions | ⬜ | Dropdown with results |
| Highlight matches | ⬜ | In search results |
| Add keyboard navigation | ⬜ | Arrow keys + Enter |

### 4.2 RSS Feed
| Task | Status | Notes |
|------|--------|-------|
| Create /rss.xml route handler | ⬜ | Generate RSS from posts |
| Add RSS link to footer | ⬜ | Icon + link |

### 4.3 OG Image Generation
| Task | Status | Notes |
|------|--------|-------|
| Create opengraph-image.tsx | ⬜ | Dynamic OG images |
| Include post title + author | ⬜ | Branded template |

---

## Components to Create

| Component | Location | Priority |
|-----------|----------|----------|
| FlickeringGrid | `src/components/magicui/flickering-grid.tsx` | High |
| AuthorCard | `src/components/blog/author-card.tsx` | High |
| TableOfContents | `src/components/blog/table-of-contents.tsx` | Medium |
| MobileTableOfContents | `src/components/blog/mobile-toc.tsx` | Medium |
| CopyHeader | `src/components/mdx/copy-header.tsx` | Medium |
| TagFilterDrawer | `src/components/blog/tag-filter-drawer.tsx` | Medium |
| ReadMoreSection | `src/components/blog/read-more-section.tsx` | Low |
| CodeBlockCopy | `src/components/mdx/code-block-copy.tsx` | Low |

---

## Files to Modify

| File | Changes |
|------|---------|
| `velite.config.ts` | Add readingTime field |
| `src/lib/content.ts` | Add reading time helper |
| `src/lib/authors.ts` | Create author definitions |
| `src/app/[locale]/blog/page.tsx` | Add FlickeringGrid, update cards |
| `src/app/[locale]/blog/[slug]/page.tsx` | Add TOC, author card, reading time |
| `src/components/blog/velite-blog-card.tsx` | Add author avatar, reading time |
| `src/components/mdx/mdx-content.tsx` | Add CopyHeader for headings |

---

## Design Decisions

### Color Adaptation
- MagicUI uses neutral grays → Keep MPC Green/Gold accents
- FlickeringGrid color: `var(--color-mpc-green)` at low opacity

### RTL Considerations
- TOC sidebar: Switch to left side for RTL
- Drawer: Slides from bottom (works for both)
- Icons: Use logical positioning (start/end)

### Performance
- FlickeringGrid: Use IntersectionObserver to pause when off-screen
- TOC: Throttle scroll events
- Images: Keep Next.js Image optimization

---

## Success Criteria

- [ ] Blog looks more polished and professional
- [ ] All features work in both EN and AR
- [ ] No performance regression (Lighthouse 90+)
- [ ] Mobile experience is excellent
- [ ] Build passes with no errors

---

## References

- [MagicUI Blog Template](https://github.com/magicuidesign/blog-template)
- [MagicUI Components](https://magicui.design)
- [Cloned Template Location](file:///tmp/blog-template)
