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
