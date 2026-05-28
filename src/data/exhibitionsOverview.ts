export type RequestType = "professional" | "academic" | "internal" | "mixed"
export type ExhibitionStatus = "planned" | "active" | "completed" | "cancelled" | "pending-approval"
export type ExhibitionRegion = "israel" | "abroad"

export type GuestOrigin = {
  country: string
  flag: string
  estimatedCount: number
}

export type ExhibitionRecord = {
  id: string
  nameEn: string
  nameHe: string
  region: ExhibitionRegion
  location: string
  country: string
  flag: string
  startDate: string
  endDate: string
  theme: string
  responsible: string       // IAI person responsible
  contractor: string        // external contractor
  suppliers: string[]
  guestOrigins: GuestOrigin[]
  estimatedCostUSD: number
  requestType: RequestType
  status: ExhibitionStatus
  notes: string
}

export const exhibitionsOverview: ExhibitionRecord[] = [
  {
    id: "jerusalem-space-2026",
    nameEn: "Jerusalem Space Conference",
    nameHe: "כנס חלל ירושלים",
    region: "israel",
    location: "Jerusalem",
    country: "Israel",
    flag: "🇮🇱",
    startDate: "2026-04-30",
    endDate: "2026-05-01",
    theme: "Space Innovation & Education",
    responsible: "Sagi Amiel",
    contractor: "Zaurus Events",
    suppliers: ["Zaurus Events", "IAI Print & Media", "TechStage Ltd."],
    guestOrigins: [
      { country: "Israel", flag: "🇮🇱", estimatedCount: 400 },
      { country: "USA", flag: "🇺🇸", estimatedCount: 80 },
      { country: "France", flag: "🇫🇷", estimatedCount: 40 },
    ],
    estimatedCostUSD: 85000,
    requestType: "professional",
    status: "completed",
    notes: "Beresheet + TecSAR displayed. Strong media coverage.",
  },
  {
    id: "iacas-2026",
    nameEn: "IACAS Conference",
    nameHe: "כנס IACAS",
    region: "israel",
    location: "Tel Aviv",
    country: "Israel",
    flag: "🇮🇱",
    startDate: "2026-05-08",
    endDate: "2026-05-09",
    theme: "Aerospace & Defense Systems",
    responsible: "Sagi Amiel",
    contractor: "Zaurus Events",
    suppliers: ["Zaurus Events", "IAI Logistics"],
    guestOrigins: [
      { country: "Israel", flag: "🇮🇱", estimatedCount: 600 },
      { country: "Germany", flag: "🇩🇪", estimatedCount: 50 },
      { country: "India", flag: "🇮🇳", estimatedCount: 30 },
    ],
    estimatedCostUSD: 120000,
    requestType: "professional",
    status: "completed",
    notes: "Full Space & Air division display. 30×20 tent.",
  },
  {
    id: "haifa-university-2026",
    nameEn: "Haifa University Tech Day",
    nameHe: "יום טכנולוגיה אוניברסיטת חיפה",
    region: "israel",
    location: "Haifa",
    country: "Israel",
    flag: "🇮🇱",
    startDate: "2026-06-15",
    endDate: "2026-06-15",
    theme: "Academic Recruitment & Innovation",
    responsible: "Ran Cohen",
    contractor: "UniExpo",
    suppliers: ["UniExpo", "IAI HR Division"],
    guestOrigins: [
      { country: "Israel", flag: "🇮🇱", estimatedCount: 800 },
    ],
    estimatedCostUSD: 35000,
    requestType: "academic",
    status: "planned",
    notes: "Focus on engineering recruitment. UAV + ELTA systems.",
  },
  {
    id: "paris-air-show-2026",
    nameEn: "Paris Air Show",
    nameHe: "תערוכת אוויר פריז",
    region: "abroad",
    location: "Le Bourget, Paris",
    country: "France",
    flag: "🇫🇷",
    startDate: "2026-06-16",
    endDate: "2026-06-22",
    theme: "Global Aerospace & Defense",
    responsible: "Yoav Levi",
    contractor: "Salon International",
    suppliers: ["Salon International", "IAI Shipping & Logistics", "ProDisplay EU"],
    guestOrigins: [
      { country: "France", flag: "🇫🇷", estimatedCount: 1200 },
      { country: "USA", flag: "🇺🇸", estimatedCount: 900 },
      { country: "UK", flag: "🇬🇧", estimatedCount: 600 },
      { country: "Germany", flag: "🇩🇪", estimatedCount: 500 },
      { country: "Israel", flag: "🇮🇱", estimatedCount: 200 },
    ],
    estimatedCostUSD: 480000,
    requestType: "professional",
    status: "active",
    notes: "Major international event. Full IAI pavilion — all 4 divisions.",
  },
  {
    id: "ausa-washington-2026",
    nameEn: "AUSA Annual Meeting",
    nameHe: "כנס AUSA וושינגטון",
    region: "abroad",
    location: "Washington D.C.",
    country: "USA",
    flag: "🇺🇸",
    startDate: "2026-10-12",
    endDate: "2026-10-14",
    theme: "Land & Defense Systems",
    responsible: "Noa Shapira",
    contractor: "Pentagon Events LLC",
    suppliers: ["Pentagon Events LLC", "IAI North America", "ExhibitForce"],
    guestOrigins: [
      { country: "USA", flag: "🇺🇸", estimatedCount: 2000 },
      { country: "Israel", flag: "🇮🇱", estimatedCount: 150 },
      { country: "UK", flag: "🇬🇧", estimatedCount: 300 },
      { country: "Australia", flag: "🇦🇺", estimatedCount: 200 },
    ],
    estimatedCostUSD: 320000,
    requestType: "professional",
    status: "planned",
    notes: "Land & Naval focus. RoBattle + Katana main display.",
  },
  {
    id: "dsei-london-2026",
    nameEn: "DSEI London",
    nameHe: "תערוכת DSEI לונדון",
    region: "abroad",
    location: "London ExCeL",
    country: "UK",
    flag: "🇬🇧",
    startDate: "2026-09-09",
    endDate: "2026-09-12",
    theme: "Defense & Security Equipment",
    responsible: "Yoav Levi",
    contractor: "Clarion Events",
    suppliers: ["Clarion Events", "IAI Europe Office", "StandBuilder UK"],
    guestOrigins: [
      { country: "UK", flag: "🇬🇧", estimatedCount: 1500 },
      { country: "USA", flag: "🇺🇸", estimatedCount: 700 },
      { country: "Germany", flag: "🇩🇪", estimatedCount: 400 },
      { country: "France", flag: "🇫🇷", estimatedCount: 350 },
      { country: "Israel", flag: "🇮🇱", estimatedCount: 180 },
    ],
    estimatedCostUSD: 390000,
    requestType: "professional",
    status: "planned",
    notes: "Full naval + air systems. Katana submarine model.",
  },
  {
    id: "idf-internal-2026",
    nameEn: "IDF Internal Showcase",
    nameHe: "תצוגה פנימית צה\"ל",
    region: "israel",
    location: "Tel Aviv",
    country: "Israel",
    flag: "🇮🇱",
    startDate: "2026-07-20",
    endDate: "2026-07-20",
    theme: "Internal Systems Review",
    responsible: "Sagi Amiel",
    contractor: "Internal IAI Team",
    suppliers: ["IAI Internal"],
    guestOrigins: [
      { country: "Israel", flag: "🇮🇱", estimatedCount: 120 },
    ],
    estimatedCostUSD: 18000,
    requestType: "internal",
    status: "planned",
    notes: "Restricted access. MCS + Arrow systems only.",
  },
  {
    id: "euronaval-paris-2026",
    nameEn: "Euronaval",
    nameHe: "אירונבל פריז",
    region: "abroad",
    location: "Paris",
    country: "France",
    flag: "🇫🇷",
    startDate: "2026-10-21",
    endDate: "2026-10-24",
    theme: "Naval Defense & Technology",
    responsible: "Noa Shapira",
    contractor: "GICAN / Reed Expositions",
    suppliers: ["GICAN", "IAI Naval Division", "ProDisplay EU"],
    guestOrigins: [
      { country: "France", flag: "🇫🇷", estimatedCount: 800 },
      { country: "Italy", flag: "🇮🇹", estimatedCount: 400 },
      { country: "Greece", flag: "🇬🇷", estimatedCount: 300 },
      { country: "Israel", flag: "🇮🇱", estimatedCount: 100 },
    ],
    estimatedCostUSD: 260000,
    requestType: "professional",
    status: "pending-approval",
    notes: "Awaiting budget approval from VP. Katana + submarine.",
  },
]

// ─── Computed summaries ────────────────────────────────────────────────────────

export const overviewStats = {
  total: exhibitionsOverview.length,
  israel: exhibitionsOverview.filter(e => e.region === "israel").length,
  abroad: exhibitionsOverview.filter(e => e.region === "abroad").length,
  totalBudgetUSD: exhibitionsOverview.reduce((s, e) => s + e.estimatedCostUSD, 0),
  active: exhibitionsOverview.filter(e => e.status === "active").length,
  planned: exhibitionsOverview.filter(e => e.status === "planned").length,
  completed: exhibitionsOverview.filter(e => e.status === "completed").length,
  countries: [...new Set(exhibitionsOverview.map(e => e.country))].length,
}
