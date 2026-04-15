# devkit.yaro-labs.com Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build devkit.yaro-labs.com — a dark-themed, offline-first developer utilities site with 8 tools, a blog, and an about page.

**Architecture:** Next.js 15 App Router with SSG throughout; all tool logic runs client-side only. Design system is zinc-scale pure black/white with Geist + Geist Mono fonts, defined via CSS custom properties in globals.css and exposed to Tailwind v4 via `@theme inline`.

**Tech Stack:** Next.js 15, React 19, TypeScript 5, Tailwind CSS v4, gray-matter + marked (blog), next/script GA4, Playwright OG image generation, Vercel deployment.

---

## File Map

```
devkit/
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
├── .eslintrc.json
├── vercel.json
├── public/
│   ├── favicon.ico
│   └── og/                        <- generated OG images (homepage + 8 tools)
├── content/
│   └── blog/
│       ├── offline-first-tools.md
│       └── why-no-tracking.md
├── lib/
│   ├── blog.ts                    <- getAllPosts() + getPostBySlug()
│   └── tools.ts                   <- TOOLS array (slug, name, desc, icon SVG path)
├── components/
│   ├── navbar.tsx                 <- shared top nav (logo, links, search)
│   ├── footer.tsx                 <- single-line copyright footer
│   ├── tool-card.tsx              <- grid card (icon, name, desc, arrow)
│   ├── tool-layout.tsx            <- split-pane wrapper (header + two panes)
│   └── copy-button.tsx            <- clipboard copy with "Copied!" feedback
├── app/
│   ├── globals.css                <- CSS vars + @theme inline + blog-prose
│   ├── layout.tsx                 <- root layout (fonts, GA4, metadata)
│   ├── page.tsx                   <- homepage (hero + tool grid)
│   ├── about/page.tsx
│   ├── blog/
│   │   ├── page.tsx               <- blog index
│   │   └── [slug]/page.tsx        <- blog post
│   ├── json/page.tsx
│   ├── jwt/page.tsx
│   ├── regex/page.tsx
│   ├── uuid/page.tsx
│   ├── base64/page.tsx
│   ├── hash/page.tsx
│   ├── url/page.tsx
│   └── diff/page.tsx
└── scripts/
    └── gen-og.ts                  <- Playwright OG generation script
```

---

## Task 1: Project Scaffold

**Files:**
- Create: `devkit/package.json`
- Create: `devkit/tsconfig.json`
- Create: `devkit/next.config.ts`
- Create: `devkit/postcss.config.mjs`
- Create: `devkit/.eslintrc.json`

- [ ] **Step 1: Initialize the project**

```bash
cd /Users/a1111/Public/Prog/js/devkit
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir no --import-alias "@/*" --yes
```

Expected: scaffolds Next.js 15 with App Router, TypeScript, Tailwind, ESLint into the existing `devkit/` dir (docs/ folder remains intact).

- [ ] **Step 2: Install additional dependencies**

```bash
cd /Users/a1111/Public/Prog/js/devkit
npm install gray-matter marked
npm install --save-dev @types/node playwright tsx
```

- [ ] **Step 3: Verify next.config.ts has no output: export**

File `next.config.ts` should be:

```typescript
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // SSG on Vercel -- no static export needed
}

export default nextConfig
```

- [ ] **Step 4: Set up postcss.config.mjs for Tailwind v4**

```javascript
// postcss.config.mjs
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
}
export default config
```

- [ ] **Step 5: Create required directories**

```bash
mkdir -p /Users/a1111/Public/Prog/js/devkit/public/og
mkdir -p /Users/a1111/Public/Prog/js/devkit/content/blog
mkdir -p /Users/a1111/Public/Prog/js/devkit/scripts
mkdir -p /Users/a1111/Public/Prog/js/devkit/lib
mkdir -p /Users/a1111/Public/Prog/js/devkit/components
```

- [ ] **Step 6: Commit**

```bash
cd /Users/a1111/Public/Prog/js/devkit
git init
git add package.json tsconfig.json next.config.ts postcss.config.mjs .eslintrc.json .gitignore
git commit -m "feat: scaffold Next.js 15 + Tailwind v4 project"
```

---

## Task 2: Design System (globals.css + layout.tsx)

**Files:**
- Create: `app/globals.css`
- Create: `app/layout.tsx`

- [ ] **Step 1: Write globals.css with zinc design tokens**

```css
/* app/globals.css */
@import "tailwindcss";

:root {
  --bg:        #000000;
  --surface:   #09090b;
  --muted:     #18181b;
  --border:    #27272a;
  --border-2:  #3f3f46;
  --fg:        #fafafa;
  --muted-fg:  #a1a1aa;
  --muted-fg2: #71717a;
  --accent:    #fafafa;
  --accent-fg: #09090b;
  --radius:    6px;
}

@theme inline {
  --color-background: var(--bg);
  --color-foreground: var(--fg);
  --color-surface:    var(--surface);
  --color-muted:      var(--muted);
  --color-border:     var(--border);
  --color-border-2:   var(--border-2);
  --color-muted-fg:   var(--muted-fg);
  --color-muted-fg2:  var(--muted-fg2);
  --color-accent:     var(--accent);
  --color-accent-fg:  var(--accent-fg);
  --font-sans: var(--font-geist), system-ui, sans-serif;
  --font-mono: var(--font-geist-mono), monospace;
  --radius-default: var(--radius);
}

@layer base {
  * { box-sizing: border-box; }
  html { background: #000; }
  body {
    background: var(--bg);
    color: var(--fg);
    font-family: var(--font-sans);
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
  }
}

@layer components {
  .blog-prose p {
    color: var(--muted-fg);
    line-height: 1.7;
    margin-bottom: 1rem;
    font-size: 1rem;
  }
  .blog-prose h2 {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--fg);
    margin-top: 2rem;
    margin-bottom: 0.75rem;
    letter-spacing: -0.02em;
  }
  .blog-prose ul {
    list-style-type: disc;
    padding-left: 1.25rem;
    margin-bottom: 1rem;
    color: var(--muted-fg);
    line-height: 1.7;
  }
  .blog-prose li { margin-bottom: 0.25rem; }
  .blog-prose strong { font-weight: 600; color: var(--fg); }
  .blog-prose code {
    font-family: var(--font-mono);
    font-size: 0.85em;
    background: var(--muted);
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 1px 5px;
  }
  .blog-prose pre {
    background: var(--muted);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 1rem;
    overflow-x: auto;
    margin-bottom: 1rem;
  }
  .blog-prose pre code {
    background: none;
    border: none;
    padding: 0;
    font-size: 0.875rem;
  }
  .blog-prose a {
    color: var(--fg);
    text-decoration: underline;
    text-underline-offset: 3px;
  }
}
```

- [ ] **Step 2: Write app/layout.tsx**

```typescript
// app/layout.tsx
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import Script from "next/script"
import "./globals.css"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? ""

export const metadata: Metadata = {
  metadataBase: new URL("https://devkit.yaro-labs.com"),
  title: {
    default: "devkit -- Developer Utilities",
    template: "%s | devkit",
  },
  description:
    "Fast, offline-first developer tools. Format JSON, decode JWTs, test regex, generate UUIDs, encode Base64, hash strings, encode URLs, and diff text -- in the browser.",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "https://devkit.yaro-labs.com",
    siteName: "devkit",
    locale: "en_US",
    images: [{ url: "/og/home.png", width: 1200, height: 630, alt: "devkit -- Developer Utilities" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/home.png"],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.variable} ${geistMono.variable}`}>
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        )}
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Step 3: Create .env.local**

```bash
echo "NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX" > /Users/a1111/Public/Prog/js/devkit/.env.local
```

Replace G-XXXXXXXXXX with real GA4 measurement ID when known.

- [ ] **Step 4: Commit**

```bash
cd /Users/a1111/Public/Prog/js/devkit
git add app/globals.css app/layout.tsx .env.local
git commit -m "feat: design system tokens, fonts, GA4 shell in root layout"
```

---

## Task 3: Shared Components (Navbar + Footer + CopyButton)

**Files:**
- Create: `components/navbar.tsx`
- Create: `components/footer.tsx`
- Create: `components/copy-button.tsx`

- [ ] **Step 1: Write components/navbar.tsx**

