export type MasterExhibitDivision = "air" | "land" | "naval" | "space" | "inventory" | "teufa" | "mtach" | "elta" | "kataz";

export type LocalizedText = { en: string; he: string };

export type MasterExhibit = {
  slug: string;
  nameHe: string;
  nameEn: string;
  division: MasterExhibitDivision;
  subdivision?: string;
  model3d: string;
  image: string;
  hasModel: boolean;
  code?: string;
  subtitle?: LocalizedText;
  description?: LocalizedText;
  status?: LocalizedText;
  config?: LocalizedText;
  scale?: string;
  specs?: {
    height?: string;
    width?: string;
    length?: string;
    weight?: string;
    standDiameter?: string;
    standWeight?: string;
  };
  readiness?: {
    environment?: LocalizedText;
    displayMethod?: LocalizedText;
    support?: LocalizedText;
    presentationLevel?: LocalizedText;
    visualLanguage?: LocalizedText;
  };
  notes?: string;
};

export type SpaceAsset = {
  slug: string;
  code: string;
  image: string;
  model3d?: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  description: LocalizedText;
  status: LocalizedText;
  config: LocalizedText;
  scale: string;
  specs: {
    height: string;
    width: string;
    length: string;
    weight: string;
    standDiameter: string;
    standWeight: string;
  };
  readiness: {
    environment: LocalizedText;
    displayMethod: LocalizedText;
    support: LocalizedText;
    presentationLevel: LocalizedText;
    visualLanguage: LocalizedText;
  };
};

export function toSpaceAsset(e: MasterExhibit): SpaceAsset {
  return {
    slug: e.slug,
    code: e.code ?? "",
    image: e.image,
    model3d: e.model3d || undefined,
    title: { en: e.nameEn, he: e.nameHe },
    subtitle: e.subtitle ?? { en: "", he: "" },
    description: e.description ?? { en: "", he: "" },
    status: e.status ?? { en: "Approved", he: "מאושר" },
    config: e.config ?? { en: "Mock-up", he: "דגם" },
    scale: e.scale ?? "",
    specs: {
      height: e.specs?.height ?? "",
      width: e.specs?.width ?? "",
      length: e.specs?.length ?? "",
      weight: e.specs?.weight ?? "",
      standDiameter: e.specs?.standDiameter ?? "",
      standWeight: e.specs?.standWeight ?? "",
    },
    readiness: {
      environment: e.readiness?.environment ?? { en: "", he: "" },
      displayMethod: e.readiness?.displayMethod ?? { en: "", he: "" },
      support: e.readiness?.support ?? { en: "", he: "" },
      presentationLevel: e.readiness?.presentationLevel ?? { en: "", he: "" },
      visualLanguage: e.readiness?.visualLanguage ?? { en: "", he: "" },
    },
  };
}

export function getSpaceAssetBySlug(slug: string): SpaceAsset | undefined {
  const e = masterExhibits.find(
    (x) => x.slug === slug && x.division === "mtach"
  );
  return e ? toSpaceAsset(e) : undefined;
}

export type AirAsset = {
  slug: string;
  code: string;
  image: string;
  model3d?: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  description: LocalizedText;
  status: LocalizedText;
  config: LocalizedText;
  scale: string;
  specs: {
    height: string;
    width: string;
    length: string;
    weight: string;
    standDiameter: string;
    standWeight: string;
  };
  readiness: {
    environment: LocalizedText;
    displayMethod: LocalizedText;
    support: LocalizedText;
    presentationLevel: LocalizedText;
    visualLanguage: LocalizedText;
  };
};

export function toAirAsset(e: MasterExhibit): AirAsset {
  return {
    slug: e.slug,
    code: e.code ?? "",
    image: e.image,
    model3d: e.model3d || undefined,
    title: { en: e.nameEn, he: e.nameHe },
    subtitle: e.subtitle ?? { en: e.nameEn, he: e.nameHe },
    description: e.description ?? { en: "", he: "" },
    status: e.status ?? { en: "Approved", he: "מאושר" },
    config: e.config ?? { en: "Air display", he: "תצוגת אוויר" },
    scale: e.scale ?? "1:1",
    specs: {
      height: e.specs?.height ?? "TBD",
      width: e.specs?.width ?? "TBD",
      length: e.specs?.length ?? "TBD",
      weight: e.specs?.weight ?? "TBD",
      standDiameter: e.specs?.standDiameter ?? "N/A",
      standWeight: e.specs?.standWeight ?? "N/A",
    },
    readiness: {
      environment: e.readiness?.environment ?? { en: "Indoor / Outdoor", he: "פנים / חוץ" },
      displayMethod: e.readiness?.displayMethod ?? { en: "Static display", he: "תצוגה סטטית" },
      support: e.readiness?.support ?? { en: "Self-standing", he: "עצמאי" },
      presentationLevel: e.readiness?.presentationLevel ?? { en: "Standard", he: "סטנדרטי" },
      visualLanguage: e.readiness?.visualLanguage ?? { en: "Air defense showcase", he: "תצוגת הגנ״א" },
    },
  };
}

export function getAirAssetBySlug(slug: string): AirAsset | undefined {
  const e = masterExhibits.find((x) => x.slug === slug && x.division !== "inventory");
  return e ? toAirAsset(e) : undefined;
}

export function getAllAirAssetSlugs(): string[] {
  return masterExhibits.filter((e) => e.division !== "inventory").map((e) => e.slug);
}

