import Link from "next/link";

export default function HomePage() {
  return (
    <main style={{ minHeight: "100vh", background: "#01020e", color: "#fff", fontFamily: "Heebo, Assistant, sans-serif" }}>

      {/* HERO */}
      <div style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }}>
        <img src="/images/home/iai-hero.png" alt="IAI" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.0) 50%, rgba(1,2,14,0.35) 80%, rgba(1,2,14,0.75) 100%)" }} />
        <div style={{ position: "absolute", bottom: 64, right: 64, textAlign: "right" }}>
          <p style={{ color: "rgba(0,200,255,0.7)", fontSize: 11, letterSpacing: "0.5em", textTransform: "uppercase", marginBottom: 12 }}>Israel Aerospace Industries</p>
          <h1 style={{ fontSize: 48, fontWeight: 700, marginBottom: 12, lineHeight: 1.2, textShadow: "0 0 40px rgba(0,100,255,0.5)" }}>התעשייה האווירית<br/>לישראל</h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 16, marginBottom: 32 }}>מערכת ניהול תערוכות · תכנון חכם · ביצוע מושלם</p>
          <a href="#main" style={{ display: "inline-flex", alignItems: "center", gap: 12, padding: "14px 32px", background: "rgba(0,200,255,0.15)", border: "1px solid rgba(0,200,255,0.5)", borderRadius: 999, color: "rgba(0,220,255,0.9)", fontSize: 13, letterSpacing: "0.2em", textDecoration: "none" }}>כניסה למערכת ↓</a>
        </div>
      </div>

      {/* SECTION NAV */}
      <div id="main" style={{ padding: "32px 48px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 16, marginBottom: 16 }}>
          {[
            { label: "Space", sub: "7 assets", href: "/space", img: "/images/home/space-cover.png" },
            { label: "Air", sub: "5+ assets", href: "/air", img: "/images/home/air-cover.png" },
            { label: "Land", sub: "3 assets", href: "/land", img: "/images/home/land-cover.png" },
            { label: "Naval", sub: "1 asset", href: "/naval", img: "/images/home/naval-cover.png" },
          ].map((s) => (
            <Link key={s.label} href={s.href} style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 20px", borderRadius: 16, border: "1px solid rgba(255,255,255,0.09)", background: "rgba(6,17,31,0.85)", textDecoration: "none", overflow: "hidden", transition: "border-color 0.2s" }}>
              <div style={{ width: 52, height: 52, borderRadius: 10, overflow: "hidden", flexShrink: 0, border: "1px solid rgba(255,255,255,0.1)" }}>
                <img src={s.img} alt={s.label} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.9 }} />
              </div>
              <div style={{ minWidth: 0 }}>
                <p style={{ fontSize: 15, fontWeight: 700, color: "white", margin: 0 }}>{s.label}</p>
                <p style={{ fontSize: 11, color: "rgba(0,200,255,0.6)", textTransform: "uppercase", letterSpacing: "0.1em", margin: "4px 0 0" }}>{s.sub}</p>
              </div>
              <span style={{ marginLeft: "auto", color: "rgba(0,200,255,0.45)", fontSize: 14, flexShrink: 0 }}>→</span>
            </Link>
          ))}
        </div>

        <Link href="/dashboard" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, padding: "18px 32px", borderRadius: 16, border: "1px solid rgba(0,200,255,0.3)", background: "rgba(0,200,255,0.08)", textDecoration: "none", color: "rgba(0,220,255,0.9)", fontSize: 14, fontWeight: 600, letterSpacing: "0.08em", transition: "all 0.2s" }}>
          <span style={{ fontSize: 16 }}>◈</span>
          Global Exhibit Bank →
        </Link>
      </div>

    </main>
  );
}
