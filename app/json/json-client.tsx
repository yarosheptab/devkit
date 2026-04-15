"use client"
import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ToolLayout, SplitPane, PaneLabel, CodeTextarea, OutputBlock, PaneActions, BtnPrimary, BtnGhost } from "@/components/tool-layout"
import { CopyButton } from "@/components/copy-button"

export default function JsonClient() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [error, setError] = useState("")

  const format = () => {
    try { setOutput(JSON.stringify(JSON.parse(input), null, 2)); setError("") }
    catch (e) { setError((e as Error).message); setOutput("") }
  }

  const minify = () => {
    try { setOutput(JSON.stringify(JSON.parse(input))); setError("") }
    catch (e) { setError((e as Error).message); setOutput("") }
  }

  const clear = () => { setInput(""); setOutput(""); setError("") }

  const download = () => {
    const a = document.createElement("a")
    a.href = URL.createObjectURL(new Blob([output], { type: "application/json" }))
    a.download = "output.json"
    a.click()
  }

  return (
    <>
      <Navbar />
      <ToolLayout name="JSON Formatter" description="Format, validate, and minify JSON. Works entirely in your browser -- nothing is sent to a server.">
        <SplitPane
          left={<>
            <PaneLabel>Input</PaneLabel>
            <CodeTextarea value={input} onChange={setInput} placeholder='{"key": "value"}' />
            {error && <p style={{ color: "#f87171", fontSize: "12px", fontFamily: "var(--font-mono)", marginTop: "8px" }}>{error}</p>}
            <PaneActions>
              <BtnPrimary onClick={format}>Format</BtnPrimary>
              <BtnGhost onClick={minify}>Minify</BtnGhost>
              <BtnGhost onClick={clear}>Clear</BtnGhost>
            </PaneActions>
          </>}
          right={<>
            <PaneLabel>Output</PaneLabel>
            <OutputBlock>{output}</OutputBlock>
            <PaneActions>
              <CopyButton text={output} />
              {output && <BtnGhost onClick={download}>Download</BtnGhost>}
            </PaneActions>
          </>}
        />
      </ToolLayout>
      <Footer />
    </>
  )
}
