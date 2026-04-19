"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import ClassificationBadge from "../../../components/common/ClassificationBadge";
import { getAllAirAssets } from "../../../lib/air-utils";

type CategoryFilter =
  | "all"
  | "missile"
  | "launcher"
  | "uav"
  | "quadcopter"
  | "radar"
  | "communications";

const allAirAssets = getAllAirAssets();

export default function HebrewAirPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAssets = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return allAirAssets.filter((asset) => {
      const matchesCategory =
        activeCategory === "all" ? true : asset.assetCategory === activeCategory;

      if (!matchesCategory) return false;

      if (!q) return true;

      const haystack = JSON.stringify({
        slug: asset.slug,
        code: asset.code,
        title: asset.title,
        subtitle: asset.subtitle,
        description: asset.description,
        status: asset.status,
        config: asset.config,
        readiness: asset.readiness,
      }).toLowerCase();

      return haystack.includes(q);
    });
  }, [activeCategory, searchQuery]);

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#070b17] px-4 py-8 text-white md:px-8"
    >
      <div className="mx-auto flex max-w-[1600px] flex-col gap-8">
        <section className="rounded-[34px] border border-cyan-300/20 bg-[radial-gradient(circle_at_top,rgba(32,80,170,0.28),rgba(11,18,39,1)_55%)] p-8 shadow-[0_0_50px_rgba(24,119,242,0.12)] md:p-10">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-4xl">
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">
                Air Assets
              </p>
              <h1 className="mt-2 text-4xl font-extrabold md:text-5xl">
                קטלוג אוויר
              </h1>
              <p className="mt-3 text-lg text-slate-300">
                כל המוצגים האוויריים, כולל טילים, משגרים, מכ&quot;מים ומערכות תצוגה.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/he"
                  className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  חזרה לראשי
                </Link>

                <Link
                  href="/he/exhibitions/israel"
                  className="rounded-xl border border-cyan-400/40 bg-cyan-400/10 px-5 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/20"
                >
                  מעבר לתערוכות
                </Link>
              </div>
            </div>

            <div className="grid min-w-[280px] gap-3 sm:grid-cols-2">
              <QuickPill label="סה״כ פריטים" value={String(allAirAssets.length)} />
              <QuickPill label="מוצגים מוצגים" value={String(filteredAssets.length)} />
              <QuickPill label="קטגוריות" value="אוויר" />
              <QuickPill label="שפה" value="עברית" />
            </div>
          </div>
        </section>

        <section className="rounded-[30px] border border-cyan-300/20 bg-[#0b1227] p-6 shadow-[0_0_40px_rgba(24,119,242,0.10)]">
          <div className="mb-6 flex flex-wrap gap-3">
            <FilterButton
              label="הכל"
              active={activeCategory === "all"}
              onClick={() => setActiveCategory("all")}
            />
            <FilterButton
              label="טילים"
              active={activeCategory === "missile"}
              onClick={() => setActiveCategory("missile")}
            />
            <FilterButton
              label="משגרים"
              active={activeCategory === "launcher"}
              onClick={() => setActiveCategory("launcher")}
            />
            <FilterButton
              label='מכ"מים'
              active={activeCategory === "radar"}
              onClick={() => setActiveCategory("radar")}
            />
            <FilterButton
              label='כטב"מים'
              active={activeCategory === "uav"}
              onClick={() => setActiveCategory("uav")}
            />
            <FilterButton
              label="רחפנים"
              active={activeCategory === "quadcopter"}
              onClick={() => setActiveCategory("quadcopter")}
            />
            <FilterButton
              label="תקשורת"
              active={activeCategory === "communications"}
              onClick={() => setActiveCategory("communications")}
            />
          </div>

          <div className="mb-6">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="חיפוש מוצגים..."
              className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-white outline-none placeholder:text-slate-400"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredAssets.map((asset) => (
              <article
                key={asset.slug}
                className="overflow-hidden rounded-[28px] border border-cyan-300/20 bg-[linear-gradient(180deg,rgba(12,24,48,0.96),rgba(7,14,28,0.98))] shadow-[0_0_30px_rgba(24,119,242,0.10)]"
              >
                <div className="overflow-hidden border-b border-cyan-300/10 bg-black/20 p-4">
                  <img
                    src={asset.image}
                    alt={asset.title.he}
                    className="h-[240px] w-full rounded-[20px] object-contain"
                  />
                </div>

                <div className="p-5">
                  <div className="mb-3 flex flex-wrap gap-2">
                    <Badge text={asset.status.he} />
                    <Badge text={asset.config.he} subtle />
                    <Badge text={asset.scale} subtle />
                  </div>

                  <p className="text-[11px] uppercase tracking-[0.28em] text-cyan-300">
                    נכס מוביל
                  </p>

                  <h2 className="mt-2 text-2xl font-extrabold text-white">
                    {asset.title.he}
                  </h2>

                  <p className="mt-2 text-sm text-slate-300">{asset.subtitle.he}</p>
                  <p className="mt-4 text-sm leading-7 text-slate-300">
                    {asset.description.he}
                  </p>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <MiniSpec label="אורך" value={asset.specs.length} />
                    <MiniSpec label="רוחב" value={asset.specs.width} />
                    <MiniSpec label="גובה" value={asset.specs.height} />
                    <MiniSpec label="משקל" value={asset.specs.weight} />
                  </div>

                  <div className="mt-5">
                    <Link
                      href={`/he/air/${asset.slug}`}
                      className="inline-flex items-center justify-center rounded-xl border border-cyan-400/50 bg-cyan-400/10 px-4 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/20"
                    >
                      צפייה
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      <ClassificationBadge label='סמב"ל' />
    </main>
  );
}

function FilterButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl border px-5 py-3 text-sm font-semibold transition ${
        active
          ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-100 hover:bg-cyan-400/20"
          : "border-white/15 bg-white/5 text-white hover:bg-white/10"
      }`}
    >
      {label}
    </button>
  );
}

function QuickPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-cyan-300/15 bg-white/[0.04] p-4">
      <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
        {label}
      </p>
      <p className="mt-2 text-lg font-bold text-white">{value}</p>
    </div>
  );
}

function Badge({ text, subtle = false }: { text: string; subtle?: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${
        subtle
          ? "border-white/15 bg-white/[0.05] text-slate-200"
          : "border-cyan-400/40 bg-cyan-400/10 text-cyan-100"
      }`}
    >
      {text}
    </span>
  );
}

function MiniSpec({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
        {label}
      </p>
      <p className="mt-2 text-lg font-bold text-white">{value}</p>
    </div>
  );
}
