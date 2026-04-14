import Link from 'next/link'
import { layoutCategoryLabels, layoutInventory, type LayoutItemCategory } from '../../data/layoutInventory'

const categoryOrder: LayoutItemCategory[] = [
  'tent',
  'podium',
  'banner',
  'crowd_control',
  'flag',
  'support',
]

const tentTemplates = [
  {
    id: 'tent-25x10',
    title: 'אוהל תצוגה 25x10',
    subtitle: 'Exhibition Tent 25x10',
    widthM: 25,
    depthM: 10,
    heightM: 4,
    area: 250,
    usage: 'Outdoor Exhibition Base',
    notes: 'מתאים לתצוגה בינונית־גדולה עם זרימת קהל קדמית וצידית',
  },
  {
    id: 'tent-30x20',
    title: 'אוהל תצוגה 30x20',
    subtitle: 'Exhibition Tent 30x20',
    widthM: 30,
    depthM: 20,
    heightM: 4.5,
    area: 600,
    usage: 'Large Event / Main Pavilion',
    notes: 'מתאים למערך גדול עם אזורי VIP, מוצגים מרכזיים ומעברי קהל רחבים',
  },
]

function itemsByCategory(category: LayoutItemCategory) {
  return layoutInventory.filter((item) => item.category === category)
}

export default function LayoutPlanningPage() {
  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <div className="mx-auto max-w-[1680px] px-6 py-8">
        <div className="mb-8 rounded-[28px] border border-cyan-400/15 bg-white/5 p-6">
          <div className="mb-3 text-sm text-cyan-300">LAYOUT PLANNING / INVENTORY BASE</div>
          <h1 className="text-4xl font-bold">Layout Planning Base</h1>
          <p className="mt-3 max-w-4xl text-sm text-white/70">
            בסיס ראשון לתכנון תצוגות, אוהלים וציוד מחסן. מכאן נבנה את ספריית השטחים,
            אובייקטי ההעמדה והפלנר הגרפי.
          </p>
        </div>

        <section className="mb-8 rounded-[28px] border border-cyan-400/15 bg-white/[0.04] p-5">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <div className="text-sm text-cyan-300">TENT TEMPLATES</div>
              <h2 className="mt-1 text-2xl font-semibold">Base Pavilion Structures</h2>
              <p className="mt-2 text-sm text-white/60">
                תבניות בסיס לשלב הבא — בחירת מבנה, תכנון שטח ועתידית גם הצבת מוצגים פנימה.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
            {tentTemplates.map((tent) => (
              <article
                key={tent.id}
                className="overflow-hidden rounded-[28px] border border-cyan-400/20 bg-[#0a1627]"
              >
                <div className="relative h-[280px] border-b border-cyan-400/10 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.22),transparent_45%),linear-gradient(180deg,#0d2037_0%,#08121f_100%)]">
                  <div className="absolute inset-0 p-6">
                    <div className="mb-5 flex items-center justify-between gap-4">
                      <div>
                        <div className="text-sm text-cyan-300">Template Structure</div>
                        <h3 className="mt-2 text-3xl font-bold">{tent.title}</h3>
                        <div className="mt-2 text-sm text-white/55">{tent.subtitle}</div>
                      </div>

                      <div className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
                        {tent.area} m²
                      </div>
                    </div>

                    <div className="relative mt-8 h-[150px]">
                      <div className="absolute left-[8%] top-[28%] h-[72px] w-[78%] rounded-[22px] border border-cyan-300/40 bg-cyan-400/10 shadow-[0_0_50px_rgba(56,189,248,0.08)]" />
                      <div className="absolute left-[14%] top-[12%] h-[56px] w-[66%] [clip-path:polygon(8%_100%,50%_0%,92%_100%)] rounded-t-[24px] border border-cyan-200/30 bg-white/10" />

                      {tent.id === 'tent-25x10' ? (
                        <>
                          <div className="absolute left-[17%] top-[41%] h-[42px] w-[10%] rounded-lg border border-white/20 bg-white/5" />
                          <div className="absolute left-[31%] top-[41%] h-[42px] w-[10%] rounded-lg border border-white/20 bg-white/5" />
                          <div className="absolute left-[45%] top-[41%] h-[42px] w-[10%] rounded-lg border border-white/20 bg-white/5" />
                          <div className="absolute left-[59%] top-[41%] h-[42px] w-[10%] rounded-lg border border-white/20 bg-white/5" />
                        </>
                      ) : (
                        <>
                          <div className="absolute left-[15%] top-[41%] h-[42px] w-[8%] rounded-lg border border-white/20 bg-white/5" />
                          <div className="absolute left-[26%] top-[41%] h-[42px] w-[8%] rounded-lg border border-white/20 bg-white/5" />
                          <div className="absolute left-[37%] top-[41%] h-[42px] w-[8%] rounded-lg border border-white/20 bg-white/5" />
                          <div className="absolute left-[48%] top-[41%] h-[42px] w-[8%] rounded-lg border border-white/20 bg-white/5" />
                          <div className="absolute left-[59%] top-[41%] h-[42px] w-[8%] rounded-lg border border-white/20 bg-white/5" />
                          <div className="absolute left-[70%] top-[41%] h-[42px] w-[8%] rounded-lg border border-white/20 bg-white/5" />
                        </>
                      )}

                      <div className="absolute bottom-2 left-[10%] right-[10%] flex items-center justify-between text-xs text-white/45">
                        <span>{tent.widthM}m width</span>
                        <span>{tent.depthM}m depth</span>
                        <span>{tent.heightM}m height</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                    <MetricCard label="Width" value={`${tent.widthM} m`} />
                    <MetricCard label="Depth" value={`${tent.depthM} m`} />
                    <MetricCard label="Height" value={`${tent.heightM} m`} />
                    <MetricCard label="Area" value={`${tent.area} m²`} />
                  </div>

                  <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-[220px_minmax(0,1fr)]">
                    <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-200">
                      {tent.usage}
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-sm text-white/65">
                      {tent.notes}
                    </div>
                  </div>

                  <div className="mt-4">
                    <Link
                      href={`/layout-planning/${tent.id}`}
                      className="inline-flex rounded-2xl border border-cyan-400/40 bg-cyan-400/10 px-5 py-3 text-sm font-medium text-cyan-200 transition hover:bg-cyan-400/20"
                    >
                      Start Planning
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="space-y-8">
          {categoryOrder.map((category) => {
            const items = itemsByCategory(category)
            return (
              <section
                key={category}
                className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5"
              >
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-semibold">{layoutCategoryLabels[category]}</h2>
                    <div className="mt-1 text-sm text-white/50">{items.length} items</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                  {items.map((item) => (
                    <article
                      key={item.id}
                      className="rounded-[24px] border border-cyan-400/15 bg-[#0a1627] p-5"
                    >
                      <div className="mb-4 flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-xl font-semibold">{item.nameHe}</h3>
                          <div className="mt-1 text-sm text-white/50">{item.nameEn}</div>
                        </div>
                        <div className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-200">
                          Qty {item.quantity}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-sm text-white/75 md:grid-cols-4">
                        <MetricCard label="Width" value={`${item.widthM} m`} />
                        <MetricCard label="Depth" value={`${item.depthM} m`} />
                        <MetricCard label="Height" value={`${item.heightM} m`} />
                        <MetricCard label="Usage" value={item.usage} />
                      </div>

                      <div className="mt-4 rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-sm text-white/65">
                        {item.notes || '—'}
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      </div>
    </main>
  )
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
      <div className="text-white/45">{label}</div>
      <div className="mt-1 font-medium text-white/85">{value}</div>
    </div>
  )
}
