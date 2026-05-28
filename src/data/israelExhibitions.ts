// Shared source of truth for Israel exhibitions seed data.
// This file is committed to GitHub so both home and work computers can pull the same base version.

type BoothType = 'with-booth' | 'without-booth' | 'digital-only'
type ExhibitStatus = 'approved' | 'pending' | 'planned'
type LayoutStatus = 'not-started' | 'in-progress' | 'ready'

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
  brochure: string
  boothType: BoothType
  notes: string
  exhibits: ExhibitionAssetRef[]
  tentTemplate: '' | 'tent-25x10' | 'tent-30x20'
  layoutStatus: LayoutStatus
  planningItemsCount: number
  inventoryItemIds: string[]
  inventoryReservations?: InventoryReservation[]
}

export const initialIsraelExhibitions: IsraelExhibition[] = [

  // ── הושלם ─────────────────────────────────────────────────────────────────────

  {
    id: 'technion-innovation-day-2026',
    nameHe: 'יום חדשנות הטכניון',
    nameEn: 'Technion Innovation Day',
    location: 'חיפה',
    startDate: '2026-03-18',
    endDate: '2026-03-18',
    theme: 'גיוס הנדסאים וחדשנות טכנולוגית',
    supplier: 'קרן המחקר של הטכניון',
    screenSupplier: '',
    exhibitionOwner: 'Ran Cohen',
    approvingManager: '',
    brochure: '',
    boothType: 'with-booth',
    notes: 'אירוע גיוס סגל הנדסאים. מודלי כלי טיס על התצוגה.',
    tentTemplate: '',
    layoutStatus: 'ready',
    planningItemsCount: 0,
    inventoryItemIds: [],
    exhibits: [
      { id: 'tech-ref-1', assetId: 'air-heron', quantity: 1, status: 'approved', notes: 'מודל תצוגה' },
    ],
  },
  {
    id: 'ben-gurion-space-day-2026',
    nameHe: 'יום החלל אוניברסיטת בן גוריון',
    nameEn: 'Ben Gurion University Space Day',
    location: 'באר שבע',
    startDate: '2026-05-05',
    endDate: '2026-05-05',
    theme: 'מחקר חלל אקדמי וגיוס מהנדסים',
    supplier: 'BGU Events',
    screenSupplier: '',
    exhibitionOwner: 'Ran Cohen',
    approvingManager: '',
    brochure: '',
    boothType: 'with-booth',
    notes: 'גיוס סגל הנדסי. מודלי DSAR ולוויין ננו על התצוגה.',
    tentTemplate: '',
    layoutStatus: 'ready',
    planningItemsCount: 0,
    inventoryItemIds: [],
    exhibits: [
      { id: 'bgu-ref-1', assetId: 'space-optsat-3000', quantity: 1, status: 'approved', notes: 'מודל תצוגה' },
    ],
  },
  {
    id: 'jerusalem-space-conf',
    nameHe: 'כנס חלל ירושלים',
    nameEn: 'Jerusalem Space Conference',
    location: 'ירושלים',
    startDate: '2026-04-30',
    endDate: '2026-05-01',
    theme: 'חלל, חדשנות וחינוך',
    supplier: 'זאורוס',
    screenSupplier: '',
    exhibitionOwner: 'Sagi Amiel',
    approvingManager: '',
    brochure: '',
    boothType: 'with-booth',
    notes: 'בראשית + טקסאר על התצוגה. כיסוי תקשורתי נרחב.',
    tentTemplate: 'tent-25x10',
    layoutStatus: 'ready',
    planningItemsCount: 4,
    inventoryItemIds: [
      'podium-square-100x100x90-01',
      'flag-pair-iai-israel-01',
    ],
    inventoryReservations: [
      { inventoryId: 'podium-square-100x100x90-01', quantity: 1 },
      { inventoryId: 'flag-pair-iai-israel-01', quantity: 1 },
    ],
    exhibits: [
      { id: 'ref-1', assetId: 'space-beresheet', quantity: 1, status: 'approved', notes: '' },
      { id: 'ref-2', assetId: 'space-tecsar',    quantity: 1, status: 'approved', notes: '' },
    ],
  },
  {
    id: 'iacas-panorama',
    nameHe: 'כנס IACAS',
    nameEn: 'IACAS Conference',
    location: 'תל אביב',
    startDate: '2026-05-08',
    endDate: '2026-05-09',
    theme: 'מערכות תעופה וביטחון',
    supplier: 'זאורוס',
    screenSupplier: '',
    exhibitionOwner: 'Sagi Amiel',
    approvingManager: '',
    brochure: '',
    boothType: 'with-booth',
    notes: 'תצוגה מלאה של חטיבת חלל ואוויר. אוהל 30x20.',
    tentTemplate: 'tent-30x20',
    layoutStatus: 'ready',
    planningItemsCount: 6,
    inventoryItemIds: [
      'podium-square-100x100x90-01',
      'flag-pair-iai-israel-01',
      'table-cover-iai-blue-01',
      'sign-stand-silver-a4-01',
    ],
    inventoryReservations: [
      { inventoryId: 'podium-square-100x100x90-01', quantity: 1 },
      { inventoryId: 'flag-pair-iai-israel-01',     quantity: 1 },
      { inventoryId: 'table-cover-iai-blue-01',     quantity: 1 },
      { inventoryId: 'sign-stand-silver-a4-01',     quantity: 1 },
    ],
    exhibits: [
      { id: 'iacas-ref-1', assetId: 'space-beresheet',  quantity: 1, status: 'approved', notes: '' },
      { id: 'iacas-ref-2', assetId: 'space-tecsar',     quantity: 1, status: 'approved', notes: '' },
      { id: 'iacas-ref-3', assetId: 'air-heron',        quantity: 1, status: 'approved', notes: '' },
      { id: 'iacas-ref-4', assetId: 'air-arrow-2',      quantity: 1, status: 'pending',  notes: '' },
    ],
  },

  // ── פעיל ──────────────────────────────────────────────────────────────────────

  {
    id: 'isdef-tel-aviv-2026',
    nameHe: 'ISDEF תל אביב',
    nameEn: 'ISDEF Tel Aviv',
    location: 'אקספו תל אביב',
    startDate: '2026-06-03',
    endDate: '2026-06-05',
    theme: 'תערוכת הביטחון והמולדת של ישראל',
    supplier: 'Isral-Expo',
    screenSupplier: 'TechStage Ltd.',
    exhibitionOwner: 'Sagi Amiel',
    approvingManager: '',
    brochure: '',
    boothType: 'with-booth',
    notes: 'אירוע הדגל הלאומי של תעא. כל 4 חטיבות. ביתן מלא 40×30 מ׳.',
    tentTemplate: 'tent-30x20',
    layoutStatus: 'in-progress',
    planningItemsCount: 12,
    inventoryItemIds: [],
    exhibits: [
      { id: 'isdef-ref-1', assetId: 'air-heron',         quantity: 1, status: 'approved', notes: '' },
      { id: 'isdef-ref-2', assetId: 'air-harop',         quantity: 1, status: 'approved', notes: '' },
      { id: 'isdef-ref-3', assetId: 'land-robattle',     quantity: 1, status: 'approved', notes: '' },
      { id: 'isdef-ref-4', assetId: 'space-beresheet',   quantity: 1, status: 'pending',  notes: '' },
      { id: 'isdef-ref-5', assetId: 'air-arrow-2',       quantity: 1, status: 'pending',  notes: '' },
    ],
  },

  // ── מתוכנן ────────────────────────────────────────────────────────────────────

  {
    id: 'haifa-university-2026',
    nameHe: 'יום טכנולוגיה אוניברסיטת חיפה',
    nameEn: 'Haifa University Tech Day',
    location: 'חיפה',
    startDate: '2026-06-15',
    endDate: '2026-06-15',
    theme: 'גיוס אקדמי וחדשנות',
    supplier: 'UniExpo',
    screenSupplier: '',
    exhibitionOwner: 'Ran Cohen',
    approvingManager: '',
    brochure: '',
    boothType: 'with-booth',
    notes: 'דגש על גיוס הנדסאים. כלי טיס + מערכות ELTA על התצוגה.',
    tentTemplate: '',
    layoutStatus: 'not-started',
    planningItemsCount: 0,
    inventoryItemIds: [],
    exhibits: [
      { id: 'haifa-ref-1', assetId: 'air-heron',   quantity: 1, status: 'planned', notes: '' },
      { id: 'haifa-ref-2', assetId: 'air-wanderb', quantity: 1, status: 'planned', notes: '' },
    ],
  },
  {
    id: 'cyber-week-2026',
    nameHe: 'שבוע הסייבר תל אביב',
    nameEn: 'Cyber Week Tel Aviv',
    location: 'אוניברסיטת תל אביב',
    startDate: '2026-06-23',
    endDate: '2026-06-26',
    theme: 'הגנת סייבר וטכנולוגיות מודיעין',
    supplier: 'TAU Cyber Events',
    screenSupplier: 'TechStage Ltd.',
    exhibitionOwner: 'Michal Peretz',
    approvingManager: '',
    brochure: '',
    boothType: 'with-booth',
    notes: 'דגש על מערכות סייבר ולוחמה אלקטרונית. ELI-3360 + פלטפורמת סייבר של תעא.',
    tentTemplate: '',
    layoutStatus: 'not-started',
    planningItemsCount: 0,
    inventoryItemIds: [],
    exhibits: [],
  },
  {
    id: 'idf-internal-2026',
    nameHe: 'תצוגה פנימית צה"ל',
    nameEn: 'IDF Internal Showcase',
    location: 'תל אביב',
    startDate: '2026-07-20',
    endDate: '2026-07-20',
    theme: 'סקירת מערכות פנימית',
    supplier: 'צוות תעא פנימי',
    screenSupplier: '',
    exhibitionOwner: 'Sagi Amiel',
    approvingManager: '',
    brochure: '',
    boothType: 'without-booth',
    notes: 'גישה מוגבלת. מערכות MCS וחץ בלבד.',
    tentTemplate: '',
    layoutStatus: 'not-started',
    planningItemsCount: 0,
    inventoryItemIds: [],
    exhibits: [
      { id: 'idf-ref-1', assetId: 'space-mcs',        quantity: 1, status: 'planned', notes: 'גישה מוגבלת' },
      { id: 'idf-ref-2', assetId: 'air-arrow-2',      quantity: 1, status: 'planned', notes: 'גישה מוגבלת' },
    ],
  },
  {
    id: 'iai-open-day-2026',
    nameHe: 'יום פתוח שנתי תעא',
    nameEn: 'IAI Annual Open Day',
    location: 'מטה תעא, לוד',
    startDate: '2026-09-10',
    endDate: '2026-09-10',
    theme: 'תצוגה שנתית לשותפים ולקוחות',
    supplier: 'פנימי תעא',
    screenSupplier: 'IAI Print & Media',
    exhibitionOwner: 'Sagi Amiel',
    approvingManager: '',
    brochure: '',
    boothType: 'with-booth',
    notes: 'תצוגה שנתית למשרד הביטחון, שותפים ולקוחות מרכזיים. כל המערכות.',
    tentTemplate: 'tent-30x20',
    layoutStatus: 'not-started',
    planningItemsCount: 0,
    inventoryItemIds: [],
    exhibits: [],
  },
]
