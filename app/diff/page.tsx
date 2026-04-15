"use client"
import { useState, useMemo } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ToolLayout, PaneLabel, CodeTextarea, PaneActions, BtnPrimary, BtnGhost } from "@/components/tool-layout"

type DiffLine = { type: "equal" | "add" | "remove"; text: string }

function computeDiff(a: string, b: string): DiffLine[] {
  const aLines = a.split("\n"), bLines = b.split("\n")
  const m = aLines.length, n = bLines.length
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0))
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = aLines[i-1] === bLines[j-1] ? dp[i-1][j-1] + 1 : Math.max(dp[i-1][j], dp[i][j-1])
  const result: DiffLine[] = []
  let i = m, j = n
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && aLines[i-1] === bLines[j-1]) { result.unshift({ type: "equal", text: aLines[i-1] }); i--; j-- }
    else if (j > 0 && (i === 0 || dp[i][j-1] >= dp[i-1][j])) { result.unshift({ type: "add", text: bLines[j-1] }); j-- }
    else { result.unshift({ type: "remove", text: aLines[i-1] }); i-- }
  }
  return result
}

export default function DiffPage() {
  const [left, setLeft] = useState("")
  const [right, setRight] = useState("")
  const [showDiff, setShowDiff] = useState(false)
  const diff = useMemo(() => showDiff ? computeDiff(left, right) : [], [left, right, showDiff])

  return (
    <>
      <Navbar />
      <ToolLayout name="Text Diff" description="Compare two texts and highlight additions and removals. Runs entirely in your browser.">
        <div style={{ padding: "20px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
            <div>
              <PaneLabel>Original</PaneLabel>
              <CodeTextarea value={left} onChange={v => { setLeft(v); setShowDiff(false) }} placeholder="Original text..." />
            </div>
            <div>
              <PaneLabel>Modified</PaneLabel>
              <CodeTextarea value={right} onChange={v => { setRight(v); setShowDiff(false) }} placeholder="Modified text..." />
            </div>
          </div>
          <PaneActions>
            <BtnPrimary onClick={() => setShowDiff(true)}>Compare</BtnPrimary>
            <BtnGhost onClick={() => { setLeft(""); setRight(""); setShowDiff(false) }}>Clear</BtnGhost>
          </PaneActions>
          {showDiff && diff.length > 0 && (
            <div style={{ marginTop: "20px" }}>
              <PaneLabel>Diff</PaneLabel>
              <div style={{ background: "var(--muted)", border: "1px solid var(--border)", borderRadius: "var(--radius)", overflow: "hidden" }}>
                {diff.map((line, i) => (
                  <div key={i} style={{
                    padding: "1px 8px", fontFamily: "var(--font-mono)", fontSize: "12px", lineHeight: "1.6",
                    background: line.type === "add" ? "rgba(74,222,128,0.08)" : line.type === "remove" ? "rgba(248,113,113,0.08)" : "transparent",
                    color: line.type === "add" ? "#86efac" : line.type === "remove" ? "#fca5a5" : "var(--fg)",
                    borderLeft: line.type === "add" ? "2px solid #4ade80" : line.type === "remove" ? "2px solid #f87171" : "2px solid transparent",
                  }}>
                    <span style={{ userSelect: "none" as const, marginRight: "8px", opacity: 0.4, fontSize: "11px" }}>
                      {line.type === "add" ? "+" : line.type === "remove" ? "-" : " "}
                    </span>
                    {line.text || "\u00a0"}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </ToolLayout>
      <Footer />
    </>
  )
}
