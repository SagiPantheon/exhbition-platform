"use client"

import Link from "next/link"
import { useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { exhibitDivisions } from "../../../data/globalExhibitBank"
import { getExhibitSystemTemplateRecord } from "../../../data/exhibitSystemTemplate"

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

  const templateRecord = useMemo(
    () =>
      getExhibitSystemTemplateRecord({
        divisionId,
        subDivisionName,
        systemName,
      }),
    [divisionId, subDivisionName, systemName]
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

  const record = templateRecord ?? {
    systemName,
    divisionId: division.id,
    divisionTitleHe: division.titleHe,
    divisionTitleEn: division.titleEn,
    subDivisionName,
    summary:
      "This exhibit system is using the Template V1 shell and can later receive real exhibit data, media, and layout compatibility details.",
    heroMode: "placeholder" as const,
    dimensions: "To be defined",
    weight: "To be defined",
    scale: "To be defined",
    displayMode: "To be defined",
    installationType: "To be defined",
    readiness: division.readiness,
    approvalStatus: "Pending detailed system mapping",
    layoutCompatibility: "Future layout compatibility layer",
    relatedSystems: [],
  }

  const hasSpaceSource = Boolean(record.spaceSlug)
  const heroBackground = record.heroImage
    ? `linear-gradient(180deg, rgba(5,15,28,0.22) 0%, rgba(5,15,28,0.58) 100%), url(${record.heroImage}) center/contain no-repeat`
    : "radial-gradient(circle at center, rgba(40,125,255,0.18) 0%, rgba(11,24,44,0.92) 58%, rgba(7,16,30,0.98) 100%)"

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
          maxWidth: "1460px",
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
              Exhibit system template v1
            </div>

            <h1
              style={{
                margin: 0,
                fontSize: "clamp(30px, 4vw, 54px)",
                lineHeight: 1,
                fontWeight: 900,
              }}
            >
              {record.systemName}
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
              {record.divisionTitleHe} · {record.subDivisionName} · {record.divisionTitleEn}
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
              href={`/global-exhibit-bank?divisionId=${record.divisionId}&subDivision=${encodeURIComponent(record.subDivisionName)}`}
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
            gridTemplateColumns: "1.15fr 0.85fr",
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
                display: "flex",
                justifyContent: "space-between",
                gap: "12px",
                flexWrap: "wrap",
                marginBottom: "14px",
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(153, 198, 255, 0.68)",
                }}
              >
                Hero / primary stage
              </div>

              {hasSpaceSource && (
                <div
                  style={{
                    padding: "8px 12px",
                    borderRadius: "999px",
                    border: "1px solid rgba(95, 168, 255, 0.22)",
                    background: "rgba(14,31,58,0.66)",
                    fontSize: "12px",
                    color: "rgba(214, 233, 255, 0.82)",
                  }}
                >
                  Space asset source connected
                </div>
              )}
            </div>

            <div
              style={{
                minHeight: "340px",
                borderRadius: "24px",
                border: "1px solid rgba(95, 168, 255, 0.18)",
                background: heroBackground,
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                gap: "20px",
                marginBottom: "20px",
                boxShadow: "inset 0 0 50px rgba(58, 138, 255, 0.10)",
                padding: "22px",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: "12px",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "rgba(153, 198, 255, 0.62)",
                    marginBottom: "10px",
                  }}
                >
                  {record.heroMode === "image"
                    ? "Space visual source"
                    : record.heroMode === "3d"
                    ? "3D source connected"
                    : "Template placeholder"}
                </div>
                <div
                  style={{
                    fontSize: "30px",
                    fontWeight: 900,
                    marginBottom: "8px",
                  }}
                >
                  {record.systemName}
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    color: "rgba(214, 233, 255, 0.78)",
                  }}
                >
                  Hero zone powered by Space catalog alignment
                </div>
              </div>

              {record.spaceSlug && (
                <Link
                  href={`/space/${record.spaceSlug}`}
                  style={{
                    alignSelf: "flex-start",
                    padding: "12px 16px",
                    borderRadius: "14px",
                    textDecoration: "none",
                    fontWeight: 800,
                    color: "#04111E",
                    background: "linear-gradient(180deg, #8AD8FF 0%, #5FC1FF 100%)",
                    whiteSpace: "nowrap",
                  }}
                >
                  Open in Space Catalog
                </Link>
              )}
            </div>

            <div
              style={{
                fontSize: "16px",
                lineHeight: 1.85,
                color: "rgba(224, 239, 255, 0.86)",
              }}
            >
              {record.summary}
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
                Core specification strip
              </div>

              <div style={{ display: "grid", gap: "10px" }}>
                {[
                  ["Dimensions", record.dimensions],
                  ["Weight", record.weight],
                  ["Scale", record.scale],
                  ["Display mode", record.displayMode],
                  ["Installation", record.installationType],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    style={{
                      padding: "13px 14px",
                      borderRadius: "16px",
                      border: "1px solid rgba(95, 168, 255, 0.18)",
                      background: "rgba(11,24,44,0.72)",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "11px",
                        textTransform: "uppercase",
                        letterSpacing: "0.10em",
                        color: "rgba(153, 198, 255, 0.62)",
                        marginBottom: "6px",
                      }}
                    >
                      {label}
                    </div>
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: 700,
                        color: "#EAF4FF",
                      }}
                    >
                      {value}
                    </div>
                  </div>
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
                Exhibition readiness
              </div>

              <div style={{ display: "grid", gap: "10px" }}>
                {[
                  ["Readiness", `${record.readiness}%`],
                  ["Approval status", record.approvalStatus],
                  ["Layout compatibility", record.layoutCompatibility],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    style={{
                      padding: "13px 14px",
                      borderRadius: "16px",
                      border: "1px solid rgba(95, 168, 255, 0.18)",
                      background: "rgba(11,24,44,0.72)",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "11px",
                        textTransform: "uppercase",
                        letterSpacing: "0.10em",
                        color: "rgba(153, 198, 255, 0.62)",
                        marginBottom: "6px",
                      }}
                    >
                      {label}
                    </div>
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: 700,
                        color: "#EAF4FF",
                      }}
                    >
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
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
              Display & installation configuration
            </div>

            <div
              style={{
                fontSize: "15px",
                lineHeight: 1.8,
                color: "rgba(224, 239, 255, 0.84)",
              }}
            >
              This block defines how the system is physically presented in exhibition context:
              pedestal, floor display, support structure, wall-mount possibility, and setup behavior.
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
              Layout compatibility bridge
            </div>

            <div
              style={{
                fontSize: "15px",
                lineHeight: 1.8,
                color: "rgba(224, 239, 255, 0.84)",
                marginBottom: "16px",
              }}
            >
              This system template is prepared for future layout-planning connection, including
              footprint logic, podium matching, and tent/workspace placement.
            </div>

            <Link
              href="#"
              style={{
                display: "inline-block",
                padding: "12px 16px",
                borderRadius: "14px",
                textDecoration: "none",
                fontWeight: 800,
                color: "#04111E",
                background: "linear-gradient(180deg, #8AD8FF 0%, #5FC1FF 100%)",
              }}
            >
              Open Layout Compatibility
            </Link>
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
            Related systems
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
              gap: "12px",
            }}
          >
            {record.relatedSystems.length > 0 ? (
              record.relatedSystems.map((item) => (
                <Link
                  key={item}
                  href={`/global-exhibit-bank/exhibit-system?divisionId=${record.divisionId}&subDivision=${encodeURIComponent(record.subDivisionName)}&system=${encodeURIComponent(item)}`}
                  style={{
                    padding: "16px",
                    borderRadius: "18px",
                    textDecoration: "none",
                    border: "1px solid rgba(95, 168, 255, 0.18)",
                    background:
                      "linear-gradient(180deg, rgba(15,35,66,0.86) 0%, rgba(11,24,44,0.90) 100%)",
                    color: "#EAF4FF",
                  }}
                >
                  <div
                    style={{
                      fontSize: "15px",
                      fontWeight: 800,
                      marginBottom: "6px",
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
                    Open related system
                  </div>
                </Link>
              ))
            ) : (
              <div
                style={{
                  gridColumn: "1 / -1",
                  padding: "14px 16px",
                  borderRadius: "16px",
                  border: "1px solid rgba(95, 168, 255, 0.18)",
                  background: "rgba(11,24,44,0.72)",
                  color: "rgba(214, 233, 255, 0.78)",
                }}
              >
                No related systems mapped yet.
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}
