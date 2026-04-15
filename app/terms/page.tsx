import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Terms of Use — devkit",
}

const UPDATED = "16 April 2026"

const h2Style: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: 600,
  color: "#fff",
  marginTop: "32px",
  marginBottom: "8px",
}

const pStyle: React.CSSProperties = {
  fontSize: "13px",
  color: "#999",
  lineHeight: 1.8,
  margin: "0 0 12px",
}

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main style={{ maxWidth: "680px", margin: "0 auto", padding: "48px 24px 80px" }}>
        <Link href="/" style={{ fontSize: "12px", color: "#666", textDecoration: "none", display: "inline-block", marginBottom: "32px" }}>← Back to home</Link>
        <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#fff", letterSpacing: "-0.03em", marginBottom: "6px" }}>Terms of Use</h1>
        <p style={{ fontSize: "12px", color: "#555", marginBottom: "40px" }}>Last updated: {UPDATED}</p>
        <div style={{ fontSize: "13px", color: "#999", lineHeight: 1.8 }}>
          <h2 style={h2Style}>1. Agreement to Terms</h2>
          <p style={pStyle}>
            By accessing or using <strong style={{ color: "#ccc" }}>devkit.yaro-labs.com</strong>, you agree to be
            bound by these Terms of Use. If you do not agree, please do not use the site.
          </p>

          <h2 style={h2Style}>2. Description of Service</h2>
          <p style={pStyle}>
            devkit is a free, browser-based collection of developer utilities provided by Yaro Labs. All tools
            run entirely client-side. No account or registration is required.
          </p>

          <h2 style={h2Style}>3. Acceptable Use</h2>
          <p style={pStyle}>
            You agree to use devkit for lawful purposes only. You must not:
          </p>
          <ul style={{ paddingLeft: "20px", margin: "0 0 12px" }}>
            <li style={pStyle}>Scrape, crawl, or systematically download site content in an abusive manner.</li>
            <li style={pStyle}>Attempt to circumvent or interfere with the site's operation.</li>
            <li style={pStyle}>Use the site in any way that violates applicable laws or regulations.</li>
          </ul>

          <h2 style={h2Style}>4. Intellectual Property</h2>
          <p style={pStyle}>
            The site design, branding, and content are owned by Yaro Labs. The underlying source code is
            proprietary unless explicitly stated otherwise. You may not reproduce or redistribute our content
            without prior written permission.
          </p>

          <h2 style={h2Style}>5. Disclaimer of Warranties</h2>
          <p style={pStyle}>
            devkit is provided <strong style={{ color: "#ccc" }}>"as is"</strong> without warranties of any kind,
            express or implied. Tool output is for informational purposes only. We make no guarantee that
            results are accurate, complete, or suitable for any particular purpose.
          </p>

          <h2 style={h2Style}>6. Limitation of Liability</h2>
          <p style={pStyle}>
            Yaro Labs is not liable for any errors, inaccuracies, or omissions in tool output, or for any
            damages arising from your reliance on such output. Use results at your own risk.
          </p>

          <h2 style={h2Style}>7. Changes to Terms</h2>
          <p style={pStyle}>
            We may update these Terms of Use at any time. Continued use of the site after changes constitutes
            your acceptance of the revised terms. The "Last updated" date at the top of this page reflects
            the most recent revision.
          </p>

          <h2 style={h2Style}>8. Contact</h2>
          <p style={pStyle}>
            Questions about these terms? Email us at{" "}
            <a href="mailto:hello@yaro-labs.com" style={{ color: "#fff" }}>hello@yaro-labs.com</a>.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
