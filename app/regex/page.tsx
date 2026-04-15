"use client"
import { useState, useMemo } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ToolLayout, PaneLabel, CodeTextarea } from "@/components/tool-layout"

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

export default function RegexPage() {
  const [pattern, setPattern] = useState("")
  const [flags, setFlags] = useState("g")
  const [testStr, setTestStr] = useState("")

  const { highlighted, matchCount, error } = useMemo(() => {
    if (!pattern) return { highlighted: escapeHtml(testStr), matchCount: 0, error: "" }
    try {
      const re = new RegExp(pattern, flags)
      const matches: Array<{ index: number; length: number }> = []
      if (flags.includes("g")) {
        re.lastIndex = 0
        let m
        while ((m = re.exec(testStr)) !== null) {
          matches.push({ index: m.index, length: m[0].length })
          if (m[0].length === 0) re.lastIndex++
        }
      } else {
        const m = re.exec(testStr)
        if (m) matches.push({ index: m.index, length: m[0].length })
      }
      let result = ""
      let cursor = 0
      for (const { index, length } of matches) {
        result += escapeHtml(testStr.slice(cursor, index))
        result += '<mark style="background:#3f3f46;color:#fafafa;border-radius:2px">' + escapeHtml(testStr.slice(index, index + length)) + '</mark>'
        cursor = index + length
      }
      result += escapeHtml(testStr.slice(cursor))
      return { highlighted: result, matchCount: matches.length, error: "" }
    } catch (e) {
      return { highlighted: escapeHtml(testStr), matchCount: 0, error: (e as Error).message }
    }
  }, [pattern, flags, testStr])

  const inputStyle = {
    width: "100%", background: "var(--muted)", border: "1px solid var(--border)",
    borderRadius: "var(--radius)", color: "var(--fg)",
    fontFamily: "var(--font-mono)", fontSize: "13px", padding: "8px 12px", outline: "none",
  }

  return (
    <>
      <Navbar />
      <ToolLayout name="Regex Tester" description="Test regular expressions with live match highlighting. Runs entirely in your browser.">
        <div style={{ padding: "20px" }}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
            <div style={{ flex: 1 }}>
              <PaneLabel>Pattern</PaneLabel>
              <input value={pattern} onChange={e => setPattern(e.target.value)} placeholder="[a-z]+" style={inputStyle} />
            </div>
            <div style={{ width: "80px" }}>
              <PaneLabel>Flags</PaneLabel>
              <input value={flags} onChange={e => setFlags(e.target.value)} placeholder="gim" style={{ ...inputStyle, width: "80px" }} />
            </div>
          </div>
          {error && <p style={{ color: "#f87171", fontSize: "12px", fontFamily: "var(--font-mono)", marginBottom: "12px" }}>{error}</p>}
          <PaneLabel>Test string</PaneLabel>
          <CodeTextarea value={testStr} onChange={setTestStr} placeholder="Enter text to test..." minHeight="120px" />
          <div style={{ marginTop: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <PaneLabel>Matches</PaneLabel>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--muted-fg2)" }}>
                {matchCount} match{matchCount !== 1 ? "es" : ""}
              </span>
            </div>
            <div
              style={{
                background: "var(--muted)", border: "1px solid var(--border)",
                borderRadius: "var(--radius)", padding: "12px",
                fontFamily: "var(--font-mono)", fontSize: "12px", lineHeight: "1.6",
                color: "var(--fg)", minHeight: "120px", whiteSpace: "pre-wrap",
              }}
              dangerouslySetInnerHTML={{ __html: highlighted }}
            />
          </div>
        </div>
      </ToolLayout>
      <Footer />
    </>
  )
}
