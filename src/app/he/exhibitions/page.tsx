import Link from "next/link";

export default function HebrewExhibitionsPage() {
  return (
    <main dir="rtl" className="min-h-screen bg-[#070b17] px-4 py-8 text-white md:px-8">
      <div className="mx-auto max-w-[1400px] rounded-[32px] border border-emerald-300/20 bg-[#0b1227] p-8 shadow-[0_0_50px_rgba(16,185,129,0.12)]">
        <p className="text-sm uppercase tracking-[0.35em] text-emerald-300">Exhibition Platform</p>
        <h1 className="mt-4 text-4xl font-extrabold md:text-5xl">תערוכות</h1>
        <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-300 md:text-base">
          אזור תכנון תערוכות עבור בקשות, פריסות, ספקים, אישורים ושילוב מוצגים.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/he"
            className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-white transition hover:bg-white/10"
          >
            חזרה לראשי
          </Link>

          <Link
            href="/he/space"
            className="rounded-xl border border-cyan-400/40 bg-cyan-400/10 px-5 py-3 text-cyan-100 transition hover:bg-cyan-400/20"
          >
            מעבר לנכסי חלל
          </Link>
        </div>
      </div>
    </main>
  );
}
