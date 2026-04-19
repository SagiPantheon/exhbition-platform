import { AssetEditorDraft, draftFromAsset, normalizeAssetDraft } from "./assetEditor";

type LegacyLandAsset = {
  id?: string;
  slug?: string;
  name?: string;
  category?: string;
  subtitle?: string;
  image?: string;
  model3d?: string;
  status?: string;
  displayType?: string;
  scale?: string;
  readiness?: string;
  support?: string;
  presentationLevel?: string;
  title?: { en?: string; he?: string } | string;
  description?: { en?: string; he?: string } | string;
  assetCategory?: string;
};

export type LandCardAsset = {
  id: string;
  slug: string;
  name: string;
  category: string;
  subtitle: string;
  image: string;
  model3d: string;
  status: string;
  displayType: string;
  scale: string;
  readiness: string;
  support: string;
  presentationLevel: string;
};

function readLocalizedText(value: any): string {
  if (typeof value === "string") return value;
  if (typeof value?.en === "string" && value.en.trim()) return value.en;
  if (typeof value?.he === "string" && value.he.trim()) return value.he;
  return "";
}

export function normalizeLandAssetForCard(asset: LegacyLandAsset): LandCardAsset {
  const normalizedStatus =
    asset.status === "Approved" || asset.status === "ready" || asset.status === "Ready"
      ? "Approved"
      : asset.status === "draft" || asset.status === "Draft"
      ? "Draft"
      : asset.status || "Draft";

  return {
    id: asset.id || asset.slug || "land-draft",
    slug: asset.slug || "land-draft",
    name: asset.name || readLocalizedText(asset.title) || "New Land Asset",
    category:
      asset.category ||
      asset.assetCategory ||
      "Land asset",
    subtitle:
      asset.subtitle ||
      readLocalizedText(asset.description) ||
      "",
    image: asset.image || "",
    model3d: asset.model3d || "",
    status: normalizedStatus,
    displayType: asset.displayType || "Land display",
    scale: asset.scale || "Custom",
    readiness: asset.readiness || "Indoor / Outdoor",
    support: asset.support || "Self-standing",
    presentationLevel: asset.presentationLevel || "Premium",
  };
}

export function landAssetToDraft(asset: LegacyLandAsset): AssetEditorDraft {
  return draftFromAsset("land", {
    id: asset.id || "",
    slug: asset.slug || "",
    code: asset.id || "",
    title: {
      en: asset.name || readLocalizedText(asset.title) || "",
      he: asset.name || readLocalizedText(asset.title) || "",
    },
    subtitle: {
      en: asset.category || asset.assetCategory || "",
      he: asset.category || asset.assetCategory || "",
    },
    description: {
      en: asset.subtitle || readLocalizedText(asset.description) || "",
      he: asset.subtitle || readLocalizedText(asset.description) || "",
    },
    image: asset.image || "",
    model3d: asset.model3d || "",
    assetCategory: asset.category || asset.assetCategory || "",
    status: asset.status === "Approved" ? "ready" : "draft",
  });
}

export function draftToLandAsset(draft: AssetEditorDraft) {
  const normalized = normalizeAssetDraft(draft);

  return {
    id: normalized.id || normalized.code || `land-${normalized.slug || "draft"}`,
    slug: normalized.slug,
    name: normalized.title.en || normalized.title.he || "New Land Asset",
    category:
      normalized.assetCategory ||
      normalized.subtitle.en ||
      normalized.subtitle.he ||
      "Land asset",
    subtitle: normalized.description.en || normalized.description.he || "",
    image: normalized.image,
    model3d: normalized.model3d || "",
    status: normalized.status === "ready" ? "Approved" : "Draft",
    displayType: "",
    scale: "",
    readiness: "",
    support: "",
    presentationLevel: "Premium",
    isCustom: true,
  };
}
