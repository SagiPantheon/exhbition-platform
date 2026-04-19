export type AssetSection = "air" | "space" | "land" | "naval";

export type LocalizedText = {
  en: string;
  he: string;
};

export type AssetEditorDraft = {
  id: string;
  slug: string;
  section: AssetSection;
  code: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  description: LocalizedText;
  image: string;
  model3d?: string;
  missionType?: string;
  assetCategory?: string;
  classification?: LocalizedText;
  dimensions?: string;
  weight?: string;
  status?: "draft" | "ready";
};

export const ASSET_SECTIONS: AssetSection[] = ["air", "space", "land", "naval"];

export const SECTION_LABELS: Record<AssetSection, LocalizedText> = {
  air: { en: "Air", he: "אוויר" },
  space: { en: "Space", he: "חלל" },
  land: { en: "Land", he: "יבשה" },
  naval: { en: "Naval", he: "ים" },
};

export function makeEmptyAssetDraft(section: AssetSection): AssetEditorDraft {
  return {
    id: createEditorId(),
    slug: "",
    section,
    code: "",
    title: { en: "", he: "" },
    subtitle: { en: "", he: "" },
    description: { en: "", he: "" },
    image: "",
    model3d: "",
    missionType: "",
    assetCategory: "",
    classification: { en: "Unclassified", he: 'בלמ״ס' },
    dimensions: "",
    weight: "",
    status: "draft",
  };
}

export function createEditorId(): string {
  return `draft-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function slugifyAssetName(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function ensureDraftSlug(draft: AssetEditorDraft): AssetEditorDraft {
  if (draft.slug.trim()) return draft;
  const source = draft.title.en || draft.title.he || draft.code || draft.id;
  return {
    ...draft,
    slug: slugifyAssetName(source),
  };
}

export function validateAssetDraft(draft: AssetEditorDraft): string[] {
  const errors: string[] = [];

  if (!ASSET_SECTIONS.includes(draft.section)) {
    errors.push("Invalid section");
  }

  if (!draft.title.en.trim()) {
    errors.push("English title is required");
  }

  if (!draft.title.he.trim()) {
    errors.push("Hebrew title is required");
  }

  if (!draft.code.trim()) {
    errors.push("Asset code is required");
  }

  if (!draft.image.trim()) {
    errors.push("Image path is required");
  }

  return errors;
}

export function normalizeAssetDraft(draft: AssetEditorDraft): AssetEditorDraft {
  const next = ensureDraftSlug(draft);

  return {
    ...next,
    code: next.code.trim(),
    slug: next.slug.trim(),
    image: next.image.trim(),
    model3d: next.model3d?.trim() || "",
    missionType: next.missionType?.trim() || "",
    assetCategory: next.assetCategory?.trim() || "",
    dimensions: next.dimensions?.trim() || "",
    weight: next.weight?.trim() || "",
    title: {
      en: next.title.en.trim(),
      he: next.title.he.trim(),
    },
    subtitle: {
      en: next.subtitle.en.trim(),
      he: next.subtitle.he.trim(),
    },
    description: {
      en: next.description.en.trim(),
      he: next.description.he.trim(),
    },
    classification: {
      en: next.classification?.en?.trim() || "Unclassified",
      he: next.classification?.he?.trim() || 'בלמ״ס',
    },
    status: next.status || "draft",
  };
}

export function draftFromAsset(
  section: AssetSection,
  asset: Partial<AssetEditorDraft>
): AssetEditorDraft {
  return normalizeAssetDraft({
    ...makeEmptyAssetDraft(section),
    ...asset,
    section,
    title: {
      en: asset.title?.en || "",
      he: asset.title?.he || "",
    },
    subtitle: {
      en: asset.subtitle?.en || "",
      he: asset.subtitle?.he || "",
    },
    description: {
      en: asset.description?.en || "",
      he: asset.description?.he || "",
    },
    classification: {
      en: asset.classification?.en || "Unclassified",
      he: asset.classification?.he || 'בלמ״ס',
    },
  });
}
