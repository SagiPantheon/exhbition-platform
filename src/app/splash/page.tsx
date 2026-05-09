"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function SplashPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const router = useRouter();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = Array.from({ length: 180 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.8 + 0.3,
      opacity: Math.random() * 0.6 + 0.2,
      speed: Math.random() * 0.3 + 0.1,
      hue: 195 + Math.random() * 30,
      pulse: Math.random() * Math.PI * 2,
    }));

    let frame = 0;
    let animId: number;

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach((s) => {
        s.pulse += 0.02;
        s.y -= s.speed * 0.4;
        if (s.y < -5) s.y = canvas.height + 5;
        const op = s.opacity * (0.7 + 0.3 * Math.sin(s.pulse));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.shadowBlur = 8;
        ctx.shadowColor = `hsla(${s.hue}, 100%, 80%, 0.8)`;
        ctx.fillStyle = `hsla(${s.hue}, 80%, 85%, ${op})`;
        ctx.fill();
      });

      frame++;
      animId = requestAnimationFrame(animate);
    };

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    animId = requestAnimationFrame(animate);

    const t1 = setTimeout(() => setPhase(1), 300);
    const t2 = setTimeout(() => setPhase(2), 1800);

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const router2 = useRouter();

  return (
    <div
      className="relative w-screen h-screen overflow-hidden flex flex-col items-center justify-center"
      style={{ background: "#000" }}
    >
      <canvas ref={canvasRef} className="absolute inset-0" />

      <div className="relative z-10 flex flex-col items-center gap-8" style={{ marginTop: "-60px" }}>
        {/* LOGO */}
        <div
          style={{
            opacity: phase >= 1 ? 1 : 0,
            transform: phase >= 1 ? "scale(1)" : "scale(0.7)",
            transition: "opacity 1.4s ease, transform 1.4s cubic-bezier(0.16,1,0.3,1)",
            filter: phase >= 1
              ? "drop-shadow(0 0 40px rgba(0,160,255,0.8)) drop-shadow(0 0 80px rgba(0,100,255,0.5)) drop-shadow(0 0 120px rgba(0,80,255,0.3))"
              : "none",
          }}
        >
          <img
            src="/covers/iai-white.png"
            alt="IAI"
            style={{ width: 460, height: "auto" }}
          />
        </div>

        {/* TEXT */}
        <div
          className="text-center flex flex-col items-center gap-3"
          style={{
            opacity: phase >= 2 ? 1 : 0,
            transform: phase >= 2 ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 1.5s ease, transform 1.5s ease",
          }}
        >
          <div className="h-px w-64 bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent" />
          <p className="text-cyan-300/70 text-[10px] tracking-[0.6em] uppercase font-light">
            Israel Aerospace Industries
          </p>
          <h1 className="text-white text-[24px] font-extralight tracking-[0.25em]" dir="rtl">
            מערכת ניהול תערוכות
          </h1>
          <p className="text-white/35 text-[10px] tracking-[0.45em] uppercase font-light">
            Exhibition Management Platform
          </p>
          <div className="h-px w-40 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
          <button
            onClick={() => router2.push("/global-exhibit-bank")}
            className="mt-4 px-14 py-3.5 border border-cyan-500/50 text-cyan-200 rounded-full text-[11px] tracking-[0.4em] uppercase font-light hover:border-cyan-300 hover:text-white hover:bg-cyan-400/10 transition-all duration-700"
          >
            כניסה למערכת
          </button>
        </div>
      </div>
    </div>
  );
}
