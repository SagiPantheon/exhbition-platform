"use client"

import { useState, useMemo } from "react"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"
import { exhibitionsOverview, overviewStats, type ExhibitionRecord, type ExhibitionStatus } from "../../data/exhibitionsOverview"

// ─── Types ────────────────────────────────────────────────────────────────────

const MONTHS = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"]
const MONTHS_HE = ["ינו","פבר","מרץ","אפר","מאי","יונ","יול","אוג","ספט","אוק","נוב","דצמ"]

const STATUS_CFG: Record<ExhibitionStatus, { label: string; he: string; color: string; bg: string }> = {
  active:           { label: "Active",           he: "פעיל",         color: "#34d399", bg: "rgba(52,211,153,0.18)"  },
  planned:          { label: "In Planning",      he: "בתכנון",       color: "#60a5fa", bg: "rgba(96,165,250,0.18)"  },
  completed:        { label: "Approved",         he: "מאושר",        color: "#a78bfa", bg: "rgba(167,139,250,0.18)" },
  "pending-approval":{ label: "Budget Review",  he: "בדיקת תקציב", color: "#fbbf24", bg: "rgba(251,191,36,0.18)"  },
  cancelled:        { label: "Cancelled",        he: "בוטל",         color: "#f87171", bg: "rgba(248,113,113,0.18)" },
}

const GUEST_PROFILE = [
  { name: "Military Delegations", nameHe: "משלחות צבאיות",   value: 35, color: "#3b82f6" },
  { name: "Government Officials", nameHe: "בכירי ממשלה",     value: 20, color: "#22d3ee" },
  { name: "Industry Partners",    nameHe: "שותפי תעשייה",    value: 25, color: "#a78bfa" },
  { name: "Academic Visitors",    nameHe: "אורחים אקדמיים",  value: 10, color: "#34d399" },
  { name: "Other",                nameHe: "אחרים",           value: 10, color: "#64748b" },
]

const ALERTS = [
  { text: "Budget review required for DSEI 2026",    textHe: "נדרשת בדיקת תקציב עבור DSEI 2026",   time: "2h ago",  icon: "⚠" },
  { text: "Supplier proposal pending for IMDEX Asia",textHe: "הצעת ספק ממתינה עבור IMDEX Asia",    time: "5h ago",  icon: "⚠" },
  { text: "Missing exhibit list for AUSA Annual",    textHe: "חסרה רשימת מוצגים עבור AUSA Annual", time: "1d ago",  icon: "⚠" },
]

const NAV_TABS = [
  { icon: "⌂", label: "Home",       labelHe: "בית"      },
  { icon: "⊞", label: "Exhibitions",labelHe: "תערוכות"  },
  { icon: "◈", label: "Exhibits",   labelHe: "מוצגים"   },
  { icon: "⊡", label: "Suppliers",  labelHe: "ספקים"    },
  { icon: "≡", label: "Reports",    labelHe: "דוחות"    },
  { icon: "⚙", label: "Settings",   labelHe: "הגדרות"   },
]

function fmt(n: number) {
  return n >= 1000000 ? `$${(n/1000000).toFixed(1)}M` : `$${Math.round(n/1000)}K`
}
function monthOf(d: string) { return new Date(d).getMonth() }

// ─── Small Components ─────────────────────────────────────────────────────────

function StatusBadge({ status, lang="en" }: { status: ExhibitionStatus; lang?: "en"|"he" }) {
  const c = STATUS_CFG[status]
  return (
    <span style={{ padding:"4px 10px", borderRadius:999, fontSize:11, fontWeight:700,
      color:c.color, background:c.bg, border:`1px solid ${c.color}40`, whiteSpace:"nowrap" }}>
      {lang==="he" ? c.he : c.label}
    </span>
  )
}

function StatCard({ value, label, labelHe, color }: { value:string|number; label:string; labelHe:string; color:string }) {
  return (
    <div style={{ flex:1, minWidth:130, padding:"18px 20px", borderRadius:16,
      border:`1px solid ${color}30`, background:`radial-gradient(ellipse at top,${color}18,transparent 70%), rgba(8,16,36,0.9)` }}>
      <p style={{ margin:0, fontSize:28, fontWeight:900, color, lineHeight:1 }}>{value}</p>
      <p style={{ margin:"6px 0 2px", fontSize:12, color:"rgba(255,255,255,0.7)" }}>{label}</p>
      <p style={{ margin:0, fontSize:11, color:"rgba(255,255,255,0.35)", direction:"rtl" }}>{labelHe}</p>
    </div>
  )
}

