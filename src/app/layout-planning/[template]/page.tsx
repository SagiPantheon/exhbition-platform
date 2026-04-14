'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useMemo, useState } from 'react'

const templates = {
  'tent-25x10': {
    title: 'אוהל תצוגה 25x10',
    subtitle: 'Exhibition Tent 25x10',
    widthM: 25,
    depthM: 10,
    heightM: 4,
    area: 250,
  },
  'tent-30x20': {
    title: 'אוהל תצוגה 30x20',
    subtitle: 'Exhibition Tent 30x20',
    widthM: 30,
    depthM: 20,
    heightM: 4.5,
    area: 600,
  },
} as const

type TemplateKey = keyof typeof templates
type PlanningItemType = 'podium' | 'banner' | 'flag' | 'stanchion'

type PlanningItem = {
  id: string
  type: PlanningItemType
  label: string
  x: number
  y: number
  w: number
  h: number
}

const palette = {
  podium: { label: 'Podium', w: 12, h: 12 },
  banner: { label: 'Banner', w: 10, h: 18 },
  flag: { label: 'Flag', w: 8, h: 18 },
  stanchion: { label: 'Stanchion', w: 8, h: 8 },
} satisfies Record<PlanningItemType, { label: string; w: number; h: number }>

const initialByTemplate: Record<TemplateKey, PlanningItem[]> = {
  'tent-25x10': [
    { id: 'base-1', type: 'podium', label: 'Podium 1', x: 20, y: 25, w: 10, h: 12.5 },
    { id: 'base-2', type: 'banner', label: 'Banner 1', x: 70, y: 25, w: 10, h: 25 },
  ],
  'tent-30x20': [
    { id: 'base-1', type: 'podium', label: 'Podium 1', x: 16.6667, y: 28.5714, w: 8.3333, h: 14.2857 },
    { id: 'base-2', type: 'podium', label: 'Podium 2', x: 33.3333, y: 28.5714, w: 8.3333, h: 14.2857 },
    { id: 'base-3', type: 'banner', label: 'Banner 1', x: 75, y: 14.2857, w: 8.3333, h: 28.5714 },
  ],
}

