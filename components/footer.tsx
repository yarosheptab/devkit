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
      <Link
        href="https://yaro-labs.com"
        target="_blank"
        rel="noopener noreferrer"
        style={{ fontSize: "12px", color: "var(--muted-fg2)", textDecoration: "none" }}
      >
        © {new Date().getFullYear()} Yaro Labs
      </Link>
      <div style={{ display: "flex", gap: "16px" }}>
        {[
          { href: "/privacy", label: "Privacy Policy" },
          { href: "/terms", label: "Terms of Use" },
          { href: "/cookies", label: "Cookie Policy" },
          { href: "/about", label: "About" },
          { href: "/blog", label: "Blog" },
        ].map(({ href, label }) => (
          <Link
            key={label}
            href={href}
            style={{ fontSize: "12px", color: "var(--muted-fg2)", textDecoration: "none" }}
          >
            {label}
          </Link>
        ))}
      </div>
    </footer>
  )
}
