import { z, defineCollection } from "astro:content";

const postsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    publishDate: z.date(),
    published: z.boolean().optional(),
    showToc: z.boolean().optional(),
    tags: z.array(z.string()).optional().default([]),
    updatedDate: z.date().optional(),
  }),
});

export const collections = {
  "sample-posts": postsCollection,
  posts: postsCollection,
};
