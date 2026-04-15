import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { marked } from "marked"

const postsDir = path.join(process.cwd(), "content/blog")

export interface PostMeta {
  slug: string
  title: string
  description: string
  datePublished: string
  readTime: string
}

export interface Post extends PostMeta {
  contentHtml: string
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDir)) return []
  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .map((filename) => {
      const slug = filename.replace(/\.(md|mdx)$/, "")
      const { data } = matter(fs.readFileSync(path.join(postsDir, filename), "utf8"))
      return {
        slug,
        title: data.title as string,
        description: data.description as string,
        datePublished: data.datePublished as string,
        readTime: (data.readTime as string) ?? "5 min read",
      }
    })
    .sort((a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime())
}

export function getPostBySlug(slug: string): Post | null {
  const extensions = [".md", ".mdx"]
  let fullPath: string | null = null
  for (const ext of extensions) {
    const candidate = path.join(postsDir, `${slug}${ext}`)
    if (fs.existsSync(candidate)) { fullPath = candidate; break }
  }
  if (!fullPath) return null

  const { data, content } = matter(fs.readFileSync(fullPath, "utf8"))
  const contentHtml = marked.parse(content) as string

  return {
    slug,
    title: data.title as string,
    description: data.description as string,
    datePublished: data.datePublished as string,
    readTime: (data.readTime as string) ?? "5 min read",
    contentHtml,
  }
}
