import { readFile, readdir, rename, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

const SUPPORTED_COLLECTIONS = new Set(["blog", "events"]);
const SUPPORTED_LOCALES = ["en", "ar"];
const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Normalize any user-provided string into a filesystem-safe slug.
 */
export function normalizeSlug(input) {
  const normalized = String(input ?? "")
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  if (!normalized) {
    throw new Error("Slug cannot be empty after normalization.");
  }

  return normalized;
}

function parseContentPathInternal(filePath) {
  const normalizedPath = filePath.replace(/\\/g, "/");
  const match = normalizedPath.match(/content\/(blog|events)\/(en|ar)\/(.+)\.mdx$/);
  if (!match) return null;

  return {
    collection: match[1],
    locale: match[2],
    slug: match[3],
  };
}

/**
 * Detect missing en/ar pair files for each slug in blog/events content.
 */
export function findMissingLocalePairs(filePaths) {
  const pairs = new Map();

  for (const filePath of filePaths) {
    const parsed = parseContentPathInternal(filePath);
    if (!parsed) continue;

    const key = `${parsed.collection}::${parsed.slug}`;
    if (!pairs.has(key)) {
      pairs.set(key, {
        collection: parsed.collection,
        slug: parsed.slug,
        locales: new Set(),
      });
    }
    pairs.get(key).locales.add(parsed.locale);
  }

  return Array.from(pairs.values())
    .map((entry) => {
      const presentLocales = SUPPORTED_LOCALES.filter((locale) =>
        entry.locales.has(locale)
      );
      const missingLocales = SUPPORTED_LOCALES.filter(
        (locale) => !entry.locales.has(locale)
      );

      return {
        collection: entry.collection,
        slug: entry.slug,
        presentLocales,
        missingLocales,
      };
    })
    .filter((entry) => entry.missingLocales.length > 0)
    .sort((a, b) => {
      const collectionCompare = a.collection.localeCompare(b.collection);
      if (collectionCompare !== 0) return collectionCompare;
      return a.slug.localeCompare(b.slug);
    });
}

function getFrontmatterBlock(content) {
  const normalized = content.replace(/\r\n/g, "\n");
  const match = normalized.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match) return null;
  return match[1];
}

function parseFrontmatter(frontmatter) {
  const values = {};
  for (const rawLine of frontmatter.split("\n")) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;

    const match = line.match(/^([A-Za-z0-9_]+)\s*:\s*(.+)\s*$/);
    if (!match) continue;
    values[match[1]] = match[2];
  }
  return values;
}

export function getFrontmatterValues(content) {
  const frontmatter = getFrontmatterBlock(content);
  if (!frontmatter) return null;
  return parseFrontmatter(frontmatter);
}

