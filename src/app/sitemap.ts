import type { MetadataRoute } from "next";
import { getPosts } from "./lib/posts";

const origin = "https://apolloinsight.io";

// Generated from the same Substack RSS feed as the conversations page.
// New conversations appear automatically after the feed cache refreshes.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();
  return [
    { url: origin, changeFrequency: "weekly", priority: 1 },
    { url: `${origin}/conversations`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${origin}/subscribe`, changeFrequency: "monthly", priority: 0.5 },
    ...posts.map((post) => ({
      url: `${origin}/conversations/${encodeURIComponent(post.slug)}`,
      ...(Number.isNaN(Date.parse(post.date)) ? {} : { lastModified: new Date(post.date) }),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
