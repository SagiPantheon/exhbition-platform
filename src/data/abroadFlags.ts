export type AbroadFlagCard = {
  slug: string;
  isoCode: string;
  flag: string;
  country: string;
  countryHe: string;
  statusEn: string;
  statusHe: string;
  noteEn: string;
  noteHe: string;
};

export const abroadFlagCards: AbroadFlagCard[] = [
  {
    slug: "greece",
    isoCode: "GR",
    flag: "🇬🇷",
    country: "Greece",
    countryHe: "יוון",
    statusEn: "Active example",
    statusHe: "דוגמה פעילה",
    noteEn: "MARE MED Athens can serve as the first real anchor for the abroad layer.",
    noteHe: "MARE MED Athens יכולה לשמש כעוגן הראשון והאמיתי של שכבת החו״ל.",
  },
  {
    slug: "austria",
    isoCode: "AT",
    flag: "🇦🇹",
    country: "Austria",
    countryHe: "אוסטריה",
    statusEn: "Future route",
    statusHe: "ציר עתידי",
    noteEn: "Useful for future conference and exhibition planning in Central Europe.",
    noteHe: "רלוונטי לתכנון עתידי של כנסים ותערוכות במרכז אירופה.",
  },
  {
    slug: "slovakia",
    isoCode: "SK",
    flag: "🇸🇰",
    country: "Slovakia",
    countryHe: "סלובקיה",
    statusEn: "Future route",
    statusHe: "ציר עתידי",
    noteEn: "Can support regional planning logic around nearby European events.",
    noteHe: "יכול לתמוך בלוגיקת תכנון אזורית סביב אירועים אירופיים סמוכים.",
  },
  {
    slug: "germany",
    isoCode: "DE",
    flag: "🇩🇪",
    country: "Germany",
    countryHe: "גרמניה",
    statusEn: "Strategic market",
    statusHe: "שוק אסטרטגי",
    noteEn: "Strong fit for a premium international exhibitions layer.",
    noteHe: "מתאים מאוד לשכבת תערוכות בינלאומיות ברמה גבוהה.",
  },
  {
    slug: "france",
    isoCode: "FR",
    flag: "🇫🇷",
    country: "France",
    countryHe: "צרפת",
    statusEn: "Strategic market",
    statusHe: "שוק אסטרטגי",
    noteEn: "Good candidate for future aerospace, defense, and technology presence.",
    noteHe: "מועמדת טובה לנוכחות עתידית בתחומי תעופה, ביטחון וטכנולוגיה.",
  },
  {
    slug: "united-kingdom",
    isoCode: "GB",
    flag: "🇬🇧",
    country: "United Kingdom",
    countryHe: "בריטניה",
    statusEn: "Strategic market",
    statusHe: "שוק אסטרטגי",
    noteEn: "Supports international visibility and decision-level presentation value.",
    noteHe: "תומך בחשיפה בינלאומית ובערך הצגתי מול דרגי הנהלה.",
  },
  {
    slug: "usa",
    isoCode: "US",
    flag: "🇺🇸",
    country: "United States",
    countryHe: "ארצות הברית",
    statusEn: "Strategic market",
    statusHe: "שוק אסטרטגי",
    noteEn: "Important long-range country card for a serious global exhibitions platform.",
    noteHe: "כרטיס מדינה חשוב לטווח רחוק עבור פלטפורמת תערוכות גלובלית רצינית.",
  },
  {
    slug: "india",
    isoCode: "IN",
    flag: "🇮🇳",
    country: "India",
    countryHe: "הודו",
    statusEn: "Growth route",
    statusHe: "ציר צמיחה",
    noteEn: "Adds scale and international breadth to the abroad exhibitions vision.",
    noteHe: "מוסיף היקף ורוחב בינלאומי לחזון תערוכות החו״ל.",
  },
  {
    slug: "singapore",
    isoCode: "SG",
    flag: "🇸🇬",
    country: "Singapore",
    countryHe: "סינגפור",
    statusEn: "Growth route",
    statusHe: "ציר צמיחה",
    noteEn: "A compact but strong country card for high-level technology exhibitions.",
    noteHe: "כרטיס מדינה קומפקטי אך חזק עבור תערוכות טכנולוגיה ברמה גבוהה.",
  },
  {
    slug: "uae",
    isoCode: "AE",
    flag: "🇦🇪",
    country: "United Arab Emirates",
    countryHe: "איחוד האמירויות",
    statusEn: "Regional hub",
    statusHe: "מרכז אזורי",
    noteEn: "Useful for future regional exhibition and delegation planning.",
    noteHe: "שימושי לתכנון עתידי של תערוכות ומשלחות אזוריות.",
  },
];
