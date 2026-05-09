"use client";
import Link from "next/link";

const divisions = [
  {
    id: "missiles-space-defense",
    nameHe: 'חטיבת מט"ח',
    nameEn: "MTA Division",
    subHe: "מלמ · טילים · חלל · הגנה",
    exhibits: 24,
    subDivisions: 4,
    readiness: 82,
    cover: "/images/divisions/matach-cover.png",
    color: "#00c8ff",
  },
  {
    id: "aviation",
    nameHe: "חטיבת תעופה",
    nameEn: "Aviation Division",
    subHe: "בדק · MRO",
    exhibits: 18,
    subDivisions: 2,
    readiness: 79,
    cover: "/images/divisions/taufa-cover.png",
    color: "#00c8ff",
  },
  {
    id: "elta",
    nameHe: "חטיבת אלתא",
    nameEn: "ELTA Division",
    subHe: 'רובוטיקה · תקשורת · מכ"מים',
    exhibits: 27,
    subDivisions: 3,
    readiness: 88,
    cover: "/images/divisions/elta-cover.png",
    color: "#00c8ff",
  },
  {
    id: "uav",
    nameHe: 'חטיבת כט"צ',
    nameEn: "UAV Division",
    subHe: "מלט",
    exhibits: 12,
    subDivisions: 1,
    readiness: 84,
    cover: "/images/divisions/uav-cover.png",
    color: "#00c8ff",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#01020a] text-white" dir="rtl">

      {/* Header */}
      <header className="flex items-center justify-between px-10 py-4 border-b border-cyan-400/10 bg-[#01020a]/95 backdrop-blur sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <img src="/covers/iai-white.png" alt="IAI" className="h-9 w-auto" style={{filter:"drop-shadow(0 0 12px rgba(0,180,255,0.8))"}} />
          <div className="h-6 w-px bg-white/10" />
          <div>
            <p className="text-[9px] tracking-[0.4em] text-cyan-300/50 uppercase">Exhibition Hub</p>
            <p className="text-[13px] text-white/80 font-light">מערכת ניהול תערוכות</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/tents-layout" className="flex items-center gap-2 px-5 py-2.5 bg-cyan-500/10 border border-cyan-400/40 rounded-xl text-cyan-300 text-[11px] tracking-widest hover:bg-cyan-500/25 hover:border-cyan-400/80 transition-all duration-300">
            🏕 אוהלים ופריסה
          </Link>
          <Link href="/inventory" className="px-4 py-2.5 bg-white/4 border border-white/10 rounded-xl text-white/60 text-[11px] tracking-widest hover:bg-white/10 transition-all duration-300">מחסן</Link>
          <Link href="/exhibitions" className="px-4 py-2.5 bg-white/4 border border-white/10 rounded-xl text-white/60 text-[11px] tracking-widest hover:bg-white/10 transition-all duration-300">תערוכות</Link>
          <Link href="/global-exhibit-bank" className="px-4 py-2.5 bg-white/4 border border-white/10 rounded-xl text-white/60 text-[11px] tracking-widest hover:bg-white/10 transition-all duration-300">בנק מוצגים</Link>
        </div>
      </header>

      {/* Hero */}
      <div className="px-10 pt-10 pb-6 text-center">
        <p className="text-cyan-300/40 text-[10px] tracking-[0.6em] uppercase mb-3">Israel Aerospace Industries</p>
        <h1 className="text-5xl font-extralight tracking-wide text-white mb-2">בנק מוצגים גלובלי</h1>
        <p className="text-white/30 text-sm">ניהול מרכזי של כל החטיבות, המוצגים, והתערוכות</p>
      </div>

      {/* Stats */}
      <div className="flex justify-center gap-3 px-10 mb-10">
        {[
          { label: 'סה"כ מוצגים', value: "81" },
          { label: "חטיבות", value: "4" },
          { label: "תתי-יחידות", value: "10" },
          { label: "מוכנות", value: "83%" },
          { label: "Missing Data", value: "14" },
        ].map((s) => (
          <div key={s.label} className="bg-[#06111f] border border-cyan-400/15 rounded-2xl px-8 py-4 text-center">
            <p className="text-3xl font-extralight text-cyan-300 mb-1">{s.value}</p>
            <p className="text-[9px] text-white/30 tracking-widest uppercase">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Division Cards - Full width */}
      <div className="grid grid-cols-2 gap-5 px-8 max-w-[1400px] mx-auto pb-28">
        {divisions.map((div) => (
          <Link
            key={div.id}
            href={`/global-exhibit-bank/division?divisionId=${div.id}`}
            className="group relative overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-2"
            style={{
              border: "1px solid rgba(0,200,255,0.15)",
              boxShadow: "0 0 0 1px rgba(0,200,255,0.05), inset 0 0 60px rgba(0,0,0,0.5)",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(0,180,255,0.3), 0 0 80px rgba(0,150,255,0.15), inset 0 0 60px rgba(0,0,0,0.3)";
              (e.currentTarget as HTMLElement).style.border = "1px solid rgba(0,200,255,0.5)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 1px rgba(0,200,255,0.05), inset 0 0 60px rgba(0,0,0,0.5)";
              (e.currentTarget as HTMLElement).style.border = "1px solid rgba(0,200,255,0.15)";
            }}
          >
            {/* Full background image */}
            <div className="relative h-80 overflow-hidden">
              <img
                src={div.cover}
                alt={div.nameHe}
                className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:opacity-95 group-hover:scale-105 transition-all duration-700"
              />
              {/* Dark overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#01020a] via-[#01020a]/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#01020a]/20 to-transparent" />

              {/* Neon top border glow */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

              {/* Badges */}
              <div className="absolute top-5 right-5 flex items-center gap-2">
                <span className="px-3 py-1.5 bg-black/50 backdrop-blur-sm border border-white/10 rounded-full text-[9px] tracking-[0.3em] text-white/60 uppercase">חטיבה</span>
              </div>
              <div className="absolute top-5 left-5">
                <div className="px-4 py-1.5 bg-cyan-500/20 backdrop-blur-sm border border-cyan-400/40 rounded-full">
                  <span className="text-[13px] font-light text-cyan-300">{div.readiness}%</span>
                </div>
              </div>

              {/* Title */}
              <div className="absolute bottom-6 right-6 text-right">
                <h2 className="text-4xl font-bold text-white tracking-tight drop-shadow-lg">{div.nameHe}</h2>
                <p className="text-cyan-300/80 text-[13px] tracking-wider mt-1 drop-shadow">{div.subHe}</p>
              </div>
            </div>

            {/* Body */}
            <div className="px-7 py-5 bg-[#030810]">
              {/* Stats */}
              <div className="flex items-center mb-4">
                <div className="flex-1 text-center">
                  <p className="text-3xl font-extralight text-white">{div.exhibits}</p>
                  <p className="text-[9px] text-white/40 tracking-widest uppercase mt-1">מוצגים</p>
                </div>
                <div className="w-px h-10 bg-cyan-400/10" />
                <div className="flex-1 text-center">
                  <p className="text-3xl font-extralight text-white">{div.subDivisions}</p>
                  <p className="text-[9px] text-white/40 tracking-widest uppercase mt-1">תתי-יחידות</p>
                </div>
                <div className="w-px h-10 bg-cyan-400/10" />
                <div className="flex-1 text-center">
                  <p className="text-3xl font-extralight text-cyan-400">{div.readiness}%</p>
                  <p className="text-[9px] text-white/40 tracking-widest uppercase mt-1">מוכנות</p>
                </div>
              </div>

              {/* Progress */}
              <div className="w-full bg-white/5 rounded-full h-1 mb-5">
                <div
                  className="h-1 rounded-full bg-gradient-to-r from-cyan-600 to-cyan-300"
                  style={{width:`${div.readiness}%`, boxShadow:"0 0 12px rgba(0,200,255,0.7)"}}
                />
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <span className="text-white/20 text-[11px] tracking-wider">{div.nameEn}</span>
                <span className="flex items-center gap-2 text-cyan-400/70 text-[12px] group-hover:text-cyan-200 group-hover:gap-3 transition-all duration-300">
                  פתח חטיבה <span className="text-lg">←</span>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#01020a]/98 backdrop-blur border-t border-cyan-400/10 px-10 py-4">
        <div className="flex items-center justify-center gap-10 max-w-3xl mx-auto">
          {[
            { label: "חטיבות", href: "/", active: true },
            { label: "מוצגים", href: "/global-exhibit-bank" },
            { label: "מלאי", href: "/inventory" },
            { label: "תערוכות", href: "/exhibitions" },
            { label: "אוהלים", href: "/tents-layout" },
          ].map((item) => (
            <Link key={item.label} href={item.href}
              className={`text-[11px] tracking-widest uppercase transition-all duration-300 ${item.active ? "text-cyan-300" : "text-white/30 hover:text-white/60"}`}>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
