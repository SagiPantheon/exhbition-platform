"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { abroadFlagCards } from "../../../data/abroadFlags";

const WorldMap = dynamic(() => import("../../../components/WorldMap"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        borderRadius: "24px",
        height: "400px",
        background: "#0b1120",
        border: "1px solid rgba(99,179,237,0.18)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "rgba(148,163,184,0.5)",
        fontSize: "14px",
        fontWeight: 700,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
      }}
    >
      Loading map…
    </div>
  ),
});

function StatCard({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note: string;
}) {
  return (
    <div
      style={{
        borderRadius: "22px",
        border: "1px solid rgba(148,163,184,0.16)",
        background: "rgba(10,16,30,0.86)",
        padding: "20px",
        boxShadow: "0 20px 50px rgba(0,0,0,0.22)",
      }}
    >
      <div
        style={{
          fontSize: "12px",
          fontWeight: 800,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "#7dd3fc",
          marginBottom: "10px",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: "34px",
          fontWeight: 900,
          lineHeight: 1,
          marginBottom: "10px",
          color: "#f8fafc",
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: "14px",
          lineHeight: 1.6,
          color: "rgba(226,232,240,0.78)",
        }}
      >
        {note}
      </div>
    </div>
  );
}

export default function AbroadExhibitionsPage() {
  const [activeIso, setActiveIso] = useState<string | null>(null);

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, rgba(14,165,233,0.16), rgba(2,6,23,1) 40%), linear-gradient(180deg, #08111f 0%, #030712 100%)",
        color: "#e5eefb",
      }}
    >
      <div
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          padding: "110px 24px 72px",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            padding: "8px 14px",
            borderRadius: "999px",
            border: "1px solid rgba(125,211,252,0.28)",
            background: "rgba(12,22,42,0.72)",
            fontSize: "12px",
            fontWeight: 800,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#7dd3fc",
          }}
        >
          International Layer
        </div>

        <h1
          style={{
            margin: "20px 0 12px",
            fontSize: "clamp(38px, 6vw, 72px)",
            lineHeight: 1.02,
            fontWeight: 900,
            maxWidth: "980px",
          }}
        >
          Exhibitions Abroad
        </h1>

        <p
          style={{
            margin: 0,
            maxWidth: "920px",
            fontSize: "18px",
            lineHeight: 1.8,
            color: "rgba(226,232,240,0.88)",
          }}
        >
          This is the international country layer of the platform. It turns the
          abroad section into a visual planning surface: countries first, then
          real exhibition routes, then operational details, approvals, assets,
          and logistics.
        </p>

        <div
          style={{
            marginTop: "30px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "16px",
          }}
        >
          <StatCard
            label="Country Library"
            value={String(abroadFlagCards.length)}
            note="A flexible visual base for the future international exhibitions map."
          />
          <StatCard
            label="First Real Anchor"
            value="Greece"
            note="MARE MED Athens gives this section a real operational starting point."
          />
          <StatCard
            label="Platform Logic"
            value="Countries → Events"
            note="First define the geography, then connect live exhibitions and planning flows."
          />
        </div>

      </div>

      <section>
        <WorldMap activeIso={activeIso} />
      </section>

      <div
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          padding: "0 24px 72px",
        }}
      >
        <section style={{ marginTop: "34px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px",
              flexWrap: "wrap",
              marginBottom: "18px",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: 800,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#60a5fa",
                  marginBottom: "8px",
                }}
              >
                Flag Library
              </div>
              <h2
                style={{
                  margin: 0,
                  fontSize: "28px",
                  fontWeight: 800,
                  lineHeight: 1.15,
                }}
              >
                Country Cards
              </h2>
            </div>

            <div
              style={{
                borderRadius: "999px",
                border: "1px solid rgba(148,163,184,0.16)",
                background: "rgba(8,15,28,0.78)",
                padding: "10px 14px",
                fontSize: "13px",
                fontWeight: 700,
                color: "rgba(226,232,240,0.82)",
              }}
            >
              Built for future international exhibition routes
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "18px",
            }}
          >
            {abroadFlagCards.map((item) => {
              const isActive = activeIso === item.isoCode;
              return (
              <article
                key={item.slug}
                id={`country-${item.isoCode}`}
                onClick={() => setActiveIso(item.isoCode)}
                style={{
                  borderRadius: "28px",
                  border: isActive
                    ? "1px solid rgba(59,130,246,0.7)"
                    : "1px solid rgba(148,163,184,0.16)",
                  background: isActive
                    ? "linear-gradient(180deg, rgba(11,110,253,0.12) 0%, rgba(8,13,26,0.98) 100%)"
                    : "linear-gradient(180deg, rgba(15,23,42,0.95) 0%, rgba(8,13,26,0.98) 100%)",
                  padding: "22px",
                  boxShadow: isActive
                    ? "0 0 32px rgba(11,110,253,0.22), 0 22px 60px rgba(0,0,0,0.24)"
                    : "0 22px 60px rgba(0,0,0,0.24)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                  minHeight: "250px",
                  cursor: "pointer",
                  transition: "border 0.2s, box-shadow 0.2s, background 0.2s",
                }}
              >
                <div
                  style={{
                    fontSize: "48px",
                    lineHeight: 1,
                  }}
                >
                  {item.flag}
                </div>

                <div>
                  <h3
                    style={{
                      margin: 0,
                      fontSize: "24px",
                      fontWeight: 800,
                      lineHeight: 1.15,
                    }}
                  >
                    {item.country}
                  </h3>
                  <div
                    style={{
                      marginTop: "6px",
                      fontSize: "14px",
                      color: "rgba(148,163,184,0.92)",
                    }}
                  >
                    {item.countryHe}
                  </div>
                </div>

                <div
                  style={{
                    display: "inline-flex",
                    alignSelf: "flex-start",
                    padding: "8px 12px",
                    borderRadius: "999px",
                    background: "rgba(14,165,233,0.12)",
                    border: "1px solid rgba(56,189,248,0.22)",
                    color: "#7dd3fc",
                    fontSize: "12px",
                    fontWeight: 800,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  {item.statusEn}
                </div>

                <p
                  style={{
                    margin: 0,
                    fontSize: "15px",
                    lineHeight: 1.7,
                    color: "rgba(226,232,240,0.86)",
                  }}
                >
                  {item.noteEn}
                </p>

                <div
                  style={{
                    marginTop: "auto",
                    paddingTop: "10px",
                    borderTop: "1px solid rgba(148,163,184,0.12)",
                    fontSize: "13px",
                    color: "rgba(148,163,184,0.84)",
                  }}
                >
                  Future country hub
                </div>
              </article>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
