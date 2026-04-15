import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About",
  description: "devkit is a collection of offline-first developer utilities under the yaro-labs.com umbrella.",
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main style={{ maxWidth: "640px", margin: "0 auto", padding: "48px 24px" }}>
        <h1 style={{ fontSize: "22px", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--fg)", marginBottom: "24px" }}>About devkit</h1>
        <div className="blog-prose">
          <p>
            <strong>devkit</strong> is a collection of offline-first developer utilities built by{" "}
            <a href="https://yaro-labs.com" target="_blank" rel="noopener noreferrer">yaro-labs.com</a>.
            Every tool runs entirely in your browser -- nothing you type is sent to a server.
          </p>
          <h2>What devkit includes</h2>
          <ul>
            <li><strong>JSON Formatter</strong> -- format, validate, and minify JSON</li>
            <li><strong>JWT Decoder</strong> -- decode header, payload, and signature</li>
            <li><strong>Regex Tester</strong> -- test patterns with live match highlighting</li>
            <li><strong>UUID Generator</strong> -- generate v4 UUIDs in bulk</li>
            <li><strong>Base64 Codec</strong> -- encode and decode Base64 strings</li>
            <li><strong>Hash Generator</strong> -- MD5, SHA-1, SHA-256, SHA-512 via Web Crypto API</li>
            <li><strong>URL Encoder</strong> -- encode and decode URL components</li>
            <li><strong>Text Diff</strong> -- compare two texts side by side</li>
          </ul>
          <h2>The yaro-labs.com family</h2>
          <p>
            devkit is the first of five tool-kit sub-sites under{" "}
            <a href="https://yaro-labs.com" target="_blank" rel="noopener noreferrer">yaro-labs.com</a>.
            devkit uses a dark theme; the others use light backgrounds with accent colors.
          </p>
          <h2>Open source</h2>
          <p>
            Source code on{" "}
            <a href="https://github.com/yaroslav-labs/devkit" target="_blank" rel="noopener noreferrer">GitHub</a>.
            Built with Next.js 15, Tailwind CSS v4, and no external UI libraries.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
