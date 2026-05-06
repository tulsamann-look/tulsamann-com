#!/usr/bin/env node
import { readFile, readdir } from "node:fs/promises";
import { join, basename } from "node:path";

const WRITING_DIR = "src/content/writing";

/**
 * Parse a single post file into { slug, frontmatter, body, linkedSlugs }.
 * Exported for tests; the caller passes raw file contents.
 */
export function parsePost(filename, raw) {
  const slug = basename(filename, ".mdx").replace(/\.md$/, "");
  const frontmatterMatch = raw.match(/^---\n([\s\S]*?)\n---\n?/);
  const frontmatter = {};
  if (frontmatterMatch) {
    for (const line of frontmatterMatch[1].split("\n")) {
      const [key, ...rest] = line.split(":");
      if (!key) continue;
      const value = rest.join(":").trim();
      if (value === "true") frontmatter[key.trim()] = true;
      else if (value === "false") frontmatter[key.trim()] = false;
      else if (value === "" || value === "undefined") frontmatter[key.trim()] = undefined;
      else frontmatter[key.trim()] = value.replace(/^["']|["']$/g, "");
    }
  }

  const body = raw.replace(/^---[\s\S]*?---\n?/, "");
  const linkedSlugs = new Set();
  const linkRegex = /\]\(\/writing\/([a-z0-9-]+)\/?\)/g;
  let match;
  while ((match = linkRegex.exec(body)) !== null) {
    linkedSlugs.add(match[1]);
  }

  return {
    slug,
    frontmatter,
    body,
    linkedSlugs: [...linkedSlugs],
  };
}

/**
 * Audit a list of parsed posts for cluster integrity.
 * Returns { errors: string[], warnings: string[] }.
 * Exported for tests.
 */
export function auditCluster(posts) {
  const published = posts.filter((p) => !p.frontmatter.draft);
  const cornerstone = published.find((p) => p.frontmatter.cornerstone);
  const errors = [];
  const warnings = [];

  if (!cornerstone) {
    return { errors, warnings };
  }

  const cornerstoneSlug = cornerstone.slug;
  const spokes = published.filter((p) => p.frontmatter.spokeOf === cornerstoneSlug);

  for (const spoke of spokes) {
    if (!spoke.linkedSlugs.includes(cornerstoneSlug)) {
      errors.push(
        `Spoke '${spoke.slug}' does not link to its cornerstone '${cornerstoneSlug}'.`
      );
    }
  }

  for (const spoke of spokes) {
    if (!cornerstone.linkedSlugs.includes(spoke.slug)) {
      errors.push(
        `Cornerstone '${cornerstoneSlug}' does not link to spoke '${spoke.slug}'.`
      );
    }
  }

  for (const spoke of spokes) {
    const otherSpokeSlugs = spokes.filter((s) => s.slug !== spoke.slug).map((s) => s.slug);
    const siblingLinks = spoke.linkedSlugs.filter((s) => otherSpokeSlugs.includes(s));
    if (siblingLinks.length < 2 && otherSpokeSlugs.length >= 2) {
      warnings.push(
        `Spoke '${spoke.slug}' has only ${siblingLinks.length} sibling links (siblings). Recommend at least 2 sibling links for cluster compounding.`
      );
    }
  }

  return { errors, warnings };
}

async function main() {
  let files;
  try {
    files = (await readdir(WRITING_DIR)).filter((f) => f.endsWith(".mdx"));
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log(`[cluster-audit] ${WRITING_DIR} does not exist yet — skipping.`);
      return;
    }
    throw err;
  }

  if (files.length === 0) {
    console.log("[cluster-audit] No posts found — skipping.");
    return;
  }

  const posts = [];
  for (const file of files) {
    const raw = await readFile(join(WRITING_DIR, file), "utf8");
    posts.push(parsePost(file, raw));
  }

  const { errors, warnings } = auditCluster(posts);

  if (warnings.length > 0) {
    console.warn("[cluster-audit] Warnings:");
    for (const w of warnings) console.warn(`  ⚠ ${w}`);
  }

  if (errors.length > 0) {
    console.error("[cluster-audit] FAILED:");
    for (const e of errors) console.error(`  ✗ ${e}`);
    process.exit(1);
  }

  console.log(`[cluster-audit] OK — ${posts.length} post(s) checked, ${warnings.length} warning(s).`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
