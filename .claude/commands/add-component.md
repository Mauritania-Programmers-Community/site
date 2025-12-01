---
description: Add shadcn/ui components from any registry with search, preview, and examples
allowed-tools: mcp__shadcn__*, Bash, Read, Glob
argument-hint: "[component-name or search query]"
---

# Add shadcn/ui Component

You are helping the user add shadcn/ui components to their project.

## User Request
$ARGUMENTS

## Workflow

### 1. Get Available Registries
First, check which registries are configured:
```
Use mcp__shadcn__get_project_registries to list available registries
```

### 2. Search for Component
If the user provided a component name, search across all registries:
```
Use mcp__shadcn__search_items_in_registries with:
- registries: ["@shadcn", "@magicui", "@aceternity", "@motion-primitives", "@animate-ui", "@kokonutui", "@shadcnblocks", "@tailark"]
- query: "{user's search term}"
```

### 3. Show Component Details
Once found, view the component details:
```
Use mcp__shadcn__view_items_in_registries with the component name
```

### 4. Get Usage Examples
Show usage examples for the component:
```
Use mcp__shadcn__get_item_examples_from_registries with:
- registries: ["{registry}"]
- query: "{component-name}-demo" or "{component-name} example"
```

### 5. Generate Add Command
Get the CLI command to add the component:
```
Use mcp__shadcn__get_add_command_for_items with the full item path
```

### 6. Install Component
Run the add command:
```bash
npx shadcn@latest add @{registry}/{component} --overwrite
```

### 7. Post-Install Checklist
After installation, use:
```
Use mcp__shadcn__get_audit_checklist to verify installation
```

## CLI Reference

| Command | Description |
|---------|-------------|
| `npx shadcn@latest add button` | Add from @shadcn |
| `npx shadcn@latest add @magicui/marquee` | Add from @magicui |
| `npx shadcn@latest search @shadcn -q "button"` | Search registry |
| `npx shadcn@latest view @magicui/globe` | Preview before install |
| `npx shadcn@latest list @shadcn` | List all items |

## Popular Registries

| Registry | Focus |
|----------|-------|
| @shadcn | Core components |
| @magicui | Animated components (150+) |
| @aceternity | Modern landing page components |
| @motion-primitives | Motion/animation primitives |
| @animate-ui | Animated UI components |
| @kokonutui | Stunning interactive components |
| @shadcnblocks | Ready-made blocks |
| @tailark | Marketing website blocks |

## Output
- Show component preview/details
- Display usage examples
- Provide the exact CLI command
- Run installation if user confirms
- Show any required dependencies
