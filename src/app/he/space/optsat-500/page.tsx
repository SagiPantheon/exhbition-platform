import { notFound } from "next/navigation";
import SpaceAssetPageTemplate from "../../../../components/SpaceAssetPageTemplate";
import { getSpaceAssetBySlug } from "../../../../data/spaceAssets";

const slug = "optsat-500";

export default function HebrewAssetPage() {
  const asset = getSpaceAssetBySlug(slug);

  if (!asset) {
    notFound();
  }

  return <SpaceAssetPageTemplate asset={asset} locale="he" />;
}
