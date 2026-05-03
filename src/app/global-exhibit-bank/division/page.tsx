"use client"

import Link from "next/link"
import { useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { exhibitDivisions } from "../../../data/globalExhibitBank"

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

  if (!division) {
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
            maxWidth: "680px",
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

          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
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

            <Link
              href="/global-exhibit-bank/division?divisionId=elta"
              style={{
                padding: "11px 14px",
                borderRadius: "14px",
                textDecoration: "none",
                color: "#DCEEFF",
                border: "1px solid rgba(95, 168, 255, 0.18)",
                background: "rgba(9,20,40,0.72)",
              }}
            >
              Open ELTA
            </Link>

            <Link
              href="/global-exhibit-bank/division?divisionId=uav"
              style={{
                padding: "11px 14px",
                borderRadius: "14px",
                textDecoration: "none",
                color: "#DCEEFF",
                border: "1px solid rgba(95, 168, 255, 0.18)",
                background: "rgba(9,20,40,0.72)",
              }}
            >
              Open UAV
            </Link>
          </div>
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
        <div
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
              Division command view
            </div>

            <h1
              style={{
                margin: 0,
                fontSize: "clamp(30px, 4vw, 52px)",
                lineHeight: 1,
                fontWeight: 900,
              }}
            >
              {division.titleHe}
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
              {division.titleEn}
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

            <Link
              href="/"
              style={{
                padding: "11px 14px",
                borderRadius: "14px",
                textDecoration: "none",
                color: "#DCEEFF",
                border: "1px solid rgba(95, 168, 255, 0.18)",
                background: "rgba(9,20,40,0.72)",
              }}
            >
              Hub
            </Link>
          </div>
        </div>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1.15fr 0.85fr",
            gap: "20px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              borderRadius: "28px",
              padding: "24px",
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
              Division overview
            </div>

            <div
              style={{
                fontSize: "16px",
                lineHeight: 1.8,
                color: "rgba(224, 239, 255, 0.88)",
                marginBottom: "18px",
              }}
            >
              {division.descriptionHe}
            </div>

            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
                marginBottom: "20px",
              }}
            >
              {[
                `${division.exhibitCount} מוצגים`,
                `${division.subDivisionCount} תתי־יחידות`,
                `${division.readiness}% מוכנות`,
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

            <div
              style={{
                borderRadius: "22px",
                padding: "20px",
                border: "1px solid rgba(95, 168, 255, 0.16)",
                background: "rgba(8,18,34,0.56)",
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
                Sub-divisions
              </div>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                {division.subDivisions.map((item) => (
                  <Link
                    key={item}
                    href={`/global-exhibit-bank/sub-division?divisionId=${division.id}&subDivision=${encodeURIComponent(item)}`}
                    style={{
                      padding: "12px 14px",
                      borderRadius: "14px",
                      border: "1px solid rgba(95, 168, 255, 0.20)",
                      background: "rgba(14,31,58,0.72)",
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "#E7F3FF",
                      textDecoration: "none",
                    }}
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div
            style={{
              borderRadius: "28px",
              padding: "24px",
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
              Preview systems
            </div>

            <div
              style={{
                display: "grid",
                gap: "10px",
              }}
            >
              {division.previewSystems.map((system) => (
                <div
                  key={system}
                  style={{
                    padding: "16px",
                    borderRadius: "16px",
                    border: "1px solid rgba(95, 168, 255, 0.18)",
                    background:
                      "linear-gradient(180deg, rgba(15,35,66,0.86) 0%, rgba(11,24,44,0.90) 100%)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: 800,
                      marginBottom: "6px",
                    }}
                  >
                    {system}
                  </div>

                  <div
                    style={{
                      fontSize: "13px",
                      color: "rgba(171, 211, 255, 0.72)",
                    }}
                  >
                    Future exhibit system entry point
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
