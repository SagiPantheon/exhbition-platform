"use client";

import Image from "next/image";
import Link from "next/link";
import { useSectionAssets } from "../../hooks/useSectionAssets";
import { normalizeLandAssetForCard } from "../../lib/editor/landDraftAdapter";
import { draftToLandAsset } from "../../lib/editor/landDraftAdapter";
import type { AssetEditorDraft } from "../../lib/editor/assetEditor";

import { landAssets } from "../../data/landAssets";

function TopButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      style={{
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
        boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
        backdropFilter: "blur(8px)",
      }}
    >
      {children}
    </Link>
  );
}

export default function LandPage() {
  const { assets: liveLandAssets, saveAsset, removeAsset } = useSectionAssets("land", landAssets);
  const cardAssets = liveLandAssets.map(normalizeLandAssetForCard);

  function saveLandDraft(draft: AssetEditorDraft) {
    saveAsset(draftToLandAsset(draft) as any);
  }

  function addPilotLandAsset() {
    saveLandDraft({
      id: "",
      slug: "",
      section: "land",
      code: "LAND-PILOT-001",
      title: {
        en: "Pilot Land Asset",
        he: "Pilot Land Asset",
      },
      subtitle: {
        en: "Pilot category",
        he: "Pilot category",
      },
      description: {
        en: "Temporary pilot asset for add/edit flow validation.",
        he: "Temporary pilot asset for add/edit flow validation.",
      },
      image: "/images/land/zmag-showcase.png",
      model3d: "/models/land/zmag-showcase-3d.glb",
      assetCategory: "Pilot category",
      missionType: "",
      classification: {
        en: "Unclassified",
        he: 'בלמ״ס',
      },
      dimensions: "",
      weight: "",
      status: "ready",
    });
  }

  function editPilotLandAsset() {
    const source = liveLandAssets.find(
      (item: any) =>
        item?.id === "LAND-PILOT-001" ||
        item?.code === "LAND-PILOT-001" ||
        item?.slug === "pilot-land-asset" ||
        item?.name === "Pilot Land Asset"
    );

    if (!source) {
      window.alert("Pilot asset not found yet. Add it first.");
      return;
    }

    const asset = normalizeLandAssetForCard(source as any);

    const nextTitle = window.prompt("English title", asset.name || "");
    if (nextTitle === null) return;

    const nextCategory = window.prompt("Category", asset.category || "");
    if (nextCategory === null) return;

    const nextDescription = window.prompt("Description", asset.subtitle || "");
    if (nextDescription === null) return;

    saveLandDraft({
      id: source.id || "",
      slug: source.slug || "",
      section: "land",
      code: source.id || source.code || "LAND-PILOT-001",
      title: {
        en: nextTitle,
        he: nextTitle,
      },
      subtitle: {
        en: nextCategory,
        he: nextCategory,
      },
      description: {
        en: nextDescription,
        he: nextDescription,
      },
      image: source.image || "/images/land/zmag-showcase.png",
      model3d: source.model3d || "/models/land/zmag-showcase-3d.glb",
      assetCategory: nextCategory,
      missionType: "",
      classification: {
        en: "Unclassified",
        he: 'בלמ״ס',
      },
      dimensions: "",
      weight: "",
      status: "ready",
    });
  }

  function deletePilotLandAsset() {
    const source = liveLandAssets.find(
      (item: any) =>
        item?.id === "LAND-PILOT-001" ||
        item?.code === "LAND-PILOT-001" ||
        item?.slug === "pilot-land-asset" ||
        item?.name === "Pilot Land Asset"
    );

    if (!source) {
      window.alert("Pilot asset not found.");
      return;
    }

    const confirmed = window.confirm("Delete Pilot Land Asset?");
    if (!confirmed) return;

    removeAsset(source.slug || "pilot-land-asset");
  }

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
            marginBottom: "24px",
          }}
        >
          <TopButton href="/">← Back to Main</TopButton>
          <TopButton href="/air">Go to Air</TopButton>
          <TopButton href="/space">Go to Space</TopButton>
          <button
            onClick={addPilotLandAsset}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "44px",
              padding: "0 16px",
              borderRadius: "14px",
              border: "1px solid rgba(74,222,128,0.35)",
              background: "rgba(12, 28, 20, 0.72)",
              color: "white",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: 600,
              boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
              backdropFilter: "blur(8px)",
              cursor: "pointer",
            }}
          >
            Add pilot land asset
          </button>

          <button
            onClick={editPilotLandAsset}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "44px",
              padding: "0 16px",
              borderRadius: "14px",
              border: "1px solid rgba(125,211,252,0.35)",
              background: "rgba(14, 40, 68, 0.72)",
              color: "#c4f1ff",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: 600,
              boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
              backdropFilter: "blur(8px)",
              cursor: "pointer",
            }}
          >
            Edit pilot land asset
          </button>

          <button
            onClick={deletePilotLandAsset}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "44px",
              padding: "0 16px",
              borderRadius: "14px",
              border: "1px solid rgba(248,113,113,0.35)",
              background: "rgba(60, 16, 16, 0.72)",
              color: "#fecaca",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: 600,
              boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
              backdropFilter: "blur(8px)",
              cursor: "pointer",
            }}
          >
            Delete pilot land asset
          </button>
        </div>

        <div
          style={{
            border: "1px solid rgba(125,211,252,0.18)",
            borderRadius: "26px",
            padding: "22px 22px 30px",
            background: "rgba(8, 15, 28, 0.34)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
          }}
        >
          <div style={{ marginBottom: "24px" }}>
            <div
              style={{
                fontSize: "12px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#7dd3fc",
                marginBottom: "10px",
              }}
            >
              Land Section
            </div>

            <h1
              style={{
                margin: 0,
                fontSize: "52px",
                lineHeight: 1.04,
                fontWeight: 700,
              }}
            >
              Land Assets
            </h1>

            <p
              style={{
                marginTop: "12px",
                maxWidth: "900px",
                fontSize: "17px",
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.78)",
              }}
            >
              Ground platforms, robotic systems, and mobile defense assets for
              premium exhibition presentation.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))",
              gap: "24px",
            }}
          >
            {cardAssets.map((asset) => (
              <article
                key={asset.id}
                style={{
                  borderRadius: "24px",
                  overflow: "hidden",
                  background: "rgba(9, 17, 31, 0.92)",
                  border: "1px solid rgba(125,211,252,0.22)",
                  boxShadow: "0 18px 48px rgba(0,0,0,0.34)",
                }}
              >
                <Link
                  href={`/land/${asset.slug}`}
                  style={{
                    display: "block",
                    position: "relative",
                    minHeight: "282px",
                    borderBottom: "1px solid rgba(125,211,252,0.14)",
                    background:
                      "linear-gradient(180deg, rgba(13,23,42,1) 0%, rgba(7,14,26,1) 100%)",
                    textDecoration: "none",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "radial-gradient(circle at center, rgba(59,130,246,0.18), transparent 42%)",
                    }}
                  />

                  <div
                    style={{
                      position: "absolute",
                      inset: "12px",
                      borderRadius: "18px",
                      overflow: "hidden",
                      border: "1px solid rgba(125,211,252,0.18)",
                    }}
                  >
                    <Image
                      src={asset.image}
                      alt={asset.name}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>

                </Link>

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap",
                    padding: "14px 20px 0",
                  }}
                >
                  <span
                    style={{
                      padding: "7px 12px",
                      borderRadius: "999px",
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "#dcfce7",
                      background: "rgba(34,197,94,0.16)",
                      border: "1px solid rgba(34,197,94,0.42)",
                    }}
                  >
                    {asset.status}
                  </span>

                  <span
                    style={{
                      padding: "7px 12px",
                      borderRadius: "999px",
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "#c4f1ff",
                      background: "rgba(14,165,233,0.14)",
                      border: "1px solid rgba(56,189,248,0.35)",
                    }}
                  >
                    {asset.displayType}
                  </span>

                  <span
                    style={{
                      padding: "7px 12px",
                      borderRadius: "999px",
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "white",
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.15)",
                    }}
                  >
                    {asset.scale}
                  </span>

                  <span
                    style={{
                      padding: "7px 12px",
                      borderRadius: "999px",
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "#c4f1ff",
                      background: "rgba(14,165,233,0.14)",
                      border: "1px solid rgba(56,189,248,0.35)",
                      marginLeft: "auto",
                    }}
                  >
                    3D connected
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
                        fontSize: "12px",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "#7dd3fc",
                        marginBottom: "10px",
                      }}
                    >
                      Featured Asset
                    </div>

                    <h2
                      style={{
                        margin: 0,
                        fontSize: "28px",
                        lineHeight: 1.12,
                        fontWeight: 700,
                      }}
                    >
                      {asset.name}
                    </h2>

                    <div
                      style={{
                        marginTop: "8px",
                        fontSize: "14px",
                        color: "rgba(255,255,255,0.7)",
                      }}
                    >
                      {asset.id} · {asset.category}
                    </div>

                    <p
                      style={{
                        marginTop: "14px",
                        marginBottom: 0,
                        color: "rgba(255,255,255,0.76)",
                        fontSize: "15px",
                        lineHeight: 1.6,
                        maxWidth: "95%",
                      }}
                    >
                      {asset.subtitle}
                    </p>

                    <div style={{ marginTop: "16px" }}>
                      <Link
                        href={`/land/${asset.slug}`}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          minHeight: "38px",
                          padding: "0 14px",
                          borderRadius: "999px",
                          border: "1px solid rgba(255,255,255,0.18)",
                          background: "rgba(255,255,255,0.06)",
                          color: "white",
                          textDecoration: "none",
                          fontSize: "13px",
                          fontWeight: 700,
                        }}
                      >
                        View
                      </Link>
                    </div>
                  </div>

                  <div style={{ display: "grid", gap: "10px" }}>
                    <div
                      style={{
                        padding: "12px 14px",
                        borderRadius: "16px",
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.10)",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "11px",
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: "#93c5fd",
                          marginBottom: "4px",
                        }}
                      >
                        Operational Readiness
                      </div>
                      <div style={{ fontSize: "14px", color: "white" }}>
                        {asset.readiness}
                      </div>
                    </div>

                    <div
                      style={{
                        padding: "12px 14px",
                        borderRadius: "16px",
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.10)",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "11px",
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: "#93c5fd",
                          marginBottom: "4px",
                        }}
                      >
                        Support
                      </div>
                      <div style={{ fontSize: "14px", color: "white" }}>
                        {asset.support}
                      </div>
                    </div>

                    <div
                      style={{
                        padding: "12px 14px",
                        borderRadius: "16px",
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.10)",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "11px",
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: "#93c5fd",
                          marginBottom: "4px",
                        }}
                      >
                        Presentation Level
                      </div>
                      <div style={{ fontSize: "14px", color: "white" }}>
                        {asset.presentationLevel}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
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
