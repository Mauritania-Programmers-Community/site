#!/usr/bin/env node

import { access, mkdir, writeFile } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { normalizeSlug } from "./content-tools.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, "..");

const [kindArg, slugArg] = process.argv.slice(2);

if (!kindArg || !slugArg) {
  console.error(
    "Usage: node scripts/create-content.mjs <post|event> <slug>\nExample: pnpm create:post intro-to-nextjs"
  );
  process.exit(1);
}

const kind = normalizeKind(kindArg);
const slug = normalizeSlug(slugArg);
const date = new Date().toISOString().slice(0, 10);

const drafts = buildDrafts(kind, slug, date);
const targets = drafts.map((draft) => ({
  ...draft,
  fullPath: path.join(ROOT, draft.relativePath),
}));

for (const target of targets) {
  await ensureNotExists(target.fullPath);
}

for (const target of targets) {
  await mkdir(path.dirname(target.fullPath), { recursive: true });
  await writeFile(target.fullPath, target.content, "utf8");
  console.log(`Created ${target.relativePath}`);
}

console.log("");
console.log(`Next steps:`);
console.log(`1) Fill both files with final text`);
console.log(`2) Set published: true when ready`);
console.log(`3) Run pnpm content:check && pnpm build`);

function normalizeKind(input) {
  const cleaned = String(input || "").toLowerCase();
  if (cleaned === "post" || cleaned === "blog") return "post";
  if (cleaned === "event" || cleaned === "events") return "event";
  throw new Error(`Unknown content kind "${input}". Use "post" or "event".`);
}

function buildDrafts(kind, slug, date) {
  if (kind === "post") {
    return [
      {
        relativePath: `content/blog/en/${slug}.mdx`,
        content: blogTemplateEn(slug, date),
      },
      {
        relativePath: `content/blog/ar/${slug}.mdx`,
        content: blogTemplateAr(slug, date),
      },
    ];
  }

  return [
    {
      relativePath: `content/events/en/${slug}.mdx`,
      content: eventTemplateEn(slug, date),
    },
    {
      relativePath: `content/events/ar/${slug}.mdx`,
      content: eventTemplateAr(slug, date),
    },
  ];
}

async function ensureNotExists(filePath) {
  try {
    await access(filePath, constants.F_OK);
    throw new Error(`File already exists: ${path.relative(ROOT, filePath)}`);
  } catch (error) {
    if (error.code === "ENOENT") return;
    throw error;
  }
}

function blogTemplateEn(slug, date) {
  return `---
locale: en
title: "Draft title for ${slug}"
description: "A short summary (140-180 characters) of what readers will learn."
date: ${date}
author: "mpc"
tags: []
image: "/images/blog/${slug}.webp"
published: false
---

# Draft title for ${slug}

## Why this matters

Explain the real problem this post solves for MPC members.

## What you will learn

- Point 1
- Point 2
- Point 3

## Main content

Add practical steps, examples, and clear outcomes.

## Next action

Tell the reader exactly what to do next.
`;
}

function blogTemplateAr(slug, date) {
  return `---
locale: ar
title: "عنوان تجريبي: ${slug}"
description: "ملخص قصير (140-180 حرف) يوضح الفائدة الرئيسية للقارئ."
date: ${date}
author: "mpc"
tags: []
image: "/images/blog/${slug}.webp"
published: false
---

# عنوان تجريبي: ${slug}

## لماذا هذا مهم

اشرح المشكلة الحقيقية التي يحلها هذا المقال لأعضاء المجتمع.

## ماذا سيتعلم القارئ

- النقطة الأولى
- النقطة الثانية
- النقطة الثالثة

## المحتوى الرئيسي

أضف خطوات عملية وأمثلة ونتائج واضحة.

## الإجراء التالي

اختم بدعوة واضحة للخطوة القادمة.
`;
}

function eventTemplateEn(slug, date) {
  return `---
locale: en
title: "Draft event title for ${slug}"
description: "A clear one-sentence event promise and who should attend."
date: ${date}
type: workshop
status: upcoming
speaker: "mpc"
platform: "Google Meet"
location: "Online"
image: "/images/events/${slug}.webp"
registrationUrl: "https://example.com/register"
published: false
---

# Draft event title for ${slug}

## What this event covers

- Topic 1
- Topic 2
- Topic 3

## Who should join

Describe the target audience and prerequisite level.

## Agenda

| Time | Session |
| --- | --- |
| 18:00 | Opening |
| 18:15 | Main session |
| 19:00 | Q&A |

## Outcome

State what attendees will be able to do after this session.
`;
}

function eventTemplateAr(slug, date) {
  return `---
locale: ar
title: "عنوان فعالية تجريبي: ${slug}"
description: "وعد واضح في جملة واحدة يشرح الفائدة ومن يستفيد من الفعالية."
date: ${date}
type: workshop
status: upcoming
speaker: "mpc"
platform: "Google Meet"
location: "Online"
image: "/images/events/${slug}.webp"
registrationUrl: "https://example.com/register"
published: false
---

# عنوان فعالية تجريبي: ${slug}

## ماذا تغطي هذه الفعالية

- المحور الأول
- المحور الثاني
- المحور الثالث

## من يناسبه الحضور

وضح الفئة المستهدفة والمستوى المطلوب.

## جدول الفعالية

| الوقت | الفقرة |
| --- | --- |
| 18:00 | الافتتاح |
| 18:15 | الجلسة الرئيسية |
| 19:00 | الأسئلة والأجوبة |

## النتيجة المتوقعة

اذكر بوضوح ما الذي سيتمكن الحضور من تطبيقه بعد الجلسة.
`;
}
