"use client";

import { notFound, useParams } from "next/navigation";
import SpaceAssetPageTemplate from "../../../../components/SpaceAssetPageTemplate";
import { masterExhibits, toSpaceAsset, type SpaceAsset } from "../../../../data/masterExhibits";
import { useSectionAssets } from "../../../../hooks/useSectionAssets";

const spaceAssets = masterExhibits
  .filter((e) => e.division === "mtach" && e.subdivision === "halal")
  .map(toSpaceAsset);

export default function HebrewSpaceAssetPage() {
  const params = useParams<{ slug: string }>();
  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug ?? "";

  const { assets: liveSpaceAssets } = useSectionAssets("space", spaceAssets);

  const asset = liveSpaceAssets.find((item) => item.slug === slug) as
    | SpaceAsset
    | undefined;

  if (!asset) {
    notFound();
  }

  return <SpaceAssetPageTemplate asset={asset} locale="he" />;
}
