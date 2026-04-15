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
