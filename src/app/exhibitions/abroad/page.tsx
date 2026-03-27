import Link from "next/link";

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

const cardStyle = {
  borderRadius: "24px",
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.04)",
  padding: "22px",
} as const;

const exhibitions = [
  {
    name: "Athens Strategy Conference",
    location: "Athens",
    timing: "TBD",
    notes: "International exhibition example for abroad section.",
  },
  {
    name: "DSEI",
    location: "Abroad / example",
    timing: "TBD",
    notes: "Placeholder for future structured overseas tracking.",
  },
  {
    name: "Eurosatory",
    location: "Abroad / example",
    timing: "TBD",
    notes: "Can later expand with assets, pavilion, approvals, and branding.",
  },
];

export default function AbroadExhibitionsPage() {
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
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "22px" }}>
          <Link href="/exhibitions" style={navButtonStyle}>
            ← Back to Exhibitions
          </Link>
          <Link href="/" style={navButtonStyle}>
            Back to Main
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
            Secondary page
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: "56px",
              lineHeight: 1.02,
              fontWeight: 800,
              letterSpacing: "-0.04em",
            }}
          >
            Exhibitions Abroad
          </h1>

          <p
            style={{
              marginTop: "14px",
              maxWidth: "980px",
              fontSize: "19px",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.80)",
            }}
          >
            Separate page for international exhibitions outside Israel. This section can remain simpler for now and expand later.
          </p>
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "18px",
          }}
        >
          {exhibitions.map((item) => (
            <article key={item.name} style={cardStyle}>
              <div
                style={{
                  fontSize: "12px",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.70)",
                  marginBottom: "10px",
                  fontWeight: 700,
                }}
              >
                International example
              </div>

              <h2 style={{ margin: 0, fontSize: "28px", lineHeight: 1.12, fontWeight: 800 }}>
                {item.name}
              </h2>

              <p style={{ marginTop: "12px", fontSize: "16px", lineHeight: 1.7, color: "rgba(255,255,255,0.82)" }}>
                <strong>Location:</strong> {item.location}
              </p>

              <p style={{ marginTop: "8px", fontSize: "16px", lineHeight: 1.7, color: "rgba(255,255,255,0.82)" }}>
                <strong>Timing:</strong> {item.timing}
              </p>

              <p style={{ marginTop: "8px", fontSize: "16px", lineHeight: 1.7, color: "rgba(255,255,255,0.82)" }}>
                {item.notes}
              </p>
            </article>
          ))}
        </section>

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
      </div>
    </main>
  );
}
