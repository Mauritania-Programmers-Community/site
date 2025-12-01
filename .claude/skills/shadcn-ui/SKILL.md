---
name: shadcn-ui
description: shadcn/ui component library patterns, CLI usage, and registry system
---

# shadcn/ui Skill

This skill covers shadcn/ui component library usage, CLI commands, registry system, and best practices.

## When This Skill Applies

- Adding new UI components
- Searching for components across registries
- Customizing shadcn/ui components
- Using the shadcn CLI
- Working with multiple registries

## Quick Reference

### CLI Commands

```bash
# Initialize project
npx shadcn@latest init

# Add component from default registry
npx shadcn@latest add button

# Add from specific registry
npx shadcn@latest add @magicui/marquee

# Search across registries
npx shadcn@latest search @shadcn @magicui -q "animation"

# List all items in a registry
npx shadcn@latest list @shadcn

# View component before installing
npx shadcn@latest view @aceternity/hero
```

### MCP Tools Available

Use the shadcn MCP server tools:
- `mcp__shadcn__get_project_registries` - List configured registries
- `mcp__shadcn__search_items_in_registries` - Search for components
- `mcp__shadcn__view_items_in_registries` - View component details
- `mcp__shadcn__get_item_examples_from_registries` - Get usage examples
- `mcp__shadcn__get_add_command_for_items` - Get CLI add command
- `mcp__shadcn__get_audit_checklist` - Post-install verification

## Related Files

- `components.json` - Project configuration
- `src/components/ui/` - UI components location
- `src/lib/utils.ts` - cn() utility function

## See Also

- [patterns.md](./patterns.md) - Detailed code patterns
- [registries.md](./registries.md) - Registry reference
