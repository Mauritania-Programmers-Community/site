// Minimal config for shadcn compatibility - Tailwind v4 uses CSS-first approach
// Actual theme configuration is in src/app/globals.css via @theme directive

import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

export default config