```typescript
// components/navbar.tsx
"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Navbar() {
  const pathname = usePathname()
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        height: "56px",
        borderBottom: "1px solid var(--border)",
        background: "var(--surface)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <Link href="/" style={{ fontFamily: "var(--font-mono)", fontSize: "15px", fontWeight: 600, color: "var(--fg)", letterSpacing: "-0.02em", textDecoration: "none" }}>
        dev<span style={{ color: "var(--muted-fg2)" }}>kit</span>
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
        {[
          { href: "/", label: "Tools" },
          { href: "/blog", label: "Blog" },
          { href: "/about", label: "About" },
        ].map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            style={{
              fontSize: "13px",
              fontWeight: 500,
              color: isActive(href) ? "var(--fg)" : "var(--muted-fg)",
              textDecoration: "none",
              padding: "5px 10px",
              borderRadius: "var(--radius)",
              transition: "background 0.12s, color 0.12s",
            }}
          >
            {label}
          </Link>
        ))}
      </div>

      <div style={{ position: "relative" }}>
        <svg
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "var(--muted-fg2)", width: "14px", height: "14px", pointerEvents: "none" }}
        >
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          type="text"
          placeholder="Search tools..."
          style={{
            background: "var(--muted)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
            color: "var(--fg)",
            fontFamily: "var(--font-sans)",
            fontSize: "13px",
            padding: "5px 52px 5px 32px",
            width: "200px",
            outline: "none",
          }}
        />
        <span style={{
          position: "absolute", right: "8px", top: "50%", transform: "translateY(-50%)",
          fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--muted-fg2)",
          background: "var(--border)", borderRadius: "3px", padding: "1px 5px",
        }}>cmd+K</span>
      </div>
    </nav>
  )
}
```

- [ ] **Step 2: Write components/footer.tsx**

```typescript
// components/footer.tsx
import Link from "next/link"

export function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid var(--border)",
      height: "56px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 24px",
    }}>
      <span style={{ fontSize: "12px", color: "var(--muted-fg2)" }}>
        {new Date().getFullYear()} devkit.yaro-labs.com
      </span>
      <div style={{ display: "flex", gap: "16px" }}>
        {[
          { href: "https://github.com/yaroslav-labs/devkit", label: "GitHub", external: true },
          { href: "/about", label: "About", external: false },
          { href: "/blog", label: "Blog", external: false },
        ].map(({ href, label, external }) => (
          <Link
            key={label}
            href={href}
            style={{ fontSize: "12px", color: "var(--muted-fg2)", textDecoration: "none" }}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {label}
          </Link>
        ))}
      </div>
    </footer>
  )
}
```

- [ ] **Step 3: Write components/copy-button.tsx**

```typescript
// components/copy-button.tsx
"use client"
import { useState } from "react"

export function CopyButton({ text, style }: { text: string; style?: React.CSSProperties }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (!text) return
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button
      onClick={handleCopy}
      style={{
        fontSize: "12px",
        fontWeight: 500,
        color: "var(--muted-fg)",
        background: "none",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        padding: "5px 12px",
        cursor: "pointer",
        transition: "background 0.1s, color 0.1s",
        ...style,
      }}
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  )
}
```

- [ ] **Step 4: Commit**

```bash
cd /Users/a1111/Public/Prog/js/devkit
git add components/
git commit -m "feat: navbar, footer, copy-button shared components"
```

---

## Task 4: lib/tools.ts + lib/blog.ts + components/tool-layout.tsx

**Files:**
- Create: `lib/tools.ts`
- Create: `lib/blog.ts`
- Create: `components/tool-layout.tsx`

- [ ] **Step 1: Write lib/tools.ts**

```typescript
// lib/tools.ts
export interface Tool {
  slug: string
  name: string
  description: string
}

export const TOOLS: Tool[] = [
  { slug: "json", name: "JSON Formatter", description: "Format, validate, and minify JSON with syntax highlighting." },
  { slug: "jwt", name: "JWT Decoder", description: "Decode and inspect JWT tokens. View header, payload, signature." },
  { slug: "regex", name: "Regex Tester", description: "Test regular expressions with live match highlighting." },
  { slug: "uuid", name: "UUID Generator", description: "Generate v1, v4, v5 UUIDs. Bulk generate, copy in one click." },
  { slug: "base64", name: "Base64 Codec", description: "Encode or decode Base64 strings and files instantly." },
  { slug: "hash", name: "Hash Generator", description: "Compute MD5, SHA-1, SHA-256, SHA-512 hashes." },
  { slug: "url", name: "URL Encoder", description: "Encode and decode URL components and query strings." },
  { slug: "diff", name: "Text Diff", description: "Compare two texts side by side. Highlight additions and removals." },
]

export function getToolBySlug(slug: string): Tool | undefined {
  return TOOLS.find((t) => t.slug === slug)
}

// SVG icon paths per tool -- each entry is one or two path `d` strings separated by |
export const TOOL_ICONS: Record<string, string> = {
  json: "M4 7V4h4M20 7V4h-4M4 17v3h4M20 17v3h-4",
  jwt: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z",
  regex: "M12 9a3 3 0 100 6 3 3 0 000-6z|M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12",
  uuid: "M2 6h20v12H2zM7 12h2M11 12h2M15 12h2",
  base64: "M4 12V8a4 4 0 014-4h8M20 12v4a4 4 0 01-4 4H8|M8 8l-4 4 4 4M16 8l4 4-4 4",
  hash: "M4 9h16M4 15h16M10 3l-2 18M16 3l-2 18",
  url: "M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71|M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71",
  diff: "M12 3v18M3 9l9-6 9 6M3 15l9 6 9-6",
}
```

- [ ] **Step 2: Write lib/blog.ts**

```typescript
// lib/blog.ts
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
```

- [ ] **Step 3: Write components/tool-layout.tsx**

```typescript
// components/tool-layout.tsx
import Link from "next/link"

export function ToolLayout({ name, description, children }: {
  name: string
  description: string
  children: React.ReactNode
}) {
  return (
    <div style={{ minHeight: "calc(100vh - 56px)", background: "var(--surface)" }}>
      <div style={{ padding: "28px 24px 24px", borderBottom: "1px solid var(--border)" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: "6px",
          fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--muted-fg2)", marginBottom: "12px",
        }}>
          <Link href="/" style={{ color: "var(--muted-fg2)", textDecoration: "none" }}>devkit</Link>
          <span style={{ color: "var(--border-2)" }}>/</span>
          <span style={{ color: "var(--muted-fg)" }}>{name}</span>
        </div>
        <h1 style={{ fontSize: "22px", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--fg)", marginBottom: "6px" }}>
          {name}
        </h1>
        <p style={{ fontSize: "13px", color: "var(--muted-fg)" }}>{description}</p>
      </div>
      {children}
    </div>
  )
}

export function SplitPane({ left, right }: { left: React.ReactNode; right: React.ReactNode }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
      <div style={{ padding: "20px" }}>{left}</div>
      <div style={{ padding: "20px", borderLeft: "1px solid var(--border)" }}>{right}</div>
    </div>
  )
}

export function PaneLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 500,
      color: "var(--muted-fg2)", textTransform: "uppercase" as const, letterSpacing: "0.06em", marginBottom: "10px",
    }}>
      {children}
    </div>
  )
}

export function CodeTextarea({ value, onChange, placeholder, minHeight = "240px" }: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  minHeight?: string
}) {
  return (
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      spellCheck={false}
      style={{
        width: "100%", minHeight,
        background: "var(--muted)", border: "1px solid var(--border)",
        borderRadius: "var(--radius)", color: "var(--fg)",
        fontFamily: "var(--font-mono)", fontSize: "12px", lineHeight: "1.6",
        padding: "12px", resize: "vertical" as const, outline: "none",
      }}
    />
  )
}

export function OutputBlock({ children, minHeight = "240px" }: { children: React.ReactNode; minHeight?: string }) {
  return (
    <div style={{
      background: "var(--muted)", border: "1px solid var(--border)",
      borderRadius: "var(--radius)", padding: "12px",
      fontFamily: "var(--font-mono)", fontSize: "12px", lineHeight: "1.6",
      color: "var(--fg)", minHeight, whiteSpace: "pre-wrap" as const, overflowX: "auto" as const,
    }}>
      {children}
    </div>
  )
}

export function PaneActions({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "10px" }}>
      {children}
    </div>
  )
}

export function BtnPrimary({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "var(--fg)", color: "var(--accent-fg)",
        fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 600,
        border: "none", borderRadius: "var(--radius)", padding: "6px 14px", cursor: "pointer",
      }}
    >
      {children}
    </button>
  )
}

export function BtnGhost({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      style={{
        fontSize: "12px", fontWeight: 500, color: "var(--muted-fg)",
        background: "none", border: "1px solid var(--border)",
        borderRadius: "var(--radius)", padding: "5px 12px", cursor: "pointer",
      }}
    >
      {children}
    </button>
  )
}
```

