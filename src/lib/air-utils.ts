import { allAirAssets } from "../data/airAssets";

export function getAirAssetBySlug(slug: string) {
  return allAirAssets.find((asset) => asset.slug === slug);
}

export function getAllAirAssetSlugs() {
  return allAirAssets.map((asset) => asset.slug);
}
