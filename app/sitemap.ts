import { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://genifyai.app";

  const staticPages = [
    { url: siteUrl, priority: 1.0 },
    { url: `${siteUrl}/tools`, priority: 0.9 },
    { url: `${siteUrl}/tools/caption`, priority: 0.9 },
    { url: `${siteUrl}/tools/resume`, priority: 0.9 },
    { url: `${siteUrl}/tools/personality`, priority: 0.9 },
    { url: `${siteUrl}/blog`, priority: 0.8 },
    { url: `${siteUrl}/about`, priority: 0.6 },
    { url: `${siteUrl}/privacy`, priority: 0.4 },
    { url: `${siteUrl}/contact`, priority: 0.5 },
  ].map((page) => ({
    url: page.url,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: page.priority,
  }));

  const blogPages = blogPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages];
}
