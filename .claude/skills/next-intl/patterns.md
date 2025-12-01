# next-intl Patterns

## Routing Configuration

```typescript
// src/i18n/routing.ts
import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en', 'ar'],
  defaultLocale: 'en',
  localePrefix: 'as-needed' // /about (en), /ar/about (ar)
})
```

## Middleware

```typescript
// src/middleware.ts
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
}
```

## Request Config

```typescript
// src/i18n/request.ts
import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale
  const locale = routing.locales.includes(requested as any)
    ? requested
    : routing.defaultLocale

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  }
})
```

## Next.js Config

```typescript
// next.config.ts
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

export default withNextIntl({
  // your config
})
```

## Navigation APIs

```typescript
// src/i18n/navigation.ts
import { createNavigation } from 'next-intl/navigation'
import { routing } from './routing'

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing)
```

## Layout with RTL Support

```typescript
// src/app/[locale]/layout.tsx
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'

const rtlLocales = ['ar']

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const messages = await getMessages()
  const dir = rtlLocales.includes(locale) ? 'rtl' : 'ltr'

  return (
    <html lang={locale} dir={dir}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
```

## useTranslations Hook

```typescript
// Server Component
import { useTranslations } from 'next-intl'

export default function Page() {
  const t = useTranslations('HomePage')
  return <h1>{t('title')}</h1>
}

// Client Component
'use client'
import { useTranslations } from 'next-intl'

export default function Button() {
  const t = useTranslations('Common')
  return <button>{t('submit')}</button>
}

// With interpolation
t('welcome', { name: 'Ahmed' }) // "Welcome, {name}!"

// Rich text
t.rich('description', {
  bold: (chunks) => <strong>{chunks}</strong>
})
```

## Message Files

```json
// messages/en.json
{
  "HomePage": {
    "title": "Welcome to MPC",
    "description": "Mauritanian Programmers Community"
  },
  "Common": {
    "submit": "Submit",
    "cancel": "Cancel"
  }
}
```

```json
// messages/ar.json
{
  "HomePage": {
    "title": "مرحبا بكم في MPC",
    "description": "مجتمع مبرمجي موريتانيا"
  },
  "Common": {
    "submit": "إرسال",
    "cancel": "إلغاء"
  }
}
```

## Locale Switcher

```typescript
'use client'
import { useLocale } from 'next-intl'
import { useRouter, usePathname } from '@/i18n/navigation'

export default function LocaleSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale })
  }

  return (
    <div>
      <button onClick={() => switchLocale('en')} disabled={locale === 'en'}>
        English
      </button>
      <button onClick={() => switchLocale('ar')} disabled={locale === 'ar'}>
        العربية
      </button>
    </div>
  )
}
```

## Link Component

```typescript
import { Link } from '@/i18n/navigation'

// Respects current locale
<Link href="/about">About</Link>

// Switch locale
<Link href="/about" locale="ar">عن</Link>
```

## RTL CSS (Tailwind v4)

```html
<!-- Use logical properties -->
<div class="ms-4 me-2 ps-6 pe-4 text-start">
  Content aligned to start (left in LTR, right in RTL)
</div>
```

| LTR | RTL | Tailwind |
|-----|-----|----------|
| margin-left | margin-right | `ms-*` |
| margin-right | margin-left | `me-*` |
| text-left | text-right | `text-start` |
| text-right | text-left | `text-end` |
