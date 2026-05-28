"use client"

import { useEffect, useRef, useState } from "react"
import QRCode from "react-qr-code"

type Props = {
  nameEn: string
  nameHe: string
  path?: string
}

export default function QRCodePanel({ nameEn, nameHe, path }: Props) {
  const [url, setUrl] = useState("")
  const [open, setOpen] = useState(false)
  const qrRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const base = window.location.origin
    setUrl(path ? `${base}${path}` : window.location.href)
  }, [path])

  function handleDownload() {
    if (!qrRef.current) return
    const svg = qrRef.current.querySelector("svg")
    if (!svg) return
    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement("canvas")
    const size = 400
    canvas.width = size
    canvas.height = size + 80
    const ctx = canvas.getContext("2d")!
    const img = new Image()
    img.onload = () => {
      ctx.fillStyle = "#ffffff"
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 40, 20, size - 80, size - 80)
      ctx.fillStyle = "#111827"
      ctx.font = "bold 18px Arial"
      ctx.textAlign = "center"
      ctx.fillText(nameEn, size / 2, size - 40)
      ctx.font = "16px Arial"
      ctx.fillStyle = "#374151"
      ctx.fillText(nameHe, size / 2, size - 16)
      const link = document.createElement("a")
      link.download = `qr-${nameEn.toLowerCase().replace(/\s+/g, "-")}.png`
      link.href = canvas.toDataURL("image/png")
      link.click()
    }
    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)))
  }

  if (!url) return null

  return (
    <div style={{ position: "relative", display: "inline-block" }}>

      {/* Panel — opens UPWARD from button, aligned left */}
      {open && (
        <div
          style={{
            position: "absolute",
            bottom: "calc(100% + 10px)",
            left: 0,
            zIndex: 9999,
            width: 236,
            borderRadius: 20,
            border: "1px solid rgba(0,200,255,0.25)",
            background: "linear-gradient(180deg, #0b1527 0%, #070e1c 100%)",
            boxShadow: "0 -8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,200,255,0.08)",
            padding: 18,
          }}
        >
          <p style={{ margin: "0 0 12px", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(0,200,255,0.6)" }}>
            Scan to view 3D
          </p>

          <div
            ref={qrRef}
            style={{ background: "#fff", borderRadius: 12, padding: 10, display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <QRCode value={url} size={172} bgColor="#ffffff" fgColor="#04111e" level="M" />
          </div>

          <p style={{ margin: "10px 0 2px", fontSize: 13, fontWeight: 700, color: "#e2e8f0", textAlign: "center" }}>
            {nameEn}
          </p>
          <p style={{ margin: "0 0 10px", fontSize: 12, color: "rgba(148,163,184,0.8)", textAlign: "center" }}>
            {nameHe}
          </p>

          <p style={{ margin: "0 0 12px", fontSize: 9, color: "rgba(100,160,220,0.5)", textAlign: "center", wordBreak: "break-all" }}>
            {url}
          </p>

          <button
            onClick={handleDownload}
            style={{ width: "100%", padding: "9px", borderRadius: 12, border: "none", background: "linear-gradient(180deg, #22d3ee 0%, #0ea5e9 100%)", color: "#04111e", fontSize: 12, fontWeight: 900, cursor: "pointer", letterSpacing: "0.08em" }}
          >
            ↓ Download PNG
          </button>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "9px 14px",
          borderRadius: 12,
          border: "1px solid rgba(0,200,255,0.28)",
          background: open ? "rgba(0,200,255,0.12)" : "rgba(0,200,255,0.05)",
          color: "#7dd3fc",
          fontSize: 12,
          fontWeight: 700,
          cursor: "pointer",
          letterSpacing: "0.05em",
          transition: "all 0.2s",
          whiteSpace: "nowrap",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <rect x="1" y="1" width="5" height="5" rx="1" stroke="#7dd3fc" strokeWidth="1.4"/>
          <rect x="8" y="1" width="5" height="5" rx="1" stroke="#7dd3fc" strokeWidth="1.4"/>
          <rect x="1" y="8" width="5" height="5" rx="1" stroke="#7dd3fc" strokeWidth="1.4"/>
          <rect x="8" y="8" width="5" height="5" rx="1" stroke="#7dd3fc" strokeWidth="1.4"/>
        </svg>
        QR Code
        <span style={{ opacity: 0.5, fontSize: 10 }}>{open ? "▲" : "▼"}</span>
      </button>
    </div>
  )
}
