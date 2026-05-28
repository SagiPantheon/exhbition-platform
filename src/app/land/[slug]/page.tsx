import Link from "next/link";
import { notFound } from "next/navigation";
import ModelViewer from "../../../components/viewer/ModelViewer";
import { masterExhibits } from "../../../data/masterExhibits";
import QRCodePanel from "../../../components/QRCodePanel";

const katazAssets = masterExhibits
  .filter((e) => e.division === "kataz")
  .map((e, i) => ({
    id: `kataz-${String(i + 1).padStart(3, "0")}`,
    slug: e.slug,
    name: e.nameEn,
    category: "KATAZ asset",
    subtitle: e.subtitle?.en ?? `${e.nameEn} — KATAZ exhibition asset.`,
    image: e.image,
    model3d: e.model3d,
    status: e.status?.en ?? "Approved",
    displayType: e.config?.en ?? "UAV display",
    scale: e.scale ?? "1:1",
    readiness: e.readiness?.environment?.en ?? "Indoor / Outdoor",
    support: e.readiness?.support?.en ?? "Self-standing",
    presentationLevel: e.readiness?.presentationLevel?.en ?? "Premium",
  }));

export function generateStaticParams() {
  return katazAssets.map((asset) => ({ slug: asset.slug }));
}

export default async function KatazAssetPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const asset = katazAssets.find((item) => item.slug === slug);

  if (!asset) notFound();

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
      <div style={{ maxWidth: "1480px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            marginBottom: "24px",
          }}
        >
          <Link href="/land" style={navButtonStyle}>
            ← Back to KATAZ
          </Link>
          <Link href="/" style={navButtonStyle}>
            Back to Main
          </Link>
        </div>

        <div
          style={{
            border: "1px solid rgba(125,211,252,0.18)",
            borderRadius: "26px",
            padding: "22px 22px 30px",
            background: "rgba(8, 15, 28, 0.34)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1.25fr) minmax(320px, 0.78fr)",
              gap: "24px",
              alignItems: "start",
            }}
          >
            <div
              style={{
                borderRadius: "24px",
                overflow: "hidden",
                background: "rgba(9, 17, 31, 0.92)",
                border: "1px solid rgba(125,211,252,0.22)",
                padding: "18px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                  marginBottom: "14px",
                }}
              >
                <span style={badgeGreen}>{asset.status}</span>
                <span style={badgeBlue}>{asset.displayType}</span>
                <span style={badgeGray}>{asset.scale}</span>
                <span style={badgeBlue}>3D connected</span>
              </div>
              <ModelViewer
                src={asset.model3d}
                alt={`${asset.name} 3D model`}
                poster={asset.image}
              />
            </div>

            <div
              style={{
                borderRadius: "24px",
                overflow: "hidden",
                background: "rgba(9, 17, 31, 0.92)",
                border: "1px solid rgba(125,211,252,0.22)",
                padding: "22px",
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#7dd3fc",
                  marginBottom: "10px",
                }}
              >
                Featured Asset
              </div>
              <h1 style={{ margin: 0, fontSize: "40px", lineHeight: 1.08, fontWeight: 700 }}>
                {asset.name}
              </h1>
              <div style={{ marginTop: "10px", fontSize: "15px", color: "rgba(255,255,255,0.7)" }}>
                {asset.id} · {asset.category}
              </div>
              <p style={{ marginTop: "18px", color: "rgba(255,255,255,0.78)", fontSize: "16px", lineHeight: 1.7 }}>
                {asset.subtitle}
              </p>
              <div style={{ display: "grid", gap: "12px", marginTop: "22px" }}>
                {[
                  ["Operational Readiness", asset.readiness],
                  ["Support", asset.support],
                  ["Presentation Level", asset.presentationLevel],
                  ["3D Model", asset.model3d],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    style={{
                      padding: "14px 16px",
                      borderRadius: "16px",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.10)",
                    }}
                  >
                    <div style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#93c5fd", marginBottom: "6px" }}>
                      {label}
                    </div>
                    <div style={{ fontSize: "14px", color: "white", wordBreak: "break-word" }}>
                      {value}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: "24px" }}>
                <QRCodePanel nameEn={asset.name} nameHe={asset.name} path={`/land/${asset.slug}`} />
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: "20px",
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

const badgeGreen = {
  padding: "7px 12px", borderRadius: "999px", fontSize: "12px", fontWeight: 700,
  color: "#dcfce7", background: "rgba(34,197,94,0.16)", border: "1px solid rgba(34,197,94,0.42)",
} as const;

const badgeBlue = {
  padding: "7px 12px", borderRadius: "999px", fontSize: "12px", fontWeight: 700,
  color: "#c4f1ff", background: "rgba(14,165,233,0.14)", border: "1px solid rgba(56,189,248,0.35)",
} as const;

const badgeGray = {
  padding: "7px 12px", borderRadius: "999px", fontSize: "12px", fontWeight: 700,
  color: "white", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)",
} as const;
