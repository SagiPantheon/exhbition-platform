"use client";

import Link from "next/link";
import type { Asset } from "../../types/asset";

type AssetCardProps = {
  asset: Asset;
};

export default function AssetCard({ asset }: AssetCardProps) {
  const href = getAssetHref(asset.id);

  return (
    <article
      style={{
        borderRadius: "22px",
        padding: "18px",
        border: "1px solid rgba(255,255,255,0.08)",
        background:
          "linear-gradient(180deg, rgba(18,26,48,0.92) 0%, rgba(10,14,28,0.95) 100%)",
        boxShadow: "0 14px 34px rgba(0,0,0,0.22)",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "10px",
        }}
      >
        <div>
          <h3
            style={{
              margin: 0,
              fontSize: "1.2rem",
              color: "#f5f7fb",
            }}
          >
            {asset.name}
          </h3>

          <div
            style={{
              marginTop: "6px",
              color: "rgba(245,247,251,0.72)",
              fontSize: "0.9rem",
            }}
          >
            {asset.code} · {asset.family}
            {asset.subfamily ? ` / ${asset.subfamily}` : ""}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            alignItems: "flex-end",
          }}
        >
          <Badge text={asset.installation.type} />
          <StatusBadge text={asset.status} />
        </div>
      </div>

      <p
        style={{
          margin: 0,
          lineHeight: 1.6,
          color: "rgba(245,247,251,0.88)",
          fontSize: "0.94rem",
        }}
      >
        {asset.description}
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: "10px",
        }}
      >
        <MiniInfo
          label="Dimensions"
          value={`${asset.dimensions.length} × ${asset.dimensions.width} × ${asset.dimensions.height} m`}
        />
        <MiniInfo label="Weight" value={`${asset.weightKg} kg`} />
      </div>

      <div
        style={{
          display: "flex",
          gap: "8px",
          flexWrap: "wrap",
        }}
      >
        {asset.installation.pedestalRequired && <Tag text="Pedestal required" />}
        {asset.installation.barrierRequired && <Tag text="Barrier required" />}
        {asset.installation.specialSupportRequired && (
          <Tag text="Special support" />
        )}
        {asset.installation.indoor && <Tag text="Indoor" />}
      </div>

      <div style={{ marginTop: "4px" }}>
        <Link
          href={href}
          style={{
            display: "inline-block",
            padding: "10px 14px",
            borderRadius: "12px",
            fontSize: "0.88rem",
            fontWeight: 700,
            textDecoration: "none",
            border: "1px solid rgba(120, 190, 255, 0.45)",
            background:
              "linear-gradient(180deg, rgba(78,145,255,0.28) 0%, rgba(41,92,180,0.18) 100%)",
            color: "#f5f7fb",
          }}
        >
          Open Asset
        </Link>
      </div>
    </article>
  );
}

function getAssetHref(id: string) {
  const map: Record<string, string> = {
    "space-mcs": "/space/mcs",
    "space-optsat-500": "/space/optsat-500",
    "space-optsar-550": "/space/optsar-550",
    "space-opsat-3000": "/space/opsat-3000",
    "space-tecsar": "/space/tecsar",
    "space-beresheet": "/space/beresheet",
    "space-shavit": "/space/shavit",
  };

  return map[id] ?? "/space";
}

function MiniInfo({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        borderRadius: "14px",
        padding: "12px",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div
        style={{
          fontSize: "0.72rem",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: "rgba(180,210,255,0.72)",
          marginBottom: "6px",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: "0.92rem",
          fontWeight: 600,
          color: "#f5f7fb",
        }}
      >
        {value}
      </div>
    </div>
  );
}

function Tag({ text }: { text: string }) {
  return (
    <span
      style={{
        padding: "6px 10px",
        borderRadius: "999px",
        fontSize: "0.75rem",
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.08)",
        color: "#f5f7fb",
      }}
    >
      {text}
    </span>
  );
}

function Badge({ text }: { text: string }) {
  return (
    <span
      style={{
        padding: "6px 10px",
        borderRadius: "999px",
        fontSize: "0.74rem",
        background: "rgba(255,255,255,0.08)",
        border: "1px solid rgba(255,255,255,0.12)",
        color: "#f5f7fb",
        textTransform: "capitalize",
      }}
    >
      {text}
    </span>
  );
}

function StatusBadge({ text }: { text: string }) {
  return (
    <span
      style={{
        padding: "6px 10px",
        borderRadius: "999px",
        fontSize: "0.74rem",
        background: "rgba(92, 214, 126, 0.14)",
        border: "1px solid rgba(92, 214, 126, 0.35)",
        color: "#9df0b2",
      }}
    >
      {text}
    </span>
  );
}