- [ ] **Step 4: Commit**

```bash
cd /Users/a1111/Public/Prog/js/devkit
git add lib/ components/tool-layout.tsx
git commit -m "feat: tools data, blog lib, split-pane layout primitives"
```

---

## Task 5: Homepage

**Files:**
- Create: `app/page.tsx`
- Create: `components/tool-card.tsx`

- [ ] **Step 1: Write components/tool-card.tsx**

```typescript
// components/tool-card.tsx
import Link from "next/link"
import { Tool, TOOL_ICONS } from "@/lib/tools"

export function ToolCard({ tool }: { tool: Tool }) {
  const iconPaths = (TOOL_ICONS[tool.slug] ?? "").split("|")
  return (
    <Link
      href={`/${tool.slug}`}
      style={{
        background: "var(--surface)", padding: "20px 18px",
        display: "flex", flexDirection: "column", gap: "10px",
        textDecoration: "none", transition: "background 0.1s", cursor: "pointer",
      }}
    >
      <div style={{
        width: "32px", height: "32px", borderRadius: "var(--radius)",
        border: "1px solid var(--border)", background: "var(--muted)",
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
          style={{ width: "15px", height: "15px", color: "var(--fg)" }}>
          {iconPaths.map((p, i) => <path key={i} d={p} />)}
        </svg>
      </div>
      <div>
        <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--fg)", marginBottom: "4px" }}>{tool.name}</div>
        <div style={{ fontSize: "12px", color: "var(--muted-fg)", lineHeight: "1.45" }}>{tool.description}</div>
      </div>
      <div style={{ marginTop: "auto", color: "var(--muted-fg2)", fontSize: "16px", alignSelf: "flex-end" }}>
        &rarr;
      </div>
    </Link>
  )
}
```

- [ ] **Step 2: Write app/page.tsx**

```typescript
// app/page.tsx
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
          <h1 style={{
            fontSize: "42px", fontWeight: 700, letterSpacing: "-0.04em",
            lineHeight: 1.1, color: "var(--fg)", maxWidth: "500px", marginBottom: "16px",
          }}>
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
            <a href="https://github.com/yaroslav-labs/devkit" target="_blank" rel="noopener noreferrer"
              style={{
                background: "none", color: "var(--fg)",
                fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 500,
                border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "7px 18px",
                cursor: "pointer", textDecoration: "none", display: "inline-block",
              }}>View source &rarr;</a>
          </div>
        </section>

        <section id="tools" style={{ background: "var(--surface)", padding: "32px 24px 48px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
            <span style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--muted-fg2)" }}>All tools</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--muted-fg2)" }}>{TOOLS.length} tools</span>
          </div>
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1px", background: "var(--border)",
            border: "1px solid var(--border)", borderRadius: "calc(var(--radius) + 1px)", overflow: "hidden",
          }}>
            {TOOLS.map(tool => <ToolCard key={tool.slug} tool={tool} />)}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 3: Run dev and visually verify**

```bash
cd /Users/a1111/Public/Prog/js/devkit && npm run dev
```

Open http://localhost:3000. Verify: sticky navbar, hero badge/headline/CTAs, 4-col grid with 8 tool cards.

- [ ] **Step 4: Commit**

```bash
cd /Users/a1111/Public/Prog/js/devkit
git add app/page.tsx components/tool-card.tsx
git commit -m "feat: homepage hero + 4-col tool grid"
```

---

## Task 6: JSON Formatter

**Files:**
- Create: `app/json/page.tsx`
- Create: `app/json/layout.tsx`

- [ ] **Step 1: Write app/json/layout.tsx (metadata)**

```typescript
// app/json/layout.tsx
import type { Metadata } from "next"
export const metadata: Metadata = {
  title: "JSON Formatter",
  description: "Format, validate, and minify JSON. Works entirely in your browser.",
  openGraph: { images: [{ url: "/og/json.png" }] },
  twitter: { card: "summary_large_image", images: ["/og/json.png"] },
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }
```

- [ ] **Step 2: Write app/json/page.tsx**

```typescript
// app/json/page.tsx
"use client"
import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ToolLayout, SplitPane, PaneLabel, CodeTextarea, OutputBlock, PaneActions, BtnPrimary, BtnGhost } from "@/components/tool-layout"
import { CopyButton } from "@/components/copy-button"

export default function JsonPage() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [error, setError] = useState("")

  const format = () => {
    try { setOutput(JSON.stringify(JSON.parse(input), null, 2)); setError("") }
    catch (e) { setError((e as Error).message); setOutput("") }
  }

  const minify = () => {
    try { setOutput(JSON.stringify(JSON.parse(input))); setError("") }
    catch (e) { setError((e as Error).message); setOutput("") }
  }

  const clear = () => { setInput(""); setOutput(""); setError("") }

  const download = () => {
    const a = document.createElement("a")
    a.href = URL.createObjectURL(new Blob([output], { type: "application/json" }))
    a.download = "output.json"
    a.click()
  }

  return (
    <>
      <Navbar />
      <ToolLayout name="JSON Formatter" description="Format, validate, and minify JSON. Works entirely in your browser -- nothing is sent to a server.">
        <SplitPane
          left={<>
            <PaneLabel>Input</PaneLabel>
            <CodeTextarea value={input} onChange={setInput} placeholder='{"key": "value"}' />
            {error && <p style={{ color: "#f87171", fontSize: "12px", fontFamily: "var(--font-mono)", marginTop: "8px" }}>{error}</p>}
            <PaneActions>
              <BtnPrimary onClick={format}>Format</BtnPrimary>
              <BtnGhost onClick={minify}>Minify</BtnGhost>
              <BtnGhost onClick={clear}>Clear</BtnGhost>
            </PaneActions>
          </>}
          right={<>
            <PaneLabel>Output</PaneLabel>
            <OutputBlock>{output}</OutputBlock>
            <PaneActions>
              <CopyButton text={output} />
              {output && <BtnGhost onClick={download}>Download</BtnGhost>}
            </PaneActions>
          </>}
        />
      </ToolLayout>
      <Footer />
    </>
  )
}
```

- [ ] **Step 3: Commit**

```bash
cd /Users/a1111/Public/Prog/js/devkit
git add app/json/
git commit -m "feat: JSON Formatter tool page"
```

---

## Task 7: JWT Decoder

**Files:**
- Create: `app/jwt/page.tsx`
- Create: `app/jwt/layout.tsx`

- [ ] **Step 1: Write app/jwt/layout.tsx**

```typescript
// app/jwt/layout.tsx
import type { Metadata } from "next"
export const metadata: Metadata = {
  title: "JWT Decoder",
  description: "Decode and inspect JWT tokens. View header, payload, and signature.",
  openGraph: { images: [{ url: "/og/jwt.png" }] },
  twitter: { card: "summary_large_image", images: ["/og/jwt.png"] },
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }
```

- [ ] **Step 2: Write app/jwt/page.tsx**

```typescript
// app/jwt/page.tsx
"use client"
import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ToolLayout, SplitPane, PaneLabel, CodeTextarea, OutputBlock, PaneActions, BtnPrimary, BtnGhost } from "@/components/tool-layout"
import { CopyButton } from "@/components/copy-button"

function decodeBase64Url(str: string): string {
  const padded = str.replace(/-/g, "+").replace(/_/g, "/")
  const pad = padded.length % 4
  const full = pad ? padded + "=".repeat(4 - pad) : padded
  return decodeURIComponent(atob(full).split("").map(c => "%" + c.charCodeAt(0).toString(16).padStart(2, "0")).join(""))
}

