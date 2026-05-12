"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { exhibitBankSummary, exhibitDivisions } from "../../data/globalExhibitBank"

type PreviewSystem = {
  name: string
  code: string
  divisionId: string
  subDivision: string
  visual: string
}

const previewSystemsMap: Record<string, PreviewSystem[]> = {
  "missiles-space-defense": [
    { name: "OPTSAT 500", code: "SPACE-001", divisionId: "missiles-space-defense", subDivision: "חלל", visual: "🛰️" },
    { name: "OptSar 550", code: "SPACE-002", divisionId: "missiles-space-defense", subDivision: "חלל", visual: "🛰️" },
    { name: "OPSAT 3000", code: "SPACE-003", divisionId: "missiles-space-defense", subDivision: "חלל", visual: "🛰️" },
    { name: "MCS", code: "SPACE-004", divisionId: "missiles-space-defense", subDivision: "חלל", visual: "🛰️" },
    { name: "Missile Family", code: "MSD-005", divisionId: "missiles-space-defense", subDivision: "טילים", visual: "🚀" },
    { name: "Defense Layer", code: "MSD-006", divisionId: "missiles-space-defense", subDivision: "הגנה", visual: "🛡️" },
  ],
  aviation: [
    { name: "Aircraft Support", code: "AIR-001", divisionId: "aviation", subDivision: "בדק", visual: "✈️" },
    { name: "MRO Services", code: "AIR-002", divisionId: "aviation", subDivision: "MRO", visual: "🛠️" },
    { name: "Airframe Support", code: "AIR-003", divisionId: "aviation", subDivision: "MRO", visual: "🧩" },
    { name: "Depot Systems", code: "AIR-004", divisionId: "aviation", subDivision: "בדק", visual: "🏭" },
  ],
  elta: [
    { name: "Radar Family", code: "ELTA-001", divisionId: "elta", subDivision: "מכ״מים", visual: "📡" },
    { name: "Communications Suite", code: "ELTA-002", divisionId: "elta", subDivision: "תקשורת", visual: "📶" },
    { name: "Ground Robotics", code: "ELTA-003", divisionId: "elta", subDivision: "רובוטיקה", visual: "🤖" },
    { name: "Sensor Grid", code: "ELTA-004", divisionId: "elta", subDivision: "מכ״מים", visual: "📡" },
  ],
  uav: [
    { name: "UAV Family", code: "UAV-001", divisionId: "uav", subDivision: "מלט", visual: "🛸" },
    { name: "Mission Payload", code: "UAV-002", divisionId: "uav", subDivision: "מלט", visual: "🎯" },
    { name: "Control Segment", code: "UAV-003", divisionId: "uav", subDivision: "מלט", visual: "🧭" },
  ],
}

const divisionIcons: Record<string, string> = {
  "missiles-space-defense": "🚀",
  aviation: "✈️",
  elta: "📡",
  uav: "🛸",
}

const divisionCoverMap: Record<string, string> = {
  "missiles-space-defense": "/images/divisions/missiles-space-defense-cover.png",
  aviation: "/images/divisions/aviation-cover.png",
  elta: "/images/divisions/elta-cover.png",
  uav: "/images/divisions/uav-cover.png",
}

