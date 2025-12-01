---
description: Create new MPC event with bilingual MDX files (en + ar)
allowed-tools: Write, Read, Glob, Bash(ls:*), Bash(date:*)
argument-hint: [event-slug] - e.g. 'nextjs-workshop-2025'
---

# Create New MPC Event

You are creating a new event for the MPC platform with bilingual support (English + Arabic).

## Current Events

Check existing events:
!`ls -la "/media/ahmed/Ahmed files/web projects/mpc/platform/v1/mpc-platform/content/events/en/" 2>/dev/null || echo "No events yet"`

## Event Slug

The event slug is: **$ARGUMENTS**

If no slug provided, generate one from the event title (lowercase, hyphens, no special chars).

## Task

Create TWO MDX files for the event:

1. **English version**: `content/events/en/$ARGUMENTS.mdx`
2. **Arabic version**: `content/events/ar/$ARGUMENTS.mdx`

## Information to Gather

Ask the user for:

### Required Fields
- **Title (English)**: Event name in English
- **Title (Arabic)**: Event name in Arabic (عنوان الحدث)
- **Description (English)**: Brief description (1-2 sentences)
- **Description (Arabic)**: Brief description in Arabic
- **Date**: Event date (YYYY-MM-DD format)
- **Type**: One of: `workshop`, `meetup`, `hackathon`, `webinar`
- **Status**: One of: `upcoming`, `completed`, `cancelled`

### Optional Fields
- **Speaker**: Speaker name
- **Platform**: Where it's held (Discord, YouTube, Google Meet, In-Person, etc.)
- **Location**: Physical location if in-person
- **Cover Image**: Path to cover image (e.g., `/images/events/event-name.jpg`)
- **Registration URL**: Link to register
- **Recording URL**: Link to recording (if completed)

## English MDX Template

```mdx
---
locale: en
title: "{title_en}"
description: "{description_en}"
date: {date}
type: {type}
status: {status}
speaker: "{speaker}"
platform: "{platform}"
location: "{location}"
image: "{image_path}"
registrationUrl: "{registration_url}"
recordingUrl: "{recording_url}"
published: false
---

# {title_en}

{Event content in English - include sections like:}

## What to Expect

- Point 1
- Point 2
- Point 3

## Who Should Attend

Describe the target audience.

## Details

- **Date**: {formatted_date}
- **Time**: {time}
- **Location/Platform**: {location_or_platform}

{Add more content as needed}
```

## Arabic MDX Template

```mdx
---
locale: ar
title: "{title_ar}"
description: "{description_ar}"
date: {date}
type: {type}
status: {status}
speaker: "{speaker_ar}"
platform: "{platform_ar}"
location: "{location_ar}"
image: "{image_path}"
registrationUrl: "{registration_url}"
recordingUrl: "{recording_url}"
published: false
---

# {title_ar}

{Event content in Arabic - include sections like:}

## ماذا تتوقعون

- النقطة الأولى
- النقطة الثانية
- النقطة الثالثة

## من يجب أن يحضر

وصف الجمهور المستهدف.

## التفاصيل

- **التاريخ**: {formatted_date_ar}
- **الوقت**: {time}
- **المكان/المنصة**: {location_or_platform_ar}

{Add more content as needed}
```

## Workflow

1. Ask user for event details (use the fields above)
2. Generate the slug if not provided
3. Create both MDX files with the gathered information
4. Set `published: false` initially so user can review
5. Show the file paths created
6. Remind user to:
   - Add cover image to `/public/images/events/`
   - Review and edit the content
   - Set `published: true` when ready
   - Run `pnpm build` to process with Velite

## Validation

Before creating files:
- Ensure slug is lowercase with hyphens only (no spaces or special chars)
- Validate date format (YYYY-MM-DD)
- Check if files already exist (warn if overwriting)

## Post-Creation

After creating the files, inform the user:

```
Event files created:
- content/events/en/{slug}.mdx
- content/events/ar/{slug}.mdx

Next steps:
1. Add cover image to: /public/images/events/
2. Review and customize the content
3. Set 'published: true' when ready
4. Run 'pnpm build' to process with Velite
5. Run 'pnpm dev' to preview
```

Now ask me for the event details!
