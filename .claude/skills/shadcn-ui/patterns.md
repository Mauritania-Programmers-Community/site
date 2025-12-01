# shadcn/ui Patterns

## Component Installation

### Basic Add
```bash
# Single component
npx shadcn@latest add button

# Multiple components
npx shadcn@latest add button card dialog

# From specific registry
npx shadcn@latest add @magicui/globe

# Force overwrite
npx shadcn@latest add button --overwrite
```

### Search & Discover
```bash
# Search with query
npx shadcn@latest search @shadcn -q "date"

# Search multiple registries
npx shadcn@latest search @shadcn @magicui @aceternity -q "hero"

# List all items
npx shadcn@latest list @magicui
```

## Component Usage

### Import Pattern
```typescript
// shadcn components
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

// cn utility for conditional classes
import { cn } from "@/lib/utils"
```

### Button Variants
```tsx
<Button variant="default">Default</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Sizes
<Button size="default">Default</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Icon /></Button>
```

### Card Pattern
```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    Content here
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### Dialog Pattern
```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>Description</DialogDescription>
    </DialogHeader>
    <div>Content</div>
    <DialogFooter>
      <Button>Save</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Form with React Hook Form
```tsx
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

function MyForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
```

## cn() Utility

```typescript
import { cn } from "@/lib/utils"

// Conditional classes
<div className={cn(
  "base-classes",
  isActive && "active-classes",
  variant === "primary" && "primary-classes"
)}>
```

## Customization

### Extending Components
```tsx
// Create variant wrapper
const PrimaryButton = ({ className, ...props }) => (
  <Button
    className={cn("bg-mpc-green hover:bg-mpc-green/90", className)}
    {...props}
  />
)
```

### Theme Variables (globals.css)
```css
@theme {
  /* Override shadcn defaults */
  --color-primary: var(--color-mpc-green);
  --color-primary-foreground: #ffffff;

  /* Custom colors */
  --color-mpc-green: #4CAF50;
  --color-mpc-gold: #FFC107;
}
```

## Registry Dependencies

### In custom registry items
```json
{
  "name": "custom-component",
  "type": "registry:ui",
  "registryDependencies": [
    "@shadcn/button",
    "@shadcn/card",
    "@magicui/marquee"
  ],
  "dependencies": ["framer-motion"],
  "files": [...]
}
```

## Common Components for MPC

| Component | Use Case |
|-----------|----------|
| Button | CTAs, form actions |
| Card | Event cards, team cards |
| Dialog | Modals, confirmations |
| Tabs | Content organization |
| Avatar | Team members, users |
| Badge | Status, tags |
| Skeleton | Loading states |
| Toast/Sonner | Notifications |
| Navigation Menu | Main nav |
| Sheet | Mobile menu |

## Animation Registries

### @magicui
```bash
npx shadcn@latest add @magicui/marquee    # Scrolling text
npx shadcn@latest add @magicui/globe      # 3D globe
npx shadcn@latest add @magicui/particles  # Particle effects
```

### @aceternity
```bash
npx shadcn@latest add @aceternity/hero-highlight
npx shadcn@latest add @aceternity/text-generate-effect
npx shadcn@latest add @aceternity/sparkles
```

### @motion-primitives
```bash
npx shadcn@latest add @motion-primitives/fade
npx shadcn@latest add @motion-primitives/slide
npx shadcn@latest add @motion-primitives/scale
```
