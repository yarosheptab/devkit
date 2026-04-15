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
