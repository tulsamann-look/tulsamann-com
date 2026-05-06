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
 * Airtable "tulsamann-com leads" table (base appPJdT3w7bGQgjF2,
 * table tbl9S17NJNPV2yAoh).
 *
 * Workflow built and waiting in draft at:
 *   https://lookconsulting.app.n8n.cloud/workflow/gurqigyWjUhZEZW5
 *
 * Before this URL goes live, Tulsa must:
 *   1. Bind the Airtable PAT credential to the "Insert Lead into Airtable"
 *      node (HTTP Header Auth, name "Authorization", value "Bearer pat...").
 *   2. Activate / publish the workflow (the public webhook only listens
 *      when the workflow is active).
 *
 * While the workflow is in draft, the URL below 404s. The form's catch
 * branch handles that — visitors see the error state until activation.
 * If you want a softer fallback during the activation window, set this
 * back to "" and the form will fall back to console.info instead.
 */
export const N8N_LEAD_WEBHOOK =
  "https://lookconsulting.app.n8n.cloud/webhook/tulsamann-com-leads";

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
  // Canonical host is www. Apex still points at GoDaddy parking until
  // the A record is fixed. See astro.config.mjs for the full note.
  url: "https://www.tulsamann.com",
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
    title: "I help businesses build with Claude",
    body:
      "From interactive lead magnets to custom AI agents, I help B2B businesses ship Claude-powered tools that move actual numbers. Same approach, different stack — the underlying methodology is the same as the lead-gen work.",
  },
] as const;

/**
 * Recent posts for the homepage Writing section.
 *
 * Pulled from the writing content collection at build time. Returns up
 * to 3 most recent published posts. Empty array if none exist yet.
 */
export async function getRecentPostsForHome() {
  const { getAllPublished } = await import("./utils/cluster");
  const posts = await getAllPublished();
  return posts.slice(0, 3).map((p) => ({
    title: p.data.title,
    date: p.data.publishDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    excerpt: p.data.description,
    href: `/writing/${p.slug}`,
  }));
}
