"use client"

import Link from "next/link"
import { useMemo, useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { exhibitDivisions } from "../../../data/globalExhibitBank"
import { masterExhibits } from "../../../data/masterExhibits"

const OVERRIDE_KEY = "division-overrides"
const EDITABLE_DIVISIONS = ["mtach", "elta", "kataz", "aviatsia"]

const DIVISION_LABELS: Record<string, string> = {
  mtach: "MATAH",
  elta: "ELTA",
  kataz: "MALAM",
  aviatsia: "TEUFA",
}

// Maps dashboard divisionId → masterExhibits division key
const DIVISION_MAP: Record<string, string> = {
  "missiles-space-defense": "mtach",
  "aviation": "aviatsia",
  "elta": "elta",
  "uav": "mtach",
  "mtach": "mtach",
  "aviatsia": "aviatsia",
  "kataz": "kataz",
  "air": "air",
  "land": "land",
  "naval": "naval",
  "space": "space",
}

const MTACH_TABS: { label: string; value: string }[] = [
  { label: "הכל",  value: "" },
  { label: "חלל",  value: "halal" },
  { label: "טילים", value: "tilim" },
  { label: "גילוי", value: "giluy" },
  { label: "מלם",  value: "malam" },
]

export default function DivisionPage() {
  const searchParams = useSearchParams()
  const rawDivisionId = searchParams.get("divisionId") ?? ""
  const divisionId = decodeURIComponent(rawDivisionId).trim().toLowerCase()

  const division = useMemo(
    () => exhibitDivisions.find((item) => item.id.trim().toLowerCase() === divisionId) ?? null,
    [divisionId]
  )

  const masterDivision = DIVISION_MAP[divisionId] ?? divisionId

  const [overrides, setOverrides] = useState<Record<string, string>>({})
  const [showEditModal, setShowEditModal] = useState(false)
  const [localOverrides, setLocalOverrides] = useState<Record<string, string>>({})

  useEffect(() => {
    try {
      const stored = localStorage.getItem(OVERRIDE_KEY)
      if (stored) setOverrides(JSON.parse(stored))
    } catch {}
  }, [])

  const allExhibits = useMemo(
    () => masterExhibits.filter((e) => (overrides[e.slug] ?? e.division) === masterDivision),
    [masterDivision, overrides]
  )

  const nonInventoryExhibits = useMemo(
    () => masterExhibits.filter((e) => e.division !== "inventory"),
    []
  )

  function openModal() {
    setLocalOverrides({ ...overrides })
    setShowEditModal(true)
  }

  function saveModal() {
    try {
      localStorage.setItem(OVERRIDE_KEY, JSON.stringify(localOverrides))
    } catch {}
    setOverrides(localOverrides)
    setShowEditModal(false)
  }

  const [search, setSearch] = useState("")
  const [activeSub, setActiveSub] = useState<string | null>(null)

  const filtered = useMemo(() => {
    let result = activeSub
      ? allExhibits.filter((e) => e.subdivision === activeSub)
      : allExhibits
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (e) =>
          e.nameEn.toLowerCase().includes(q) ||
          e.nameHe.includes(q) ||
          e.slug.includes(q)
      )
    }
    return result
  }, [allExhibits, search, activeSub])

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
      >
        <div
          style={{
            maxWidth: "760px",
            width: "100%",
            borderRadius: "28px",
            padding: "28px",
            border: "1px solid rgba(95, 168, 255, 0.18)",
            background:
              "linear-gradient(180deg, rgba(10,24,46,0.84) 0%, rgba(7,16,32,0.92) 100%)",
            boxShadow: "0 24px 70px rgba(0,0,0,0.30), inset 0 0 0 1px rgba(130,196,255,0.05)",
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
            href="/dashboard"
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
    { label: "Total exhibits", value: allExhibits.length },
    { label: "Showing", value: filtered.length },
    { label: "Division", value: masterDivision.toUpperCase() },
    { label: "Sub-divisions", value: division.subDivisionCount },
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
      <div style={{ maxWidth: "1680px", margin: "0 auto", padding: "32px 24px 56px" }}>

        {/* Hero */}
        <section
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
          <header
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: "18px",
              flexWrap: "wrap",
            }}
          >
            <div style={{ maxWidth: "920px" }}>
              <div
                style={{
                  fontSize: "12px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(153, 198, 255, 0.70)",
                  marginBottom: "10px",
                }}
              >
                Division bank / master exhibits
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

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "flex-start" }}>
              <button
                onClick={openModal}
                style={{
                  padding: "12px 16px",
                  borderRadius: "14px",
                  border: "1px solid rgba(95, 168, 255, 0.30)",
                  background: "rgba(18,47,87,0.72)",
                  color: "#8AD8FF",
                  fontWeight: 700,
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                ✏️ ערוך חטיבה
              </button>
              <Link
                href="/dashboard"
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
            </div>
          </header>

          {/* Stats */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
              gap: "14px",
              marginTop: "24px",
            }}
          >
            {stats.map((item) => (
              <div
                key={item.label}
                style={{
                  borderRadius: "18px",
                  padding: "16px 18px",
                  border: "1px solid rgba(95, 168, 255, 0.18)",
                  background:
                    "linear-gradient(180deg, rgba(12,30,56,0.92) 0%, rgba(10,20,40,0.80) 100%)",
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
                <div style={{ fontSize: "30px", lineHeight: 1, fontWeight: 900 }}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sub-division tabs — mtach only */}
        {masterDivision === "mtach" && (
          <section style={{ marginBottom: "18px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {MTACH_TABS.map((tab) => {
              const active = (activeSub ?? "") === tab.value
              return (
                <button
                  key={tab.value}
                  onClick={() => setActiveSub(tab.value || null)}
                  style={{
                    padding: "12px 20px",
                    borderRadius: "999px",
                    border: active
                      ? "1px solid rgba(111, 200, 255, 0.62)"
                      : "1px solid rgba(95, 168, 255, 0.18)",
                    background: active
                      ? "linear-gradient(180deg, rgba(18,47,87,0.96) 0%, rgba(12,28,52,0.96) 100%)"
                      : "rgba(9,20,40,0.72)",
                    color: active ? "#8AD8FF" : "#EAF4FF",
                    fontWeight: 800,
                    fontSize: "14px",
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                >
                  {tab.label}
                </button>
              )
            })}
          </section>
        )}

        {/* Search bar */}
        <section style={{ marginBottom: "18px" }}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search exhibits…"
            style={{
              width: "100%",
              borderRadius: "16px",
              border: "1px solid rgba(95, 168, 255, 0.18)",
              background: "rgba(9,20,40,0.72)",
              color: "#EAF4FF",
              padding: "15px 20px",
              fontSize: "15px",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </section>

        {/* Cards */}
        {filtered.length === 0 ? (
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
              No results
            </div>
            <div style={{ fontSize: "28px", fontWeight: 900 }}>
              No exhibits found
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
            {filtered.map((exhibit, index) => (
              <div
                key={exhibit.slug}
                style={{
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: "28px",
                  padding: "22px",
                  border: "1px solid rgba(95, 168, 255, 0.18)",
                  background:
                    "radial-gradient(circle at top right, rgba(65,142,255,0.16), transparent 24%), linear-gradient(180deg, rgba(10,24,46,0.90) 0%, rgba(7,16,32,0.94) 100%)",
                  boxShadow:
                    "0 24px 70px rgba(0,0,0,0.24), inset 0 0 0 1px rgba(130,196,255,0.04)",
                  minHeight: "270px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Top highlight bar */}
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

                {/* Image */}
                {exhibit.image && (
                  <div
                    style={{
                      borderRadius: "18px",
                      overflow: "hidden",
                      marginBottom: "16px",
                      background: "rgba(5,15,35,0.6)",
                      height: "180px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={exhibit.image}
                      alt={exhibit.nameEn}
                      style={{
                        maxHeight: "100%",
                        maxWidth: "100%",
                        objectFit: "contain",
                        padding: "12px",
                      }}
                    />
                  </div>
                )}

                {/* Badge row */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "10px",
                    alignItems: "flex-start",
                    marginBottom: "12px",
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
                    {masterDivision.toUpperCase()}
                  </span>
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
                    #{String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* System number label */}
                <div
                  style={{
                    fontSize: "13px",
                    textTransform: "uppercase",
                    letterSpacing: "0.16em",
                    color: "rgba(153, 198, 255, 0.58)",
                    marginBottom: "6px",
                  }}
                >
                  {exhibit.nameHe}
                </div>

                {/* Name */}
                <div
                  style={{
                    fontSize: "26px",
                    fontWeight: 900,
                    lineHeight: 1.06,
                    marginBottom: "8px",
                  }}
                >
                  {exhibit.nameEn}
                </div>

                {/* Open System link */}
                <div style={{ marginTop: "auto", paddingTop: "16px" }}>
                  <Link
                    href={`/${masterDivision}/${exhibit.slug}`}
                    style={{
                      display: "block",
                      textAlign: "center",
                      padding: "11px 16px",
                      borderRadius: "14px",
                      background: "linear-gradient(180deg, #8AD8FF 0%, #5FC1FF 100%)",
                      color: "#04111E",
                      fontWeight: 900,
                      fontSize: "13px",
                      textDecoration: "none",
                      boxShadow: "0 12px 24px rgba(95,193,255,0.24)",
                    }}
                  >
                    Open System
                  </Link>
                </div>
              </div>
            ))}
          </section>
        )}
      </div>

      {/* Edit Division Modal */}
      {showEditModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "rgba(2,6,20,0.82)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
          }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowEditModal(false) }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "760px",
              maxHeight: "80vh",
              borderRadius: "28px",
              border: "1px solid rgba(95,168,255,0.22)",
              background: "linear-gradient(180deg, #091428 0%, #060e1e 100%)",
              boxShadow: "0 40px 100px rgba(0,0,0,0.6)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {/* Modal header */}
            <div
              style={{
                padding: "22px 26px 18px",
                borderBottom: "1px solid rgba(95,168,255,0.14)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div style={{ fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(153,198,255,0.6)", marginBottom: "6px" }}>
                  Division Assignment
                </div>
                <h2 style={{ margin: 0, fontSize: "22px", fontWeight: 900, color: "#EAF4FF" }}>
                  ✏️ ערוך חטיבה
                </h2>
              </div>
              <button
                onClick={() => setShowEditModal(false)}
                style={{
                  width: 36, height: 36, borderRadius: "50%",
                  border: "1px solid rgba(95,168,255,0.20)",
                  background: "rgba(9,20,40,0.72)",
                  color: "#EAF4FF",
                  fontSize: "18px",
                  cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                ×
              </button>
            </div>

            {/* Table */}
            <div style={{ overflowY: "auto", flex: 1 }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ position: "sticky", top: 0, background: "#091428", zIndex: 1 }}>
                    <th style={{ padding: "12px 24px", textAlign: "left", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(153,198,255,0.6)", borderBottom: "1px solid rgba(95,168,255,0.12)", fontWeight: 800 }}>
                      Exhibit
                    </th>
                    <th style={{ padding: "12px 24px", textAlign: "left", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(153,198,255,0.6)", borderBottom: "1px solid rgba(95,168,255,0.12)", fontWeight: 800, width: "180px" }}>
                      Division
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {nonInventoryExhibits.map((exhibit) => {
                    const current = localOverrides[exhibit.slug] ?? exhibit.division
                    return (
                      <tr
                        key={exhibit.slug}
                        style={{ borderBottom: "1px solid rgba(95,168,255,0.07)" }}
                      >
                        <td style={{ padding: "12px 24px" }}>
                          <div style={{ fontSize: "15px", fontWeight: 700, color: "#EAF4FF" }}>{exhibit.nameHe}</div>
                          <div style={{ fontSize: "12px", color: "rgba(153,198,255,0.62)", marginTop: "2px" }}>{exhibit.nameEn}</div>
                        </td>
                        <td style={{ padding: "12px 24px" }}>
                          <select
                            value={current}
                            onChange={(e) => setLocalOverrides((prev) => ({ ...prev, [exhibit.slug]: e.target.value }))}
                            style={{
                              width: "100%",
                              padding: "8px 12px",
                              borderRadius: "10px",
                              border: "1px solid rgba(95,168,255,0.22)",
                              background: "rgba(9,20,40,0.82)",
                              color: "#EAF4FF",
                              fontSize: "13px",
                              fontWeight: 700,
                              cursor: "pointer",
                              outline: "none",
                            }}
                          >
                            {EDITABLE_DIVISIONS.map((div) => (
                              <option key={div} value={div}>{div}</option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Modal footer */}
            <div
              style={{
                padding: "18px 26px",
                borderTop: "1px solid rgba(95,168,255,0.14)",
                display: "flex",
                justifyContent: "flex-end",
                gap: "12px",
              }}
            >
              <button
                onClick={() => setShowEditModal(false)}
                style={{
                  padding: "11px 22px",
                  borderRadius: "12px",
                  border: "1px solid rgba(95,168,255,0.18)",
                  background: "rgba(9,20,40,0.72)",
                  color: "#EAF4FF",
                  fontWeight: 700,
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                ביטול
              </button>
              <button
                onClick={saveModal}
                style={{
                  padding: "11px 22px",
                  borderRadius: "12px",
                  border: "none",
                  background: "linear-gradient(180deg, #8AD8FF 0%, #5FC1FF 100%)",
                  color: "#04111E",
                  fontWeight: 900,
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                שמור
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
