import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacy Policy — devkit",
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

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main style={{ maxWidth: "680px", margin: "0 auto", padding: "48px 24px 80px" }}>
        <Link href="/" style={{ fontSize: "12px", color: "#666", textDecoration: "none", display: "inline-block", marginBottom: "32px" }}>← Back to home</Link>
        <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#fff", letterSpacing: "-0.03em", marginBottom: "6px" }}>Privacy Policy</h1>
        <p style={{ fontSize: "12px", color: "#555", marginBottom: "40px" }}>Last updated: {UPDATED}</p>
        <div style={{ fontSize: "13px", color: "#999", lineHeight: 1.8 }}>
          <h2 style={h2Style}>1. Introduction</h2>
          <p style={pStyle}>
            Yaro Labs operates <strong style={{ color: "#ccc" }}>devkit.yaro-labs.com</strong> — a collection of free,
            browser-based developer utilities. All calculations run entirely in your browser. Nothing you type into
            any tool is transmitted to our servers.
          </p>

          <h2 style={h2Style}>2. Information We Collect</h2>
          <p style={pStyle}>
            We collect limited data to understand how the site is used:
          </p>
          <ul style={{ paddingLeft: "20px", margin: "0 0 12px" }}>
            <li style={pStyle}><strong style={{ color: "#ccc" }}>Usage analytics</strong> — page views and interactions via Google Analytics 4 (GA4). This data is anonymised and aggregated.</li>
            <li style={pStyle}><strong style={{ color: "#ccc" }}>Cookie consent preference</strong> — stored locally in your browser via <code style={{ fontFamily: "monospace", background: "#1a1a1a", padding: "1px 4px", borderRadius: "3px" }}>localStorage</code>.</li>
          </ul>
          <p style={pStyle}>
            We do not offer accounts, contact forms, or any mechanism for you to submit personal data.
          </p>

          <h2 style={h2Style}>3. How We Use Your Information</h2>
          <p style={pStyle}>
            Analytics data is used solely to understand which tools are popular, identify bugs, and improve the site.
            We do not sell, rent, or share your data with third parties for marketing purposes.
          </p>

          <h2 style={h2Style}>4. Sharing</h2>
          <p style={pStyle}>
            The only third party that receives data is <strong style={{ color: "#ccc" }}>Google Analytics</strong> (subject to
            Google's own privacy policy). No other data is shared with external parties.
          </p>

          <h2 style={h2Style}>5. Data Retention</h2>
          <p style={pStyle}>
            Analytics data is retained according to Google's data retention policy (typically 14 months by default).
            Your cookie consent preference is stored in your browser's <code style={{ fontFamily: "monospace", background: "#1a1a1a", padding: "1px 4px", borderRadius: "3px" }}>localStorage</code> indefinitely until you
            clear your browser data.
          </p>

          <h2 style={h2Style}>6. Your Rights</h2>
          <p style={pStyle}>
            You may request access to or deletion of your analytics data by contacting us. You can opt out of
            analytics at any time by declining via the cookie banner, installing the{" "}
            <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" style={{ color: "#fff" }}>Google Analytics opt-out browser add-on</a>,
            or adjusting your browser's cookie settings.
          </p>

          <h2 style={h2Style}>7. Changes to This Policy</h2>
          <p style={pStyle}>
            We may update this Privacy Policy from time to time. Changes will be reflected by updating the
            "Last updated" date at the top of this page.
          </p>

          <h2 style={h2Style}>8. Contact</h2>
          <p style={pStyle}>
            Questions about this policy? Email us at{" "}
            <a href="mailto:hello@yaro-labs.com" style={{ color: "#fff" }}>hello@yaro-labs.com</a>.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
