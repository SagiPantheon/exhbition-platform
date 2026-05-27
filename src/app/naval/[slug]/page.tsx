import Link from "next/link";
import { notFound } from "next/navigation";
import ModelViewer from "../../../components/viewer/ModelViewer";
import { masterExhibits } from "../../../data/masterExhibits";

const eltaAssets = masterExhibits
  .filter((e) => e.division === "elta")
  .map((e, i) => ({
    id: `elta-${String(i + 1).padStart(3, "0")}`,
    slug: e.slug,
    name: e.nameEn,
    category: "ELTA asset",
    subtitle: e.subtitle?.en ?? `${e.nameEn} — ELTA exhibition asset.`,
    image: e.image,
    model3d: e.model3d,
    status: e.status?.en ?? "Approved",
    displayType: e.config?.en ?? "ELTA display",
    scale: e.scale ?? "1:1",
    readiness: e.readiness?.environment?.en ?? "Indoor / Outdoor",
    support: e.readiness?.support?.en ?? "Self-standing",
    presentationLevel: e.readiness?.presentationLevel?.en ?? "Premium",
  }));

export function generateStaticParams() {
  return eltaAssets.map((asset) => ({ slug: asset.slug }));
}

export default async function EltaAssetPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const asset = eltaAssets.find((item) => item.slug === slug);

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
      <div style={{ maxWidth: "1560px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            marginBottom: "22px",
          }}
        >
          <Link href="/naval" style={navButtonStyle}>
            ← Back to ELTA
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
            ELTA Asset Detail
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
            {asset.name}
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
            {asset.subtitle}
          </p>
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1.35fr 0.75fr",
            gap: "24px",
            alignItems: "start",
          }}
        >
          <div
            style={{
              border: "1px solid rgba(125,211,252,0.18)",
              borderRadius: "28px",
              padding: "24px",
              background: "rgba(8, 15, 28, 0.34)",
            }}
          >
            <ModelViewer
              src={asset.model3d}
              alt={asset.name}
              poster={asset.image}
            />
          </div>

          <div
            style={{
              border: "1px solid rgba(125,211,252,0.18)",
              borderRadius: "28px",
              padding: "24px",
              background: "rgba(8, 15, 28, 0.34)",
              display: "grid",
              gap: "14px",
            }}
          >
            <InfoBox label="Asset ID" value={asset.id} />
            <InfoBox label="Category" value={asset.category} />
            <InfoBox label="Status" value={asset.status} />
            <InfoBox label="Display Type" value={asset.displayType} />
            <InfoBox label="Scale" value={asset.scale} />
            <InfoBox label="Operational Readiness" value={asset.readiness} />
            <InfoBox label="Support" value={asset.support} />
            <InfoBox label="Presentation Level" value={asset.presentationLevel} />
            <InfoBox label="3D Model" value={asset.model3d} />
          </div>
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

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div
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
          wordBreak: "break-word",
        }}
      >
        {value}
      </div>
    </div>
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
