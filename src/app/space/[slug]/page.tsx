import { notFound } from "next/navigation";
import SpaceAssetPageTemplate from "../../../components/SpaceAssetPageTemplate";
import { getSpaceAssetBySlug } from "../../../data/spaceAssets";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function SpaceAssetPage({ params }: PageProps) {
  const { slug } = await params;
  const asset = getSpaceAssetBySlug(slug);

  if (!asset) {
    notFound();
  }

  return <SpaceAssetPageTemplate asset={asset} />;
}
