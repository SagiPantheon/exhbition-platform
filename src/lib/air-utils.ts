import { masterExhibits, toAirAsset, getAirAssetBySlug, getAllAirAssetSlugs, type AirAsset } from "../data/masterExhibits";

export type { AirAsset };

export function getAllAirAssets(): AirAsset[] {
  return masterExhibits.filter((e) => e.division !== "inventory").map(toAirAsset);
}

export { getAirAssetBySlug, getAllAirAssetSlugs };
