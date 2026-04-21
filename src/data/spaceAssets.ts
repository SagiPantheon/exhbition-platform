export type LocalizedText = {
  en: string;
  he: string;
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

export const spaceAssets: SpaceAsset[] = [
  {
    slug: "mcs",
    code: "SP-004",
    image: "/images/space/mcs-showcase.png",
    model3d: "/models/space/mcs-showcase-3d.glb",
    title: { en: "MCS", he: "MCS" },
    subtitle: {
      en: "Premium technical showcase panel for the current MCS exhibition mock-up.",
      he: "פאנל תצוגה טכני מתקדם עבור דגם התערוכה הנוכחי של MCS.",
    },
    description: {
      en: "Arrow-3 style presentation language with defense-tech visual treatment and readiness for future interactive 3D asset presentation.",
      he: "שפת תצוגה בסגנון חץ 3 עם אופי ויזואלי טכנולוגי-ביטחוני ומוכנות עתידית להצגה אינטראקטיבית תלת-ממדית.",
    },
    status: { en: "Approved", he: "מאושר" },
    config: { en: "Mock-up", he: "דגם" },
    scale: "1:2",
    specs: {
      height: "2.0 m",
      width: "1.6 m",
      length: "1.0 m",
      weight: "37 kg",
      standDiameter: "1.0–1.2 m",
      standWeight: "50 kg",
    },
    readiness: {
      environment: { en: "Indoor only", he: "לתצוגת פנים בלבד" },
      displayMethod: { en: "Round pedestal", he: "כן עגול" },
      support: { en: "Vertical pipe", he: "צינור אנכי" },
      presentationLevel: { en: "Approved showcase", he: "תצוגה מאושרת" },
      visualLanguage: { en: "Arrow-3 style panel", he: "פאנל בסגנון חץ 3" },
    },
  },
  {
    slug: "optsat-500",
    code: "SP-001",
    image: "/images/space/optsat-500-showcase.png",
    model3d: "/models/space/optsat-500-showcase-3d.glb",
    title: { en: "OPTSAT-500", he: "OPTSAT-500" },
    subtitle: {
      en: "Electro-optical observation satellite mock-up for indoor exhibition showcase.",
      he: "דגם לוויין תצפית אלקטרו-אופטי לתצוגת פנים בתערוכה.",
    },
    description: {
      en: "Prepared for static display planning, supplier coordination, and future exhibition configuration work.",
      he: "מוכן לתכנון תצוגה סטטית, תיאום מול ספקים ועבודת קונפיגורציה עתידית לתערוכות.",
    },
    status: { en: "Approved", he: "מאושר" },
    config: { en: "Mock-up", he: "דגם" },
    scale: "1:2",
    specs: {
      height: "1.0 m",
      width: "0.8 m",
      length: "0.8 m",
      weight: "15 kg",
      standDiameter: "0.9 m",
      standWeight: "30 kg",
    },
    readiness: {
      environment: { en: "Indoor only", he: "לתצוגת פנים בלבד" },
      displayMethod: { en: "Original stand", he: "סטנד מקורי" },
      support: { en: "Central pipe", he: "צינור מרכזי" },
      presentationLevel: { en: "Approved showcase", he: "תצוגה מאושרת" },
      visualLanguage: { en: "Space panel", he: "פאנל חלל" },
    },
  },
  {
    slug: "optsar-550",
    code: "SP-002",
    image: "/images/space/optsar-550-showcase.png",
    model3d: "/models/space/optsar-550-showcase-3d.glb",
    title: { en: "OPTSAR-550", he: "OPTSAR-550" },
    subtitle: {
      en: "Advanced reconnaissance platform mock-up for premium indoor exhibition presentation.",
      he: "דגם פלטפורמת סיור מתקדמת לתצוגת פנים פרימיום.",
    },
    description: {
      en: "Structured for planning, mock-up handling, display readiness checks, and exhibition approvals.",
      he: "בנוי לתכנון, טיפול בדגם, בדיקות מוכנות לתצוגה ואישורי תערוכה.",
    },
    status: { en: "Approved", he: "מאושר" },
    config: { en: "Mock-up", he: "דגם" },
    scale: "1:2",
    specs: {
      height: "2.15 m",
      width: "0.75 m",
      length: "0.75 m",
      weight: "20 kg",
      standDiameter: "1.0 m",
      standWeight: "42 kg",
    },
    readiness: {
      environment: { en: "Indoor only", he: "לתצוגת פנים בלבד" },
      displayMethod: { en: "Round pedestal", he: "כן עגול" },
      support: { en: "Vertical pole", he: "עמוד אנכי" },
      presentationLevel: { en: "Approved showcase", he: "תצוגה מאושרת" },
      visualLanguage: { en: "Arrow-3 style panel", he: "פאנל בסגנון חץ 3" },
    },
  },
  {
    slug: "optsat-3000",
    code: "SP-003",
    image: "/images/space/optsat-3000-showcase.png",
    model3d: "/models/space/optsat-3000-showcase-3d.glb",
    title: { en: "OPTSAT 3000", he: "OPTSAT 3000" },
    subtitle: {
      en: "High-capacity electro-optical satellite mock-up for exhibition display and logistics planning.",
      he: "דגם לוויין אלקטרו-אופטי בעל קיבולת גבוהה לתצוגה ולתכנון לוגיסטי.",
    },
    description: {
      en: "Built for logistics planning, display preparation, supplier coordination, and exhibition approval flow.",
      he: "נבנה עבור תכנון לוגיסטי, הכנת תצוגה, תיאום ספקים ותהליך אישורים לתערוכה.",
    },
    status: { en: "Approved", he: "מאושר" },
    config: { en: "Mock-up", he: "דגם" },
    scale: "1:2",
    specs: {
      height: "2.2 m",
      width: "1.1 m",
      length: "1.1 m",
      weight: "35 kg",
      standDiameter: "1.1 m",
      standWeight: "55 kg",
    },
    readiness: {
      environment: { en: "Indoor only", he: "לתצוגת פנים בלבד" },
      displayMethod: { en: "Square stand", he: "סטנד מרובע" },
      support: { en: "Central support", he: "תמיכה מרכזית" },
      presentationLevel: { en: "Approved showcase", he: "תצוגה מאושרת" },
      visualLanguage: { en: "Large showcase panel", he: "פאנל תצוגה גדול" },
    },
  },
  {
    slug: "tecsar",
    code: "SP-005",
    image: "/images/space/tecsar-showcase.png",
    model3d: "/models/space/tecsar-showcase-3d.glb",
    title: { en: "TECSAR", he: "TECSAR" },
    subtitle: {
      en: "Synthetic aperture radar satellite mock-up for exhibition presentation and technical storytelling.",
      he: "דגם לוויין מכ״ם מפתח סינתטי לתצוגה ולהמחשה טכנית.",
    },
    description: {
      en: "Supports radar-platform presentation logic, indoor logistics coordination, and premium technical display planning.",
      he: "תומך בלוגיקת הצגת פלטפורמת מכ״ם, תיאום לוגיסטי פנימי ותכנון תצוגה טכנית מתקדמת.",
    },
    status: { en: "Approved", he: "מאושר" },
    config: { en: "Mock-up", he: "דגם" },
    scale: "1:2",
    specs: {
      height: "2.0 m",
      width: "1.4 m",
      length: "1.0 m",
      weight: "37 kg",
      standDiameter: "1.0–1.2 m",
      standWeight: "50 kg",
    },
    readiness: {
      environment: { en: "Indoor only", he: "לתצוגת פנים בלבד" },
      displayMethod: { en: "Original stand", he: "סטנד מקורי" },
      support: { en: "Vertical pipe", he: "צינור אנכי" },
      presentationLevel: { en: "Approved showcase", he: "תצוגה מאושרת" },
      visualLanguage: { en: "Photo-to-panel display", he: "תצוגת צילום-לפאנל" },
    },
  },
  {
    slug: "beresheet",
    code: "SP-006",
    image: "/images/space/beresheet-showcase.png",
    model3d: "/models/space/beresheet-showcase-3d.glb",
    title: { en: "Beresheet", he: "בראשית" },
    subtitle: {
      en: "Lunar lander mock-up for premium mission-story exhibition display.",
      he: "דגם נחתת ירח לתצוגת פרימיום עם סיפור משימה.",
    },
    description: {
      en: "Designed for exhibition presentation, mission storytelling, logistics planning, and approval coordination.",
      he: "מיועד להצגת תערוכה, סיפור משימה, תכנון לוגיסטי ותיאום אישורים.",
    },
    status: { en: "Approved", he: "מאושר" },
    config: { en: "Mock-up", he: "דגם" },
    scale: "1:2",
    specs: {
      height: "1.8 m",
      width: "1.5 m",
      length: "1.5 m",
      weight: "40 kg",
      standDiameter: "1.3 m",
      standWeight: "58 kg",
    },
    readiness: {
      environment: { en: "Indoor only", he: "לתצוגת פנים בלבד" },
      displayMethod: { en: "Round podium", he: "פודיום עגול" },
      support: { en: "Integrated legs", he: "רגליים משולבות" },
      presentationLevel: { en: "Approved showcase", he: "תצוגה מאושרת" },
      visualLanguage: { en: "Mission panel", he: "פאנל משימה" },
    },
  },
  {
    slug: "shavit",
    code: "SP-007",
    image: "/images/space/shavit-showcase.png",
    model3d: "/models/space/shavit-showcase-3d.glb",
    title: { en: "Shavit", he: "שביט" },
    subtitle: {
      en: "Launcher mock-up for vertical premium exhibition presentation.",
      he: "דגם משגר לתצוגת פרימיום אנכית בתערוכה.",
    },
    description: {
      en: "Structured for safe indoor exhibition handling, vertical presentation logic, and display coordination.",
      he: "בנוי לטיפול בטוח בתצוגת פנים, לוגיקת הצגה אנכית ותיאום תצוגה.",
    },
    status: { en: "Approved", he: "מאושר" },
    config: { en: "Mock-up", he: "דגם" },
    scale: "1:3",
    specs: {
      height: "3.4 m",
      width: "0.55 m",
      length: "0.55 m",
      weight: "32 kg",
      standDiameter: "0.9 m",
      standWeight: "45 kg",
    },
    readiness: {
      environment: { en: "Indoor only", he: "לתצוגת פנים בלבד" },
      displayMethod: { en: "Vertical stand", he: "סטנד אנכי" },
      support: { en: "Rear support", he: "תמיכת גב אחורית" },
      presentationLevel: { en: "Approved showcase", he: "תצוגה מאושרת" },
      visualLanguage: { en: "Launcher panel", he: "פאנל משגר" },
    },
  }
];

export function getSpaceAssetBySlug(slug: string) {
  return spaceAssets.find((asset) => asset.slug === slug);
}

