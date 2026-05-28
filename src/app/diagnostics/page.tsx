"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import DivisionSidebar from "../../components/DivisionSidebar"
import {
  exhibitionsOverview,
  overviewStats,
  type ExhibitionRecord,
  type ExhibitionStatus,
  type RequestType,
} from "../../data/exhibitionsOverview"

// ─── Config ───────────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<ExhibitionStatus, { label: string; labelHe: string; color: string; bg: string; dot: string }> = {
  "active":           { label: "Active",            labelHe: "פעיל",          color: "#34d399", bg: "rgba(52,211,153,0.12)",  dot: "#34d399" },
  "planned":          { label: "Planned",           labelHe: "מתוכנן",        color: "#60a5fa", bg: "rgba(96,165,250,0.12)",  dot: "#60a5fa" },
  "completed":        { label: "Completed",         labelHe: "הושלם",         color: "#a78bfa", bg: "rgba(167,139,250,0.12)", dot: "#a78bfa" },
  "pending-approval": { label: "Pending Approval",  labelHe: "ממתין לאישור",  color: "#fbbf24", bg: "rgba(251,191,36,0.12)",  dot: "#fbbf24" },
  "cancelled":        { label: "Cancelled",         labelHe: "בוטל",          color: "#f87171", bg: "rgba(248,113,113,0.12)", dot: "#f87171" },
}

const REQUEST_CONFIG: Record<RequestType, { label: string; color: string }> = {
  "professional": { label: "Professional", color: "#22d3ee" },
  "academic":     { label: "Academic",     color: "#a78bfa" },
  "internal":     { label: "Internal",     color: "#94a3b8" },
  "mixed":        { label: "Mixed",        color: "#fbbf24" },
}

function fmt(n: number) {
  return n >= 1000000
    ? `$${(n / 1000000).toFixed(1)}M`
    : `$${(n / 1000).toFixed(0)}K`
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusChip({ status }: { status: ExhibitionStatus }) {
  const c = STATUS_CONFIG[status]
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "5px 12px", borderRadius: 999,
      fontSize: 11, fontWeight: 700, letterSpacing: "0.06em",
      color: c.color, background: c.bg,
      border: `1px solid ${c.color}40`,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: c.dot, flexShrink: 0 }} />
      {c.label}
    </span>
  )
}

function RequestChip({ type }: { type: RequestType }) {
  const c = REQUEST_CONFIG[type]
  return (
    <span style={{
      padding: "4px 10px", borderRadius: 999,
      fontSize: 11, fontWeight: 600, color: c.color,
      background: `${c.color}18`, border: `1px solid ${c.color}35`,
    }}>
      {c.label}
    </span>
  )
}

function BudgetBar({ value, max }: { value: number; max: number }) {
  const pct = Math.round((value / max) * 100)
  const color = value > 300000 ? "#f87171" : value > 100000 ? "#fbbf24" : "#34d399"
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ flex: 1, height: 6, borderRadius: 999, background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 999, boxShadow: `0 0 8px ${color}80`, transition: "width 0.4s ease" }} />
      </div>
      <span style={{ fontSize: 12, fontWeight: 700, color: "#e2e8f0", minWidth: 52, textAlign: "right" }}>{fmt(value)}</span>
    </div>
  )
}

