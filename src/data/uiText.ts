export type LocalizedLabel = {
  en: string;
  he: string;
};

export const uiText = {
  domains: {
    space: {
      en: "Space",
      he: "חלל",
    },
    air: {
      en: "Air",
      he: "אוויר",
    },
    land: {
      en: "Land",
      he: "יבשה",
    },
    naval: {
      en: "Naval",
      he: "ים",
    },
  },

  navigation: {
    backToMain: {
      en: "Back to Main",
      he: "חזרה לדף הראשי",
    },
    backToSpaceAssets: {
      en: "Back to Space Assets",
      he: "חזרה למוצגי חלל",
    },
    goToExhibitions: {
      en: "Go to Exhibitions",
      he: "מעבר לתערוכות",
    },
  },

  actions: {
    view: {
      en: "View",
      he: "צפה",
    },
    openAssetPage: {
      en: "Open Asset Page",
      he: "פתח עמוד מוצג",
    },
    addToExhibition: {
      en: "Add to Exhibition",
      he: "הוסף לתערוכה",
    },
  },
} as const;
