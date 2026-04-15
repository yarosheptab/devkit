"use client"
import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ToolLayout, SplitPane, PaneLabel, CodeTextarea, OutputBlock, PaneActions, BtnPrimary, BtnGhost } from "@/components/tool-layout"
import { CopyButton } from "@/components/copy-button"

export default function Base64Client() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [error, setError] = useState("")
  const [mode, setMode] = useState<"encode" | "decode">("encode")

  const run = () => {
    try {
      if (mode === "encode") {
        setOutput(btoa(unescape(encodeURIComponent(input))))
      } else {
        setOutput(decodeURIComponent(escape(atob(input.trim()))))
      }
      setError("")
    } catch (e) { setError((e as Error).message); setOutput("") }
  }

  const swap = () => { setInput(output); setOutput(""); setMode(m => m === "encode" ? "decode" : "encode") }

  const modeBtn = (m: "encode" | "decode") => (
    <button key={m} onClick={() => setMode(m)} style={{
      padding: "4px 12px", fontSize: "12px", fontFamily: "var(--font-mono)",
      border: "1px solid var(--border)", borderRadius: "var(--radius)", cursor: "pointer",
      background: mode === m ? "var(--fg)" : "var(--muted)",
      color: mode === m ? "var(--accent-fg)" : "var(--muted-fg)",
    }}>{m.charAt(0).toUpperCase() + m.slice(1)}</button>
  )

  return (
    <>
      <Navbar />
      <ToolLayout name="Base64 Codec" description="Encode or decode Base64 strings. Runs entirely in your browser.">
        <SplitPane
          left={<>
            <div style={{ display: "flex", gap: "6px", marginBottom: "10px" }}>
              {modeBtn("encode")}{modeBtn("decode")}
            </div>
            <PaneLabel>Input</PaneLabel>
            <CodeTextarea value={input} onChange={setInput} placeholder={mode === "encode" ? "Text to encode..." : "Base64 to decode..."} />
            {error && <p style={{ color: "#f87171", fontSize: "12px", fontFamily: "var(--font-mono)", marginTop: "8px" }}>{error}</p>}
            <PaneActions>
              <BtnPrimary onClick={run}>{mode === "encode" ? "Encode" : "Decode"}</BtnPrimary>
              <BtnGhost onClick={swap}>Swap</BtnGhost>
              <BtnGhost onClick={() => { setInput(""); setOutput(""); setError("") }}>Clear</BtnGhost>
            </PaneActions>
          </>}
          right={<>
            <PaneLabel>Output</PaneLabel>
            <OutputBlock>{output}</OutputBlock>
            <PaneActions><CopyButton text={output} /></PaneActions>
          </>}
        />
      </ToolLayout>
      <Footer />
    </>
  )
}
