"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { masterExhibits } from "../../data/masterExhibits";
import ClassificationBadge from "../../components/common/ClassificationBadge";
import DivisionSidebar from "../../components/DivisionSidebar";
import { useSectionAssets } from "../../hooks/useSectionAssets";

type SubdivisionTab = "all" | "mkam" | "soi" | "robotika" | "tikshoret";

const TABS: { id: SubdivisionTab; label: string }[] = [
  { id: "all",       label: "הכל" },
  { id: "mkam",      label: 'מכ"ם' },
  { id: "soi",       label: "מערכת SOI" },
  { id: "robotika",  label: "רובוטיקה" },
  { id: "tikshoret", label: "תקשורת" },
];

const baseAssets = masterExhibits
  .filter((e) => e.division === "elta")
  .map((e, i) => ({
    id: `elta-${String(i + 1).padStart(3, "0")}`,
    slug: e.slug,
    name: e.nameEn,
    category: "ELTA asset",
    subtitle: `${e.nameEn} — ELTA exhibition asset.`,
    image: e.image,
    model3d: e.model3d,
    status: "Approved",
    displayType: "ELTA display",
    scale: "1:1",
  }));

const slugToSubdivision = new Map(
  masterExhibits
    .filter((e) => e.division === "elta")
    .map((e) => [e.slug, e.subdivision ?? ""])
);

type EltaAsset = typeof baseAssets[number];

export default function NavalPage() {
  const [activeTab, setActiveTab] = useState<SubdivisionTab>("all");

  const {
    assets: liveAssets,
    saveAsset,
    removeAsset,
  } = useSectionAssets("naval", baseAssets);

  const tabAssets = useMemo(
    () =>
      activeTab === "all"
        ? liveAssets
        : liveAssets.filter((a) => slugToSubdivision.get(a.slug) === activeTab),
    [liveAssets, activeTab]
  );

  function handleEdit(asset: EltaAsset) {
    const name = window.prompt("Name", asset.name);
    if (name === null) return;
    const category = window.prompt("Category", asset.category);
    if (category === null) return;
    const subtitle = window.prompt("Subtitle", asset.subtitle);
    if (subtitle === null) return;
    const status = window.prompt("Status", asset.status);
    if (status === null) return;
    saveAsset({ ...asset, name, category, subtitle, status });
  }

  function handleReset(slug: string) {
    const ok = window.confirm("Reset this asset back to its original base data?");
    if (!ok) return;
    removeAsset(slug);
  }

  return (
    <div className="flex min-h-screen bg-[#070b17] text-white">
      <DivisionSidebar activeHref="/naval" />
      <main className="flex-1 overflow-auto px-4 py-8 md:px-8">
      <div className="mx-auto flex max-w-[1850px] flex-col gap-8">

        <section className="rounded-[34px] border border-cyan-300/20 bg-[radial-gradient(circle_at_top,rgba(32,80,170,0.28),rgba(11,18,39,1)_55%)] p-8 shadow-[0_0_50px_rgba(24,119,242,0.12)] md:p-10">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-4xl">
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">
                Exhibition Platform
              </p>
              <h1 className="mt-2 text-4xl font-extrabold md:text-5xl">
                חטיבת אלתא
              </h1>
              <p className="mt-4 text-sm leading-7 text-slate-300 md:text-base">
                Browse all ELTA division assets — radars, SOI systems, robotics, and communications — organized by subdivision.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/" className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                  ← Back to Main
                </Link>
                <Link href="/land" className="rounded-xl border border-cyan-400/40 bg-cyan-400/10 px-5 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/20">
                  Go to KATAZ
                </Link>
              </div>
            </div>
            <div className="grid min-w-[280px] gap-3 sm:grid-cols-2">
              <QuickPill label="Division" value="ELTA" />
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
        </section>

        {tabAssets.length === 0 ? (
          <section className="rounded-[28px] border border-white/10 bg-white/[0.03] p-8 text-center">
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">No assets in this subdivision</p>
            <h2 className="mt-3 text-2xl font-bold text-white">Switch tabs or add a new exhibit</h2>
          </section>
        ) : (
          <section className="grid gap-8 sm:grid-cols-2 2xl:grid-cols-3">
            {tabAssets.map((asset: EltaAsset) => (
              <div
                key={asset.slug}
                className="rounded-[28px] border border-white/8 bg-white/[0.02] p-3 shadow-[0_10px_35px_rgba(0,0,0,0.22)]"
              >
                <Link
                  href={`/naval/${asset.slug}`}
                  className="group flex min-h-[620px] flex-col overflow-hidden rounded-[32px] border border-cyan-300/20 bg-[#0b1227] shadow-[0_0_40px_rgba(24,119,242,0.10)] transition duration-200 hover:-translate-y-1 hover:border-cyan-300/40 hover:shadow-[0_0_60px_rgba(24,119,242,0.18)]"
                >
                  <div className="border-b border-cyan-300/15 bg-[#081226] p-5">
                    <div className="relative overflow-hidden rounded-[24px] border border-cyan-300/20 bg-black/20 p-3">
                      <img
                        src={asset.image}
                        alt={`${asset.name} showcase`}
                        className="h-[360px] w-full rounded-[18px] object-contain object-center p-4 transition duration-300 group-hover:scale-[1.01]"
                      />
                    </div>
                    <div className="mt-3 flex flex-wrap justify-end gap-2 px-2 pb-1">
                      <span className="inline-flex rounded-full border border-[rgba(92,214,126,0.35)] bg-[rgba(92,214,126,0.14)] px-2.5 py-1 text-[11px] text-[#9df0b2]">
                        {asset.status}
                      </span>
                      <span className="inline-flex rounded-full border border-[rgba(93,214,255,0.35)] bg-[rgba(93,214,255,0.14)] px-2.5 py-1 text-[11px] text-[#8fe7ff]">
                        {asset.displayType}
                      </span>
                      <span className="inline-flex rounded-full border border-[rgba(255,255,255,0.18)] bg-[rgba(255,255,255,0.06)] px-2.5 py-1 text-[11px] text-[#e7ecff]">
                        {asset.scale}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col gap-4 p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.3em] text-cyan-300">
                          Featured Asset
                        </p>
                        <h2 className="mt-2 text-3xl font-extrabold leading-none">
                          {asset.name}
                        </h2>
                        <p className="mt-2 text-sm text-slate-400">{asset.id}</p>
                      </div>
                      <span className="shrink-0 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold text-white">
                        View
                      </span>
                    </div>
                    <p className="text-sm font-medium leading-6 text-slate-200">
                      {asset.subtitle}
                    </p>
                    <p className="text-sm leading-7 text-slate-400">
                      {asset.category}
                    </p>
                    <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-4 text-sm text-slate-300">
                      <span>Open Asset Page</span>
                      <span className="font-semibold text-white">
                        /naval/{asset.slug}
                      </span>
                    </div>
                  </div>
                </Link>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-amber-300/30 bg-gradient-to-r from-amber-300/12 via-yellow-200/8 to-amber-300/12 px-3 py-3 shadow-[0_0_28px_rgba(251,191,36,0.12)]">
                  <div className="inline-flex items-center rounded-full border border-amber-300/40 bg-amber-300/10 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.22em] text-amber-100 shadow-[0_0_18px_rgba(251,191,36,0.16)]">
                    LIVE ELTA EDIT
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
    </div>
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
