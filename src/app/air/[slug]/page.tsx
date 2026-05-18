import { notFound } from "next/navigation";
import { getAirAssetBySlug, getAllAirAssetSlugs } from "../../../lib/air-utils";
import AirAssetDetailClient from "../../../components/air/AirAssetDetailClient";

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

  return <AirAssetDetailClient asset={asset as any} viewerSrc={viewerSrc} />;
}
