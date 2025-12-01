# MPC Platform

Official website for **Mauritania Programmers Community** (مجتمع مبرمجي موريتانيا) - the largest programming community in Mauritania with 880+ members.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui
- **Content:** Velite (MDX)
- **i18n:** next-intl (English + Arabic with RTL)
- **Animations:** Framer Motion

## Getting Started

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
mpc-platform/
├── src/
│   ├── app/[locale]/      # Pages with i18n routing
│   ├── components/        # React components
│   │   ├── ui/            # shadcn/ui components
│   │   ├── sections/      # Page sections
│   │   ├── layout/        # Navbar, Footer
│   │   └── heroes/        # Hero section variants
│   ├── lib/               # Utilities
│   └── i18n/              # Internationalization
├── content/               # MDX content
│   ├── blog/              # Blog posts (en/ar)
│   └── events/            # Events (en/ar)
├── data/                  # JSON data files
├── messages/              # i18n translations
└── public/                # Static assets
```

## Features

- Bilingual support (English/Arabic) with RTL
- Blog system with MDX
- Events management
- Team showcase
- Dark mode
- Responsive design
- Animated hero sections

## Content Management

Create new content using slash commands:
```bash
/create-post [slug]    # Create bilingual blog post
/create-event [slug]   # Create bilingual event
```

See `CONTENT-GUIDE.md` for full documentation.

## Team

- **Founder:** Deidin
- **AI & Web Lead:** Ahmed Abdat
- **Security Lead:** Aziz
- **General Supervisor:** Mohamed Salem

## Links

- **Community:** [WhatsApp Group](https://chat.whatsapp.com/mpc)
- **Founded:** September 21, 2024

## License

MIT