export default function JwtPage() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [error, setError] = useState("")

  const decode = () => {
    try {
      const parts = input.trim().split(".")
      if (parts.length !== 3) throw new Error("Invalid JWT: expected 3 dot-separated parts")
      const result = {
        header: JSON.parse(decodeBase64Url(parts[0])),
        payload: JSON.parse(decodeBase64Url(parts[1])),
        signature: parts[2],
      }
      setOutput(JSON.stringify(result, null, 2))
      setError("")
    } catch (e) { setError((e as Error).message); setOutput("") }
  }

  return (
    <>
      <Navbar />
      <ToolLayout name="JWT Decoder" description="Decode and inspect JWT tokens. View header, payload, and signature. Nothing is sent to a server.">
        <SplitPane
          left={<>
            <PaneLabel>JWT Token</PaneLabel>
            <CodeTextarea value={input} onChange={setInput} placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." />
            {error && <p style={{ color: "#f87171", fontSize: "12px", fontFamily: "var(--font-mono)", marginTop: "8px" }}>{error}</p>}
            <PaneActions>
              <BtnPrimary onClick={decode}>Decode</BtnPrimary>
              <BtnGhost onClick={() => { setInput(""); setOutput(""); setError("") }}>Clear</BtnGhost>
            </PaneActions>
          </>}
          right={<>
            <PaneLabel>Decoded</PaneLabel>
            <OutputBlock>{output}</OutputBlock>
            <PaneActions><CopyButton text={output} /></PaneActions>
          </>}
        />
      </ToolLayout>
      <Footer />
    </>
  )
}
```

- [ ] **Step 3: Commit**

```bash
cd /Users/a1111/Public/Prog/js/devkit
git add app/jwt/
git commit -m "feat: JWT Decoder tool page"
```

---

## Task 8: Regex Tester

**Files:**
- Create: `app/regex/page.tsx`
- Create: `app/regex/layout.tsx`

- [ ] **Step 1: Write app/regex/layout.tsx**

```typescript
// app/regex/layout.tsx
import type { Metadata } from "next"
export const metadata: Metadata = {
  title: "Regex Tester",
  description: "Test regular expressions with live match highlighting.",
  openGraph: { images: [{ url: "/og/regex.png" }] },
  twitter: { card: "summary_large_image", images: ["/og/regex.png"] },
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }
```

- [ ] **Step 2: Write app/regex/page.tsx**

```typescript
// app/regex/page.tsx
"use client"
import { useState, useMemo } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ToolLayout, PaneLabel, CodeTextarea } from "@/components/tool-layout"

export default function RegexPage() {
  const [pattern, setPattern] = useState("")
  const [flags, setFlags] = useState("g")
  const [testStr, setTestStr] = useState("")

  const { highlighted, matchCount, error } = useMemo(() => {
    if (!pattern) return { highlighted: escapeHtml(testStr), matchCount: 0, error: "" }
    try {
      const re = new RegExp(pattern, flags)
      const matches: Array<{ index: number; length: number }> = []
      if (flags.includes("g")) {
        re.lastIndex = 0
        let m
        while ((m = re.exec(testStr)) !== null) {
          matches.push({ index: m.index, length: m[0].length })
          if (m[0].length === 0) re.lastIndex++
        }
      } else {
        const m = re.exec(testStr)
        if (m) matches.push({ index: m.index, length: m[0].length })
      }
      let result = ""
      let cursor = 0
      for (const { index, length } of matches) {
        result += escapeHtml(testStr.slice(cursor, index))
        result += `<mark style="background:#3f3f46;color:#fafafa;border-radius:2px">${escapeHtml(testStr.slice(index, index + length))}</mark>`
        cursor = index + length
      }
      result += escapeHtml(testStr.slice(cursor))
      return { highlighted: result, matchCount: matches.length, error: "" }
    } catch (e) {
      return { highlighted: escapeHtml(testStr), matchCount: 0, error: (e as Error).message }
    }
  }, [pattern, flags, testStr])

  function escapeHtml(s: string) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  }

  const inputStyle = {
    width: "100%", background: "var(--muted)", border: "1px solid var(--border)",
    borderRadius: "var(--radius)", color: "var(--fg)",
    fontFamily: "var(--font-mono)", fontSize: "13px", padding: "8px 12px", outline: "none",
  }

  return (
    <>
      <Navbar />
      <ToolLayout name="Regex Tester" description="Test regular expressions with live match highlighting. Runs entirely in your browser.">
        <div style={{ padding: "20px" }}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
            <div style={{ flex: 1 }}>
              <PaneLabel>Pattern</PaneLabel>
              <input value={pattern} onChange={e => setPattern(e.target.value)} placeholder="[a-z]+" style={inputStyle} />
            </div>
            <div style={{ width: "80px" }}>
              <PaneLabel>Flags</PaneLabel>
              <input value={flags} onChange={e => setFlags(e.target.value)} placeholder="gim" style={{ ...inputStyle, width: "80px" }} />
            </div>
          </div>
          {error && <p style={{ color: "#f87171", fontSize: "12px", fontFamily: "var(--font-mono)", marginBottom: "12px" }}>{error}</p>}
          <PaneLabel>Test string</PaneLabel>
          <CodeTextarea value={testStr} onChange={setTestStr} placeholder="Enter text to test..." minHeight="120px" />
          <div style={{ marginTop: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <PaneLabel>Matches</PaneLabel>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--muted-fg2)" }}>
                {matchCount} match{matchCount !== 1 ? "es" : ""}
              </span>
            </div>
            <div
              style={{
                background: "var(--muted)", border: "1px solid var(--border)",
                borderRadius: "var(--radius)", padding: "12px",
                fontFamily: "var(--font-mono)", fontSize: "12px", lineHeight: "1.6",
                color: "var(--fg)", minHeight: "120px", whiteSpace: "pre-wrap",
              }}
              dangerouslySetInnerHTML={{ __html: highlighted }}
            />
          </div>
        </div>
      </ToolLayout>
      <Footer />
    </>
  )
}
```

- [ ] **Step 3: Commit**

```bash
cd /Users/a1111/Public/Prog/js/devkit
git add app/regex/
git commit -m "feat: Regex Tester with live match highlighting"
```

---

## Task 9: UUID Generator

**Files:**
- Create: `app/uuid/page.tsx`
- Create: `app/uuid/layout.tsx`

- [ ] **Step 1: Write app/uuid/layout.tsx**

```typescript
// app/uuid/layout.tsx
import type { Metadata } from "next"
export const metadata: Metadata = {
  title: "UUID Generator",
  description: "Generate UUID v4 identifiers. Bulk generate up to 100 at a time.",
  openGraph: { images: [{ url: "/og/uuid.png" }] },
  twitter: { card: "summary_large_image", images: ["/og/uuid.png"] },
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }
```

- [ ] **Step 2: Write app/uuid/page.tsx**

```typescript
// app/uuid/page.tsx
"use client"
import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ToolLayout, PaneLabel, PaneActions, BtnPrimary, BtnGhost } from "@/components/tool-layout"
import { CopyButton } from "@/components/copy-button"

function uuidv4(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
    const r = (crypto.getRandomValues(new Uint8Array(1))[0] & 0x0f) | 0
    const v = c === "x" ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export default function UuidPage() {
  const [count, setCount] = useState(1)
  const [uuids, setUuids] = useState<string[]>([])

  const generate = () => {
    const result: string[] = []
    for (let i = 0; i < Math.min(count, 100); i++) result.push(uuidv4())
    setUuids(result)
  }

  return (
    <>
      <Navbar />
      <ToolLayout name="UUID Generator" description="Generate UUID v4 identifiers. Bulk generate up to 100 at a time. Runs entirely in your browser.">
        <div style={{ padding: "20px", maxWidth: "640px" }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: "12px", marginBottom: "16px" }}>
            <div>
              <PaneLabel>Count (1-100)</PaneLabel>
              <input
                type="number" min={1} max={100} value={count}
                onChange={e => setCount(Math.max(1, Math.min(100, Number(e.target.value))))}
                style={{
                  width: "80px", background: "var(--muted)", border: "1px solid var(--border)",
                  borderRadius: "var(--radius)", color: "var(--fg)",
                  fontFamily: "var(--font-mono)", fontSize: "13px", padding: "5px 10px", outline: "none",
                }}
              />
            </div>
          </div>
          <PaneActions>
            <BtnPrimary onClick={generate}>Generate</BtnPrimary>
            {uuids.length > 0 && <BtnGhost onClick={() => setUuids([])}>Clear</BtnGhost>}
            {uuids.length > 0 && <CopyButton text={uuids.join("\n")} />}
          </PaneActions>
          {uuids.length > 0 && (
            <div style={{ marginTop: "16px", border: "1px solid var(--border)", borderRadius: "var(--radius)", overflow: "hidden" }}>
              {uuids.map((id, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "10px 12px",
                  background: "var(--muted)",
                  borderBottom: i < uuids.length - 1 ? "1px solid var(--border)" : "none",
                }}>
                  <code style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--fg)" }}>{id}</code>
                  <CopyButton text={id} />
                </div>
              ))}
            </div>
          )}
        </div>
      </ToolLayout>
      <Footer />
    </>
  )
}
```

- [ ] **Step 3: Commit**

```bash
cd /Users/a1111/Public/Prog/js/devkit
git add app/uuid/
git commit -m "feat: UUID Generator tool page"
```

---

## Task 10: Base64 Codec

**Files:**
- Create: `app/base64/page.tsx`
- Create: `app/base64/layout.tsx`

- [ ] **Step 1: Write app/base64/layout.tsx**

```typescript
// app/base64/layout.tsx
import type { Metadata } from "next"
export const metadata: Metadata = {
  title: "Base64 Codec",
  description: "Encode or decode Base64 strings. Runs entirely in your browser.",
  openGraph: { images: [{ url: "/og/base64.png" }] },
  twitter: { card: "summary_large_image", images: ["/og/base64.png"] },
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }
```

- [ ] **Step 2: Write app/base64/page.tsx**

```typescript
// app/base64/page.tsx
"use client"
import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ToolLayout, SplitPane, PaneLabel, CodeTextarea, OutputBlock, PaneActions, BtnPrimary, BtnGhost } from "@/components/tool-layout"
import { CopyButton } from "@/components/copy-button"

