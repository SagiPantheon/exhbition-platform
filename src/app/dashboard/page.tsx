"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { exhibitDivisions, exhibitBankSummary } from "../../data/globalExhibitBank"
import DivisionSidebar from "../../components/DivisionSidebar"
import { masterExhibits } from "../../data/masterExhibits"
import { landAssets } from "../../data/landAssets"

// ─── Division → route map ─────────────────────────────────────────────────────

const DIVISION_HREF: Record<string, string> = {
  "missiles-space-defense": "/space",
  "aviation":               "/air",
  "elta":                   "/naval",
  "uav":                    "/land",
}

// ─── Division cover images ────────────────────────────────────────────────────

const DIVISION_COVER_MAP: Record<string, string> = {
  "missiles-space-defense": "/covers/bg-missiles.png",
  aviation:                  "/covers/bg-air.png",
  elta:                      "/covers/bg-elta.png",
  uav:                       "/covers/bg-land.png",
}

// ─── Division accent palette ───────────────────────────────────────────────────

const DIVISION_STYLES = [
  {
    border:   "border-blue-400/35",
    headerBg: "bg-[radial-gradient(ellipse_at_top_right,rgba(96,165,250,0.18),transparent_60%)]",
    pill:     "border-blue-400/40 bg-blue-400/10 text-blue-200",
    bar:      "bg-blue-400",
    badge:    "text-blue-300",
    num:      "text-blue-200",
  },
  {
    border:   "border-sky-400/35",
    headerBg: "bg-[radial-gradient(ellipse_at_top_right,rgba(56,189,248,0.18),transparent_60%)]",
    pill:     "border-sky-400/40 bg-sky-400/10 text-sky-200",
    bar:      "bg-sky-400",
    badge:    "text-sky-300",
    num:      "text-sky-200",
  },
  {
    border:   "border-violet-400/35",
    headerBg: "bg-[radial-gradient(ellipse_at_top_right,rgba(167,139,250,0.18),transparent_60%)]",
    pill:     "border-violet-400/40 bg-violet-400/10 text-violet-200",
    bar:      "bg-violet-400",
    badge:    "text-violet-300",
    num:      "text-violet-200",
  },
  {
    border:   "border-emerald-400/35",
    headerBg: "bg-[radial-gradient(ellipse_at_top_right,rgba(52,211,153,0.18),transparent_60%)]",
    pill:     "border-emerald-400/40 bg-emerald-400/10 text-emerald-200",
    bar:      "bg-emerald-400",
    badge:    "text-emerald-300",
    num:      "text-emerald-200",
  },
]

// ─── Carousel data ─────────────────────────────────────────────────────────────

function buildCarouselItems() {
  // Single pass over masterExhibits — the same non-inventory set that backs every
  // other count on this page (header, sidebar, CoreStat). landAssets is a separate
  // dataset not folded into masterExhibits, so it's intentionally left out here to
  // keep this badge in lockstep with the rest of the page.
  const items = masterExhibits
    .filter((a) => a.division !== "inventory" && a.image)
    .map((a) => ({
      slug:     a.slug,
      titleEn:  a.nameEn,
      titleHe:  a.nameHe,
      image:    a.image,
      category: "Air",
      href:     `/air/${a.slug}`,
    }))

  // Dedup by slug as a safety net against future duplicate entries.
  return Array.from(new Map(items.map((item) => [item.slug, item])).values())
}

const carouselItems = buildCarouselItems()

