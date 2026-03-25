import Link from "next/link";
import { spaceAssets } from "../../data/spaceAssets";
import { uiText } from "../../data/uiText";
import ClassificationBadge from "../../components/common/ClassificationBadge";
import SpaceAssetCard from "../../components/cards/SpaceAssetCard";

export default function SpacePage() {
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
                Space Assets
              </h1>
              <p className="mt-4 text-sm leading-7 text-slate-300 md:text-base">
                Browse the current space asset collection in one clear catalog.
                Each page opens a fuller view with dimensions, display logic,
                and exhibition-ready presentation details.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/"
                  className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  ← Back to Main
                </Link>

                <Link
                  href="/exhibitions"
                  className="rounded-xl border border-emerald-400/40 bg-emerald-400/10 px-5 py-3 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-400/20"
                >
                  Go to Exhibitions
                </Link>

                <Link
                  href="/he/space"
                  className="rounded-xl border border-cyan-400/40 bg-cyan-400/10 px-5 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/20"
                >
                  עברית
                </Link>
              </div>
            </div>

            <div className="grid min-w-[280px] gap-3 sm:grid-cols-2">
              <QuickPill label="Category" value="Space" />
              <QuickPill label="Items" value={`${spaceAssets.length} Assets`} />
              <QuickPill label="Experience" value="Friendly Catalog" />
              <QuickPill label="Status" value="Ready" />
            </div>
          </div>
        </section>

        <section className="grid gap-8 sm:grid-cols-2 2xl:grid-cols-3">
          {spaceAssets.map((asset) => (
            <SpaceAssetCard
              key={asset.slug}
              asset={asset}
              openLabel={uiText.actions.openAssetPage.en}
              featuredLabel="Featured Asset"
              viewLabel="View"
              locale="en"
              basePath="/space"
              badgesAlign="end"
            />
          ))}
        </section>
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