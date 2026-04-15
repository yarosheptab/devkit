"use client"
import Link from "next/link"
import { useEffect, useState } from "react"

const KEY = "devkit-cookie-consent"

export function CookieConsent() {
  const [mounted, setMounted] = useState(false)
  const [consent, setConsent] = useState<string | null>(null)

  useEffect(() => {
    setConsent(localStorage.getItem(KEY))
    setMounted(true)
  }, [])

  const save = (v: string) => { localStorage.setItem(KEY, v); setConsent(v) }

  if (!mounted || consent) return null

  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100,
      padding: "12px 24px",
      background: "#111", borderTop: "1px solid #1f1f1f",
    }}>
      <div style={{ maxWidth: "960px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}>
        <p style={{ fontSize: "12px", color: "#666", margin: 0 }}>
          We use cookies to improve your experience.{" "}
          <Link href="/cookies" style={{ color: "#fff", textDecoration: "underline" }}>Cookie Policy</Link>.
        </p>
        <div style={{ display: "flex", gap: "8px" }}>
          <button onClick={() => save("declined")} style={{ fontSize: "11px", padding: "5px 12px", background: "transparent", border: "1px solid #333", color: "#666", borderRadius: "4px", cursor: "pointer" }}>Decline</button>
          <button onClick={() => save("accepted")} style={{ fontSize: "11px", padding: "5px 12px", background: "#fff", border: "none", color: "#000", borderRadius: "4px", cursor: "pointer", fontWeight: 600 }}>Accept</button>
        </div>
      </div>
    </div>
  )
}
