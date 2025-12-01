# Next.js 16 Async Params Patterns

## Page with Async Params

```typescript
type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Page({ params, searchParams }: Props) {
  const { slug } = await params
  const { query } = await searchParams

  return <h1>Post: {slug}</h1>
}
```

## generateMetadata with Async Params

```typescript
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const data = await fetchData(slug)

  return {
    title: data.title,
    description: data.description,
  }
}
```

## Layout with Async Params

```typescript
export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  )
}
```

## Client Component with React.use()

```typescript
'use client'

import { use } from 'react'

type Props = {
  params: Promise<{ slug: string }>
}

export default function ClientPage({ params }: Props) {
  const { slug } = use(params)
  return <h1>{slug}</h1>
}
```

## Route Handler

```typescript
import type { NextRequest } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  return Response.json({ id })
}
```

## generateStaticParams

```typescript
export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((post) => ({ slug: post.slug }))
}
```

## Multi-segment Dynamic Route

```typescript
// app/[locale]/events/[slug]/page.tsx
type Props = {
  params: Promise<{ locale: string; slug: string }>
}

export default async function Page({ params }: Props) {
  const { locale, slug } = await params
  return <h1>{locale} - {slug}</h1>
}
```
