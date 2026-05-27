"use client";

import { useState } from "react";
import Link from "next/link";
import ClassificationBadge from "../../../components/common/ClassificationBadge";
import AirAssetCard from "../../../components/cards/AirAssetCard";
import { masterExhibits, toAirAsset, type AirAsset } from "../../../data/masterExhibits";
import { useSectionAssets } from "../../../hooks/useSectionAssets";

type DivisionTab = "mtach" | "elta" | "kataz" | "teufa";

const TABS: { id: DivisionTab; label: string }[] = [
  { id: "mtach", label: 'מט"ח' },
  { id: "elta",  label: "אלתא" },
  { id: "kataz", label: 'כט"צ' },
  { id: "teufa", label: "תעופה" },
];

const baseAssets = masterExhibits
  .filter((e) => e.division !== "inventory")
  .map(toAirAsset);

export default function HebrewAirPage() {
  const [activeTab, setActiveTab] = useState<DivisionTab>("mtach");

  const { assets: liveAssets } = useSectionAssets("air", baseAssets);

  const tabAssets = liveAssets.filter((a: AirAsset) => {
    const e = masterExhibits.find((m) => m.slug === a.slug);
    return e?.division === activeTab;
  });

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
              <p className="mt-4 text-sm leading-7 text-slate-300 md:text-base">
                כלל הנכסים האוויריים — הגנה, תקיפה, כטב״מים, מכ״מים ותעופה — מאורגנים לפי חטיבה.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/he" className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                  חזרה לראשי
                </Link>
                <Link href="/he/space" className="rounded-xl border border-cyan-400/40 bg-cyan-400/10 px-5 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/20">
                  מעבר לחלל
                </Link>
                <Link href="/air" className="rounded-xl border border-cyan-400/40 bg-cyan-400/10 px-5 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/20">
                  English
                </Link>
              </div>
            </div>
            <div className="grid min-w-[280px] gap-3 sm:grid-cols-2">
              <QuickPill label="קטגוריה" value="אוויר" />
              <QuickPill label="פריטים" value={`${tabAssets.length} נכסים`} />
              <QuickPill label="חוויה" value="קטלוג ידידותי" />
              <QuickPill label="סטטוס" value="מוכן" />
            </div>
          </div>
        </section>

        <section className="flex flex-wrap items-center gap-3">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-xl border px-6 py-3 text-sm font-bold transition ${
                activeTab === tab.id
                  ? "border-cyan-400/50 bg-cyan-400/15 text-cyan-100"
                  : "border-white/15 bg-white/5 text-slate-300 hover:bg-white/10"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </section>

        {tabAssets.length === 0 ? (
          <section className="rounded-[28px] border border-white/10 bg-white/[0.03] p-8 text-center">
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">אין נכסים בחטיבה זו</p>
            <h2 className="mt-3 text-2xl font-bold text-white">עבור לטאב אחר</h2>
          </section>
        ) : (
          <section className="grid gap-8 sm:grid-cols-2 2xl:grid-cols-3">
            {tabAssets.map((asset: AirAsset) => (
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
      <ClassificationBadge label='בלמ״ס' />
    </main>
  );
}

function QuickPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-cyan-300/15 bg-white/[0.04] p-4">
      <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">{label}</p>
      <p className="mt-2 text-lg font-bold text-white">{value}</p>
    </div>
  );
}