function cleanValue(raw) {
  if (raw == null) return "";
  return String(raw).replace(/^['"]|['"]$/g, "").trim();
}

function hasBooleanLike(raw) {
  return /^(true|false)$/i.test(cleanValue(raw));
}

function isIsoDateString(raw) {
  const value = cleanValue(raw);
  if (!ISO_DATE_REGEX.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(parsed.getTime())) return false;
  return parsed.toISOString().slice(0, 10) === value;
}

function isHttpUrl(raw) {
  const value = cleanValue(raw);
  if (!value) return true;
  return /^https?:\/\/.+/i.test(value);
}

/**
 * Validate one MDX content file against baseline constraints for production checks.
 */
export function validateContentEntry({ collection, locale, slug, content }) {
  const errors = [];
  if (!SUPPORTED_COLLECTIONS.has(collection)) {
    errors.push(`Unsupported collection "${collection}".`);
    return errors;
  }
  if (!SUPPORTED_LOCALES.includes(locale)) {
    errors.push(`Unsupported locale "${locale}".`);
    return errors;
  }

  const frontmatterValues = getFrontmatterValues(content);
  if (!frontmatterValues) {
    errors.push("Missing YAML frontmatter block.");
    return errors;
  }

  const values = frontmatterValues;
  const required = ["locale", "title", "description", "date"];
  if (collection === "blog") required.push("author");
  if (collection === "events") required.push("type");

  for (const field of required) {
    if (!values[field] || !cleanValue(values[field])) {
      errors.push(`Missing required field "${field}".`);
    }
  }

  if (values.locale && cleanValue(values.locale) !== locale) {
    errors.push(
      `Path locale "${locale}" does not match locale frontmatter "${cleanValue(values.locale)}".`
    );
  }

  if (values.date && !isIsoDateString(values.date)) {
    errors.push(`Field "date" must use YYYY-MM-DD and a valid calendar date.`);
  }

  if (values.published && !hasBooleanLike(values.published)) {
    errors.push(`Field "published" must be true or false.`);
  }

  if (values.image && !cleanValue(values.image).startsWith("/images/")) {
    errors.push(`Field "image" should start with "/images/".`);
  }

  if (collection === "events") {
    const eventTypes = new Set(["workshop", "meetup", "hackathon", "webinar"]);
    const statuses = new Set(["upcoming", "completed", "cancelled"]);

    if (values.type && !eventTypes.has(cleanValue(values.type))) {
      errors.push(`Field "type" must be one of: workshop, meetup, hackathon, webinar.`);
    }
    if (values.status && !statuses.has(cleanValue(values.status))) {
      errors.push(`Field "status" must be one of: upcoming, completed, cancelled.`);
    }
    if (values.endDate && !isIsoDateString(values.endDate)) {
      errors.push(`Field "endDate" must use YYYY-MM-DD and a valid calendar date.`);
    }
    if (values.registrationUrl && !isHttpUrl(values.registrationUrl)) {
      errors.push(`Field "registrationUrl" must be a valid http(s) URL.`);
    }
    if (values.recordingUrl && !isHttpUrl(values.recordingUrl)) {
      errors.push(`Field "recordingUrl" must be a valid http(s) URL.`);
    }
  }

  if (collection === "blog" && values.author) {
    const author = cleanValue(values.author);
    if (!/^[a-z0-9-]+$/i.test(author)) {
      errors.push(`Field "author" should use a stable key (letters, numbers, hyphens).`);
    }
  }

  if (!slug || /(^\/|\/$)/.test(slug)) {
    errors.push(`Invalid slug "${slug}" from file path.`);
  }

  return errors;
}

export function setPublishedInMdx(content, published) {
  const normalized = content.replace(/\r\n/g, "\n");
  const match = normalized.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match) {
    throw new Error("Missing YAML frontmatter block.");
  }

  const frontmatter = match[1];
  const newValue = `published: ${published ? "true" : "false"}`;
  let nextFrontmatter;

  if (/^published\s*:/m.test(frontmatter)) {
    nextFrontmatter = frontmatter.replace(
      /^published\s*:\s*.+$/m,
      newValue
    );
  } else {
    nextFrontmatter = `${frontmatter}\n${newValue}`;
  }

  return normalized.replace(
    /^---\n[\s\S]*?\n---\n?/,
    `---\n${nextFrontmatter}\n---\n`
  );
}

export async function listContentFiles(rootDir) {
  const contentRoot = path.join(rootDir, "content");
  const files = [];

  async function walk(currentDir) {
    const entries = await readdir(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const nextPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        await walk(nextPath);
      } else if (entry.isFile() && entry.name.endsWith(".mdx")) {
        files.push(nextPath);
      }
    }
  }

  await walk(contentRoot);
  return files;
}

export async function readFileUtf8(filePath) {
  return readFile(filePath, "utf8");
}

export async function writeFileAtomicUtf8(filePath, content) {
  const tempPath = `${filePath}.${randomUUID()}.tmp`;

  try {
    await writeFile(tempPath, content, "utf8");
    await rename(tempPath, filePath);
  } catch (error) {
    try {
      await unlink(tempPath);
    } catch {
      // Best-effort cleanup for temp files.
    }
    throw error;
  }
}

export function relativeToRoot(rootDir, targetPath) {
  return path.relative(rootDir, targetPath).replace(/\\/g, "/");
}

export function parseContentPath(filePath) {
  return parseContentPathInternal(filePath);
}
