import { masterExhibits } from "./masterExhibits"

function divisionStats(division: string) {
  const exhibits = masterExhibits.filter((e) => e.division === division)
  const subs = new Set(exhibits.map((e) => e.subdivision).filter((s): s is string => !!s))
  return { exhibitCount: exhibits.length, subDivisionCount: subs.size }
}

const mtach  = divisionStats("mtach")
const teufa  = divisionStats("teufa")
const elta   = divisionStats("elta")
const kataz  = divisionStats("kataz")

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
    subDivisions: ["מלמ", "טילים", "חלל", "הגנה", "תמ״מ"],
    exhibitCount: mtach.exhibitCount,
    subDivisionCount: mtach.subDivisionCount,
    readiness: 82,
    descriptionHe: "מעטפת מערכות אסטרטגיות תחת חטיבה אחת",
    ctaHe: "פתח חטיבה",
    previewSystems: ["Arrow", "OPTSAT", "OptSar", "Defense Layer"],
  },
  {
    id: "aviation",
    titleHe: "חטיבת תעופה",
    titleEn: "Aviation",
    subDivisions: [],
    exhibitCount: teufa.exhibitCount,
    subDivisionCount: teufa.subDivisionCount,
    readiness: 79,
    descriptionHe: "יכולות תעופה, תחזוקה ותמיכה מבצעית",
    ctaHe: "פתח חטיבה",
    previewSystems: ["Boeing 777", "Boeing 767", "KC-135"],
  },
  {
    id: "elta",
    titleHe: "חטיבת אלתא",
    titleEn: "ELTA",
    subDivisions: ['מכ"ם', "SOI", "רובוטיקה", "תקשורת"],
    exhibitCount: elta.exhibitCount,
    subDivisionCount: elta.subDivisionCount,
    readiness: 88,
    descriptionHe: "טכנולוגיות מתקדמות במערכת אחת",
    ctaHe: "פתח חטיבה",
    previewSystems: ["MMR Radar", "Communications Suite", "Robotics Systems", "Sensor Network"],
  },
  {
    id: "uav",
    titleHe: "חטיבת כט״צ",
    titleEn: "UAV",
    subDivisions: [],
    exhibitCount: kataz.exhibitCount,
    subDivisionCount: kataz.subDivisionCount,
    readiness: 84,
    descriptionHe: "מערכות ייעודיות בקו חטיבתי ממוקד",
    ctaHe: "פתח חטיבה",
    previewSystems: ["Heron", "Eitan", "HAROP", "Thunder VTOL"],
  },
]

const _exhibits = masterExhibits.filter((e) => e.division !== "inventory")
const _withModel = _exhibits.filter((e) => e.hasModel).length

export const exhibitBankSummary = {
  totalDivisions: 4,
  totalExhibits: _exhibits.length,
  averageReadiness: _exhibits.length > 0 ? Math.round((_withModel / _exhibits.length) * 100) : 0,
}
