import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { spawn } from "node:child_process";
import { access, readFile, unlink, writeFile } from "node:fs/promises";
import { constants } from "node:fs";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, "..", "..");

function uniqueSlug(prefix) {
  return `${prefix}-${randomUUID().slice(0, 8)}`;
}

function sampleEventMdx(locale, slug, published = false) {
  return `---
locale: ${locale}
title: "Sample ${slug}"
description: "Sample description"
date: 2026-01-01
type: workshop
status: upcoming
published: ${published ? "true" : "false"}
---

# Sample ${slug}
`;
}

async function exists(filePath) {
  try {
    await access(filePath, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function safeUnlink(filePath) {
  try {
    await unlink(filePath);
  } catch {
    // Ignore missing files during cleanup.
  }
}

function runProcess(command, args, { cwd = ROOT, input } = {}) {
  return new Promise((resolve) => {
    const child = spawn(command, args, { cwd });
    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (chunk) => {
      stdout += chunk.toString();
    });

    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });

    child.on("close", (code) => {
      resolve({ code, stdout, stderr });
    });

    if (input != null) {
      child.stdin.write(input);
    }
    child.stdin.end();
  });
}

test("content:publish does not partially mutate when one locale file is missing", async () => {
  const slug = uniqueSlug("publish-preflight");
  const enPath = path.join(ROOT, "content", "events", "en", `${slug}.mdx`);
  const arPath = path.join(ROOT, "content", "events", "ar", `${slug}.mdx`);

  await writeFile(enPath, sampleEventMdx("en", slug, false), "utf8");
  await safeUnlink(arPath);

  try {
    const result = await runProcess(process.execPath, [
      "scripts/content-publish.mjs",
      "event",
      slug,
    ]);

    assert.notEqual(result.code, 0, "command should fail when a locale file is missing");
    const updatedEn = await readFile(enPath, "utf8");
    assert.match(
      updatedEn,
      /published:\s*false/,
      "existing locale should remain unchanged when operation fails"
    );
  } finally {
    await safeUnlink(enPath);
    await safeUnlink(arPath);
  }
});

test("create-content preflights both locale targets before writing drafts", async () => {
  const slug = uniqueSlug("create-preflight");
  const enPath = path.join(ROOT, "content", "events", "en", `${slug}.mdx`);
  const arPath = path.join(ROOT, "content", "events", "ar", `${slug}.mdx`);

  await safeUnlink(enPath);
  await writeFile(arPath, sampleEventMdx("ar", slug, false), "utf8");

  try {
    const result = await runProcess(process.execPath, [
      "scripts/create-content.mjs",
      "event",
      slug,
    ]);

    assert.notEqual(result.code, 0, "command should fail when one locale target already exists");
    assert.equal(
      await exists(enPath),
      false,
      "other locale draft must not be created on preflight failure"
    );
  } finally {
    await safeUnlink(enPath);
    await safeUnlink(arPath);
  }
});

test("optimize-images exits non-zero when required source images are missing", async () => {
  const result = await runProcess(process.execPath, ["scripts/optimize-images.mjs"]);
  assert.notEqual(
    result.code,
    0,
    "optimizer should fail when configured input files are absent"
  );
});

test("pre-commit hook stays POSIX-safe under dash when prompt path is hit", async () => {
  const imagePath = path.join(
    ROOT,
    "public",
    "images",
    `__hook-portability-${randomUUID().slice(0, 8)}.jpg`
  );

  await writeFile(imagePath, Buffer.alloc(600 * 1024), "binary");

  try {
    const result = await runProcess("dash", [".husky/pre-commit"], {
      input: "y\n",
    });
    const combinedOutput = `${result.stdout}\n${result.stderr}`;

    assert.equal(result.code, 0, "hook should complete successfully in POSIX shell");
    assert.doesNotMatch(
      combinedOutput,
      /Illegal option -n|\[\[: not found/,
      "hook should avoid bash-only syntax"
    );
  } finally {
    await safeUnlink(imagePath);
  }
});