export default function Base64Page() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [error, setError] = useState("")
  const [mode, setMode] = useState<"encode" | "decode">("encode")

  const run = () => {
    try {
      if (mode === "encode") {
        setOutput(btoa(unescape(encodeURIComponent(input))))
      } else {
        setOutput(decodeURIComponent(escape(atob(input.trim()))))
      }
      setError("")
    } catch (e) { setError((e as Error).message); setOutput("") }
  }

  const swap = () => { setInput(output); setOutput(""); setMode(m => m === "encode" ? "decode" : "encode") }

  const modeBtn = (m: "encode" | "decode") => (
    <button key={m} onClick={() => setMode(m)} style={{
      padding: "4px 12px", fontSize: "12px", fontFamily: "var(--font-mono)",
      border: "1px solid var(--border)", borderRadius: "var(--radius)", cursor: "pointer",
      background: mode === m ? "var(--fg)" : "var(--muted)",
      color: mode === m ? "var(--accent-fg)" : "var(--muted-fg)",
    }}>{m.charAt(0).toUpperCase() + m.slice(1)}</button>
  )

  return (
    <>
      <Navbar />
      <ToolLayout name="Base64 Codec" description="Encode or decode Base64 strings. Runs entirely in your browser.">
        <SplitPane
          left={<>
            <div style={{ display: "flex", gap: "6px", marginBottom: "10px" }}>
              {modeBtn("encode")}{modeBtn("decode")}
            </div>
            <PaneLabel>Input</PaneLabel>
            <CodeTextarea value={input} onChange={setInput} placeholder={mode === "encode" ? "Text to encode..." : "Base64 to decode..."} />
            {error && <p style={{ color: "#f87171", fontSize: "12px", fontFamily: "var(--font-mono)", marginTop: "8px" }}>{error}</p>}
            <PaneActions>
              <BtnPrimary onClick={run}>{mode === "encode" ? "Encode" : "Decode"}</BtnPrimary>
              <BtnGhost onClick={swap}>Swap</BtnGhost>
              <BtnGhost onClick={() => { setInput(""); setOutput(""); setError("") }}>Clear</BtnGhost>
            </PaneActions>
          </>}
          right={<>
            <PaneLabel>Output</PaneLabel>
            <OutputBlock>{output}</OutputBlock>
            <PaneActions><CopyButton text={output} /></PaneActions>
          </>}
        />
      </ToolLayout>
      <Footer />
    </>
  )
}
```

- [ ] **Step 3: Commit**

```bash
cd /Users/a1111/Public/Prog/js/devkit
git add app/base64/
git commit -m "feat: Base64 Codec tool page"
```

---

## Task 11: Hash Generator

**Files:**
- Create: `app/hash/page.tsx`
- Create: `app/hash/layout.tsx`

- [ ] **Step 1: Write app/hash/layout.tsx**

```typescript
// app/hash/layout.tsx
import type { Metadata } from "next"
export const metadata: Metadata = {
  title: "Hash Generator",
  description: "Compute MD5, SHA-1, SHA-256, SHA-512 hashes using the Web Crypto API.",
  openGraph: { images: [{ url: "/og/hash.png" }] },
  twitter: { card: "summary_large_image", images: ["/og/hash.png"] },
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }
```

- [ ] **Step 2: Write lib/md5.ts (pure JS MD5)**

```typescript
// lib/md5.ts
// Pure JS MD5 -- needed because MD5 is excluded from Web Crypto API (cryptographically broken)
function safeAdd(x: number, y: number) {
  const lsw = (x & 0xffff) + (y & 0xffff)
  const msw = (x >> 16) + (y >> 16) + (lsw >> 16)
  return (msw << 16) | (lsw & 0xffff)
}
function bitRotateLeft(num: number, cnt: number) { return (num << cnt) | (num >>> (32 - cnt)) }
function md5cmn(q: number, a: number, b: number, x: number, s: number, t: number) {
  return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b)
}
function md5ff(a: number, b: number, c: number, d: number, x: number, s: number, t: number) { return md5cmn((b & c) | (~b & d), a, b, x, s, t) }
function md5gg(a: number, b: number, c: number, d: number, x: number, s: number, t: number) { return md5cmn((b & d) | (c & ~d), a, b, x, s, t) }
function md5hh(a: number, b: number, c: number, d: number, x: number, s: number, t: number) { return md5cmn(b ^ c ^ d, a, b, x, s, t) }
function md5ii(a: number, b: number, c: number, d: number, x: number, s: number, t: number) { return md5cmn(c ^ (b | ~d), a, b, x, s, t) }

function binlMD5(x: number[], len: number): number[] {
  x[len >> 5] |= 0x80 << len % 32
  x[(((len + 64) >>> 9) << 4) + 14] = len
  let a = 1732584193, b = -271733879, c = -1732584194, d = 271733878
  for (let i = 0; i < x.length; i += 16) {
    const [olda, oldb, oldc, oldd] = [a, b, c, d]
    a=md5ff(a,b,c,d,x[i],7,-680876936);d=md5ff(d,a,b,c,x[i+1],12,-389564586);c=md5ff(c,d,a,b,x[i+2],17,606105819);b=md5ff(b,c,d,a,x[i+3],22,-1044525330)
    a=md5ff(a,b,c,d,x[i+4],7,-176418897);d=md5ff(d,a,b,c,x[i+5],12,1200080426);c=md5ff(c,d,a,b,x[i+6],17,-1473231341);b=md5ff(b,c,d,a,x[i+7],22,-45705983)
    a=md5ff(a,b,c,d,x[i+8],7,1770035416);d=md5ff(d,a,b,c,x[i+9],12,-1958414417);c=md5ff(c,d,a,b,x[i+10],17,-42063);b=md5ff(b,c,d,a,x[i+11],22,-1990404162)
    a=md5ff(a,b,c,d,x[i+12],7,1804603682);d=md5ff(d,a,b,c,x[i+13],12,-40341101);c=md5ff(c,d,a,b,x[i+14],17,-1502002290);b=md5ff(b,c,d,a,x[i+15],22,1236535329)
    a=md5gg(a,b,c,d,x[i+1],5,-165796510);d=md5gg(d,a,b,c,x[i+6],9,-1069501632);c=md5gg(c,d,a,b,x[i+11],14,643717713);b=md5gg(b,c,d,a,x[i],20,-373897302)
    a=md5gg(a,b,c,d,x[i+5],5,-701558691);d=md5gg(d,a,b,c,x[i+10],9,38016083);c=md5gg(c,d,a,b,x[i+15],14,-660478335);b=md5gg(b,c,d,a,x[i+4],20,-405537848)
    a=md5gg(a,b,c,d,x[i+9],5,568446438);d=md5gg(d,a,b,c,x[i+14],9,-1019803690);c=md5gg(c,d,a,b,x[i+3],14,-187363961);b=md5gg(b,c,d,a,x[i+8],20,1163531501)
    a=md5gg(a,b,c,d,x[i+13],5,-1444681467);d=md5gg(d,a,b,c,x[i+2],9,-51403784);c=md5gg(c,d,a,b,x[i+7],14,1735328473);b=md5gg(b,c,d,a,x[i+12],20,-1926607734)
    a=md5hh(a,b,c,d,x[i+5],4,-378558);d=md5hh(d,a,b,c,x[i+8],11,-2022574463);c=md5hh(c,d,a,b,x[i+11],16,1839030562);b=md5hh(b,c,d,a,x[i+14],23,-35309556)
    a=md5hh(a,b,c,d,x[i+1],4,-1530992060);d=md5hh(d,a,b,c,x[i+4],11,1272893353);c=md5hh(c,d,a,b,x[i+7],16,-155497632);b=md5hh(b,c,d,a,x[i+10],23,-1094730640)
    a=md5hh(a,b,c,d,x[i+13],4,681279174);d=md5hh(d,a,b,c,x[i],11,-358537222);c=md5hh(c,d,a,b,x[i+3],16,-722521979);b=md5hh(b,c,d,a,x[i+6],23,76029189)
    a=md5hh(a,b,c,d,x[i+9],4,-640364487);d=md5hh(d,a,b,c,x[i+12],11,-421815835);c=md5hh(c,d,a,b,x[i+15],16,530742520);b=md5hh(b,c,d,a,x[i+2],23,-995338651)
    a=md5ii(a,b,c,d,x[i],6,-198630844);d=md5ii(d,a,b,c,x[i+7],10,1126891415);c=md5ii(c,d,a,b,x[i+14],15,-1416354905);b=md5ii(b,c,d,a,x[i+5],21,-57434055)
    a=md5ii(a,b,c,d,x[i+12],6,1700485571);d=md5ii(d,a,b,c,x[i+3],10,-1894986606);c=md5ii(c,d,a,b,x[i+10],15,-1051523);b=md5ii(b,c,d,a,x[i+1],21,-2054922799)
    a=md5ii(a,b,c,d,x[i+8],6,1873313359);d=md5ii(d,a,b,c,x[i+15],10,-30611744);c=md5ii(c,d,a,b,x[i+6],15,-1560198380);b=md5ii(b,c,d,a,x[i+13],21,1309151649)
    a=md5ii(a,b,c,d,x[i+4],6,-145523070);d=md5ii(d,a,b,c,x[i+11],10,-1120210379);c=md5ii(c,d,a,b,x[i+2],15,718787259);b=md5ii(b,c,d,a,x[i+9],21,-343485551)
    a=safeAdd(a,olda);b=safeAdd(b,oldb);c=safeAdd(c,oldc);d=safeAdd(d,oldd)
  }
  return [a, b, c, d]
}

