---
name: tulsamann.com
description: Operator brand site for Tulsa Mann — Look Consulting work and Claude implementation thinking, in one calm light-mode home.
---

<!-- SEED — re-run $impeccable document once there's code to capture the actual tokens and components. -->

# Design System: tulsamann.com

## 1. Overview

**Creative North Star: "The Operator's Notebook"**

A notebook is durable, plain, and considered. It exists to hold substance, not to decorate it. The operator who carries one is fast and opinionated — they take notes, ship things, and don't need a hero illustration to explain themselves. tulsamann.com is the digital equivalent: a calm, light-mode surface that holds the thinking and the receipts of one operator-builder, presented with restraint and modern craft.

The system is **light-default** because the primary reader is a business owner doing a 30-second background-check between meetings — light mode is the cognitively easier surface, and dark mode signals the wrong audience (developer-default, not operator-default). The system is **monochromatic** because PRODUCT.md commits to "Calm" and "Opinionated. Fast. Calm." rejects multi-color cleverness in favor of confident restraint. The system is **modern, not minimal-as-a-cop-out** — explicit anti-references are: (a) unstyled-essay-blog (paulgraham.com plain-HTML era, patrickcollison.com sober minimalism); (b) operator-restraint-personal sites that read as "boring as fuck" (tobi.lutke.com, rauchg.com, leerob.io); (c) editorial-magazine status energy (Stripe Press's exact recipe — admired as a concept but pretentious-not-converting on a personal site). Plainness here must be a design choice, not the absence of design — AND not status-seeking through withholding.

**The lane is creator-builder conversion-first.** Direct anchor references (locked during shape Round 2): **Justin Welsh** (`justinwelsh.me`), **Greg Isenberg** (`gregisenberg.com`), **Nick Saraev** (`nicksaraev.com`). These are solopreneur creator-builders whose sites are restrained but every section is engineered to convert. The visual surface is calm; the conversion architecture is heavy. tulsamann.com inherits this DNA.

Motion is **restrained**: state changes (hover, focus, click feedback) only. No scroll choreography, no auto-play, no parallax, no entrance animations on page load. The site feels alive because of polish at the interaction layer, not theatrics on scroll.

**Key Characteristics:**
- Light-default canvas, warm-neutral (not pure white).
- Single accent hue used in tints across the system. No second color.
- Typography lane: modern digital sans (specific families chosen live during implementation when real options can be compared).
- Flat elevation. Depth via tint and weight, not shadow.
- Information density high; decoration low. Whitespace surrounds signal, not replaces it.
- First-person voice in copy, designer's-eye polish in execution.

## 2. Colors

The palette is monochromatic by commitment. One accent hue family, expressed in multiple tints, plus a warm-neutral ink-and-canvas pair. No second color is allowed without explicit reason. This is the entire color strategy.

### Primary

- **Operator Clay** [`oklch` value to be resolved during implementation] — A warm clay orange in the Claude / Anthropic family, but not the same value (we differentiate one notch warmer or one notch deeper to avoid reading as Anthropic's brand). Used for: the single accent moment per screen — link underlines, the primary CTA, signature section dividers, the active-nav indicator. Rare by design.

The Operator Clay anchor was chosen over electric blue (Tulsa's prior personal accent) because (a) clay reads "calm" where electric blue reads "tech-electric", (b) it visually aligns with the Claude Partner Network positioning without imitating Anthropic, and (c) warm hues read as builder-human where cool blues read as SaaS-corporate.

> **Implementation note for the craft pass:** during the build, generate side-by-side comps in clay AND electric blue at the same lightness. Lock the choice from real screens, not from this seed.

### Neutral

The neutral ramp is warm, not gray-blue. All neutrals share a slight warmth-bias so the canvas feels paper-adjacent, not screen-cold.

- **Warm Off-White** — The page canvas. Not pure white. Warm enough to read as "considered surface" not "default browser page".
- **Soft Stone** — Section backgrounds, card surfaces when used. Slightly darker than canvas, still warm.
- **Operator Ink** — The body text color. Not pure black. Near-black with a warm tint that matches the canvas family.
- **Quiet Mute** — Secondary text, metadata, timestamps. Lower contrast but always meeting WCAG AA against the canvas.
- **Hairline** — 1px borders, dividers, table rules. Just barely there.

Exact values to be resolved during the craft pass. The constraint locked here is **warm-bias on every neutral**.

### Named Rules

**The One-Hue Rule.** The accent hue family is the entire color story. Tints, shades, and lightness variants of Operator Clay are allowed; introducing a second hue (a green for "success", a blue for "info") is forbidden. Status and meaning are conveyed through weight, position, and shape — not through a parallel color system.

**The 5% Ceiling.** On any given screen, the accent color (in any tint) covers no more than ~5% of the visible surface. The accent IS the brand because it's rare. Pages where 30% of pixels are clay have failed this rule.

**The No-Hero-Gradient Rule.** No gradient orbs, mesh backgrounds, animated gradients, or "section-divider rainbow lines". Solid color or no color. PRODUCT.md anti-reference, repeated here as a hard visual prohibition.

## 3. Typography

**Display Font:** [to be chosen at implementation — direction: modern digital sans, considered face with a real point of view, NOT generic Inter/Roboto/system-default]
**Body Font:** [to be chosen at implementation — direction: same family as display OR a paired sans optimized for long-form reading; if paired, the contrast must be intentional, not accidental]
**Label/Mono Font:** [to be chosen at implementation — direction: a real monospace, used selectively for code, metadata, timestamps, and section labels — never for body]

**Character:** Digital, modern, builder-coded. Not editorial-magazine (no display serifs as the headline lane — PRODUCT.md says "lean digital, less editorial"). Not engineer-rough (no all-mono pages — too niche for the Look-prospect cohort). The pairing reads as "operator who cares about typography" — modern sans with intentional weight contrast, mono used the way an engineer-writer uses it: for the parts of the page that ARE code or code-adjacent.

### Hierarchy

The exact scale steps will land during implementation. The constraints locked here:

- **Display** — Reserved for the home-page hero and the openings of long-form posts. One use per screen, maximum.
- **Headline** — Section titles. Strong but not screaming.
- **Title** — Subsections, post titles in lists.
- **Body** — Long-form writing. **Minimum 18px** for /writing routes (PRODUCT.md accessibility floor). Maximum line length 65–75 characters.
- **Label** — Metadata, dates, taxonomies, button text. Often uppercase with letter-spacing, often in mono.

### Named Rules

**The One-Display-Per-Screen Rule.** Display type is rare. The home page hero gets it. A long-form post opening gets it. A section title is NOT a display — it's a headline. If two display sizes appear on one screen, one of them is a headline misnamed.

**The Body-Earns-It Rule.** Body type for long-form writing is 18px+, line-height 1.6+, line length 65–75ch. The reading experience is the product on /writing, and a 14px body kills it. This is non-negotiable.

**The Mono-Means-Something Rule.** Monospace is reserved for things that ARE code-adjacent: actual code, file paths, metadata (dates, tags, post counts), and section labels. Using mono for body text would push the site into engineer-essayist territory and lose the Look-prospect cohort.

## 4. Elevation

**Flat by default.** No shadows except where they earn their place at the interaction layer.

Depth in this system comes from tonal layering (canvas → soft-stone surface → hairline border) and typographic weight, not from shadow. The aesthetic is paper-like: surfaces sit beside each other, not on top of each other. A card is a card because it has a different background and a hairline border, not because it casts a 24px shadow.

The two places shadow IS allowed:
- **Focus rings** — Visible focus indicators are mandatory for keyboard accessibility. These use a shadow-or-outline (TBD at implementation), never a solid border that would shift layout on focus.
- **Hover ambient lift on interactive cards** — A very subtle ambient shadow on hover to signal "this element is interactive". Subtle enough that disabling it wouldn't break the page; present enough that the affordance is clear.

### Named Rules

**The Flat-At-Rest Rule.** No element casts a shadow at rest. State (hover, focus, active) may invoke a shadow; default state never does. If a component looks shadowed in a screenshot of the page-as-loaded, it has failed this rule.

**The Tonal-Layering Rule.** When two surfaces need to be visually distinguished, change the tonal value first (canvas → soft-stone), add a hairline border second, and only consider shadow third. In practice we never reach shadow.

## 5. Components

*Omitted in seed mode — no components have been built yet. The next pass of `$impeccable document` (after the craft pass produces real components) will populate this section with the actual button, link, card, nav, and form primitives extracted from the codebase.*

The constraints already locked here for that future extraction:
- Buttons: ≤2 variants (primary clay, secondary ghost). No tertiary, no outline, no icon-only as a primary pattern.
- Links: underlined in body, color-shifted on hover, no decoration changes that shift layout.
- Cards: hairline border, soft-stone background or canvas, no shadow at rest. Internal padding generous (24px+).
- Nav: persistent, light-mode, single line. The two paths from PRODUCT.md (Look / Writing) are equally weighted and visually equivalent.
- Forms: single column, ample padding, calm. Used only where capturing data is the explicit job (book a call, subscribe to writing).

## 6. Do's and Don'ts

These guardrails carry PRODUCT.md's strategic line into the visual layer. The Do's establish the aesthetic doctrine; the Don'ts repeat the anti-references by name.

### Do:
- **Do** anchor every screen with a single accent moment in Operator Clay (link, CTA, divider). Use the rest of the canvas for warm neutrals.
- **Do** keep the canvas warm (off-white, not pure white). Cold canvases read as SaaS-default; warm canvases read as considered.
- **Do** use 18px+ body type with 1.6+ line-height for any long-form route. Reading is the product on /writing.
- **Do** maintain the One-Hue Rule. If a designer instinct says "we need a green for success states", the answer is no — change weight or shape, not hue.
- **Do** preserve the modern-digital typography lane. The site reads as a builder's site, not a magazine. Display serifs in the headline role break this.
- **Do** keep motion at the state-change layer only. Hover transitions, focus rings, click feedback — yes. Scroll choreography — no.
- **Do** make every claim land beside its receipt. Visually, that means proof points (numbers, named clients, links to artifacts) sit physically near the line that claims them, never in a separate "trust strip".
- **Do** ship a focus ring that's visible and matches the brand. Accessibility is brand expression here, not an afterthought.

### Don't:
- **Don't** use **purple gradients, gradient orbs, or mesh backgrounds.** SaaS startup landing slop, named in PRODUCT.md as a hard rule. The whole "founder hero gradient" era is forbidden.
- **Don't** drop a **"Trusted by" logo wall** as the home-page hero. PRODUCT.md anti-reference, repeated.
- **Don't** use **AI-rendered hero illustrations** of abstract people pointing at floating UI. Same anti-reference family.
- **Don't** ship a **"Get started for free" button in the top-right when there's nothing to get started with.** Honesty in CTA copy is enforced from PRODUCT.md.
- **Don't** lean on **generic Inter at every weight as the only typeface.** This is the LLM-default and PRODUCT.md flags it. Typography must have a point of view.
- **Don't** make this **look like an unstyled essay blog** (paulgraham.com era plain HTML, ultra-minimal personal sites that reduce to default browser type). PRODUCT.md anti-reference clarified during the seed interview: the site must read as a designed surface, not as the absence of design.
- **Don't** copy **operator-restraint-personal sites** that signal status through withholding (tobi.lutke.com, rauchg.com, leerob.io, patrickcollison.com). These are admired in tech but read as "boring as fuck" to the audience tulsamann.com is built for. Lane is creator-builder conversion-first, not founder-philosopher.
- **Don't** ape **Stripe Press's exact editorial-magazine recipe** (serif display + premium-publication composition + book-catalog format) on a personal site. Stripe Press is a publishing house — its IA depends on physical books as content. On a personal site, that recipe reads as status-seeking and pretentious. Premium typography and considered composition are welcome; the Stripe Press *literal* visual identity is not.
- **Don't** introduce a **second accent color**. The One-Hue Rule is the entire color strategy.
- **Don't** add **shadows at rest, scroll-triggered animations, or auto-play media.** The Flat-At-Rest Rule and the Restrained-Motion Rule are non-negotiable.
- **Don't** swap **dark-mode as the default**. PRODUCT.md commits to light-default for business-owner readability. Dark-mode-as-toggle is a future consideration; dark-mode-as-default is not.
- **Don't** ship a **section that's beautiful but empty**. Substance density over visual surface — every section earns its space with content, not with whitespace.

---

*This is a SEED DESIGN.md. The next pass of `$impeccable document` (run after the craft pass produces real components and tokens) will replace this with extracted values, real hex codes, real font families, and real component snippets — keeping all named rules and doctrine intact.*
