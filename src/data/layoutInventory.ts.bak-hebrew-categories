export type LayoutItemCategory =
  | 'tent'
  | 'podium'
  | 'banner'
  | 'crowd_control'
  | 'flag'
  | 'support'

export type LayoutInventoryItem = {
  id: string
  nameHe: string
  nameEn: string
  category: LayoutItemCategory
  widthM: number
  depthM: number
  heightM: number
  quantity: number
  usage: 'indoor' | 'outdoor' | 'both'
  notes?: string
}

export const layoutInventory: LayoutInventoryItem[] = [
  {
    id: 'tent-25x10',
    nameHe: 'אוהל תצוגה 25x10',
    nameEn: 'Exhibition Tent 25x10',
    category: 'tent',
    widthM: 25,
    depthM: 10,
    heightM: 4,
    quantity: 1,
    usage: 'outdoor',
    notes: 'מבנה בסיס לתערוכות חוץ גדולות',
  },
  {
    id: 'tent-30x20',
    nameHe: 'אוהל תצוגה 30x20',
    nameEn: 'Exhibition Tent 30x20',
    category: 'tent',
    widthM: 30,
    depthM: 20,
    heightM: 4.5,
    quantity: 1,
    usage: 'outdoor',
    notes: 'מבנה גדול לאירועים ותערוכות מרכזיות',
  },
  {
    id: 'podium-small',
    nameHe: 'פודיום קטן',
    nameEn: 'Small Podium',
    category: 'podium',
    widthM: 0.48,
    depthM: 0.48,
    heightM: 0.9,
    quantity: 20,
    usage: 'both',
    notes: 'מתאים למוצגים קטנים',
  },
  {
    id: 'podium-medium',
    nameHe: 'פודיום בינוני',
    nameEn: 'Medium Podium',
    category: 'podium',
    widthM: 0.9,
    depthM: 0.9,
    heightM: 0.9,
    quantity: 12,
    usage: 'both',
    notes: 'מתאים למוצגים בינוניים',
  },
  {
    id: 'banner-directional',
    nameHe: 'באנר הכוונה',
    nameEn: 'Directional Banner',
    category: 'banner',
    widthM: 0.8,
    depthM: 0.4,
    heightM: 2.2,
    quantity: 10,
    usage: 'both',
    notes: 'לניווט והכוונת קהל',
  },
  {
    id: 'stanchion-belt',
    nameHe: 'עמוד עם חגורה נשלפת',
    nameEn: 'Stanchion with Retractable Belt',
    category: 'crowd_control',
    widthM: 0.35,
    depthM: 0.35,
    heightM: 1.0,
    quantity: 40,
    usage: 'both',
    notes: 'ליצירת תורים והפרדות קהל',
  },
  {
    id: 'flag-standard',
    nameHe: 'דגל עומד',
    nameEn: 'Standing Flag',
    category: 'flag',
    widthM: 0.8,
    depthM: 0.8,
    heightM: 2.5,
    quantity: 12,
    usage: 'both',
    notes: 'דגלי מיתוג / מדינה / חברה',
  },
  {
    id: 'storage-support-kit',
    nameHe: 'ערכת ציוד עזר',
    nameEn: 'Support Equipment Kit',
    category: 'support',
    widthM: 1.2,
    depthM: 0.8,
    heightM: 1.2,
    quantity: 6,
    usage: 'both',
    notes: 'ציוד אחסון ותמיכה להקמה',
  },
]

export const layoutCategoryLabels: Record<LayoutItemCategory, string> = {
  tent: 'Tent Structures',
  podium: 'Podiums',
  banner: 'Banners & Signage',
  crowd_control: 'Crowd Control',
  flag: 'Flags',
  support: 'Support Items',
}
