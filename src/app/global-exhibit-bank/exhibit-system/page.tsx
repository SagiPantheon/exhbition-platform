"use client"

import Link from "next/link"
import { useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { exhibitDivisions } from "../../../data/globalExhibitBank"

export default function ExhibitSystemPage() {
  const searchParams = useSearchParams()

  const rawDivisionId = searchParams.get("divisionId") ?? ""
  const rawSubDivision = searchParams.get("subDivision") ?? ""
  const rawSystem = searchParams.get("system") ?? ""

  const divisionId = decodeURIComponent(rawDivisionId).trim().toLowerCase()
  const subDivisionName = decodeURIComponent(rawSubDivision).trim()
  const systemName = decodeURIComponent(rawSystem).trim()

  const division = useMemo(
    () =>
      exhibitDivisions.find(
        (item) => item.id.trim().toLowerCase() === divisionId
      ) ?? null,
    [divisionId]
  )

  const subDivisionExists = !!division?.subDivisions.some(
    (item) => item.trim() === subDivisionName
  )

  if (!division || !subDivisionExists || !systemName) {
    return (
      <main
        style={{
          minHeight: "100vh",
          color: "#EAF4FF",
          background:
            "radial-gradient(circle at top, rgba(24,77,255,0.18), transparent 30%), linear-gradient(180deg, #07111f 0%, #08182c 45%, #050b14 100%)",
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
              "linear-gradient(180deg, rgba(10,24,46,0.82) 0%, rgba(7,16,32,0.88) 100%)",
            boxShadow:
              "0 24px 70px rgba(0,0,0,0.30), inset 0 0 0 1px rgba(130,196,255,0.04)",
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
            Exhibit system not found
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
            No matching exhibit system for this route
          </h1>

          <div
            style={{
              fontSize: "15px",
              lineHeight: 1.7,
              color: "rgba(224, 239, 255, 0.82)",
              marginBottom: "20px",
            }}
          >
            divisionId: <strong>{rawDivisionId || "(empty)"}</strong>
            <br />
            subDivision: <strong>{rawSubDivision || "(empty)"}</strong>
            <br />
            system: <strong>{rawSystem || "(empty)"}</strong>
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

  return (
    <main
      style={{
        minHeight: "100vh",
        color: "#EAF4FF",
        background:
          "radial-gradient(circle at top, rgba(24,77,255,0.18), transparent 30%), linear-gradient(180deg, #07111f 0%, #08182c 45%, #050b14 100%)",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "32px 24px 48px",
        }}
      >
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px",
            flexWrap: "wrap",
            marginBottom: "24px",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "12px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(153, 198, 255, 0.68)",
                marginBottom: "10px",
              }}
            >
              Exhibit system view
            </div>

            <h1
              style={{
                margin: 0,
                fontSize: "clamp(30px, 4vw, 54px)",
                lineHeight: 1,
                fontWeight: 900,
              }}
            >
              {systemName}
            </h1>

            <div
              style={{
                marginTop: "10px",
                fontSize: "13px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "rgba(132, 193, 255, 0.70)",
              }}
            >
              {division.titleHe} · {subDivisionName} · {division.titleEn}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            <Link
              href={`/global-exhibit-bank/sub-division?divisionId=${division.id}&subDivision=${encodeURIComponent(subDivisionName)}`}
              style={{
                padding: "11px 14px",
                borderRadius: "14px",
                textDecoration: "none",
                color: "#DCEEFF",
                border: "1px solid rgba(95, 168, 255, 0.18)",
                background: "rgba(9,20,40,0.72)",
              }}
            >
              ← Sub-division
            </Link>

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
              Global Exhibit Bank
            </Link>
          </div>
        </header>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: "20px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              borderRadius: "30px",
              padding: "26px",
              border: "1px solid rgba(95, 168, 255, 0.18)",
              background:
                "linear-gradient(180deg, rgba(10,24,46,0.86) 0%, rgba(7,16,32,0.92) 100%)",
              boxShadow:
                "0 24px 70px rgba(0,0,0,0.30), inset 0 0 0 1px rgba(130,196,255,0.04)",
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
              System overview
            </div>

            <div
              style={{
                fontSize: "17px",
                lineHeight: 1.85,
                color: "rgba(224, 239, 255, 0.86)",
                marginBottom: "22px",
              }}
            >
              This is the first exhibit-system bridge layer. In the next phase, this screen will
              become the reusable template for real exhibit systems, including dimensions, display
              method, 3D availability, logistics, readiness, and layout compatibility.
            </div>

            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
              {[
                `Division: ${division.titleHe}`,
                `Sub-division: ${subDivisionName}`,
                `Readiness context: ${division.readiness}%`,
                "Template status: V1 bridge",
              ].map((chip) => (
                <span
                  key={chip}
                  style={{
                    padding: "9px 12px",
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
          </div>

          <div
            style={{
              borderRadius: "30px",
              padding: "26px",
              border: "1px solid rgba(95, 168, 255, 0.18)",
              background:
                "linear-gradient(180deg, rgba(10,24,46,0.86) 0%, rgba(7,16,32,0.92) 100%)",
              boxShadow:
                "0 24px 70px rgba(0,0,0,0.30), inset 0 0 0 1px rgba(130,196,255,0.04)",
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
              Future system template
            </div>

            <div
              style={{
                display: "grid",
                gap: "10px",
              }}
            >
              {[
                "Hero image / 3D viewer",
                "Dimensions and logistics",
                "Display configuration",
                "Approvals and readiness",
                "Layout compatibility",
              ].map((item) => (
                <div
                  key={item}
                  style={{
                    padding: "14px 16px",
                    borderRadius: "16px",
                    border: "1px solid rgba(95, 168, 255, 0.18)",
                    background:
                      "linear-gradient(180deg, rgba(15,35,66,0.86) 0%, rgba(11,24,44,0.90) 100%)",
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "rgba(234,244,255,0.92)",
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          style={{
            borderRadius: "30px",
            padding: "26px",
            border: "1px solid rgba(95, 168, 255, 0.18)",
            background:
              "linear-gradient(180deg, rgba(10,24,46,0.86) 0%, rgba(7,16,32,0.92) 100%)",
            boxShadow:
              "0 24px 70px rgba(0,0,0,0.30), inset 0 0 0 1px rgba(130,196,255,0.04)",
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
            Product direction
          </div>

          <div
            style={{
              fontSize: "16px",
              lineHeight: 1.8,
              color: "rgba(224, 239, 255, 0.84)",
            }}
          >
            This layer connects the company structure to real exhibition assets. The next mature
            step is to turn this bridge into a reusable exhibit-system template that can later host
            40–50 systems without creating isolated manual pages.
          </div>
        </section>
      </div>
    </main>
  )
}