function str2binl(str: string): number[] {
  const bin: number[] = [], mask = (1 << 8) - 1
  for (let i = 0; i < str.length * 8; i += 8) bin[i >> 5] |= (str.charCodeAt(i / 8) & mask) << i % 32
  return bin
}

function binl2hex(binarray: number[]): string {
  const hexTab = "0123456789abcdef"
  let str = ""
  for (let i = 0; i < binarray.length * 4; i++) {
    str += hexTab.charAt((binarray[i >> 2] >> (i % 4 * 8 + 4)) & 0xf)
        +  hexTab.charAt((binarray[i >> 2] >> (i % 4 * 8)) & 0xf)
  }
  return str
}

export function md5(input: string): string {
  const encoded = unescape(encodeURIComponent(input))
  return binl2hex(binlMD5(str2binl(encoded), encoded.length * 8))
}
```

- [ ] **Step 3: Write app/hash/page.tsx**

```typescript
// app/hash/page.tsx
"use client"
import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ToolLayout, PaneLabel, CodeTextarea, PaneActions, BtnPrimary, BtnGhost } from "@/components/tool-layout"
import { CopyButton } from "@/components/copy-button"
import { md5 } from "@/lib/md5"

async function shaHash(algo: "SHA-1" | "SHA-256" | "SHA-512", input: string): Promise<string> {
  const buf = await crypto.subtle.digest(algo, new TextEncoder().encode(input))
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("")
}

const ALGORITHMS = ["MD5", "SHA-1", "SHA-256", "SHA-512"] as const
type Algorithm = typeof ALGORITHMS[number]

export default function HashPage() {
  const [input, setInput] = useState("")
  const [hashes, setHashes] = useState<Record<string, string>>({})

  const compute = async () => {
    const results: Record<string, string> = {}
    results["MD5"] = md5(input)
    results["SHA-1"] = await shaHash("SHA-1", input)
    results["SHA-256"] = await shaHash("SHA-256", input)
    results["SHA-512"] = await shaHash("SHA-512", input)
    setHashes(results)
  }

  return (
    <>
      <Navbar />
      <ToolLayout name="Hash Generator" description="Compute MD5, SHA-1, SHA-256, SHA-512 hashes using the Web Crypto API. Runs entirely in your browser.">
        <div style={{ padding: "20px" }}>
          <PaneLabel>Input</PaneLabel>
          <CodeTextarea value={input} onChange={setInput} placeholder="Text to hash..." minHeight="120px" />
          <PaneActions>
            <BtnPrimary onClick={compute}>Compute hashes</BtnPrimary>
            <BtnGhost onClick={() => { setInput(""); setHashes({}) }}>Clear</BtnGhost>
          </PaneActions>

          {Object.keys(hashes).length > 0 && (
            <div style={{ marginTop: "20px", border: "1px solid var(--border)", borderRadius: "var(--radius)", overflow: "hidden" }}>
              {ALGORITHMS.map((a, i) => (
                <div key={a} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px",
                  padding: "12px 14px", background: "var(--muted)",
                  borderBottom: i < ALGORITHMS.length - 1 ? "1px solid var(--border)" : "none",
                }}>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--muted-fg2)", marginBottom: "4px" }}>{a}</div>
                    <code style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--fg)", wordBreak: "break-all" }}>{hashes[a]}</code>
                  </div>
                  <CopyButton text={hashes[a]} style={{ flexShrink: 0 }} />
                </div>
              ))}
            </div>
          )}
        </div>
      </ToolLayout>
      <Footer />
    </>
  )
}
```

- [ ] **Step 4: Commit**

```bash
cd /Users/a1111/Public/Prog/js/devkit
git add app/hash/ lib/md5.ts
git commit -m "feat: Hash Generator with MD5 + SHA via Web Crypto"
```

---

## Task 12: URL Encoder

**Files:**
- Create: `app/url/page.tsx`
- Create: `app/url/layout.tsx`

- [ ] **Step 1: Write app/url/layout.tsx**

```typescript
// app/url/layout.tsx
import type { Metadata } from "next"
export const metadata: Metadata = {
  title: "URL Encoder",
  description: "Encode and decode URL components and query strings.",
  openGraph: { images: [{ url: "/og/url.png" }] },
  twitter: { card: "summary_large_image", images: ["/og/url.png"] },
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }
```

- [ ] **Step 2: Write app/url/page.tsx**

```typescript
// app/url/page.tsx
"use client"
import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ToolLayout, SplitPane, PaneLabel, CodeTextarea, OutputBlock, PaneActions, BtnPrimary, BtnGhost } from "@/components/tool-layout"
import { CopyButton } from "@/components/copy-button"

export default function UrlPage() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [error, setError] = useState("")
  const [mode, setMode] = useState<"encode" | "decode">("encode")

  const run = () => {
    try {
      setOutput(mode === "encode" ? encodeURIComponent(input) : decodeURIComponent(input))
      setError("")
    } catch (e) { setError((e as Error).message); setOutput("") }
  }

  const swap = () => { setInput(output); setOutput(""); setMode(m => m === "encode" ? "decode" : "encode") }

  const modeBtn = (m: "encode" | "decode") => (
    <button key={m} onClick={() => setMode(m)} style={{
      padding: "4px 12px", fontSize: "12px", fontFamily: "var(--font-mono)",
      border: "1px solid var(--border)", borderRadius: "var(--radius)", cursor: "pointer",
      background: mode === m ? "var(--fg)" : "var(--muted)",
      color: mode === m ? "var(--accent-fg)" : "var(--muted-fg)",
    }}>{m.charAt(0).toUpperCase() + m.slice(1)}</button>
  )

  return (
    <>
      <Navbar />
      <ToolLayout name="URL Encoder" description="Encode and decode URL components and query strings. Runs entirely in your browser.">
        <SplitPane
          left={<>
            <div style={{ display: "flex", gap: "6px", marginBottom: "10px" }}>{modeBtn("encode")}{modeBtn("decode")}</div>
            <PaneLabel>Input</PaneLabel>
            <CodeTextarea value={input} onChange={setInput} placeholder={mode === "encode" ? "hello world" : "hello%20world"} />
            {error && <p style={{ color: "#f87171", fontSize: "12px", fontFamily: "var(--font-mono)", marginTop: "8px" }}>{error}</p>}
            <PaneActions>
              <BtnPrimary onClick={run}>{mode === "encode" ? "Encode" : "Decode"}</BtnPrimary>
              <BtnGhost onClick={swap}>Swap</BtnGhost>
              <BtnGhost onClick={() => { setInput(""); setOutput(""); setError("") }}>Clear</BtnGhost>
            </PaneActions>
          </>}
          right={<>
            <PaneLabel>Output</PaneLabel>
            <OutputBlock>{output}</OutputBlock>
            <PaneActions><CopyButton text={output} /></PaneActions>
          </>}
        />
      </ToolLayout>
      <Footer />
    </>
  )
}
```

- [ ] **Step 3: Commit**

```bash
cd /Users/a1111/Public/Prog/js/devkit
git add app/url/
git commit -m "feat: URL Encoder/Decoder tool page"
```

---

## Task 13: Text Diff

**Files:**
- Create: `app/diff/page.tsx`
- Create: `app/diff/layout.tsx`

- [ ] **Step 1: Write app/diff/layout.tsx**

```typescript
// app/diff/layout.tsx
import type { Metadata } from "next"
export const metadata: Metadata = {
  title: "Text Diff",
  description: "Compare two texts side by side. Highlight additions and removals.",
  openGraph: { images: [{ url: "/og/diff.png" }] },
  twitter: { card: "summary_large_image", images: ["/og/diff.png"] },
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }
```

- [ ] **Step 2: Write app/diff/page.tsx**

```typescript
// app/diff/page.tsx
"use client"
import { useState, useMemo } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ToolLayout, PaneLabel, CodeTextarea, PaneActions, BtnPrimary, BtnGhost } from "@/components/tool-layout"

