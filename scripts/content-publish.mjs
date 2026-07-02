#!/usr/bin/env node

import path from "node:path";
import { access, readFile } from "node:fs/promises";
import { constants } from "node:fs";
import { fileURLToPath } from "node:url";
import { normalizeSlug, setPublishedInMdx, writeFileAtomicUtf8 } from "./content-tools.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, "..");

const rawArgs = process.argv.slice(2);
const shouldPublish = !rawArgs.includes("--unpublish");
const positional = rawArgs.filter((arg) => !arg.startsWith("--"));
const [kindArg, slugArg] = positional;

if (!kindArg || !slugArg) {
  console.error(
    "Usage: node scripts/content-publish.mjs <post|event> <slug> [--unpublish]"
  );
  process.exit(1);
}

const collection = normalizeCollection(kindArg);
const slug = normalizeSlug(slugArg);
const locales = ["en", "ar"];
const targets = locales.map((locale) => {
  const relativePath = `content/${collection}/${locale}/${slug}.mdx`;
  const fullPath = path.join(ROOT, relativePath);
  return { relativePath, fullPath };
});
const missingFiles = [];

for (const { relativePath, fullPath } of targets) {
  try {
    await access(fullPath, constants.F_OK);
  } catch {
    missingFiles.push(relativePath);
  }
}

if (missingFiles.length > 0) {
  console.error("");
  console.error("Missing files:");
  for (const file of missingFiles) {
    console.error(`- ${file}`);
  }
  process.exit(1);
}

for (const { relativePath, fullPath } of targets) {
  const original = await readFile(fullPath, "utf8");
  const updated = setPublishedInMdx(original, shouldPublish);
  await writeFileAtomicUtf8(fullPath, updated);
  console.log(`Updated ${relativePath} -> published: ${shouldPublish}`);
}

console.log("");
console.log(
  shouldPublish
    ? "Content is now marked as published in both locales."
    : "Content is now marked as unpublished in both locales."
);
console.log("Run pnpm content:check && pnpm build before pushing.");

function normalizeCollection(input) {
  const cleaned = String(input || "").toLowerCase();
  if (cleaned === "post" || cleaned === "blog") return "blog";
  if (cleaned === "event" || cleaned === "events") return "events";
  throw new Error(`Unknown content kind "${input}". Use post or event.`);
}
