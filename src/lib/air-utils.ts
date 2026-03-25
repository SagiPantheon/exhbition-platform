import { airAssets } from "../data/airAssets";

export function getAirAssetBySlug(slug: string) {
  return airAssets.find((asset) => asset.slug === slug);
}

export function getAllAirAssetSlugs() {
  return airAssets.map((asset) => asset.slug);
}