function TimelineDot({ ex, onClick, selected }: { ex:ExhibitionRecord; onClick:()=>void; selected:boolean }) {
  const month = monthOf(ex.startDate)
  const pct = ((month + 0.5) / 12) * 100
  return (
    <div onClick={onClick} style={{ position:"absolute", left:`${pct}%`, transform:"translateX(-50%)",
      cursor:"pointer", zIndex:selected?10:5 }}>
      <div style={{ width:12, height:12, borderRadius:"50%",
        background: selected ? "#22d3ee" : STATUS_CFG[ex.status].color,
        border: selected ? "2px solid white" : "2px solid rgba(0,0,0,0.4)",
        boxShadow: selected ? "0 0 12px #22d3ee" : "none",
        transition:"all 0.2s" }} />
      <div style={{ position:"absolute", top:18, left:"50%", transform:"translateX(-50%)",
        whiteSpace:"nowrap", fontSize:10, fontWeight:700,
        color: selected ? "#22d3ee" : "rgba(255,255,255,0.7)",
        textAlign:"center", lineHeight:1.4 }}>
        <div>{ex.nameEn.split(" ").slice(0,2).join(" ")}</div>
        <div style={{ fontSize:9, color:"rgba(255,255,255,0.4)" }}>{ex.location.split(",")[0]}</div>
      </div>
    </div>
  )
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────

export default function DiagnosticsPage() {
  const [activeTab, setActiveTab] = useState(0)
  const [selected, setSelected] = useState<ExhibitionRecord>(exhibitionsOverview[0])
  const [regionFilter, setRegionFilter] = useState<"all"|"israel"|"abroad">("all")

  const displayed = useMemo(() =>
    regionFilter === "all" ? exhibitionsOverview
    : exhibitionsOverview.filter(e => e.region === regionFilter),
    [regionFilter]
  )

  const totalBudget = overviewStats.totalBudgetUSD
  const activeSuppliers = [...new Set(exhibitionsOverview.flatMap(e => e.suppliers))].length
  const pendingApprovals = exhibitionsOverview.filter(e => e.status === "pending-approval").length

  // Fake assigned exhibits for selected exhibition
  const ASSIGNED: Record<string, {name:string; nameHe:string; div:string; img:string; status:"Ready"|"Approval"|"Pending"}[]> = {
    default: [
      { name:"Heron MK II",   nameHe:"הרון MK II",  div:"Air Systems",      img:"/images/air/heron-showcase.png",        status:"Ready"    },
      { name:"Othello",       nameHe:"אותלו",        div:"ELTA Systems",     img:"/images/air/othello-showcase.png",      status:"Ready"    },
      { name:"MRSAM",         nameHe:"MRSAM",        div:"Air Defense",      img:"/images/air/mrsam-showcase.png",        status:"Approval" },
      { name:"MCS",           nameHe:"מערכת שליטה",  div:"Satellite Comms",  img:"/images/space/mcs-showcase.png",        status:"Ready"    },
    ]
  }
  const exhibits = ASSIGNED[selected.id] ?? ASSIGNED.default

  const exhibitStatusColor = { Ready:"#34d399", Approval:"#fbbf24", Pending:"#94a3b8" }

  return (
    <div style={{ minHeight:"100vh", background:"#020818", color:"#fff",
      fontFamily:"Heebo, Assistant, sans-serif", display:"flex", flexDirection:"column" }}>

      {/* ══════════════════════ TOP NAV ══════════════════════ */}
      <header style={{ background:"rgba(4,12,30,0.97)", borderBottom:"1px solid rgba(0,200,255,0.15)",
        padding:"0 24px", display:"flex", alignItems:"center", gap:16, height:64, flexShrink:0,
        boxShadow:"0 2px 24px rgba(0,0,0,0.4)" }}>

        {/* Brand left */}
        <div style={{ display:"flex", alignItems:"center", gap:12, minWidth:220 }}>
          <div style={{ width:34, height:34, borderRadius:10, border:"1.5px solid rgba(0,200,255,0.5)",
            background:"rgba(0,200,255,0.1)", display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:16 }}>⊞</div>
          <div>
            <p style={{ margin:0, fontSize:13, fontWeight:800, color:"#f1f5f9", letterSpacing:"0.02em" }}>Exhibition Command Center</p>
            <p style={{ margin:0, fontSize:10, color:"rgba(0,200,255,0.6)", letterSpacing:"0.08em" }}>Annual Overview & Management Dashboard</p>
          </div>
        </div>

        {/* Nav tabs center */}
        <nav style={{ flex:1, display:"flex", justifyContent:"center", gap:4 }}>
          {NAV_TABS.map((t, i) => (
            <button key={i} onClick={() => setActiveTab(i)} style={{
              display:"flex", alignItems:"center", gap:6, padding:"8px 18px", borderRadius:10,
              border: activeTab===i ? "1px solid rgba(0,200,255,0.45)" : "1px solid transparent",
              background: activeTab===i ? "rgba(0,200,255,0.12)" : "transparent",
              color: activeTab===i ? "#22d3ee" : "rgba(255,255,255,0.45)",
              fontSize:13, fontWeight:600, cursor:"pointer", transition:"all 0.15s",
            }}>
              <span style={{ fontSize:15 }}>{t.icon}</span>
              <span>{t.label}</span>
            </button>
          ))}
        </nav>

        {/* Brand right (Hebrew) */}
        <div style={{ textAlign:"right", minWidth:220, direction:"rtl" }}>
          <p style={{ margin:0, fontSize:13, fontWeight:800, color:"#f1f5f9" }}>מרכז ניהול תערוכות</p>
          <p style={{ margin:0, fontSize:10, color:"rgba(0,200,255,0.6)", letterSpacing:"0.04em" }}>תמונת מצב שנתית וניהול תערוכות</p>
        </div>
        <div style={{ width:34, height:34, borderRadius:10, border:"1.5px solid rgba(0,200,255,0.5)",
          background:"rgba(0,200,255,0.1)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>⊞</div>
      </header>

      <div style={{ flex:1, padding:"20px 24px", display:"flex", flexDirection:"column", gap:16, overflow:"auto" }}>

        {/* ══════════════════════ STATS ROW ══════════════════════ */}
        <div style={{ display:"flex", gap:12, alignItems:"stretch" }}>
          {/* EN stats */}
          <div style={{ display:"flex", gap:10, flex:1 }}>
            <StatCard value={overviewStats.total} label="Exhibitions This Year" labelHe="תערוכות בשנה זו" color="#22d3ee" />
            <StatCard value={fmt(totalBudget)} label="Total Budget (USD)" labelHe="תקציב כולל (דולר)" color="#60a5fa" />
            <StatCard value={activeSuppliers} label="Suppliers Active" labelHe="ספקים פעילים" color="#a78bfa" />
            <StatCard value={pendingApprovals} label="Pending Approvals" labelHe="אישורים ממתינים" color="#fbbf24" />
          </div>

          {/* Globe center */}
          <div style={{ width:180, flexShrink:0, borderRadius:16, border:"1px solid rgba(0,200,255,0.2)",
            background:"radial-gradient(circle at 50% 40%, rgba(0,100,200,0.35), rgba(0,10,40,0.9))",
            display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"12px 8px" }}>
            <div style={{ fontSize:56, lineHeight:1, filter:"drop-shadow(0 0 16px rgba(0,200,255,0.5))" }}>🌍</div>
            <p style={{ margin:"8px 0 4px", fontSize:11, fontWeight:700, color:"#22d3ee", letterSpacing:"0.1em", textTransform:"uppercase" }}>Global Presence</p>
            <p style={{ margin:0, fontSize:9, color:"rgba(255,255,255,0.45)", textAlign:"center", lineHeight:1.6 }}>Israel • Europe<br/>Asia • North America</p>
          </div>

          {/* HE stats */}
          <div style={{ display:"flex", gap:10, flex:1, direction:"rtl" }}>
            <StatCard value={overviewStats.total} label="Exhibitions This Year" labelHe="תערוכות בשנה זו" color="#22d3ee" />
            <StatCard value={fmt(totalBudget)} label="Total Budget (USD)" labelHe="תקציב כולל (דולר)" color="#60a5fa" />
            <StatCard value={activeSuppliers} label="Suppliers Active" labelHe="ספקים פעילים" color="#a78bfa" />
            <StatCard value={pendingApprovals} label="Pending Approvals" labelHe="אישורים ממתינים" color="#fbbf24" />
          </div>
        </div>

        {/* ══════════════════════ TIMELINE ══════════════════════ */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
          {[{months:MONTHS, title:"EXHIBITIONS TIMELINE 2026", dir:"ltr"}, {months:MONTHS_HE, title:"ציר זמן תערוכות 2026", dir:"rtl"}].map(({months,title,dir}) => (
            <div key={dir} style={{ borderRadius:16, border:"1px solid rgba(0,200,255,0.12)",
              background:"rgba(6,12,28,0.8)", padding:"16px 20px" }} dir={dir as any}>
              <p style={{ margin:"0 0 14px", fontSize:11, fontWeight:700, color:"rgba(0,200,255,0.7)",
                letterSpacing:"0.18em", textTransform:"uppercase" }}>{title}</p>
              {/* Month labels */}
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
                {months.map(m => <span key={m} style={{ fontSize:9, color:"rgba(255,255,255,0.3)", fontWeight:600, letterSpacing:"0.05em" }}>{m}</span>)}
              </div>
              {/* Line + dots */}
              <div style={{ position:"relative", height:56 }}>
                <div style={{ position:"absolute", top:6, left:0, right:0, height:2,
                  background:"linear-gradient(90deg, transparent, rgba(0,200,255,0.3) 10%, rgba(0,200,255,0.3) 90%, transparent)" }} />
                {exhibitionsOverview.filter(e=>e.startDate).map(ex => (
                  <TimelineDot key={ex.id} ex={ex} selected={selected.id===ex.id} onClick={()=>setSelected(ex)} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ══════════════════════ TABLE ══════════════════════ */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
          {/* EN Table */}
          {[{lang:"en" as const, title:"EXHIBITIONS OVERVIEW", dir:"ltr"}, {lang:"he" as const, title:"סקירת תערוכות", dir:"rtl"}].map(({lang,title,dir})=>(
            <div key={lang} style={{ borderRadius:16, border:"1px solid rgba(0,200,255,0.12)",
              background:"rgba(6,12,28,0.8)", overflow:"hidden" }} dir={dir as any}>
              <div style={{ padding:"12px 16px", borderBottom:"1px solid rgba(0,200,255,0.1)",
                display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <p style={{ margin:0, fontSize:11, fontWeight:700, color:"rgba(0,200,255,0.7)", letterSpacing:"0.18em", textTransform:"uppercase" }}>{title}</p>
                <div style={{ display:"flex", gap:6 }}>
                  {(["all","israel","abroad"] as const).map(r=>(
                    <button key={r} onClick={()=>setRegionFilter(r)} style={{
                      padding:"3px 10px", borderRadius:999, fontSize:10, fontWeight:700, cursor:"pointer",
                      border: regionFilter===r ? "1px solid rgba(0,200,255,0.5)" : "1px solid rgba(255,255,255,0.1)",
                      background: regionFilter===r ? "rgba(0,200,255,0.15)" : "transparent",
                      color: regionFilter===r ? "#22d3ee" : "rgba(255,255,255,0.35)",
                    }}>
                      {r==="all"?"All":r==="israel"?"🇮🇱 IL":"✈️ Int'l"}
                    </button>
                  ))}
                </div>
              </div>
              {/* Header row */}
              <div style={{ display:"grid", gridTemplateColumns:"1.6fr 1fr 0.9fr 0.7fr 0.8fr 0.8fr 1fr 1fr",
                padding:"8px 16px", gap:6, borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
                {(lang==="en"
                  ? ["Exhibition","Location","Dates","Theme","Type","Budget","Guests","Status"]
                  : ["תערוכה","מיקום","תאריכים","נושא","סוג","תקציב","אורחים","סטטוס"]
                ).map(h=>(
                  <span key={h} style={{ fontSize:9, letterSpacing:"0.12em", textTransform:"uppercase",
                    color:"rgba(0,200,255,0.45)", fontWeight:700 }}>{h}</span>
                ))}
              </div>
              {/* Data rows */}
              {displayed.map(ex=>(
                <div key={ex.id} onClick={()=>setSelected(ex)}
                  style={{ display:"grid", gridTemplateColumns:"1.6fr 1fr 0.9fr 0.7fr 0.8fr 0.8fr 1fr 1fr",
                    padding:"10px 16px", gap:6, alignItems:"center", cursor:"pointer",
                    background: selected.id===ex.id ? "rgba(0,200,255,0.07)" : "transparent",
                    borderBottom:"1px solid rgba(255,255,255,0.04)",
                    transition:"background 0.15s" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                    <span style={{ fontSize:14 }}>{ex.flag}</span>
                    <span style={{ fontSize:12, fontWeight:600, color: selected.id===ex.id ? "#22d3ee":"#e2e8f0",
                      whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
                      {lang==="he" ? ex.nameHe : ex.nameEn}
                    </span>
                  </div>
                  <span style={{ fontSize:11, color:"#94a3b8", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                    {ex.location.split(",")[0]}
                  </span>
                  <span style={{ fontSize:10, color:"rgba(255,255,255,0.45)" }}>
                    {new Date(ex.startDate).toLocaleDateString("en-GB",{day:"2-digit",month:"short"})}
                  </span>
                  <span style={{ fontSize:10, color:"rgba(255,255,255,0.4)", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                    {ex.theme.split(" ").slice(0,2).join(" ")}
                  </span>
                  <span style={{ fontSize:10, color:"#a78bfa" }}>{ex.requestType.charAt(0).toUpperCase()+ex.requestType.slice(1)}</span>
                  <span style={{ fontSize:11, fontWeight:700, color:"#22d3ee" }}>{fmt(ex.estimatedCostUSD)}</span>
                  <div style={{ display:"flex", gap:2 }}>
                    {ex.guestOrigins.slice(0,3).map((g,i)=>(
                      <span key={i} style={{ fontSize:13 }}>{g.flag}</span>
                    ))}
                    {ex.guestOrigins.length>3 && <span style={{ fontSize:9, color:"rgba(255,255,255,0.35)", alignSelf:"center" }}>+{ex.guestOrigins.length-3}</span>}
                  </div>
                  <StatusBadge status={ex.status} lang={lang} />
                </div>
              ))}
              <div style={{ padding:"8px 16px", borderTop:"1px solid rgba(0,200,255,0.08)" }}>
                <span style={{ fontSize:10, color:"rgba(0,200,255,0.5)", cursor:"pointer", letterSpacing:"0.1em" }}>
                  {lang==="he" ? "צפה בכל התערוכות ↙" : "View All Exhibitions →"}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ══════════════════════ DETAIL + CHART + QUICK ACTIONS ══════════════════════ */}
        <div style={{ display:"grid", gridTemplateColumns:"1.2fr 1.6fr 1fr 0.9fr", gap:12 }}>

          {/* Selected Exhibition Details */}
          <div style={{ borderRadius:16, border:`1px solid ${STATUS_CFG[selected.status].color}35`,
            background:"rgba(6,12,28,0.9)", overflow:"hidden" }}>
            <div style={{ position:"relative", height:110, overflow:"hidden" }}>
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg,rgba(0,60,120,0.8),rgba(0,20,60,0.9))",
                display:"flex", alignItems:"center", justifyContent:"center" }}>
                <span style={{ fontSize:48 }}>{selected.flag}</span>
              </div>
              <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"8px 14px",
                background:"linear-gradient(to top, rgba(6,12,28,1), transparent)" }}>
                <p style={{ margin:0, fontSize:14, fontWeight:800, color:"#fff" }}>{selected.nameEn}</p>
                <p style={{ margin:0, fontSize:11, color:"rgba(255,255,255,0.55)" }}>{selected.location}</p>
              </div>
            </div>
            <div style={{ padding:"14px" }}>
              <p style={{ margin:"0 0 10px", fontSize:10, letterSpacing:"0.2em", textTransform:"uppercase",
                color:"rgba(0,200,255,0.55)", fontWeight:700 }}>SELECTED EXHIBITION DETAILS</p>
              {[
                ["📅","Dates", `${new Date(selected.startDate).toLocaleDateString("en-GB",{day:"2-digit",month:"short"})} – ${new Date(selected.endDate).toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"})}`],
                ["◈","Theme", selected.theme],
                ["⊛","Type", selected.requestType.charAt(0).toUpperCase()+selected.requestType.slice(1)],
                ["👤","Responsible", selected.responsible],
                ["🏢","Contractor", selected.contractor],
                ["👥","Est. Guests", selected.guestOrigins.reduce((s,g)=>s+g.estimatedCount,0).toLocaleString()],
                ["💰","Est. Budget", fmt(selected.estimatedCostUSD)],
              ].map(([icon,label,val])=>(
                <div key={label as string} style={{ display:"flex", gap:8, alignItems:"flex-start", marginBottom:7 }}>
                  <span style={{ fontSize:12, width:16, flexShrink:0 }}>{icon}</span>
                  <span style={{ fontSize:10, color:"rgba(0,200,255,0.6)", minWidth:70, letterSpacing:"0.05em" }}>{label as string}</span>
                  <span style={{ fontSize:11, color:"#e2e8f0", lineHeight:1.4, flex:1 }}>{val as string}</span>
                </div>
              ))}
              <div style={{ marginTop:10, display:"flex", gap:6 }}>
                <StatusBadge status={selected.status} />
              </div>
            </div>
          </div>

          {/* Assigned Exhibits */}
          <div style={{ borderRadius:16, border:"1px solid rgba(0,200,255,0.12)",
            background:"rgba(6,12,28,0.8)", padding:"16px" }}>
            <p style={{ margin:"0 0 12px", fontSize:11, fontWeight:700, color:"rgba(0,200,255,0.7)",
              letterSpacing:"0.18em", textTransform:"uppercase" }}>ASSIGNED EXHIBITS</p>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
              {exhibits.map((ex,i)=>{
                const sc = exhibitStatusColor[ex.status]
                return (
                  <div key={i} style={{ borderRadius:14, border:`1px solid rgba(255,255,255,0.08)`,
                    background:"rgba(255,255,255,0.03)", padding:"12px", display:"flex", flexDirection:"column", gap:8 }}>
                    <div style={{ borderRadius:10, background:"rgba(0,20,50,0.6)", height:70,
                      display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden" }}>
                      <img src={ex.img} alt={ex.name} style={{ maxHeight:"100%", maxWidth:"100%", objectFit:"contain", padding:4 }}
                        onError={e=>{(e.target as HTMLImageElement).style.display="none"}} />
                    </div>
                    <div>
                      <p style={{ margin:0, fontSize:12, fontWeight:700, color:"#f1f5f9" }}>{ex.name}</p>
                      <p style={{ margin:"2px 0 0", fontSize:10, color:"rgba(255,255,255,0.4)" }}>{ex.div}</p>
                    </div>
                    <span style={{ alignSelf:"flex-start", padding:"3px 10px", borderRadius:999,
                      fontSize:10, fontWeight:700, color:sc, background:`${sc}18`, border:`1px solid ${sc}40` }}>
                      ● {ex.status}
                    </span>
                  </div>
                )
              })}
            </div>
            <button style={{ marginTop:12, width:"100%", padding:"9px", borderRadius:12,
              border:"1px solid rgba(0,200,255,0.3)", background:"rgba(0,200,255,0.08)",
              color:"#22d3ee", fontSize:12, fontWeight:700, cursor:"pointer", letterSpacing:"0.08em" }}>
              Manage Exhibits →
            </button>
          </div>

          {/* Guest Profile Donut */}
          <div style={{ borderRadius:16, border:"1px solid rgba(0,200,255,0.12)",
            background:"rgba(6,12,28,0.8)", padding:"16px" }}>
            <p style={{ margin:"0 0 10px", fontSize:11, fontWeight:700, color:"rgba(0,200,255,0.7)",
              letterSpacing:"0.18em", textTransform:"uppercase" }}>GUEST PROFILE</p>
            <div style={{ height:140 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={GUEST_PROFILE} cx="50%" cy="50%" innerRadius={40} outerRadius={65}
                    dataKey="value" paddingAngle={2} strokeWidth={0}>
                    {GUEST_PROFILE.map((g,i)=><Cell key={i} fill={g.color} />)}
                  </Pie>
                  <Tooltip formatter={(v:any,n:any,p:any)=>[`${v}%`, p.payload.name]} contentStyle={{
                    background:"#0a1628", border:"1px solid rgba(0,200,255,0.3)",
                    borderRadius:10, fontSize:11, color:"#e2e8f0" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
              {GUEST_PROFILE.map(g=>(
                <div key={g.name} style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <div style={{ width:8, height:8, borderRadius:"50%", background:g.color, flexShrink:0 }} />
                  <span style={{ fontSize:10, color:"rgba(255,255,255,0.6)", flex:1 }}>{g.name}</span>
                  <span style={{ fontSize:11, fontWeight:700, color:g.color }}>{g.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Request Type */}
          <div style={{ borderRadius:16, border:"1px solid rgba(0,200,255,0.12)",
            background:"rgba(6,12,28,0.8)", padding:"16px", display:"flex", flexDirection:"column", gap:8 }}>
            <p style={{ margin:"0 0 6px", fontSize:11, fontWeight:700, color:"rgba(0,200,255,0.7)",
              letterSpacing:"0.18em", textTransform:"uppercase" }}>REQUEST TYPE</p>
            {[
              { type:"Professional", icon:"🏛", active:selected.requestType==="professional" },
              { type:"Academic",     icon:"🎓", active:selected.requestType==="academic"     },
              { type:"Internal",     icon:"🏢", active:selected.requestType==="internal"     },
              { type:"Government",   icon:"⚖️", active:false                                 },
              { type:"Mixed",        icon:"⊛",  active:selected.requestType==="mixed"        },
            ].map(r=>(
              <div key={r.type} style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 12px",
                borderRadius:10, background: r.active ? "rgba(0,200,255,0.1)" : "rgba(255,255,255,0.03)",
                border: r.active ? "1px solid rgba(0,200,255,0.3)" : "1px solid rgba(255,255,255,0.06)" }}>
                <span style={{ fontSize:15 }}>{r.icon}</span>
                <span style={{ fontSize:12, color: r.active ? "#22d3ee" : "rgba(255,255,255,0.5)", fontWeight: r.active ? 700 : 400 }}>
                  {r.type}
                </span>
                {r.active && <span style={{ marginLeft:"auto", color:"#22d3ee", fontSize:14 }}>✓</span>}
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════════════ BOTTOM ROW ══════════════════════ */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1.2fr 1fr 1.2fr", gap:12 }}>

          {/* Quick Actions EN */}
          <div style={{ borderRadius:16, border:"1px solid rgba(0,200,255,0.12)",
            background:"rgba(6,12,28,0.8)", padding:"16px" }}>
            <p style={{ margin:"0 0 12px", fontSize:11, fontWeight:700, color:"rgba(0,200,255,0.7)",
              letterSpacing:"0.18em", textTransform:"uppercase" }}>QUICK ACTIONS</p>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8 }}>
              {[
                {icon:"⊞",label:"Add Exhibition"},{icon:"◈",label:"Add Exhibit"},
                {icon:"⊡",label:"Add Supplier"},{icon:"≡",label:"Generate Report"},
                {icon:"↓",label:"Export Dashboard"},
              ].map(a=>(
                <button key={a.label} style={{ padding:"12px 6px", borderRadius:12, display:"flex",
                  flexDirection:"column", alignItems:"center", gap:6,
                  border:"1px solid rgba(255,255,255,0.1)", background:"rgba(255,255,255,0.03)",
                  color:"rgba(255,255,255,0.6)", fontSize:10, cursor:"pointer", transition:"all 0.15s" }}>
                  <span style={{ fontSize:20, color:"rgba(0,200,255,0.7)" }}>{a.icon}</span>
                  {a.label}
                </button>
              ))}
            </div>
          </div>

          {/* Alerts EN */}
          <div style={{ borderRadius:16, border:"1px solid rgba(251,191,36,0.2)",
            background:"rgba(6,12,28,0.8)", padding:"16px" }}>
            <p style={{ margin:"0 0 12px", fontSize:11, fontWeight:700, color:"rgba(251,191,36,0.7)",
              letterSpacing:"0.18em", textTransform:"uppercase" }}>ALERTS & NOTIFICATIONS</p>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {ALERTS.map((a,i)=>(
                <div key={i} style={{ display:"flex", gap:10, alignItems:"flex-start", padding:"10px 12px",
                  borderRadius:10, background:"rgba(251,191,36,0.06)", border:"1px solid rgba(251,191,36,0.15)" }}>
                  <span style={{ color:"#fbbf24", fontSize:14, flexShrink:0 }}>{a.icon}</span>
                  <div style={{ flex:1 }}>
                    <p style={{ margin:0, fontSize:12, color:"#e2e8f0", lineHeight:1.4 }}>{a.text}</p>
                  </div>
                  <span style={{ fontSize:10, color:"rgba(255,255,255,0.3)", whiteSpace:"nowrap" }}>{a.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions HE */}
          <div style={{ borderRadius:16, border:"1px solid rgba(0,200,255,0.12)",
            background:"rgba(6,12,28,0.8)", padding:"16px", direction:"rtl" }}>
            <p style={{ margin:"0 0 12px", fontSize:11, fontWeight:700, color:"rgba(0,200,255,0.7)",
              letterSpacing:"0.18em", textTransform:"uppercase" }}>פעולות מהירות</p>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8 }}>
              {[
                {icon:"⊞",label:"הוסף תערוכה"},{icon:"◈",label:"הוסף מוצג"},
                {icon:"⊡",label:"הוסף ספק"},{icon:"≡",label:"הפק דוח"},
                {icon:"↓",label:"יצא דשבורד"},
              ].map(a=>(
                <button key={a.label} style={{ padding:"12px 6px", borderRadius:12, display:"flex",
                  flexDirection:"column", alignItems:"center", gap:6,
                  border:"1px solid rgba(255,255,255,0.1)", background:"rgba(255,255,255,0.03)",
                  color:"rgba(255,255,255,0.6)", fontSize:10, cursor:"pointer" }}>
                  <span style={{ fontSize:20, color:"rgba(0,200,255,0.7)" }}>{a.icon}</span>
                  {a.label}
                </button>
              ))}
            </div>
          </div>

          {/* Alerts HE */}
          <div style={{ borderRadius:16, border:"1px solid rgba(251,191,36,0.2)",
            background:"rgba(6,12,28,0.8)", padding:"16px", direction:"rtl" }}>
            <p style={{ margin:"0 0 12px", fontSize:11, fontWeight:700, color:"rgba(251,191,36,0.7)",
              letterSpacing:"0.18em", textTransform:"uppercase" }}>התראות</p>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {ALERTS.map((a,i)=>(
                <div key={i} style={{ display:"flex", gap:10, alignItems:"flex-start", padding:"10px 12px",
                  borderRadius:10, background:"rgba(251,191,36,0.06)", border:"1px solid rgba(251,191,36,0.15)" }}>
                  <span style={{ color:"#fbbf24", fontSize:14, flexShrink:0 }}>{a.icon}</span>
                  <div style={{ flex:1 }}>
                    <p style={{ margin:0, fontSize:12, color:"#e2e8f0", lineHeight:1.4 }}>{a.textHe}</p>
                  </div>
                  <span style={{ fontSize:10, color:"rgba(255,255,255,0.3)", whiteSpace:"nowrap" }}>{a.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign:"center", fontSize:10, letterSpacing:"0.25em", textTransform:"uppercase",
          color:"rgba(255,255,255,0.18)", paddingBottom:8 }}>
          Unclassified · IAI Exhibition Command Center · {overviewStats.total} Exhibitions · {overviewStats.countries} Countries
        </div>
      </div>
    </div>
  )
}
