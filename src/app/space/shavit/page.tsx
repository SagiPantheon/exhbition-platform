import { notFound } from "next/navigation";
import SpaceAssetPageTemplate from "../../../components/SpaceAssetPageTemplate";
import { getSpaceAssetBySlug } from "../../../data/spaceAssets";

const slug = "shavit";

export default function AssetPage() {
  const asset = getSpaceAssetBySlug(slug);

  if (!asset) {
    notFound();
  }

  return <SpaceAssetPageTemplate asset={asset} locale="en" />;
}
