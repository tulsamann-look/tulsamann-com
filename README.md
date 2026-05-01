# tulsamann.com

Personal website at [tulsamann.com](https://www.tulsamann.com). Operator credibility surface for Tulsa Mann. Funnels visitors into the email list (lead magnet: *The B2B Lead Gen Playbook*), LinkedIn, and direct email reply. No on-site sales pitch by design.

## Stack
- **Astro 5** (static, content collections wired)
- **Tailwind v4** with custom OKLCH design tokens (Operator Clay accent, warm-neutral canvas)
- **Geist Variable** + **Geist Mono** typography
- **MDX** (wired but unused at v0)
- **Vercel** hosting
- **Plausible** analytics (production-only)

Brand built with [pbakaus/impeccable](https://github.com/pbakaus/impeccable). Strategic context in `PRODUCT.md`; visual system in `DESIGN.md`; section-by-section brief in `BRIEF.md`.

## Lead magnet PDF
"The B2B Lead Gen Playbook" lives at [`/b2b-lead-gen-playbook.pdf`](https://www.tulsamann.com/b2b-lead-gen-playbook.pdf) (5 pages, site-branded).

- **Source markdown:** `src/content/playbook.md`
- **Render endpoint:** `src/pages/playbook.astro` (noindex, sitemap-excluded)
- **Layout:** `src/layouts/PlaybookLayout.astro` (print-optimized CSS reusing global tokens)
- **Build script:** `scripts/build-playbook-pdf.mjs` (Playwright + headless Chromium)
- **Rebuild:** `pnpm build:playbook` regenerates `public/b2b-lead-gen-playbook.pdf` from the markdown source. Commit the regenerated PDF.

The same pipeline can render any future PDF: add a markdown source, a render page, and run the script with the new path.

## Email capture
Form posts to an n8n webhook (`gurqigyWjUhZEZW5`) which inserts a row into Airtable and sends a Resend confirmation email containing the live PDF link. URLs and lead magnet metadata live in `src/config.ts`.

## Vault task
[`look/tasks/tulsamann-com-website/`](https://github.com/tulsamann-look) (private vault — ask Tulsa).

## Local dev
```sh
pnpm install
pnpm dev          # site at localhost:4321
pnpm build        # static build to dist/
pnpm build:playbook   # regenerate the lead-magnet PDF
```
