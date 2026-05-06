#!/usr/bin/env node
/**
 * Generate OG images for /writing posts.
 *
 * Usage:
 *   node scripts/build-og-image.mjs --all       Generate for every published post
 *   node scripts/build-og-image.mjs <slug>      Generate for a single post
 *
 * Reads from src/content/writing/, renders the /og-template/<slug>/ page
 * via Playwright + Chromium, and saves a 1200x630 PNG to public/og/<slug>.png.
 *
 * Skips a post if a custom ogImage frontmatter field is set (means user
 * provided their own image already).
 */
import { chromium } from "playwright";
import { readFile, readdir, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { spawn } from "node:child_process";
import { join, basename } from "node:path";

const WRITING_DIR = "src/content/writing";
const OG_DIR = "public/og";
const PREVIEW_PORT = 4321;

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const fm = {};
  for (const line of match[1].split("\n")) {
    const [k, ...rest] = line.split(":");
    if (!k) continue;
    const v = rest.join(":").trim();
    if (v === "true") fm[k.trim()] = true;
    else if (v === "false") fm[k.trim()] = false;
    else if (v === "" || v === "undefined") fm[k.trim()] = undefined;
    else fm[k.trim()] = v.replace(/^["']|["']$/g, "");
  }
  return fm;
}

async function listPostSlugs() {
  if (!existsSync(WRITING_DIR)) return [];
  const files = (await readdir(WRITING_DIR)).filter((f) => f.endsWith(".mdx"));
  const slugs = [];
  for (const file of files) {
    const raw = await readFile(join(WRITING_DIR, file), "utf8");
    const fm = parseFrontmatter(raw);
    if (fm.draft === true) continue;
    if (fm.ogImage) continue;
    slugs.push(basename(file, ".mdx"));
  }
  return slugs;
}

async function startPreviewServer() {
  console.log("[og] Building site for preview...");
  const build = spawn("pnpm", ["build:fast"], { stdio: "inherit" });
  await new Promise((resolve, reject) => {
    build.on("exit", (code) => (code === 0 ? resolve() : reject(new Error(`build exit ${code}`))));
  });

  console.log("[og] Starting preview server...");
  const server = spawn("pnpm", ["preview", "--port", String(PREVIEW_PORT)], {
    stdio: ["ignore", "pipe", "inherit"],
  });

  await new Promise((resolve) => {
    server.stdout.on("data", (chunk) => {
      if (chunk.toString().includes("localhost")) resolve();
    });
    setTimeout(resolve, 5000);
  });

  return server;
}

async function renderOg(browser, slug) {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 2,
  });
  const url = `http://localhost:${PREVIEW_PORT}/og-template/${slug}/`;
  console.log(`[og] Rendering ${url}`);
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForSelector("[data-og-frame]");
  const buffer = await page.locator("[data-og-frame]").screenshot({ type: "png" });
  await page.close();
  return buffer;
}

async function main() {
  const args = process.argv.slice(2);
  let slugs;
  if (args.includes("--all")) {
    slugs = await listPostSlugs();
  } else if (args.length === 1) {
    slugs = [args[0]];
  } else {
    console.error("Usage: node scripts/build-og-image.mjs --all | <slug>");
    process.exit(1);
  }

  if (slugs.length === 0) {
    console.log("[og] No posts to render.");
    return;
  }

  await mkdir(OG_DIR, { recursive: true });

  const server = await startPreviewServer();
  const browser = await chromium.launch();

  try {
    const { writeFile } = await import("node:fs/promises");
    for (const slug of slugs) {
      const buffer = await renderOg(browser, slug);
      const outPath = join(OG_DIR, `${slug}.png`);
      await writeFile(outPath, buffer);
      console.log(`[og] Saved ${outPath} (${buffer.length} bytes)`);
    }
  } finally {
    await browser.close();
    server.kill();
  }
}

main().catch((err) => {
  console.error("[og] Failed:", err);
  process.exit(1);
});
