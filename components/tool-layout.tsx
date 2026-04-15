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
