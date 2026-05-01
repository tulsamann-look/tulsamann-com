#!/usr/bin/env node
/**
 * build-playbook-pdf.mjs — render /playbook to PDF via headless Chromium.
 *
 * Spawns the Astro dev server on a fixed port, waits for it to be ready,
 * navigates Playwright to /playbook, prints to PDF with US Letter + 1in
 * margins, saves to public/b2b-lead-gen-playbook.pdf, then tears down.
 *
 * Run: pnpm build:playbook
 *
 * Requires: playwright (devDependency). Pinned to chromium only — no need
 * for firefox/webkit binaries. Install once with: pnpm exec playwright
 * install chromium
 */

import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { mkdirSync, existsSync, statSync } from "node:fs";
import { chromium } from "playwright";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "..");
const PORT = 4329; // off the default to avoid stomping a running dev session
const URL = `http://localhost:${PORT}/playbook`;
const OUTPUT_DIR = resolve(projectRoot, "public");
const OUTPUT_PATH = resolve(OUTPUT_DIR, "b2b-lead-gen-playbook.pdf");

if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true });

console.log("[playbook] starting Astro dev server on :%d", PORT);

const astro = spawn(
  "pnpm",
  ["exec", "astro", "dev", "--port", String(PORT), "--host", "127.0.0.1"],
  { cwd: projectRoot, stdio: ["ignore", "pipe", "pipe"] }
);

let serverReady = false;
const ready = new Promise((res, rej) => {
  const onChunk = (buf) => {
    const out = buf.toString();
    process.stdout.write(out.replace(/^/gm, "[astro] "));
    if (!serverReady && /Local\s+http:\/\/127\.0\.0\.1:/.test(out)) {
      serverReady = true;
      res();
    }
  };
  astro.stdout.on("data", onChunk);
  astro.stderr.on("data", onChunk);
  astro.on("exit", (code) => {
    if (!serverReady) rej(new Error(`Astro exited before ready (code ${code})`));
  });
  setTimeout(() => {
    if (!serverReady) rej(new Error("Astro dev server did not become ready in 30s"));
  }, 30_000);
});

const cleanup = () => {
  if (!astro.killed) {
    try {
      astro.kill("SIGTERM");
    } catch {}
  }
};
process.on("SIGINT", () => {
  cleanup();
  process.exit(1);
});

let exitCode = 0;
try {
  await ready;
  console.log("[playbook] dev server up — launching headless Chromium");

  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: { width: 1200, height: 1600 },
    deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();

  console.log("[playbook] navigating to %s", URL);
  await page.goto(URL, { waitUntil: "networkidle", timeout: 30_000 });

  // wait a beat to ensure variable fonts have loaded fully
  await page.evaluate(() => document.fonts && document.fonts.ready);
  await page.waitForTimeout(500);

  console.log("[playbook] rendering PDF -> %s", OUTPUT_PATH);
  await page.pdf({
    path: OUTPUT_PATH,
    format: "Letter",
    printBackground: true,
    preferCSSPageSize: false,
    margin: {
      top: "0.85in",
      bottom: "0.85in",
      left: "0.95in",
      right: "0.95in",
    },
    displayHeaderFooter: true,
    headerTemplate: `<div></div>`,
    footerTemplate: `
      <div style="font-size:8pt;color:#888;width:100%;padding:0 0.95in;display:flex;justify-content:space-between;font-family:sans-serif;">
        <span>The B2B Lead Gen Playbook · Tulsa Mann</span>
        <span><span class="pageNumber"></span> / <span class="totalPages"></span></span>
      </div>`,
  });

  await browser.close();

  if (existsSync(OUTPUT_PATH)) {
    const sizeKb = (statSync(OUTPUT_PATH).size / 1024).toFixed(1);
    console.log("[playbook] done — %s (%s KB)", OUTPUT_PATH, sizeKb);
  } else {
    throw new Error("PDF output missing after render");
  }
} catch (err) {
  console.error("[playbook] build failed:", err.message);
  exitCode = 1;
} finally {
  cleanup();
  // give astro a moment to die before we exit
  await new Promise((r) => setTimeout(r, 250));
  process.exit(exitCode);
}
