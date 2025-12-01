# MPC Content Management Guide

This guide explains how to create and manage blog posts and events for the MPC Platform.

---

## Table of Contents

1. [Overview](#overview)
2. [Content Structure](#content-structure)
3. [Creating Blog Posts](#creating-blog-posts)
4. [Creating Events](#creating-events)
5. [Content Workflow](#content-workflow)
6. [MDX Features](#mdx-features)
7. [Deployment](#deployment)
8. [Troubleshooting](#troubleshooting)

---

## Overview

The MPC Platform uses **Velite** for MDX content management with full bilingual support (English + Arabic). Content is organized by locale, allowing each language version to have its own file.

### Key Features

- **Bilingual Support**: Every piece of content has English (`en`) and Arabic (`ar`) versions
- **MDX Format**: Write content in Markdown with React components
- **Type-Safe**: Full TypeScript support with auto-generated types
- **SEO Optimized**: Built-in metadata and Open Graph support

---

## Content Structure

```
content/
├── blog/
│   ├── en/                    # English blog posts
│   │   ├── welcome-to-mpc.mdx
│   │   └── getting-started.mdx
│   └── ar/                    # Arabic blog posts
│       ├── welcome-to-mpc.mdx
│       └── getting-started.mdx
└── events/
    ├── en/                    # English events
    │   ├── first-meetup.mdx
    │   └── web-workshop.mdx
    └── ar/                    # Arabic events
        ├── first-meetup.mdx
        └── web-workshop.mdx
```

### Important Rules

1. **Same slug for both languages**: `welcome-to-mpc.mdx` in both `en/` and `ar/`
2. **Locale in frontmatter**: Each file must have `locale: en` or `locale: ar`
3. **Images in public folder**: Store at `public/images/blog/` or `public/images/events/`

---

## Creating Blog Posts

### Method 1: Using Slash Command (Recommended)

In Claude Code, run:

```
/create-post getting-started-with-nextjs
```

Claude will ask for:
- Title (English & Arabic)
- Description (English & Arabic)
- Author name
- Tags
- Cover image path

This creates both language files automatically.

### Method 2: Manual Creation

Create two files:

**`content/blog/en/my-post.mdx`**
```mdx
---
locale: en
title: "My Blog Post Title"
description: "A brief description for SEO and previews"
date: 2025-01-15
author: "Your Name"
tags: ["tutorial", "nextjs", "react"]
image: "/images/blog/my-post.jpg"
published: false
---

# My Blog Post Title

Your content here...

## Section 1

Write your content using Markdown syntax.

## Code Example

```typescript
const greeting = "Hello, MPC!";
console.log(greeting);
```

## Conclusion

Wrap up your post here.
```

**`content/blog/ar/my-post.mdx`**
```mdx
---
locale: ar
title: "عنوان مقالتي"
description: "وصف موجز للمقال"
date: 2025-01-15
author: "اسمك"
tags: ["تعليمي", "nextjs", "react"]
image: "/images/blog/my-post.jpg"
published: false
---

# عنوان مقالتي

المحتوى هنا...
```

### Blog Post Frontmatter Reference

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `locale` | `"en"` \| `"ar"` | Yes | Language of the content |
| `title` | string | Yes | Post title (max 99 chars) |
| `description` | string | Yes | SEO description (max 999 chars) |
| `date` | YYYY-MM-DD | Yes | Publication date |
| `author` | string | Yes | Author name |
| `tags` | string[] | No | Array of tags |
| `image` | string | No | Cover image path |
| `published` | boolean | No | Set `true` to publish (default: `true`) |

---

## Creating Events

### Method 1: Using Slash Command (Recommended)

```
/create-event nextjs-workshop-2025
```

Claude will ask for:
- Title (English & Arabic)
- Description (English & Arabic)
- Date and time
- Event type (workshop, meetup, hackathon, webinar)
- Status (upcoming, completed, cancelled)
- Speaker, Platform, Location
- Registration/Recording URLs

### Method 2: Manual Creation

**`content/events/en/my-event.mdx`**
```mdx
---
locale: en
title: "Web Development Workshop"
description: "Learn modern web development with Next.js"
date: 2025-02-15
type: workshop
status: upcoming
speaker: "Ahmed Abdat"
platform: "Google Meet"
location: "Online"
image: "/images/events/web-workshop.jpg"
registrationUrl: "https://forms.google.com/..."
published: false
---

# Web Development Workshop

Join us for an exciting workshop on modern web development!

## What You'll Learn

- Next.js 16 fundamentals
- React Server Components
- TypeScript best practices

## Prerequisites

- Basic JavaScript knowledge
- Node.js installed

## Schedule

| Time | Topic |
|------|-------|
| 2:00 PM | Introduction |
| 3:00 PM | Hands-on coding |
| 4:00 PM | Q&A |
```

### Event Frontmatter Reference

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `locale` | `"en"` \| `"ar"` | Yes | Language |
| `title` | string | Yes | Event title |
| `description` | string | Yes | Brief description |
| `date` | YYYY-MM-DD | Yes | Event date |
| `type` | `"workshop"` \| `"meetup"` \| `"hackathon"` \| `"webinar"` | Yes | Event type |
| `status` | `"upcoming"` \| `"completed"` \| `"cancelled"` | No | Event status |
| `speaker` | string | No | Speaker name |
| `platform` | string | No | Where it's held |
| `location` | string | No | Physical location |
| `image` | string | No | Cover image |
| `registrationUrl` | string | No | Registration link |
| `recordingUrl` | string | No | Recording link (for completed events) |
| `published` | boolean | No | Publish status |

---

## Content Workflow

### Complete Workflow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│  STEP 1: CREATE CONTENT                                     │
│                                                             │
│  Option A: /create-event my-new-event                       │
│  Option B: /create-post my-new-post                         │
│  Option C: Manually create MDX files                        │
├─────────────────────────────────────────────────────────────┤
│  STEP 2: ADD IMAGES                                         │
│                                                             │
│  Copy cover image to:                                       │
│  - Blog: public/images/blog/my-post.jpg                     │
│  - Event: public/images/events/my-event.jpg                 │
├─────────────────────────────────────────────────────────────┤
│  STEP 3: WRITE CONTENT                                      │
│                                                             │
│  Edit both files:                                           │
│  - content/blog/en/my-post.mdx                              │
│  - content/blog/ar/my-post.mdx                              │
├─────────────────────────────────────────────────────────────┤
│  STEP 4: SET PUBLISHED                                      │
│                                                             │
│  Change published: false → published: true                  │
├─────────────────────────────────────────────────────────────┤
│  STEP 5: BUILD & TEST                                       │
│                                                             │
│  pnpm build    # Processes MDX with Velite                  │
│  pnpm dev      # Preview locally                            │
│                                                             │
│  Check:                                                     │
│  - http://localhost:3000/en/blog/my-post                    │
│  - http://localhost:3000/ar/blog/my-post                    │
├─────────────────────────────────────────────────────────────┤
│  STEP 6: COMMIT & DEPLOY                                    │
│                                                             │
│  git add content/ public/images/                            │
│  git commit -m "Add new blog post: my-post"                 │
│  git push                                                   │
│                                                             │
│  → Auto-deploys via Vercel/Netlify                          │
└─────────────────────────────────────────────────────────────┘
```

### Quick Commands Reference

| Task | Command |
|------|---------|
| Create blog post | `/create-post [slug]` |
| Create event | `/create-event [slug]` |
| Build project | `pnpm build` |
| Start dev server | `pnpm dev` |
| Process content only | `npx velite build` |

---

## MDX Features

### Supported Markdown

```mdx
# Heading 1
## Heading 2
### Heading 3

**Bold text** and *italic text*

- Bullet list
- Another item

1. Numbered list
2. Second item

> Blockquote

[Link text](https://example.com)

![Alt text](/images/example.jpg)
```

### Code Blocks with Syntax Highlighting

````mdx
```typescript
// TypeScript code with syntax highlighting
function greet(name: string): string {
  return `Hello, ${name}!`;
}
```

```javascript
// JavaScript example
const sum = (a, b) => a + b;
```

```css
/* CSS example */
.container {
  display: flex;
  gap: 1rem;
}
```
````

### Tables

```mdx
| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Row 1    | Data     | Data     |
| Row 2    | Data     | Data     |
```

### Inline Code

```mdx
Use the `useState` hook for state management.
```

---

## Deployment

### Automatic Deployment (Recommended)

When you push to the main branch, the site automatically rebuilds:

1. Velite processes all MDX files
2. Next.js generates static pages
3. Site deploys to Vercel/Netlify

### Manual Build

```bash
# Full build
pnpm build

# Just process content
npx velite build
```

### Environment

The site works with:
- **Node.js**: 18.x or higher
- **pnpm**: 8.x or higher

---

## Troubleshooting

### Content Not Appearing

1. **Check `published: true`** in frontmatter
2. **Verify locale** matches folder (`en/` or `ar/`)
3. **Run `pnpm build`** to process MDX
4. **Clear browser cache**

### Build Errors

```bash
# Rebuild Velite cache
rm -rf .velite
pnpm build
```

### Image Not Loading

1. Check path starts with `/images/`
2. Verify file exists in `public/images/`
3. Check file extension matches

### Translation Not Linking

Ensure both files have:
- Same filename (slug)
- Correct `locale` in frontmatter

---

## Helper Functions

Use these in your pages:

```typescript
import {
  getPostsByLocale,
  getPost,
  getEventsByLocale,
  getEvent,
  formatDate
} from "@/lib/content";

// Get all posts for a locale
const posts = getPostsByLocale("en");

// Get single post
const post = getPost("my-post", "en");

// Format date
const formatted = formatDate("2025-01-15", "ar");
// Output: ١٥ يناير ٢٠٢٥
```

---

## Need Help?

- Check existing content files for examples
- Use slash commands for guided creation
- Ask in the MPC community Discord

---

*Last updated: December 2024*
