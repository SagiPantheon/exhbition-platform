"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { exhibitDivisions } from "../../../data/globalExhibitBank"

type DivisionBankSystem = {
  id: string
  name: string
  subDivision: string
  summary: string
  readiness: number
  displayMode: string
}

const divisionSystemsSeed: Record<string, DivisionBankSystem[]> = {
  "missiles-space-defense": [
    {
      id: "satellite-systems",
      name: "Satellite Systems",
      subDivision: "חלל",
      summary: "Strategic umbrella entry for satellite exhibit systems and space-family assets.",
      readiness: 86,
      displayMode: "Pedestal / floor",
    },
    {
      id: "optsat-500",
      name: "OPTSAT 500",
      subDivision: "חלל",
      summary: "Compact space-system exhibit connected to the existing Space catalog line.",
      readiness: 84,
      displayMode: "Pedestal",
    },
    {
      id: "optsar-550",
      name: "OptSar 550",
      subDivision: "חלל",
      summary: "Space-system exhibit tied to the reusable template and Space catalog logic.",
      readiness: 83,
      displayMode: "Pedestal",
    },
    {
      id: "optsat-3000",
      name: "OPSAT 3000",
      subDivision: "חלל",
      summary: "Large-format space-system exhibit requiring stronger footprint planning.",
      readiness: 88,
      displayMode: "Pedestal / support",
    },
    {
      id: "mcs",
      name: "MCS",
      subDivision: "חלל",
      summary: "Space-family template candidate for reusable system presentation.",
      readiness: 85,
      displayMode: "Pedestal",
    },
    {
      id: "defense-layer",
      name: "Defense Layer",
      subDivision: "הגנה",
      summary: "Defense-oriented system family entry point within the division bank.",
      readiness: 82,
      displayMode: "Floor / structured display",
    },
    {
      id: "missile-family",
      name: "Missile Family",
      subDivision: "טילים",
      summary: "Strike and missile-oriented family layer for future system expansion.",
      readiness: 80,
      displayMode: "Structured display",
    },
    {
      id: "mission-layer",
      name: "Mission Layer",
      subDivision: "מלמ",
      summary: "Operational mission-oriented family entry for future exhibit systems.",
      readiness: 78,
      displayMode: "Flexible display",
    },
  ],
  aviation: [
    {
      id: "aircraft-support",
      name: "Aircraft Support",
      subDivision: "בדק",
      summary: "Maintenance and support presentation layer for aviation systems.",
      readiness: 81,
      displayMode: "Floor / structured display",
    },
    {
      id: "mro-services",
      name: "MRO Services",
      subDivision: "MRO",
      summary: "Lifecycle and maintenance services layer for aviation operations.",
      readiness: 84,
      displayMode: "Wall / panel / media",
    },
    {
      id: "airframe-support",
      name: "Airframe Support",
      subDivision: "MRO",
      summary: "Technical support family for airframe-related service systems.",
      readiness: 80,
      displayMode: "Panel / support display",
    },
    {
      id: "depot-systems",
      name: "Depot Systems",
      subDivision: "בדק",
      summary: "Operational depot support line for aviation exhibition context.",
      readiness: 79,
      displayMode: "Structured display",
    },
  ],
  elta: [
    {
      id: "radar-family",
      name: "Radar Family",
      subDivision: "מכ״מים",
      summary: "Radar-oriented systems family within the ELTA division bank.",
      readiness: 89,
      displayMode: "Floor / support display",
    },
    {
      id: "communications-suite",
      name: "Communications Suite",
      subDivision: "תקשורת",
      summary: "Communications-focused family layer for reusable exhibit systems.",
      readiness: 86,
      displayMode: "Panel / media display",
    },
    {
      id: "ground-robotics",
      name: "Ground Robotics",
      subDivision: "רובוטיקה",
      summary: "Robotics system family for future structured exhibit pages.",
      readiness: 85,
      displayMode: "Floor display",
    },
    {
      id: "sensor-grid",
      name: "Sensor Grid",
      subDivision: "מכ״מים",
      summary: "Sensor and detection family connected to radar-layer logic.",
      readiness: 87,
      displayMode: "Support display",
    },
  ],
  uav: [
    {
      id: "uav-family",
      name: "UAV Family",
      subDivision: "מלט",
      summary: "UAV systems bank entry point for reusable exhibit-system logic.",
      readiness: 84,
      displayMode: "Floor / suspended / support",
    },
    {
      id: "mission-payload",
      name: "Mission Payload",
      subDivision: "מלט",
      summary: "Payload-oriented family for UAV-related exhibit systems.",
      readiness: 82,
      displayMode: "Support display",
    },
    {
      id: "control-segment",
      name: "Control Segment",
      subDivision: "מלט",
      summary: "Control and operations layer for UAV exhibition logic.",
      readiness: 81,
      displayMode: "Panel / media support",
    },
  ],
}

