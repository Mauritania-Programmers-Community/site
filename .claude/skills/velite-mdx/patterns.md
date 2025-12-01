# Velite MDX Patterns

## Next.js Config Integration (Required for Turbopack)

```typescript
// next.config.ts
import type { NextConfig } from 'next'

const isDev = process.argv.indexOf('dev') !== -1
const isBuild = process.argv.indexOf('build') !== -1
if (!process.env.VELITE_STARTED && (isDev || isBuild)) {
  process.env.VELITE_STARTED = '1'
  import('velite').then(m => m.build({ watch: isDev, clean: !isDev }))
}

const nextConfig: NextConfig = {
  // your config
}

export default nextConfig
```

## Velite Config for MPC

```typescript
// velite.config.ts
import { defineConfig, defineCollection, s } from 'velite'

const events = defineCollection({
  name: 'Event',
  pattern: 'events/**/*.mdx',
  schema: s.object({
    title: s.string().max(99),
    titleAr: s.string().max(99),
    slug: s.slug('events'),
    date: s.isodate(),
    status: s.enum(['upcoming', 'ongoing', 'completed']),
    type: s.enum(['workshop', 'webinar', 'meetup', 'conference']),
    description: s.string(),
    coverImage: s.image(),
    speaker: s.object({
      name: s.string(),
      role: s.string(),
      avatar: s.image().optional()
    }).optional(),
    platform: s.string().optional(),
    youtubeRecording: s.string().url().optional(),
    code: s.mdx(),
  }).transform(data => ({
    ...data,
    permalink: `/events/${data.slug}`
  }))
})

const posts = defineCollection({
  name: 'Post',
  pattern: 'blog/**/*.md',
  schema: s.object({
    title: s.string(),
    slug: s.slug('posts'),
    date: s.isodate(),
    author: s.string(),
    excerpt: s.excerpt(),
    coverImage: s.image(),
    tags: s.array(s.string()),
    metadata: s.metadata(),
    content: s.markdown()
  })
})

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true
  },
  collections: { events, posts }
})
```

## MDX Rendering Component

```typescript
// src/components/mdx/mdx-content.tsx
import * as runtime from 'react/jsx-runtime'

const useMDXComponent = (code: string) => {
  const fn = new Function(code)
  return fn({ ...runtime }).default
}

interface MDXProps {
  code: string
  components?: Record<string, React.ComponentType>
}

export const MDXContent = ({ code, components }: MDXProps) => {
  const Component = useMDXComponent(code)
  return <Component components={components} />
}
```

## Using Content in Pages (Next.js 16)

```typescript
// src/app/[locale]/events/[slug]/page.tsx
import { events } from '@/.velite'
import { MDXContent } from '@/components/mdx/mdx-content'
import { notFound } from 'next/navigation'

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const event = events.find(e => e.slug === slug)

  if (!event) notFound()

  return (
    <article>
      <h1>{event.title}</h1>
      <MDXContent code={event.code} />
    </article>
  )
}

export async function generateStaticParams() {
  return events.map(event => ({ slug: event.slug }))
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const event = events.find(e => e.slug === slug)

  return {
    title: event?.title,
    description: event?.description
  }
}
```

## Content File Example

```mdx
---
title: React Workshop
titleAr: ورشة عمل React
slug: react-workshop-2024
date: 2024-02-15
status: upcoming
type: workshop
description: Learn modern React patterns
coverImage: ./cover.jpg
speaker:
  name: Ahmed
  role: Senior Developer
platform: Discord
---

# Welcome to the Workshop

Regular markdown content here...
```

## Schema Reference

| Schema | Output |
|--------|--------|
| `s.isodate()` | ISO date string |
| `s.slug('events')` | Unique slug |
| `s.image()` | `{ src, width, height, blurDataURL }` |
| `s.metadata()` | `{ readingTime, wordCount }` |
| `s.excerpt()` | Auto excerpt |
| `s.markdown()` | HTML string |
| `s.mdx()` | Function-body string |
| `s.toc()` | Table of contents |

## .gitignore

```
.velite
public/static
```
