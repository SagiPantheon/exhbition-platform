"use client";

import { notFound, useParams } from "next/navigation";
import SpaceAssetPageTemplate from "../../../../components/SpaceAssetPageTemplate";
import { spaceAssets, type SpaceAsset } from "../../../../data/spaceAssets";
import { useSectionAssets } from "../../../../hooks/useSectionAssets";

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