// Largest division's exhibit count — used to scale the per-division count bars
// on the dashboard cards relative to each other.
const maxDivisionExhibitCount = Math.max(...exhibitDivisions.map((d) => d.exhibitCount))

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const spaceAssetCount = masterExhibits.filter((e) => e.division === "mtach").length
  const airAssetCount = masterExhibits.filter((e) => e.division === "teufa").length
  const [hoveredDivId, setHoveredDivId] = useState<string | null>(null)

  return (
    <div className="flex min-h-screen bg-[#070b17] text-white">

      {/* ── Sidebar ── */}
      <DivisionSidebar activeHref="/dashboard" totalAssets={exhibitBankSummary.totalExhibits} />

      {/* ── Main ── */}
      <main className="flex-1 overflow-auto px-8 py-8">

        {/* Header */}
        <section className="mb-8 rounded-[34px] border border-cyan-300/20 p-8 shadow-[0_0_50px_rgba(24,119,242,0.12)]" style={{ backgroundImage: "linear-gradient(90deg, rgba(2,8,20,0.80) 0%, rgba(2,8,20,0.40) 60%, transparent 100%), url('/covers/bg-global-bank.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <p className="text-[11px] uppercase tracking-[0.35em] text-cyan-300">Exhibition Platform</p>
              <h1 className="mt-2 text-4xl font-extrabold md:text-5xl">Global Exhibit Bank</h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
                מאגר ידע המרכז את כלל מערכות התצוגה של IAI — 4 חטיבות, {exhibitBankSummary.totalExhibits} מוצגים, מוכנות תלת-ממד {exhibitBankSummary.averageReadiness}%
              </p>
            </div>
            <div className="grid min-w-[260px] gap-3 sm:grid-cols-2">
              <StatPill label="חטיבות" value={`${exhibitBankSummary.totalDivisions}`} />
              <StatPill label="מוצגים" value={`${exhibitBankSummary.totalExhibits}`} />
              <StatPill label="מוכנות תלת-ממד" value={`${exhibitBankSummary.averageReadiness}%`} />
              <StatPill label="מערכות טעינה" value={`${exhibitBankSummary.totalExhibits}`} />
            </div>
          </div>
        </section>

        {/* Division cards */}
        <section className="mb-8 grid gap-5 sm:grid-cols-2 2xl:grid-cols-4">
          {exhibitDivisions.map((div, i) => {
            const s = DIVISION_STYLES[i % DIVISION_STYLES.length]
            return (
              <div
                key={div.id}
                className={`group relative overflow-hidden rounded-[28px] border ${s.border} bg-[#0b1227] transition duration-300 hover:-translate-y-1`}
                style={{
                  ...(DIVISION_COVER_MAP[div.id] ? {
                    backgroundImage: `url(${DIVISION_COVER_MAP[div.id]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "right top",
                  } : {}),
                  boxShadow: hoveredDivId === div.id
                    ? "0 0 35px rgba(0,200,255,0.55), 0 0 70px rgba(0,140,255,0.25)"
                    : "0 0 20px rgba(0,180,255,0.35), 0 0 40px rgba(0,120,255,0.15), inset 0 0 30px rgba(0,150,255,0.08)",
                  transition: "box-shadow 0.3s ease, transform 0.3s ease",
                }}
                onMouseEnter={() => setHoveredDivId(div.id)}
                onMouseLeave={() => setHoveredDivId(null)}
              >
                {/* overlay — light enough to show the cover photo */}
                <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(2,8,20,0.25) 0%, rgba(3,10,24,0.45) 50%, rgba(4,12,28,0.70) 100%)" }} />
                <div className={`absolute inset-0 ${s.headerBg} pointer-events-none`} />

                <div className="relative p-6">
                  {/* Title */}
                  <p className={`text-[11px] uppercase tracking-[0.28em] ${s.badge}`}>Division</p>
                  <h2 className="mt-1 text-2xl font-extrabold text-white">{div.titleHe}</h2>
                  <p className="mt-0.5 text-xs text-slate-500">{div.titleEn}</p>

                  {/* Sub-divisions */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {div.subDivisions.map((sub) => (
                      <span key={sub} className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${s.pill}`}>
                        {sub}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-[14px] border border-white/8 bg-white/[0.04] px-3 py-3">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">מוצגים</p>
                      <p className={`mt-1 text-xl font-extrabold ${s.num}`}>{div.exhibitCount}</p>
                    </div>
                    <div className="rounded-[14px] border border-white/8 bg-white/[0.04] px-3 py-3">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">תת-חטיבות</p>
                      <p className={`mt-1 text-xl font-extrabold ${s.num}`}>{div.subDivisionCount}</p>
                    </div>
                  </div>

                  {/* Exhibit count bar — sized relative to the largest division, so the bars actually differ */}
                  <div className="mt-4">
                    <div className="mb-1.5 flex items-center justify-between text-xs">
                      <span className="text-slate-500">מוצגים בחטיבה</span>
                      <span className={`font-bold ${s.badge}`}>{div.exhibitCount}</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full rounded-full" style={{ width: `${(div.exhibitCount / maxDivisionExhibitCount) * 100}%`, background: "#00D4FF", boxShadow: "0 0 8px rgba(0,200,255,0.8)" }} />
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mt-4 text-sm leading-6 text-slate-400">{div.descriptionHe}</p>

                  {/* Preview systems */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {div.previewSystems.map((sys) => (
                      <span key={sys} className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-slate-400">
                        {sys}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link
                    href={DIVISION_HREF[div.id] ?? "/air"}
                    style={{ display: "block", marginTop: "20px" }}
                    className="w-full px-4 py-3 rounded-xl text-center font-bold text-sm bg-blue-600 hover:bg-blue-500 text-white transition-colors"
                  >
                    {div.ctaHe}
                  </Link>
                </div>
              </div>
            )
          })}
        </section>

        {/* Global Exhibit Core */}
        <section className="mb-8 rounded-[32px] border border-cyan-300/20 bg-[radial-gradient(ellipse_at_center,rgba(32,80,170,0.22),rgba(7,11,23,1)_65%)] p-8 shadow-[0_0_60px_rgba(24,119,242,0.10)]">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.35em] text-cyan-300">Core Summary</p>
              <h2 className="mt-1 text-3xl font-extrabold">Global Exhibit Core</h2>
              <p className="mt-2 text-sm text-slate-400">מבט-על על מצב מאגר המוצגים הגלובלי של IAI</p>
            </div>
            <Link
              href="/exhibitions"
              className="rounded-xl border border-cyan-400/40 bg-cyan-400/10 px-5 py-2.5 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/20"
            >
              לניהול תערוכות ←
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <CoreStat label="סה״כ מוצגים" value={exhibitBankSummary.totalExhibits} sub="across all divisions" color="text-cyan-300" />
            <CoreStat label="חטיבות פעילות" value={exhibitBankSummary.totalDivisions} sub="fully catalogued" color="text-blue-300" />
            <CoreStat label="מוכנות תלת-ממד" value={`${exhibitBankSummary.averageReadiness}%`} sub="3D model coverage" color="text-emerald-300" />
            <CoreStat label="מערכות טעינה" value={exhibitBankSummary.totalExhibits} sub="assets in database" color="text-violet-300" />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-[20px] border border-white/8 bg-white/[0.03] p-5">
              <p className="mb-3 text-[11px] uppercase tracking-[0.25em] text-slate-500">3D Model Coverage</p>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-slate-300">{exhibitBankSummary.withModel} מתוך {exhibitBankSummary.totalExhibits} מוצגים בקטלוג עם דגם תלת-ממד</span>
                <span className="font-bold text-emerald-300">{exhibitBankSummary.averageReadiness}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/8">
                <div className="h-full rounded-full bg-emerald-400" style={{ width: `${exhibitBankSummary.averageReadiness}%` }} />
              </div>
            </div>

            <div className="rounded-[20px] border border-white/8 bg-white/[0.03] p-5">
              <p className="mb-3 text-[11px] uppercase tracking-[0.25em] text-slate-500">Quick Links</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "Air Assets",   href: "/air",        count: airAssetCount },
                  { label: "Space Assets", href: "/space",      count: spaceAssetCount },
                  { label: "Land Assets",  href: "/land",       count: landAssets.length },
                  { label: "Tents Layout", href: "/tents-layout", count: null },
                  { label: "Israel Exh.",  href: "/exhibitions/israel", count: null },
                  { label: "Inventory",    href: "/inventory",  count: null },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center justify-between rounded-[14px] border border-white/8 bg-white/[0.03] px-3 py-2.5 text-sm text-slate-300 transition hover:border-cyan-300/25 hover:bg-cyan-400/5 hover:text-white"
                  >
                    <span>{link.label}</span>
                    {link.count !== null && (
                      <span className="rounded-full border border-cyan-300/20 bg-cyan-400/8 px-2 py-0.5 text-[10px] font-semibold text-cyan-300">
                        {link.count}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Asset Carousel */}
        <section className="rounded-[28px] border border-cyan-300/15 bg-[#0b1227] p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.28em] text-cyan-300">Exhibit Catalog</p>
              <h2 className="mt-1 text-xl font-bold text-white">כל המוצגים</h2>
            </div>
            <span className="rounded-full border border-cyan-300/25 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-200">
              {carouselItems.length} מוצגים
            </span>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-3 [scrollbar-width:thin] [scrollbar-color:rgba(103,232,249,0.2)_transparent]">
            {carouselItems.map((item) => (
              <Link
                key={`${item.category}-${item.slug}`}
                href={item.href}
                className="group shrink-0 w-[160px] rounded-[20px] border border-cyan-300/15 bg-[#0d1830] p-3 transition hover:-translate-y-1 hover:border-cyan-300/35 hover:shadow-[0_8px_24px_rgba(24,119,242,0.15)]"
              >
                <div className="relative mb-3 h-[100px] overflow-hidden rounded-[14px] border border-white/8 bg-[#070b17]">
                  <Image
                    src={item.image}
                    alt={item.titleEn}
                    fill
                    sizes="160px"
                    className="object-contain p-2 transition duration-300 group-hover:scale-105"
                  />
                </div>
                <p className="truncate text-[11px] uppercase tracking-[0.18em] text-cyan-300">{item.category}</p>
                <p className="mt-0.5 truncate text-sm font-semibold text-white">{item.titleEn}</p>
                {item.titleHe && (
                  <p className="mt-0.5 truncate text-xs text-slate-500">{item.titleHe}</p>
                )}
              </Link>
            ))}
          </div>
        </section>

      </main>
    </div>
  )
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-cyan-300/15 bg-white/[0.04] p-4">
      <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">{label}</p>
      <p className="mt-2 text-lg font-bold text-white">{value}</p>
    </div>
  )
}

function CoreStat({
  label,
  value,
  sub,
  color,
}: {
  label: string
  value: string | number
  sub: string
  color: string
}) {
  return (
    <div className="rounded-[20px] border border-white/8 bg-white/[0.03] p-5 text-center">
      <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500">{label}</p>
      <p className={`mt-2 text-4xl font-extrabold ${color}`}>{value}</p>
      <p className="mt-1 text-xs text-slate-500">{sub}</p>
    </div>
  )
}
