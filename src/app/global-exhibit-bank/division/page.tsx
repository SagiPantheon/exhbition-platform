"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { exhibitDivisions } from "../../../data/globalExhibitBank"
import { masterExhibits } from "../../../data/masterExhibits"

// Maps dashboard divisionId → masterExhibits division key
const DIVISION_MAP: Record<string, string> = {
  "missiles-space-defense": "space",
  "aviation": "air",
  "elta": "land",
  "uav": "air",
  "air": "air",
  "land": "land",
  "naval": "naval",
  "space": "space",
}

export default function DivisionPage() {
  const searchParams = useSearchParams()
  const rawDivisionId = searchParams.get("divisionId") ?? ""
  const divisionId = decodeURIComponent(rawDivisionId).trim().toLowerCase()

  const division = useMemo(
    () => exhibitDivisions.find((item) => item.id.trim().toLowerCase() === divisionId) ?? null,
    [divisionId]
  )

  const masterDivision = DIVISION_MAP[divisionId] ?? divisionId

  const allExhibits = useMemo(
    () => masterExhibits.filter((e) => e.division === masterDivision),
    [masterDivision]
  )

  const [search, setSearch] = useState("")

  const filtered = useMemo(() => {
    if (!search.trim()) return allExhibits
    const q = search.toLowerCase()
    return allExhibits.filter(
      (e) =>
        e.nameEn.toLowerCase().includes(q) ||
        e.nameHe.includes(q) ||
        e.slug.includes(q)
    )
  }, [allExhibits, search])

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
    </main>
  )
}
