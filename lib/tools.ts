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
