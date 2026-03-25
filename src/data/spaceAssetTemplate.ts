// Template reference for creating a new space asset.
// Copy this structure into src/data/spaceAssets.ts and replace all placeholder values.
// This file is not used directly by the catalog; it exists as a safe data-entry blueprint.

import type { SpaceAsset } from "./spaceAssets";

export const spaceAssetTemplate: SpaceAsset = {
  slug: "replace-slug",
  code: "SP-XXX",
  image: "/images/replace-image.png",

  title: {
    en: "Replace English Title",
    he: "החלף כותרת בעברית",
  },

  subtitle: {
    en: "Replace English subtitle",
    he: "החלף כותרת משנה בעברית",
  },

  description: {
    en: "Replace English description",
    he: "החלף תיאור בעברית",
  },

  status: {
    en: "Approved",
    he: "מאושר",
  },

  config: {
    en: "Mock-up",
    he: "דגם",
  },

  scale: "1:2",

  specs: {
    height: "0.00 m",
    width: "0.00 m",
    length: "0.00 m",
    weight: "0 kg",
    standDiameter: "0.00 m",
    standWeight: "0 kg",
  },

  readiness: {
    environment: {
      en: "Indoor only",
      he: "לחלל פנים בלבד",
    },
    displayMethod: {
      en: "Round pedestal",
      he: "כן עגול",
    },
    support: {
      en: "Standard support",
      he: "תמיכה סטנדרטית",
    },
    presentationLevel: {
      en: "Approved showcase",
      he: "תצוגה מאושרת",
    },
    visualLanguage: {
      en: "Unified showcase style",
      he: "שפת תצוגה אחידה",
    },
  },
};
