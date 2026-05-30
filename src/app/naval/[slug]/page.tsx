import { notFound } from "next/navigation";
import { masterExhibits } from "../../../data/masterExhibits";
import AssetDetailClient, { type AssetDetailData } from "../../../components/common/AssetDetailClient";

const eltaAssets: (AssetDetailData & { model3d?: string })[] = masterExhibits
  .filter((e) => e.division === "elta")
  .map((e, i) => ({
    slug: e.slug,
    title: { en: e.nameEn, he: e.nameHe },
    subtitle: e.subtitle ?? { en: `${e.nameEn} — ELTA exhibition asset.`, he: `${e.nameHe}` },
    description: e.description ?? { en: "", he: "" },
    code: `ELTA-${String(i + 1).padStart(3, "0")}`,
    scale: e.scale ?? "1:1",
    status: e.status ?? { en: "Approved", he: "מאושר" },
    config: e.config ?? { en: "ELTA display", he: "תצוגת אלתא" },
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
    <AssetDetailClient
      asset={asset}
      viewerSrc={asset.model3d}
      division="naval"
    />
  );
}