type DiffLine = { type: "equal" | "add" | "remove"; text: string }

function computeDiff(a: string, b: string): DiffLine[] {
  const aLines = a.split("\n"), bLines = b.split("\n")
  const m = aLines.length, n = bLines.length
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0))
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = aLines[i-1] === bLines[j-1] ? dp[i-1][j-1] + 1 : Math.max(dp[i-1][j], dp[i][j-1])
  const result: DiffLine[] = []
  let i = m, j = n
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && aLines[i-1] === bLines[j-1]) { result.unshift({ type: "equal", text: aLines[i-1] }); i--; j-- }
    else if (j > 0 && (i === 0 || dp[i][j-1] >= dp[i-1][j])) { result.unshift({ type: "add", text: bLines[j-1] }); j-- }
    else { result.unshift({ type: "remove", text: aLines[i-1] }); i-- }
  }
  return result
}

export default function DiffPage() {
  const [left, setLeft] = useState("")
  const [right, setRight] = useState("")
  const [showDiff, setShowDiff] = useState(false)
  const diff = useMemo(() => showDiff ? computeDiff(left, right) : [], [left, right, showDiff])

  return (
    <>
      <Navbar />
      <ToolLayout name="Text Diff" description="Compare two texts and highlight additions and removals. Runs entirely in your browser.">
        <div style={{ padding: "20px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
            <div>
              <PaneLabel>Original</PaneLabel>
              <CodeTextarea value={left} onChange={v => { setLeft(v); setShowDiff(false) }} placeholder="Original text..." />
            </div>
            <div>
              <PaneLabel>Modified</PaneLabel>
              <CodeTextarea value={right} onChange={v => { setRight(v); setShowDiff(false) }} placeholder="Modified text..." />
            </div>
          </div>
          <PaneActions>
            <BtnPrimary onClick={() => setShowDiff(true)}>Compare</BtnPrimary>
            <BtnGhost onClick={() => { setLeft(""); setRight(""); setShowDiff(false) }}>Clear</BtnGhost>
          </PaneActions>
          {showDiff && diff.length > 0 && (
            <div style={{ marginTop: "20px" }}>
              <PaneLabel>Diff</PaneLabel>
              <div style={{ background: "var(--muted)", border: "1px solid var(--border)", borderRadius: "var(--radius)", overflow: "hidden" }}>
                {diff.map((line, i) => (
                  <div key={i} style={{
                    padding: "1px 8px", fontFamily: "var(--font-mono)", fontSize: "12px", lineHeight: "1.6",
                    background: line.type === "add" ? "rgba(74,222,128,0.08)" : line.type === "remove" ? "rgba(248,113,113,0.08)" : "transparent",
                    color: line.type === "add" ? "#86efac" : line.type === "remove" ? "#fca5a5" : "var(--fg)",
                    borderLeft: line.type === "add" ? "2px solid #4ade80" : line.type === "remove" ? "2px solid #f87171" : "2px solid transparent",
                  }}>
                    <span style={{ userSelect: "none" as const, marginRight: "8px", opacity: 0.4, fontSize: "11px" }}>
                      {line.type === "add" ? "+" : line.type === "remove" ? "-" : " "}
                    </span>
                    {line.text || "\u00a0"}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </ToolLayout>
      <Footer />
    </>
  )
}
```

- [ ] **Step 3: Commit**

```bash
cd /Users/a1111/Public/Prog/js/devkit
git add app/diff/
git commit -m "feat: Text Diff tool with LCS-based line diff"
```

---

## Task 14: Blog System

**Files:**
- Create: `content/blog/offline-first-tools.md`
- Create: `content/blog/web-crypto-api.md`
- Create: `app/blog/page.tsx`
- Create: `app/blog/[slug]/page.tsx`

- [ ] **Step 1: Create content/blog/offline-first-tools.md**

```markdown
---
title: "Why Offline-First Developer Tools Matter"
description: "Most developer tools require internet access even for basic operations like formatting JSON. Here is why that is wrong -- and what offline-first actually means."
datePublished: "2026-04-10"
readTime: "4 min read"
---

## The Problem with Cloud-Dependent Tools

When you paste a JWT token into an online decoder, where does it go? In most cases, it travels to a server, gets logged, and possibly retained. For a tool that exists solely to parse a public standard, that is unnecessary risk.

Developer tools that run entirely in the browser eliminate this problem. The computation happens on your machine, in your browser's JavaScript engine. Nothing leaves your tab.

## What Offline-First Means in Practice

An offline-first tool works without an internet connection after the initial page load. The JavaScript is cached by the browser. Operations like JSON formatting, regex testing, and Base64 encoding are trivial computations -- they do not require a round-trip to a server.

**devkit** is built this way from the ground up. All 8 tools run client-side only. No API routes handle your data. The source is open, so you can verify this.

## The Performance Benefit

Round-trips add latency. Even a 50ms server response feels sluggish when the alternative is instant. JSON formatting a 10KB payload should take microseconds, not 50-200ms. With client-side processing, you get the result before you finish pressing the button.

## Privacy by Architecture

Privacy-by-design means the tool's architecture makes data leakage structurally impossible, not just policy-prohibited. When the tool is a static site with no API endpoints, there is no mechanism to send your data anywhere -- regardless of what policies claim.

This is why devkit has no backend for tool operations, no user accounts, and no telemetry on individual tool usage. Google Analytics fires on page load (to count visitors), not on what you type into the tools.
```

- [ ] **Step 2: Create content/blog/web-crypto-api.md**

```markdown
---
title: "Building Developer Tools with the Web Crypto API"
description: "The Web Crypto API provides SHA-1, SHA-256, and SHA-512 hashing natively in every modern browser. Here is how to use it without any libraries."
datePublished: "2026-04-12"
readTime: "5 min read"
---

## What Is the Web Crypto API?

`crypto.subtle` is a browser-native API for cryptographic operations including hashing, signing, and key derivation. It has been available in all major browsers since 2015 and requires no external libraries.

For hash generation, it supports SHA-1, SHA-256, SHA-384, and SHA-512. All operations are asynchronous and return Promises.

## Computing a SHA-256 Hash

The pattern is three steps: encode the string to bytes, call `crypto.subtle.digest`, convert the ArrayBuffer result to hex.

```javascript
async function sha256(input) {
  const data = new TextEncoder().encode(input)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}
```

The `TextEncoder` converts a string to bytes. `crypto.subtle.digest` returns an `ArrayBuffer`. Converting to hex is three lines of standard JavaScript.

## Why Not Use a Library?

For SHA-256 and SHA-512, there is no reason to import a library. The browser implementation is battle-tested, hardware-accelerated on supported platforms, and available with zero download cost.

MD5 is the exception -- it was removed from the Web Crypto API spec because it is cryptographically broken. If you need MD5 (for legacy compatibility, not security), a pure-JS implementation is necessary. devkit includes one at around 80 lines of code.

## devkit's Implementation

devkit's Hash Generator computes all four algorithms simultaneously when you click "Compute hashes." The page shows MD5, SHA-1, SHA-256, and SHA-512 side by side. Each result has a one-click copy button.
```

- [ ] **Step 3: Write app/blog/page.tsx**

```typescript
// app/blog/page.tsx
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
```

- [ ] **Step 4: Write app/blog/[slug]/page.tsx**

```typescript
// app/blog/[slug]/page.tsx
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
```

- [ ] **Step 5: Commit**

```bash
cd /Users/a1111/Public/Prog/js/devkit
git add content/ app/blog/
git commit -m "feat: blog system with gray-matter + marked, index + post pages"
```

---

## Task 15: About Page

**Files:**
- Create: `app/about/page.tsx`

- [ ] **Step 1: Write app/about/page.tsx**

```typescript
// app/about/page.tsx
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
```

- [ ] **Step 2: Commit**

```bash
cd /Users/a1111/Public/Prog/js/devkit
git add app/about/
git commit -m "feat: about page"
```

---

## Task 16: OG Image Generation via Playwright

**Files:**
- Create: `scripts/gen-og.ts`

- [ ] **Step 1: Write scripts/gen-og.ts**

```typescript
// scripts/gen-og.ts
// Run: npx tsx scripts/gen-og.ts
// Requires playwright + chromium: npx playwright install chromium

import { chromium } from "playwright"
import * as fs from "fs"
import * as path from "path"

const PAGES = [
  { slug: "home", name: "devkit", description: "Fast, offline-first developer tools" },
  { slug: "json", name: "JSON Formatter", description: "Format, validate, and minify JSON" },
  { slug: "jwt", name: "JWT Decoder", description: "Decode header, payload, and signature" },
  { slug: "regex", name: "Regex Tester", description: "Live match highlighting" },
  { slug: "uuid", name: "UUID Generator", description: "Generate v4 UUIDs in bulk" },
  { slug: "base64", name: "Base64 Codec", description: "Encode or decode Base64 strings" },
  { slug: "hash", name: "Hash Generator", description: "MD5, SHA-1, SHA-256, SHA-512" },
  { slug: "url", name: "URL Encoder", description: "Encode and decode URL components" },
  { slug: "diff", name: "Text Diff", description: "Side-by-side text comparison" },
]

function makeHtml(name: string, description: string): string {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
* { margin:0; padding:0; box-sizing:border-box; }
body { width:1200px; height:630px; background:#000; font-family:system-ui,sans-serif; overflow:hidden; display:flex; align-items:center; justify-content:center; flex-direction:column; }
.logo { font-family:monospace; font-size:14px; color:#71717a; margin-bottom:32px; }
.logo b { color:#fafafa; }
.name { font-size:56px; font-weight:700; color:#fafafa; letter-spacing:-0.04em; line-height:1.1; margin-bottom:16px; text-align:center; max-width:900px; }
.desc { font-size:22px; color:#a1a1aa; text-align:center; max-width:700px; }
.badge { position:absolute; bottom:40px; right:48px; font-family:monospace; font-size:13px; color:#3f3f46; }
</style></head><body>
  <div class="logo"><b>dev</b>kit.yaro-labs.com</div>
  <div class="name">${name}</div>
  <div class="desc">${description}</div>
  <div class="badge">devkit.yaro-labs.com</div>
</body></html>`
}

async function main() {
  const outDir = path.join(process.cwd(), "public", "og")
  fs.mkdirSync(outDir, { recursive: true })
  const browser = await chromium.launch()
  const page = await browser.newPage()
  await page.setViewportSize({ width: 1200, height: 630 })
  for (const p of PAGES) {
    await page.setContent(makeHtml(p.name, p.description), { waitUntil: "networkidle" })
    const outPath = path.join(outDir, `${p.slug}.png`)
    await page.screenshot({ path: outPath, clip: { x: 0, y: 0, width: 1200, height: 630 } })
    console.log(`Generated: public/og/${p.slug}.png`)
  }
  await browser.close()
  console.log("Done.")
}

main().catch(console.error)
```

- [ ] **Step 2: Install tsx and Playwright chromium, then run**

```bash
cd /Users/a1111/Public/Prog/js/devkit
npm install --save-dev tsx playwright
npx playwright install chromium
npx tsx scripts/gen-og.ts
```

Expected output: 9 lines "Generated: public/og/X.png" then "Done."

- [ ] **Step 3: Verify images**

```bash
ls /Users/a1111/Public/Prog/js/devkit/public/og/
```

Expected: `base64.png  diff.png  hash.png  home.png  json.png  jwt.png  regex.png  url.png  uuid.png`

- [ ] **Step 4: Commit**

```bash
cd /Users/a1111/Public/Prog/js/devkit
git add scripts/ public/og/
git commit -m "feat: OG image generation script + generated images"
```

---

## Task 17: Vercel Deployment Config

**Files:**
- Create: `vercel.json`

- [ ] **Step 1: Write vercel.json**

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

- [ ] **Step 2: Create GitHub repo and deploy to Vercel**

```bash
cd /Users/a1111/Public/Prog/js/devkit
gh repo create devkit --public --source . --remote origin --push
npx vercel --yes
```

- [ ] **Step 3: Set NEXT_PUBLIC_GA_ID env var in Vercel**

In Vercel dashboard: Project > Settings > Environment Variables
- Key: `NEXT_PUBLIC_GA_ID`, Value: your real GA4 ID, Environments: Production + Preview

- [ ] **Step 4: Add custom domain**

In Vercel dashboard: Project > Settings > Domains > Add `devkit.yaro-labs.com`

In your DNS provider, add CNAME: name=`devkit`, value=`cname.vercel-dns.com`

- [ ] **Step 5: Commit vercel.json**

```bash
cd /Users/a1111/Public/Prog/js/devkit
git add vercel.json
git commit -m "feat: vercel deployment config"
```

---

## Task 18: Final Build Verification

- [ ] **Step 1: Run production build**

```bash
cd /Users/a1111/Public/Prog/js/devkit && npm run build
```

Expected: all routes compile, all pages appear in the route table without errors.

- [ ] **Step 2: TypeScript check**

```bash
cd /Users/a1111/Public/Prog/js/devkit && npx tsc --noEmit
```

Expected: no output (zero errors).

- [ ] **Step 3: Smoke-test all 11 routes in dev**

```bash
cd /Users/a1111/Public/Prog/js/devkit && npm run dev
```

Verify each URL manually:
- http://localhost:3000 -- hero + 4-col grid
- http://localhost:3000/json -- paste {"a":1}, Format -> formatted output
- http://localhost:3000/jwt -- paste valid JWT, Decode -> header+payload+signature JSON
- http://localhost:3000/regex -- pattern `\d+`, test "abc 123" -> "123" highlighted
- http://localhost:3000/uuid -- Generate -> UUID list
- http://localhost:3000/base64 -- encode "hello" -> "aGVsbG8="
- http://localhost:3000/hash -- hash "hello" -> SHA-256 = "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824"
- http://localhost:3000/url -- encode "hello world" -> "hello%20world"
- http://localhost:3000/diff -- compare "foo\nbar" vs "foo\nbaz" -> bar removed, baz added
- http://localhost:3000/blog -- list of 2 posts
- http://localhost:3000/about -- prose page

- [ ] **Step 4: Final commit**

```bash
cd /Users/a1111/Public/Prog/js/devkit
git add -A
git commit -m "chore: final build and smoke test pass"
```

---

## Spec Coverage Checklist

| Requirement | Task |
|---|---|
| Next.js 15 App Router + TypeScript | 1 |
| Tailwind CSS v4 | 1 |
| Geist + Geist Mono via next/font/google | 2 |
| CSS variable design tokens | 2 |
| Navbar (logo, links, search) | 3 |
| Footer (copyright, links) | 3 |
| Hero (badge, h1, subtext, CTAs) | 5 |
| 4-col tool grid (border-as-gap) | 5 |
| /json -- format, validate, minify | 6 |
| /jwt -- decode header+payload+sig | 7 |
| /regex -- live match highlighting | 8 |
| /uuid -- v4, bulk, copy | 9 |
| /base64 -- encode/decode | 10 |
| /hash -- MD5, SHA-1, SHA-256, SHA-512 | 11 |
| /url -- encode/decode | 12 |
| /diff -- LCS diff with highlights | 13 |
| Blog (gray-matter + marked) | 14 |
| /about page | 15 |
| OG images via Playwright | 16 |
| OG metadata on all pages | 6-13 layout.tsx files |
| GA4 via next/script afterInteractive | 2 |
| Vercel deployment config | 17 |
| All tool logic client-side only | 6-13 |
| No external UI libraries | All |
| SSG for blog pages | 14 |
