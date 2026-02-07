import test from "node:test";
import assert from "node:assert/strict";
import os from "node:os";
import path from "node:path";
import { mkdtemp, readdir, readFile } from "node:fs/promises";

import {
  normalizeSlug,
  findMissingLocalePairs,
  validateContentEntry,
  setPublishedInMdx,
  writeFileAtomicUtf8,
} from "../content-tools.mjs";

test("normalizeSlug creates a clean lowercase slug", () => {
  assert.equal(normalizeSlug("  New Event: Flutter 101!  "), "new-event-flutter-101");
  assert.equal(normalizeSlug("AI___Workshop"), "ai-workshop");
});

test("findMissingLocalePairs reports missing locale versions", () => {
  const result = findMissingLocalePairs([
    "content/events/en/sample-event.mdx",
    "content/events/ar/sample-event.mdx",
    "content/events/en/missing-ar.mdx",
    "content/blog/ar/missing-en.mdx",
  ]);

  assert.deepEqual(result, [
    {
      collection: "blog",
      slug: "missing-en",
      missingLocales: ["en"],
      presentLocales: ["ar"],
    },
    {
      collection: "events",
      slug: "missing-ar",
      missingLocales: ["ar"],
      presentLocales: ["en"],
    },
  ]);
});

test("validateContentEntry validates required blog fields", () => {
  const errors = validateContentEntry({
    collection: "blog",
    locale: "en",
    slug: "hello-world",
    content: `---
locale: en
title: "Hello"
description: "Intro post"
date: 2025-12-20
author: "mpc"
published: true
---

# Hello`,
  });

  assert.deepEqual(errors, []);
});

test("validateContentEntry reports invalid event metadata", () => {
  const errors = validateContentEntry({
    collection: "events",
    locale: "ar",
    slug: "bad-event",
    content: `---
locale: en
title: "Bad Event"
description: "Broken sample"
date: 2025-99-10
status: maybe
published: true
---
`,
  });

  assert.ok(errors.some((line) => line.includes("locale frontmatter")));
  assert.ok(errors.some((line) => line.includes("type")));
  assert.ok(errors.some((line) => line.includes("status")));
  assert.ok(errors.some((line) => line.includes("YYYY-MM-DD")));
});

test("setPublishedInMdx updates existing published flag", () => {
  const input = `---
locale: en
title: "Hello"
published: false
---

# Hello`;

  const output = setPublishedInMdx(input, true);
  assert.match(output, /published:\s*true/);
  assert.doesNotMatch(output, /published:\s*false/);
});

test("setPublishedInMdx inserts published flag when missing", () => {
  const input = `---
locale: en
title: "Hello"
---

# Hello`;

  const output = setPublishedInMdx(input, false);
  assert.match(output, /title:\s*"Hello"\npublished:\s*false/);
});

test("writeFileAtomicUtf8 replaces file content atomically without temp leftovers", async () => {
  const tempDir = await mkdtemp(path.join(os.tmpdir(), "mpc-content-tools-"));
  const targetPath = path.join(tempDir, "entry.mdx");

  await writeFileAtomicUtf8(targetPath, "first");
  await writeFileAtomicUtf8(targetPath, "second");

  const finalContent = await readFile(targetPath, "utf8");
  assert.equal(finalContent, "second");

  const files = await readdir(tempDir);
  assert.deepEqual(files, ["entry.mdx"]);
});