export default function GlobalExhibitBankPage() {
  const [activeDivisionId, setActiveDivisionId] = useState(exhibitDivisions[0]?.id ?? "")
  const [query, setQuery] = useState("")

  const activeDivision =
    exhibitDivisions.find((item) => item.id === activeDivisionId) ?? exhibitDivisions[0]

  const allPreviewSystems = useMemo(
    () => exhibitDivisions.flatMap((division) => previewSystemsMap[division.id] ?? []),
    []
  )

  const visiblePreviewSystems = useMemo(() => {
    const byDivision = previewSystemsMap[activeDivision?.id ?? ""] ?? []
    const q = query.trim().toLowerCase()

    if (!q) return byDivision

    return allPreviewSystems.filter((item) => {
      const division = exhibitDivisions.find((d) => d.id === item.divisionId)
      return (
        item.name.toLowerCase().includes(q) ||
        item.code.toLowerCase().includes(q) ||
        item.subDivision.toLowerCase().includes(q) ||
        division?.titleHe.toLowerCase().includes(q) ||
        division?.titleEn.toLowerCase().includes(q)
      )
    })
  }, [activeDivision, query, allPreviewSystems])

  const topStats = [
    { label: "Total Exhibits", value: exhibitBankSummary.totalExhibits ?? 81, icon: "◈" },
    { label: "Divisions", value: exhibitDivisions.length, icon: "⬡" },
    {
      label: "Sub-Divisions",
      value: exhibitDivisions.reduce((acc, item) => acc + item.subDivisionCount, 0),
      icon: "⌘",
    },
    { label: "Ready", value: `${exhibitBankSummary.avgReadiness ?? 83}%`, icon: "✓" },
    { label: "Missing Data", value: 14, icon: "⚠" },
    { label: "New", value: 7, icon: "✦" },
  ]

  const sideNav = [
    { label: "Hub", href: "/", active: false },
    { label: "Global Exhibit Bank", href: "/global-exhibit-bank", active: true },
    {
      label: "Divisions",
      href: activeDivision ? `/global-exhibit-bank/division?divisionId=${activeDivision.id}` : "/global-exhibit-bank",
      active: false,
    },
    { label: "Systems", href: "/global-exhibit-bank", active: false },
    { label: "Layouts", href: "/tents-layout", active: false },
    { label: "Reports", href: "/global-exhibit-bank", active: false },
  ]

  return (
    <main className="global-exhibit-bank-page"
      style={{
        minHeight: "100vh",
        color: "#EAF4FF",
        background:
          "radial-gradient(circle at top, rgba(32,104,255,0.20), transparent 28%), linear-gradient(180deg, #030811 0%, #06101d 42%, #03070d 100%)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1760px",
          margin: "0 auto",
          padding: "14px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "116px minmax(0, 1fr)",
            gap: "14px",
            minHeight: "calc(100vh - 28px)",
          }}
        >
          <aside
            style={{
              borderRadius: "28px",
              border: "1px solid rgba(95, 168, 255, 0.18)",
              background:
                "linear-gradient(180deg, rgba(7,18,36,0.96) 0%, rgba(5,12,26,0.98) 100%)",
              boxShadow:
                "0 20px 60px rgba(0,0,0,0.28), inset 0 0 0 1px rgba(130,196,255,0.04)",
              padding: "12px 10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div
              style={{
                width: "86px",
                height: "86px",
                borderRadius: "24px",
                border: "1px solid rgba(95,168,255,0.22)",
                background:
                  "radial-gradient(circle at center, rgba(70,155,255,0.26) 0%, rgba(10,24,46,0.96) 62%, rgba(8,16,30,1) 100%)",
                display: "grid",
                placeItems: "center",
                boxShadow: "inset 0 0 30px rgba(90,195,255,0.10)",
                fontSize: "34px",
              }}
            >
              🌐
            </div>

            <div style={{ width: "100%", display: "grid", gap: "8px", marginTop: "6px" }}>
              {sideNav.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  style={{
                    textDecoration: "none",
                    color: "#EAF4FF",
                    borderRadius: "18px",
                    border: item.active
                      ? "1px solid rgba(111,200,255,0.42)"
                      : "1px solid rgba(95,168,255,0.12)",
                    background: item.active
                      ? "linear-gradient(180deg, rgba(18,47,87,0.98) 0%, rgba(11,26,50,0.98) 100%)"
                      : "rgba(8,18,35,0.74)",
                    padding: "14px 8px",
                    textAlign: "center",
                    fontSize: "12px",
                    lineHeight: 1.25,
                    fontWeight: item.active ? 800 : 600,
                    boxShadow: item.active ? "0 0 22px rgba(95,193,255,0.16)" : "none",
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div style={{ marginTop: "auto", width: "100%" }}>
              <div
                style={{
                  borderRadius: "18px",
                  border: "1px solid rgba(95,168,255,0.12)",
                  background: "rgba(8,18,35,0.74)",
                  padding: "14px 10px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "rgba(162,206,255,0.76)",
                    marginBottom: "8px",
                  }}
                >
                  GEB Command
                </div>
                <div style={{ fontSize: "12px", color: "#DCEEFF", marginBottom: "6px" }}>v2.5.0</div>
                <div style={{ fontSize: "11px", color: "#7BFFB2", fontWeight: 800 }}>● ONLINE</div>
              </div>
            </div>
          </aside>

          <section
            style={{
              borderRadius: "30px",
              border: "1px solid rgba(95, 168, 255, 0.18)",
              background:
                "radial-gradient(circle at 50% 0%, rgba(50,130,255,0.10), transparent 25%), linear-gradient(180deg, rgba(6,16,30,0.96) 0%, rgba(4,10,20,0.98) 100%)",
              boxShadow:
                "0 22px 70px rgba(0,0,0,0.28), inset 0 0 0 1px rgba(130,196,255,0.03)",
              padding: "16px",
              display: "grid",
              gridTemplateRows: "auto auto auto auto",
              gap: "14px",
            }}
          >
            <header
              style={{
                display: "grid",
                gridTemplateColumns: "1.1fr 0.9fr",
                gap: "14px",
                alignItems: "start",
              }}
            >
              <div>
                <h1
                  style={{
                    margin: 0,
                    fontSize: "48px",
                    lineHeight: 1,
                    fontWeight: 900,
                    letterSpacing: "-0.04em",
                  }}
                >
                  GLOBAL EXHIBIT BANK
                </h1>
                <div
                  style={{
                    marginTop: "8px",
                    fontSize: "16px",
                    color: "rgba(223,238,255,0.84)",
                  }}
                >
                  Unified access point to all divisions, sub-divisions, and exhibit systems
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 54px",
                  gap: "10px",
                  alignItems: "stretch",
                }}
              >
                <div
                  style={{
                    borderRadius: "16px",
                    border: "1px solid rgba(95,168,255,0.16)",
                    background: "rgba(6,16,30,0.82)",
                    display: "flex",
                    alignItems: "center",
                    padding: "0 16px",
                    minHeight: "54px",
                  }}
                >
                  <span style={{ fontSize: "18px", marginRight: "10px", opacity: 0.82 }}>⌕</span>
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search exhibits, divisions, systems..."
                    style={{
                      width: "100%",
                      background: "transparent",
                      border: "none",
                      outline: "none",
                      color: "#EAF4FF",
                      fontSize: "16px",
                    }}
                  />
                </div>

                <button
                  style={{
                    borderRadius: "16px",
                    border: "1px solid rgba(95,168,255,0.16)",
                    background: "rgba(6,16,30,0.82)",
                    color: "#EAF4FF",
                    fontSize: "20px",
                    cursor: "pointer",
                  }}
                >
                  ⚙
                </button>
              </div>
            </header>

            <section
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
                gap: "12px",
              }}
            >
              {topStats.map((item) => (
                <div
                  key={item.label}
                  style={{
                    borderRadius: "18px",
                    border: "1px solid rgba(95,168,255,0.16)",
                    background:
                      "linear-gradient(180deg, rgba(10,25,46,0.92) 0%, rgba(8,18,34,0.92) 100%)",
                    padding: "16px 18px",
                    display: "grid",
                    gridTemplateColumns: "48px 1fr",
                    gap: "12px",
                    alignItems: "center",
                    boxShadow: "inset 0 0 0 1px rgba(130,196,255,0.03)",
                  }}
                >
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "14px",
                      display: "grid",
                      placeItems: "center",
                      background: "rgba(9,24,46,0.86)",
                      border: "1px solid rgba(95,168,255,0.12)",
                      fontSize: "22px",
                      color: "#6FD9FF",
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "13px",
                        color: "rgba(192,225,255,0.76)",
                        marginBottom: "4px",
                      }}
                    >
                      {item.label}
                    </div>
                    <div
                      style={{
                        fontSize: "24px",
                        fontWeight: 900,
                        lineHeight: 1,
                        color:
                          item.label === "Ready"
                            ? "#82F39A"
                            : item.label === "Missing Data"
                            ? "#FFD55A"
                            : "#EAF4FF",
                      }}
                    >
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </section>

            <section
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1.12fr 1fr",
                gap: "14px",
                alignItems: "stretch",
              }}
            >
              <div style={{ display: "grid", gap: "14px" }}>
                {exhibitDivisions.slice(0, 2).map((division) => {
                  const isActive = activeDivisionId === division.id
                  return (
                    <button
                      key={division.id}
                      onClick={() => setActiveDivisionId(division.id)}
                      style={{
                        textAlign: "right",
                        cursor: "pointer",
                        borderRadius: "26px",
                        border: isActive
                          ? "1px solid rgba(115,208,255,0.52)"
                          : "1px solid rgba(95,168,255,0.16)",
                        background: `
                          linear-gradient(180deg, rgba(8,22,44,0.52) 0%, rgba(7,18,34,0.84) 52%, rgba(7,18,34,0.94) 100%),
                          url(${divisionCoverMap[division.id] ?? ""})
                        `,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        padding: "18px 20px",
                        color: "#EAF4FF",
                        boxShadow: isActive ? "0 0 26px rgba(95,193,255,0.14)" : "none",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          gap: "12px",
                          alignItems: "center",
                          marginBottom: "12px",
                        }}
                      >
                        <div
                          style={{
                            width: "60px",
                            height: "60px",
                            borderRadius: "18px",
                            border: "1px solid rgba(95,168,255,0.14)",
                            background: "rgba(8,18,35,0.74)",
                            display: "grid",
                            placeItems: "center",
                            fontSize: "28px",
                          }}
                        >
                          {divisionIcons[division.id] ?? "◉"}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: "42px", fontWeight: 900, lineHeight: 1 }}>
                            {division.titleHe}
                          </div>
                          <div
                            style={{
                              marginTop: "8px",
                              fontSize: "18px",
                              color: "rgba(223,238,255,0.88)",
                            }}
                          >
                            {division.subDivisions.join(" · ")}
                          </div>
                        </div>
                      </div>

                      <div
                        style={{
                          fontSize: "28px",
                          marginBottom: "12px",
                          color: "rgba(223,238,255,0.9)",
                        }}
                      >
                        {division.exhibitCount} מוצגים &nbsp; · &nbsp; {division.subDivisionCount} תתי-יחידות &nbsp; ·
                        &nbsp; <span style={{ color: "#86F59B", fontWeight: 900 }}>{division.readiness}%</span>
                      </div>

                      <div
                        style={{
                          fontSize: "24px",
                          lineHeight: 1.55,
                          color: "rgba(223,238,255,0.86)",
                          marginBottom: "16px",
                        }}
                      >
                        {division.descriptionHe}
                      </div>

                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          minWidth: "220px",
                          borderRadius: "14px",
                          padding: "12px 18px",
                          background: "rgba(9,24,46,0.86)",
                          border: "1px solid rgba(95,168,255,0.18)",
                          fontSize: "22px",
                          fontWeight: 800,
                        }}
                      >
                        פתח חטיבה →
                      </div>
                    </button>
                  )
                })}
              </div>

              <div
                style={{
                  borderRadius: "30px",
                  border: "1px solid rgba(95,168,255,0.18)",
                  background:
                    "radial-gradient(circle at center, rgba(38,130,255,0.16) 0%, rgba(8,18,35,0.96) 52%, rgba(7,16,30,0.98) 100%)",
                  display: "grid",
                  placeItems: "center",
                  padding: "24px",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "radial-gradient(circle at center, rgba(92,197,255,0.08) 0%, transparent 52%)",
                    pointerEvents: "none",
                  }}
                />
                <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",overflow:"visible",zIndex:0}} viewBox="0 0 100 100" preserveAspectRatio="none"><defs><filter id="neonGlow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><line x1="50" y1="50" x2="-38" y2="18" stroke="rgba(95,193,255,0.25)" strokeWidth="2.5" strokeLinecap="round"/><line x1="50" y1="50" x2="-38" y2="82" stroke="rgba(95,193,255,0.25)" strokeWidth="2.5" strokeLinecap="round"/><line x1="50" y1="50" x2="138" y2="18" stroke="rgba(95,193,255,0.25)" strokeWidth="2.5" strokeLinecap="round"/><line x1="50" y1="50" x2="138" y2="82" stroke="rgba(95,193,255,0.25)" strokeWidth="2.5" strokeLinecap="round"/><line x1="50" y1="50" x2="-38" y2="18" stroke="#5FC1FF" strokeWidth="0.5" strokeLinecap="round" filter="url(#neonGlow)" strokeDasharray="4 2"><animate attributeName="stroke-dashoffset" from="0" to="-18" dur="2.4s" repeatCount="indefinite"/></line><line x1="50" y1="50" x2="-38" y2="82" stroke="#5FC1FF" strokeWidth="0.5" strokeLinecap="round" filter="url(#neonGlow)" strokeDasharray="4 2"><animate attributeName="stroke-dashoffset" from="0" to="-18" dur="2.8s" repeatCount="indefinite"/></line><line x1="50" y1="50" x2="138" y2="18" stroke="#5FC1FF" strokeWidth="0.5" strokeLinecap="round" filter="url(#neonGlow)" strokeDasharray="4 2"><animate attributeName="stroke-dashoffset" from="0" to="-18" dur="2.2s" repeatCount="indefinite"/></line><line x1="50" y1="50" x2="138" y2="82" stroke="#5FC1FF" strokeWidth="0.5" strokeLinecap="round" filter="url(#neonGlow)" strokeDasharray="4 2"><animate attributeName="stroke-dashoffset" from="0" to="-18" dur="3s" repeatCount="indefinite"/></line><circle cx="-38" cy="18" r="1.4" fill="#5FC1FF" filter="url(#neonGlow)" opacity="0.9"/><circle cx="-38" cy="82" r="1.4" fill="#5FC1FF" filter="url(#neonGlow)" opacity="0.9"/><circle cx="138" cy="18" r="1.4" fill="#5FC1FF" filter="url(#neonGlow)" opacity="0.9"/><circle cx="138" cy="82" r="1.4" fill="#5FC1FF" filter="url(#neonGlow)" opacity="0.9"/><circle cx="50" cy="50" r="2" fill="#5FC1FF" filter="url(#neonGlow)" opacity="0.7"><animate attributeName="r" values="1.5;2.5;1.5" dur="2s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.5;0.9;0.5" dur="2s" repeatCount="indefinite"/></circle></svg>

                <div
                  className="geb-core-card"
                  style={{
                    width: "100%",
                    maxWidth: "520px",
                    borderRadius: "30px",
                    border: "1px solid rgba(111,200,255,0.34)",
                    background:
                      "linear-gradient(180deg, rgba(11,28,52,0.96) 0%, rgba(7,18,34,0.98) 100%)",
                    boxShadow:
                      "0 0 34px rgba(95,193,255,0.18), inset 0 0 0 1px rgba(130,196,255,0.04)",
                    padding: "26px 24px",
                    textAlign: "center",
                    position: "relative",
                  }}
                >
                  <div className="geb-core-title" style={{
                      overflow: "hidden",
                      position: "relative", fontSize: "28px", fontWeight: 900, lineHeight: 1.1, marginBottom: "10px" }}>
                    <div
                      className="geb-real-globe-wrap"
                      aria-hidden="true"
                      style={{
                        width: "100%",
                        margin: "0 auto 16px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          width: "220px",
                          height: "220px",
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            inset: "0",
                            borderRadius: "999px",
                            border: "1px solid rgba(114,197,255,0.22)",
                            boxShadow: "0 0 26px rgba(76,170,255,0.16)",
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            inset: "18px",
                            borderRadius: "999px",
                            border: "1px solid rgba(114,197,255,0.16)",
                          }}
                        />
                        <svg
                          viewBox="0 0 200 200"
                          aria-hidden="true"
                          role="img"
                          style={{
                            width: "170px",
                            height: "170px",
                            display: "block",
                          }}
                        >

                          <defs>
                            <radialGradient id="gebStableGlobeFill" cx="30%" cy="28%" r="72%">
                              <stop offset="0%" stopColor="#F6FDFF" />
                              <stop offset="18%" stopColor="#96DEFF" />
                              <stop offset="48%" stopColor="#3D8DFF" />
                              <stop offset="84%" stopColor="#0A2158" />
                            </radialGradient>
                            <clipPath id="gebStableGlobeClip">
                              <circle cx="100" cy="100" r="62" />
                            </clipPath>
                          </defs>

                          <g>
                            <animateTransform
                              attributeName="transform"
                              attributeType="XML"
                              type="rotate"
                              from="0 100 100"
                              to="360 100 100"
                              dur="22s"
                              repeatCount="indefinite"
                            />
                            <circle cx="100" cy="100" r="62" fill="url(#gebStableGlobeFill)" />
                            <g clipPath="url(#gebStableGlobeClip)">
                              <ellipse cx="100" cy="100" rx="46" ry="62" fill="none" stroke="rgba(231,248,255,0.72)" strokeWidth="1.15" />
                              <ellipse cx="100" cy="100" rx="26" ry="62" fill="none" stroke="rgba(231,248,255,0.54)" strokeWidth="1.05" />
                              <ellipse cx="100" cy="100" rx="10" ry="62" fill="none" stroke="rgba(231,248,255,0.34)" strokeWidth="1" />
                              <ellipse cx="100" cy="100" rx="62" ry="18" fill="none" stroke="rgba(231,248,255,0.46)" strokeWidth="1.05" />
                              <ellipse cx="100" cy="100" rx="62" ry="36" fill="none" stroke="rgba(231,248,255,0.30)" strokeWidth="1" />
                              <ellipse cx="100" cy="100" rx="62" ry="50" fill="none" stroke="rgba(231,248,255,0.18)" strokeWidth="1" />
                            </g>
                            <circle cx="76" cy="72" r="18" fill="rgba(255,255,255,0.22)" />
                          </g>
                        </svg>
                      </div>
                    </div>
