import os from "os";
import { z, defineCollection } from "astro:content";
import { glob } from "astro/loaders";

function definePostsCollection(directory: string) {
  return defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{md,mdx}",
      base: directory,
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
}

function getWritingsDirectoryPath() {
  const writingsDirectoryPath = import.meta.env.WRITINGS_DIRECTORY_PATH;

  if (writingsDirectoryPath === undefined || writingsDirectoryPath === "") {
    throw new Error("WRITINGS_DIRECTORY_PATH must be set");
  }

  return writingsDirectoryPath.replace("~/", `${os.homedir()}/`);
}

const samplePostsCollection = definePostsCollection(
  "./src/content/sample-posts",
);

const postsCollection = definePostsCollection(getWritingsDirectoryPath());

export const collections = {
  "sample-posts": samplePostsCollection,
  posts: postsCollection,
};
