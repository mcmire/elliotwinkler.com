import { z, defineCollection } from "astro:content";
import { glob } from "astro/loaders";

const samplePostsCollection = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/content/sample-posts",
  }),
  schema: z.object({
    title: z.string(),
    publishDate: z.date(),
    published: z.boolean().optional(),
    showToc: z.boolean().optional(),
    tags: z.array(z.string()).optional().default([]),
    updatedDate: z.date().optional(),
  }),
});

const postsCollection = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: import.meta.env.PROD
      ? "./src/content/posts"
      : "../personal-content--writings/posts",
  }),
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
  "sample-posts": samplePostsCollection,
  posts: postsCollection,
};
