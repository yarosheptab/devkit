"use client"
import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ToolLayout, PaneLabel, CodeTextarea, PaneActions, BtnPrimary, BtnGhost } from "@/components/tool-layout"
import { CopyButton } from "@/components/copy-button"
import { md5 } from "@/lib/md5"

async function shaHash(algo: "SHA-1" | "SHA-256" | "SHA-512", input: string): Promise<string> {
  const buf = await crypto.subtle.digest(algo, new TextEncoder().encode(input))
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("")
}

const ALGORITHMS = ["MD5", "SHA-1", "SHA-256", "SHA-512"] as const
type Algorithm = typeof ALGORITHMS[number]

export default function HashPage() {
  const [input, setInput] = useState("")
  const [hashes, setHashes] = useState<Record<string, string>>({})

  const compute = async () => {
    const results: Record<string, string> = {}
    results["MD5"] = md5(input)
    results["SHA-1"] = await shaHash("SHA-1", input)
    results["SHA-256"] = await shaHash("SHA-256", input)
    results["SHA-512"] = await shaHash("SHA-512", input)
    setHashes(results)
  }

  return (
    <>
      <Navbar />
      <ToolLayout name="Hash Generator" description="Compute MD5, SHA-1, SHA-256, SHA-512 hashes using the Web Crypto API. Runs entirely in your browser.">
        <div style={{ padding: "20px" }}>
          <PaneLabel>Input</PaneLabel>
          <CodeTextarea value={input} onChange={setInput} placeholder="Text to hash..." minHeight="120px" />
          <PaneActions>
            <BtnPrimary onClick={compute}>Compute hashes</BtnPrimary>
            <BtnGhost onClick={() => { setInput(""); setHashes({}) }}>Clear</BtnGhost>
          </PaneActions>

          {Object.keys(hashes).length > 0 && (
            <div style={{ marginTop: "20px", border: "1px solid var(--border)", borderRadius: "var(--radius)", overflow: "hidden" }}>
              {ALGORITHMS.map((a: Algorithm, i) => (
                <div key={a} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px",
                  padding: "12px 14px", background: "var(--muted)",
                  borderBottom: i < ALGORITHMS.length - 1 ? "1px solid var(--border)" : "none",
                }}>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--muted-fg2)", marginBottom: "4px" }}>{a}</div>
                    <code style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--fg)", wordBreak: "break-all" }}>{hashes[a]}</code>
                  </div>
                  <CopyButton text={hashes[a]} style={{ flexShrink: 0 }} />
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