export const masterExhibits: MasterExhibit[] = [
  // ── SPACE (7) ──────────────────────────────────────────────────────────────
  {
    slug: "mcs", division: "mtach", subdivision: "halal", nameEn: "MCS", nameHe: "MCS",
    model3d: "/models/space/mcs-showcase-3d.glb", image: "/images/space/mcs-showcase.png", hasModel: true,
    code: "SP-004",
    subtitle: { en: "Premium technical showcase panel for the current MCS exhibition mock-up.", he: "פאנל תצוגה טכני מתקדם עבור דגם התערוכה הנוכחי של MCS." },
    description: { en: "Arrow-3 style presentation language with defense-tech visual treatment and readiness for future interactive 3D asset presentation.", he: "שפת תצוגה בסגנון חץ 3 עם אופי ויזואלי טכנולוגי-ביטחוני ומוכנות עתידית להצגה אינטראקטיבית תלת-ממדית." },
    status: { en: "Approved", he: "מאושר" }, config: { en: "Mock-up", he: "דגם" }, scale: "1:2",
    specs: { height: "2.0 m", width: "1.6 m", length: "1.0 m", weight: "37 kg", standDiameter: "1.0–1.2 m", standWeight: "50 kg" },
    readiness: { environment: { en: "Indoor only", he: "לתצוגת פנים בלבד" }, displayMethod: { en: "Round pedestal", he: "כן עגול" }, support: { en: "Vertical pipe", he: "צינור אנכי" }, presentationLevel: { en: "Approved showcase", he: "תצוגה מאושרת" }, visualLanguage: { en: "Arrow-3 style panel", he: "פאנל בסגנון חץ 3" } },
  },
  {
    slug: "optsat-500", division: "mtach", subdivision: "halal", nameEn: "OPTSAT-500", nameHe: "OPTSAT-500",
    model3d: "/models/space/optsat-500-showcase-3d.glb", image: "/images/space/optsat-500-showcase.png", hasModel: true,
    code: "SP-001",
    subtitle: { en: "Electro-optical observation satellite mock-up for indoor exhibition showcase.", he: "דגם לוויין תצפית אלקטרו-אופטי לתצוגת פנים בתערוכה." },
    description: { en: "Prepared for static display planning, supplier coordination, and future exhibition configuration work.", he: "מוכן לתכנון תצוגה סטטית, תיאום מול ספקים ועבודת קונפיגורציה עתידית לתערוכות." },
    status: { en: "Approved", he: "מאושר" }, config: { en: "Mock-up", he: "דגם" }, scale: "1:2",
    specs: { height: "1.0 m", width: "0.8 m", length: "0.8 m", weight: "15 kg", standDiameter: "0.9 m", standWeight: "30 kg" },
    readiness: { environment: { en: "Indoor only", he: "לתצוגת פנים בלבד" }, displayMethod: { en: "Original stand", he: "סטנד מקורי" }, support: { en: "Central pipe", he: "צינור מרכזי" }, presentationLevel: { en: "Approved showcase", he: "תצוגה מאושרת" }, visualLanguage: { en: "Space panel", he: "פאנל חלל" } },
  },
  {
    slug: "optsar-550", division: "mtach", subdivision: "halal", nameEn: "OPTSAR-550", nameHe: "OPTSAR-550",
    model3d: "/models/space/optsar-550-showcase-3d.glb", image: "/images/space/optsar-550-showcase.png", hasModel: true,
    code: "SP-002",
    subtitle: { en: "Advanced reconnaissance platform mock-up for premium indoor exhibition presentation.", he: "דגם פלטפורמת סיור מתקדמת לתצוגת פנים פרימיום." },
    description: { en: "Structured for planning, mock-up handling, display readiness checks, and exhibition approvals.", he: "בנוי לתכנון, טיפול בדגם, בדיקות מוכנות לתצוגה ואישורי תערוכה." },
    status: { en: "Approved", he: "מאושר" }, config: { en: "Mock-up", he: "דגם" }, scale: "1:2",
    specs: { height: "2.15 m", width: "0.75 m", length: "0.75 m", weight: "20 kg", standDiameter: "1.0 m", standWeight: "42 kg" },
    readiness: { environment: { en: "Indoor only", he: "לתצוגת פנים בלבד" }, displayMethod: { en: "Round pedestal", he: "כן עגול" }, support: { en: "Vertical pole", he: "עמוד אנכי" }, presentationLevel: { en: "Approved showcase", he: "תצוגה מאושרת" }, visualLanguage: { en: "Arrow-3 style panel", he: "פאנל בסגנון חץ 3" } },
  },
  {
    slug: "optsat-3000", division: "mtach", subdivision: "halal", nameEn: "OPTSAT 3000", nameHe: "OPTSAT 3000",
    model3d: "/models/space/optsat-3000-showcase-3d.glb", image: "/images/space/optsat-3000-showcase.png", hasModel: true,
    code: "SP-003",
    subtitle: { en: "High-capacity electro-optical satellite mock-up for exhibition display and logistics planning.", he: "דגם לוויין אלקטרו-אופטי בעל קיבולת גבוהה לתצוגה ולתכנון לוגיסטי." },
    description: { en: "Built for logistics planning, display preparation, supplier coordination, and exhibition approval flow.", he: "נבנה עבור תכנון לוגיסטי, הכנת תצוגה, תיאום ספקים ותהליך אישורים לתערוכה." },
    status: { en: "Approved", he: "מאושר" }, config: { en: "Mock-up", he: "דגם" }, scale: "1:2",
    specs: { height: "2.2 m", width: "1.1 m", length: "1.1 m", weight: "35 kg", standDiameter: "1.1 m", standWeight: "55 kg" },
    readiness: { environment: { en: "Indoor only", he: "לתצוגת פנים בלבד" }, displayMethod: { en: "Square stand", he: "סטנד מרובע" }, support: { en: "Central support", he: "תמיכה מרכזית" }, presentationLevel: { en: "Approved showcase", he: "תצוגה מאושרת" }, visualLanguage: { en: "Large showcase panel", he: "פאנל תצוגה גדול" } },
  },
  {
    slug: "tecsar", division: "mtach", subdivision: "halal", nameEn: "TECSAR", nameHe: "TECSAR",
    model3d: "/models/space/tecsar-showcase-3d.glb", image: "/images/space/tecsar-showcase.png", hasModel: true,
    code: "SP-005",
    subtitle: { en: "Synthetic aperture radar satellite mock-up for exhibition presentation and technical storytelling.", he: "דגם לוויין מכ״ם מפתח סינתטי לתצוגה ולהמחשה טכנית." },
    description: { en: "Supports radar-platform presentation logic, indoor logistics coordination, and premium technical display planning.", he: "תומך בלוגיקת הצגת פלטפורמת מכ״ם, תיאום לוגיסטי פנימי ותכנון תצוגה טכנית מתקדמת." },
    status: { en: "Approved", he: "מאושר" }, config: { en: "Mock-up", he: "דגם" }, scale: "1:2",
    specs: { height: "2.0 m", width: "1.4 m", length: "1.0 m", weight: "37 kg", standDiameter: "1.0–1.2 m", standWeight: "50 kg" },
    readiness: { environment: { en: "Indoor only", he: "לתצוגת פנים בלבד" }, displayMethod: { en: "Original stand", he: "סטנד מקורי" }, support: { en: "Vertical pipe", he: "צינור אנכי" }, presentationLevel: { en: "Approved showcase", he: "תצוגה מאושרת" }, visualLanguage: { en: "Photo-to-panel display", he: "תצוגת צילום-לפאנל" } },
  },
  {
    slug: "beresheet", division: "mtach", subdivision: "halal", nameEn: "Beresheet", nameHe: "בראשית",
    model3d: "/models/space/beresheet-showcase-3d.glb", image: "/images/space/beresheet-showcase.png", hasModel: true,
    code: "SP-006",
    subtitle: { en: "Lunar lander mock-up for premium mission-story exhibition display.", he: "דגם נחתת ירח לתצוגת פרימיום עם סיפור משימה." },
    description: { en: "Designed for exhibition presentation, mission storytelling, logistics planning, and approval coordination.", he: "מיועד להצגת תערוכה, סיפור משימה, תכנון לוגיסטי ותיאום אישורים." },
    status: { en: "Approved", he: "מאושר" }, config: { en: "Mock-up", he: "דגם" }, scale: "1:2",
    specs: { height: "1.8 m", width: "1.5 m", length: "1.5 m", weight: "40 kg", standDiameter: "1.3 m", standWeight: "58 kg" },
    readiness: { environment: { en: "Indoor only", he: "לתצוגת פנים בלבד" }, displayMethod: { en: "Round podium", he: "פודיום עגול" }, support: { en: "Integrated legs", he: "רגליים משולבות" }, presentationLevel: { en: "Approved showcase", he: "תצוגה מאושרת" }, visualLanguage: { en: "Mission panel", he: "פאנל משימה" } },
  },
  {
    slug: "shavit", division: "mtach", subdivision: "halal", nameEn: "Shavit", nameHe: "שביט",
    model3d: "/models/space/shavit-showcase-3d.glb", image: "/images/space/shavit-showcase.png", hasModel: true,
    code: "SP-007",
    subtitle: { en: "Launcher mock-up for vertical premium exhibition presentation.", he: "דגם משגר לתצוגת פרימיום אנכית בתערוכה." },
    description: { en: "Structured for safe indoor exhibition handling, vertical presentation logic, and display coordination.", he: "בנוי לטיפול בטוח בתצוגת פנים, לוגיקת הצגה אנכית ותיאום תצוגה." },
    status: { en: "Approved", he: "מאושר" }, config: { en: "Mock-up", he: "דגם" }, scale: "1:3",
    specs: { height: "3.4 m", width: "0.55 m", length: "0.55 m", weight: "32 kg", standDiameter: "0.9 m", standWeight: "45 kg" },
    readiness: { environment: { en: "Indoor only", he: "לתצוגת פנים בלבד" }, displayMethod: { en: "Vertical stand", he: "סטנד אנכי" }, support: { en: "Rear support", he: "תמיכת גב אחורית" }, presentationLevel: { en: "Approved showcase", he: "תצוגה מאושרת" }, visualLanguage: { en: "Launcher panel", he: "פאנל משגר" } },
  },

  // ── AIR — מט"ח / tilim ────────────────────────────────────────────────────
  {
    slug: "arrow-2", division: "mtach", subdivision: "malam", nameEn: "Arrow 2", nameHe: "חץ 2",
    model3d: "/models/air/arrow-2-showcase-3d.glb", image: "/images/air/arrow-2-showcase.png", hasModel: true,
    code: "AR-003",
    subtitle: { en: "Strategic interceptor missile mock-up for premium exhibition presentation.", he: "דגם טיל יירוט אסטרטגי לתצוגת פרימיום בתערוכה." },
    description: { en: "Prepared for premium exhibition display, strategic defense storytelling, and future presentation planning in the missile systems category.", he: "מוכן לתצוגת פרימיום, המחשת מערך הגנה אסטרטגי ותכנון עתידי של הצגה בקטגוריית מערכות טילים." },
    status: { en: "Approved", he: "מאושר" }, config: { en: "Missile display", he: "תצוגת טיל" }, scale: "1:1",
    specs: { length: "7.0 m", width: "0.8 m", height: "7.0 m", weight: "TBD", standDiameter: "N/A", standWeight: "N/A" },
    readiness: { environment: { en: "Indoor / outdoor", he: "פנים / חוץ" }, displayMethod: { en: "Vertical missile stand", he: "סטנד טיל אנכי" }, support: { en: "Integrated base support", he: "תמיכה מובנית בבסיס" }, presentationLevel: { en: "Premium", he: "פרימיום" }, visualLanguage: { en: "Strategic missile showcase", he: "תצוגת טיל אסטרטגי" } },
  },
  {
    slug: "arrow-3-missile", division: "mtach", subdivision: "malam", nameEn: "Arrow 3", nameHe: "חץ 3",
    model3d: "/models/air/arrow-3-showcase-3d.glb", image: "/images/air/arrow-3-showcase.png", hasModel: true,
    code: "AR-004",
    subtitle: { en: "Strategic exo-atmospheric interceptor missile mock-up for premium exhibition presentation.", he: "דגם טיל יירוט אקסו-אטמוספרי אסטרטגי לתצוגת פרימיום בתערוכה." },
    description: { en: "Prepared for premium exhibition display, strategic missile storytelling, and future presentation planning in the air-defense systems category.", he: "מוכן לתצוגת פרימיום, המחשת מערך טילים אסטרטגי ותכנון עתידי של הצגה בקטגוריית מערכות ההגנה האווירית." },
    status: { en: "Approved", he: "מאושר" }, config: { en: "Missile display", he: "תצוגת טיל" }, scale: "1:1",
    specs: { length: "7.0 m", width: "0.8 m", height: "7.0 m", weight: "TBD", standDiameter: "N/A", standWeight: "N/A" },
    readiness: { environment: { en: "Indoor / outdoor", he: "פנים / חוץ" }, displayMethod: { en: "Vertical missile stand", he: "סטנד טיל אנכי" }, support: { en: "Integrated base support", he: "תמיכה מובנית בבסיס" }, presentationLevel: { en: "Premium", he: "פרימיום" }, visualLanguage: { en: "Arrow-3 missile showcase", he: "תצוגת טיל חץ 3" } },
  },
  {
    slug: "lora", division: "mtach", subdivision: "malam", nameEn: "LORA", nameHe: "לורה",
    model3d: "/models/air/lora-showcase-3d.glb", image: "/images/air/lora-showcase.png", hasModel: true,
    code: "AR-002",
    subtitle: { en: "Precision strike missile mock-up for premium exhibition presentation.", he: "דגם טיל תקיפה מדויקת לתצוגת פרימיום בתערוכה." },
    description: { en: "Prepared for premium exhibition display, visual impact, and future presentation planning in the strike systems category.", he: "מוכן לתצוגת פרימיום, נוכחות חזותית חזקה ותכנון עתידי של הצגה בקטגוריית מערכות תקיפה." },
    status: { en: "Approved", he: "מאושר" }, config: { en: "Missile display", he: "תצוגת טיל" }, scale: "1:1",
    specs: { length: "5.2 m", width: "0.62 m", height: "5.2 m", weight: "TBD", standDiameter: "N/A", standWeight: "N/A" },
    readiness: { environment: { en: "Indoor / outdoor", he: "פנים / חוץ" }, displayMethod: { en: "Vertical missile stand", he: "סטנד טיל אנכי" }, support: { en: "Integrated base support", he: "תמיכה מובנית בבסיס" }, presentationLevel: { en: "Premium", he: "פרימיום" }, visualLanguage: { en: "Strike missile showcase", he: "תצוגת טיל תקיפה" } },
  },
  {
    slug: "wanderb", division: "kataz", subdivision: "", nameEn: "WanderB", nameHe: "וונדר B",
    model3d: "/models/air/wanderb-showcase-3d.glb", image: "/images/air/wanderb-showcase.png", hasModel: true,
    code: "AR-006",
    subtitle: { en: "Compact UAV mock-up for premium exhibition presentation.", he: "דגם כטב״ם קומפקטי לתצוגת פרימיום בתערוכה." },
    description: { en: "Prepared for premium exhibition display, tactical unmanned systems storytelling, and future presentation planning in the UAV category.", he: "מוכן לתצוגת פרימיום בתערוכה, להצגת יכולות טקטיות של מערכות בלתי מאוישות, ולתכנון עתידי בקטגוריית הכטב״מים." },
    status: { en: "Approved", he: "מאושר" }, config: { en: "UAV display", he: "תצוגת כטב״ם" }, scale: "1:1",
    specs: { length: "TBD", width: "TBD", height: "TBD", weight: "TBD", standDiameter: "N/A", standWeight: "N/A" },
    readiness: { environment: { en: "Indoor / outdoor", he: "פנים / חוץ" }, displayMethod: { en: "Static UAV display", he: "תצוגת כטב״ם סטטית" }, support: { en: "Integrated support base", he: "בסיס תמיכה משולב" }, presentationLevel: { en: "Premium", he: "פרימיום" }, visualLanguage: { en: "Compact UAV showcase", he: "שפת תצוגה של כטב״ם קומפקטי" } },
  },
  {
    slug: "arrow-4", division: "mtach", subdivision: "malam", nameEn: "Arrow 4", nameHe: "חץ 4",
    model3d: "", image: "/images/air/arrow-4-showcase.png", hasModel: false,
    code: "AR-AUTO-004",
    subtitle: { en: "Next-generation interceptor missile for premium exhibition presentation.", he: "טיל יירוט דור הבא לתצוגת פרימיום בתערוכה." },
    description: { en: "Prepared for premium missile exhibition display and operational air-defense presentation.", he: "מוכן לתצוגת טיל פרימיום ולהצגה מבצעית בתחום ההגנה." },
    status: { en: "Approved", he: "מאושר" }, config: { en: "Missile display", he: "תצוגת טיל" }, scale: "1:1",
    specs: { length: "TBD", width: "TBD", height: "TBD", weight: "TBD", standDiameter: "N/A", standWeight: "N/A" },
    readiness: { environment: { en: "Indoor / Outdoor", he: "פנים / חוץ" }, displayMethod: { en: "Static display", he: "תצוגה סטטית" }, support: { en: "Self-standing", he: "עצמאי" }, presentationLevel: { en: "Premium", he: "פרימיום" }, visualLanguage: { en: "Air-defense missile showcase", he: "תצוגת טיל הגנ״א" } },
  },
  {
    slug: "harop", division: "kataz", subdivision: "", nameEn: "HAROP", nameHe: "הרופ",
    model3d: "/models/air/harop-showcase-3d.glb", image: "/images/air/harop-showcase.png", hasModel: true,
    code: "AR-AUTO-006",
    subtitle: { en: "Loitering munition for premium exhibition presentation.", he: "תחמושת מתהוגגת לתצוגת פרימיום בתערוכה." },
    description: { en: "Prepared for premium loitering munition exhibition display and operational strike presentation.", he: "מוכן לתצוגת תחמושת מתהוגגת פרימיום ולהצגה מבצעית בתחום התקיפה." },
    status: { en: "Approved", he: "מאושר" }, config: { en: "UAV display", he: "תצוגת כטב״ם" }, scale: "1:1",
    specs: { length: "TBD", width: "TBD", height: "TBD", weight: "TBD", standDiameter: "N/A", standWeight: "N/A" },
    readiness: { environment: { en: "Indoor / Outdoor", he: "פנים / חוץ" }, displayMethod: { en: "Static display", he: "תצוגה סטטית" }, support: { en: "Self-standing", he: "עצמאי" }, presentationLevel: { en: "Premium", he: "פרימיום" }, visualLanguage: { en: "Strike UAV showcase", he: "תצוגת כטב״ם תקיפה" } },
  },
  {
    slug: "mini-harpy", division: "mtach", subdivision: "tilim", nameEn: "Mini Harpy", nameHe: "מיני הרפי",
    model3d: "/models/air/mini-harpy-showcase-3d.glb", image: "/images/air/mini-harpy-showcase.png", hasModel: true,
    code: "AR-AUTO-007",
    subtitle: { en: "Compact loitering munition for premium exhibition presentation.", he: "תחמושת מתהוגגת קומפקטית לתצוגת פרימיום בתערוכה." },
    description: { en: "Prepared for premium loitering munition exhibition display and operational strike presentation.", he: "מוכן לתצוגת תחמושת מתהוגגת פרימיום ולהצגה מבצעית בתחום התקיפה." },
    status: { en: "Approved", he: "מאושר" }, config: { en: "UAV display", he: "תצוגת כטב״ם" }, scale: "1:1",
    specs: { length: "TBD", width: "TBD", height: "TBD", weight: "TBD", standDiameter: "N/A", standWeight: "N/A" },
    readiness: { environment: { en: "Indoor / Outdoor", he: "פנים / חוץ" }, displayMethod: { en: "Static display", he: "תצוגה סטטית" }, support: { en: "Self-standing", he: "עצמאי" }, presentationLevel: { en: "Premium", he: "פרימיום" }, visualLanguage: { en: "Strike UAV showcase", he: "תצוגת כטב״ם תקיפה" } },
  },
  {
    slug: "lahat", division: "mtach", subdivision: "tilim", nameEn: "LAHAT", nameHe: "להט",
    model3d: "/models/air/lahat-showcase-3d.glb", image: "/images/air/lahat-showcase.png", hasModel: true,
    code: "AR-AUTO-008",
    subtitle: { en: "Laser-homing anti-tank missile for premium exhibition presentation.", he: "טיל נגד טנקים בהנחיית לייזר לתצוגת פרימיום בתערוכה." },
    description: { en: "Prepared for premium strike missile exhibition display and operational presentation.", he: "מוכן לתצוגת טיל תקיפה פרימיום ולהצגה מבצעית." },
    status: { en: "Approved", he: "מאושר" }, config: { en: "Missile display", he: "תצוגת טיל" }, scale: "1:1",
    specs: { length: "TBD", width: "TBD", height: "TBD", weight: "TBD", standDiameter: "N/A", standWeight: "N/A" },
    readiness: { environment: { en: "Indoor / Outdoor", he: "פנים / חוץ" }, displayMethod: { en: "Static display", he: "תצוגה סטטית" }, support: { en: "Self-standing", he: "עצמאי" }, presentationLevel: { en: "Premium", he: "פרימיום" }, visualLanguage: { en: "Strike missile showcase", he: "תצוגת טיל תקיפה" } },
  },
  {
    slug: "lahat-alfa", division: "mtach", subdivision: "tilim", nameEn: "LAHAT ALFA", nameHe: "להט אלפא",
    model3d: "/models/air/lahat-alfa-showcase-3d.glb", image: "/images/air/lahat-alfa-showcase.png", hasModel: true,
    code: "AR-AUTO-009",
    subtitle: { en: "Advanced LAHAT variant for premium exhibition presentation.", he: "גרסה מתקדמת של להט לתצוגת פרימיום בתערוכה." },
    description: { en: "Prepared for premium strike missile exhibition display and operational presentation.", he: "מוכן לתצוגת טיל תקיפה פרימיום ולהצגה מבצעית." },
    status: { en: "Approved", he: "מאושר" }, config: { en: "Missile display", he: "תצוגת טיל" }, scale: "1:1",
    specs: { length: "TBD", width: "TBD", height: "TBD", weight: "TBD", standDiameter: "N/A", standWeight: "N/A" },
    readiness: { environment: { en: "Indoor / Outdoor", he: "פנים / חוץ" }, displayMethod: { en: "Static display", he: "תצוגה סטטית" }, support: { en: "Self-standing", he: "עצמאי" }, presentationLevel: { en: "Premium", he: "פרימיום" }, visualLanguage: { en: "Strike missile showcase", he: "תצוגת טיל תקיפה" } },
  },
  {
    slug: "barak-launcher", division: "mtach", subdivision: "hagana", nameEn: "Barak Launcher", nameHe: "משגר ברק",
    model3d: "/models/air/barak-launcher-showcase-3d.glb", image: "/images/air/barak-launcher-showcase.png", hasModel: true,
    code: "AR-AUTO-010",
    subtitle: { en: "Air-defense launcher for premium exhibition presentation.", he: "משגר הגנ״א לתצוגת פרימיום בתערוכה." },
    description: { en: "Prepared for premium launcher exhibition display and operational air-defense presentation.", he: "מוכן לתצוגת משגר פרימיום ולהצגה מבצעית בתחום ההגנה." },
    status: { en: "Approved", he: "מאושר" }, config: { en: "Launcher display", he: "תצוגת משגר" }, scale: "1:1",
    specs: { length: "TBD", width: "TBD", height: "TBD", weight: "TBD", standDiameter: "N/A", standWeight: "N/A" },
    readiness: { environment: { en: "Indoor / Outdoor", he: "פנים / חוץ" }, displayMethod: { en: "Static display", he: "תצוגה סטטית" }, support: { en: "Self-standing", he: "עצמאי" }, presentationLevel: { en: "Premium", he: "פרימיום" }, visualLanguage: { en: "Air-defense launcher showcase", he: "תצוגת משגר הגנ״א" } },
  },
  {
    slug: "arrow-launcher", division: "mtach", subdivision: "hagana", nameEn: "Arrow Launcher", nameHe: "משגר חץ",
    model3d: "/models/air/arrow-launcher-showcase-3d.glb", image: "/images/air/arrow-launcher-showcase.png", hasModel: true,
    code: "AR-AUTO-021",
    subtitle: { en: "Air-defense launcher for premium exhibition presentation.", he: "משגר הגנ״א לתצוגת פרימיום בתערוכה." },
    description: { en: "Prepared for premium launcher exhibition display and operational air-defense presentation.", he: "מוכן לתצוגת משגר פרימיום ולהצגה מבצעית בתחום ההגנה." },
    status: { en: "Approved", he: "מאושר" }, config: { en: "Launcher display", he: "תצוגת משגר" }, scale: "1:1",
    specs: { length: "TBD", width: "TBD", height: "TBD", weight: "TBD", standDiameter: "N/A", standWeight: "N/A" },
    readiness: { environment: { en: "Indoor / Outdoor", he: "פנים / חוץ" }, displayMethod: { en: "Static display", he: "תצוגה סטטית" }, support: { en: "Self-standing", he: "עצמאי" }, presentationLevel: { en: "Premium", he: "פרימיום" }, visualLanguage: { en: "Air-defense launcher showcase", he: "תצוגת משגר הגנ״א" } },
  },
  {
    slug: "minipop", division: "mtach", subdivision: "tamam", nameEn: "MINIPOP", nameHe: "מיני-פופ",
    model3d: "/models/air/minipop-showcase-3d.glb", image: "/images/air/minipop-showcase.png", hasModel: true,
    code: "AR-AUTO-020",
    subtitle: { en: "Compact precision strike munition for premium exhibition presentation.", he: "תחמושת תקיפה מדויקת קומפקטית לתצוגת פרימיום בתערוכה." },
    description: { en: "Prepared for premium strike missile exhibition display and operational presentation.", he: "מוכן לתצוגת טיל תקיפה פרימיום ולהצגה מבצעית." },
    status: { en: "Approved", he: "מאושר" }, config: { en: "Missile display", he: "תצוגת טיל" }, scale: "1:1",
    specs: { length: "TBD", width: "TBD", height: "TBD", weight: "TBD", standDiameter: "N/A", standWeight: "N/A" },
    readiness: { environment: { en: "Indoor / Outdoor", he: "פנים / חוץ" }, displayMethod: { en: "Static display", he: "תצוגה סטטית" }, support: { en: "Self-standing", he: "עצמאי" }, presentationLevel: { en: "Premium", he: "פרימיום" }, visualLanguage: { en: "Strike missile showcase", he: "תצוגת טיל תקיפה" } },
  },
  {
    slug: "megapop", division: "mtach", subdivision: "tamam", nameEn: "MEGAPOP", nameHe: "מגה-פופ",
    model3d: "/models/air/megapop-showcase-3d.glb", image: "/images/air/megapop-showcase.png", hasModel: true,
    code: "AR-AUTO-018",
    subtitle: { en: "Precision strike munition for premium exhibition presentation.", he: "תחמושת תקיפה מדויקת לתצוגת פרימיום בתערוכה." },
    description: { en: "Prepared for premium strike missile exhibition display and operational presentation.", he: "מוכן לתצוגת טיל תקיפה פרימיום ולהצגה מבצעית." },
    status: { en: "Approved", he: "מאושר" }, config: { en: "Missile display", he: "תצוגת טיל" }, scale: "1:1",
    specs: { length: "TBD", width: "TBD", height: "TBD", weight: "TBD", standDiameter: "N/A", standWeight: "N/A" },
    readiness: { environment: { en: "Indoor / Outdoor", he: "פנים / חוץ" }, displayMethod: { en: "Static display", he: "תצוגה סטטית" }, support: { en: "Self-standing", he: "עצמאי" }, presentationLevel: { en: "Premium", he: "פרימיום" }, visualLanguage: { en: "Strike missile showcase", he: "תצוגת טיל תקיפה" } },
  },
  {
    slug: "pop1000", division: "mtach", subdivision: "tamam", nameEn: "POP 1000", nameHe: "פופ 1000",
    model3d: "/models/air/pop1000-showcase-3d.glb", image: "/images/air/pop1000-showcase.png", hasModel: true,
    code: "AR-AUTO-019",
    subtitle: { en: "Precision strike munition for premium exhibition presentation.", he: "תחמושת תקיפה מדויקת לתצוגת פרימיום בתערוכה." },
    description: { en: "Prepared for premium strike missile exhibition display and operational presentation.", he: "מוכן לתצוגת טיל תקיפה פרימיום ולהצגה מבצעית." },
    status: { en: "Approved", he: "מאושר" }, config: { en: "Missile display", he: "תצוגת טיל" }, scale: "1:1",
    specs: { length: "TBD", width: "TBD", height: "TBD", weight: "TBD", standDiameter: "N/A", standWeight: "N/A" },
    readiness: { environment: { en: "Indoor / Outdoor", he: "פנים / חוץ" }, displayMethod: { en: "Static display", he: "תצוגה סטטית" }, support: { en: "Self-standing", he: "עצמאי" }, presentationLevel: { en: "Premium", he: "פרימיום" }, visualLanguage: { en: "Strike missile showcase", he: "תצוגת טיל תקיפה" } },
  },
  {
    slug: "pointblank", division: "mtach", subdivision: "malam", nameEn: "POINTBLANK", nameHe: "פוינטבלנק",
    model3d: "/models/air/point-blank-showcase-3d.glb", image: "/images/air/pointblank-showcase.png", hasModel: true,
    code: "AR-AUTO-016",
    subtitle: { en: "Precision strike missile for premium exhibition presentation.", he: "טיל תקיפה מדויק לתצוגת פרימיום בתערוכה." },
    description: { en: "Prepared for premium strike missile exhibition display and operational presentation.", he: "מוכן לתצוגת טיל תקיפה פרימיום ולהצגה מבצעית." },
    status: { en: "Approved", he: "מאושר" }, config: { en: "Missile display", he: "תצוגת טיל" }, scale: "1:1",
    specs: { length: "TBD", width: "TBD", height: "TBD", weight: "TBD", standDiameter: "N/A", standWeight: "N/A" },
    readiness: { environment: { en: "Indoor / Outdoor", he: "פנים / חוץ" }, displayMethod: { en: "Static display", he: "תצוגה סטטית" }, support: { en: "Self-standing", he: "עצמאי" }, presentationLevel: { en: "Premium", he: "פרימיום" }, visualLanguage: { en: "Strike missile showcase", he: "תצוגת טיל תקיפה" } },
  },
  {
    slug: "microwami", division: "elta", subdivision: "soi", nameEn: "MICROWAMI", nameHe: "מיקרוואמי",
    model3d: "/models/air/microwami-showcase-3d.glb", image: "/images/air/microwami-showcase.png", hasModel: true,
    code: "AR-AUTO-017",
    subtitle: { en: "Microwave radar system for premium exhibition presentation.", he: "מערכת מכ״ם מיקרוגל לתצוגת פרימיום בתערוכה." },
    description: { en: "Prepared for premium radar exhibition display and operational air-defense presentation.", he: "מוכן לתצוגת מכ״ם פרימיום ולהצגה מבצעית בתחום ההגנה." },
    status: { en: "Approved", he: "מאושר" }, config: { en: "Radar display", he: "תצוגת מכ״ם" }, scale: "1:1",
    specs: { length: "TBD", width: "TBD", height: "TBD", weight: "TBD", standDiameter: "N/A", standWeight: "N/A" },
    readiness: { environment: { en: "Indoor / Outdoor", he: "פנים / חוץ" }, displayMethod: { en: "Static display", he: "תצוגה סטטית" }, support: { en: "Self-standing", he: "עצמאי" }, presentationLevel: { en: "Premium", he: "פרימיום" }, visualLanguage: { en: "Air-defense radar showcase", he: "תצוגת מכ״ם הגנ״א" } },
  },
  {
    slug: "rotem", division: "mtach", subdivision: "tilim", nameEn: "ROTEM", nameHe: "רותם",
    model3d: "/models/air/rotem-showcase-3d.glb", image: "/images/air/rotem-showcase.png", hasModel: true,
    code: "AR-AUTO-013",
    subtitle: { en: "Loitering attack UAV for premium exhibition presentation.", he: "כטב״ם תקיפה מתהוגג לתצוגת פרימיום בתערוכה." },
    description: { en: "Prepared for premium strike UAV exhibition display and operational presentation.", he: "מוכן לתצוגת כטב״ם תקיפה פרימיום ולהצגה מבצעית." },
    status: { en: "Approved", he: "מאושר" }, config: { en: "UAV display", he: "תצוגת כטב״ם" }, scale: "1:1",
    specs: { length: "TBD", width: "TBD", height: "TBD", weight: "TBD", standDiameter: "N/A", standWeight: "N/A" },
    readiness: { environment: { en: "Indoor / Outdoor", he: "פנים / חוץ" }, displayMethod: { en: "Static display", he: "תצוגה סטטית" }, support: { en: "Self-standing", he: "עצמאי" }, presentationLevel: { en: "Premium", he: "פרימיום" }, visualLanguage: { en: "Strike UAV showcase", he: "תצוגת כטב״ם תקיפה" } },
  },
  {
    slug: "apus25", division: "kataz", subdivision: "", nameEn: "APUS 25", nameHe: "אפוס 25",
    model3d: "/models/air/apus-25-showcase-3d.glb", image: "/images/air/apus25-showcase.png", hasModel: true,
    code: "AR-AUTO-014",
    subtitle: { en: "Strike UAV mock-up for premium exhibition presentation.", he: "דגם כטב״ם תקיפה לתצוגת פרימיום בתערוכה." },
    description: { en: "Prepared for premium strike UAV exhibition display and operational presentation.", he: "מוכן לתצוגת כטב״ם תקיפה פרימיום ולהצגה מבצעית." },
    status: { en: "Approved", he: "מאושר" }, config: { en: "UAV display", he: "תצוגת כטב״ם" }, scale: "1:1",
    specs: { length: "TBD", width: "TBD", height: "TBD", weight: "TBD", standDiameter: "N/A", standWeight: "N/A" },
    readiness: { environment: { en: "Indoor / Outdoor", he: "פנים / חוץ" }, displayMethod: { en: "Static display", he: "תצוגה סטטית" }, support: { en: "Self-standing", he: "עצמאי" }, presentationLevel: { en: "Premium", he: "פרימיום" }, visualLanguage: { en: "Strike UAV showcase", he: "תצוגת כטב״ם תקיפה" } },
  },
  {
    slug: "apus60", division: "kataz", subdivision: "", nameEn: "APUS 60", nameHe: "אפוס 60",
    model3d: "/models/air/apus-60-showcase-3d.glb", image: "/images/air/apus60-showcase.png", hasModel: true,
    code: "AR-AUTO-015",
    subtitle: { en: "Strike UAV mock-up for premium exhibition presentation.", he: "דגם כטב״ם תקיפה לתצוגת פרימיום בתערוכה." },
    description: { en: "Prepared for premium strike UAV exhibition display and operational presentation.", he: "מוכן לתצוגת כטב״ם תקיפה פרימיום ולהצגה מבצעית." },
    status: { en: "Approved", he: "מאושר" }, config: { en: "UAV display", he: "תצוגת כטב״ם" }, scale: "1:1",
    specs: { length: "TBD", width: "TBD", height: "TBD", weight: "TBD", standDiameter: "N/A", standWeight: "N/A" },
    readiness: { environment: { en: "Indoor / Outdoor", he: "פנים / חוץ" }, displayMethod: { en: "Static display", he: "תצוגה סטטית" }, support: { en: "Self-standing", he: "עצמאי" }, presentationLevel: { en: "Premium", he: "פרימיום" }, visualLanguage: { en: "Strike UAV showcase", he: "תצוגת כטב״ם תקיפה" } },
  },

  // ── AIR — אלתא ─────────────────────────────────────────────────────────────
  {
    slug: "mmr", division: "elta", subdivision: "mkam", nameEn: "MMR", nameHe: "מכ״ם MMR",
    model3d: "/models/air/mmr-showcase-3d.glb", image: "/images/air/mmr-showcase.png", hasModel: true,
    code: "AR-AUTO-002",
    subtitle: { en: "Multi-mission radar display for premium exhibition presentation.", he: "מכ״ם רב־משימתי לתצוגת פרימיום בתערוכה." },
    description: { en: "Prepared for premium radar exhibition display and operational air-defense presentation.", he: "מוכן לתצוגת מכ״ם פרימיום ולהצגה מבצעית בתחום ההגנה." },
    status: { en: "Approved", he: "מאושר" }, config: { en: "Radar display", he: "תצוגת מכ״ם" }, scale: "1:1",
    specs: { length: "TBD", width: "TBD", height: "TBD", weight: "TBD", standDiameter: "N/A", standWeight: "N/A" },
    readiness: { environment: { en: "Indoor / Outdoor", he: "פנים / חוץ" }, displayMethod: { en: "Static display", he: "תצוגה סטטית" }, support: { en: "Self-standing", he: "עצמאי" }, presentationLevel: { en: "Premium", he: "פרימיום" }, visualLanguage: { en: "Air-defense radar showcase", he: "תצוגת מכ״ם הגנ״א" } },
  },
  {
    slug: "elm-2058", division: "elta", subdivision: "mkam", nameEn: "ELM-2058", nameHe: "מכ״ם ELM-2058",
    model3d: "/models/air/elw2058-showcase-3d.glb", image: "/images/air/elm-2058-showcase.png", hasModel: true,
    code: "AR-AUTO-011",
    subtitle: { en: "Airborne radar system for premium exhibition presentation.", he: "מערכת מכ״ם אוירית לתצוגת פרימיום בתערוכה." },
    description: { en: "Prepared for premium radar exhibition display and operational air-defense presentation.", he: "מוכן לתצוגת מכ״ם פרימיום ולהצגה מבצעית בתחום ההגנה." },
    status: { en: "Approved", he: "מאושר" }, config: { en: "Radar display", he: "תצוגת מכ״ם" }, scale: "1:1",
    specs: { length: "TBD", width: "TBD", height: "TBD", weight: "TBD", standDiameter: "N/A", standWeight: "N/A" },
    readiness: { environment: { en: "Indoor / Outdoor", he: "פנים / חוץ" }, displayMethod: { en: "Static display", he: "תצוגה סטטית" }, support: { en: "Self-standing", he: "עצמאי" }, presentationLevel: { en: "Premium", he: "פרימיום" }, visualLanguage: { en: "Air-defense radar showcase", he: "תצוגת מכ״ם הגנ״א" } },
  },
  {
    slug: "wasp", division: "mtach", subdivision: "tamam", nameEn: "WASP", nameHe: "צרעה",
    model3d: "/models/air/wasp-showcase-3d.glb", image: "/images/air/wasp-showcase.png", hasModel: true,
    code: "AR-AUTO-012",
    subtitle: { en: "Strike UAV mock-up for premium exhibition presentation.", he: "דגם כטב״ם תקיפה לתצוגת פרימיום בתערוכה." },
    description: { en: "Prepared for premium strike UAV exhibition display and operational presentation.", he: "מוכן לתצוגת כטב״ם תקיפה פרימיום ולהצגה מבצעית." },
    status: { en: "Approved", he: "מאושר" }, config: { en: "UAV display", he: "תצוגת כטב״ם" }, scale: "1:1",
    specs: { length: "TBD", width: "TBD", height: "TBD", weight: "TBD", standDiameter: "N/A", standWeight: "N/A" },
    readiness: { environment: { en: "Indoor / Outdoor", he: "פנים / חוץ" }, displayMethod: { en: "Static display", he: "תצוגה סטטית" }, support: { en: "Self-standing", he: "עצמאי" }, presentationLevel: { en: "Premium", he: "פרימיום" }, visualLanguage: { en: "Strike UAV showcase", he: "תצוגת כטב״ם תקיפה" } },
  },
  {
    slug: "othello", division: "elta", subdivision: "mkam", nameEn: "Othello", nameHe: "אותלו",
    model3d: "/models/air/othello-showcase-3d.glb", image: "/images/air/Othello-showcase.PNG", hasModel: true,
    code: "AR-AUTO-025",
    subtitle: { en: "Radar system for premium exhibition presentation.", he: "מערכת מכ״ם לתצוגת פרימיום בתערוכה." },
    description: { en: "Prepared for premium radar exhibition display and operational air-defense presentation.", he: "מוכן לתצוגת מכ״ם פרימיום ולהצגה מבצעית בתחום ההגנה." },
    status: { en: "Approved", he: "מאושר" }, config: { en: "Radar display", he: "תצוגת מכ״ם" }, scale: "1:1",
    specs: { length: "TBD", width: "TBD", height: "TBD", weight: "TBD", standDiameter: "N/A", standWeight: "N/A" },
    readiness: { environment: { en: "Indoor / Outdoor", he: "פנים / חוץ" }, displayMethod: { en: "Static display", he: "תצוגה סטטית" }, support: { en: "Self-standing", he: "עצמאי" }, presentationLevel: { en: "Premium", he: "פרימיום" }, visualLanguage: { en: "Radar showcase", he: "תצוגת מכ״ם" } },
  },
  {
    slug: "quadcopter2", division: "elta", subdivision: "soi", nameEn: "Quadcopter 2", nameHe: "קוואדקופטר 2",
    model3d: "/models/air/quadcopter2-showcase-3d.glb", image: "/images/air/quadcopter2-showcase.PNG", hasModel: true,
    code: "AR-AUTO-026",
    subtitle: { en: "Quadcopter UAV for premium exhibition presentation.", he: "קוואדקופטר לתצוגת פרימיום בתערוכה." },
    description: { en: "Prepared for premium quadcopter exhibition display and operational presentation.", he: "מוכן לתצוגת קוואדקופטר פרימיום ולהצגה מבצעית." },
    status: { en: "Approved", he: "מאושר" }, config: { en: "Quadcopter display", he: "תצוגת קוואדקופטר" }, scale: "1:1",
    specs: { length: "TBD", width: "TBD", height: "TBD", weight: "TBD", standDiameter: "N/A", standWeight: "N/A" },
    readiness: { environment: { en: "Indoor / Outdoor", he: "פנים / חוץ" }, displayMethod: { en: "Static display", he: "תצוגה סטטית" }, support: { en: "Self-standing", he: "עצמאי" }, presentationLevel: { en: "Premium", he: "פרימיום" }, visualLanguage: { en: "Quadcopter showcase", he: "תצוגת קוואדקופטר" } },
  },
  {
    slug: "quadcopter3", division: "elta", subdivision: "soi", nameEn: "Quadcopter 3", nameHe: "קוואדקופטר 3",
    model3d: "/models/air/quadcopter3-showcase-3d.glb", image: "/images/air/quadcopter3-showcase.PNG", hasModel: true,
    code: "AR-AUTO-027",
    subtitle: { en: "Quadcopter UAV for premium exhibition presentation.", he: "קוואדקופטר לתצוגת פרימיום בתערוכה." },
    description: { en: "Prepared for premium quadcopter exhibition display and operational presentation.", he: "מוכן לתצוגת קוואדקופטר פרימיום ולהצגה מבצעית." },
    status: { en: "Approved", he: "מאושר" }, config: { en: "Quadcopter display", he: "תצוגת קוואדקופטר" }, scale: "1:1",
    specs: { length: "TBD", width: "TBD", height: "TBD", weight: "TBD", standDiameter: "N/A", standWeight: "N/A" },
    readiness: { environment: { en: "Indoor / Outdoor", he: "פנים / חוץ" }, displayMethod: { en: "Static display", he: "תצוגה סטטית" }, support: { en: "Self-standing", he: "עצמאי" }, presentationLevel: { en: "Premium", he: "פרימיום" }, visualLanguage: { en: "Quadcopter showcase", he: "תצוגת קוואדקופטר" } },
  },

  // ── AIR — כט"צ ─────────────────────────────────────────────────────────────
  {
    slug: "thunder-vtol", division: "kataz", nameEn: "Thunder VTOL", nameHe: "ת׳אנדר VTOL",
    model3d: "/models/air/thunderb-showcase-3d.glb", image: "/images/air/Thunderb-showcase.png", hasModel: true,
    code: "AR-AUTO-005",
    subtitle: { en: "VTOL UAV mock-up for premium exhibition presentation.", he: "דגם כטב״ם VTOL לתצוגת פרימיום בתערוכה." },
    description: { en: "Prepared for premium VTOL UAV exhibition display and operational presentation.", he: "מוכן לתצוגת כטב״ם VTOL פרימיום ולהצגה מבצעית." },
    status: { en: "Approved", he: "מאושר" }, config: { en: "UAV display", he: "תצוגת כטב״ם" }, scale: "1:1",
    specs: { length: "TBD", width: "TBD", height: "TBD", weight: "TBD", standDiameter: "N/A", standWeight: "N/A" },
    readiness: { environment: { en: "Indoor / Outdoor", he: "פנים / חוץ" }, displayMethod: { en: "Static display", he: "תצוגה סטטית" }, support: { en: "Self-standing", he: "עצמאי" }, presentationLevel: { en: "Premium", he: "פרימיום" }, visualLanguage: { en: "VTOL UAV showcase", he: "תצוגת כטב״ם VTOL" } },
  },
  {
    slug: "eitan", division: "kataz", nameEn: "Eitan", nameHe: "איתן",
    model3d: "/models/air/eitan-showcase-3d.glb", image: "/images/air/Eitan-showcase.PNG", hasModel: true,
    code: "AR-AUTO-022",
    subtitle: { en: "UAV for premium exhibition presentation.", he: "כטב״ם לתצוגת פרימיום בתערוכה." },
    description: { en: "Prepared for premium UAV exhibition display and operational presentation.", he: "מוכן לתצוגת כטב״ם פרימיום ולהצגה מבצעית." },
    status: { en: "Approved", he: "מאושר" }, config: { en: "UAV display", he: "תצוגת כטב״ם" }, scale: "1:1",
    specs: { length: "TBD", width: "TBD", height: "TBD", weight: "TBD", standDiameter: "N/A", standWeight: "N/A" },
    readiness: { environment: { en: "Indoor / Outdoor", he: "פנים / חוץ" }, displayMethod: { en: "Static display", he: "תצוגה סטטית" }, support: { en: "Self-standing", he: "עצמאי" }, presentationLevel: { en: "Premium", he: "פרימיום" }, visualLanguage: { en: "UAV showcase", he: "תצוגת כטב״ם" } },
  },
  {
    slug: "heronmk2", division: "kataz", nameEn: "Heron Mk2", nameHe: "הרון Mk2",
    model3d: "/models/air/heron-mk2-showcase-3d.glb", image: "/images/air/HeronMk2-showcase.PNG", hasModel: true,
    code: "AR-AUTO-023",
    subtitle: { en: "UAV for premium exhibition presentation.", he: "כטב״ם לתצוגת פרימיום בתערוכה." },
    description: { en: "Prepared for premium UAV exhibition display and operational presentation.", he: "מוכן לתצוגת כטב״ם פרימיום ולהצגה מבצעית." },
    status: { en: "Approved", he: "מאושר" }, config: { en: "UAV display", he: "תצוגת כטב״ם" }, scale: "1:1",
    specs: { length: "TBD", width: "TBD", height: "TBD", weight: "TBD", standDiameter: "N/A", standWeight: "N/A" },
    readiness: { environment: { en: "Indoor / Outdoor", he: "פנים / חוץ" }, displayMethod: { en: "Static display", he: "תצוגה סטטית" }, support: { en: "Self-standing", he: "עצמאי" }, presentationLevel: { en: "Premium", he: "פרימיום" }, visualLanguage: { en: "UAV showcase", he: "תצוגת כטב״ם" } },
  },

  // ── AIR — תעופה ────────────────────────────────────────────────────────────
  {
    slug: "777", division: "teufa", nameEn: "Boeing 777", nameHe: "בואינג 777",
    model3d: "/models/air/777-showcase-3d.glb", image: "/images/air/777-showcase.png", hasModel: true,
    code: "TE-001",
    subtitle: { en: "Wide-body commercial aircraft mock-up for premium exhibition presentation.", he: "דגם מטוס רחב גוף לתצוגת פרימיום בתערוכה." },
    description: { en: "Prepared for premium aircraft exhibition display and operational aviation presentation.", he: "מוכן לתצוגת מטוס פרימיום ולהצגה מבצעית בתחום התעופה." },
    status: { en: "Approved", he: "מאושר" }, config: { en: "Aircraft display", he: "תצוגת מטוס" }, scale: "1:100",
    specs: { length: "TBD", width: "TBD", height: "TBD", weight: "TBD", standDiameter: "N/A", standWeight: "N/A" },
    readiness: { environment: { en: "Indoor / Outdoor", he: "פנים / חוץ" }, displayMethod: { en: "Static display", he: "תצוגה סטטית" }, support: { en: "Self-standing", he: "עצמאי" }, presentationLevel: { en: "Premium", he: "פרימיום" }, visualLanguage: { en: "Aviation showcase", he: "תצוגת תעופה" } },
  },
  {
    slug: "b767", division: "teufa", nameEn: "Boeing 767", nameHe: "בואינג 767",
    model3d: "/models/air/b767-showcase-3d.glb", image: "/images/air/b767-showcase.png", hasModel: true,
    code: "TE-002",
    subtitle: { en: "Wide-body commercial aircraft mock-up for premium exhibition presentation.", he: "דגם מטוס רחב גוף לתצוגת פרימיום בתערוכה." },
    description: { en: "Prepared for premium aircraft exhibition display and operational aviation presentation.", he: "מוכן לתצוגת מטוס פרימיום ולהצגה מבצעית בתחום התעופה." },
    status: { en: "Approved", he: "מאושר" }, config: { en: "Aircraft display", he: "תצוגת מטוס" }, scale: "1:100",
    specs: { length: "TBD", width: "TBD", height: "TBD", weight: "TBD", standDiameter: "N/A", standWeight: "N/A" },
    readiness: { environment: { en: "Indoor / Outdoor", he: "פנים / חוץ" }, displayMethod: { en: "Static display", he: "תצוגה סטטית" }, support: { en: "Self-standing", he: "עצמאי" }, presentationLevel: { en: "Premium", he: "פרימיום" }, visualLanguage: { en: "Aviation showcase", he: "תצוגת תעופה" } },
  },
  {
    slug: "kc140", division: "teufa", nameEn: "KC-135", nameHe: "KC-135",
    model3d: "/models/air/kc140-showcase-3d.glb", image: "/images/air/kc-135-showcase.PNG", hasModel: true,
    code: "AR-AUTO-024",
    subtitle: { en: "Tanker aircraft mock-up for premium exhibition presentation.", he: "דגם מטוס תדלוק לתצוגת פרימיום בתערוכה." },
    description: { en: "Prepared for premium aircraft exhibition display and operational aviation presentation.", he: "מוכן לתצוגת מטוס פרימיום ולהצגה מבצעית בתחום התעופה." },
    status: { en: "Approved", he: "מאושר" }, config: { en: "Aircraft display", he: "תצוגת מטוס" }, scale: "1:100",
    specs: { length: "TBD", width: "TBD", height: "TBD", weight: "TBD", standDiameter: "N/A", standWeight: "N/A" },
    readiness: { environment: { en: "Indoor / Outdoor", he: "פנים / חוץ" }, displayMethod: { en: "Static display", he: "תצוגה סטטית" }, support: { en: "Self-standing", he: "עצמאי" }, presentationLevel: { en: "Premium", he: "פרימיום" }, visualLanguage: { en: "Aviation showcase", he: "תצוגת תעופה" } },
  },

  // ── LAND (4) ───────────────────────────────────────────────────────────────
  { slug: "zmag",      division: "elta",  subdivision: "robotika", nameEn: "ZMAG",      nameHe: "ZMAG",      model3d: "/models/land/zmag-showcase-3d.glb",      image: "/images/land/zmag-showcase.png",      hasModel: true },
  { slug: "3dcapture", division: "mtach", subdivision: "tilim", nameEn: "3DCAPTURE", nameHe: "3DCAPTURE", model3d: "/models/land/3dcapture-showcase-3d.glb", image: "/images/land/3dcapture-showcase.png", hasModel: true,
    subtitle: { en: "Armored tactical vehicle display model", he: "דגם תצוגה של רכב טקטי משוריין" },
    description: { en: "Indoor exhibition mock-up of the 3D Capture armored tactical vehicle, prepared for multi-platform systems display and operational showcase.", he: "דגם תצוגה פנימי של רכב טקטי 3D Capture משוריין, מוכן להצגת מערכות רב-פלטפורמה." } },
  { slug: "panda",     division: "elta",  subdivision: "robotika", nameEn: "PANDA",     nameHe: "PANDA",     model3d: "/models/land/panda-showcase-3d.glb",     image: "/images/land/panda-showcase.png",     hasModel: true },
  { slug: "robattle",  division: "elta",  subdivision: "robotika", nameEn: "RoBattle",  nameHe: "רובטל",     model3d: "/models/land/robattle-showcase-3d.glb",  image: "/images/land/robattle-showcase.png",  hasModel: true },
  { slug: "trailer",   division: "elta",  subdivision: "soi",      nameEn: "Trailer",   nameHe: "נגרר",      model3d: "/models/land/trailer-showcase-3d.glb",   image: "/images/land/trailer-showcase.PNG",                                    hasModel: true },

  // ── NAVAL (1) ──────────────────────────────────────────────────────────────
  { slug: "katana",    division: "mtach", subdivision: "malam",    nameEn: "Katana",    nameHe: "קתנה",  model3d: "/models/naval/katana-showcase.glb",      image: "/images/naval/katana.png",       hasModel: true,
    subtitle: { en: "Naval unmanned surface vessel display model", he: "דגם תצוגה של כלי שיט אוטונומי" },
    description: { en: "Prepared for premium naval exhibition display and operational maritime presentation.", he: "מוכן לתצוגת תערוכה ימית פרמיום והצגה מבצעית." } },
  { slug: "submarine", division: "elta",  subdivision: "robotika", nameEn: "Submarine", nameHe: "צוללת", model3d: "/models/naval/submarine-showcase-3d.glb", image: "/images/naval/submarine.PNG",    hasModel: true },

  // ── INVENTORY (25) ────────────────────────────────────────────────────────
  // Legacy 6 — mapped to lightbox models
  { slug: "inv-table",      division: "inventory", nameEn: "Table",       nameHe: "שולחן",  model3d: "/models/inventory/blue-table-01.glb",              image: "/inventory/table-cover-iai-blue-01.png", hasModel: true },
  { slug: "inv-armchair",   division: "inventory", nameEn: "Armchair",    nameHe: "כורסא",        model3d: "/models/inventory/armchair-01.glb",                image: "/inventory/chair.PNG", hasModel: true },
  { slug: "inv-stand",      division: "inventory", nameEn: "White Stage", nameHe: "במה לבנה", model3d: "/models/inventory/lightbox-vertical-iai.glb",    image: "/inventory/stage-white-75-35.png", hasModel: true },
  { slug: "inv-lightbox-v", division: "inventory", nameEn: "Lightbox Vertical", nameHe: "לייטבוקס אנכי", model3d: "/models/inventory/lightbox-horizontal-iai-01.glb", image: "/inventory/lightbox-vertical-01.png", hasModel: true },
  // New 19
  { slug: "inv-stage-blue",    division: "inventory", nameEn: "Blue Stage",      nameHe: "במה כחולה",     model3d: "/models/inventory/stage-blue-01.glb",              image: "/inventory/stage-130-130.PNG", hasModel: true },
  { slug: "inv-screen",        division: "inventory", nameEn: "Screen Stand",    nameHe: "מסך",           model3d: "/models/inventory/screen-stand-iai-01.glb",        image: "/inventory/screen-stand.PNG", hasModel: true },
  { slug: "inv-logo-white",    division: "inventory", nameEn: "White Logo",      nameHe: "לוגו לבן",      model3d: "/models/inventory/logo-white-iai-01.glb",          image: "/inventory/small-logo.png", hasModel: true },
  { slug: "inv-loudspeaker",   division: "inventory", nameEn: "Speaker",         nameHe: "רמקול",         model3d: "/models/inventory/loudspeaker-iai.glb",            image: "/inventory/loudspeaker.PNG", hasModel: true },
  { slug: "inv-folding-chair", division: "inventory", nameEn: "Folding Chair",   nameHe: "כיסא מתקפל",    model3d: "/models/inventory/folding-chair-iai.glb",          image: "/inventory/chair-folding-white-01.png", hasModel: true },
  { slug: "inv-flag-china",    division: "inventory", nameEn: "IAI Flag",          nameHe: "דגל IAI",         model3d: "/models/inventory/flag-china-01.glb",           image: "/inventory/flag-iai-blue-01.png", hasModel: true },
  { slug: "inv-camo",          division: "inventory", nameEn: "Camo Net",        nameHe: "רשת הסוואה",    model3d: "/models/inventory/camouflage-iai-01.glb",          image: "/inventory/camouflage.PNG", hasModel: true },
  { slug: "inv-arch",          division: "inventory", nameEn: "Inflatable Arch", nameHe: "שער מתנפח",     model3d: "/models/inventory/inflatable-arch-01.glb",         image: "/inventory/gate-iai-blue-01.PNG", hasModel: true },
  { slug: "inv-queue-poles",   division: "inventory", nameEn: "Queue Poles",     nameHe: "עמודי תור",     model3d: "/models/inventory/queue-poles-01.glb",             image: "/inventory/stanchion-black-01.png", hasModel: true },
  { slug: "inv-phone-storage", division: "inventory", nameEn: "Phone Storage",   nameHe: "מתקן טלפונים",  model3d: "/models/inventory/phone-storage-01.glb",           image: "/inventory/desk-phone.PNG", hasModel: true },
  { slug: "inv-stage-small",   division: "inventory", nameEn: "Small Stage",     nameHe: "במה קטנה",      model3d: "/models/inventory/stage-blue-1m-01.glb",           image: "/inventory/stage-50-50.PNG", hasModel: true },
  { slug: "inv-inflatable-tent",division: "inventory",nameEn: "Inflatable Tent", nameHe: "אוהל מתנפח",    model3d: "/models/inventory/inflatable-tent-01.glb",         image: "/inventory/tent-dome-iai-blue-01.png", hasModel: true },
  { slug: "inv-lightbox2",     division: "inventory", nameEn: "Lightbox 2",      nameHe: "לייטבוקס 2",    model3d: "/models/inventory/ligthbox-horizontal-iai-02.glb", image: "/inventory/lightbox-horizontal-01.jpeg", hasModel: true },
  { slug: "inv-podium",        division: "inventory", nameEn: "Podium",          nameHe: "פודיום",        model3d: "/models/inventory/acrylic-podium-iai.glb",         image: "/inventory/lectern-acrylic-01.png", hasModel: true },
  { slug: "inv-digital-sign",  division: "inventory", nameEn: "Digital Signage", nameHe: "שילוט דיגיטלי", model3d: "/models/inventory/digital-signage-01.glb",         image: "/inventory/digital-screen.PNG", hasModel: true },
  { slug: "inv-magnetic-sign", division: "inventory", nameEn: "Magnetic Signage",nameHe: "שילוט מגנטי",   model3d: "/models/inventory/magnetic-signage-01.glb",        image: "/inventory/magnetic-desk.PNG", hasModel: true },
  { slug: "inv-logo-blue",     division: "inventory", nameEn: "Large Blue Logo", nameHe: "לוגו כחול גדול",model3d: "/models/inventory/logo-blue-large-01.glb",         image: "/inventory/logo-iai-large-2m-01.png", hasModel: true },
  { slug: "inv-white-tent",    division: "inventory", nameEn: "White Tent",      nameHe: "אוהל לבן",      model3d: "/models/inventory/tent-white-01.glb",              image: "/inventory/tent-25x15-white-01.png", hasModel: true },
  { slug: "inv-wood-sign",    division: "inventory", nameEn: "Wood Signage",    nameHe: "שילוט עץ",       model3d: "/models/inventory/wood-signage-iai.glb",            image: "/inventory/wood-desk.PNG", hasModel: true },
  { slug: "inv-tent-main",    division: "inventory", nameEn: "Main Tent",       nameHe: "אוהל ראשי",      model3d: "/models/inventory/tent-20-30-iai-01.glb",           image: "/inventory/tent-20x30-iai-blue-01.png", hasModel: true },
  { slug: "caravan-iai",     division: "inventory", nameEn: "Display Caravan", nameHe: "קרוואן תצוגה",   model3d: "/models/inventory/caravan-iai-3d.glb",              image: "/inventory/caravan-iai-01.PNG", hasModel: true },
  { slug: "lightbox-3m",     division: "inventory", nameEn: "Lightbox 3m",     nameHe: "לייטבוקס 3 מטר", model3d: "/models/inventory/lightbox-3m-iai.glb",             image: "/inventory/lightbox-vertical-iai-01.jpeg", hasModel: true },
  { slug: "inv-projector",   division: "inventory", nameEn: "Digital Dashboard", nameHe: "דשבורד דיגיטלי", model3d: "",                                               image: "/inventory/digital-screen.PNG", hasModel: false },
  { slug: "inv-pedestal-s",  division: "inventory", nameEn: "Display Base S",  nameHe: "בסיס תצוגה קטן",  model3d: "",                                                  image: "/inventory/podium-square-70x70x90-01.png", hasModel: false },
  { slug: "inv-pedestal-m",  division: "inventory", nameEn: "Display Base M",  nameHe: "בסיס תצוגה בינוני",model3d: "",                                                 image: "/inventory/podium-square-100x100x90-01.png", hasModel: false },
  { slug: "inv-pedestal-l",  division: "inventory", nameEn: "Display Base L",  nameHe: "בסיס תצוגה גדול", model3d: "",                                                  image: "/inventory/podium-square-100x100x90-01.png", hasModel: false },
  { slug: "inv-flags-pair",  division: "inventory", nameEn: "IAI Israel Flags", nameHe: "דגל תעשייה אווירית", model3d: "/models/inventory/flags-iai-01.glb",              image: "/inventory/flag-pair-iai-israel-01.png", hasModel: true },
  { slug: "inv-container",   division: "inventory", nameEn: "Display Container", nameHe: "קונטיינר תצוגה",    model3d: "/models/inventory/container-3d.glb",               image: "/inventory/container-3d.PNG", hasModel: true },
  { slug: "inv-small-table", division: "inventory", nameEn: "Small Table",       nameHe: "שולחן קטן",         model3d: "/models/inventory/small-table.glb",                image: "/inventory/small-table.jpg", hasModel: true },
];

export function getMasterExhibit(slug: string): MasterExhibit | undefined {
  return masterExhibits.find((e) => e.slug === slug);
}

export function getMasterExhibitsByDivision(division: MasterExhibitDivision): MasterExhibit[] {
  return masterExhibits.filter((e) => e.division === division);
}
