"use client";

import { useEffect, useMemo, useState } from "react";

export default function TentsInlineStatusChip() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatted = useMemo(() => {
    return {
      day: new Intl.DateTimeFormat("en-GB", { weekday: "short" }).format(now).toUpperCase(),
      date: new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short" }).format(now),
      time: new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(now),
    };
  }, [now]);

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        padding: "6px 10px",
        borderRadius: "999px",
        border: "1px solid rgba(125,211,252,0.22)",
        background: "rgba(8,15,28,0.72)",
        boxShadow: "0 6px 18px rgba(0,0,0,0.14)",
        color: "#f8fbff",
        whiteSpace: "nowrap",
      }}
    >
      <span
        style={{
          fontSize: "10px",
          fontWeight: 800,
          letterSpacing: "0.08em",
          color: "#7dd3fc",
        }}
      >
        {formatted.day}
      </span>

      <span
        style={{
          width: "1px",
          height: "12px",
          background: "rgba(148,163,184,0.28)",
        }}
      />

      <span
        style={{
          fontSize: "11px",
          fontWeight: 700,
          color: "rgba(226,232,240,0.88)",
        }}
      >
        {formatted.date}
      </span>

      <span
        style={{
          fontSize: "12px",
          fontWeight: 800,
          color: "#ffffff",
        }}
      >
        {formatted.time}
      </span>
    </div>
  );
}
