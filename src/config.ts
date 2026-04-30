/**
 * Site config — single source of truth for URLs, handles, and external endpoints.
 *
 * Edit values here; do not hardcode in components.
 */

/** Personal contact email. Used in mailto: CTAs. */
export const CONTACT_EMAIL = "tulsa.mann@look-consulting.com";

/** LinkedIn profile — primary social handle. */
export const LINKEDIN_URL = "https://www.linkedin.com/in/tulsamann/";

/** X / Twitter handle (optional). */
export const TWITTER_URL = "https://x.com/tulsamann";

/** GitHub handle. */
export const GITHUB_URL = "https://github.com/tulsamann-look";

/**
 * n8n webhook URL for email capture.
 *
 * Forms POST `{ email, source, page }` here. n8n inserts a row into the
 * Airtable "tulsamann-com leads" table and dispatches the lead-magnet PDF.
 *
 * EMPTY STRING = no real backend; form falls back to a local console.info
 * stub so the UX flow can be verified without sending data anywhere.
 *
 * Set to the real webhook once the n8n workflow is built.
 */
export const N8N_LEAD_WEBHOOK = "";

/** The named lead magnet — used as the value-exchange in every email capture. */
export const LEAD_MAGNET = {
  title: "The B2B Lead Gen Playbook",
  subtitle:
    "How I cut Charterhouse Lombard's cost-per-lead in half — the methodology behind Look Consulting's results, written down.",
};

/** Site-wide metadata. */
export const SITE = {
  name: "Tulsa Mann",
  tagline: "Lead generation + AI implementation for B2B",
  url: "https://tulsamann.com",
};

/** Featured client work — used in the Work section. */
export const FEATURED_CLIENTS = [
  {
    name: "Charterhouse Lombard",
    short: "CHL",
    receipt: "50% lower cost-per-lead",
    context:
      "Built and ran a Dubai Golden Visa lead-gen funnel. ~100 qualified leads / month at roughly half the prior cost-per-lead. Three interactive lead magnets (a savings calculator, two quizzes) plus the paid-ads system that sends traffic through them.",
    role: "Strategy + build + ongoing optimization.",
  },
  {
    name: "Entity Engine",
    short: "EE",
    receipt: "Full GTM stack for a multi-jurisdiction CSP",
    context:
      "Three-month done-for-you growth engagement at Entity Engine — international corporate-services platform across 11 jurisdictions. Five lead magnets, paid ads, outbound, attribution dashboard, automation engine.",
    role: "Strategy + build + execution.",
  },
] as const;

/** Featured AI / Claude work — used in the Building section. */
export const BUILDING_BLOCKS = [
  {
    title: "I run Look as an AI-first business",
    body:
      "CEO agent, founding engineer agent, expense bot, mission-control dashboard, DMW (Do My Work) execution system — all in production, all running every day. The same operator approach I bring to client engagements.",
  },
  {
    title: "Claude Partner Network",
    body:
      "Member of Anthropic's Claude Partner Network. Building Look as an AI Boutique on Anthropic's stack — the implementation work I do for Look is the implementation work I do for clients.",
  },
  {
    title: "I help businesses build with Claude",
    body:
      "From interactive lead magnets to custom AI agents, I help B2B businesses ship Claude-powered tools that move actual numbers. Same approach, different stack — the underlying methodology is the same as the lead-gen work.",
  },
] as const;

/**
 * Recent writing — placeholders until LinkedIn long-form is published.
 * Each "Read more" links out to LinkedIn (per BRIEF.md §5 row 5).
 */
export const RECENT_POSTS = [
  {
    title: "Why I cut my own marketing budget by half — and what happened next",
    date: "Coming soon",
    excerpt:
      "On running an AI-first B2B services business when the cheapest test is the one you run on yourself.",
    url: LINKEDIN_URL,
  },
  {
    title: "The lead magnet rule nobody talks about: it has to be the product",
    date: "Coming soon",
    excerpt:
      "Why interactive lead magnets convert at 8–10% and PDF lead magnets convert at 1–2%, in three case studies.",
    url: LINKEDIN_URL,
  },
  {
    title: "Anthropic's Claude as the operating system of a small business",
    date: "Coming soon",
    excerpt:
      "What it actually looks like to run customer-facing operations, internal R&D, and pipeline management on a single LLM stack.",
    url: LINKEDIN_URL,
  },
] as const;
