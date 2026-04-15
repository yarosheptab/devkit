import { getAllPosts, getPostBySlug } from "@/lib/blog"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return { title: post.title, description: post.description, openGraph: { title: post.title, description: post.description, type: "article" } }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: "680px", margin: "0 auto", padding: "48px 24px" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--muted-fg2)", marginBottom: "24px" }}>
          <Link href="/blog" style={{ color: "var(--muted-fg2)", textDecoration: "none" }}>Blog</Link>
          {" / "}
          <span style={{ color: "var(--muted-fg)" }}>{post.title}</span>
        </div>
        <h1 style={{ fontSize: "28px", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.2, color: "var(--fg)", marginBottom: "12px" }}>
          {post.title}
        </h1>
        <div style={{ display: "flex", gap: "16px", marginBottom: "40px" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--muted-fg2)" }}>{post.datePublished}</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--muted-fg2)" }}>{post.readTime}</span>
        </div>
        {/* Content is from local markdown files only -- not user input */}
        <div className="blog-prose" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
        <div style={{ marginTop: "48px", paddingTop: "24px", borderTop: "1px solid var(--border)" }}>
          <Link href="/blog" style={{ fontSize: "13px", color: "var(--muted-fg)", textDecoration: "none" }}>
            &larr; All posts
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
