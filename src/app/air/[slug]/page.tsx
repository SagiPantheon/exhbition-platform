import { notFound } from "next/navigation";
import { getAirAssetBySlug, getAllAirAssetSlugs } from "../../../lib/air-utils";
import AssetDetailClient, { type AssetDetailData } from "../../../components/common/AssetDetailClient";

export function generateStaticParams() {
  return getAllAirAssetSlugs().map((slug) => ({ slug }));
}

export default async function AirAssetDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const asset = getAirAssetBySlug(slug);

  if (!asset) {
    notFound();
  }

  const viewerSrc =
    asset.slug === "arrow-3-missile"
      ? "/models/air/arrow-3-launcher.glb"
      : asset.slug === "arrow-3-launcher"
        ? "/models/air/arrow-3-showcase-3d.glb"
        : asset.slug === "mmr"
          ? "/models/air/mmr.glb"
          : asset.model3d;

  const detail: AssetDetailData = {
    slug: asset.slug,
    title: asset.title,
    subtitle: asset.subtitle,
    description: asset.description,
    code: asset.code,
    scale: asset.scale,
    status: asset.status,
    config: asset.config,
    image: asset.image,
    model3d: asset.model3d,
    specs: asset.specs,
    readiness: asset.readiness,
  };

  return <AssetDetailClient asset={detail} viewerSrc={viewerSrc} division="air" />;
}
