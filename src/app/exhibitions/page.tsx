import Link from "next/link";

const cardStyle = {
  borderRadius: "26px",
  border: "1px solid rgba(125,211,252,0.18)",
  background: "rgba(8, 15, 28, 0.34)",
  padding: "24px",
  textDecoration: "none",
  color: "white",
  display: "block",
} as const;

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

export default function ExhibitionsPage() {
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
          <Link href="/" style={navButtonStyle}>
            ← Back to Main
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
            Exhibitions Center
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
            Exhibitions
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
            Main operational center for exhibition planning, data tracking,
            suppliers, brochures, pavilion status, and preparation workflow.
          </p>
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: "24px",
          }}
        >
          <Link href="/exhibitions/israel" style={cardStyle}>
            <div
              style={{
                fontSize: "13px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#7dd3fc",
                marginBottom: "10px",
              }}
            >
              Main operational page
            </div>

            <h2 style={{ margin: 0, fontSize: "42px", lineHeight: 1.05, fontWeight: 800 }}>
              כנסים ותערוכות בארץ
            </h2>

            <p
              style={{
                marginTop: "14px",
                fontSize: "18px",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.82)",
                maxWidth: "760px",
              }}
            >
              The primary working page for domestic exhibitions in Israel:
              exhibition name, location, start and end dates, brochure upload,
              main theme, pavilion status, supplier, preparation tracking, and notes.
            </p>
          </Link>

          <Link href="/exhibitions/abroad" style={cardStyle}>
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

            <h2 style={{ margin: 0, fontSize: "34px", lineHeight: 1.08, fontWeight: 800 }}>
              Exhibitions Abroad
            </h2>

            <p
              style={{
                marginTop: "14px",
                fontSize: "17px",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.82)",
              }}
            >
              Separate tracking page for international exhibitions, examples, and future overseas planning.
            </p>
          </Link>
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
