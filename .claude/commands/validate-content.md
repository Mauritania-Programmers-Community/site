---
description: Validate MDX content files against Velite schema
allowed-tools: Read, Glob, Bash(npx velite:*)
argument-hint: Optional file path or glob pattern to validate
---

# Validate Content Files

Validate MDX content files to ensure they only use valid schema fields.

## What to Validate

If argument provided: Validate specific file(s) matching the pattern
If no argument: Validate all content files (blog + events)

## Valid Schema Fields

### Blog Posts (`content/blog/{en,ar}/*.mdx`)

**Required:**
- `locale`: `en` or `ar`
- `title`: string (max 99 chars)
- `description`: string (max 999 chars)
- `date`: YYYY-MM-DD format
- `author`: string (must exist in `src/lib/authors.ts`)

**Optional:**
- `published`: boolean (default: true)
- `image`: string (image path)
- `tags`: string[] (default: [])

**Auto-generated (don't add manually):**
- `slug`, `baseSlug`, `slugAsParams`, `permalink`, `readingTime`, `body`

### Events (`content/events/{en,ar}/*.mdx`)

**Required:**
- `locale`: `en` or `ar`
- `title`: string (max 99 chars)
- `description`: string (max 999 chars)
- `date`: YYYY-MM-DD format
- `type`: `workshop` | `meetup` | `hackathon` | `webinar`

**Optional:**
- `status`: `upcoming` | `completed` | `cancelled` (default: upcoming)
- `published`: boolean (default: true)
- `speaker`: string
- `platform`: string
- `location`: string
- `endDate`: YYYY-MM-DD format
- `image`: string (image path)
- `registrationUrl`: string (URL)
- `recordingUrl`: string (URL)

**Auto-generated (don't add manually):**
- `slug`, `baseSlug`, `slugAsParams`, `permalink`, `body`

## Validation Steps

1. **Find files to validate**
   - Use Glob to find MDX files based on argument or validate all

2. **Read and parse frontmatter**
   - Extract YAML frontmatter from each file
   - Parse fields and their values

3. **Check for invalid fields**
   - Compare against valid schema fields above
   - Report any fields not in the schema
   - Check for auto-generated fields that shouldn't be manually added

4. **Validate field values**
   - Check required fields are present
   - Validate enum values (type, status, locale)
   - Check date formats (YYYY-MM-DD)
   - Validate string length limits (title ≤ 99, description ≤ 999)

5. **Report results**
   - List all invalid/unknown fields found
   - Show which files have issues
   - Suggest corrections

## Best Practice Check

Also run Velite build to catch schema violations:

```bash
npx velite --clean
```

This will show Velite's own validation errors.

## Example Output Format

```
Validating content files...

❌ content/events/en/my-event.mdx
  - Invalid field: videoUrl (use 'recordingUrl' instead)
  - Invalid field: meetUrl (not in schema)

✅ content/events/ar/my-event.mdx
  - No issues found

Summary:
- 2 files checked
- 1 file with issues
- 2 invalid fields found
```

Start validation now!
