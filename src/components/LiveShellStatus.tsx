"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

export default function LiveShellStatus() {
  const pathname = usePathname();
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const isHebrew = pathname === "/he" || pathname?.startsWith("/he/");
  const isHome = pathname === "/" || pathname === "/he";
  const locale = isHebrew ? "he-IL" : "en-GB";

  const formatted = useMemo(() => {
    if (!now) return null;
    return {
      day: new Intl.DateTimeFormat(locale, { weekday: "short" }).format(now),
      date: new Intl.DateTimeFormat(locale, { day: "2-digit", month: "short" }).format(now),
      time: new Intl.DateTimeFormat(locale, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(now),
    };
  }, [now, locale]);

  if (isHome) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "12px",
        left: "14px",
        zIndex: 9998,
        borderRadius: "999px",
        border: "1px solid rgba(125,211,252,0.18)",
        background: "rgba(8,15,28,0.72)",
        backdropFilter: "blur(10px)",
        boxShadow: "0 8px 22px rgba(0,0,0,0.16)",
        padding: "7px 11px",
        color: "#e2e8f0",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        minHeight: "34px",
      }}
    >
      {formatted ? (
        <>
          <span
            style={{
              fontSize: "10px",
              fontWeight: 800,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#7dd3fc",
            }}
          >
            {formatted.day}
          </span>
          <span
            style={{
              width: "1px",
              height: "14px",
              background: "rgba(148,163,184,0.24)",
            }}
          />
          <span
            style={{
              fontSize: "11px",
              color: "rgba(226,232,240,0.80)",
            }}
          >
            {formatted.date}
          </span>
          <span
            style={{
              fontSize: "13px",
              fontWeight: 800,
              color: "#f8fafc",
              letterSpacing: "0.02em",
            }}
          >
            {formatted.time}
          </span>
        </>
      ) : (
        <span style={{ fontSize: "12px", color: "rgba(226,232,240,0.78)" }}>--:--</span>
      )}
    </div>
  );
}
