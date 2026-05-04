"use client"

import Link from "next/link"
import { useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { exhibitDivisions } from "../../../data/globalExhibitBank"

function buildOperationalRole(divisionTitle: string, subDivisionName: string) {
  return `Operational layer for ${subDivisionName} under ${divisionTitle}. This screen is the structural bridge between division logic and future exhibit-system views, asset families, and planning workflows.`
}

function buildPreviewSystems(subDivisionName: string) {
  const map: Record<string, string[]> = {
    "מלמ": ["Mission Layer", "Support Systems", "Operational Envelope"],
    "טילים": ["Missile Family", "Launcher Layer", "Strike Systems"],
    "חלל": ["Satellite Systems", "Space Payloads", "Orbital Assets"],
    "הגנה": ["Defense Layer", "Shield Systems", "Interception Stack"],
    "בדק": ["Depot Systems", "Maintenance Flow", "Aircraft Support"],
    "MRO": ["MRO Services", "Airframe Support", "Lifecycle Services"],
    "רובוטיקה": ["Ground Robotics", "Autonomous Systems", "Control Units"],
    "תקשורת": ["Communications Suite", "Signal Systems", "Network Layer"],
    "מכ״מים": ["Radar Family", "Sensor Grid", "Detection Systems"],
    "מלט": ["UAV Family", "Mission Payload", "Control Segment"],
  }

  return map[subDivisionName] ?? ["System Layer A", "System Layer B", "System Layer C"]
}

export default function SubDivisionPage() {
  const searchParams = useSearchParams()
  const rawDivisionId = searchParams.get("divisionId") ?? ""
  const rawSubDivision = searchParams.get("subDivision") ?? ""

  const divisionId = decodeURIComponent(rawDivisionId).trim().toLowerCase()
  const subDivisionName = decodeURIComponent(rawSubDivision).trim()

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

  if (!division || !subDivisionExists) {
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
            Sub-division not found
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
            No matching sub-division for this route
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
          </div>
        </div>
      </main>
    )
  }

  const previewSystems = buildPreviewSystems(subDivisionName)
  const operationalRole = buildOperationalRole(division.titleHe, subDivisionName)

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
              Sub-division command view
            </div>

            <h1
              style={{
                margin: 0,
                fontSize: "clamp(30px, 4vw, 52px)",
                lineHeight: 1,
                fontWeight: 900,
              }}
            >
              {subDivisionName}
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
              {division.titleHe} · {division.titleEn}
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
              href={`/global-exhibit-bank/division?divisionId=${division.id}`}
              style={{
                padding: "11px 14px",
                borderRadius: "14px",
                textDecoration: "none",
                color: "#DCEEFF",
                border: "1px solid rgba(95, 168, 255, 0.18)",
                background: "rgba(9,20,40,0.72)",
              }}
            >
              ← Division
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
        </div>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1.05fr 0.95fr",
            gap: "20px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              display: "grid",
              gap: "20px",
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
                Current sub-division
              </div>

              <div
                style={{
                  fontSize: "34px",
                  fontWeight: 900,
                  marginBottom: "12px",
                }}
              >
                {subDivisionName}
              </div>

              <div
                style={{
                  fontSize: "15px",
                  lineHeight: 1.8,
                  color: "rgba(224, 239, 255, 0.84)",
                  marginBottom: "16px",
                }}
              >
                This is the next structural layer under the selected division.
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    padding: "9px 12px",
                    borderRadius: "999px",
                    border: "1px solid rgba(95, 168, 255, 0.20)",
                    background: "rgba(14,31,58,0.72)",
                    fontSize: "13px",
                    color: "rgba(218, 236, 255, 0.86)",
                  }}
                >
                  Parent division: {division.titleHe}
                </span>
                <span
                  style={{
                    padding: "9px 12px",
                    borderRadius: "999px",
                    border: "1px solid rgba(95, 168, 255, 0.20)",
                    background: "rgba(14,31,58,0.72)",
                    fontSize: "13px",
                    color: "rgba(218, 236, 255, 0.86)",
                  }}
                >
                  Readiness context: {division.readiness}%
                </span>
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
                Operational role
              </div>

              <div
                style={{
                  fontSize: "15px",
                  lineHeight: 1.8,
                  color: "rgba(224, 239, 255, 0.84)",
                }}
              >
                {operationalRole}
              </div>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gap: "20px",
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
                Preview systems
              </div>

              <div
                style={{
                  display: "grid",
                  gap: "10px",
                }}
              >
                {previewSystems.map((item) => (
                  <Link
                    key={item}
                    href={`/global-exhibit-bank/exhibit-system?divisionId=${division.id}&subDivision=${encodeURIComponent(subDivisionName)}&system=${encodeURIComponent(item)}`}
                    style={{
                      padding: "14px 16px",
                      borderRadius: "16px",
                      border: "1px solid rgba(95, 168, 255, 0.18)",
                      background:
                        "linear-gradient(180deg, rgba(15,35,66,0.86) 0%, rgba(11,24,44,0.90) 100%)",
                      textDecoration: "none",
                      color: "#EAF4FF",
                      display: "block",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "15px",
                        fontWeight: 800,
                        marginBottom: "4px",
                      }}
                    >
                      {item}
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "rgba(171, 211, 255, 0.70)",
                      }}
                    >
                      Open exhibit-system bridge
                    </div>
                  </Link>
                ))}
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  marginTop: "16px",
                }}
              >
                <Link
                  href="#"
                  style={{
                    padding: "12px 16px",
                    borderRadius: "14px",
                    textDecoration: "none",
                    fontWeight: 800,
                    color: "#04111E",
                    background: "linear-gradient(180deg, #8AD8FF 0%, #5FC1FF 100%)",
                  }}
                >
                  Open Exhibit Systems
                </Link>
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
                Neighbor sub-divisions
              </div>

              <div
                style={{
                  display: "grid",
                  gap: "10px",
                }}
              >
                {division.subDivisions.map((item) => {
                  const active = item === subDivisionName
                  return (
                    <Link
                      key={item}
                      href={`/global-exhibit-bank/sub-division?divisionId=${division.id}&subDivision=${encodeURIComponent(item)}`}
                      style={{
                        padding: "14px 16px",
                        borderRadius: "16px",
                        textDecoration: "none",
                        border: active
                          ? "1px solid rgba(111, 200, 255, 0.62)"
                          : "1px solid rgba(95, 168, 255, 0.18)",
                        background: active
                          ? "linear-gradient(180deg, rgba(17,41,76,0.96) 0%, rgba(12,28,52,0.96) 100%)"
                          : "rgba(8,18,34,0.66)",
                        color: "#EAF4FF",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "15px",
                          fontWeight: 800,
                          marginBottom: "4px",
                        }}
                      >
                        {item}
                      </div>
                      <div
                        style={{
                          fontSize: "12px",
                          color: "rgba(171, 211, 255, 0.70)",
                        }}
                      >
                        Open sub-division layer
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
