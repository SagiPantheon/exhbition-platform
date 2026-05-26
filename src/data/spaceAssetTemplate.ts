import type { MasterExhibit } from "./masterExhibits";

export const spaceAssetTemplate: Partial<MasterExhibit> = {
  slug: "replace-slug",
  nameEn: "Replace English Title",
  nameHe: "החלף כותרת בעברית",
  division: "mtach",
  subdivision: "halal",
  model3d: "",
  image: "/images/replace-image.png",
  hasModel: false,
  code: "SP-XXX",
  subtitle: { en: "Replace English subtitle", he: "החלף כותרת משנה בעברית" },
  description: { en: "Replace English description", he: "החלף תיאור בעברית" },
  status: { en: "Approved", he: "מאושר" },
  config: { en: "Mock-up", he: "דגם" },
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
    environment: { en: "Indoor only", he: "לחלל פנים בלבד" },
    displayMethod: { en: "Round pedestal", he: "כן עגול" },
    support: { en: "Standard support", he: "תמיכה סטנדרטית" },
    presentationLevel: { en: "Approved showcase", he: "תצוגה מאושרת" },
    visualLanguage: { en: "Unified showcase style", he: "שפת תצוגה אחידה" },
  },
};
