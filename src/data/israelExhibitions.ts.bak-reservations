// Shared source of truth for Israel exhibitions seed data.
// This file is committed to GitHub so both home and work computers can pull the same base version.

type BoothType = 'with-booth' | 'without-booth' | 'digital-only'
type ExhibitStatus = 'approved' | 'pending' | 'planned'
type LayoutStatus = 'not-started' | 'in-progress' | 'ready'

type CatalogAsset = {
  id: string
  titleHe: string
  titleEn: string
  category: 'space' | 'air' | 'land' | 'water'
  href: string
}

type ExhibitionAssetRef = {
  id: string
  assetId: string
  quantity: number
  status: ExhibitStatus
  notes: string
}

type IsraelExhibition = {
  id: string
  nameHe: string
  nameEn: string
  location: string
  startDate: string
  endDate: string
  theme: string
  supplier: string
  brochure: string
  boothType: BoothType
  notes: string
  exhibits: ExhibitionAssetRef[]
  tentTemplate: '' | 'tent-25x10' | 'tent-30x20'
  layoutStatus: LayoutStatus
  planningItemsCount: number
  inventoryItemIds: string[]
}

export const initialIsraelExhibitions: IsraelExhibition[] = [
  {
    id: 'jerusalem-space-conf',
    nameHe: 'כנס חלל ירושלים',
    nameEn: 'Jerusalem Space Conference',
    location: 'ירושלים',
    startDate: '2026-04-30',
    endDate: '2026-04-30',
    theme: 'חלל, חדשנות וחינוך',
    supplier: 'זאורוס',
    brochure: '',
    boothType: 'with-booth',
    notes: '',
    tentTemplate: 'tent-25x10',
    layoutStatus: 'in-progress',
    planningItemsCount: 4,
    inventoryItemIds: [],
    inventoryItemIds: [],
    exhibits: [
      { id: 'ref-1', assetId: 'space-beresheet', quantity: 1, status: 'approved', notes: '' },
      { id: 'ref-2', assetId: 'space-tecsar', quantity: 1, status: 'pending', notes: '' },
    ],
  },
  {
    id: 'iacas-panorama',
    nameHe: 'IACAS',
    nameEn: 'IACAS',
    location: 'תל אביב',
    startDate: '2026-05-08',
    endDate: '2026-05-08',
    theme: 'כנס מקצועי',
    supplier: 'זאורוס',
    brochure: '',
    boothType: 'with-booth',
    notes: '',
    tentTemplate: 'tent-30x20',
    layoutStatus: 'not-started',
    planningItemsCount: 0,
    inventoryItemIds: [
      'podium-square-100x100x90-01',
      'flag-pair-iai-israel-01',
      'table-cover-iai-blue-01',
      'sign-stand-silver-a4-01'
    ],
    exhibits: [],
  },
]
