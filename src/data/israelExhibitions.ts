// Shared source of truth for Israel exhibitions seed data.
// Committed to GitHub — pull to sync between home and work computers.

type BoothType = 'with-booth' | 'without-booth' | 'digital-only'
type ExhibitStatus = 'approved' | 'pending' | 'planned'
type LayoutStatus = 'not-started' | 'in-progress' | 'ready'
export type ApprovalStatus = 'approved' | 'pending' | 'not-approved'

type ExhibitionAssetRef = {
  id: string
  assetId: string
  quantity: number
  status: ExhibitStatus
  notes: string
}

type InventoryReservation = {
  inventoryId: string
  quantity: number
}

export type IsraelExhibition = {
  id: string
  nameHe: string
  nameEn: string
  location: string
  startDate: string
  endDate: string
  theme: string
  supplier: string
  screenSupplier?: string
  exhibitionOwner?: string
  approvingManager?: string
  contactPerson?: string        // איש קשר / מארגן
  estimatedBudgetILS?: number  // תקציב משוער ₪
  estimatedGuests?: number     // מספר משתתפים משוער
  approvalStatus?: ApprovalStatus
  brochure: string
  boothType: BoothType
  notes: string
  exhibits: ExhibitionAssetRef[]
  tentTemplate: '' | '25x15' | '30x20' | 'open' | 'hangar'
  layoutStatus: LayoutStatus
  planningItemsCount: number
  inventoryItemIds: string[]
  inventoryReservations?: InventoryReservation[]
}

// ─────────────────────────────────────────────────────────────────────────────
// כדי להוסיף תערוכה חדשה: העתק בלוק אחד, שנה את ה-id ומלא את השדות.
// שדות ריקים (supplier, contactPerson, estimatedBudgetILS וכד') ממתינים לנתונים שלך.
// ─────────────────────────────────────────────────────────────────────────────

