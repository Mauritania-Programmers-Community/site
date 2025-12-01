# Tailwind CSS v4 Patterns

## Complete MPC Theme Setup

```css
/* src/app/globals.css */
@import "tailwindcss";

@theme {
  /* MPC Brand Colors */
  --color-mpc-green: #4CAF50;
  --color-mpc-gold: #FFC107;
  --color-background: #0A0A0A;
  --color-foreground: #FAFAFA;

  /* Fonts */
  --font-display: "Cairo", sans-serif;
  --font-body: "Inter", sans-serif;
  --font-code: "JetBrains Mono", monospace;
}

/* Dark mode with class toggle */
@custom-variant dark (&:where(.dark, .dark *));
```

## Using Custom Colors

```html
<div class="bg-mpc-green text-foreground">
  <h1 class="text-mpc-gold">MPC Platform</h1>
</div>
```

## Dark Mode Setup

```css
/* Class-based toggle (recommended) */
@custom-variant dark (&:where(.dark, .dark *));

/* Data attribute based */
@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));
```

```html
<html class="dark">
  <div class="bg-white dark:bg-gray-900">
    <p class="text-gray-900 dark:text-gray-100">Content</p>
  </div>
</html>
```

## RTL Support (Arabic)

Use logical properties instead of physical:

| Physical | Logical | Tailwind |
|----------|---------|----------|
| margin-left | margin-inline-start | `ms-*` |
| margin-right | margin-inline-end | `me-*` |
| padding-left | padding-inline-start | `ps-*` |
| padding-right | padding-inline-end | `pe-*` |
| left | inset-inline-start | `start-*` |
| right | inset-inline-end | `end-*` |

```html
<!-- Works in both LTR (English) and RTL (Arabic) -->
<div class="ms-4 me-2 ps-6 pe-4">
  Content
</div>
```

## Referencing Variables (use inline)

```css
@theme inline {
  --color-primary: var(--color-mpc-green);
  --font-sans: var(--font-body);
}
```

## Override Default Colors

```css
@theme {
  /* Remove all default colors */
  --color-*: initial;

  /* Add only your colors */
  --color-primary: #4CAF50;
  --color-secondary: #FFC107;
  --color-background: #0A0A0A;
  --color-foreground: #FAFAFA;
}
```

## Access in JavaScript

```typescript
// Get CSS variable value
const styles = getComputedStyle(document.documentElement)
const green = styles.getPropertyValue('--color-mpc-green')

// Framer Motion
<motion.div animate={{ backgroundColor: "var(--color-mpc-green)" }} />
```
