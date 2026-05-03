"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { exhibitBankSummary, exhibitDivisions } from "../../data/globalExhibitBank"

export default function GlobalExhibitBankPage() {
  const router = useRouter()
  const [activeDivisionId, setActiveDivisionId] = useState(exhibitDivisions[0]?.id ?? "")

  const activeDivision = useMemo(
    () =>
      exhibitDivisions.find((division) => division.id === activeDivisionId) ??
      exhibitDivisions[0],
    [activeDivisionId]
  )

  return (
    <main
      style={{
        minHeight: "100vh",
        color: "#EAF4FF",
        background:
          "radial-gradient(circle at top, rgba(24,77,255,0.20), transparent 32%), linear-gradient(180deg, #07111f 0%, #08182c 45%, #050b14 100%)",
      }}
    >
      <div
        style={{
          maxWidth: "1500px",
          margin: "0 auto",
          padding: "32px 24px 40px",
        }}
      >
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "20px",
            flexWrap: "wrap",
            marginBottom: "28px",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "12px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(154, 196, 255, 0.72)",
                marginBottom: "10px",
              }}
            >
              Strategic command layer
            </div>

            <h1
              style={{
                margin: 0,
                fontSize: "clamp(32px, 4vw, 56px)",
                lineHeight: 1,
                fontWeight: 900,
              }}
            >
              Global Exhibit Bank
            </h1>

            <p
              style={{
                margin: "14px 0 0",
                maxWidth: "760px",
                fontSize: "16px",
                lineHeight: 1.7,
                color: "rgba(214, 233, 255, 0.82)",
              }}
            >
              Command view of company exhibit structure, readiness, and system hierarchy.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            {[
              { label: "Divisions", value: exhibitBankSummary.totalDivisions },
              { label: "Exhibits", value: exhibitBankSummary.totalExhibits },
              { label: "Avg. readiness", value: `${exhibitBankSummary.averageReadiness}%` },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  minWidth: "140px",
                  padding: "14px 16px",
                  borderRadius: "18px",
                  border: "1px solid rgba(95, 168, 255, 0.24)",
                  background: "rgba(9, 20, 40, 0.72)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.22)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div
                  style={{
                    fontSize: "12px",
                    color: "rgba(153, 198, 255, 0.72)",
                    marginBottom: "8px",
                  }}
                >
                  {item.label}
                </div>
                <div
                  style={{
                    fontSize: "26px",
                    fontWeight: 800,
                    lineHeight: 1,
                  }}
                >
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </header>

        <section
          style={{
            position: "relative",
            borderRadius: "30px",
            padding: "28px",
            border: "1px solid rgba(93, 167, 255, 0.18)",
            background:
              "linear-gradient(180deg, rgba(10,24,46,0.82) 0%, rgba(7,16,32,0.88) 100%)",
            boxShadow:
              "0 24px 70px rgba(0,0,0,0.30), inset 0 0 0 1px rgba(130,196,255,0.04)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background:
                "radial-gradient(circle at center, rgba(36,142,255,0.12), transparent 24%), linear-gradient(90deg, transparent 49.5%, rgba(86,157,255,0.10) 50%, transparent 50.5%)",
            }}
          />

          <div
            style={{
              position: "relative",
              display: "grid",
              gridTemplateColumns: "1fr minmax(280px, 380px) 1fr",
              gap: "20px",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "grid",
                gap: "18px",
              }}
            >
              {exhibitDivisions.slice(0, 2).map((division) => {
                const active = division.id === activeDivision?.id
                return (
                  <button
                    key={division.id}
                    onClick={() => setActiveDivisionId(division.id)}
                    onDoubleClick={() => router.push(`/global-exhibit-bank/division?divisionId=${division.id}`)}
                    onDoubleClick={() => router.push(`/global-exhibit-bank/division?divisionId=${division.id}`)}
                    style={{
                      textAlign: "right",
                      padding: "18px 18px 16px",
                      borderRadius: "22px",
                      border: active
                        ? "1px solid rgba(111, 200, 255, 0.65)"
                        : "1px solid rgba(95, 168, 255, 0.18)",
                      background: active
                        ? "linear-gradient(180deg, rgba(17,41,76,0.96) 0%, rgba(12,28,52,0.96) 100%)"
                        : "rgba(8,18,34,0.82)",
                      boxShadow: active
                        ? "0 0 0 1px rgba(111,200,255,0.08), 0 0 34px rgba(53,145,255,0.22)"
                        : "0 12px 28px rgba(0,0,0,0.18)",
                      color: "#EAF4FF",
                      cursor: "pointer",
                    }}
                  >
                    <div style={{ fontSize: "28px", fontWeight: 800, marginBottom: "6px" }}>
                      {division.titleHe}
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "rgba(132, 193, 255, 0.68)",
                        marginBottom: "10px",
                      }}
                    >
                      {division.titleEn}
                    </div>
                    <div
                      style={{
                        fontSize: "14px",
                        color: "rgba(171, 211, 255, 0.82)",
                        marginBottom: "10px",
                      }}
                    >
                      {division.subDivisions.join(" · ")}
                    </div>
                    <div
                      style={{
                        fontSize: "13px",
                        color: "rgba(140, 190, 255, 0.74)",
                        marginBottom: "10px",
                      }}
                    >
                      {division.exhibitCount} מוצגים · {division.subDivisionCount} תתי־יחידות ·{" "}
                      {division.readiness}% מוכנות
                    </div>
                    <div
                      style={{
                        fontSize: "14px",
                        lineHeight: 1.6,
                        color: "rgba(224, 239, 255, 0.88)",
                        marginBottom: "12px",
                      }}
                    >
                      {division.descriptionHe}
                    </div>

                    <div
                      style={{
                        fontSize: "11px",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        color: "rgba(132, 193, 255, 0.58)",
                      }}
                    >
                      Click to inspect · Double-click to open
                    </div>
                  </button>
                )
              })}
            </div>

            <div
              style={{
                minHeight: "440px",
                borderRadius: "28px",
                padding: "22px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                border: "1px solid rgba(100, 181, 255, 0.28)",
                background:
                  "radial-gradient(circle at center, rgba(36,126,255,0.18) 0%, rgba(10,24,48,0.90) 40%, rgba(7,16,30,0.98) 100%)",
                boxShadow:
                  "0 0 0 1px rgba(95, 188, 255, 0.06), 0 0 60px rgba(43, 125, 255, 0.16), inset 0 0 60px rgba(69, 149, 255, 0.12)",
              }}
            >
              <div
                style={{
                  width: "170px",
                  height: "170px",
                  borderRadius: "999px",
                  display: "grid",
                  placeItems: "center",
                  marginBottom: "20px",
                  border: "1px solid rgba(111, 200, 255, 0.36)",
                  background:
                    "radial-gradient(circle at center, rgba(91,191,255,0.30) 0%, rgba(26,79,157,0.18) 42%, rgba(9,19,37,0.92) 72%)",
                  boxShadow: "0 0 42px rgba(52, 146, 255, 0.28)",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "13px",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "rgba(158, 207, 255, 0.74)",
                      marginBottom: "8px",
                    }}
                  >
                    Core
                  </div>
                  <div
                    style={{
                      fontSize: "28px",
                      fontWeight: 900,
                      lineHeight: 1.1,
                    }}
                  >
                    Global
                    <br />
                    Exhibit Core
                  </div>
                </div>
              </div>

              <p
                style={{
                  margin: 0,
                  maxWidth: "280px",
                  fontSize: "14px",
                  lineHeight: 1.7,
                  color: "rgba(216, 235, 255, 0.82)",
                }}
              >
                Unified command layer for all exhibit systems, divisions, and readiness overview.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gap: "18px",
              }}
            >
              {exhibitDivisions.slice(2).map((division) => {
                const active = division.id === activeDivision?.id
                return (
                  <button
                    key={division.id}
                    onClick={() => setActiveDivisionId(division.id)}
                    style={{
                      textAlign: "right",
                      padding: "18px 18px 16px",
                      borderRadius: "22px",
                      border: active
                        ? "1px solid rgba(111, 200, 255, 0.65)"
                        : "1px solid rgba(95, 168, 255, 0.18)",
                      background: active
                        ? "linear-gradient(180deg, rgba(17,41,76,0.96) 0%, rgba(12,28,52,0.96) 100%)"
                        : "rgba(8,18,34,0.82)",
                      boxShadow: active
                        ? "0 0 0 1px rgba(111,200,255,0.08), 0 0 34px rgba(53,145,255,0.22)"
                        : "0 12px 28px rgba(0,0,0,0.18)",
                      color: "#EAF4FF",
                      cursor: "pointer",
                    }}
                  >
                    <div style={{ fontSize: "28px", fontWeight: 800, marginBottom: "6px" }}>
                      {division.titleHe}
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "rgba(132, 193, 255, 0.68)",
                        marginBottom: "10px",
                      }}
                    >
                      {division.titleEn}
                    </div>
                    <div
                      style={{
                        fontSize: "14px",
                        color: "rgba(171, 211, 255, 0.82)",
                        marginBottom: "10px",
                      }}
                    >
                      {division.subDivisions.join(" · ")}
                    </div>
                    <div
                      style={{
                        fontSize: "13px",
                        color: "rgba(140, 190, 255, 0.74)",
                        marginBottom: "10px",
                      }}
                    >
                      {division.exhibitCount} מוצגים · {division.subDivisionCount} תתי־יחידות ·{" "}
                      {division.readiness}% מוכנות
                    </div>
                    <div
                      style={{
                        fontSize: "14px",
                        lineHeight: 1.6,
                        color: "rgba(224, 239, 255, 0.88)",
                        marginBottom: "12px",
                      }}
                    >
                      {division.descriptionHe}
                    </div>

                    <div
                      style={{
                        fontSize: "11px",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        color: "rgba(132, 193, 255, 0.58)",
                      }}
                    >
                      Click to inspect · Double-click to open
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        {activeDivision && (
          <section
            style={{
              marginTop: "24px",
              borderRadius: "28px",
              padding: "24px",
              border: "1px solid rgba(95, 168, 255, 0.18)",
              background:
                "linear-gradient(180deg, rgba(9,20,40,0.90) 0%, rgba(7,16,30,0.94) 100%)",
              boxShadow: "0 16px 42px rgba(0,0,0,0.22)",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.2fr 1fr 1fr",
                gap: "20px",
                alignItems: "stretch",
              }}
            >
              <div
                style={{
                  borderRadius: "22px",
                  padding: "20px",
                  border: "1px solid rgba(95, 168, 255, 0.16)",
                  background: "rgba(8,18,34,0.66)",
                }}
              >
                <div
                  style={{
                    fontSize: "12px",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "rgba(153, 198, 255, 0.68)",
                    marginBottom: "12px",
                  }}
                >
                  Active division
                </div>

                <div
                  style={{
                    fontSize: "34px",
                    fontWeight: 900,
                    marginBottom: "6px",
                  }}
                >
                  {activeDivision.titleHe}
                </div>

                <div
                  style={{
                    fontSize: "12px",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "rgba(132, 193, 255, 0.68)",
                    marginBottom: "12px",
                  }}
                >
                  {activeDivision.titleEn}
                </div>

                <div
                  style={{
                    fontSize: "15px",
                    color: "rgba(171, 211, 255, 0.82)",
                    marginBottom: "12px",
                  }}
                >
                  {activeDivision.subDivisions.join(" · ")}
                </div>

                <div
                  style={{
                    fontSize: "14px",
                    lineHeight: 1.75,
                    color: "rgba(224, 239, 255, 0.88)",
                    marginBottom: "18px",
                  }}
                >
                  {activeDivision.descriptionHe}
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap",
                    marginBottom: "18px",
                  }}
                >
                  {[
                    `${activeDivision.exhibitCount} מוצגים`,
                    `${activeDivision.subDivisionCount} תתי־יחידות`,
                    `${activeDivision.readiness}% מוכנות`,
                  ].map((chip) => (
                    <span
                      key={chip}
                      style={{
                        padding: "8px 12px",
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
                    display: "flex",
                    gap: "12px",
                    flexWrap: "wrap",
                  }}
                >
                  <Link
                    href={`/global-exhibit-bank/division?divisionId=${activeDivision.id}`}
                    style={{
                      padding: "12px 16px",
                      borderRadius: "14px",
                      textDecoration: "none",
                      fontWeight: 800,
                      color: "#04111E",
                      background: "linear-gradient(180deg, #8AD8FF 0%, #5FC1FF 100%)",
                    }}
                  >
                    {activeDivision.ctaHe}
                  </Link>

                  <Link
                    href="#"
                    style={{
                      padding: "12px 16px",
                      borderRadius: "14px",
                      textDecoration: "none",
                      fontWeight: 700,
                      color: "#DCEEFF",
                      border: "1px solid rgba(111, 200, 255, 0.28)",
                      background: "rgba(11,24,45,0.74)",
                    }}
                  >
                    לצפייה במערכות
                  </Link>
                </div>
              </div>

              <div
                style={{
                  borderRadius: "22px",
                  padding: "20px",
                  border: "1px solid rgba(95, 168, 255, 0.16)",
                  background: "rgba(8,18,34,0.66)",
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
                  {activeDivision.subDivisions.map((item) => (
                    <div
                      key={item}
                      style={{
                        padding: "12px 14px",
                        borderRadius: "14px",
                        border: "1px solid rgba(95, 168, 255, 0.20)",
                        background: "rgba(14,31,58,0.72)",
                        fontSize: "14px",
                        fontWeight: 700,
                        color: "#E7F3FF",
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div
                style={{
                  borderRadius: "22px",
                  padding: "20px",
                  border: "1px solid rgba(95, 168, 255, 0.16)",
                  background: "rgba(8,18,34,0.66)",
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
                  {activeDivision.previewSystems.map((system) => (
                    <div
                      key={system}
                      style={{
                        padding: "14px 14px",
                        borderRadius: "14px",
                        border: "1px solid rgba(95, 168, 255, 0.18)",
                        background:
                          "linear-gradient(180deg, rgba(15,35,66,0.86) 0%, rgba(11,24,44,0.90) 100%)",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "15px",
                          fontWeight: 800,
                          marginBottom: "5px",
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
                        Future system entry point
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        <footer
          style={{
            marginTop: "20px",
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
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
            Back to Hub
          </Link>

          <Link
            href="#"
            style={{
              padding: "11px 14px",
              borderRadius: "14px",
              textDecoration: "none",
              color: "#DCEEFF",
              border: "1px solid rgba(95, 168, 255, 0.18)",
              background: "rgba(9,20,40,0.72)",
            }}
          >
            Division View
          </Link>

          <Link
            href="#"
            style={{
              padding: "11px 14px",
              borderRadius: "14px",
              textDecoration: "none",
              color: "#DCEEFF",
              border: "1px solid rgba(95, 168, 255, 0.18)",
              background: "rgba(9,20,40,0.72)",
            }}
          >
            Future Exhibit Systems
          </Link>
        </footer>
      </div>
    </main>
  )
}
