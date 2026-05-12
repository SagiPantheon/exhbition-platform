"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const divisions = [
  { id: "missiles-space-defense", nameHe: 'חטיבת מט"ח', subHe: "מלמ · טילים · חלל · הגנה", exhibits: 24, subDivisions: 4, readiness: 82, cover: "/images/divisions/matach-cover.png" },
  { id: "elta", nameHe: "חטיבת אלתא", subHe: 'רובוטיקה · תקשורת · מכ"מים', exhibits: 27, subDivisions: 3, readiness: 88, cover: "/images/divisions/elta-cover.png" },
  { id: "aviation", nameHe: "חטיבת תעופה", subHe: "בדק · MRO", exhibits: 18, subDivisions: 2, readiness: 79, cover: "/images/divisions/taufa-cover.png" },
  { id: "uav", nameHe: 'חטיבת כט"צ', subHe: "מלט", exhibits: 12, subDivisions: 1, readiness: 84, cover: "/images/divisions/uav-cover.png" },
];

const exhibits = [
  { name: "Arrow 3 Launcher", code: "AIR-001", img: "/images/air/arrow-3-launcher-showcase.png" },
  { name: "Heron UAV", code: "AIR-002", img: "/images/air/heron-showcase.png" },
  { name: "ZMAG", code: "LAND-001", img: "/images/land/zmag-showcase.png" },
  { name: "3DCapture", code: "LAND-002", img: "/images/land/3dcapture-showcase.png" },
  { name: "Panda", code: "LAND-003", img: "/images/land/panda-showcase.png" },
  { name: "OPTSAT 500", code: "SPACE-001", img: "/images/space/optsat-500-showcase.png" },
  { name: "OPTSAR 550", code: "SPACE-002", img: "/images/space/optsar-550-showcase.png" },
  { name: "Katana", code: "NAVAL-001", img: "/images/naval/katana.png" },
  { name: "MCS", code: "SPACE-003", img: "/images/space/mcs-showcase.png" },
];

type Line = { x1: number; y1: number; x2: number; y2: number };

