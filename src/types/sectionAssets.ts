export type SectionKey = "air" | "space" | "land" | "naval";

export type EditableSectionAsset = {
  id?: string;
  slug: string;
  name?: string;
  title?: {
    en?: string;
    he?: string;
  };
  subtitle?: string | {
    en?: string;
    he?: string;
  };
  description?: {
    en?: string;
    he?: string;
  };
  image: string;
  model3d?: string;
  status?: string | { en?: string; he?: string };
  scale?: string;
  category?: string;
  assetCategory?: string;
  missionType?: string;
  displayType?: string;
  config?: string | { en?: string; he?: string };
  readiness?: any;
  support?: string;
  presentationLevel?: string;
  specs?: Record<string, string>;
  isCustom?: boolean;
};

export type SectionAssetOverridesMap = Record<SectionKey, EditableSectionAsset[]>;
