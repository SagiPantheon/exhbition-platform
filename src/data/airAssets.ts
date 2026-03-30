export type LocalizedText = {
  en: string;
  he: string;
};

export type AirAsset = {
  slug: string;
  code: string;
  image: string;
  model3d?: string;
  missionType: "defense" | "strike";
  assetCategory: "missile" | "launcher";
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

export const airAssets: AirAsset[] = [
  {
    slug: "arrow-3",
    code: "AR-001",
    image: "/images/air/arrow-3-launcher-showcase.png",
    model3d: "/models/air/arrow-3-showcase-3d.glb",
    missionType: "defense",
    assetCategory: "launcher",

    title: {
      en: "Arrow-3 Launcher",
      he: "משגר חץ 3",
    },

    subtitle: {
      en: "Premium Arrow-3 launcher display for air-defense exhibition presentation.",
      he: "משגר חץ 3 לתצוגת פרימיום של הגנה אווירית בתערוכה.",
    },

    description: {
      en: "Mobile Arrow-3 launcher platform presented as a premium air-defense exhibition asset with strong visual impact and VIP presentation value.",
      he: "פלטפורמת משגר חץ 3 ניידת המוצגת כנכס תערוכתי פרימיום בתחום ההגנה האווירית עם נוכחות חזקה וערך גבוה להצגת VIP.",
    },

    status: {
      en: "Approved",
      he: "מאושר",
    },

    config: {
      en: "Arrow-3 launcher display",
      he: "תצוגת משגר חץ 3",
    },

    scale: "1:1",

    specs: {
      height: "3.6 m",
      width: "2.5 m",
      length: "12.2 m",
      weight: "TBD",
      standDiameter: "N/A",
      standWeight: "N/A",
    },

    readiness: {
      environment: {
        en: "Indoor / Outdoor",
        he: "פנים / חוץ",
      },
      displayMethod: {
        en: "Mobile platform",
        he: "פלטפורמה ניידת",
      },
      support: {
        en: "Stability-rated",
        he: "מיועד ליציבות",
      },
      presentationLevel: {
        en: "Premium",
        he: "פרימיום",
      },
      visualLanguage: {
        en: "Operational air-defense showcase",
        he: "שפת תצוגה מבצעית של הגנה אווירית",
      },
    },
  },
  {
    slug: "lora",
    code: "AR-002",
    image: "/images/air/lora-showcase.png",
    model3d: "/models/air/lora-showcase-3d.glb",
    missionType: "strike",
    assetCategory: "missile",
    title: {
      en: "LORA",
      he: "לורה",
    },
    subtitle: {
      en: "Precision strike missile mock-up for premium exhibition presentation.",
      he: "דגם טיל תקיפה מדויקת לתצוגת פרימיום בתערוכה.",
    },
    description: {
      en: "Prepared for premium exhibition display, visual impact, and future presentation planning in the strike systems category.",
      he: "מוכן לתצוגת פרימיום, נוכחות חזותית חזקה ותכנון עתידי של הצגה בקטגוריית מערכות תקיפה.",
    },
    status: {
      en: "Approved",
      he: "מאושר",
    },
    config: {
      en: "Missile display",
      he: "תצוגת טיל",
    },
    scale: "1:1",
    specs: {
      length: "5.2 m",
      width: "0.62 m",
      height: "5.2 m",
      weight: "TBD",
      standDiameter: "N/A",
      standWeight: "N/A",
    },
    readiness: {
      environment: {
        en: "Indoor / outdoor",
        he: "פנים / חוץ",
      },
      displayMethod: {
        en: "Vertical missile stand",
        he: "סטנד טיל אנכי",
      },
      support: {
        en: "Integrated base support",
        he: "תמיכה מובנית בבסיס",
      },
      presentationLevel: {
        en: "Premium",
        he: "פרימיום",
      },
      visualLanguage: {
        en: "Strike missile showcase",
        he: "תצוגת טיל תקיפה",
      },
    },
  },
  {
    slug: "arrow-2",
    code: "AR-003",
    image: "/images/air/arrow-2-showcase.png",
    model3d: "/models/air/arrow-2-showcase-3d.glb",
    missionType: "defense",
    assetCategory: "missile",
    title: {
      en: "Arrow-2",
      he: "חץ 2",
    },
    subtitle: {
      en: "Strategic interceptor missile mock-up for premium exhibition presentation.",
      he: "דגם טיל יירוט אסטרטגי לתצוגת פרימיום בתערוכה.",
    },
    description: {
      en: "Prepared for premium exhibition display, strategic defense storytelling, and future presentation planning in the missile systems category.",
      he: "מוכן לתצוגת פרימיום, המחשת מערך הגנה אסטרטגי ותכנון עתידי של הצגה בקטגוריית מערכות טילים.",
    },
    status: {
      en: "Approved",
      he: "מאושר",
    },
    config: {
      en: "Missile display",
      he: "תצוגת טיל",
    },
    scale: "1:1",
    specs: {
      length: "7.0 m",
      width: "0.8 m",
      height: "7.0 m",
      weight: "TBD",
      standDiameter: "N/A",
      standWeight: "N/A",
    },
    readiness: {
      environment: {
        en: "Indoor / outdoor",
        he: "פנים / חוץ",
      },
      displayMethod: {
        en: "Vertical missile stand",
        he: "סטנד טיל אנכי",
      },
      support: {
        en: "Integrated base support",
        he: "תמיכה מובנית בבסיס",
      },
      presentationLevel: {
        en: "Premium",
        he: "פרימיום",
      },
      visualLanguage: {
        en: "Strategic missile showcase",
        he: "תצוגת טיל אסטרטגי",
      },
    },
  },
  {
    slug: "arrow-3-missile",
    code: "AR-004",
    image: "/images/air/arrow-3-showcase.png",
    model3d: "/models/air/arrow-3.glb",
    missionType: "defense",
    assetCategory: "missile",
    title: {
      en: "Arrow-3 Missile",
      he: "טיל חץ 3",
    },
    subtitle: {
      en: "Strategic exo-atmospheric interceptor missile mock-up for premium exhibition presentation.",
      he: "דגם טיל יירוט אקסו-אטמוספרי אסטרטגי לתצוגת פרימיום בתערוכה.",
    },
    description: {
      en: "Prepared for premium exhibition display, strategic missile storytelling, and future presentation planning in the air-defense systems category.",
      he: "מוכן לתצוגת פרימיום, המחשת מערך טילים אסטרטגי ותכנון עתידי של הצגה בקטגוריית מערכות ההגנה האווירית.",
    },
    status: {
      en: "Approved",
      he: "מאושר",
    },
    config: {
      en: "Missile display",
      he: "תצוגת טיל",
    },
    scale: "1:1",
    specs: {
      length: "7.0 m",
      width: "0.8 m",
      height: "7.0 m",
      weight: "TBD",
      standDiameter: "N/A",
      standWeight: "N/A",
    },
    readiness: {
      environment: {
        en: "Indoor / outdoor",
        he: "פנים / חוץ",
      },
      displayMethod: {
        en: "Vertical missile stand",
        he: "סטנד טיל אנכי",
      },
      support: {
        en: "Integrated base support",
        he: "תמיכה מובנית בבסיס",
      },
      presentationLevel: {
        en: "Premium",
        he: "פרימיום",
      },
      visualLanguage: {
        en: "Arrow-3 missile showcase",
        he: "תצוגת טיל חץ 3",
      },
    },
  },
  {
    slug: "heron",
    code: "AR-005",
    image: "/images/air/heron-showcase.png",
    model3d: "/models/air/heron-showcase-3d.glb",
    missionType: "defense",
    assetCategory: "uav",
    title: {
      en: "Heron",
      he: "הרון",
    },
    subtitle: {
      en: "Long-endurance UAV mock-up for premium exhibition presentation.",
      he: "דגם כטב״ם להרצאת תצוגה פרימיום בתערוכה.",
    },
    description: {
      en: "Prepared for premium exhibition display, ISR storytelling, and future presentation planning in the unmanned systems category.",
      he: "מוכן לתצוגת פרימיום בתערוכה, להצגת יכולות מודיעין, סיור ואיסוף, ולתכנון עתידי בקטגוריית המערכות הבלתי מאוישות.",
    },
    status: {
      en: "Approved",
      he: "מאושר",
    },
    config: {
      en: "UAV display",
      he: "תצוגת כטב״ם",
    },
    scale: "1:1",
    specs: {
      length: "TBD",
      width: "TBD",
      height: "TBD",
      weight: "TBD",
      standDiameter: "N/A",
      standWeight: "N/A",
    },
    readiness: {
      environment: {
        en: "Indoor / outdoor",
        he: "פנים / חוץ",
      },
      displayMethod: {
        en: "Static UAV display",
        he: "תצוגת כטב״ם סטטית",
      },
      support: {
        en: "Integrated support base",
        he: "בסיס תמיכה משולב",
      },
      presentationLevel: {
        en: "Premium",
        he: "פרימיום",
      },
      visualLanguage: {
        en: "Unmanned systems showcase",
        he: "שפת תצוגה של מערכות בלתי מאוישות",
      },
    },
  },
  {
    slug: "wanderb",
    code: "AR-006",
    image: "/images/air/wanderb-showcase.png",
    model3d: "/models/air/wanderb-showcase-3d.glb",
    missionType: "defense",
    assetCategory: "uav",
    title: {
      en: "WanderB",
      he: "וונדר בי",
    },
    subtitle: {
      en: "Compact UAV mock-up for premium exhibition presentation.",
      he: "דגם כטב״ם קומפקטי לתצוגת פרימיום בתערוכה.",
    },
    description: {
      en: "Prepared for premium exhibition display, tactical unmanned systems storytelling, and future presentation planning in the UAV category.",
      he: "מוכן לתצוגת פרימיום בתערוכה, להצגת יכולות טקטיות של מערכות בלתי מאוישות, ולתכנון עתידי בקטגוריית הכטב״מים.",
    },
    status: {
      en: "Approved",
      he: "מאושר",
    },
    config: {
      en: "UAV display",
      he: "תצוגת כטב״ם",
    },
    scale: "1:1",
    specs: {
      length: "TBD",
      width: "TBD",
      height: "TBD",
      weight: "TBD",
      standDiameter: "N/A",
      standWeight: "N/A",
    },
    readiness: {
      environment: {
        en: "Indoor / outdoor",
        he: "פנים / חוץ",
      },
      displayMethod: {
        en: "Static UAV display",
        he: "תצוגת כטב״ם סטטית",
      },
      support: {
        en: "Integrated support base",
        he: "בסיס תמיכה משולב",
      },
      presentationLevel: {
        en: "Premium",
        he: "פרימיום",
      },
      visualLanguage: {
        en: "Compact UAV showcase",
        he: "שפת תצוגה של כטב״ם קומפקטי",
      },
    },
  },
];

export function getAirAssetBySlug(slug: string) {
  return airAssets.find((asset) => asset.slug === slug);
}

export function getAllAirAssetSlugs() {
  return airAssets.map((asset) => asset.slug);
}