export default function HomePage() {
  const [lines, setLines] = useState<Line[]>([]);
  const gridRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const cardRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  useEffect(() => {
    const measure = () => {
      const grid = gridRef.current;
      const core = coreRef.current;
      if (!grid || !core) return;
      const gb = grid.getBoundingClientRect();
      const cb = core.getBoundingClientRect();
      const newLines: Line[] = [];
      cardRefs.forEach((ref, i) => {
        const card = ref.current;
        if (!card) return;
        const kb = card.getBoundingClientRect();
        const cardX = i < 2 ? kb.right - gb.left : kb.left - gb.left;
        const cardY = kb.top + kb.height / 2 - gb.top;
        const coreX = i < 2 ? cb.left - gb.left : cb.right - gb.left;
        const coreY = i === 0 || i === 2
          ? cb.top + cb.height * 0.3 - gb.top
          : cb.top + cb.height * 0.7 - gb.top;
        newLines.push({ x1: cardX, y1: cardY, x2: coreX, y2: coreY });
      });
      setLines(newLines);
    };
    const t = setTimeout(measure, 300);
    window.addEventListener("resize", measure);
    return () => { clearTimeout(t); window.removeEventListener("resize", measure); };
  }, []);

  return (
    <main style={{ minHeight: "100vh", background: "#01020e", color: "#fff", fontFamily: "Heebo, Assistant, sans-serif" }}>

      {/* HERO */}
      <div style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }}>
        <img src="/images/home/iai-hero.png" alt="IAI" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.0) 50%, rgba(1,2,14,0.35) 80%, rgba(1,2,14,0.75) 100%)" }} />
        <div style={{ position: "absolute", bottom: 64, right: 64, textAlign: "right" }}>
          <p style={{ color: "rgba(0,200,255,0.7)", fontSize: 11, letterSpacing: "0.5em", textTransform: "uppercase", marginBottom: 12 }}>Israel Aerospace Industries</p>
          <h1 style={{ fontSize: 48, fontWeight: 700, marginBottom: 12, lineHeight: 1.2, textShadow: "0 0 40px rgba(0,100,255,0.5)" }}>תעשייה האווירית<br/>לישראל</h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 16, marginBottom: 32 }}>מערכת ניהול תערוכות · תכנון חכם · ביצוע מושלם</p>
          <a href="#main" style={{ display: "inline-flex", alignItems: "center", gap: 12, padding: "14px 32px", background: "rgba(0,200,255,0.15)", border: "1px solid rgba(0,200,255,0.5)", borderRadius: 999, color: "rgba(0,220,255,0.9)", fontSize: 13, letterSpacing: "0.2em", textDecoration: "none" }}>כניסה למערכת ↓</a>
        </div>
      </div>

      <div id="main">

        {/* HEADER */}
        <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 32px", borderBottom: "1px solid rgba(0,200,255,0.1)", background: "rgba(1,2,14,0.95)", position: "sticky", top: 0, zIndex: 50 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <img src="/covers/iai-white.png" alt="IAI" style={{ height: 40, filter: "drop-shadow(0 0 14px rgba(0,180,255,0.9))" }} />
            <div>
              <p style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em" }}>GLOBAL EXHIBIT BANK</p>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>Unified access point to all divisions, sub-divisions, and exhibit systems</p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 16px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12 }}>
              <span style={{ color: "rgba(255,255,255,0.3)" }}>🔍</span>
              <input placeholder="Search exhibits, divisions, systems..." style={{ background: "transparent", border: "none", outline: "none", color: "rgba(255,255,255,0.6)", fontSize: 12, width: 240 }} />
            </div>
            <button style={{ padding: 10, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, color: "rgba(255,255,255,0.5)", cursor: "pointer" }}>⚙</button>
          </div>
        </header>

        <div style={{ display: "flex" }}>

          {/* SIDEBAR */}
          <aside style={{ width: 140, flexShrink: 0, borderRight: "1px solid rgba(0,200,255,0.08)", background: "#010812", display: "flex", flexDirection: "column", padding: "16px 0" }}>
            {[
              { label: "Hub", icon: "⊙", href: "/", active: false },
              { label: "Global Exhibit Bank", icon: "◈", href: "#main", active: true },
              { label: "Divisions", icon: "⬡", href: "/global-exhibit-bank", active: false },
              { label: "Systems", icon: "≡", href: "/global-exhibit-bank", active: false },
              { label: "Layouts", icon: "⊞", href: "/tents-layout", active: false },
              { label: "Reports", icon: "▤", href: "#", active: false },
            ].map((item) => (
              <a key={item.label} href={item.href} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "14px 12px", margin: "2px 8px", borderRadius: 12, textDecoration: "none", background: item.active ? "rgba(0,200,255,0.15)" : "transparent", border: item.active ? "1px solid rgba(0,200,255,0.3)" : "1px solid transparent", color: item.active ? "rgba(0,220,255,0.9)" : "rgba(255,255,255,0.3)", transition: "all 0.3s" }}>
                <span style={{ fontSize: 18 }}>{item.icon}</span>
                <span style={{ fontSize: 9, letterSpacing: "0.05em", textAlign: "center", lineHeight: 1.3 }}>{item.label}</span>
              </a>
            ))}
            <div style={{ marginTop: "auto", padding: "16px 12px", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <img src="/covers/iai-white.png" alt="IAI" style={{ height: 24, opacity: 0.3 }} />
              <p style={{ fontSize: 8, color: "rgba(255,255,255,0.2)" }}>GEB COMMAND v2.5.0</p>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", animation: "pulse 2s infinite" }} />
                <span style={{ fontSize: 8, color: "#4ade80" }}>ONLINE</span>
              </div>
            </div>
          </aside>

          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>

            {/* STATS BAR */}
            <div style={{ display: "flex", gap: 12, padding: "16px 24px", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
              {[
                { icon: "⬡", label: "Total Exhibits", value: "81", color: "#5eead4" },
                { icon: "◈", label: "Divisions", value: "4", color: "#5eead4" },
                { icon: "⊞", label: "Sub-Divisions", value: "10", color: "#5eead4" },
                { icon: "✓", label: "Ready", value: "83%", color: "#4ade80" },
                { icon: "⚠", label: "Missing Data", value: "14", color: "#facc15" },
                { icon: "★", label: "New", value: "7", color: "#5eead4" },
              ].map((s) => (
                <div key={s.label} style={{ flex: 1, display: "flex", alignItems: "center", gap: 12, background: "#06111f", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "12px 16px" }}>
                  <span style={{ fontSize: 18, color: s.color }}>{s.icon}</span>
                  <div>
                    <p style={{ fontSize: 22, fontWeight: 300, color: s.color, lineHeight: 1 }}>{s.value}</p>
                    <p style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 2 }}>{s.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* MAIN GRID */}
            <div style={{ flex: 1, padding: 24 }}>
              <div ref={gridRef} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gridTemplateRows: "1fr 1fr", gap: 16, height: "calc(100vh - 260px)", position: "relative" }}>

                {/* NEON LINES SVG */}
                {lines.length === 4 && (
                  <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 20, overflow: "visible" }}>
                    <defs>
                      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="8" result="blur" />
                        <feMerge><feMergeNode in="blur" /><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                      </filter>
                    </defs>
                    {lines.map((l, i) => (
                      <g key={i}>
                        <line x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="rgba(0,200,255,0.5)" strokeWidth="14" strokeLinecap="round" />
                        <line x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#00c8ff" strokeWidth="3" strokeLinecap="round" filter="url(#glow)" strokeDasharray="16 8">
                          <animate attributeName="stroke-dashoffset" from="0" to="-48" dur={`${2.2 + i * 0.3}s`} repeatCount="indefinite" />
                        </line>
                        <circle cx={l.x2} cy={l.y2} r="8" fill="#00c8ff" filter="url(#glow)">
                          <animate attributeName="opacity" values="0.4;1;0.4" dur={`${2 + i * 0.2}s`} repeatCount="indefinite" />
                        </circle>
                        <circle cx={l.x1} cy={l.y1} r="5" fill="#00c8ff" filter="url(#glow)" opacity="0.7" />
                      </g>
                    ))}
                  </svg>
                )}

                {/* CARDS 0 and 2 — LEFT COLUMN */}
                {[0, 2].map((i) => (
                  <div key={i} ref={cardRefs[i]} style={{ position: "relative", overflow: "hidden", borderRadius: 20, border: "1px solid rgba(255,255,255,0.08)", background: "#06111f", cursor: "pointer", display: "flex", flexDirection: "column", zIndex: 1 }}>
                    <div style={{ position: "relative", flex: 1, overflow: "hidden" }}>
                      <img src={divisions[i].cover} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.75 }} />
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #06111f 0%, rgba(6,17,31,0.4) 50%, transparent 100%)" }} />
                      <div style={{ position: "absolute", bottom: 16, right: 16, textAlign: "right" }}>
                        <h3 style={{ fontSize: 26, fontWeight: 700 }}>{divisions[i].nameHe}</h3>
                        <p style={{ fontSize: 11, color: "rgba(0,200,255,0.8)", marginTop: 4 }}>{divisions[i].subHe}</p>
                      </div>
                    </div>
                    <div style={{ padding: "12px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8, fontSize: 11, color: "rgba(255,255,255,0.6)", direction: "rtl" }}>
                        <span style={{ color: "#5eead4", fontWeight: 700 }}>{divisions[i].readiness}%</span>
                        <span>מוכנות ·</span>
                        <span>{divisions[i].subDivisions} תתי-יחידות ·</span>
                        <span>{divisions[i].exhibits} מוצגים</span>
                      </div>
                      <div style={{ width: "100%", background: "rgba(255,255,255,0.06)", borderRadius: 999, height: 3, marginBottom: 10 }}>
                        <div style={{ height: 3, borderRadius: 999, background: "linear-gradient(to right, #0891b2, #22d3ee)", width: `${divisions[i].readiness}%`, boxShadow: "0 0 8px rgba(0,200,255,0.6)" }} />
                      </div>
                      <Link href={`/global-exhibit-bank/division?divisionId=${divisions[i].id}`} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", background: "rgba(0,200,255,0.1)", border: "1px solid rgba(0,200,255,0.25)", borderRadius: 10, fontSize: 12, color: "rgba(0,220,255,0.9)", textDecoration: "none", direction: "rtl" }}>
                        פתח חטיבה <span>←</span>
                      </Link>
                    </div>
                  </div>
                ))}

                {/* CENTER GLOBE */}
                <div ref={coreRef} style={{ gridRow: "1 / 3", gridColumn: "2 / 3", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>

                    {/* Globe */}
                    <div style={{ position: "relative", width: 220, height: 220, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                      <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1.5px solid rgba(0,200,255,0.35)", boxShadow: "0 0 60px rgba(0,150,255,0.3), 0 0 120px rgba(0,100,255,0.15)", background: "radial-gradient(circle at 35% 35%, rgba(0,80,160,0.8), rgba(1,5,20,0.95))" }} />
                      <div style={{ position: "absolute", inset: 8, borderRadius: "50%", border: "1px solid rgba(0,200,255,0.15)", animation: "spin 20s linear infinite" }} />
                      <div style={{ position: "absolute", inset: 20, borderRadius: "50%", border: "1px solid rgba(0,200,255,0.1)", animation: "spin 15s linear infinite reverse" }} />
                      <svg viewBox="0 0 200 200" style={{ width: 160, height: 160, position: "relative", zIndex: 2 }}>
                        <defs>
                          <radialGradient id="globeGrad" cx="30%" cy="28%" r="72%">
                            <stop offset="0%" stopColor="#F6FDFF" />
                            <stop offset="18%" stopColor="#96DEFF" />
                            <stop offset="48%" stopColor="#3D8DFF" />
                            <stop offset="84%" stopColor="#0A2158" />
                          </radialGradient>
                          <clipPath id="globeClip"><circle cx="100" cy="100" r="62" /></clipPath>
                        </defs>
                        <g>
                          <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 100 100" to="360 100 100" dur="18s" repeatCount="indefinite" />
                          <circle cx="100" cy="100" r="62" fill="url(#globeGrad)" />
                          <g clipPath="url(#globeClip)">
                            <ellipse cx="100" cy="100" rx="46" ry="62" fill="none" stroke="rgba(231,248,255,0.6)" strokeWidth="1" />
                            <ellipse cx="100" cy="100" rx="26" ry="62" fill="none" stroke="rgba(231,248,255,0.4)" strokeWidth="1" />
                            <ellipse cx="100" cy="100" rx="62" ry="22" fill="none" stroke="rgba(231,248,255,0.4)" strokeWidth="1" />
                            <ellipse cx="100" cy="100" rx="62" ry="42" fill="none" stroke="rgba(231,248,255,0.25)" strokeWidth="1" />
                          </g>
                        </g>
                      </svg>
                      <img src="/covers/iai-white.png" alt="IAI" style={{ position: "absolute", width: 64, zIndex: 3, filter: "drop-shadow(0 0 16px rgba(0,200,255,0.9)) brightness(1.2)" }} />
                    </div>

                    <p style={{ fontSize: 16, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 4 }}>GLOBAL EXHIBIT CORE</p>
                    <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 20 }}>Unified company-wide exhibit ecosystem</p>

                    <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                      <Link href="/global-exhibit-bank" style={{ padding: "8px 14px", background: "rgba(0,200,255,0.15)", border: "1px solid rgba(0,200,255,0.35)", borderRadius: 10, fontSize: 11, color: "rgba(0,220,255,0.9)", textDecoration: "none" }}>👁 View All</Link>
                      <Link href={`/global-exhibit-bank/division?divisionId=missiles-space-defense`} style={{ padding: "8px 14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, fontSize: 11, color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>Open Division</Link>
                      <Link href="/tents-layout" style={{ padding: "8px 14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, fontSize: 11, color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>Layouts</Link>
                    </div>

                    <div style={{ display: "flex", gap: 24 }}>
                      {[{ label: "Total Systems", value: "81" }, { label: "Exhibition Ready", value: "83%" }, { label: "Divisions", value: "4" }].map((s) => (
                        <div key={s.label} style={{ textAlign: "center" }}>
                          <p style={{ fontSize: 20, fontWeight: 300, color: "#fff" }}>{s.value}</p>
                          <p style={{ fontSize: 8, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{s.label}</p>
                        </div>
                      ))}
                    </div>

                  </div>
                </div>

                {/* CARDS 1 and 3 — RIGHT COLUMN */}
                {[1, 3].map((i) => (
                  <div key={i} ref={cardRefs[i]} style={{ position: "relative", overflow: "hidden", borderRadius: 20, border: "1px solid rgba(255,255,255,0.08)", background: "#06111f", cursor: "pointer", display: "flex", flexDirection: "column", zIndex: 1 }}>
                    <div style={{ position: "relative", flex: 1, overflow: "hidden" }}>
                      <img src={divisions[i].cover} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.75 }} />
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #06111f 0%, rgba(6,17,31,0.4) 50%, transparent 100%)" }} />
                      <div style={{ position: "absolute", bottom: 16, right: 16, textAlign: "right" }}>
                        <h3 style={{ fontSize: 26, fontWeight: 700 }}>{divisions[i].nameHe}</h3>
                        <p style={{ fontSize: 11, color: "rgba(0,200,255,0.8)", marginTop: 4 }}>{divisions[i].subHe}</p>
                      </div>
                    </div>
                    <div style={{ padding: "12px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8, fontSize: 11, color: "rgba(255,255,255,0.6)", direction: "rtl" }}>
                        <span style={{ color: "#5eead4", fontWeight: 700 }}>{divisions[i].readiness}%</span>
                        <span>מוכנות ·</span>
                        <span>{divisions[i].subDivisions} תתי-יחידות ·</span>
                        <span>{divisions[i].exhibits} מוצגים</span>
                      </div>
                      <div style={{ width: "100%", background: "rgba(255,255,255,0.06)", borderRadius: 999, height: 3, marginBottom: 10 }}>
                        <div style={{ height: 3, borderRadius: 999, background: "linear-gradient(to right, #0891b2, #22d3ee)", width: `${divisions[i].readiness}%`, boxShadow: "0 0 8px rgba(0,200,255,0.6)" }} />
                      </div>
                      <Link href={`/global-exhibit-bank/division?divisionId=${divisions[i].id}`} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", background: "rgba(0,200,255,0.1)", border: "1px solid rgba(0,200,255,0.25)", borderRadius: 10, fontSize: 12, color: "rgba(0,220,255,0.9)", textDecoration: "none", direction: "rtl" }}>
                        פתח חטיבה <span>←</span>
                      </Link>
                    </div>
                  </div>
                ))}

              </div>
            </div>

            {/* DRILLDOWN PANEL */}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "#010812", padding: "16px 24px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.1em" }}>SELECTED DIVISION / DRILLDOWN PANEL</p>
                  <p style={{ fontSize: 10, color: "rgba(255,255,255,0.3)" }}>If selected, show sub-divisions and preview systems</p>
                </div>
                <div style={{ display: "flex", gap: 8, direction: "rtl" }}>
                  {["מלמ", "טילים", "חלל", "הגנה"].map((s) => (
                    <button key={s} style={{ padding: "6px 16px", background: s === "מלמ" ? "rgba(0,200,255,0.2)" : "rgba(255,255,255,0.05)", border: s === "מלמ" ? "1px solid rgba(0,200,255,0.4)" : "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 11, color: s === "מלמ" ? "rgba(0,220,255,0.9)" : "rgba(255,255,255,0.5)", cursor: "pointer" }}>{s}</button>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 8 }}>
                {exhibits.map((item) => (
                  <Link key={item.code} href={`/global-exhibit-bank/exhibit-system?system=${encodeURIComponent(item.name)}`} style={{ flexShrink: 0, width: 140, background: "#06111f", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, overflow: "hidden", textDecoration: "none", color: "#fff", transition: "border-color 0.3s" }}>
                    <div style={{ height: 80, overflow: "hidden" }}>
                      <img src={item.img} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }} />
                    </div>
                    <div style={{ padding: "8px 10px" }}>
                      <p style={{ fontSize: 11, fontWeight: 500, marginBottom: 4 }}>{item.name}</p>
                      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80" }} />
                        <p style={{ fontSize: 9, color: "rgba(255,255,255,0.4)" }}>{item.code}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* FOOTER BUTTONS */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              {[
                { icon: "👁", label: "View All Exhibits", href: "/global-exhibit-bank", primary: true },
                { icon: "📂", label: "Open Selected Division", href: "/global-exhibit-bank/division?divisionId=missiles-space-defense", primary: false },
                { icon: "⬇", label: "Export Summary", href: "#", primary: false },
                { icon: "⊞", label: "Go to Layouts", href: "/tents-layout", primary: false },
              ].map((btn) => (
                <Link key={btn.label} href={btn.href} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "18px", fontSize: 12, letterSpacing: "0.05em", textDecoration: "none", background: btn.primary ? "rgba(0,200,255,0.1)" : "transparent", color: btn.primary ? "rgba(0,220,255,0.9)" : "rgba(255,255,255,0.4)", borderRight: "1px solid rgba(255,255,255,0.04)", transition: "all 0.3s" }}>
                  <span>{btn.icon}</span>{btn.label}
                </Link>
              ))}
            </div>

          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
      `}</style>

    </main>
  );
}