function ExpandedRow({ ex }: { ex: ExhibitionRecord }) {
  const maxGuests = Math.max(...ex.guestOrigins.map(g => g.estimatedCount))
  return (
    <div style={{ padding: "20px 24px 24px", borderTop: "1px solid rgba(0,200,255,0.1)", background: "rgba(0,10,30,0.4)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))", gap: 20 }}>

      {/* Responsible & Contractor */}
      <div>
        <p style={labelStyle}>Responsible / אחראי</p>
        <p style={valueStyle}>{ex.responsible}</p>
        <p style={{ ...labelStyle, marginTop: 14 }}>Contractor / קבלן</p>
        <p style={valueStyle}>{ex.contractor}</p>
      </div>

      {/* Suppliers */}
      <div>
        <p style={labelStyle}>Suppliers / ספקים</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 8 }}>
          {ex.suppliers.map((s, i) => (
            <span key={i} style={{ fontSize: 12, color: "#cbd5e1", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "5px 10px" }}>
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Guest Origins */}
      <div>
        <p style={labelStyle}>Expected Guests / אורחים צפויים</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
          {ex.guestOrigins.map((g, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 16 }}>{g.flag}</span>
              <span style={{ fontSize: 12, color: "#cbd5e1", minWidth: 70 }}>{g.country}</span>
              <div style={{ flex: 1, height: 5, borderRadius: 999, background: "rgba(255,255,255,0.07)", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${Math.round((g.estimatedCount / maxGuests) * 100)}%`, background: "#22d3ee", borderRadius: 999 }} />
              </div>
              <span style={{ fontSize: 11, color: "#94a3b8", minWidth: 36, textAlign: "right" }}>{g.estimatedCount.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Cost + Notes */}
      <div>
        <p style={labelStyle}>Estimated Budget</p>
        <p style={{ fontSize: 28, fontWeight: 900, color: "#22d3ee", marginTop: 6 }}>{fmt(ex.estimatedCostUSD)}</p>
        <p style={{ ...labelStyle, marginTop: 14 }}>Notes / הערות</p>
        <p style={{ fontSize: 13, color: "#94a3b8", marginTop: 6, lineHeight: 1.6 }}>{ex.notes || "—"}</p>
      </div>
    </div>
  )
}

const labelStyle: React.CSSProperties = { fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(0,200,255,0.55)", margin: 0 }
const valueStyle: React.CSSProperties = { fontSize: 14, fontWeight: 600, color: "#e2e8f0", marginTop: 6 }

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function DiagnosticsPage() {
  const [filter, setFilter] = useState<"all" | "israel" | "abroad">("all")
  const [statusFilter, setStatusFilter] = useState<ExhibitionStatus | "all">("all")
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const filtered = useMemo(() => {
    return exhibitionsOverview.filter(e => {
      if (filter === "israel" && e.region !== "israel") return false
      if (filter === "abroad" && e.region !== "abroad") return false
      if (statusFilter !== "all" && e.status !== statusFilter) return false
      return true
    })
  }, [filter, statusFilter])

  const maxBudget = Math.max(...exhibitionsOverview.map(e => e.estimatedCostUSD))

  const statCards = [
    { label: "Total Exhibitions", labelHe: "סה\"כ תערוכות", value: overviewStats.total, color: "#22d3ee" },
    { label: "Annual Budget", labelHe: "תקציב שנתי", value: fmt(overviewStats.totalBudgetUSD), color: "#60a5fa" },
    { label: "Countries", labelHe: "מדינות", value: overviewStats.countries, color: "#a78bfa" },
    { label: "Active Now", labelHe: "פעיל עכשיו", value: overviewStats.active, color: "#34d399" },
    { label: "Israel", labelHe: "בארץ", value: overviewStats.israel, color: "#fbbf24" },
    { label: "Abroad", labelHe: "בחו\"ל", value: overviewStats.abroad, color: "#f87171" },
  ]

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#01020e", color: "#fff", fontFamily: "Heebo, Assistant, sans-serif" }}>
      <DivisionSidebar activeHref="/diagnostics" totalAssets={overviewStats.total} />

      <main style={{ flex: 1, overflowX: "hidden", padding: "32px 32px 64px" }}>

        {/* ── Header ── */}
        <div style={{ marginBottom: 28 }}>
          <p style={{ fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(0,200,255,0.65)", margin: "0 0 8px" }}>
            IAI Exhibition Platform · {new Date().getFullYear()}
          </p>
          <h1 style={{ margin: 0, fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.03em" }}>
            Exhibition Overview
          </h1>
          <p style={{ margin: "8px 0 0", fontSize: 15, color: "rgba(255,255,255,0.5)", letterSpacing: "0.04em" }}>
            סקירת תערוכות · {overviewStats.total} תערוכות · {overviewStats.countries} מדינות
          </p>
        </div>

        {/* ── Stat Cards ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 14, marginBottom: 28 }}>
          {statCards.map((s) => (
            <div key={s.label} style={{
              borderRadius: 20, padding: "18px 20px",
              border: `1px solid ${s.color}30`,
              background: `radial-gradient(ellipse at top right, ${s.color}15, transparent 65%), rgba(10,18,40,0.7)`,
              boxShadow: `0 0 24px ${s.color}18`,
            }}>
              <p style={{ margin: "0 0 6px", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: `${s.color}90` }}>
                {s.label}
              </p>
              <p style={{ margin: 0, fontSize: 30, fontWeight: 900, color: s.color }}>
                {s.value}
              </p>
              <p style={{ margin: "4px 0 0", fontSize: 11, color: "rgba(255,255,255,0.35)" }}>
                {s.labelHe}
              </p>
            </div>
          ))}
        </div>

        {/* ── Status Bar ── */}
        <div style={{ marginBottom: 24, padding: "16px 20px", borderRadius: 18, border: "1px solid rgba(255,255,255,0.07)", background: "rgba(10,18,40,0.5)", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <span style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginRight: 4 }}>Status</span>
          {(["all", ...Object.keys(STATUS_CONFIG)] as const).map(s => {
            const active = statusFilter === s
            const conf = s !== "all" ? STATUS_CONFIG[s as ExhibitionStatus] : null
            return (
              <button key={s} onClick={() => setStatusFilter(s as any)} style={{
                padding: "6px 14px", borderRadius: 999, fontSize: 12, fontWeight: 700, cursor: "pointer",
                border: active ? `1px solid ${conf?.color ?? "rgba(0,200,255,0.6)"}` : "1px solid rgba(255,255,255,0.1)",
                background: active ? (conf ? conf.bg : "rgba(0,200,255,0.12)") : "transparent",
                color: active ? (conf?.color ?? "#22d3ee") : "rgba(255,255,255,0.45)",
                transition: "all 0.15s",
              }}>
                {s === "all" ? "All" : STATUS_CONFIG[s as ExhibitionStatus].label}
              </button>
            )
          })}
        </div>

        {/* ── Region Tabs ── */}
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          {(["all", "israel", "abroad"] as const).map(r => (
            <button key={r} onClick={() => setFilter(r)} style={{
              padding: "10px 22px", borderRadius: 12, fontSize: 13, fontWeight: 700, cursor: "pointer",
              border: filter === r ? "1px solid rgba(0,200,255,0.5)" : "1px solid rgba(255,255,255,0.1)",
              background: filter === r ? "rgba(0,200,255,0.12)" : "rgba(255,255,255,0.03)",
              color: filter === r ? "#22d3ee" : "rgba(255,255,255,0.4)",
              transition: "all 0.15s",
            }}>
              {r === "all" ? `All (${overviewStats.total})` : r === "israel" ? `🇮🇱 Israel (${overviewStats.israel})` : `✈️ Abroad (${overviewStats.abroad})`}
            </button>
          ))}
        </div>

        {/* ── Table ── */}
        <div style={{ borderRadius: 24, border: "1px solid rgba(0,200,255,0.15)", overflow: "hidden", background: "rgba(7,12,28,0.8)" }}>

          {/* Table header */}
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1.2fr 1fr 1.6fr 1.4fr 0.8fr", gap: 0, padding: "12px 24px", background: "rgba(0,200,255,0.04)", borderBottom: "1px solid rgba(0,200,255,0.1)" }}>
            {["Exhibition", "Location", "Dates", "Budget", "Type & Status", ""].map(h => (
              <span key={h} style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(0,200,255,0.5)", fontWeight: 700 }}>{h}</span>
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ padding: "48px", textAlign: "center", color: "rgba(255,255,255,0.3)", fontSize: 15 }}>
              No exhibitions match the selected filters
            </div>
          )}

          {filtered.map((ex, i) => {
            const isExpanded = expandedId === ex.id
            const sc = STATUS_CONFIG[ex.status]
            return (
              <div key={ex.id} style={{ borderBottom: i < filtered.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                {/* Main row */}
                <div
                  onClick={() => setExpandedId(isExpanded ? null : ex.id)}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "2fr 1.2fr 1fr 1.6fr 1.4fr 0.8fr",
                    gap: 0,
                    padding: "18px 24px",
                    alignItems: "center",
                    cursor: "pointer",
                    background: isExpanded ? "rgba(0,200,255,0.04)" : "transparent",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={e => { if (!isExpanded) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.025)" }}
                  onMouseLeave={e => { if (!isExpanded) (e.currentTarget as HTMLElement).style.background = "transparent" }}
                >
                  {/* Name */}
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 18 }}>{ex.flag}</span>
                      <div>
                        <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#f1f5f9" }}>{ex.nameEn}</p>
                        <p style={{ margin: "2px 0 0", fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{ex.nameHe}</p>
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <p style={{ margin: 0, fontSize: 13, color: "#cbd5e1" }}>{ex.location}</p>
                    <p style={{ margin: "2px 0 0", fontSize: 11, color: "rgba(255,255,255,0.35)" }}>{ex.country}</p>
                  </div>

                  {/* Dates */}
                  <div>
                    <p style={{ margin: 0, fontSize: 12, color: "#94a3b8" }}>{formatDate(ex.startDate)}</p>
                    {ex.endDate !== ex.startDate && (
                      <p style={{ margin: "2px 0 0", fontSize: 12, color: "rgba(255,255,255,0.3)" }}>→ {formatDate(ex.endDate)}</p>
                    )}
                  </div>

                  {/* Budget bar */}
                  <div style={{ paddingRight: 16 }}>
                    <BudgetBar value={ex.estimatedCostUSD} max={maxBudget} />
                  </div>

                  {/* Type + Status */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <StatusChip status={ex.status} />
                    <RequestChip type={ex.requestType} />
                  </div>

                  {/* Expand toggle */}
                  <div style={{ textAlign: "right" }}>
                    <span style={{ fontSize: 18, color: "rgba(0,200,255,0.5)", transition: "transform 0.2s", display: "inline-block", transform: isExpanded ? "rotate(180deg)" : "none" }}>
                      ▾
                    </span>
                  </div>
                </div>

                {/* Expanded detail */}
                {isExpanded && <ExpandedRow ex={ex} />}
              </div>
            )
          })}
        </div>

        {/* ── Footer ── */}
        <div style={{ marginTop: 24, textAlign: "center", fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)" }}>
          Unclassified · IAI Exhibition Platform · {overviewStats.total} Exhibitions · {overviewStats.countries} Countries
        </div>

      </main>
    </div>
  )
}
