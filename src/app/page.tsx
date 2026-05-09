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
    subHe: "רובוטיקה · תקשורת · מכ״מים",
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
    <main className="min-h-screen bg-[#02040e] text-white" dir="rtl">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-5 border-b border-white/5">
        <div className="flex items-center gap-3">
          <img src="/covers/iai-white.png" alt="IAI" className="h-10 w-auto" style={{ filter: "drop-shadow(0 0 8px rgba(0,160,255,0.6))" }} />
          <div>
            <p className="text-[10px] tracking-[0.3em] text-cyan-300/60 uppercase">Exhibition Hub</p>
            <p className="text-[12px] text-white/80 font-light">מערכת ניהול תערוכות</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/tents-layout" className="px-4 py-2 bg-cyan-500/10 border border-cyan-400/30 rounded-lg text-cyan-300 text-[11px] tracking-widest hover:bg-cyan-500/20 transition">
            🏕 אוהלים ופריסה
          </Link>
          <Link href="/inventory" className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white/60 text-[11px] tracking-widest hover:bg-white/10 transition">
            מחסן
          </Link>
          <Link href="/exhibitions" className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white/60 text-[11px] tracking-widest hover:bg-white/10 transition">
            תערוכות
          </Link>
        </div>
      </header>

      {/* Hero */}
      <div className="px-8 py-10 text-center">
        <p className="text-cyan-300/50 text-[10px] tracking-[0.5em] uppercase mb-3">Israel Aerospace Industries</p>
        <h1 className="text-4xl font-extralight tracking-wide text-white mb-2">בנק מוצגים גלובלי</h1>
        <p className="text-white/40 text-sm">ניהול מרכזי של כל החטיבות, המוצגים, והתערוכות</p>
      </div>

      {/* Stats bar */}
      <div className="flex justify-center gap-6 px-8 mb-10">
        {[
          { label: "סה״כ מוצגים", value: "81" },
          { label: "חטיבות", value: "4" },
          { label: "תתי-יחידות", value: "10" },
          { label: "מוכנות", value: "83%" },
        ].map((s) => (
          <div key={s.label} className="bg-white/4 border border-white/8 rounded-xl px-6 py-3 text-center">
            <p className="text-2xl font-light text-cyan-300">{s.value}</p>
            <p className="text-[10px] text-white/40 tracking-widest uppercase mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Division cards */}
      <div className="grid grid-cols-2 gap-5 px-8 max-w-5xl mx-auto pb-16">
        {divisions.map((div) => (
          <Link
            key={div.id}
            href={`/global-exhibit-bank/division?divisionId=${div.id}`}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#06111f] hover:border-cyan-400/40 transition-all duration-500 hover:-translate-y-1"
          >
            {/* Cover image */}
            <div className="relative h-44 overflow-hidden">
              <img
                src={div.cover}
                alt={div.nameHe}
                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-55 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06111f] via-[#06111f]/60 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="text-[10px] tracking-[0.3em] text-cyan-300/60 uppercase">חטיבה</span>
              </div>
              <div className="absolute bottom-4 right-4 text-right">
                <h2 className="text-2xl font-semibold text-white">{div.nameHe}</h2>
                <p className="text-cyan-300/70 text-[11px] tracking-wider mt-1">{div.subHe}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="px-5 py-4">
              <div className="flex items-center gap-4 mb-3">
                <span className="text-cyan-400 text-xl font-light">{div.readiness}%</span>
                <span className="text-white/40 text-xs">מוכנות</span>
                <span className="mx-2 text-white/20">·</span>
                <span className="text-white/70 text-sm">{div.exhibits}</span>
                <span className="text-white/40 text-xs">מוצגים</span>
                <span className="mx-2 text-white/20">·</span>
                <span className="text-white/70 text-sm">{div.subDivisions}</span>
                <span className="text-white/40 text-xs">תתי-יחידות</span>
              </div>

              {/* Readiness bar */}
              <div className="w-full bg-white/8 rounded-full h-1 mb-4">
                <div
                  className="h-1 rounded-full bg-cyan-400"
                  style={{ width: `${div.readiness}%`, boxShadow: "0 0 8px rgba(0,200,255,0.6)" }}
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-white/30 text-[11px]">{div.nameEn}</span>
                <span className="text-cyan-300/70 text-[11px] group-hover:text-cyan-200 transition">
                  פתח חטיבה →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#02040e]/95 backdrop-blur border-t border-white/5 px-8 py-3">
        <div className="flex items-center justify-center gap-8 max-w-3xl mx-auto">
          {[
            { label: "חטיבות", href: "/", active: true },
            { label: "מוצגים", href: "/global-exhibit-bank" },
            { label: "מלאי", href: "/inventory" },
            { label: "תערוכות", href: "/exhibitions" },
            { label: "אוהלים", href: "/tents-layout" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`text-[11px] tracking-widest uppercase transition ${item.active ? "text-cyan-300" : "text-white/40 hover:text-white/70"}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
