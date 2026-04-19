import type { EditableSectionAsset, SectionAssetOverridesMap, SectionKey } from "../types/sectionAssets";

export const SECTION_ASSET_OVERRIDES_KEY = "section-asset-overrides-v1";

function emptyMap(): SectionAssetOverridesMap {
  return {
    air: [],
    space: [],
    land: [],
    naval: [],
  };
}

function hasSlug(value: any): value is { slug: string } {
  return !!value && typeof value === "object" && typeof value.slug === "string" && value.slug.trim().length > 0;
}

export function readSectionAssetOverrides(): SectionAssetOverridesMap {
  if (typeof window === "undefined") {
    return emptyMap();
  }

  try {
    const raw = window.localStorage.getItem(SECTION_ASSET_OVERRIDES_KEY);
    if (!raw) return emptyMap();

    const parsed = JSON.parse(raw);

    return {
      air: Array.isArray(parsed?.air) ? parsed.air.filter(hasSlug) : [],
      space: Array.isArray(parsed?.space) ? parsed.space.filter(hasSlug) : [],
      land: Array.isArray(parsed?.land) ? parsed.land.filter(hasSlug) : [],
      naval: Array.isArray(parsed?.naval) ? parsed.naval.filter(hasSlug) : [],
    };
  } catch {
    return emptyMap();
  }
}

export function writeSectionAssetOverrides(value: SectionAssetOverridesMap) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SECTION_ASSET_OVERRIDES_KEY, JSON.stringify(value));
}

export function upsertSectionAsset(
  current: SectionAssetOverridesMap,
  section: SectionKey,
  asset: EditableSectionAsset
): SectionAssetOverridesMap {
  if (!hasSlug(asset)) return current;

  const list = Array.isArray(current[section]) ? current[section].filter(hasSlug) : [];
  const exists = list.some((item) => item.slug === asset.slug);

  return {
    ...current,
    [section]: exists
      ? list.map((item) => (item.slug === asset.slug ? { ...item, ...asset } : item))
      : [{ ...asset, isCustom: asset.isCustom ?? true }, ...list],
  };
}

export function mergeSectionAssets<T extends { slug: string }>(
  baseAssets: T[],
  overrides: EditableSectionAsset[]
) {
  const safeBase = (Array.isArray(baseAssets) ? baseAssets : []).filter(hasSlug);
  const safeOverrides = (Array.isArray(overrides) ? overrides : []).filter(hasSlug);

  const overrideMap = new Map(safeOverrides.map((item) => [item.slug, item]));
  const mergedBase = safeBase.map((item) =>
    overrideMap.has(item.slug) ? { ...item, ...overrideMap.get(item.slug) } : item
  );

  const customOnly = safeOverrides.filter(
    (item) => !safeBase.some((base) => base.slug === item.slug)
  );

  return [...mergedBase, ...customOnly].filter(hasSlug);
}
