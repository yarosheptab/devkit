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
