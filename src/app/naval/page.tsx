import Image from "next/image";
import Link from "next/link";

const waterAssets = [
  {
    id: "water-001",
    slug: "katana",
    name: "KATANA",
    category: "Unmanned defense patrol boat",
    subtitle:
      "High-speed unmanned naval platform for premium exhibition presentation.",
    image: "/images/naval/katana.png",
    model3d: "/models/naval/katana-showcase.glb",
    status: "Approved",
    displayType: "Naval display",
    scale: "1:1",
    readiness: "Indoor / Outdoor",
    support: "Self-standing",
    presentationLevel: "Premium",
  },
  {
    id: "water-002",
    slug: "naval-placeholder",
    name: "NAVAL ASSET 02",
    category: "Future naval platform",
    subtitle: "Reserved placeholder for the next naval exhibition asset.",
    image: "/images/naval/katana.png",
    model3d: "",
    status: "Coming soon",
    displayType: "Naval display",
    scale: "1:1",
    readiness: "Planned",
    support: "TBD",
    presentationLevel: "Concept",
  },
];

export default function WaterPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, rgba(44,92,160,0.18), transparent 32%), linear-gradient(180deg, #07111f 0%, #0a1628 45%, #0b1320 100%)",
        color: "white",
        padding: "24px 24px 64px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: "1560px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            marginBottom: "22px",
          }}
        >
          <Link
            href="/"
            style={navButtonStyle}
          >
            ← Back to Main
          </Link>

          <Link
            href="/air"
            style={navButtonStyle}
          >
            Go to Air
          </Link>

          <Link
            href="/land"
            style={navButtonStyle}
          >
            Go to Land
          </Link>

          <Link
            href="/space"
            style={navButtonStyle}
          >
            Go to Space
          </Link>
        </div>

        <section
          style={{
            border: "1px solid rgba(125,211,252,0.18)",
            borderRadius: "28px",
            padding: "26px 24px 30px",
            background: "rgba(8, 15, 28, 0.34)",
            marginBottom: "26px",
          }}
        >
          <div
            style={{
              fontSize: "13px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#7dd3fc",
              marginBottom: "10px",
            }}
          >
            Naval Section
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: "64px",
              lineHeight: 1.02,
              fontWeight: 800,
              letterSpacing: "-0.04em",
            }}
          >
            Naval Assets
          </h1>

          <p
            style={{
              marginTop: "14px",
              maxWidth: "920px",
              fontSize: "19px",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.80)",
            }}
          >
            Unmanned naval systems, fast patrol platforms, and maritime defense
            assets prepared for premium exhibition presentation.
          </p>
        </section>

        <section
          style={{
            border: "1px solid rgba(125,211,252,0.18)",
            borderRadius: "28px",
            padding: "24px",
            background: "rgba(8, 15, 28, 0.34)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))",
              gap: "24px",
            }}
          >
            {waterAssets.map((asset) => (
              <article
                key={asset.id}
                style={{
                  borderRadius: "26px",
                  overflow: "hidden",
                  background:
                    "linear-gradient(180deg, rgba(15,28,52,0.96) 0%, rgba(10,20,40,0.96) 100%)",
                  border: "1px solid rgba(125,211,252,0.28)",
                  boxShadow: "0 0 0 1px rgba(80,160,255,0.06) inset",
                }}
              >
                <div
                  style={{
                    padding: "18px 18px 0",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      borderRadius: "22px",
                      overflow: "hidden",
                      border: "1px solid rgba(125,211,252,0.22)",
                      background:
                        "radial-gradient(circle at top, rgba(35,82,170,0.28), rgba(8,18,38,0.96) 68%)",
                      minHeight: "250px",
                    }}
                  >
                    <Image
                      src={asset.image}
                      alt={asset.name}
                      fill
                      style={{
                        objectFit: "contain",
                        padding: "18px",
                      }}
                    />
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap",
                    padding: "14px 20px 0",
                  }}
                >
                  <span style={asset.status === "Approved" ? approvedBadgeStyle : neutralBadgeStyle}>
                    {asset.status}
                  </span>

                  <span style={infoBadgeStyle}>{asset.displayType}</span>

                  <span style={darkBadgeStyle}>{asset.scale}</span>

                  <span
                    style={{
                      ...infoBadgeStyle,
                      marginLeft: "auto",
                    }}
                  >
                    {asset.model3d ? "3D connected" : "Awaiting 3D"}
                  </span>
                </div>

                <div
                  style={{
                    padding: "18px 20px 20px",
                    display: "grid",
                    gridTemplateColumns: "1.2fr 0.9fr",
                    gap: "18px",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: "13px",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "#7dd3fc",
                        marginBottom: "12px",
                      }}
                    >
                      Featured Asset
                    </div>

                    <h2
                      style={{
                        margin: 0,
                        fontSize: "28px",
                        lineHeight: 1.12,
                        fontWeight: 800,
                      }}
                    >
                      {asset.name}
                    </h2>

                    <div
                      style={{
                        marginTop: "8px",
                        color: "rgba(255,255,255,0.78)",
                        fontSize: "17px",
                        lineHeight: 1.6,
                      }}
                    >
                      {asset.id} · {asset.category}
                    </div>

                    <p
                      style={{
                        marginTop: "14px",
                        color: "rgba(255,255,255,0.82)",
                        fontSize: "17px",
                        lineHeight: 1.7,
                        marginBottom: "18px",
                      }}
                    >
                      {asset.subtitle}
                    </p>

                    <Link href={asset.slug === "katana" ? "/naval/katana" : "#"}
                      style={{
                        padding: "9px 16px",
                        borderRadius: "999px",
                        border: "1px solid rgba(255,255,255,0.22)",
                        background: "rgba(255,255,255,0.06)",
                        color: "white",
                        fontWeight: 700,
                        fontSize: "14px",
                        cursor: "pointer",
                      }}
                    >
                      View
                    </Link>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gap: "12px",
                      alignContent: "start",
                    }}
                  >
                    {[
                      ["Operational Readiness", asset.readiness],
                      ["Support", asset.support],
                      ["Presentation Level", asset.presentationLevel],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        style={{
                          padding: "14px 16px",
                          borderRadius: "18px",
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.12)",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "11px",
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            color: "rgba(255,255,255,0.72)",
                            marginBottom: "8px",
                            fontWeight: 700,
                          }}
                        >
                          {label}
                        </div>
                        <div
                          style={{
                            fontSize: "15px",
                            lineHeight: 1.45,
                            color: "white",
                            fontWeight: 700,
                          }}
                        >
                          {value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div
            style={{
              marginTop: "22px",
              textAlign: "center",
              fontSize: "12px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.56)",
            }}
          >
            Unclassified
          </div>
        </section>
      </div>
    </main>
  );
}

const navButtonStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "44px",
  padding: "0 16px",
  borderRadius: "14px",
  border: "1px solid rgba(125,211,252,0.35)",
  background: "rgba(14, 22, 38, 0.72)",
  color: "white",
  textDecoration: "none",
  fontSize: "14px",
  fontWeight: 600,
} as const;

const approvedBadgeStyle = {
  padding: "7px 12px",
  borderRadius: "999px",
  fontSize: "12px",
  fontWeight: 700,
  color: "#dcfce7",
  background: "rgba(34,197,94,0.16)",
  border: "1px solid rgba(34,197,94,0.42)",
} as const;

const neutralBadgeStyle = {
  padding: "7px 12px",
  borderRadius: "999px",
  fontSize: "12px",
  fontWeight: 700,
  color: "#e5e7eb",
  background: "rgba(255,255,255,0.08)",
  border: "1px solid rgba(255,255,255,0.15)",
} as const;

const infoBadgeStyle = {
  padding: "7px 12px",
  borderRadius: "999px",
  fontSize: "12px",
  fontWeight: 700,
  color: "#c4f1ff",
  background: "rgba(14,165,233,0.14)",
  border: "1px solid rgba(56,189,248,0.35)",
} as const;

const darkBadgeStyle = {
  padding: "7px 12px",
  borderRadius: "999px",
  fontSize: "12px",
  fontWeight: 700,
  color: "white",
  background: "rgba(255,255,255,0.08)",
  border: "1px solid rgba(255,255,255,0.15)",
} as const;