import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://tulsamann.com",
  integrations: [
    mdx(),
    // Exclude /playbook (the lead-magnet render endpoint) from the sitemap.
    // It's noindex/nofollow at the page level; this keeps it out of the public site map too.
    sitemap({ filter: (page) => !page.endsWith("/playbook/") }),
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