GLOBAL EXHIBIT CORE
                  </div>

                  <div
                    style={{
                      fontSize: "17px",
                      color: "rgba(223,238,255,0.84)",
                      marginBottom: "18px",
                    }}
                  >
                    Unified company-wide exhibit ecosystem
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                      gap: "10px",
                      marginBottom: "16px",
                    }}
                  >
                    <Link
                      href="/global-exhibit-bank"
                      style={{
                        textDecoration: "none",
                        color: "#DDF2FF",
                        borderRadius: "14px",
                        border: "1px solid rgba(95,168,255,0.18)",
                        background: "rgba(8,18,35,0.72)",
                        padding: "12px 10px",
                        fontSize: "14px",
                        fontWeight: 700,
                      }}
                    >
                      View All Exhibits
                    </Link>
                    <Link
                      href={activeDivision ? `/global-exhibit-bank/division?divisionId=${activeDivision.id}` : "/global-exhibit-bank"}
                      style={{
                        textDecoration: "none",
                        color: "#DDF2FF",
                        borderRadius: "14px",
                        border: "1px solid rgba(95,168,255,0.18)",
                        background: "rgba(8,18,35,0.72)",
                        padding: "12px 10px",
                        fontSize: "14px",
                        fontWeight: 700,
                      }}
                    >
                      Open Division
                    </Link>
                    <Link
                      href="/tents-layout"
                      style={{
                        textDecoration: "none",
                        color: "#DDF2FF",
                        borderRadius: "14px",
                        border: "1px solid rgba(95,168,255,0.18)",
                        background: "rgba(8,18,35,0.72)",
                        padding: "12px 10px",
                        fontSize: "14px",
                        fontWeight: 700,
                      }}
                    >
                      Layouts
                    </Link>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                      gap: "12px",
                      borderTop: "1px solid rgba(95,168,255,0.14)",
                      paddingTop: "14px",
                    }}
                  >
                    {[
                      { label: "Total Systems", value: exhibitBankSummary.totalExhibits ?? 81 },
                      { label: "Exhibition Ready", value: `${exhibitBankSummary.avgReadiness ?? 83}%` },
                      { label: "Divisions Connected", value: exhibitDivisions.length },
                    ].map((item) => (
                      <div key={item.label}>
                        <div
                          style={{
                            fontSize: "12px",
                            color: "rgba(162,206,255,0.76)",
                            marginBottom: "6px",
                          }}
                        >
                          {item.label}
                        </div>
                        <div style={{ fontSize: "22px", fontWeight: 900 }}>{item.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ display: "grid", gap: "14px" }}>
                {exhibitDivisions.slice(2, 4).map((division) => {
                  const isActive = activeDivisionId === division.id
                  return (
                    <button
                      key={division.id}
                      onClick={() => setActiveDivisionId(division.id)}
                      style={{
                        textAlign: "right",
                        cursor: "pointer",
                        borderRadius: "26px",
                        border: isActive
                          ? "1px solid rgba(115,208,255,0.52)"
                          : "1px solid rgba(95,168,255,0.16)",
                        background: `
                          linear-gradient(180deg, rgba(8,22,44,0.52) 0%, rgba(7,18,34,0.84) 52%, rgba(7,18,34,0.94) 100%),
                          url(${divisionCoverMap[division.id] ?? ""})
                        `,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        padding: "18px 20px",
                        color: "#EAF4FF",
                        boxShadow: isActive ? "0 0 26px rgba(95,193,255,0.14)" : "none",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          gap: "12px",
                          alignItems: "center",
                          marginBottom: "12px",
                        }}
                      >
                        <div
                          style={{
                            width: "60px",
                            height: "60px",
                            borderRadius: "18px",
                            border: "1px solid rgba(95,168,255,0.14)",
                            background: "rgba(8,18,35,0.74)",
                            display: "grid",
                            placeItems: "center",
                            fontSize: "28px",
                          }}
                        >
                          {divisionIcons[division.id] ?? "◉"}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: "42px", fontWeight: 900, lineHeight: 1 }}>
                            {division.titleHe}
                          </div>
                          <div
                            style={{
                              marginTop: "8px",
                              fontSize: "18px",
                              color: "rgba(223,238,255,0.88)",
                            }}
                          >
                            {division.subDivisions.join(" · ")}
                          </div>
                        </div>
                      </div>

                      <div
                        style={{
                          fontSize: "28px",
                          marginBottom: "12px",
                          color: "rgba(223,238,255,0.9)",
                        }}
                      >
                        {division.exhibitCount} מוצגים &nbsp; · &nbsp; {division.subDivisionCount} תתי-יחידות &nbsp; ·
                        &nbsp; <span style={{ color: "#86F59B", fontWeight: 900 }}>{division.readiness}%</span>
                      </div>

                      <div
                        style={{
                          fontSize: "24px",
                          lineHeight: 1.55,
                          color: "rgba(223,238,255,0.86)",
                          marginBottom: "16px",
                        }}
                      >
                        {division.descriptionHe}
                      </div>

                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          minWidth: "220px",
                          borderRadius: "14px",
                          padding: "12px 18px",
                          background: "rgba(9,24,46,0.86)",
                          border: "1px solid rgba(95,168,255,0.18)",
                          fontSize: "22px",
                          fontWeight: 800,
                        }}
                      >
                        פתח חטיבה →
                      </div>
                    </button>
                  )
                })}
              </div>
            </section>

            <section
              style={{
                borderRadius: "24px",
                border: "1px solid rgba(95,168,255,0.16)",
                background:
                  "linear-gradient(180deg, rgba(10,25,46,0.90) 0%, rgba(7,18,34,0.94) 100%)",
                padding: "16px",
              }}
            >
              <div
                style={{
                  fontSize: "30px",
                  fontWeight: 900,
                  marginBottom: "6px",
                }}
              >
                SELECTED DIVISION / DRILLDOWN PANEL
              </div>

              <div
                style={{
                  fontSize: "18px",
                  color: "rgba(223,238,255,0.76)",
                  marginBottom: "14px",
                }}
              >
                If selected, show sub-divisions and preview systems
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  flexWrap: "wrap",
                  marginBottom: "16px",
                }}
              >
                {activeDivision?.subDivisions.map((sub) => (
                  <span
                    key={sub}
                    style={{
                      padding: "12px 20px",
                      borderRadius: "14px",
                      border: "1px solid rgba(95,168,255,0.16)",
                      background:
                        "linear-gradient(180deg, rgba(18,47,87,0.98) 0%, rgba(11,26,50,0.98) 100%)",
                      fontSize: "18px",
                      fontWeight: 700,
                    }}
                  >
                    {sub}
                  </span>
                ))}
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: "12px",
                }}
              >
                {visiblePreviewSystems.map((item) => (
                  <Link
                    key={`${item.code}-${item.name}`}
                    href={`/global-exhibit-bank/exhibit-system?divisionId=${item.divisionId}&subDivision=${encodeURIComponent(item.subDivision)}&system=${encodeURIComponent(item.name)}`}
                    style={{
                      textDecoration: "none",
                      color: "#EAF4FF",
                      borderRadius: "18px",
                      border: "1px solid rgba(95,168,255,0.16)",
                      background:
                        "linear-gradient(180deg, rgba(9,22,42,0.94) 0%, rgba(7,16,30,0.96) 100%)",
                      padding: "12px",
                      minHeight: "180px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        height: "76px",
                        borderRadius: "14px",
                        border: "1px solid rgba(95,168,255,0.12)",
                        background:
                          "radial-gradient(circle at center, rgba(73,166,255,0.18) 0%, rgba(7,16,30,0.96) 70%)",
                        display: "grid",
                        placeItems: "center",
                        fontSize: "38px",
                        marginBottom: "12px",
                      }}
                    >
                      {item.visual}
                    </div>

                    <div
                      style={{
                        fontSize: "22px",
                        lineHeight: 1.15,
                        fontWeight: 800,
                        marginBottom: "10px",
                      }}
                    >
                      {item.name}
                    </div>

                    <div
                      style={{
                        fontSize: "14px",
                        color: "rgba(162,206,255,0.78)",
                        marginBottom: "6px",
                      }}
                    >
                      ● {item.code}
                    </div>

                    <div
                      style={{
                        fontSize: "14px",
                        color: "rgba(162,206,255,0.78)",
                      }}
                    >
                      {item.subDivision}
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            <section
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                gap: "14px",
              }}
            >
              <Link
                href="/global-exhibit-bank"
                style={{
                  textDecoration: "none",
                  color: "#EAF4FF",
                  borderRadius: "20px",
                  border: "1px solid rgba(95,168,255,0.16)",
                  background:
                    "linear-gradient(180deg, rgba(11,28,52,0.95) 0%, rgba(7,18,34,0.96) 100%)",
                  padding: "20px",
                  fontSize: "18px",
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "72px",
                }}
              >
                👁 View All Exhibits
              </Link>

              <Link
                href={activeDivision ? `/global-exhibit-bank/division?divisionId=${activeDivision.id}` : "/global-exhibit-bank"}
                style={{
                  textDecoration: "none",
                  color: "#EAF4FF",
                  borderRadius: "20px",
                  border: "1px solid rgba(95,168,255,0.16)",
                  background:
                    "linear-gradient(180deg, rgba(11,28,52,0.95) 0%, rgba(7,18,34,0.96) 100%)",
                  padding: "20px",
                  fontSize: "18px",
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "72px",
                }}
              >
                📁 Open Selected Division
              </Link>

              <Link
                href="/global-exhibit-bank"
                style={{
                  textDecoration: "none",
                  color: "#EAF4FF",
                  borderRadius: "20px",
                  border: "1px solid rgba(95,168,255,0.16)",
                  background:
                    "linear-gradient(180deg, rgba(28,22,70,0.95) 0%, rgba(13,18,47,0.96) 100%)",
                  padding: "20px",
                  fontSize: "18px",
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "72px",
                }}
              >
                ⭳ Export Summary
              </Link>

              <Link
                href="/tents-layout"
                style={{
                  textDecoration: "none",
                  color: "#EAF4FF",
                  borderRadius: "20px",
                  border: "1px solid rgba(95,168,255,0.16)",
                  background:
                    "linear-gradient(180deg, rgba(11,28,52,0.95) 0%, rgba(7,18,34,0.96) 100%)",
                  padding: "20px",
                  fontSize: "18px",
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "72px",
                }}
              >
                ◫ Go to Layouts
              </Link>
            </section>
          </section>
        </div>
      </div>
    </main>
  )
}