function storageKey(divisionId: string) {
  return `division-bank:${divisionId}`
}

export default function DivisionPage() {
  const searchParams = useSearchParams()
  const rawDivisionId = searchParams.get("divisionId") ?? ""
  const divisionId = decodeURIComponent(rawDivisionId).trim().toLowerCase()

  const division = useMemo(
    () =>
      exhibitDivisions.find(
        (item) => item.id.trim().toLowerCase() === divisionId
      ) ?? null,
    [divisionId]
  )

  const [activeSubDivision, setActiveSubDivision] = useState<string>("all")
  const [systems, setSystems] = useState<DivisionBankSystem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null)

  const [name, setName] = useState("")
  const [subDivision, setSubDivision] = useState("")
  const [summary, setSummary] = useState("")
  const [readiness, setReadiness] = useState("80")
  const [displayMode, setDisplayMode] = useState("Pedestal")

  useEffect(() => {
    if (!division) return

    const fallback = divisionSystemsSeed[division.id] ?? []
    const saved = window.localStorage.getItem(storageKey(division.id))

    if (saved) {
      try {
        const parsed = JSON.parse(saved) as DivisionBankSystem[]
        setSystems(parsed)
      } catch {
        setSystems(fallback)
      }
    } else {
      setSystems(fallback)
    }

    setSubDivision(division.subDivisions[0] ?? "")
    setIsLoaded(true)
  }, [division])

  useEffect(() => {
    if (!division || !isLoaded) return
    window.localStorage.setItem(storageKey(division.id), JSON.stringify(systems))
  }, [division, systems, isLoaded])

  useEffect(() => {
    if (!recentlyAddedId) return
    const t = window.setTimeout(() => setRecentlyAddedId(null), 3500)
    return () => window.clearTimeout(t)
  }, [recentlyAddedId])

  const filteredSystems = useMemo(() => {
    if (activeSubDivision === "all") return systems
    return systems.filter((item) => item.subDivision === activeSubDivision)
  }, [systems, activeSubDivision])

  const visibleAverageReadiness = useMemo(() => {
    if (filteredSystems.length === 0) return 0
    return Math.round(
      filteredSystems.reduce((acc, item) => acc + item.readiness, 0) / filteredSystems.length
    )
  }, [filteredSystems])

  function addSystem() {
    if (!division) return

    const trimmedName = name.trim()
    const trimmedSummary = summary.trim()
    const trimmedSubDivision = subDivision.trim()
    const trimmedDisplayMode = displayMode.trim()

    if (!trimmedName || !trimmedSubDivision) return

    const newSystem: DivisionBankSystem = {
      id: `${trimmedName.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`,
      name: trimmedName,
      subDivision: trimmedSubDivision,
      summary: trimmedSummary || "New exhibit added to division bank.",
      readiness: Math.max(0, Math.min(100, Number(readiness) || 0)),
      displayMode: trimmedDisplayMode || "Display mode not set",
    }

    setSystems((prev) => [newSystem, ...prev])
    setRecentlyAddedId(newSystem.id)
    setName("")
    setSummary("")
    setReadiness("80")
    setDisplayMode("Pedestal")
    setActiveSubDivision(trimmedSubDivision)
  }

  function deleteSystem(id: string) {
    setSystems((prev) => prev.filter((item) => item.id !== id))
  }

  function resetDivisionBank() {
    if (!division) return
    const fallback = divisionSystemsSeed[division.id] ?? []
    setSystems(fallback)
    setRecentlyAddedId(null)
    window.localStorage.removeItem(storageKey(division.id))
    setActiveSubDivision("all")
  }

  if (!division) {
    return (
      <main
        style={{
          minHeight: "100vh",
          color: "#EAF4FF",
          background:
            "radial-gradient(circle at top, rgba(33,99,255,0.22), transparent 30%), linear-gradient(180deg, #040913 0%, #07111f 40%, #040811 100%)",
          display: "grid",
          placeItems: "center",
          padding: "24px",
        }}
       className="division-bank-page">
        <div
          style={{
            maxWidth: "760px",
            width: "100%",
            borderRadius: "28px",
            padding: "28px",
            border: "1px solid rgba(95, 168, 255, 0.18)",
            background:
              "linear-gradient(180deg, rgba(10,24,46,0.84) 0%, rgba(7,16,32,0.92) 100%)",
            boxShadow:
              "0 24px 70px rgba(0,0,0,0.30), inset 0 0 0 1px rgba(130,196,255,0.05)",
          }}
        >
          <div
            style={{
              fontSize: "12px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(153, 198, 255, 0.68)",
              marginBottom: "14px",
            }}
          >
            Division not found
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: "clamp(28px, 4vw, 42px)",
              lineHeight: 1.05,
              fontWeight: 900,
              marginBottom: "12px",
            }}
          >
            No matching division for this route
          </h1>

          <div
            style={{
              fontSize: "15px",
              lineHeight: 1.7,
              color: "rgba(224, 239, 255, 0.82)",
              marginBottom: "20px",
            }}
          >
            Received divisionId: <strong>{rawDivisionId || "(empty)"}</strong>
          </div>

          <Link
            href="/global-exhibit-bank"
            style={{
              padding: "11px 14px",
              borderRadius: "14px",
              textDecoration: "none",
              color: "#DCEEFF",
              border: "1px solid rgba(95, 168, 255, 0.18)",
              background: "rgba(9,20,40,0.72)",
            }}
          >
            ← Global Exhibit Bank
          </Link>
        </div>
      </main>
    )
  }

  const stats = [
    { label: "Total systems", value: systems.length },
    { label: "Visible now", value: filteredSystems.length },
    { label: "Sub-divisions", value: division.subDivisionCount },
    { label: "Visible readiness", value: `${visibleAverageReadiness}%` },
  ]

  return (
    <main
      style={{
        minHeight: "100vh",
        color: "#EAF4FF",
        background:
          "radial-gradient(circle at top, rgba(33,99,255,0.22), transparent 30%), linear-gradient(180deg, #040913 0%, #07111f 40%, #040811 100%)",
      }}
    >
      <div
        style={{
          maxWidth: "1680px",
          margin: "0 auto",
          padding: "32px 24px 56px",
        }}
      >
        <section
          className="division-hero-section"
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: "34px",
            padding: "28px",
            marginBottom: "20px",
            border: "1px solid rgba(95, 168, 255, 0.18)",
            background:
              "radial-gradient(circle at 20% 10%, rgba(84,155,255,0.18), transparent 26%), radial-gradient(circle at 85% 22%, rgba(0,230,255,0.10), transparent 20%), linear-gradient(180deg, rgba(10,24,46,0.90) 0%, rgba(7,16,32,0.95) 100%)",
            boxShadow:
              "0 32px 90px rgba(0,0,0,0.30), inset 0 0 0 1px rgba(130,196,255,0.05), inset 0 0 60px rgba(61,139,255,0.07)",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg, transparent 0%, rgba(102,183,255,0.06) 48%, transparent 100%)",
              pointerEvents: "none",
            }}
          />

          <header
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: "18px",
              flexWrap: "wrap",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div className="division-hero-copy" style={{ maxWidth: "920px" }}>
              <div
                style={{
                  fontSize: "12px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(153, 198, 255, 0.70)",
                  marginBottom: "10px",
                }}
              >
                Division bank / command inventory
              </div>

              <h1
                style={{
                  margin: 0,
                  fontSize: "clamp(40px, 5vw, 74px)",
                  lineHeight: 0.95,
                  fontWeight: 900,
                  letterSpacing: "-0.04em",
                }}
              >
                {division.titleHe}
              </h1>

              <div
                style={{
                  marginTop: "12px",
                  fontSize: "14px",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "rgba(132, 193, 255, 0.82)",
                }}
              >
                {division.titleEn}
              </div>

              <div
                style={{
                  marginTop: "16px",
                  fontSize: "15px",
                  lineHeight: 1.8,
                  color: "rgba(222, 238, 255, 0.84)",
                  maxWidth: "880px",
                }}
              >
                {division.descriptionHe}
              </div>
            </div>

            <div className="division-hero-core" aria-hidden="true">
              <div className="division-hero-core-ring division-hero-core-ring-outer" />
              <div className="division-hero-core-ring division-hero-core-ring-inner" />
              <div className="division-hero-core-grid" />
              <div className="division-hero-core-sphere">
                <div className="division-hero-core-sphere-lines" />
              </div>
              <div className="division-hero-core-caption">DIVISION SIGNAL</div>
            </div>

            <div className="division-hero-actions"
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
                alignItems: "flex-start",
              }}
            >
              <Link
                href="/global-exhibit-bank"
                style={{
                  padding: "12px 16px",
                  borderRadius: "14px",
                  textDecoration: "none",
                  color: "#EAF4FF",
                  border: "1px solid rgba(95, 168, 255, 0.20)",
                  background: "rgba(9,20,40,0.72)",
                  fontWeight: 700,
                }}
              >
                ← Global Exhibit Bank
              </Link>

              <button
                onClick={resetDivisionBank}
                style={{
                  padding: "12px 16px",
                  borderRadius: "14px",
                  color: "#EAF4FF",
                  border: "1px solid rgba(95, 168, 255, 0.20)",
                  background: "rgba(9,20,40,0.72)",
                  cursor: "pointer",
                  fontWeight: 700,
                }}
              >
                Reset division bank
              </button>
            </div>
          </header>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
              gap: "14px",
              marginTop: "24px",
              position: "relative",
              zIndex: 1,
            }}
          >
            {stats.map((item) => (
              <div
                key={item.label}
                className="division-stat-card"
                style={{
                  borderRadius: "18px",
                  padding: "16px 18px",
                  border: "1px solid rgba(95, 168, 255, 0.18)",
                  background:
                    "linear-gradient(180deg, rgba(12,30,56,0.92) 0%, rgba(10,20,40,0.80) 100%)",
                  boxShadow: "inset 0 0 0 1px rgba(130,196,255,0.03)",
                }}
              >
                <div
                  style={{
                    fontSize: "11px",
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: "rgba(153, 198, 255, 0.64)",
                    marginBottom: "8px",
                  }}
                >
                  {item.label}
                </div>
                <div
                  style={{
                    fontSize: "30px",
                    lineHeight: 1,
                    fontWeight: 900,
                  }}
                >
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          style={{
            borderRadius: "28px",
            padding: "22px",
            border: "1px solid rgba(95, 168, 255, 0.18)",
            background:
              "linear-gradient(180deg, rgba(10,24,46,0.84) 0%, rgba(7,16,32,0.90) 100%)",
            boxShadow:
              "0 24px 70px rgba(0,0,0,0.24), inset 0 0 0 1px rgba(130,196,255,0.04)",
            marginBottom: "18px",
          }}
        >
          <div
            style={{
              fontSize: "12px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(153, 198, 255, 0.68)",
              marginBottom: "16px",
            }}
          >
            Add exhibit to division bank
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.15fr 0.8fr 1.4fr 0.55fr 0.8fr auto",
              gap: "12px",
              alignItems: "stretch",
            }}
          >
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="System name"
              style={{
                borderRadius: "16px",
                border: "1px solid rgba(95, 168, 255, 0.18)",
                background: "rgba(9,20,40,0.72)",
                color: "#EAF4FF",
                padding: "15px 16px",
                outline: "none",
              }}
            />

            <select
              value={subDivision}
              onChange={(e) => setSubDivision(e.target.value)}
              style={{
                borderRadius: "16px",
                border: "1px solid rgba(95, 168, 255, 0.18)",
                background: "rgba(9,20,40,0.72)",
                color: "#EAF4FF",
                padding: "15px 16px",
                outline: "none",
              }}
            >
              {division.subDivisions.map((item) => (
                <option key={item} value={item} style={{ color: "#000" }}>
                  {item}
                </option>
              ))}
            </select>

            <input
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Short summary"
              style={{
                borderRadius: "16px",
                border: "1px solid rgba(95, 168, 255, 0.18)",
                background: "rgba(9,20,40,0.72)",
                color: "#EAF4FF",
                padding: "15px 16px",
                outline: "none",
              }}
            />

            <input
              value={readiness}
              onChange={(e) => setReadiness(e.target.value)}
              placeholder="80"
              style={{
                borderRadius: "16px",
                border: "1px solid rgba(95, 168, 255, 0.18)",
                background: "rgba(9,20,40,0.72)",
                color: "#EAF4FF",
                padding: "15px 16px",
                outline: "none",
              }}
            />

            <input
              value={displayMode}
              onChange={(e) => setDisplayMode(e.target.value)}
              placeholder="Display mode"
              style={{
                borderRadius: "16px",
                border: "1px solid rgba(95, 168, 255, 0.18)",
                background: "rgba(9,20,40,0.72)",
                color: "#EAF4FF",
                padding: "15px 16px",
                outline: "none",
              }}
            />

            <button
              onClick={addSystem}
              style={{
                border: "none",
                borderRadius: "16px",
                padding: "15px 18px",
                fontWeight: 900,
                cursor: "pointer",
                color: "#04111E",
                background: "linear-gradient(180deg, #8AD8FF 0%, #5FC1FF 100%)",
                boxShadow: "0 12px 24px rgba(95,193,255,0.24)",
                whiteSpace: "nowrap",
              }}
            >
              Add exhibit
            </button>
          </div>
        </section>

        <section
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "14px",
            flexWrap: "wrap",
            marginBottom: "18px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() => setActiveSubDivision("all")}
              style={{
                padding: "12px 16px",
                borderRadius: "999px",
                border:
                  activeSubDivision === "all"
                    ? "1px solid rgba(111, 200, 255, 0.62)"
                    : "1px solid rgba(95, 168, 255, 0.18)",
                background:
                  activeSubDivision === "all"
                    ? "linear-gradient(180deg, rgba(18,47,87,0.96) 0%, rgba(12,28,52,0.96) 100%)"
                    : "rgba(9,20,40,0.72)",
                color: "#EAF4FF",
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              כל המערכות
            </button>

            {division.subDivisions.map((item) => {
              const active = activeSubDivision === item
              return (
                <button
                  key={item}
                  onClick={() => setActiveSubDivision(item)}
                  style={{
                    padding: "12px 16px",
                    borderRadius: "999px",
                    border: active
                      ? "1px solid rgba(111, 200, 255, 0.62)"
                      : "1px solid rgba(95, 168, 255, 0.18)",
                    background: active
                      ? "linear-gradient(180deg, rgba(18,47,87,0.96) 0%, rgba(12,28,52,0.96) 100%)"
                      : "rgba(9,20,40,0.72)",
                    color: "#EAF4FF",
                    fontWeight: 800,
                    cursor: "pointer",
                  }}
                >
                  {item}
                </button>
              )
            })}
          </div>

          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            {[
              `${systems.length} systems`,
              `${division.subDivisionCount} sub-divisions`,
              activeSubDivision === "all" ? "All filters open" : `Filter: ${activeSubDivision}`,
            ].map((chip) => (
              <span
                key={chip}
                style={{
                  padding: "10px 12px",
                  borderRadius: "999px",
                  border: "1px solid rgba(95, 168, 255, 0.20)",
                  background: "rgba(14,31,58,0.72)",
                  fontSize: "13px",
                  color: "rgba(218, 236, 255, 0.86)",
                }}
              >
                {chip}
              </span>
            ))}
          </div>
        </section>

        {filteredSystems.length === 0 ? (
          <section
            style={{
              borderRadius: "28px",
              padding: "34px",
              border: "1px solid rgba(95, 168, 255, 0.18)",
              background:
                "linear-gradient(180deg, rgba(10,24,46,0.86) 0%, rgba(7,16,32,0.92) 100%)",
              textAlign: "center",
              color: "rgba(222, 238, 255, 0.82)",
            }}
          >
            <div
              style={{
                fontSize: "12px",
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                color: "rgba(153, 198, 255, 0.66)",
                marginBottom: "12px",
              }}
            >
              Empty filter result
            </div>
            <div
              style={{
                fontSize: "28px",
                fontWeight: 900,
                marginBottom: "12px",
              }}
            >
              No systems under this filter
            </div>
            <div
              style={{
                fontSize: "15px",
                lineHeight: 1.8,
              }}
            >
              Add a new exhibit above or switch to another sub-division filter.
            </div>
          </section>
        ) : (
          <section
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "18px",
            }}
          >
            {filteredSystems.map((system, index) => {
              const isFresh = system.id === recentlyAddedId
              return (
                <div
                  key={system.id}
                  className="division-system-card"
                  style={{
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: "28px",
                    padding: "22px",
                    border: isFresh
                      ? "1px solid rgba(126, 220, 255, 0.68)"
                      : "1px solid rgba(95, 168, 255, 0.18)",
                    background:
                      "radial-gradient(circle at top right, rgba(65,142,255,0.16), transparent 24%), linear-gradient(180deg, rgba(10,24,46,0.90) 0%, rgba(7,16,32,0.94) 100%)",
                    boxShadow: isFresh
                      ? "0 24px 70px rgba(0,0,0,0.28), 0 0 0 1px rgba(126,220,255,0.12), inset 0 0 42px rgba(106,215,255,0.08)"
                      : "0 24px 70px rgba(0,0,0,0.24), inset 0 0 0 1px rgba(130,196,255,0.04)",
                    minHeight: "270px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "3px",
                      background:
                        "linear-gradient(90deg, rgba(95,193,255,0.0) 0%, rgba(95,193,255,0.9) 50%, rgba(95,193,255,0.0) 100%)",
                    }}
                  />

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "10px",
                      alignItems: "flex-start",
                      marginBottom: "18px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                        flexWrap: "wrap",
                      }}
                    >
                      <span
                        style={{
                          padding: "8px 12px",
                          borderRadius: "999px",
                          border: "1px solid rgba(95, 168, 255, 0.20)",
                          background: "rgba(14,31,58,0.72)",
                          fontSize: "12px",
                          color: "rgba(218, 236, 255, 0.86)",
                        }}
                      >
                        {system.subDivision}
                      </span>

                      {isFresh && (
                        <span
                          style={{
                            padding: "8px 12px",
                            borderRadius: "999px",
                            border: "1px solid rgba(111, 220, 255, 0.32)",
                            background: "rgba(18,64,86,0.86)",
                            fontSize: "12px",
                            color: "#BCEFFF",
                            fontWeight: 800,
                          }}
                        >
                          NEW
                        </span>
                      )}
                    </div>

                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          padding: "8px 12px",
                          borderRadius: "999px",
                          border: "1px solid rgba(95, 168, 255, 0.20)",
                          background: "rgba(14,31,58,0.72)",
                          fontSize: "12px",
                          color: "rgba(218, 236, 255, 0.86)",
                        }}
                      >
                        {system.readiness}%
                      </div>

                      <button
                        onClick={() => deleteSystem(system.id)}
                        className="division-system-delete"
                        style={{
                          border: "1px solid rgba(255,120,120,0.24)",
                          background: "rgba(70,16,22,0.76)",
                          color: "#FFD7D7",
                          borderRadius: "12px",
                          padding: "8px 10px",
                          cursor: "pointer",
                          fontWeight: 800,
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  <div
                    style={{
                      fontSize: "13px",
                      textTransform: "uppercase",
                      letterSpacing: "0.16em",
                      color: "rgba(153, 198, 255, 0.58)",
                      marginBottom: "10px",
                    }}
                  >
                    System {String(index + 1).padStart(2, "0")}
                  </div>

                  <div
                    style={{
                      fontSize: "31px",
                      fontWeight: 900,
                      lineHeight: 1.06,
                      marginBottom: "12px",
                    }}
                  >
                    {system.name}
                  </div>

                  <div
                    style={{
                      fontSize: "14px",
                      lineHeight: 1.78,
                      color: "rgba(224, 239, 255, 0.84)",
                      marginBottom: "18px",
                    }}
                  >
                    {system.summary}
                  </div>

                  <div
                    style={{
                      marginTop: "auto",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: "11px",
                          textTransform: "uppercase",
                          letterSpacing: "0.12em",
                          color: "rgba(153, 198, 255, 0.56)",
                          marginBottom: "6px",
                        }}
                      >
                        Display mode
                      </div>
                      <div
                        style={{
                          fontSize: "14px",
                          fontWeight: 700,
                          color: "#EAF4FF",
                        }}
                      >
                        {system.displayMode}
                      </div>
                    </div>

                    <Link
                      href={`/global-exhibit-bank/exhibit-system?divisionId=${division.id}&subDivision=${encodeURIComponent(system.subDivision)}&system=${encodeURIComponent(system.name)}`}
                      className="division-system-open-link"
                      style={{
                        padding: "11px 16px",
                        borderRadius: "14px",
                        background: "linear-gradient(180deg, #8AD8FF 0%, #5FC1FF 100%)",
                        color: "#04111E",
                        fontWeight: 900,
                        fontSize: "13px",
                        textDecoration: "none",
                        boxShadow: "0 12px 24px rgba(95,193,255,0.24)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Open System
                    </Link>
                  </div>
                </div>
              )
            })}
          </section>
        )}
      </div>
    </main>
  )
}
