"use client"
import { useState, useEffect, useRef } from "react"
import { ComposableMap, Geographies, Geography, Line, Marker } from "react-simple-maps"

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"
const ISRAEL: [number, number] = [34.8, 31.0]

const COUNTRIES: Record<string, { name: string; coords: [number, number] }> = {
  GR: { name: "Greece", coords: [21.8, 39.0] },
  AT: { name: "Austria", coords: [14.5, 47.5] },
  SK: { name: "Slovakia", coords: [19.5, 48.7] },
  DE: { name: "Germany", coords: [10.4, 51.1] },
  FR: { name: "France", coords: [2.2, 46.2] },
  GB: { name: "United Kingdom", coords: [-3.4, 55.4] },
  US: { name: "United States", coords: [-95.7, 37.1] },
  IN: { name: "India", coords: [78.9, 20.6] },
  SG: { name: "Singapore", coords: [103.8, 1.4] },
  AE: { name: "UAE", coords: [53.8, 23.4] },
}

const ALPHA2_TO_NUMERIC: Record<string, string> = {
  GR:"300", AT:"040", SK:"703", DE:"276", FR:"250",
  GB:"826", US:"840", IN:"356", SG:"702", AE:"784"
}

export default function WorldMap({ activeIso }: { activeIso: string | null }) {
  const [progress, setProgress] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setProgress(0)
    if (!activeIso || !COUNTRIES[activeIso]) return
    intervalRef.current = setInterval(() => {
      setProgress(p => p >= 1 ? 0 : p + 0.005)
    }, 30)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [activeIso])

  const dest = activeIso ? COUNTRIES[activeIso]?.coords : null

  const arcPoints: [number, number][] = []
  if (dest) {
    for (let i = 0; i <= 80; i++) {
      const t = i / 80
      const lng = ISRAEL[0] + (dest[0] - ISRAEL[0]) * t
      const lat = ISRAEL[1] + (dest[1] - ISRAEL[1]) * t + Math.sin(t * Math.PI) * 10
      arcPoints.push([lng, lat])
    }
  }

  let planeCoords: [number, number] | null = null
  let planeAngle = 0
  if (dest && arcPoints.length > 1) {
    const idx = Math.min(Math.floor(progress * 80), 79)
    planeCoords = arcPoints[idx]
    const next = arcPoints[Math.min(idx + 1, 80)]
    planeAngle = Math.atan2(
      -(next[1] - arcPoints[idx][1]),
      next[0] - arcPoints[idx][0]
    ) * 180 / Math.PI
  }

  return (
    <div style={{
      position: "relative",
      width: "100%",
      height: "500px",
      background: "radial-gradient(ellipse at center, #0a1628 0%, #050B1A 100%)",
      borderRadius: "24px",
      border: "1px solid rgba(0,212,255,0.2)",
      boxShadow: "0 0 80px rgba(11,110,253,0.12), 0 0 0 1px rgba(0,212,255,0.05), inset 0 0 80px rgba(0,0,0,0.5)",
      overflow: "hidden",
    }}>
      {/* Grid overlay */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1,
        backgroundImage: "linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }} />

      <ComposableMap
        projection="geoNaturalEarth1"
        projectionConfig={{ scale: 185, center: [10, 10] }}
        style={{ width: "100%", height: "100%", position: "relative", zIndex: 2 }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) => geographies.map(geo => {
            const numeric = geo.properties.id ?? geo.id
            const iso = Object.entries(ALPHA2_TO_NUMERIC).find(([, v]) => v === String(numeric))?.[0]
            const isActive = iso === activeIso
            const isKnown = !!iso && !!COUNTRIES[iso]
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={isActive ? "#0B6EFD" : isKnown ? "#1a3a5c" : "#162a45"}
                stroke="#050B1A"
                strokeWidth={0.3}
                style={{
                  default: { filter: isActive ? "drop-shadow(0 0 8px rgba(11,110,253,0.8))" : "none", outline: "none" },
                  hover: { fill: isActive ? "#2563eb" : isKnown ? "#254d6e" : "#1e3a55", outline: "none" },
                  pressed: { outline: "none" },
                }}
              />
            )
          })}
        </Geographies>

        {dest && arcPoints.length > 1 && (
          <Line
            coordinates={arcPoints}
            stroke="#00d4ff"
            strokeWidth={1.8}
            strokeDasharray="6 3"
            strokeOpacity={0.9}
            fill="none"
          />
        )}

        {planeCoords && (
          <Marker coordinates={planeCoords}>
            <text
              textAnchor="middle"
              dominantBaseline="middle"
              transform={`rotate(${planeAngle})`}
              style={{ fontSize: "14px", userSelect: "none", pointerEvents: "none", fill: "#00d4ff" }}
            >✈</text>
          </Marker>
        )}

        <Marker coordinates={ISRAEL}>
          <circle r={5} fill="#00d4ff" style={{ filter: "drop-shadow(0 0 6px #00d4ff)" }} />
          <text textAnchor="middle" dy={-10} style={{ fontSize: "8px", fill: "#00d4ff", fontWeight: 700, letterSpacing: "0.1em" }}>ISRAEL</text>
        </Marker>

        {activeIso && COUNTRIES[activeIso] && (
          <Marker coordinates={COUNTRIES[activeIso].coords}>
            <circle r={4} fill="#0B6EFD" style={{ filter: "drop-shadow(0 0 8px #0B6EFD)" }} />
            <text textAnchor="middle" dy={-12} style={{ fontSize: "9px", fontWeight: 800, fill: "white", letterSpacing: "0.08em" }}>
              {COUNTRIES[activeIso].name}
            </text>
          </Marker>
        )}
      </ComposableMap>

      {/* Status bar */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "12px 20px",
        background: "linear-gradient(0deg, rgba(5,11,26,0.95) 0%, transparent 100%)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        zIndex: 3,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00d4ff", boxShadow: "0 0 8px #00d4ff" }} />
          <span style={{ fontSize: "10px", color: "rgba(0,212,255,0.7)", letterSpacing: "0.15em", textTransform: "uppercase" }}>IAI GLOBAL OPERATIONS</span>
        </div>
        <span style={{ fontSize: "11px", fontWeight: 800, color: "#00d4ff", letterSpacing: "0.14em" }}>
          {activeIso ? COUNTRIES[activeIso]?.name?.toUpperCase() : "SELECT A COUNTRY"}
        </span>
      </div>
    </div>
  )
}
