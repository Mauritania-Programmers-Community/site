---
description: Create new blog post with bilingual MDX files (en + ar)
allowed-tools: Write, Read, Glob, Bash(ls:*), Bash(date:*)
argument-hint: [post-slug] - e.g. 'getting-started-with-nextjs'
---

# Create New MPC Blog Post

You are creating a new blog post for the MPC platform with bilingual support (English + Arabic).

## Current Posts

Check existing posts:
!`ls -la "/media/ahmed/Ahmed files/web projects/mpc/platform/v1/mpc-platform/content/blog/en/" 2>/dev/null || echo "No posts yet"`

## Post Slug

The post slug is: **$ARGUMENTS**

If no slug provided, generate one from the post title (lowercase, hyphens, no special chars).

## Task

Create TWO MDX files for the blog post:

1. **English version**: `content/blog/en/$ARGUMENTS.mdx`
2. **Arabic version**: `content/blog/ar/$ARGUMENTS.mdx`

## Information to Gather

Ask the user for:

### Required Fields
- **Title (English)**: Post title in English
- **Title (Arabic)**: Post title in Arabic (عنوان المقال)
- **Description (English)**: SEO description / excerpt (1-2 sentences)
- **Description (Arabic)**: SEO description in Arabic
- **Author**: Author name (default: "MPC Team")
- **Tags**: Comma-separated tags (e.g., "nextjs, react, tutorial")

### Optional Fields
- **Cover Image**: Path to cover image (e.g., `/images/blog/post-name.jpg`)
- **Published**: Set to true to publish immediately (default: false)

## English MDX Template

```mdx
---
locale: en
title: "{title_en}"
description: "{description_en}"
date: {today_date}
author: "{author}"
tags: [{tags_array}]
image: "{image_path}"
published: false
---

# {title_en}

{Introduction paragraph - hook the reader}

## Section 1

{Content for section 1}

## Section 2

{Content for section 2}

## Code Example

```typescript
// Example code
console.log("Hello, MPC!");
```

## Conclusion

{Wrap up the post}

---

*Have questions? Join our [Discord community](https://discord.gg/mpc) to discuss!*
```

## Arabic MDX Template

```mdx
---
locale: ar
title: "{title_ar}"
description: "{description_ar}"
date: {today_date}
author: "{author_ar}"
tags: [{tags_array_ar}]
image: "{image_path}"
published: false
---

# {title_ar}

{مقدمة - اجذب القارئ}

## القسم الأول

{محتوى القسم الأول}

## القسم الثاني

{محتوى القسم الثاني}

## مثال على الكود

```typescript
// مثال على الكود
console.log("مرحباً، MPC!");
```

## الخاتمة

{اختتم المقال}

---

*هل لديك أسئلة؟ انضم إلى [مجتمعنا على Discord](https://discord.gg/mpc) للنقاش!*
```

## Workflow

1. Ask user for post details (use the fields above)
2. Generate the slug if not provided
3. Create both MDX files with the gathered information
4. Set `published: false` initially so user can review
5. Show the file paths created
6. Remind user to:
   - Add cover image to `/public/images/blog/`
   - Write the full content
   - Set `published: true` when ready
   - Run `pnpm build` to process with Velite

## Tag Suggestions

Common tags for MPC blog posts:
- **Technical**: `nextjs`, `react`, `typescript`, `javascript`, `css`, `tailwind`, `api`
- **Topics**: `tutorial`, `guide`, `tips`, `best-practices`, `performance`
- **Community**: `announcement`, `event`, `community`, `update`, `news`
- **Arabic**: `تعليمي`, `دليل`, `نصائح`, `إعلان`, `مجتمع`

## Validation

Before creating files:
- Ensure slug is lowercase with hyphens only (no spaces or special chars)
- Validate tags are properly formatted
- Check if files already exist (warn if overwriting)
- Use today's date if not specified

## Post-Creation

After creating the files, inform the user:

```
Blog post files created:
- content/blog/en/{slug}.mdx
- content/blog/ar/{slug}.mdx

Next steps:
1. Add cover image to: /public/images/blog/
2. Write the full content in both files
3. Set 'published: true' when ready
4. Run 'pnpm build' to process with Velite
5. Run 'pnpm dev' to preview at /en/blog/{slug} and /ar/blog/{slug}
```

## Example Usage

```
/create-post getting-started-with-mpc
```

Then provide:
- Title: "Getting Started with MPC"
- Title (AR): "البدء مع مجتمع مبرمجي موريتانيا"
- Description: "Learn how to join and participate in Mauritania Programmers Community"
- Author: "Ahmed Abdat"
- Tags: community, guide, getting-started

Now ask me for the blog post details!
