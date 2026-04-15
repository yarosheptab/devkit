# devkit.yaro-labs.com — Design Specification

**Date:** 2026-04-15  
**Status:** Approved  
**Scope:** Homepage, tool pages, blog, about page — full site design for devkit.yaro-labs.com

---

## Overview

devkit is a dark-themed developer utilities site — the first of five tool-kit sub-sites under yaro-labs.com. It provides fast, offline-first browser tools for developers: JSON formatting, JWT decoding, regex testing, UUID generation, Base64 encoding, hash generation, URL encoding, and text diffing.

**Design philosophy:** shadcn/ui-inspired — pure black and white, zinc scale, border-based cards, no color accents, no gimmicks. Looks like a serious tool, not a marketing page.

---

## Visual Design

### Color Palette (zinc scale, no color accent)

| Token | Hex | Usage |
|---|---|---|
| Page background | `#000000` | Outermost page/html |
| Surface / card | `#09090b` | Navbar, hero, tool cards, content areas |
| Muted | `#18181b` | Input fields, hover state, icon backgrounds |
| Border | `#27272a` | All borders, grid lines between cards |
| Border (hover/focus) | `#3f3f46` | Interactive border on hover/focus |
| Foreground | `#fafafa` | Primary text, headings, icons |
| Muted foreground | `#a1a1aa` | Secondary text, descriptions |
| Placeholder | `#71717a` | Input placeholder, empty state text |
| Accent (CTA bg) | `#fafafa` | Primary button background |
| Accent foreground | `#09090b` | Primary button text |

No color accent anywhere. All interactive feedback via border brightness and background lightness shifts.

### Typography

- **UI / body:** Geist (sans-serif) — all headings, body copy, button labels, nav links
- **Logo / code / labels:** Geist Mono — logo wordmark, code output, monospace labels, breadcrumbs, keyboard shortcuts
- **Border radius:** 6px throughout

### Motion

Transitions: 100–120ms ease, background and border-color only. No transforms or opacity fades except on modals/dropdowns.

---

## Site Structure

```
/                   → Homepage (hero + full tool grid)
/[tool-slug]        → Individual tool page (e.g. /json, /jwt, /regex)
/blog               → Blog index (MDX posts)
/blog/[slug]        → Blog post
/about              → About page
```

### Tools (8 total)

| Slug | Name | Description |
|---|---|---|
| `/json` | JSON Formatter | Format, validate, minify JSON |
| `/jwt` | JWT Decoder | Decode header, payload, signature |
| `/regex` | Regex Tester | Live match highlighting |
| `/uuid` | UUID Generator | v1, v4, v5; bulk generation |
| `/base64` | Base64 Codec | Encode/decode strings and files |
| `/hash` | Hash Generator | MD5, SHA-1, SHA-256, SHA-512 |
| `/url` | URL Encoder | Encode/decode URL components |
| `/diff` | Text Diff | Side-by-side comparison with highlights |

---

## Layout: Homepage

### Navbar
- Left: `devkit` logo in Geist Mono (italic `kit` portion in muted color)
- Center: nav links — Tools · Blog · About (active state: `#fafafa`, inactive: `#a1a1aa`)
- Right: search input with `⌘K` kbd badge, 200px wide

### Hero
- Badge: pill with dot + "Developer utilities" in Geist Mono
- Headline (42px/700): "Tools that work. Nothing else." — second line in muted color (`#71717a`)
- Subtext (15px): brief value prop — offline-first, no sign-up, no tracking
- CTA: "Browse tools" (primary, white bg) + "View source ↗" (outline)

### Tool Grid
- Section header: "All tools" label (uppercase, 12px) + "8 tools" count (mono, right-aligned)
- Grid: 4 columns, `gap: 1px`, `background: var(--border)` — creates border-as-grid-line effect
- Card: `background: var(--card)`, padding 20px 18px, hover → `background: var(--muted)`
- Each card: icon box (32×32, border, muted bg) · tool name (600 weight) · description (muted) · `→` arrow bottom-right

### Footer
- Single-line: copyright + links (GitHub, About, Blog)
- Top border only, 56px height, muted text

---

## Layout: Tool Page

### Header (below shared navbar)
- Breadcrumb: `devkit / Tool Name` in Geist Mono 11px muted
- Title: tool name, 22px 700
- Description: one-line summary, muted

### Body — Split Pane
- Two equal columns separated by `border-left: 1px solid var(--border)`
- **Left pane:** label "Input", `<textarea>` with monospace font, action buttons below (Format/action · secondary actions)
- **Right pane:** label "Output", read-only output block with monospace rendering, Copy + Download buttons

Tools that don't need a split pane (UUID generator) use a full-width single-pane layout with a generation panel and results list.

### Options Bar (where applicable)
- Row between header and pane body: small toggle pills for mode options (e.g. "Formatted · Minified" for JSON, "v4 · v1 · v5" for UUID)
- Border-bottom separates from pane area

---

## Layout: Blog

### Blog Index (`/blog`)
- Simple list — no card grid
- Each entry: date (Geist Mono, muted) · title · 1-line excerpt
- Separated by border lines, not cards

### Blog Post (`/blog/[slug]`)
- Prose layout, max-width 680px centered
- MDX rendered with `gray-matter` + `marked`
- Code blocks: Geist Mono, muted background, border, 6px radius

---

## Layout: About Page

- Single-column prose, max-width 640px
- Covers: what devkit is, the yaro-labs.com family, open-source link

---

## Technical Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 15 App Router |
| Styling | Tailwind CSS v4 |
| Fonts | `next/font/google` — Geist + Geist Mono |
| Blog content | MDX via `gray-matter` + `marked` |
| Analytics | Google Analytics 4 (via `next/script`, `afterInteractive`) |
| OG images | Playwright `browser_run_code` — generates `/public/og/*.png` at build |
| Deployment | Vercel, subdomain `devkit.yaro-labs.com` |
| Repo | GitHub, new repo named `devkit` (personal account, same as `yaro-labs-landing-page`) |

### Key Implementation Notes

- All tool logic runs **client-side only** — no API routes needed for tools
- SSG for homepage, tool pages, blog index, blog posts, and about
- No external UI libraries (no shadcn, no Radix, no Headless UI) — all components built from scratch matching the zinc/Geist design system
- Each tool page is a separate route under `app/[tool]/page.tsx`
- Blog posts live in `content/blog/*.mdx`, loaded via `gray-matter` at build time
- Tailwind v4 with CSS variable–based design tokens (matching the palette above)

---

## Relationship to Other Kit Sites

devkit is the only **dark** site in the family. The other four (textkit, pixkit, seokit, calckit) will use white/light backgrounds, each with a distinct accent color. They share the same Next.js/Tailwind/MDX/Vercel pattern but have independent repos and deploys.

---

## Success Criteria

- Homepage loads in < 1s on Vercel edge (SSG, no client JS for initial render)
- All 8 tools work entirely offline (no external fetch required)
- Passes Lighthouse accessibility ≥ 90
- OG images generated for homepage and each tool page
- GA4 tracking fires on page load and tool usage events
