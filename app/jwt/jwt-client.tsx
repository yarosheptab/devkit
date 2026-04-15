"use client"
import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ToolLayout, SplitPane, PaneLabel, CodeTextarea, OutputBlock, PaneActions, BtnPrimary, BtnGhost } from "@/components/tool-layout"
import { CopyButton } from "@/components/copy-button"

function decodeBase64Url(str: string): string {
  const padded = str.replace(/-/g, "+").replace(/_/g, "/")
  const pad = padded.length % 4
  const full = pad ? padded + "=".repeat(4 - pad) : padded
  return decodeURIComponent(atob(full).split("").map(c => "%" + c.charCodeAt(0).toString(16).padStart(2, "0")).join(""))
}

export default function JwtClient() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [error, setError] = useState("")

  const decode = () => {
    try {
      const parts = input.trim().split(".")
      if (parts.length !== 3) throw new Error("Invalid JWT: expected 3 dot-separated parts")
      const result = {
        header: JSON.parse(decodeBase64Url(parts[0])),
        payload: JSON.parse(decodeBase64Url(parts[1])),
        signature: parts[2],
      }
      setOutput(JSON.stringify(result, null, 2))
      setError("")
    } catch (e) { setError((e as Error).message); setOutput("") }
  }

  return (
    <>
      <Navbar />
      <ToolLayout name="JWT Decoder" description="Decode and inspect JWT tokens. View header, payload, and signature. Nothing is sent to a server.">
        <SplitPane
          left={<>
            <PaneLabel>JWT Token</PaneLabel>
            <CodeTextarea value={input} onChange={setInput} placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." />
            {error && <p style={{ color: "#f87171", fontSize: "12px", fontFamily: "var(--font-mono)", marginTop: "8px" }}>{error}</p>}
            <PaneActions>
              <BtnPrimary onClick={decode}>Decode</BtnPrimary>
              <BtnGhost onClick={() => { setInput(""); setOutput(""); setError("") }}>Clear</BtnGhost>
            </PaneActions>
          </>}
          right={<>
            <PaneLabel>Decoded</PaneLabel>
            <OutputBlock>{output}</OutputBlock>
            <PaneActions><CopyButton text={output} /></PaneActions>
          </>}
        />
      </ToolLayout>
      <Footer />
    </>
  )
}
