import { z, defineCollection } from "astro:content";
import { glob } from "astro/loaders";

function definePostsCollection(directory: string) {
  return defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{md,mdx}",
      base: directory,
    }),
    schema: z.union([
      z.object({
        title: z.string(),
        publishDate: z.date(),
        published: z.literal(true),
        showToc: z.boolean().optional().default(false),
        tags: z.array(z.string()).optional().default([]),
        updatedDate: z.date().optional(),
      }),
      z.object({
        title: z.string(),
        publishDate: z.date().optional(),
        published: z.literal(false).optional().default(false),
        showToc: z.boolean().optional().default(false),
        tags: z.array(z.string()).optional().default([]),
        updatedDate: z.date().optional(),
      }),
    ]),
  });
}

const samplePostsCollection = definePostsCollection(
  "./src/content/sample-posts",
);

const postsCollection = definePostsCollection(
  "./modules/personal-content--writings/posts",
);

export const collections = {
  "sample-posts": samplePostsCollection,
  posts: postsCollection,
};
