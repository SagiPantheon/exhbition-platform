import {
  AssetEditorDraft,
  AssetSection,
  draftFromAsset,
  normalizeAssetDraft,
} from "./assetEditor";

function readLocalized(value: any) {
  if (typeof value === "string") {
    return { en: value, he: value };
  }

  return {
    en: typeof value?.en === "string" ? value.en : "",
    he: typeof value?.he === "string" ? value.he : "",
  };
}

export function sectionAssetToDraft(
  section: AssetSection,
  asset: Record<string, any>
): AssetEditorDraft {
  return draftFromAsset(section, {
    id: typeof asset?.id === "string" ? asset.id : "",
    slug: typeof asset?.slug === "string" ? asset.slug : "",
    section,
    code: typeof asset?.code === "string" ? asset.code : "",
    title: readLocalized(asset?.title),
    subtitle: readLocalized(asset?.subtitle),
    description: readLocalized(asset?.description),
    classification: readLocalized(asset?.classification),
    image: typeof asset?.image === "string" ? asset.image : "",
    model3d: typeof asset?.model3d === "string" ? asset.model3d : "",
    missionType: typeof asset?.missionType === "string" ? asset.missionType : "",
    assetCategory: typeof asset?.assetCategory === "string" ? asset.assetCategory : "",
    dimensions: typeof asset?.dimensions === "string" ? asset.dimensions : "",
    weight: typeof asset?.weight === "string" ? asset.weight : "",
    status: asset?.status === "ready" ? "ready" : "draft",
  });
}

export function draftToSectionAsset(draft: AssetEditorDraft) {
  const normalized = normalizeAssetDraft(draft);

  return {
    id: normalized.id,
    slug: normalized.slug,
    code: normalized.code,
    title: normalized.title,
    subtitle: normalized.subtitle,
    description: normalized.description,
    classification: normalized.classification,
    image: normalized.image,
    model3d: normalized.model3d || "",
    missionType: normalized.missionType || "",
    assetCategory: normalized.assetCategory || "",
    dimensions: normalized.dimensions || "",
    weight: normalized.weight || "",
    status: normalized.status || "draft",
    isCustom: true,
  };
}
