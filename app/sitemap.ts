import type { MetadataRoute } from "next"
import { getAllPosts } from "@/lib/blog"

const BASE = "https://devkit.yaro-labs.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    // Tool pages
    { url: `${BASE}/json`,   lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/jwt`,    lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/regex`,  lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/uuid`,   lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/base64`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/hash`,   lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/url`,    lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/diff`,   lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    // Blog index
    { url: `${BASE}/blog`,  lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    // About
    { url: `${BASE}/about`, lastModified: new Date(), changeFrequency: "yearly",  priority: 0.4 },
    // Legal
    { url: `${BASE}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE}/terms`,   lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE}/cookies`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
  ]

  const posts = getAllPosts()
  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: new Date(post.datePublished),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [...staticPages, ...blogPages]
}