function makeId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`
}

function isOverlapping(a: PlanningItem, b: PlanningItem) {
  return !(
    a.x + a.w <= b.x ||
    b.x + b.w <= a.x ||
    a.y + a.h <= b.y ||
    b.y + b.h <= a.y
  )
}

export default function LayoutTemplatePage() {
  const params = useParams<{ template: string }>()
  const template = params?.template ?? ''
  const current = templates[template as TemplateKey]

  const boardMeta = useMemo(() => {
    if (template === 'tent-25x10') {
      return {
        horizontalCells: 10,
        verticalCells: 4,
        maxWidth: '1100px',
      }
    }

    return {
      horizontalCells: 12,
      verticalCells: 7,
      maxWidth: '1300px',
    }
  }, [template])

  const cellW = 100 / boardMeta.horizontalCells
  const cellH = 100 / boardMeta.verticalCells

  const [items, setItems] = useState<PlanningItem[]>(
    current ? initialByTemplate[template as TemplateKey] ?? [] : []
  )
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const selectedItem = items.find((item) => item.id === selectedId) ?? null

  const collisionIds = useMemo(() => {
    const ids = new Set<string>()
    for (let i = 0; i < items.length; i += 1) {
      for (let j = i + 1; j < items.length; j += 1) {
        if (isOverlapping(items[i], items[j])) {
          ids.add(items[i].id)
          ids.add(items[j].id)
        }
      }
    }
    return ids
  }, [items])

  if (!current) {
    return (
      <main className="min-h-screen bg-[#07111f] px-6 py-10 text-white">
        <div className="mx-auto max-w-5xl rounded-[28px] border border-red-400/20 bg-red-400/10 p-8">
          <h1 className="text-3xl font-bold">Template not found</h1>
          <Link
            href="/layout-planning"
            className="mt-6 inline-flex rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white/80 transition hover:bg-white/10"
          >
            חזרה ל-Layout Planning
          </Link>
        </div>
      </main>
    )
  }

  function snapX(value: number, itemWidth: number) {
    const maxX = 100 - itemWidth
    const snapped = Math.round(value / cellW) * cellW
    return Math.max(0, Math.min(maxX, snapped))
  }

  function snapY(value: number, itemHeight: number) {
    const maxY = 100 - itemHeight
    const snapped = Math.round(value / cellH) * cellH
    return Math.max(0, Math.min(maxY, snapped))
  }

  function addItem(type: PlanningItemType) {
    const config = palette[type]
    const count = items.filter((item) => item.type === type).length + 1

    const rawPresets: Record<PlanningItemType, { x: number; y: number }> = {
      podium: { x: 18 + count * 7, y: 55 },
      banner: { x: 76, y: 16 + count * 8 },
      flag: { x: 10 + count * 7, y: 12 },
      stanchion: { x: 12 + count * 6, y: 82 },
    }

    const snappedW = Math.max(cellW, Math.round(config.w / cellW) * cellW)
    const snappedH = Math.max(cellH, Math.round(config.h / cellH) * cellH)

    const newItem: PlanningItem = {
      id: makeId(type),
      type,
      label: `${config.label} ${count}`,
      x: snapX(rawPresets[type].x, snappedW),
      y: snapY(rawPresets[type].y, snappedH),
      w: snappedW,
      h: snappedH,
    }

    setItems((prev) => [...prev, newItem])
    setSelectedId(newItem.id)
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((item) => item.id !== id))
    setSelectedId((prev) => (prev === id ? null : prev))
  }

  function moveItem(id: string, dx: number, dy: number) {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item

        const nextX = snapX(item.x + dx * cellW, item.w)
        const nextY = snapY(item.y + dy * cellH, item.h)

        return {
          ...item,
          x: nextX,
          y: nextY,
        }
      })
    )
  }

  const counts = {
    podium: items.filter((item) => item.type === 'podium').length,
    banner: items.filter((item) => item.type === 'banner').length,
    flag: items.filter((item) => item.type === 'flag').length,
    stanchion: items.filter((item) => item.type === 'stanchion').length,
  }

  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <div className="mx-auto max-w-[1680px] px-6 py-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="mb-2 text-sm text-cyan-300">PLANNING BOARD</div>
            <h1 className="text-4xl font-bold">{current.title}</h1>
            <p className="mt-2 text-sm text-white/65">{current.subtitle}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/exhibitions/israel"
              className="inline-flex rounded-2xl border border-cyan-400/30 bg-cyan-400/10 px-5 py-3 text-sm font-medium text-cyan-200 transition hover:bg-cyan-400/20"
            >
              חזרה לתערוכות בארץ
            </Link>
            <Link
              href="/layout-planning"
              className="inline-flex rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10"
            >
              חזרה לבחירת תבנית
            </Link>
          </div>
        </div>

        <div className="mb-8 grid grid-cols-2 gap-4 xl:grid-cols-4">
          <MetricCard label="Width" value={`${current.widthM} m`} />
          <MetricCard label="Depth" value={`${current.depthM} m`} />
          <MetricCard label="Height" value={`${current.heightM} m`} />
          <MetricCard label="Area" value={`${current.area} m²`} />
        </div>

        <section className="mb-8 rounded-[30px] border border-cyan-400/15 bg-white/[0.04] p-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold">Planning Surface</h2>
              <p className="mt-2 text-sm text-white/60">
                אובייקטים נצמדים לסריג והמערכת מסמנת חפיפות בין אובייקטים.
              </p>
            </div>

            <div className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
              Snap To Grid Active
            </div>
          </div>

          <div className="mb-5 grid grid-cols-2 gap-3 xl:grid-cols-4">
            <ToolbarButton label={`Add Podium (${counts.podium})`} onClick={() => addItem('podium')} />
            <ToolbarButton label={`Add Banner (${counts.banner})`} onClick={() => addItem('banner')} />
            <ToolbarButton label={`Add Flag (${counts.flag})`} onClick={() => addItem('flag')} />
            <ToolbarButton label={`Add Stanchion (${counts.stanchion})`} onClick={() => addItem('stanchion')} />
          </div>

          {collisionIds.size > 0 && (
            <div className="mb-5 rounded-2xl border border-red-400/25 bg-red-400/10 p-4 text-sm text-red-100">
              Warning: {collisionIds.size} object(s) overlap on the board. Move them apart.
            </div>
          )}

          {selectedItem ? (
            <div className="mb-5 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-sm text-amber-200/80">Selected Item</div>
                  <div className="mt-1 text-lg font-semibold text-amber-100">{selectedItem.label}</div>
                  <div className="mt-1 text-sm text-white/60">
                    type: {selectedItem.type} · X: {selectedItem.x.toFixed(1)}% · Y: {selectedItem.y.toFixed(1)}%
                  </div>
                </div>

                <button
                  onClick={() => removeItem(selectedItem.id)}
                  className="rounded-2xl border border-red-400/30 bg-red-400/10 px-4 py-2 text-sm text-red-200 transition hover:bg-red-400/20"
                >
                  Remove Selected
                </button>
              </div>

              <div className="grid grid-cols-4 gap-2 md:max-w-[420px]">
                <MoveButton label="←" onClick={() => moveItem(selectedItem.id, -1, 0)} />
                <MoveButton label="↑" onClick={() => moveItem(selectedItem.id, 0, -1)} />
                <MoveButton label="↓" onClick={() => moveItem(selectedItem.id, 0, 1)} />
                <MoveButton label="→" onClick={() => moveItem(selectedItem.id, 1, 0)} />
              </div>
            </div>
          ) : (
            <div className="mb-5 rounded-2xl border border-dashed border-white/10 px-4 py-4 text-sm text-white/45">
              לחץ על אובייקט בתוך הלוח כדי לבחור אותו ולהזיז אותו.
            </div>
          )}

          <div className="rounded-[28px] border border-cyan-300/20 bg-[#08111d] p-5">
            <div className="mb-4 flex items-center justify-between text-sm text-white/45">
              <span>Entrance side</span>
              <span>{current.widthM}m frontage</span>
            </div>

            <div
              className="relative mx-auto overflow-hidden rounded-[28px] border border-cyan-300/30 bg-[linear-gradient(180deg,rgba(10,24,40,0.95)_0%,rgba(8,18,31,1)_100%)]"
              style={{
                width: '100%',
                maxWidth: boardMeta.maxWidth,
                aspectRatio: `${current.widthM} / ${current.depthM}`,
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, rgba(125,211,252,0.12) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(125,211,252,0.12) 1px, transparent 1px)
                  `,
                  backgroundSize: `${cellW}% ${cellH}%`,
                }}
              />

              <div className="absolute inset-x-0 bottom-0 h-8 border-t border-cyan-300/30 bg-cyan-400/10" />

              <div className="absolute left-[6%] top-[18%] h-[18%] w-[16%] rounded-2xl border border-dashed border-cyan-300/35 bg-cyan-400/10 px-3 py-2 text-xs text-cyan-200">
                VIP / Reception
              </div>

              <div className="absolute left-[30%] top-[24%] h-[20%] w-[18%] rounded-2xl border border-dashed border-white/20 bg-white/[0.04] px-3 py-2 text-xs text-white/65">
                Main Exhibit Zone
              </div>

              <div className="absolute right-[12%] top-[18%] h-[16%] w-[14%] rounded-2xl border border-dashed border-white/20 bg-white/[0.04] px-3 py-2 text-xs text-white/65">
                Media / Screen
              </div>

              <div className="absolute right-[10%] bottom-[18%] h-[18%] w-[16%] rounded-2xl border border-dashed border-white/20 bg-white/[0.04] px-3 py-2 text-xs text-white/65">
                Storage / Support
              </div>

              {items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedId(item.id)}
                  className={itemClass(item.type, item.id === selectedId, collisionIds.has(item.id))}
                  style={{
                    left: `${item.x}%`,
                    top: `${item.y}%`,
                    width: `${item.w}%`,
                    height: `${item.h}%`,
                  }}
                  title={item.label}
                >
                  {item.label}
                </button>
              ))}

              <div className="absolute inset-x-[8%] bottom-[10%] flex items-center justify-between text-[11px] text-white/45">
                <span>Left wall zone</span>
                <span>Visitor flow / central aisle</span>
                <span>Right wall zone</span>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
              <InfoCard
                title="Current board stage"
                value="Collision warning active"
                note="חפיפות בין אובייקטים מסומנות כעת ישירות על הלוח"
              />
              <InfoCard
                title="Placement logic"
                value="Manual placement v4"
                note="השלב הבא: rotate או drag mode"
              />
              <InfoCard
                title="Future mode"
                value="Auto arrangement"
                note="בהמשך המערכת תציע פריסה חכמה לפי סוגי אובייקטים"
              />
            </div>
          </div>
        </section>

        <section className="rounded-[30px] border border-white/10 bg-white/[0.04] p-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold">Placed Inventory</h2>
              <p className="mt-2 text-sm text-white/60">
                רשימת האובייקטים שכבר נכנסו אל תוך לוח התכנון
              </p>
            </div>

            <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
              {items.length} items on board
            </div>
          </div>

          {!items.length ? (
            <div className="rounded-2xl border border-dashed border-white/10 px-4 py-8 text-center text-sm text-white/45">
              עדיין לא הוכנסו אובייקטים אל תוך הלוח
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
              {items.map((item) => (
                <div
                  key={item.id}
                  className={[
                    'rounded-2xl border bg-[#0a1627] p-4 transition',
                    collisionIds.has(item.id)
                      ? 'border-red-400/30 ring-1 ring-red-400/25'
                      : item.id === selectedId
                      ? 'border-amber-300/30 ring-1 ring-amber-300/20'
                      : 'border-white/10',
                  ].join(' ')}
                >
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div>
                      <div className="text-lg font-semibold">{item.label}</div>
                      <div className="mt-1 text-sm text-white/50">{item.type}</div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedId(item.id)}
                        className="rounded-2xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200 transition hover:bg-cyan-400/20"
                      >
                        Select
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="rounded-2xl border border-red-400/30 bg-red-400/10 px-4 py-2 text-sm text-red-200 transition hover:bg-red-400/20"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-4">
                    <MetricCard label="X" value={`${item.x.toFixed(1)}%`} />
                    <MetricCard label="Y" value={`${item.y.toFixed(1)}%`} />
                    <MetricCard label="W" value={`${item.w.toFixed(1)}%`} />
                    <MetricCard label="H" value={`${item.h.toFixed(1)}%`} />
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    <MoveButton label="←" onClick={() => moveItem(item.id, -1, 0)} />
                    <MoveButton label="↑" onClick={() => moveItem(item.id, 0, -1)} />
                    <MoveButton label="↓" onClick={() => moveItem(item.id, 0, 1)} />
                    <MoveButton label="→" onClick={() => moveItem(item.id, 1, 0)} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

function ToolbarButton({
  label,
  onClick,
}: {
  label: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="rounded-2xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-3 text-sm font-medium text-cyan-200 transition hover:bg-cyan-400/20"
    >
      {label}
    </button>
  )
}

function MoveButton({
  label,
  onClick,
}: {
  label: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-lg font-semibold text-white/85 transition hover:bg-white/[0.08]"
    >
      {label}
    </button>
  )
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4">
      <div className="text-sm text-white/45">{label}</div>
      <div className="mt-2 text-xl font-semibold text-white/90">{value}</div>
    </div>
  )
}

function InfoCard({
  title,
  value,
  note,
}: {
  title: string
  value: string
  note: string
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4">
      <div className="text-sm text-white/45">{title}</div>
      <div className="mt-2 text-lg font-semibold text-cyan-200">{value}</div>
      <div className="mt-2 text-sm text-white/60">{note}</div>
    </div>
  )
}

function itemClass(type: PlanningItemType, isSelected: boolean, isColliding: boolean) {
  const base =
    'absolute flex items-center justify-center rounded-xl border text-[11px] font-medium shadow-[0_0_20px_rgba(56,189,248,0.08)] backdrop-blur-[2px] transition'

  const selected = isSelected ? ' ring-2 ring-amber-300/60 z-20' : ' z-10'
  const collision = isColliding ? ' border-red-400/80 bg-red-500/20 text-red-100 ring-2 ring-red-400/35' : ''

  if (collision) return `${base}${selected}${collision}`

  if (type === 'podium') {
    return `${base}${selected} border-cyan-300/50 bg-cyan-400/20 text-cyan-100`
  }

  if (type === 'banner') {
    return `${base}${selected} border-fuchsia-300/40 bg-fuchsia-400/15 text-fuchsia-100`
  }

  if (type === 'flag') {
    return `${base}${selected} border-amber-300/40 bg-amber-400/15 text-amber-100`
  }

  return `${base}${selected} border-emerald-300/40 bg-emerald-400/15 text-emerald-100`
}
