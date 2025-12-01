# shadcn/ui Registries Reference

## Configured Registries (components.json)

| Registry | URL | Focus |
|----------|-----|-------|
| @shadcn | ui.shadcn.com | Core components |
| @magicui | magicui.design | Animated components (150+) |
| @aceternity | ui.aceternity.com | Modern landing pages |
| @motion-primitives | motion-primitives.com | Motion primitives |
| @animate-ui | animate-ui.com | Animated components |
| @kokonutui | kokonutui.com | Interactive components |
| @shadcnblocks | shadcnblocks.com | Ready-made blocks |
| @tailark | tailark.com | Marketing blocks |
| @cult-ui | cult-ui.com | Framer Motion components |
| @eldoraui | eldoraui.site | Modern UI components |

## Registry Categories

### Core Components (@shadcn)
Essential UI primitives:
- Accordion, Alert, Avatar, Badge
- Button, Card, Checkbox, Dialog
- Form, Input, Label, Select
- Table, Tabs, Toast, Tooltip

### Animation Libraries

#### @magicui
Best for: Landing pages, marketing sites
- `marquee` - Scrolling text/logos
- `globe` - 3D interactive globe
- `particles` - Background particles
- `meteors` - Meteor shower effect
- `blur-fade` - Text blur animations
- `border-beam` - Animated borders
- `shimmer-button` - Shimmering buttons

#### @aceternity
Best for: Hero sections, text effects
- `hero-highlight` - Highlighted hero text
- `text-generate-effect` - Typing animation
- `spotlight` - Spotlight hover effect
- `background-beams` - Beam animations
- `sparkles` - Sparkle effects
- `3d-card` - 3D hover cards

#### @motion-primitives
Best for: Micro-interactions
- `fade` - Fade in/out
- `slide` - Slide transitions
- `scale` - Scale animations
- `blur` - Blur effects
- `accordion` - Animated accordion

#### @animate-ui
Best for: Page transitions
- Animated icons
- Page transitions
- Scroll animations

#### @cult-ui
Best for: Complex interactions
- Framer Motion based
- Composable animations
- Headless patterns

### Block Libraries

#### @shadcnblocks
Pre-built sections:
- Hero sections
- Feature grids
- Pricing tables
- Testimonials
- CTAs

#### @tailark
Marketing focused:
- Landing pages
- Headers/Footers
- Feature sections
- About sections

### Specialized

#### @kokonutui
Stunning interactive components:
- Cards with effects
- Buttons with animations
- Interactive backgrounds

#### @eldoraui
Modern, elegant:
- Clean components
- Performance optimized
- TypeScript first

## Adding Custom Registry

In `components.json`:
```json
{
  "registries": {
    "@my-registry": "https://my-site.com/r/{name}.json"
  }
}
```

## Usage Examples

### Search Best Component for Task
```bash
# Need animated hero? Search:
npx shadcn@latest search @aceternity @magicui -q "hero"

# Need scrolling logos? Search:
npx shadcn@latest search @magicui -q "marquee"

# Need pricing section? Search:
npx shadcn@latest search @shadcnblocks @tailark -q "pricing"
```

### Compare Before Installing
```bash
# View component details
npx shadcn@latest view @magicui/globe @aceternity/globe

# Check dependencies
npx shadcn@latest view @magicui/marquee
```

## Recommended for MPC Platform

| Section | Registry | Component |
|---------|----------|-----------|
| Hero | @aceternity | hero-highlight, sparkles |
| Stats | @magicui | number-ticker |
| Team | @shadcn | avatar, card |
| Events | @shadcnblocks | feature-grid |
| Footer | @tailark | footer-section |
| Animations | @motion-primitives | fade, slide |

## Directory of All Registries

See full list at: https://ui.shadcn.com/docs/directory

Notable additions:
- @assistant-ui - AI chat components
- @plate - Rich text editor
- @supabase - Supabase components
- @clerk - Auth components
