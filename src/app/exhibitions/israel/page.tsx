"use client"

import { masterExhibits } from "../../../data/masterExhibits"
const inventoryItems = masterExhibits
  .filter((e) => e.division === "inventory")
  .map((e) => ({ id: e.slug, name: { he: e.nameHe, en: e.nameEn }, image: e.image }))

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { initialIsraelExhibitions } from '../../../data/israelExhibitions'

type BoothType = 'with-booth' | 'without-booth' | 'digital-only'
type ExhibitStatus = 'approved' | 'pending' | 'planned'
type LayoutStatus = 'not-started' | 'in-progress' | 'ready'

type CatalogAsset = {
  id: string
  titleHe: string
  titleEn: string
  category: 'space' | 'air' | 'land' | 'naval'
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
  screenSupplier?: string
  exhibitionOwner?: string
  approvingManager?: string
  inventoryItemIds?: string[]
  brochure: string
  boothType: BoothType
  notes: string
  exhibits: ExhibitionAssetRef[]
  tentTemplate: '' | 'tent-25x10' | 'tent-30x20'
  layoutStatus: LayoutStatus
  planningItemsCount: number
}

const STORAGE_KEY = 'israel-exhibitions-board-v5-v2'
const SELECTED_ID_KEY = 'israel-exhibitions-board-selected-id-v1'
const DRAFT_KEY = 'israel-exhibitions-board-draft-v1'
const IS_EDITING_KEY = 'israel-exhibitions-board-is-editing-v1'

const assetCatalog: CatalogAsset[] = [
  // Space
  { id: 'space-tecsar',     titleHe: 'טקסאר',      titleEn: 'Tecsar',      category: 'space', href: '/space/tecsar'     },
  { id: 'space-beresheet',  titleHe: 'בראשית',     titleEn: 'Beresheet',   category: 'space', href: '/space/beresheet'  },
  { id: 'space-shavit',     titleHe: 'שביט',       titleEn: 'Shavit',      category: 'space', href: '/space/shavit'     },
  { id: 'space-optsat-500', titleHe: 'OPTSAT 500', titleEn: 'OPTSAT 500',  category: 'space', href: '/space/optsat-500' },
  { id: 'space-optsar-550', titleHe: 'OPTSAR 550', titleEn: 'OPTSAR 550',  category: 'space', href: '/space/optsar-550' },
  { id: 'space-optsat-3000',titleHe: 'OPTSAT 3000',titleEn: 'OPTSAT 3000', category: 'space', href: '/space/optsat-3000'},
  { id: 'space-mcs',        titleHe: 'MCS',        titleEn: 'MCS',         category: 'space', href: '/space/mcs'        },

  // Air — manual assets
  { id: 'air-lora',            titleHe: 'לורה',          titleEn: 'LORA',            category: 'air', href: '/air/lora'            },
  { id: 'air-arrow-2',         titleHe: 'חץ 2',          titleEn: 'Arrow-2',         category: 'air', href: '/air/arrow-2'         },
  { id: 'air-arrow-3-missile', titleHe: 'חץ 3',          titleEn: 'Arrow-3',         category: 'air', href: '/air/arrow-3-missile' },
  { id: 'air-heron',           titleHe: 'הרון',          titleEn: 'Heron',           category: 'air', href: '/air/heron'           },
  { id: 'air-wanderb',         titleHe: 'וונדר בי',      titleEn: 'WanderB',         category: 'air', href: '/air/wanderb'         },

  // Air — auto assets
  { id: 'air-mmr',           titleHe: 'מכ״ם MMR',    titleEn: 'MMR',           category: 'air', href: '/air/mmr'           },
  { id: 'air-arrow-4',       titleHe: 'חץ 4',         titleEn: 'Arrow 4',       category: 'air', href: '/air/arrow-4'       },
  { id: 'air-thunder-vtol',  titleHe: 'ת׳אנדר VTOL',  titleEn: 'Thunder VTOL',  category: 'air', href: '/air/thunder-vtol'  },
  { id: 'air-harop',         titleHe: 'הרופ',          titleEn: 'HAROP',         category: 'air', href: '/air/harop'         },
  { id: 'air-mini-harpy',    titleHe: 'מיני הרפי',     titleEn: 'Mini Harpy',    category: 'air', href: '/air/mini-harpy'    },
  { id: 'air-lahat',         titleHe: 'להט',           titleEn: 'LAHAT',         category: 'air', href: '/air/lahat'         },
  { id: 'air-lahat-alfa',    titleHe: 'להט אלפא',      titleEn: 'LAHAT ALFA',    category: 'air', href: '/air/lahat-alfa'    },
  { id: 'air-barak-launcher',titleHe: 'משגר ברק',      titleEn: 'Barak Launcher',category: 'air', href: '/air/barak-launcher'},
  { id: 'air-elm-2058',      titleHe: 'מכ״ם ELM-2058', titleEn: 'ELM-2058',      category: 'air', href: '/air/elm-2058'      },
  { id: 'air-wasp',          titleHe: 'צרעה',          titleEn: 'WASP',          category: 'air', href: '/air/wasp'          },
  { id: 'air-rotem',         titleHe: 'רותם',          titleEn: 'ROTEM',         category: 'air', href: '/air/rotem'         },
  { id: 'air-apus25',        titleHe: 'אפוס 25',       titleEn: 'APUS 25',       category: 'air', href: '/air/apus25'        },
  { id: 'air-apus60',        titleHe: 'אפוס 60',       titleEn: 'APUS 60',       category: 'air', href: '/air/apus60'        },
  { id: 'air-pointblank',    titleHe: 'פוינטבלנק',     titleEn: 'POINTBLANK',    category: 'air', href: '/air/pointblank'    },
  { id: 'air-microwami',     titleHe: 'מיקרוואמי',     titleEn: 'MICROWAMI',     category: 'air', href: '/air/microwami'     },
  { id: 'air-megapop',       titleHe: 'מגה-פופ',       titleEn: 'MEGAPOP',       category: 'air', href: '/air/megapop'       },
  { id: 'air-pop1000',       titleHe: 'פופ 1000',      titleEn: 'POP 1000',      category: 'air', href: '/air/pop1000'       },
  { id: 'air-minipop',       titleHe: 'מיני-פופ',      titleEn: 'MINIPOP',       category: 'air', href: '/air/minipop'       },
  { id: 'air-arrow-launcher',titleHe: 'משגר חץ',       titleEn: 'Arrow Launcher',category: 'air', href: '/air/arrow-launcher'},

  // Land
  { id: 'land-zmag',      titleHe: 'זמג',       titleEn: 'ZMAG',      category: 'land', href: '/land/zmag'      },
  { id: 'land-3dcapture', titleHe: '3DCAPTURE',  titleEn: '3DCAPTURE', category: 'land', href: '/land/3dcapture' },
  { id: 'land-panda',     titleHe: 'פנדה',       titleEn: 'PANDA',     category: 'land', href: '/land/panda'     },
  { id: 'land-robattle',  titleHe: 'רובאטל',     titleEn: 'ROBATTLE',  category: 'land', href: '/land/robattle'  },

  // Naval
  { id: 'naval-katana', titleHe: 'קטנה', titleEn: 'KATANA', category: 'naval', href: '/naval/katana' },
]

