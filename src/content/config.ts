import { defineCollection, z } from "astro:content";

const writing = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1).max(155),
    publishDate: z.date(),
    updatedDate: z.date().optional(),
    cornerstone: z.boolean().default(false),
    spokeOf: z.string().optional(),
    tags: z.array(z.string()).default([]),
    ogImage: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { writing };
