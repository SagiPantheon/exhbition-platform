export type ExhibitDivision = {
  id: string
  titleHe: string
  titleEn: string
  subDivisions: string[]
  exhibitCount: number
  subDivisionCount: number
  readiness: number
  descriptionHe: string
  ctaHe: string
  previewSystems: string[]
}

export const exhibitDivisions: ExhibitDivision[] = [
  {
    id: "missiles-space-defense",
    titleHe: "חטיבת מט״ח",
    titleEn: "Missiles, Space & Defense",
    subDivisions: ["מלמ", "טילים", "חלל", "הגנה"],
    exhibitCount: 24,
    subDivisionCount: 4,
    readiness: 82,
    descriptionHe: "מעטפת מערכות אסטרטגיות תחת חטיבה אחת",
    ctaHe: "פתח חטיבה",
    previewSystems: ["Arrow", "OPTSAT", "OptSar", "Defense Layer"],
  },
  {
    id: "aviation",
    titleHe: "חטיבת תעופה",
    titleEn: "Aviation",
    subDivisions: ["בדק", "MRO"],
    exhibitCount: 18,
    subDivisionCount: 2,
    readiness: 79,
    descriptionHe: "יכולות תעופה, תחזוקה ותמיכה מבצעית",
    ctaHe: "פתח חטיבה",
    previewSystems: ["MRO Systems", "Aircraft Support", "Mission Support", "Airframe Services"],
  },
  {
    id: "elta",
    titleHe: "חטיבת אלתא",
    titleEn: "ELTA",
    subDivisions: ["רובוטיקה", "תקשורת", "מכ״מים"],
    exhibitCount: 27,
    subDivisionCount: 3,
    readiness: 88,
    descriptionHe: "טכנולוגיות מתקדמות במערכת אחת",
    ctaHe: "פתח חטיבה",
    previewSystems: ["MMR Radar", "Communications Suite", "Robotics Systems", "Sensor Network"],
  },
  {
    id: "uav",
    titleHe: "חטיבת כט״צ",
    titleEn: "UAV",
    subDivisions: ["מלט"],
    exhibitCount: 12,
    subDivisionCount: 1,
    readiness: 84,
    descriptionHe: "מערכות ייעודיות בקו חטיבתי ממוקד",
    ctaHe: "פתח חטיבה",
    previewSystems: ["UAV Family", "Mission Payload", "Control Segment", "Field Deployment"],
  },
]

export const exhibitBankSummary = {
  totalDivisions: 4,
  totalExhibits: 81,
  averageReadiness: 83,
}
