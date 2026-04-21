"use client";

import { notFound, useParams } from "next/navigation";
import SpaceAssetPageTemplate from "../../../components/SpaceAssetPageTemplate";
import { spaceAssets, type SpaceAsset } from "../../../data/spaceAssets";
import { useSectionAssets } from "../../../hooks/useSectionAssets";

export default function SpaceAssetPage() {
  const params = useParams<{ slug: string }>();
  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug ?? "";

  const {
    assets: liveSpaceAssets,
    saveAsset,
    removeAsset,
  } = useSectionAssets("space", spaceAssets);

  const asset = liveSpaceAssets.find((item) => item.slug === slug) as
    | SpaceAsset
    | undefined;

  if (!asset) {
    notFound();
  }

  function handleEdit() {
    const titleEn = window.prompt("Title EN", asset.title.en);
    if (titleEn === null) return;

    const titleHe = window.prompt("Title HE", asset.title.he);
    if (titleHe === null) return;

    const subtitleEn = window.prompt("Subtitle EN", asset.subtitle.en);
    if (subtitleEn === null) return;

    const subtitleHe = window.prompt("Subtitle HE", asset.subtitle.he);
    if (subtitleHe === null) return;

    const descriptionEn = window.prompt("Description EN", asset.description.en);
    if (descriptionEn === null) return;

    const descriptionHe = window.prompt("Description HE", asset.description.he);
    if (descriptionHe === null) return;

    const statusEn = window.prompt("Status EN", asset.status.en);
    if (statusEn === null) return;

    const statusHe = window.prompt("Status HE", asset.status.he);
    if (statusHe === null) return;

    const configEn = window.prompt("Config EN", asset.config.en);
    if (configEn === null) return;

    const configHe = window.prompt("Config HE", asset.config.he);
    if (configHe === null) return;

    const scale = window.prompt("Scale", asset.scale);
    if (scale === null) return;

    const height = window.prompt("Height", asset.specs.height);
    if (height === null) return;

    const width = window.prompt("Width", asset.specs.width);
    if (width === null) return;

    const length = window.prompt("Length", asset.specs.length);
    if (length === null) return;

    const weight = window.prompt("Weight", asset.specs.weight);
    if (weight === null) return;

    const standDiameter = window.prompt("Stand diameter / stand size", asset.specs.standDiameter);
    if (standDiameter === null) return;

    const standWeight = window.prompt("Stand weight", asset.specs.standWeight);
    if (standWeight === null) return;

    saveAsset({
      ...asset,
      title: { en: titleEn, he: titleEn },
      subtitle: { en: subtitleEn, he: subtitleEn },
      description: { en: descriptionEn, he: descriptionEn },
      status: { en: statusEn, he: statusEn },
      config: { en: configEn, he: configEn },
      scale,
      specs: {
        ...asset.specs,
        height,
        width,
        length,
        weight,
        standDiameter,
        standWeight,
      },
    });
  }

  function handleReset() {
    const ok = window.confirm(
      "Reset this Space asset detail page back to its original base data?"
    );
    if (!ok) return;
    removeAsset(asset.slug);
  }

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 16,
          right: 16,
          zIndex: 99999,
          display: "flex",
          gap: 12,
          padding: 12,
          borderRadius: 16,
          background: "rgba(10,16,35,0.92)",
          border: "1px solid rgba(255,255,255,0.18)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
          backdropFilter: "blur(10px)",
        }}
      >
        <button
          type="button"
          onClick={handleEdit}
          style={{
            padding: "10px 14px",
            borderRadius: 12,
            border: "1px solid rgba(251,191,36,0.45)",
            background: "rgba(251,191,36,0.16)",
            color: "#fff7d6",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Edit Space Data
        </button>

        <button
          type="button"
          onClick={handleReset}
          style={{
            padding: "10px 14px",
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.2)",
            background: "rgba(255,255,255,0.08)",
            color: "white",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Reset
        </button>
      </div>

      <SpaceAssetPageTemplate asset={asset} />
    </>
  );
}
