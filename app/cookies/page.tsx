import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Cookie Policy — devkit",
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

export default function CookiesPage() {
  return (
    <>
      <Navbar />
      <main style={{ maxWidth: "680px", margin: "0 auto", padding: "48px 24px 80px" }}>
        <Link href="/" style={{ fontSize: "12px", color: "#666", textDecoration: "none", display: "inline-block", marginBottom: "32px" }}>← Back to home</Link>
        <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#fff", letterSpacing: "-0.03em", marginBottom: "6px" }}>Cookie Policy</h1>
        <p style={{ fontSize: "12px", color: "#555", marginBottom: "40px" }}>Last updated: {UPDATED}</p>
        <div style={{ fontSize: "13px", color: "#999", lineHeight: 1.8 }}>
          <h2 style={h2Style}>1. What Are Cookies</h2>
          <p style={pStyle}>
            Cookies are small text files placed on your device by websites you visit. They are widely used to
            make sites work efficiently and to provide information to site owners. devkit also uses
            browser <code style={{ fontFamily: "monospace", background: "#1a1a1a", padding: "1px 4px", borderRadius: "3px" }}>localStorage</code> for similar purposes.
          </p>

          <h2 style={h2Style}>2. Cookies We Use</h2>
          <p style={pStyle}>
            devkit uses two categories of cookies / local storage:
          </p>
          <ul style={{ paddingLeft: "20px", margin: "0 0 12px" }}>
            <li style={pStyle}>
              <strong style={{ color: "#ccc" }}>Strictly necessary</strong> —{" "}
              <code style={{ fontFamily: "monospace", background: "#1a1a1a", padding: "1px 4px", borderRadius: "3px" }}>devkit-cookie-consent</code> stored in{" "}
              <code style={{ fontFamily: "monospace", background: "#1a1a1a", padding: "1px 4px", borderRadius: "3px" }}>localStorage</code>.
              Records whether you have accepted or declined analytics cookies so the banner does not re-appear on every visit.
              This does not require consent to set.
            </li>
            <li style={pStyle}>
              <strong style={{ color: "#ccc" }}>Analytics (GA4)</strong> — Google Analytics 4 cookies
              (<code style={{ fontFamily: "monospace", background: "#1a1a1a", padding: "1px 4px", borderRadius: "3px" }}>_ga</code>,{" "}
              <code style={{ fontFamily: "monospace", background: "#1a1a1a", padding: "1px 4px", borderRadius: "3px" }}>_ga_*</code>) collect anonymous usage data such as page views, session duration,
              and browser type. These are only set if you click <strong style={{ color: "#ccc" }}>Accept</strong> in the cookie banner.
            </li>
          </ul>

          <h2 style={h2Style}>3. Managing Cookies</h2>
          <p style={pStyle}>
            You can change your cookie preference at any time using the cookie banner (clear your
            <code style={{ fontFamily: "monospace", background: "#1a1a1a", padding: "1px 4px", borderRadius: "3px" }}>localStorage</code> for this site to see the banner again). You can also configure
            your browser to block or delete cookies — refer to your browser's help documentation for instructions.
            Note that blocking cookies may affect site functionality on other sites.
          </p>

          <h2 style={h2Style}>4. Third-Party Cookies</h2>
          <p style={pStyle}>
            When analytics cookies are accepted, <strong style={{ color: "#ccc" }}>Google Analytics</strong> may set
            its own cookies governed by{" "}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "#fff" }}>Google's Privacy Policy</a>.
            We do not control those cookies. You can opt out of Google Analytics across all sites using the{" "}
            <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" style={{ color: "#fff" }}>Google Analytics opt-out browser add-on</a>.
          </p>

          <h2 style={h2Style}>5. Updates to This Policy</h2>
          <p style={pStyle}>
            We may update this Cookie Policy from time to time to reflect changes in technology or regulation.
            Updates will be reflected by the "Last updated" date at the top of this page.
          </p>

          <h2 style={h2Style}>6. Contact</h2>
          <p style={pStyle}>
            Questions about our use of cookies? Email us at{" "}
            <a href="mailto:hello@yaro-labs.com" style={{ color: "#fff" }}>hello@yaro-labs.com</a>.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
