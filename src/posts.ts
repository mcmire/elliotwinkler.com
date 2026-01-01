import { getCollection } from "astro:content";

export async function getPosts() {
  const allPosts = [];

  const posts = await getCollection("posts");
  allPosts.push(...posts);

  if (import.meta.env.MODE === "development") {
    const samplePosts = await getCollection("sample-posts");
    allPosts.push(...samplePosts);
  }

  return (
    allPosts
      .filter(
        (post) =>
          import.meta.env.PUBLIC_VERCEL_ENV !== "production" ||
          post.data.published,
      )
      // Sort non-sample posts before sample posts,
      // draft posts before non-draft posts,
      // and posts without publish dates before posts with publish dates
      .sort((a, b) => {
        if (
          a.collection === "sample-posts" &&
          b.collection !== "sample-posts"
        ) {
          return 1;
        }
        if (
          a.collection !== "sample-posts" &&
          b.collection === "sample-posts"
        ) {
          return -1;
        }
        if (a.data.published && !b.data.published) {
          return 1;
        }
        if (!a.data.published && b.data.published) {
          return -1;
        }
        if (a.data.publishDate && !b.data.publishDate) {
          return 1;
        }
        if (!a.data.publishDate && b.data.publishDate) {
          return -1;
        }
        const secondTime = b.data.publishDate
          ? b.data.publishDate.getTime()
          : 0;
        const firstTime = a.data.publishDate ? a.data.publishDate.getTime() : 0;
        return secondTime - firstTime;
      })
  );
}
