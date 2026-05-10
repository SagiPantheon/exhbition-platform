"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

const divisions = [
  { id: "missiles-space-defense", nameHe: 'חטיבת מט"ח', nameEn: "MTA Division", subHe: "מלמ · טילים · חלל · הגנה", exhibits: 24, subDivisions: 4, readiness: 82, cover: "/images/divisions/matach-cover.png", icon: "🚀" },
  { id: "elta", nameHe: "חטיבת אלתא", nameEn: "ELTA Division", subHe: 'רובוטיקה · תקשורת · מכ"מים', exhibits: 27, subDivisions: 3, readiness: 88, cover: "/images/divisions/elta-cover.png", icon: "📡" },
  { id: "aviation", nameHe: "חטיבת תעופה", nameEn: "Aviation Division", subHe: "בדק · MRO", exhibits: 18, subDivisions: 2, readiness: 79, cover: "/images/divisions/taufa-cover.png", icon: "✈️" },
  { id: "uav", nameHe: 'חטיבת כט"צ', nameEn: "UAV Division", subHe: "מלט", exhibits: 12, subDivisions: 1, readiness: 84, cover: "/images/divisions/uav-cover.png", icon: "🛸" },
];

export default function HomePage() {
  const [pulse, setPulse] = useState(false);
  useEffect(() => { const t = setInterval(() => setPulse(p => !p), 2000); return () => clearInterval(t); }, []);

  return (
    <main className="min-h-screen bg-[#01020e] text-white flex flex-col" style={{fontFamily:"Heebo, Assistant, sans-serif"}}>
      <header className="flex items-center justify-between px-8 py-4 border-b border-cyan-400/10 bg-[#01020e]/95 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <img src="/covers/iai-white.png" alt="IAI" className="h-10 w-auto" style={{filter:"drop-shadow(0 0 14px rgba(0,180,255,0.9))"}} />
          <div>
            <p className="text-[22px] font-bold text-white tracking-tight">GLOBAL EXHIBIT BANK</p>
            <p className="text-[11px] text-white/40">Unified access point to all divisions, sub-divisions, and exhibit systems</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/4 border border-white/8 rounded-xl">
            <span className="text-white/30 text-sm">🔍</span>
            <input placeholder="Search exhibits, divisions, systems..." className="bg-transparent text-white/60 text-[12px] outline-none w-56 placeholder:text-white/25" />
          </div>
          <button className="p-2.5 bg-white/4 border border-white/8 rounded-xl text-white/50">⚙</button>
        </div>
      </header>

      <div className="flex flex-1">
        <aside className="w-[140px] flex-shrink-0 border-r border-cyan-400/8 bg-[#010812] flex flex-col py-4">
          {[{label:"Hub",icon:"⊙",href:"/",active:false},{label:"Global Exhibit Bank",icon:"◈",href:"/",active:true},{label:"Divisions",icon:"⬡",href:"#",active:false},{label:"Systems",icon:"≡",href:"#",active:false},{label:"Layouts",icon:"⊞",href:"/tents-layout",active:false},{label:"Reports",icon:"▤",href:"#",active:false}].map((item) => (
            <a key={item.label} href={item.href} className={`flex flex-col items-center gap-1.5 px-3 py-4 mx-2 rounded-xl transition-all duration-300 ${item.active ? "bg-cyan-500/15 border border-cyan-400/30 text-cyan-300" : "text-white/30 hover:text-white/60 hover:bg-white/4"}`}>
              <span className="text-lg">{item.icon}</span>
              <span className="text-[9px] tracking-wider text-center leading-tight">{item.label}</span>
            </a>
          ))}
          <div className="mt-auto px-3 py-4 flex flex-col items-center gap-1">
            <img src="/covers/iai-white.png" alt="IAI" className="h-6 w-auto opacity-30" />
            <p className="text-[8px] text-white/20">GEB COMMAND v2.5.0</p>
            <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /><span className="text-[8px] text-green-400">ONLINE</span></div>
          </div>
        </aside>

        <div className="flex-1 flex flex-col">
          <div className="flex gap-3 px-8 py-4 border-b border-white/4">
            {[{icon:"⬡",label:"Total Exhibits",value:"81",color:"text-cyan-300"},{icon:"◈",label:"Divisions",value:"4",color:"text-cyan-300"},{icon:"⊞",label:"Sub-Divisions",value:"10",color:"text-cyan-300"},{icon:"✓",label:"Ready",value:"83%",color:"text-green-400"},{icon:"⚠",label:"Missing Data",value:"14",color:"text-yellow-400"},{icon:"★",label:"New",value:"7",color:"text-cyan-300"}].map((s) => (
              <div key={s.label} className="flex-1 flex items-center gap-3 bg-[#06111f] border border-white/6 rounded-xl px-4 py-3">
                <span className={`text-lg ${s.color}`}>{s.icon}</span>
                <div><p className={`text-2xl font-light ${s.color}`}>{s.value}</p><p className="text-[9px] text-white/30 uppercase tracking-wider">{s.label}</p></div>
              </div>
            ))}
          </div>

          <div className="flex-1 p-6">
            <div className="grid grid-cols-3 gap-4" style={{gridTemplateRows:"1fr 1fr",height:"calc(100vh - 280px)"}}>

              <div className="relative overflow-hidden rounded-2xl border border-white/8 bg-[#06111f] hover:border-cyan-400/30 transition-all duration-500 cursor-pointer">
                <div className="relative h-40 overflow-hidden">
                  <img src={divisions[0].cover} alt="" className="absolute inset-0 w-full h-full object-cover opacity-70" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06111f] via-[#06111f]/30 to-transparent" />
                  <div className="absolute bottom-3 right-3 text-right"><h3 className="text-2xl font-bold text-white">{divisions[0].nameHe}</h3><p className="text-cyan-300/70 text-[10px]">{divisions[0].subHe}</p></div>
                </div>
                <div className="px-4 py-3">
                  <div className="flex items-center gap-2 mb-2 text-[11px] text-white/60" dir="rtl"><span className="text-cyan-400">{divisions[0].readiness}%</span> מוכנות <span>·</span> <span>{divisions[0].subDivisions}</span> תתי-יחידות <span>·</span> <span>{divisions[0].exhibits}</span> מוצגים</div>
                  <div className="w-full bg-white/6 rounded-full h-1 mb-3"><div className="h-1 rounded-full bg-gradient-to-r from-cyan-600 to-cyan-300" style={{width:`${divisions[0].readiness}%`,boxShadow:"0 0 8px rgba(0,200,255,0.6)"}} /></div>
                  <Link href={`/global-exhibit-bank/division?divisionId=${divisions[0].id}`} className="flex items-center justify-between w-full px-4 py-2 bg-cyan-500/10 border border-cyan-400/25 rounded-xl text-[11px] text-cyan-300 hover:bg-cyan-500/20 transition" dir="rtl">פתח חטיבה <span>←</span></Link>
                </div>
              </div>

              <div className="row-span-2 flex items-center justify-center">
                <div className="relative w-full max-w-[320px] flex flex-col items-center">
                  <div className="relative w-52 h-52 rounded-full border-2 border-cyan-400/30 flex items-center justify-center mb-6" style={{background:"radial-gradient(circle at 35% 35%, rgba(0,80,160,0.8), rgba(1,5,20,0.95))",boxShadow:"0 0 60px rgba(0,150,255,0.3), 0 0 120px rgba(0,100,255,0.15)"}}>
                    <div className="absolute inset-2 rounded-full border border-cyan-400/20 animate-spin" style={{animationDuration:"20s"}} />
                    <div className="absolute inset-6 rounded-full border border-cyan-400/15 animate-spin" style={{animationDuration:"15s",animationDirection:"reverse"}} />
                    <img src="/covers/iai-white.png" alt="IAI" className="w-24 h-auto relative z-10" style={{filter:"drop-shadow(0 0 20px rgba(0,200,255,0.8)) brightness(1.2)"}} />
                    <div className="absolute inset-0 rounded-full" style={{background:"radial-gradient(circle at 30% 30%, rgba(0,150,255,0.1), transparent 60%)"}} />
                  </div>
                  <p className="text-[14px] font-bold text-white tracking-wider mb-1">GLOBAL EXHIBIT CORE</p>
                  <p className="text-[10px] text-white/40 mb-4">Unified company-wide exhibit ecosystem</p>
                  <div className="flex gap-2 mb-4">
                    <Link href="/global-exhibit-bank" className="px-3 py-1.5 bg-cyan-500/15 border border-cyan-400/30 rounded-lg text-[10px] text-cyan-300 hover:bg-cyan-500/25 transition">👁 View All</Link>
                    <button className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[10px] text-white/50 hover:bg-white/10 transition">Open Division</button>
                    <Link href="/tents-layout" className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[10px] text-white/50 hover:bg-white/10 transition">Layouts</Link>
                  </div>
                  <div className="flex justify-center gap-6">
                    {[{label:"Total Systems",value:"81"},{label:"Exhibition Ready",value:"83%"},{label:"Divisions",value:"4"}].map(s=>(
                      <div key={s.label} className="text-center"><p className="text-lg font-light text-white">{s.value}</p><p className="text-[8px] text-white/30 tracking-wider">{s.label}</p></div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-white/8 bg-[#06111f] hover:border-cyan-400/30 transition-all duration-500 cursor-pointer">
                <div className="relative h-40 overflow-hidden">
                  <img src={divisions[1].cover} alt="" className="absolute inset-0 w-full h-full object-cover opacity-70" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06111f] via-[#06111f]/30 to-transparent" />
                  <div className="absolute bottom-3 right-3 text-right"><h3 className="text-2xl font-bold text-white">{divisions[1].nameHe}</h3><p className="text-cyan-300/70 text-[10px]">{divisions[1].subHe}</p></div>
                </div>
                <div className="px-4 py-3">
                  <div className="flex items-center gap-2 mb-2 text-[11px] text-white/60" dir="rtl"><span className="text-cyan-400">{divisions[1].readiness}%</span> מוכנות <span>·</span> <span>{divisions[1].subDivisions}</span> תתי-יחידות <span>·</span> <span>{divisions[1].exhibits}</span> מוצגים</div>
                  <div className="w-full bg-white/6 rounded-full h-1 mb-3"><div className="h-1 rounded-full bg-gradient-to-r from-cyan-600 to-cyan-300" style={{width:`${divisions[1].readiness}%`,boxShadow:"0 0 8px rgba(0,200,255,0.6)"}} /></div>
                  <Link href={`/global-exhibit-bank/division?divisionId=${divisions[1].id}`} className="flex items-center justify-between w-full px-4 py-2 bg-cyan-500/10 border border-cyan-400/25 rounded-xl text-[11px] text-cyan-300 hover:bg-cyan-500/20 transition" dir="rtl">פתח חטיבה <span>←</span></Link>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-white/8 bg-[#06111f] hover:border-cyan-400/30 transition-all duration-500 cursor-pointer">
                <div className="relative h-40 overflow-hidden">
                  <img src={divisions[2].cover} alt="" className="absolute inset-0 w-full h-full object-cover opacity-70" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06111f] via-[#06111f]/30 to-transparent" />
                  <div className="absolute bottom-3 right-3 text-right"><h3 className="text-2xl font-bold text-white">{divisions[2].nameHe}</h3><p className="text-cyan-300/70 text-[10px]">{divisions[2].subHe}</p></div>
                </div>
                <div className="px-4 py-3">
                  <div className="flex items-center gap-2 mb-2 text-[11px] text-white/60" dir="rtl"><span className="text-cyan-400">{divisions[2].readiness}%</span> מוכנות <span>·</span> <span>{divisions[2].subDivisions}</span> תתי-יחידות <span>·</span> <span>{divisions[2].exhibits}</span> מוצגים</div>
                  <div className="w-full bg-white/6 rounded-full h-1 mb-3"><div className="h-1 rounded-full bg-gradient-to-r from-cyan-600 to-cyan-300" style={{width:`${divisions[2].readiness}%`,boxShadow:"0 0 8px rgba(0,200,255,0.6)"}} /></div>
                  <Link href={`/global-exhibit-bank/division?divisionId=${divisions[2].id}`} className="flex items-center justify-between w-full px-4 py-2 bg-cyan-500/10 border border-cyan-400/25 rounded-xl text-[11px] text-cyan-300 hover:bg-cyan-500/20 transition" dir="rtl">פתח חטיבה <span>←</span></Link>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-white/8 bg-[#06111f] hover:border-cyan-400/30 transition-all duration-500 cursor-pointer">
                <div className="relative h-40 overflow-hidden">
                  <img src={divisions[3].cover} alt="" className="absolute inset-0 w-full h-full object-cover opacity-70" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06111f] via-[#06111f]/30 to-transparent" />
                  <div className="absolute bottom-3 right-3 text-right"><h3 className="text-2xl font-bold text-white">{divisions[3].nameHe}</h3><p className="text-cyan-300/70 text-[10px]">{divisions[3].subHe}</p></div>
                </div>
                <div className="px-4 py-3">
                  <div className="flex items-center gap-2 mb-2 text-[11px] text-white/60" dir="rtl"><span className="text-cyan-400">{divisions[3].readiness}%</span> מוכנות <span>·</span> <span>{divisions[3].subDivisions}</span> תתי-יחידות <span>·</span> <span>{divisions[3].exhibits}</span> מוצגים</div>
                  <div className="w-full bg-white/6 rounded-full h-1 mb-3"><div className="h-1 rounded-full bg-gradient-to-r from-cyan-600 to-cyan-300" style={{width:`${divisions[3].readiness}%`,boxShadow:"0 0 8px rgba(0,200,255,0.6)"}} /></div>
                  <Link href={`/global-exhibit-bank/division?divisionId=${divisions[3].id}`} className="flex items-center justify-between w-full px-4 py-2 bg-cyan-500/10 border border-cyan-400/25 rounded-xl text-[11px] text-cyan-300 hover:bg-cyan-500/20 transition" dir="rtl">פתח חטיבה <span>←</span></Link>
                </div>
              </div>

            </div>
          </div>

          <div className="border-t border-white/6 bg-[#010812] px-8 py-4">
            <div className="flex items-center justify-between mb-3">
              <div><p className="text-[12px] font-semibold text-white tracking-wider">SELECTED DIVISION / DRILLDOWN PANEL</p><p className="text-[10px] text-white/30">If selected, show sub-divisions and preview systems</p></div>
              <div className="flex gap-2" dir="rtl">{["מלמ","טילים","חלל","הגנה"].map(s=>(<button key={s} className="px-4 py-1.5 bg-cyan-500/15 border border-cyan-400/30 rounded-lg text-[11px] text-cyan-300 hover:bg-cyan-500/25 transition">{s}</button>))}</div>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {[{name:"Arrow 3 Launcher",code:"AIR-001",img:"/images/air/arrow-3-launcher-showcase.png"},{name:"Heron UAV",code:"AIR-002",img:"/images/air/heron-showcase.png"},{name:"ZMAG",code:"LAND-001",img:"/images/land/zmag-showcase.png"},{name:"3DCapture",code:"LAND-002",img:"/images/land/3dcapture-showcase.png"},{name:"Panda",code:"LAND-003",img:"/images/land/panda-showcase.png"},{name:"OPTSAT 500",code:"SPACE-001",img:"/images/space/optsat-500-showcase.png"},{name:"OPTSAR 550",code:"SPACE-002",img:"/images/space/optsar-550-showcase.png"},{name:"Katana",code:"NAVAL-001",img:"/images/naval/katana.png"},{name:"MCS",code:"SPACE-003",img:"/images/space/mcs-showcase.png"}].map((item) => (
                <div key={item.code} className="flex-shrink-0 w-36 bg-[#06111f] border border-white/8 rounded-xl overflow-hidden hover:border-cyan-400/40 transition cursor-pointer group">
                  <div className="h-20 overflow-hidden"><img src={item.img} alt={item.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" /></div>
                  <div className="px-2 py-2"><p className="text-[11px] font-medium text-white truncate">{item.name}</p><div className="flex items-center gap-1 mt-1"><div className="w-1.5 h-1.5 rounded-full bg-green-400" /><p className="text-[9px] text-white/40">{item.code}</p></div></div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-4 border-t border-white/6">
            {[{icon:"👁",label:"View All Exhibits",href:"/global-exhibit-bank",primary:true},{icon:"📂",label:"Open Selected Division",href:"#",primary:false},{icon:"⬇",label:"Export Summary",href:"#",primary:false},{icon:"⊞",label:"Go to Layouts",href:"/tents-layout",primary:false}].map((btn,i) => (
              <Link key={i} href={btn.href} className={`flex items-center justify-center gap-3 py-4 text-[12px] tracking-wider transition-all duration-300 border-r border-white/4 last:border-r-0 ${btn.primary ? "bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20" : "text-white/40 hover:bg-white/5 hover:text-white/70"}`}>
                <span>{btn.icon}</span>{btn.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
