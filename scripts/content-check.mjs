#!/usr/bin/env node

import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  findMissingLocalePairs,
  listContentFiles,
  parseContentPath,
  readFileUtf8,
  relativeToRoot,
  validateContentEntry,
} from "./content-tools.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, "..");

try {
  const files = await listContentFiles(ROOT);
  const relativePaths = files.map((file) => relativeToRoot(ROOT, file));

  const pairIssues = findMissingLocalePairs(relativePaths);
  const entryIssues = [];

  for (const filePath of files) {
    const relativePath = relativeToRoot(ROOT, filePath);
    const parsed = parseContentPath(relativePath);
    if (!parsed) continue;

    let content;
    try {
      content = await readFileUtf8(filePath);
    } catch (error) {
      entryIssues.push({
        file: relativePath,
        errors: [
          `Failed to read file: ${error instanceof Error ? error.message : String(error)}`,
        ],
      });
      continue;
    }

    const errors = validateContentEntry({
      collection: parsed.collection,
      locale: parsed.locale,
      slug: parsed.slug,
      content,
    });

    if (errors.length > 0) {
      entryIssues.push({
        file: relativePath,
        errors,
      });
    }
  }

  if (pairIssues.length === 0 && entryIssues.length === 0) {
    console.log(`content:check passed (${files.length} files validated)`);
    process.exit(0);
  }

  if (pairIssues.length > 0) {
    console.error("Locale pair issues:");
    for (const issue of pairIssues) {
      console.error(
        `- ${issue.collection}/${issue.slug}: missing [${issue.missingLocales.join(", ")}], present [${issue.presentLocales.join(", ")}]`
      );
    }
  }

  if (entryIssues.length > 0) {
    if (pairIssues.length > 0) console.error("");
    console.error("Frontmatter/content issues:");
    for (const issue of entryIssues) {
      console.error(`- ${issue.file}`);
      for (const error of issue.errors) {
        console.error(`  - ${error}`);
      }
    }
  }

  process.exit(1);
} catch (error) {
  console.error(
    `content:check failed: ${error instanceof Error ? error.message : String(error)}`
  );
  process.exit(1);
}
