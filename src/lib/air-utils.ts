import { airAssets } from "../data/airAssets";
import { autoAirAssets } from "../data/airAutoAssets";

type AnyAirAsset = {
  slug: string;
  [key: string]: any;
};

function isValidAirAsset(value: unknown): value is AnyAirAsset {
  return (
    !!value &&
    typeof value === "object" &&
    "slug" in value &&
    typeof (value as any).slug === "string" &&
    (value as any).slug.trim().length > 0
  );
}

export function getAllAirAssets(): AnyAirAsset[] {
  const manual = Array.isArray(airAssets) ? airAssets : [];
  const auto = Array.isArray(autoAirAssets) ? autoAirAssets : [];

  const merged = [...manual, ...auto].filter(isValidAirAsset);

  const seen = new Set<string>();
  return merged.filter((asset) => {
    if (seen.has(asset.slug)) return false;
    seen.add(asset.slug);
    return true;
  });
}

export function getAirAssetBySlug(slug: string) {
  return getAllAirAssets().find((asset) => asset.slug === slug);
}

export function getAllAirAssetSlugs(): string[] {
  return getAllAirAssets().map((asset) => asset.slug);
}
