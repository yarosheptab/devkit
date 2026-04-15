import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ToolCard } from "@/components/tool-card"
import { TOOLS } from "@/lib/tools"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "devkit -- Developer Utilities",
  description: "Fast, offline-first developer tools. Format JSON, decode JWTs, test regex, generate UUIDs -- in the browser.",
  openGraph: { images: [{ url: "/og/home.png" }] },
}

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <section style={{ padding: "64px 24px 56px", borderBottom: "1px solid var(--border)", background: "var(--surface)" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--muted-fg)",
            border: "1px solid var(--border)", borderRadius: "20px", padding: "3px 10px", marginBottom: "20px",
          }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--fg)" }} />
            Developer utilities
          </div>
          <h1 className="hero-heading">
            Tools that work.<br />
            <em style={{ fontStyle: "normal", color: "var(--muted-fg2)" }}>Nothing else.</em>
          </h1>
          <p style={{ fontSize: "15px", color: "var(--muted-fg)", maxWidth: "420px", lineHeight: "1.6", marginBottom: "28px" }}>
            Fast, offline-first developer tools. No sign-up, no tracking, no fluff. Format JSON, decode JWTs, test regex -- in the browser.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <a href="#tools" style={{
              background: "var(--fg)", color: "var(--accent-fg)",
              fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 600,
              border: "none", borderRadius: "var(--radius)", padding: "8px 18px",
              cursor: "pointer", textDecoration: "none", display: "inline-block",
            }}>Browse tools</a>
          </div>
        </section>

        <section id="tools" style={{ background: "var(--surface)", padding: "32px 24px 48px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
            <span style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--muted-fg2)" }}>All tools</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--muted-fg2)" }}>{TOOLS.length} tools</span>
          </div>
          <div className="tools-grid">
            {TOOLS.map(tool => <ToolCard key={tool.slug} tool={tool} />)}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
