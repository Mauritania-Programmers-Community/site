#!/usr/bin/env node

import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  findMissingLocalePairs,
  getFrontmatterValues,
  listContentFiles,
  parseContentPath,
  readFileUtf8,
  relativeToRoot,
} from "./content-tools.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, "..");

const files = await listContentFiles(ROOT);
const relativePaths = files.map((file) => relativeToRoot(ROOT, file));
const missingPairs = findMissingLocalePairs(relativePaths);

const index = new Map();

for (const absolutePath of files) {
  const file = relativeToRoot(ROOT, absolutePath);
  const parsed = parseContentPath(file);
  if (!parsed) continue;

  const content = await readFileUtf8(absolutePath);
  const frontmatter = getFrontmatterValues(content);
  const title = frontmatter?.title ? stripQuotes(frontmatter.title) : "";
  const published = parsePublished(frontmatter?.published);

  const key = `${parsed.collection}:${parsed.slug}`;
  if (!index.has(key)) {
    index.set(key, {
      collection: parsed.collection,
      slug: parsed.slug,
      title,
      locales: {},
    });
  }

  const entry = index.get(key);
  if (!entry.title && title) entry.title = title;
  entry.locales[parsed.locale] = published;
}

const entries = Array.from(index.values()).sort((a, b) => {
  const collectionCompare = a.collection.localeCompare(b.collection);
  if (collectionCompare !== 0) return collectionCompare;
  return a.slug.localeCompare(b.slug);
});

const drafts = entries.filter((entry) => {
  const en = entry.locales.en;
  const ar = entry.locales.ar;
  return en !== true || ar !== true;
});

console.log(`Content status summary`);
console.log(`- Files: ${files.length}`);
console.log(`- Content items: ${entries.length}`);
console.log(`- Items missing locale pair: ${missingPairs.length}`);
console.log(`- Draft/unpublished items: ${drafts.length}`);
console.log("");

if (drafts.length > 0) {
  console.log("Drafts / unpublished:");
  for (const entry of drafts) {
    const en = formatState(entry.locales.en);
    const ar = formatState(entry.locales.ar);
    const title = entry.title ? ` (${entry.title})` : "";
    console.log(`- ${entry.collection}/${entry.slug}${title} | en=${en}, ar=${ar}`);
  }
  console.log("");
}

if (missingPairs.length > 0) {
  console.log("Missing locale pairs:");
  for (const pair of missingPairs) {
    console.log(
      `- ${pair.collection}/${pair.slug} | missing: ${pair.missingLocales.join(", ")}`
    );
  }
}

function parsePublished(value) {
  if (!value) return null;
  const normalized = stripQuotes(String(value)).toLowerCase();
  if (normalized === "true") return true;
  if (normalized === "false") return false;
  return null;
}

function stripQuotes(value) {
  return String(value).replace(/^['"]|['"]$/g, "").trim();
}

function formatState(value) {
  if (value === true) return "published";
  if (value === false) return "draft";
  return "unknown";
}
