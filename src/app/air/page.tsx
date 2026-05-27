"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import AirAssetCard from "../../components/cards/AirAssetCard";
import ClassificationBadge from "../../components/common/ClassificationBadge";
import { masterExhibits, toAirAsset, type AirAsset } from "../../data/masterExhibits";
import { useSectionAssets } from "../../hooks/useSectionAssets";

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

const slugToDivision = new Map(
  masterExhibits
    .filter((e) => e.division !== "inventory")
    .map((e) => [e.slug, e.division])
);

export default function AirPage() {
  const [activeTab, setActiveTab] = useState<DivisionTab>("mtach");

  const { assets: liveAssets, saveAsset, removeAsset } = useSectionAssets("air", baseAssets);

  const tabAssets = useMemo(
    () => liveAssets.filter((a) => slugToDivision.get(a.slug) === activeTab),
    [liveAssets, activeTab]
  );

  function handleEdit(asset: AirAsset) {
    const titleEn = window.prompt("Title EN", asset.title.en);
    if (titleEn === null) return;
    const titleHe = window.prompt("Title HE", asset.title.he);
    if (titleHe === null) return;
    const subtitleEn = window.prompt("Subtitle EN", asset.subtitle.en);
    if (subtitleEn === null) return;
    const subtitleHe = window.prompt("Subtitle HE", asset.subtitle.he);
    if (subtitleHe === null) return;
    const statusEn = window.prompt("Status EN", asset.status.en);
    if (statusEn === null) return;
    const statusHe = window.prompt("Status HE", asset.status.he);
    if (statusHe === null) return;
    const configEn = window.prompt("Config EN", asset.config.en);
    if (configEn === null) return;
    const configHe = window.prompt("Config HE", asset.config.he);
    if (configHe === null) return;
    saveAsset({
      ...asset,
      title: { en: titleEn, he: titleHe },
      subtitle: { en: subtitleEn, he: subtitleHe },
      status: { en: statusEn, he: statusHe },
      config: { en: configEn, he: configHe },
    });
  }

  function handleReset(slug: string) {
    const ok = window.confirm("Reset this asset back to its original base data?");
    if (!ok) return;
    removeAsset(slug);
  }

  function handleAddNew() {
    const slug = window.prompt("New exhibit slug (unique ID):");
    if (!slug?.trim()) return;
    const titleEn = window.prompt("Title EN") ?? "";
    const titleHe = window.prompt("Title HE") ?? "";
    saveAsset({
      slug: slug.trim(),
      code: "",
      image: "",
      title: { en: titleEn, he: titleHe },
      subtitle: { en: "", he: "" },
      description: { en: "", he: "" },
      status: { en: "Approved", he: "מאושר" },
      config: { en: "Display", he: "תצוגה" },
      scale: "1:1",
      specs: { height: "TBD", width: "TBD", length: "TBD", weight: "TBD", standDiameter: "N/A", standWeight: "N/A" },
      readiness: {
        environment: { en: "Indoor / Outdoor", he: "פנים / חוץ" },
        displayMethod: { en: "Static display", he: "תצוגה סטטית" },
        support: { en: "Self-standing", he: "עצמאי" },
        presentationLevel: { en: "Standard", he: "סטנדרטי" },
        visualLanguage: { en: "Showcase", he: "תצוגה" },
      },
    });
  }

  return (
    <main className="min-h-screen bg-[#070b17] px-4 py-8 text-white md:px-8">
      <div className="mx-auto flex max-w-[1850px] flex-col gap-8">
        <section className="rounded-[34px] border border-cyan-300/20 bg-[radial-gradient(circle_at_top,rgba(32,80,170,0.28),rgba(11,18,39,1)_55%)] p-8 shadow-[0_0_50px_rgba(24,119,242,0.12)] md:p-10">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-4xl">
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">
                Exhibition Platform
              </p>
              <h1 className="mt-2 text-4xl font-extrabold md:text-5xl">
                Air Assets
              </h1>
              <p className="mt-4 text-sm leading-7 text-slate-300 md:text-base">
                Browse the full catalog of air defense, strike, UAV, radar, and aviation assets — organized by division.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/" className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                  ← Back to Main
                </Link>
                <Link href="/space" className="rounded-xl border border-cyan-400/40 bg-cyan-400/10 px-5 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/20">
                  Go to Space
                </Link>
                <Link href="/he/air" className="rounded-xl border border-cyan-400/40 bg-cyan-400/10 px-5 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/20">
                  עברית
                </Link>
              </div>
            </div>
            <div className="grid min-w-[280px] gap-3 sm:grid-cols-2">
              <QuickPill label="Category" value="Air" />
              <QuickPill label="Items" value={`${tabAssets.length} Assets`} />
              <QuickPill label="Experience" value="Friendly Catalog" />
              <QuickPill label="Status" value="Ready" />
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
          <button
            type="button"
            onClick={handleAddNew}
            className="rounded-xl border border-emerald-400/40 bg-emerald-400/10 px-5 py-3 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-400/20"
          >
            + הוסף תצוגה
          </button>
        </section>

        {tabAssets.length === 0 ? (
          <section className="rounded-[28px] border border-white/10 bg-white/[0.03] p-8 text-center">
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">No assets in this division</p>
            <h2 className="mt-3 text-2xl font-bold text-white">Switch tabs or add a new exhibit</h2>
          </section>
        ) : (
          <section className="grid gap-8 sm:grid-cols-2 2xl:grid-cols-3">
            {tabAssets.map((asset: AirAsset) => (
              <div
                key={asset.slug}
                className="rounded-[28px] border border-white/8 bg-white/[0.02] p-3 shadow-[0_10px_35px_rgba(0,0,0,0.22)]"
              >
                <AirAssetCard
                  asset={asset}
                  locale="en"
                  basePath="/air"
                  featuredLabel="Featured Asset"
                  viewLabel="View"
                  badgesAlign="end"
                />
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-amber-300/30 bg-gradient-to-r from-amber-300/12 via-yellow-200/8 to-amber-300/12 px-3 py-3 shadow-[0_0_28px_rgba(251,191,36,0.12)]">
                  <div className="inline-flex items-center rounded-full border border-amber-300/40 bg-amber-300/10 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.22em] text-amber-100 shadow-[0_0_18px_rgba(251,191,36,0.16)]">
                    LIVE AIR EDIT
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleEdit(asset)}
                      className="rounded-2xl border border-amber-200/70 bg-gradient-to-r from-amber-300/30 via-yellow-200/20 to-amber-300/30 px-5 py-2.5 text-sm font-extrabold tracking-[0.04em] text-amber-50 shadow-[0_0_0_1px_rgba(255,220,120,0.18),0_0_28px_rgba(251,191,36,0.24)] transition duration-200 hover:-translate-y-[1px] hover:border-amber-100/90 hover:from-amber-300/40 hover:to-yellow-200/30 hover:shadow-[0_0_0_1px_rgba(255,235,160,0.28),0_0_36px_rgba(251,191,36,0.34)]"
                    >
                      ערוך
                    </button>
                    <button
                      type="button"
                      onClick={() => handleReset(asset.slug)}
                      className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </section>
        )}
      </div>
      <ClassificationBadge label="Unclassified" />
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
