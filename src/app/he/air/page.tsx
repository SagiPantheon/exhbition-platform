"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import ClassificationBadge from "../../../components/common/ClassificationBadge";
import { getAllAirAssets } from "../../../lib/air-utils";
import AirAssetCard from "../../../components/cards/AirAssetCard";

type MissionFilter = "defense" | "strike";
type CategoryFilter =
  | "all"
  | "missile"
  | "launcher"
  | "uav"
  | "quadcopter"
  | "radar"
  | "communications";

export default function HebrewAirPage() {
  const [activeMission, setActiveMission] = useState<MissionFilter>("defense");
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const liveAirAssets = getAllAirAssets();

  const filteredAssets = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    const airOrder = ["arrow-2", "arrow-3-launcher", "lora", "mmr", "wanderb2"];

    return liveAirAssets
      .filter((asset: any) => {
        const mission = asset.missionType === "strike" ? "strike" : "defense";
        const matchesMission = mission === activeMission;
        const matchesCategory =
          activeCategory === "all" ? true : asset.assetCategory === activeCategory;

        const haystack = [
          asset.title?.he ?? "",
          asset.title?.en ?? "",
          asset.code ?? "",
          asset.subtitle?.he ?? "",
          asset.subtitle?.en ?? "",
          asset.description?.he ?? "",
          asset.description?.en ?? "",
          asset.assetCategory ?? "",
          asset.missionType ?? "",
          asset.slug ?? "",
        ]
          .join(" ")
          .toLowerCase();

        const matchesSearch = query.length === 0 ? true : haystack.includes(query);

        return matchesMission && matchesCategory && matchesSearch;
      })
      .sort((a: any, b: any) => {
        const ai = airOrder.indexOf(a.slug);
        const bi = airOrder.indexOf(b.slug);

        if (ai === -1 && bi === -1) return 0;
        if (ai === -1) return 1;
        if (bi === -1) return -1;
        return ai - bi;
      });
  }, [liveAirAssets, activeMission, activeCategory, searchTerm]);

  return (
    <main dir="rtl" className="min-h-screen bg-[#070b17] px-4 py-8 text-white md:px-8">
      <div className="mx-auto flex max-w-[1850px] flex-col gap-8">
        <section className="rounded-[34px] border border-cyan-300/20 bg-[radial-gradient(circle_at_top,rgba(32,80,170,0.28),rgba(11,18,39,1)_55%)] p-8 shadow-[0_0_50px_rgba(24,119,242,0.12)] md:p-10">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-4xl">
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">
                Exhibition Platform
              </p>

              <h1 className="mt-2 text-4xl font-extrabold md:text-5xl">
                קטלוג אוויר
              </h1>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-base">
                פלטפורמה מסודרת להצגת מוצגים אוויריים, סינון לפי משימה וקטגוריה,
                וחיפוש מהיר בין טילים, משגרים, מכ״מים, כטב״מים ומערכות תצוגה.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/he"
                  className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  חזרה לראשי
                </Link>

                <Link
                  href="/he/space"
                  className="rounded-xl border border-cyan-400/40 bg-cyan-400/10 px-5 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/20"
                >
                  מעבר לחלל
                </Link>
              </div>
            </div>

            <div className="grid min-w-[280px] gap-3 sm:grid-cols-2">
              <QuickPill label="קטגוריה" value="אוויר" />
              <QuickPill label="פריטים מוצגים" value={`${filteredAssets.length}`} />
              <QuickPill label="סה״כ מוצגים" value={`${liveAirAssets.length}`} />
              <QuickPill label="סטטוס" value="מוכן" />
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-4 rounded-[28px] border border-cyan-300/15 bg-white/[0.02] p-5">
          <div className="flex flex-wrap gap-3">
            <FilterButton
              label="הגנה"
              active={activeMission === "defense"}
              onClick={() => setActiveMission("defense")}
            />
            <FilterButton
              label="תקיפה"
              active={activeMission === "strike"}
              onClick={() => setActiveMission("strike")}
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <FilterButton label="הכל" active={activeCategory === "all"} onClick={() => setActiveCategory("all")} subtle />
            <FilterButton label="טילים" active={activeCategory === "missile"} onClick={() => setActiveCategory("missile")} subtle />
            <FilterButton label="משגרים" active={activeCategory === "launcher"} onClick={() => setActiveCategory("launcher")} subtle />
            <FilterButton label='כטב״מים' active={activeCategory === "uav"} onClick={() => setActiveCategory("uav")} subtle />
            <FilterButton label="רחפנים" active={activeCategory === "quadcopter"} onClick={() => setActiveCategory("quadcopter")} subtle />
            <FilterButton label='מכ״מים' active={activeCategory === "radar"} onClick={() => setActiveCategory("radar")} subtle />
            <FilterButton label="תקשורת" active={activeCategory === "communications"} onClick={() => setActiveCategory("communications")} subtle />
          </div>

          <div className="max-w-[420px]">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="חיפוש מוצגים..."
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-400 focus:border-cyan-400/50 focus:bg-white/[0.07]"
            />
          </div>
        </section>

        {filteredAssets.length === 0 ? (
          <section className="rounded-[28px] border border-white/10 bg-white/[0.03] p-8 text-center">
            <div className="mx-auto max-w-2xl">
              <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">
                אין תוצאות
              </p>
              <h2 className="mt-3 text-2xl font-bold text-white">
                שנה את הסינון כדי להמשיך
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-300 md:text-base">
                הקטלוג תומך בסינון לפי הגנה או תקיפה, לפי קטגוריה, ובחיפוש חופשי.
              </p>
            </div>
          </section>
        ) : (
          <section className="grid gap-8 sm:grid-cols-2 2xl:grid-cols-3">
            {filteredAssets.map((asset: any) => (
              <AirAssetCard
                key={asset.slug}
                asset={asset}
                locale="he"
                basePath="/he/air"
                featuredLabel="נכס מוביל"
                viewLabel="צפייה"
                badgesAlign="end"
              />
            ))}
          </section>
        )}
      </div>
      <ClassificationBadge label="בלמ״ס" />
    </main>
  );
}

function FilterButton({
  label,
  active,
  onClick,
  subtle = false,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  subtle?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl border px-5 py-3 text-sm font-semibold transition ${
        active
          ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-100 hover:bg-cyan-400/20"
          : subtle
            ? "border-white/10 bg-white/[0.03] text-slate-200 hover:bg-white/[0.08]"
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
