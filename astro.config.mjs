import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  // Canonical host is www. The apex (tulsamann.com without www) still
  // points at GoDaddy parking until the A record is fixed in GoDaddy.
  // Until then, all generated URLs (sitemap, canonical, OG, Article
  // schema) must use www so they actually resolve. Otherwise Google
  // Search Console cannot fetch the sitemap.
  site: "https://www.tulsamann.com",
  integrations: [
    mdx(),
    // Exclude /playbook and /og-template/* from the sitemap.
    // Both are noindex/nofollow render endpoints; this keeps them out of the public site map too.
    sitemap({
      filter: (page) =>
        !page.endsWith("/playbook/") && !page.includes("/og-template/"),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    inlineStylesheets: "auto",
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport",
  },
});
