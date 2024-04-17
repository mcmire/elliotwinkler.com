import { getCollection } from "astro:content";

export async function getPosts() {
  const allPosts = [];

  const posts = await getCollection("posts");
  allPosts.push(...posts);

  if (import.meta.env.MODE === "development") {
    const samplePosts = await getCollection("sample-posts");
    allPosts.push(...samplePosts);
  }

  return allPosts
    .filter((post) => post.data.published !== false)
    .sort((a, b) => {
      return b.data.publishDate.getTime() - a.data.publishDate.getTime();
    });
}
