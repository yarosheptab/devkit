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

      <div className="navbar-search" style={{ position: "relative" }}>
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
