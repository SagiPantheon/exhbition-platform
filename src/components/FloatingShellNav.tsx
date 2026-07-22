"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "../context/LanguageContext";

export default function FloatingShellNav() {
  const pathname = usePathname();
  const { lang, toggle } = useLang();
  const isHebrew = pathname === "/he" || pathname?.startsWith("/he/");
  const isHome = pathname === "/" || pathname === "/he";

  if (isHome) return null;

  const homeHref = isHebrew ? "/he" : "/";
  const tentsHref = isHebrew ? "/he/tents-layout" : "/tents-layout";
  const labels = isHebrew
    ? { back: "חזרה", home: "בית", section: "אוהלים" }
    : { back: "Back", home: "Home", section: "Tents" };

  const handleBack = () => {
    if (typeof window !== "undefined") window.history.back();
  };

  return (
    <div
      className="floating-shell-nav"
      style={{
        position: "fixed",
        top: "12px",
        right: "14px",
        zIndex: 9999,
        display: "flex",
        gap: "8px",
        alignItems: "center",
      }}
    >
      <button
        type="button"
        onClick={handleBack}
        style={{
          border: "1px solid rgba(148,163,184,0.22)",
          background: "rgba(8,15,28,0.76)",
          color: "#f8fafc",
          padding: "8px 12px",
          borderRadius: "999px",
          fontSize: "12px",
          fontWeight: 800,
          cursor: "pointer",
          boxShadow: "0 8px 20px rgba(0,0,0,0.18)",
          backdropFilter: "blur(8px)",
        }}
      >
        ← {labels.back}
      </button>

      <button
        type="button"
        onClick={toggle}
        style={{
          border: "1px solid rgba(148,163,184,0.22)",
          background: "rgba(8,15,28,0.76)",
          color: "#f8fafc",
          padding: "8px 12px",
          borderRadius: "999px",
          fontSize: "12px",
          fontWeight: 800,
          cursor: "pointer",
          boxShadow: "0 8px 20px rgba(0,0,0,0.18)",
          backdropFilter: "blur(8px)",
          letterSpacing: "0.06em",
        }}
      >
        {lang === "he" ? "EN" : "HE"}
      </button>

      {pathname !== tentsHref ? (
        <Link
          href={tentsHref}
          style={{
            textDecoration: "none",
            border: "1px solid rgba(56,189,248,0.24)",
            background: "rgba(8,15,28,0.76)",
            color: "#eaf6ff",
            padding: "8px 12px",
            borderRadius: "999px",
            fontSize: "12px",
            fontWeight: 800,
            boxShadow: "0 8px 20px rgba(0,0,0,0.18)",
          }}
        >
          {labels.section}
        </Link>
      ) : null}

      <Link
        href={homeHref}
        style={{
          textDecoration: "none",
          border: "1px solid rgba(56,189,248,0.28)",
          background: "linear-gradient(135deg, rgba(14,165,233,0.94) 0%, rgba(59,130,246,0.94) 100%)",
          color: "#f8fafc",
          padding: "8px 13px",
          borderRadius: "999px",
          fontSize: "12px",
          fontWeight: 800,
          boxShadow: "0 8px 22px rgba(2,132,199,0.20)",
        }}
      >
        {labels.home}
      </Link>
    </div>
  );
}
