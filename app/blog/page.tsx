import { getAllPosts } from "@/lib/blog"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog",
  description: "Articles on developer tools, browser APIs, and offline-first web development.",
}

export default function BlogIndexPage() {
  const posts = getAllPosts()
  return (
    <>
      <Navbar />
      <main style={{ maxWidth: "680px", margin: "0 auto", padding: "48px 24px" }}>
        <h1 style={{ fontSize: "22px", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--fg)", marginBottom: "8px" }}>Blog</h1>
        <p style={{ fontSize: "14px", color: "var(--muted-fg)", marginBottom: "40px" }}>
          Articles on developer tools, browser APIs, and offline-first web development.
        </p>
        <div>
          {posts.map((post, i) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} style={{
              display: "block", padding: "20px 0",
              borderTop: "1px solid var(--border)",
              borderBottom: i === posts.length - 1 ? "1px solid var(--border)" : "none",
              textDecoration: "none",
            }}>
              <div style={{ display: "flex", gap: "16px", marginBottom: "6px" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--muted-fg2)" }}>{post.datePublished}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--muted-fg2)" }}>{post.readTime}</span>
              </div>
              <div style={{ fontSize: "15px", fontWeight: 600, color: "var(--fg)", marginBottom: "4px" }}>{post.title}</div>
              <div style={{ fontSize: "13px", color: "var(--muted-fg)", lineHeight: "1.5" }}>{post.description}</div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}
