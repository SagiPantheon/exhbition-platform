import { notFound } from "next/navigation";
import { masterExhibits } from "../../../data/masterExhibits";
import AssetDetailClient, { type AssetDetailData } from "../../../components/common/AssetDetailClient";

const katazAssets: (AssetDetailData & { model3d?: string })[] = masterExhibits
  .filter((e) => e.division === "kataz")
  .map((e, i) => ({
    slug: e.slug,
    title: { en: e.nameEn, he: e.nameHe },
    subtitle: e.subtitle ?? { en: `${e.nameEn} — KATAZ exhibition asset.`, he: `${e.nameHe}` },
    description: e.description ?? { en: "", he: "" },
    code: `KATAZ-${String(i + 1).padStart(3, "0")}`,
    scale: e.scale ?? "1:1",
    status: e.status ?? { en: "Approved", he: "מאושר" },
    config: e.config ?? { en: "UAV display", he: "תצוגת כטב\"ם" },
    image: e.image,
    model3d: e.model3d,
    specs: {
      length: e.specs?.length ?? "TBD",
      width: e.specs?.width ?? "TBD",
      height: e.specs?.height ?? "TBD",
      weight: e.specs?.weight ?? "TBD",
      standDiameter: e.specs?.standDiameter ?? "N/A",
      standWeight: e.specs?.standWeight ?? "N/A",
    },
    readiness: e.readiness ?? {},
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
    <AssetDetailClient
      asset={asset}
      viewerSrc={asset.model3d}
      division="land"
    />
  );
}