export const initialIsraelExhibitions: IsraelExhibition[] = [

  {
    id: 'iacas-2026',
    nameHe: 'כנס IACAS תעופה וחלל',
    nameEn: 'IACAS Aerospace & Space Conference',
    location: 'דן פנורמה תל אביב',
    startDate: '2026-05-28',
    endDate: '2026-05-28',
    theme: 'חדשנות בנושאי הנדסת תעופה וחלל',
    supplier: 'פרימיום',
    screenSupplier: '',
    exhibitionOwner: '',
    approvingManager: '',
    contactPerson: '',
    estimatedBudgetILS: undefined,
    estimatedGuests: undefined,
    approvalStatus: 'approved',
    brochure: '',
    boothType: 'with-booth',
    notes: '',
    tentTemplate: '',
    layoutStatus: 'not-started',
    planningItemsCount: 0,
    inventoryItemIds: [],
    exhibits: [],
  },
  {
    id: 'icsee-2026',
    nameHe: 'כנס ICSEE',
    nameEn: 'ICSEE Conference',
    location: 'מלון רמדה ירושלים',
    startDate: '2026-06-10',
    endDate: '2026-06-11',
    theme: 'הנדסת חשמל, אלקטרוניקה ומערכות מוטמעות — בקרה והספק, הצגת פיתוחים',
    supplier: 'פראגון',
    screenSupplier: '',
    exhibitionOwner: '',
    approvingManager: '',
    contactPerson: '',
    estimatedBudgetILS: undefined,
    estimatedGuests: undefined,
    approvalStatus: 'approved',
    brochure: '',
    boothType: 'with-booth',
    notes: '',
    tentTemplate: '',
    layoutStatus: 'not-started',
    planningItemsCount: 0,
    inventoryItemIds: [],
    exhibits: [],
  },
  {
    id: 'herzliya-conf-2026',
    nameHe: 'כנס הרצליה',
    nameEn: 'Herzliya Conference',
    location: 'אוניברסיטת רייכמן, הרצליה',
    startDate: '2026-06-30',
    endDate: '2026-06-30',
    theme: 'יתואם מול מארגני הכנס',
    supplier: 'אוניברסיטת רייכמן',
    screenSupplier: '',
    exhibitionOwner: '',
    approvingManager: '',
    contactPerson: '',
    estimatedBudgetILS: undefined,
    estimatedGuests: undefined,
    approvalStatus: 'approved',
    brochure: '',
    boothType: 'with-booth',
    notes: '',
    tentTemplate: '',
    layoutStatus: 'not-started',
    planningItemsCount: 0,
    inventoryItemIds: [],
    exhibits: [],
  },
  {
    id: 'uav-propulsion-conf-2026',
    nameHe: 'הכנס ה-12 לטכנולוגיות הנעת כטבמים',
    nameEn: '12th UAV Propulsion Technologies Conference',
    location: 'טכניון חיפה',
    startDate: '2026-07-13',
    endDate: '2026-07-13',
    theme: 'הנעת כטבם',
    supplier: '',
    screenSupplier: '',
    exhibitionOwner: '',
    approvingManager: '',
    contactPerson: '',
    estimatedBudgetILS: undefined,
    estimatedGuests: undefined,
    approvalStatus: 'approved',
    brochure: '',
    boothType: 'with-booth',
    notes: '',
    tentTemplate: '',
    layoutStatus: 'not-started',
    planningItemsCount: 0,
    inventoryItemIds: [],
    exhibits: [],
  },
  {
    id: 'hackathon-manash-2026',
    nameHe: 'האקטון ציר במענ"ש',
    nameEn: 'Manas Hackathon',
    location: 'מיד טאון',
    startDate: '2026-07-01',
    endDate: '2026-08-31',
    theme: 'מיקסום פרויקטים כמענים למעגל שלישי למול אתגרים קיימים ועתידיים',
    supplier: 'פנימי',
    screenSupplier: '',
    exhibitionOwner: '',
    approvingManager: '',
    contactPerson: '',
    estimatedBudgetILS: undefined,
    estimatedGuests: undefined,
    approvalStatus: 'approved',
    brochure: '',
    boothType: 'without-booth',
    notes: '',
    tentTemplate: '',
    layoutStatus: 'not-started',
    planningItemsCount: 0,
    inventoryItemIds: [],
    exhibits: [],
  },
  {
    id: 'nano-tech-conf-2026',
    nameHe: 'כנס ננו טכנולוגיה',
    nameEn: 'Nano Technology Conference',
    location: 'כניני האומה, ירושלים',
    startDate: '2026-09-06',
    endDate: '2026-09-07',
    theme: 'חדשנות + חומרים חכמים, ביוטכנולוגיה, אלקטרוניקה, סטרטאפים ועוד',
    supplier: 'פראגון',
    screenSupplier: '',
    exhibitionOwner: '',
    approvingManager: '',
    contactPerson: '',
    estimatedBudgetILS: undefined,
    estimatedGuests: undefined,
    approvalStatus: 'approved',
    brochure: '',
    boothType: 'with-booth',
    notes: '',
    tentTemplate: '',
    layoutStatus: 'not-started',
    planningItemsCount: 0,
    inventoryItemIds: [],
    exhibits: [],
  },
  {
    id: 'maritime-space-2026',
    nameHe: 'מרחב ימי',
    nameEn: 'Maritime Domain Conference',
    location: 'תל אביב',
    startDate: '2026-10-05',
    endDate: '2026-10-06',
    theme: 'הגנה ימית',
    supplier: 'MP בני מורן',
    screenSupplier: '',
    exhibitionOwner: '',
    approvingManager: '',
    contactPerson: '',
    estimatedBudgetILS: undefined,
    estimatedGuests: undefined,
    approvalStatus: 'approved',
    brochure: '',
    boothType: 'with-booth',
    notes: '',
    tentTemplate: '',
    layoutStatus: 'not-started',
    planningItemsCount: 0,
    inventoryItemIds: [],
    exhibits: [],
  },
  {
    id: 'space-hackathon-2026',
    nameHe: 'האקטון חלל',
    nameEn: 'Space Hackathon',
    location: 'תעא / מט"ח',
    startDate: '2026-10-01',
    endDate: '2026-11-30',
    theme: 'מיצוב IAI כמובילה לאומית בתחום החלל לצרכי מדינת ישראל ולייצוא — בדגש לאתגרי העתיד',
    supplier: 'פנימי',
    screenSupplier: '',
    exhibitionOwner: '',
    approvingManager: '',
    contactPerson: '',
    estimatedBudgetILS: undefined,
    estimatedGuests: undefined,
    approvalStatus: 'approved',
    brochure: '',
    boothType: 'without-booth',
    notes: '',
    tentTemplate: '',
    layoutStatus: 'not-started',
    planningItemsCount: 0,
    inventoryItemIds: [],
    exhibits: [],
  },
  {
    id: 'ai-conf-2026',
    nameHe: 'כנס בנושא AI',
    nameEn: 'AI Conference',
    location: 'אולם סמולארש, אוניברסיטת תל אביב',
    startDate: '2026-11-09',
    endDate: '2026-11-10',
    theme: 'בינה מלאכותית',
    supplier: '',
    screenSupplier: '',
    exhibitionOwner: '',
    approvingManager: '',
    contactPerson: '',
    estimatedBudgetILS: undefined,
    estimatedGuests: undefined,
    approvalStatus: 'approved',
    brochure: '',
    boothType: 'with-booth',
    notes: '',
    tentTemplate: '',
    layoutStatus: 'not-started',
    planningItemsCount: 0,
    inventoryItemIds: [],
    exhibits: [],
  },
  {
    id: 'uvid-2026',
    nameHe: 'כלים לא מאויישים — UVID',
    nameEn: 'UVID — Unmanned Vehicles',
    location: 'אקספו תל אביב',
    startDate: '2026-11-12',
    endDate: '2026-11-12',
    theme: 'כלים לא מאויישים',
    supplier: '',
    screenSupplier: '',
    exhibitionOwner: '',
    approvingManager: '',
    contactPerson: '',
    estimatedBudgetILS: undefined,
    estimatedGuests: undefined,
    approvalStatus: 'not-approved',
    brochure: '',
    boothType: 'with-booth',
    notes: 'ממתין לאישור',
    tentTemplate: '',
    layoutStatus: 'not-started',
    planningItemsCount: 0,
    inventoryItemIds: [],
    exhibits: [],
  },
  {
    id: 'defense-week-summit-2026',
    nameHe: 'דיפנס וויק סמיט',
    nameEn: 'Defense Week Summit',
    location: 'סמולארש, אוניברסיטת תל אביב',
    startDate: '2026-12-02',
    endDate: '2026-12-03',
    theme: 'טכנולוגיות וחדשנות בנושאי הגנת מולדת',
    supplier: '',
    screenSupplier: '',
    exhibitionOwner: '',
    approvingManager: '',
    contactPerson: '',
    estimatedBudgetILS: undefined,
    estimatedGuests: undefined,
    approvalStatus: 'approved',
    brochure: '',
    boothType: 'with-booth',
    notes: '',
    tentTemplate: '',
    layoutStatus: 'not-started',
    planningItemsCount: 0,
    inventoryItemIds: [],
    exhibits: [],
  },
]