const initialExhibitions: IsraelExhibition[] = initialIsraelExhibitions

function makeId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`
}

function normalizeExhibition(item: Partial<IsraelExhibition>): IsraelExhibition {
  return {
    id: item.id || makeId('exh'),
    nameHe: item.nameHe || '',
    nameEn: item.nameEn || '',
    location: item.location || '',
    startDate: item.startDate || '',
    endDate: item.endDate || '',
    theme: item.theme || '',
    supplier: item.supplier || '',
    screenSupplier: item.screenSupplier || '',
    exhibitionOwner: item.exhibitionOwner || '',
    approvingManager: item.approvingManager || '',
    brochure: item.brochure || '',
    boothType:
      item.boothType === 'without-booth' || item.boothType === 'digital-only'
        ? item.boothType
        : 'with-booth',
    notes: item.notes || '',
    tentTemplate:
      item.tentTemplate === 'tent-25x10' || item.tentTemplate === 'tent-30x20'
        ? item.tentTemplate
        : '',
    layoutStatus:
      item.layoutStatus === 'in-progress' || item.layoutStatus === 'ready'
        ? item.layoutStatus
        : 'not-started',
    planningItemsCount:
      typeof item.planningItemsCount === 'number' && item.planningItemsCount >= 0
        ? item.planningItemsCount
        : 0,
    exhibits: Array.isArray(item.exhibits)
      ? item.exhibits.map((ex) => ({
          id: ex.id || makeId('ref'),
          assetId: ex.assetId || '',
          quantity: typeof ex.quantity === 'number' && ex.quantity > 0 ? ex.quantity : 1,
          status:
            ex.status === 'approved' || ex.status === 'pending' || ex.status === 'planned'
              ? ex.status
              : 'planned',
          notes: ex.notes || '',
        }))
      : [],
  }
}

function sortByDate(items: IsraelExhibition[]) {
  return [...items].sort((a, b) => {
    const aTime = a.startDate ? new Date(a.startDate).getTime() : Number.MAX_SAFE_INTEGER
    const bTime = b.startDate ? new Date(b.startDate).getTime() : Number.MAX_SAFE_INTEGER
    return aTime - bTime
  })
}

function boothLabel(value: BoothType) {
  if (value === 'with-booth') return 'קיים ביתן'
  if (value === 'without-booth') return 'ללא ביתן'
  return 'דיגיטלי בלבד'
}

function statusLabel(value: ExhibitStatus) {
  if (value === 'approved') return 'מאושר'
  if (value === 'pending') return 'ממתין'
  return 'מתוכנן'
}

function formatDateHe(value: string) {
  if (!value) return '—'
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return value
  return new Intl.DateTimeFormat('he-IL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d)
}

function getAsset(assetId: string) {
  return assetCatalog.find((item) => item.id === assetId) || null
}

function countTotalUnits(exhibits: ExhibitionAssetRef[]) {
  return exhibits.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0)
}

function layoutStatusLabel(value: LayoutStatus) {
  if (value === 'in-progress') return 'בתהליך'
  if (value === 'ready') return 'מוכן'
  return 'לא התחיל'
}

function tentTemplateLabel(value: IsraelExhibition['tentTemplate']) {
  if (value === 'tent-25x10') return '25x10'
  if (value === 'tent-30x20') return '30x20'
  return 'לא נבחר'
}

function planningHref(value: IsraelExhibition['tentTemplate']) {
  if (!value) return null
  return `/tents-layout/${value}`
}

const inventoryMap = new Map(inventoryItems.map((item) => [item.id, item]))

export default function IsraelExhibitionsPage() {
  const [exhibitions, setExhibitions] = useState<IsraelExhibition[]>([])
  const [selectedId, setSelectedId] = useState('')
  const [draft, setDraft] = useState<IsraelExhibition | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [newAssetId, setNewAssetId] = useState(assetCatalog[0]?.id || '')
  const [newInventoryId, setNewInventoryId] = useState("")

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    const savedSelectedId = window.localStorage.getItem(SELECTED_ID_KEY) || ''
    const savedDraftRaw = window.localStorage.getItem(DRAFT_KEY)
    const savedIsEditing = window.localStorage.getItem(IS_EDITING_KEY) === 'true'

    if (raw) {
      try {
        const parsed = JSON.parse(raw) as Partial<IsraelExhibition>[]
        const normalized = parsed.map(normalizeExhibition)
        const sorted = sortByDate(normalized)
        setExhibitions(sorted)

        const hasSavedSelected = sorted.some((item) => item.id === savedSelectedId)
        const effectiveSelectedId = hasSavedSelected ? savedSelectedId : (sorted[0]?.id ?? '')
        setSelectedId(effectiveSelectedId)

        if (savedDraftRaw) {
          try {
            const parsedDraft = normalizeExhibition(JSON.parse(savedDraftRaw))
            setDraft(parsedDraft)
            setIsEditing(savedIsEditing)
            return
          } catch {}
        }

        const selectedItem = sorted.find((item) => item.id === effectiveSelectedId) ?? null
        setDraft(selectedItem)
        setIsEditing(false)
        return
      } catch {}
    }

    const sorted = sortByDate(initialExhibitions)
    setExhibitions(sorted)

    const hasSavedSelected = sorted.some((item) => item.id === savedSelectedId)
    const effectiveSelectedId = hasSavedSelected ? savedSelectedId : (sorted[0]?.id ?? '')
    setSelectedId(effectiveSelectedId)

    if (savedDraftRaw) {
      try {
        const parsedDraft = normalizeExhibition(JSON.parse(savedDraftRaw))
        setDraft(parsedDraft)
        setIsEditing(savedIsEditing)
        return
      } catch {}
    }

    const selectedItem = sorted.find((item) => item.id === effectiveSelectedId) ?? null
    setDraft(selectedItem)
    setIsEditing(false)
  }, [])

  useEffect(() => {
    if (!exhibitions.length) return
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(exhibitions))
  }, [exhibitions])

  useEffect(() => {
    if (!selectedId) return
    window.localStorage.setItem(SELECTED_ID_KEY, selectedId)
  }, [selectedId])

  useEffect(() => {
    if (!draft) {
      window.localStorage.removeItem(DRAFT_KEY)
      return
    }
    window.localStorage.setItem(DRAFT_KEY, JSON.stringify(draft))
  }, [draft])

  useEffect(() => {
    window.localStorage.setItem(IS_EDITING_KEY, isEditing ? 'true' : 'false')
  }, [isEditing])

  const selectedExhibition = useMemo(
    () => exhibitions.find((item) => item.id === selectedId) ?? null,
    [exhibitions, selectedId]
  )

  useEffect(() => {
    if (selectedExhibition && !isEditing) {
      setDraft(selectedExhibition)
    }
  }, [selectedExhibition, isEditing])

  function handleCreateExhibition() {
    const nameHe = window.prompt('שם התערוכה בעברית:')
    if (!nameHe) return

    const nameEn = window.prompt('שם התערוכה באנגלית:') || ''
    const location = window.prompt('מיקום:') || ''
    const startDate = window.prompt('תאריך התחלה (YYYY-MM-DD):') || ''
    const endDate = window.prompt('תאריך סיום (YYYY-MM-DD):') || ''
    const theme = window.prompt('נושא מרכזי:') || ''
    const supplier = window.prompt('ספק / זכיין:') || ''
    const brochure = window.prompt('קישור / שם ברושור:') || ''
    const boothRaw =
      window.prompt('סוג השתתפות: with-booth / without-booth / digital-only') || 'with-booth'
    const notes = window.prompt('הערות:') || ''

    const boothType: BoothType =
      boothRaw === 'without-booth' || boothRaw === 'digital-only' ? boothRaw : 'with-booth'

    const newItem: IsraelExhibition = {
      id: makeId('exh'),
      nameHe,
      nameEn,
      location,
      startDate,
      endDate,
      theme,
      supplier,
      screenSupplier: '',
      exhibitionOwner: '',
      approvingManager: '',
      brochure,
      boothType,
      notes,
      exhibits: [],
      tentTemplate: '',
      layoutStatus: 'not-started',
      planningItemsCount: 0,
      inventoryItemIds: [],
    }

    const next = sortByDate([...exhibitions, newItem])
    setExhibitions(next)
    setSelectedId(newItem.id)
    setDraft(newItem)
    setIsEditing(false)
  }

  function handleSelect(id: string) {
    setSelectedId(id)
    setIsEditing(false)
  }

  function handleEditStart() {
    if (!selectedExhibition) return
    setDraft(JSON.parse(JSON.stringify(selectedExhibition)))
    setIsEditing(true)
  }

  function handleCancelEdit() {
    setDraft(selectedExhibition)
    setIsEditing(false)
  }

  function handleSaveEdit() {
    if (!draft) return
    const next = sortByDate(exhibitions.map((item) => (item.id === draft.id ? draft : item)))
    setExhibitions(next)
    setSelectedId(draft.id)
    setIsEditing(false)
  }

  function updateDraft<K extends keyof IsraelExhibition>(key: K, value: IsraelExhibition[K]) {
    setDraft((prev) => {
      if (!prev) return prev
      return { ...prev, [key]: value }
    })
  }

  function addCatalogAsset() {
    if (!newAssetId) return
    setDraft((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        exhibits: [
          ...prev.exhibits,
          {
            id: makeId('ref'),
            assetId: newAssetId,
            quantity: 1,
            status: 'planned',
            notes: '',
          },
        ],
      }
    })
  }

  
function addInventoryItem() {
    if (!newInventoryId) return
    setDraft((prev) => {
      if (!prev) return prev
      const existing = prev.inventoryItemIds ?? []
      if (existing.includes(newInventoryId)) return prev
      return {
        ...prev,
        inventoryItemIds: [...existing, newInventoryId],
      }
    })
    setNewInventoryId("")
  }

  function removeInventoryItem(id: string) {
    setDraft((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        inventoryItemIds: (prev.inventoryItemIds ?? []).filter((itemId) => itemId !== id),
      }
    })
  }

function removeAssetRef(id: string) {
    setDraft((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        exhibits: prev.exhibits.filter((item) => item.id !== id),
      }
    })
  }

  function updateAssetRef(id: string, patch: Partial<ExhibitionAssetRef>) {
    setDraft((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        exhibits: prev.exhibits.map((item) => (item.id === id ? { ...item, ...patch } : item)),
      }
    })
  }

  return (
    <main className="min-h-screen bg-[#070b17] text-white" dir="rtl">
      <div className="mx-auto max-w-[1680px] px-6 py-8">

        {/* Header */}
        <section className="mb-8 rounded-[34px] border border-cyan-300/20 bg-[radial-gradient(circle_at_top,rgba(32,80,170,0.28),rgba(11,18,39,1)_55%)] p-8 shadow-[0_0_50px_rgba(24,119,242,0.12)] md:p-10">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Exhibition Platform</p>
              <h1 className="mt-2 text-4xl font-extrabold md:text-5xl">כנסים ותערוכות בארץ</h1>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                קישור תערוכות לקטלוג מוצגים אמיתי עם מעבר ישיר לעמוד המוצג
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/" className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                  ← חזרה לראשי
                </Link>
                <Link href="/inventory" className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                  מחסן / ארכיון מלאי
                </Link>
                <Link href="/tents-layout" className="rounded-xl border border-cyan-400/40 bg-cyan-400/10 px-5 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/20">
                  הדמיית אוהל / פריסה
                </Link>
                <button
                  onClick={handleCreateExhibition}
                  className="rounded-xl border border-emerald-400/40 bg-emerald-400/10 px-5 py-3 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-400/20"
                >
                  + צור תערוכה חדשה
                </button>
              </div>
            </div>
            <div className="grid min-w-[220px] gap-3 sm:grid-cols-2">
              <QuickPill label="קטגוריה" value="ישראל" />
              <QuickPill label="תערוכות" value={`${exhibitions.length}`} />
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[400px_minmax(0,1fr)]">

          {/* Left — exhibition list */}
          <section className="rounded-[28px] border border-cyan-300/20 bg-[#0b1227] p-5 shadow-[0_18px_48px_rgba(0,0,0,0.34)]">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.28em] text-cyan-300">רשימת תערוכות</p>
                <h2 className="mt-1 text-lg font-bold text-white">תערוכות פעילות</h2>
              </div>
              <span className="rounded-full border border-cyan-300/25 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-200">
                {exhibitions.length} פריטים
              </span>
            </div>

            <div className="space-y-3">
              {exhibitions.map((item) => {
                const isActive = item.id === selectedId
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item.id)}
                    className={[
                      'w-full rounded-[20px] border p-4 text-right transition hover:-translate-y-[1px]',
                      isActive
                        ? 'border-cyan-400/50 bg-cyan-400/10 shadow-[0_0_24px_rgba(34,211,238,0.10)]'
                        : 'border-cyan-300/15 bg-[#0d1830] hover:border-cyan-300/30 hover:bg-[#101e38]',
                    ].join(' ')}
                  >
                    <div className="mb-2 flex items-start justify-between gap-3">
                      <div>
                        <div className="text-base font-semibold text-white">{item.nameHe}</div>
                        <div className="text-xs text-slate-400">{item.nameEn || '—'}</div>
                      </div>
                      <span className="shrink-0 rounded-full border border-cyan-300/20 bg-cyan-400/8 px-2 py-1 text-[11px] text-cyan-300">
                        {boothLabel(item.boothType)}
                      </span>
                    </div>
                    <div className="space-y-1 text-xs text-slate-400">
                      <div>מיקום: <span className="text-slate-300">{item.location || '—'}</span></div>
                      <div>תאריך: <span className="text-slate-300">{formatDateHe(item.startDate)}{item.endDate ? ` ← ${formatDateHe(item.endDate)}` : ''}</span></div>
                      <div className="flex flex-wrap gap-3 pt-1">
                        <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5">מוצגים: {item.exhibits.length}</span>
                        <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5">יחידות: {countTotalUnits(item.exhibits)}</span>
                        <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5">{layoutStatusLabel(item.layoutStatus)}</span>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </section>

          {/* Right — detail panel */}
          <section className="rounded-[28px] border border-cyan-300/20 bg-[#0b1227] p-6 shadow-[0_18px_48px_rgba(0,0,0,0.34)]">
            {!draft ? (
              <div className="flex min-h-[500px] items-center justify-center text-slate-400">
                בחר תערוכה כדי לראות ולערוך את הנתונים
              </div>
            ) : (
              <div className="space-y-6">

                {/* Detail header */}
                <div className="flex flex-wrap items-center justify-between gap-4 rounded-[20px] border border-cyan-300/20 bg-[radial-gradient(circle_at_top,rgba(32,80,170,0.18),rgba(11,18,39,1)_60%)] px-5 py-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.28em] text-cyan-300">
                      {isEditing ? 'מצב עריכה פעיל' : 'תצוגת פרטים'}
                    </p>
                    <h2 className="mt-1 text-2xl font-extrabold text-white">{draft.nameHe || 'ללא שם'}</h2>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1.5 text-xs font-semibold text-cyan-200">
                      מוצגים: {draft.exhibits.length}
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs font-semibold text-white/80">
                      יחידות: {countTotalUnits(draft.exhibits)}
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs font-semibold text-white/80">
                      אחראי: {draft.exhibitionOwner || '—'}
                    </span>
                    {!isEditing ? (
                      <button
                        onClick={handleEditStart}
                        className="rounded-xl border border-amber-200/70 bg-gradient-to-r from-amber-300/30 via-yellow-200/20 to-amber-300/30 px-5 py-2 text-sm font-extrabold text-amber-50 shadow-[0_0_28px_rgba(251,191,36,0.24)] transition hover:-translate-y-[1px] hover:from-amber-300/40"
                      >
                        ערוך
                      </button>
                    ) : (
                      <>
                        <button onClick={handleSaveEdit} className="rounded-xl border border-emerald-400/40 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-400/20">
                          שמור
                        </button>
                        <button onClick={handleCancelEdit} className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10">
                          בטל
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Exhibition details */}
                <div className="rounded-[20px] border border-cyan-300/15 bg-[#091b30] p-5">
                  <p className="mb-1 text-[11px] uppercase tracking-[0.28em] text-cyan-300">פרטי תערוכה</p>
                  <p className="mb-5 text-sm text-slate-400">פרטים מרכזיים, סטטוס השתתפות, ספק ונתוני בסיס</p>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Field label="שם התערוכה בעברית">
                      <input value={draft.nameHe} onChange={(e) => updateDraft('nameHe', e.target.value)} disabled={!isEditing} className={inputClass(isEditing)} />
                    </Field>
                    <Field label="שם התערוכה באנגלית">
                      <input value={draft.nameEn} onChange={(e) => updateDraft('nameEn', e.target.value)} disabled={!isEditing} className={inputClass(isEditing)} />
                    </Field>
                    <Field label="מיקום">
                      <input value={draft.location} onChange={(e) => updateDraft('location', e.target.value)} disabled={!isEditing} className={inputClass(isEditing)} />
                    </Field>
                    <Field label="נושא מרכזי">
                      <input value={draft.theme} onChange={(e) => updateDraft('theme', e.target.value)} disabled={!isEditing} className={inputClass(isEditing)} />
                    </Field>
                    <Field label="תאריך התחלה">
                      <div className="space-y-2">
                        <input type="date" value={draft.startDate} onChange={(e) => updateDraft('startDate', e.target.value)} disabled={!isEditing} className={inputClass(isEditing)} />
                        <div className="text-xs text-slate-500">תצוגה: {formatDateHe(draft.startDate)}</div>
                      </div>
                    </Field>
                    <Field label="תאריך סיום">
                      <div className="space-y-2">
                        <input type="date" value={draft.endDate} onChange={(e) => updateDraft('endDate', e.target.value)} disabled={!isEditing} className={inputClass(isEditing)} />
                        <div className="text-xs text-slate-500">תצוגה: {formatDateHe(draft.endDate)}</div>
                      </div>
                    </Field>
                    <Field label="ספק / זכיין">
                      <input value={draft.supplier} onChange={(e) => updateDraft('supplier', e.target.value)} disabled={!isEditing} className={inputClass(isEditing)} />
                    </Field>
                    <Field label="ספק מדיה">
                      <input value={draft.screenSupplier} onChange={(e) => updateDraft('screenSupplier', e.target.value)} disabled={!isEditing} className={inputClass(isEditing)} placeholder="ספק מסכים / סטנדים / גדלים" />
                    </Field>
                    <Field label="אחראי תערוכה">
                      <input value={draft.exhibitionOwner} onChange={(e) => updateDraft('exhibitionOwner', e.target.value)} disabled={!isEditing} className={inputClass(isEditing)} placeholder="שם אחראי / מוביל תערוכה" />
                    </Field>
                    <Field label="מנהל / גורם מאשר">
                      <input value={draft.approvingManager} onChange={(e) => updateDraft('approvingManager', e.target.value)} disabled={!isEditing} className={inputClass(isEditing)} placeholder="מנהל / גורם מאשר" />
                    </Field>
                    <Field label="קיים ביתן / ללא ביתן">
                      <select value={draft.boothType} onChange={(e) => updateDraft('boothType', e.target.value as BoothType)} disabled={!isEditing} className={inputClass(isEditing)}>
                        <option value="external-supplier-build">מוקם ע״י ספק חיצוני</option>
                        <option value="internal-company-build">מוקם פנימית ע״י החברה</option>
                        <option value="participation-only">השתתפות בלבד / ללא הקמה</option>
                      </select>
                    </Field>
                    <Field label="ברושור / קישור">
                      <input value={draft.brochure} onChange={(e) => updateDraft('brochure', e.target.value)} disabled={!isEditing} className={inputClass(isEditing)} />
                    </Field>
                    <Field label="הערות כלליות">
                      <textarea value={draft.notes} onChange={(e) => updateDraft('notes', e.target.value)} disabled={!isEditing} rows={4} className={inputClass(isEditing)} />
                    </Field>
                  </div>
                </div>

                {/* Planning */}
                <div className="rounded-[20px] border border-cyan-300/15 bg-[#091b30] p-5">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.28em] text-cyan-300">תכנון והקמה</p>
                      <p className="mt-1 text-sm text-slate-400">חיבור לתבנית אוהל, לוח תכנון ופריטי מלאי</p>
                    </div>
                    {draft.tentTemplate ? (
                      <Link href={planningHref(draft.tentTemplate) || '/tents-layout'} className="rounded-xl border border-cyan-400/40 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/20">
                        פתח לוח תכנון
                      </Link>
                    ) : (
                      <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-slate-500">לא נבחרה תבנית אוהל</div>
                    )}
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <Field label="תבנית אוהל">
                      <select value={draft.tentTemplate} onChange={(e) => updateDraft('tentTemplate', e.target.value as IsraelExhibition['tentTemplate'])} disabled={!isEditing} className={inputClass(isEditing)}>
                        <option value="">לא נבחר</option>
                        <option value="tent-25x10">אוהל 25x10</option>
                        <option value="tent-30x20">אוהל 30x20</option>
                      </select>
                    </Field>
                    <Field label="סטטוס תכנון">
                      <select value={draft.layoutStatus} onChange={(e) => updateDraft('layoutStatus', e.target.value as LayoutStatus)} disabled={!isEditing} className={inputClass(isEditing)}>
                        <option value="not-started">לא התחיל</option>
                        <option value="in-progress">בתהליך</option>
                        <option value="ready">מוכן</option>
                      </select>
                    </Field>
                    <Field label="כמות פריטי תכנון">
                      <input type="number" min={0} value={draft.planningItemsCount} onChange={(e) => updateDraft('planningItemsCount', Math.max(0, Number(e.target.value) || 0))} disabled={!isEditing} className={inputClass(isEditing)} />
                    </Field>
                    <Field label="קישור ללוח">
                      <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-400">
                        {draft.tentTemplate ? planningHref(draft.tentTemplate) : '—'}
                      </div>
                    </Field>
                    <Field label="פריטי מלאי">
                      <div className="rounded-[18px] border border-white/10 bg-white/[0.03] px-4 py-4">
                        <div className="mb-3 text-sm font-semibold text-white/85">
                          פריטי מלאי מקושרים
                          <span className="mr-2 text-xs font-normal text-slate-500">סה״כ: {draft.inventoryItemIds?.length ?? 0}</span>
                        </div>
                        <div className="mb-3 flex flex-col gap-2 sm:flex-row">
                          <select value={newInventoryId} onChange={(e) => setNewInventoryId(e.target.value)} disabled={!isEditing} className={`min-w-0 flex-1 ${inputClass(isEditing)}`}>
                            <option value="">בחר פריט מלאי</option>
                            {inventoryItems.map((item) => (
                              <option key={item.id} value={item.id}>{item.name.he ?? item.name.en}</option>
                            ))}
                          </select>
                          <button type="button" onClick={addInventoryItem} disabled={!isEditing || !newInventoryId} className="shrink-0 rounded-xl border border-cyan-300/40 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/15 disabled:cursor-not-allowed disabled:opacity-40">
                            הוסף
                          </button>
                        </div>
                        {draft.inventoryItemIds && draft.inventoryItemIds.length > 0 ? (
                          <div className="grid gap-2 md:grid-cols-2">
                            {draft.inventoryItemIds.map((inventoryId) => {
                              const linkedItem = inventoryMap.get(inventoryId)
                              return (
                                <div key={inventoryId} className="flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm">
                                  <span className="min-w-0 flex-1 truncate font-medium text-white/90">
                                    {linkedItem ? (linkedItem.name.he ?? linkedItem.name.en) : inventoryId}
                                  </span>
                                  <button type="button" onClick={() => removeInventoryItem(inventoryId)} disabled={!isEditing} className="shrink-0 rounded-lg border border-red-300/30 bg-red-400/10 px-2 py-1 text-xs text-red-200 transition hover:bg-red-400/15 disabled:opacity-40">
                                    הסר
                                  </button>
                                </div>
                              )
                            })}
                          </div>
                        ) : (
                          <div className="rounded-xl border border-dashed border-white/10 px-4 py-4 text-sm text-slate-500">
                            עדיין לא קושרו פריטי מלאי
                          </div>
                        )}
                      </div>
                    </Field>
                  </div>
                </div>

                {/* Exhibits */}
                <div className="rounded-[20px] border border-cyan-300/15 bg-[#091b30] p-5">
                  <p className="mb-1 text-[11px] uppercase tracking-[0.28em] text-cyan-300">מוצגים בתערוכה</p>
                  <p className="mb-4 text-sm text-slate-400">מוצגים נבחרים לתערוכה זו עם כמות, סטטוס וקישור לקטלוג</p>

                  {isEditing && (
                    <div className="mb-5 rounded-[18px] border border-cyan-400/20 bg-cyan-400/5 p-4">
                      <div className="grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_160px]">
                        <Field label="בחר מוצג מהקטלוג">
                          <select value={newAssetId} onChange={(e) => setNewAssetId(e.target.value)} className={inputClass(true)}>
                            {assetCatalog.map((asset) => (
                              <option key={asset.id} value={asset.id}>{asset.titleHe} — {asset.category}</option>
                            ))}
                          </select>
                        </Field>
                        <div className="flex items-end">
                          <button onClick={addCatalogAsset} className="w-full rounded-xl border border-cyan-400/40 bg-cyan-400/10 px-4 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/20">
                            הוסף מוצג
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {!draft.exhibits.length ? (
                    <div className="rounded-[18px] border border-dashed border-white/10 px-4 py-8 text-center text-sm text-slate-500">
                      עדיין אין מוצגים בתערוכה הזו
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {draft.exhibits.map((item, index) => {
                        const asset = getAsset(item.assetId)
                        return (
                          <div key={item.id} className="rounded-[18px] border border-cyan-300/15 bg-[#0d1830] p-4">
                            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_120px_140px_160px]">
                              <div>
                                <div className="mb-2 flex flex-wrap items-center gap-2">
                                  <span className="rounded-full border border-cyan-300/20 bg-cyan-400/8 px-3 py-0.5 text-xs text-cyan-300">מוצג {index + 1}</span>
                                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-0.5 text-xs text-slate-400">{asset?.category || '—'}</span>
                                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-0.5 text-xs text-slate-400">{statusLabel(item.status)}</span>
                                </div>
                                <div className="text-base font-semibold text-white">{asset?.titleHe || 'מוצג לא נמצא בקטלוג'}</div>
                                <div className="mt-0.5 text-xs text-slate-500">{asset?.titleEn || item.assetId}</div>
                                {isEditing && (
                                  <div className="mt-3">
                                    <Field label="הערת השתתפות בתערוכה">
                                      <textarea value={item.notes} onChange={(e) => updateAssetRef(item.id, { notes: e.target.value })} rows={2} className={inputClass(true)} />
                                    </Field>
                                  </div>
                                )}
                                {!isEditing && item.notes && (
                                  <div className="mt-2 rounded-xl border border-white/10 bg-black/10 px-3 py-2 text-sm text-slate-400">{item.notes}</div>
                                )}
                              </div>
                              <Field label="כמות">
                                <input type="number" min={1} value={item.quantity} onChange={(e) => updateAssetRef(item.id, { quantity: Math.max(1, Number(e.target.value) || 1) })} disabled={!isEditing} className={inputClass(isEditing)} />
                              </Field>
                              <Field label="סטטוס">
                                <select value={item.status} onChange={(e) => updateAssetRef(item.id, { status: e.target.value as ExhibitStatus })} disabled={!isEditing} className={inputClass(isEditing)}>
                                  <option value="planned">מתוכנן</option>
                                  <option value="pending">ממתין</option>
                                  <option value="approved">מאושר</option>
                                </select>
                              </Field>
                              <div className="flex flex-col justify-end gap-2">
                                {asset?.href ? (
                                  <Link href={asset.href} className="rounded-xl border border-cyan-400/40 bg-cyan-400/10 px-4 py-2.5 text-center text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/20">
                                    פתח מוצג
                                  </Link>
                                ) : (
                                  <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-center text-sm text-slate-500">אין עמוד</div>
                                )}
                                {isEditing && (
                                  <button onClick={() => removeAssetRef(item.id)} className="rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-2.5 text-sm font-semibold text-red-200 transition hover:bg-red-400/20">
                                    הסר
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>

              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}

function QuickPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-cyan-300/15 bg-white/[0.04] p-4">
      <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">{label}</p>
      <p className="mt-2 text-lg font-bold text-white">{value}</p>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="mb-2 text-sm text-slate-400">{label}</div>
      {children}
    </label>
  )
}

function inputClass(isEditing: boolean) {
  return [
    'w-full rounded-xl border px-4 py-3 text-sm outline-none transition',
    isEditing
      ? 'border-cyan-400/30 bg-white/5 text-white placeholder:text-slate-500 focus:border-cyan-300'
      : 'border-white/10 bg-white/5 text-white/70 cursor-default',
  ].join(' ')
}
