"use client"
import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ToolLayout, PaneLabel, PaneActions, BtnPrimary, BtnGhost } from "@/components/tool-layout"
import { CopyButton } from "@/components/copy-button"

function uuidv4(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
    const r = (crypto.getRandomValues(new Uint8Array(1))[0] & 0x0f) | 0
    const v = c === "x" ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export default function UuidPage() {
  const [count, setCount] = useState(1)
  const [uuids, setUuids] = useState<string[]>([])

  const generate = () => {
    const result: string[] = []
    for (let i = 0; i < Math.min(count, 100); i++) result.push(uuidv4())
    setUuids(result)
  }

  return (
    <>
      <Navbar />
      <ToolLayout name="UUID Generator" description="Generate UUID v4 identifiers. Bulk generate up to 100 at a time. Runs entirely in your browser.">
        <div style={{ padding: "20px", maxWidth: "640px" }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: "12px", marginBottom: "16px" }}>
            <div>
              <PaneLabel>Count (1-100)</PaneLabel>
              <input
                type="number" min={1} max={100} value={count}
                onChange={e => setCount(Math.max(1, Math.min(100, Number(e.target.value))))}
                style={{
                  width: "80px", background: "var(--muted)", border: "1px solid var(--border)",
                  borderRadius: "var(--radius)", color: "var(--fg)",
                  fontFamily: "var(--font-mono)", fontSize: "13px", padding: "5px 10px", outline: "none",
                }}
              />
            </div>
          </div>
          <PaneActions>
            <BtnPrimary onClick={generate}>Generate</BtnPrimary>
            {uuids.length > 0 && <BtnGhost onClick={() => setUuids([])}>Clear</BtnGhost>}
            {uuids.length > 0 && <CopyButton text={uuids.join("\n")} />}
          </PaneActions>
          {uuids.length > 0 && (
            <div style={{ marginTop: "16px", border: "1px solid var(--border)", borderRadius: "var(--radius)", overflow: "hidden" }}>
              {uuids.map((id, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "10px 12px",
                  background: "var(--muted)",
                  borderBottom: i < uuids.length - 1 ? "1px solid var(--border)" : "none",
                }}>
                  <code style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--fg)" }}>{id}</code>
                  <CopyButton text={id} />
                </div>
              ))}
            </div>
          )}
        </div>
      </ToolLayout>
      <Footer />
    </>
  )
}
