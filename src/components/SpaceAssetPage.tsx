import Link from "next/link";
import type { SpaceAsset } from "../data/spaceAssets";

type Props = {
  asset: SpaceAsset;
  locale?: "en" | "he";
};

export default function SpaceAssetPage({ asset, locale = "en" }: Props) {
  const isHe = locale === "he";

  const labels = isHe
    ? {
        topLabel: "נכס מוביל",
        backMain: "חזרה לראשי",
        backSpace: "חזרה לנכסי חלל",
        goExhibitions: "מעבר לתערוכות",
        addToExhibition: "הוסף לתערוכה",
        viewDetails: "צפה בפרטי נכס",
        overallHeight: "גובה כללי",
        mockupWidth: "רוחב דגם",
        mockupLength: "אורך דגם",
        mockupWeight: "משקל דגם",
        standDiameter: "קוטר בסיס",
        standWeight: "משקל בסיס",
        opReadiness: "מוכנות תפעולית",
        environment: "סביבה",
        displayMethod: "שיטת תצוגה",
        support: "תמיכה",
        presentationLevel: "רמת תצוגה",
        visualLanguage: "שפה חזותית",
      }
    : {
        topLabel: "Featured Asset",
        backMain: "Back to Main",
        backSpace: "Back to Space Assets",
        goExhibitions: "Go to Exhibitions",
        addToExhibition: "Add to Exhibition",
        viewDetails: "View Asset Details",
        overallHeight: "Overall Height",
        mockupWidth: "Mock-up Width",
        mockupLength: "Mock-up Length",
        mockupWeight: "Mock-up Weight",
        standDiameter: "Stand Diameter",
        standWeight: "Stand Weight",
        opReadiness: "Operational Readiness",
        environment: "Environment",
        displayMethod: "Display Method",
        support: "Support",
        presentationLevel: "Presentation Level",
        visualLanguage: "Visual Language",
      };

  const title = isHe ? asset.titleHe : asset.title;
  const subtitle = isHe ? asset.subtitleHe : asset.subtitle;
  const description = isHe ? asset.descriptionHe : asset.description;
  const status = isHe ? asset.statusHe : asset.status;
  const config = isHe ? asset.configHe : asset.config;
  const environment = isHe ? asset.environmentHe : asset.environment;
  const displayMethod = isHe ? asset.displayMethodHe : asset.displayMethod;
  const support = isHe ? asset.supportHe : asset.support;
  const presentationLevel = isHe ? asset.presentationLevelHe : asset.presentationLevel;
  const visualLanguage = isHe ? asset.visualLanguageHe : asset.visualLanguage;

  const mainHref = isHe ? "/he" : "/";
  const spaceHref = isHe ? "/he/space" : "/space";
  const exhibitionsHref = isHe ? "/he/exhibitions" : "/exhibitions";

  return (
    <main
      dir={isHe ? "rtl" : "ltr"}
      className="min-h-screen bg-[#070b17] px-4 py-8 text-white md:px-8"
    >
      <div className="mx-auto flex max-w-[1800px] flex-col gap-6">
        <div className="flex flex-wrap items-center gap-3 text-sm font-medium">
          <Link
            href={mainHref}
            className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-white transition hover:bg-white/10"
          >
            {isHe ? "← " : "← "}{labels.backMain}
          </Link>

          <Link
            href={spaceHref}
            className="rounded-xl border border-cyan-400/40 bg-cyan-400/10 px-5 py-3 text-cyan-100 transition hover:bg-cyan-400/20"
          >
            {labels.backSpace}
          </Link>

          <Link
            href={exhibitionsHref}
            className="rounded-xl border border-emerald-400/40 bg-emerald-400/10 px-5 py-3 text-emerald-100 transition hover:bg-emerald-400/20"
          >
            {labels.goExhibitions}
          </Link>
        </div>

        <section className="grid gap-4 xl:grid-cols-[1.35fr_0.9fr_0.9fr]">
          <div className="rounded-[30px] border border-cyan-300/20 bg-[#081226] p-4 shadow-[0_0_40px_rgba(24,119,242,0.14)]">
            <div className="overflow-hidden rounded-[24px] border border-cyan-300/20 bg-black/20 p-3">
              <img
                src={asset.image}
                alt={`${asset.title} showcase`}
                className="h-[760px] w-full rounded-[18px] object-cover object-center"
              />
            </div>
          </div>

          <div className="rounded-[30px] border border-cyan-300/20 bg-[#0b1227] p-6 shadow-[0_0_40px_rgba(24,119,242,0.12)]">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] text-cyan-300">
                  {labels.topLabel}
                </p>
                <h1 className="mt-2 text-4xl font-extrabold leading-none">{title}</h1>
                <p className="mt-2 text-sm text-slate-400">{asset.code}</p>
              </div>

              <div className="flex flex-col items-end gap-2 text-xs font-semibold">
                <span className="rounded-full border border-lime-300/30 bg-lime-400/20 px-3 py-1 text-lime-100">
                  {status}
                </span>
                <span className="rounded-full border border-cyan-300/30 bg-cyan-400/20 px-3 py-1 text-cyan-100">
                  {config}
                </span>
                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-white">
                  {asset.scale}
                </span>
              </div>
            </div>

            <p className="mb-5 text-sm leading-7 text-slate-300">{description}</p>

            <div className="grid gap-3 sm:grid-cols-2">
              <StatCard label={labels.overallHeight} value={asset.height} />
              <StatCard label={labels.mockupWidth} value={asset.width} />
              <StatCard label={labels.mockupLength} value={asset.length} />
              <StatCard label={labels.mockupWeight} value={asset.weight} />
              <StatCard label={labels.standDiameter} value={asset.standDiameter} />
              <StatCard label={labels.standWeight} value={asset.standWeight} />
            </div>

            <div className="mt-5 rounded-2xl border border-cyan-300/15 bg-white/[0.03] p-4">
              <p className="mb-3 text-[11px] uppercase tracking-[0.25em] text-slate-400">
                {labels.opReadiness}
              </p>

              <div className="space-y-3 text-sm text-slate-300">
                <Row label={labels.environment} value={environment} />
                <Row label={labels.displayMethod} value={displayMethod} />
                <Row label={labels.support} value={support} />
                <Row label={labels.presentationLevel} value={presentationLevel} />
                <div className="flex items-center justify-between gap-4">
                  <span>{labels.visualLanguage}</span>
                  <span className="font-semibold text-white">{visualLanguage}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="rounded-[30px] border border-cyan-300/20 bg-[#0b1227] p-6 shadow-[0_0_40px_rgba(24,119,242,0.12)]">
              <p className="text-[11px] uppercase tracking-[0.3em] text-cyan-300">
                {labels.topLabel}
              </p>
              <h2 className="mt-2 text-3xl font-extrabold">{title}</h2>
              <p className="mt-1 text-sm text-slate-400">{asset.code}</p>

              <div className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                <p>{subtitle}</p>
                <p>{description}</p>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href={exhibitionsHref}
                  className="rounded-xl border border-cyan-300/30 bg-cyan-400/20 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/30"
                >
                  {labels.addToExhibition}
                </Link>

                <Link
                  href={exhibitionsHref}
                  className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  {labels.viewDetails}
                </Link>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-2">
              <StatCard label={labels.overallHeight} value={asset.height} />
              <StatCard label={labels.mockupWidth} value={asset.width} />
              <StatCard label={labels.mockupLength} value={asset.length} />
              <StatCard label={labels.mockupWeight} value={asset.weight} />
              <StatCard label={labels.standDiameter} value={asset.standDiameter} />
              <StatCard label={labels.standWeight} value={asset.standWeight} />
            </div>

            <div className="rounded-[30px] border border-cyan-300/20 bg-[#0b1227] p-6 shadow-[0_0_40px_rgba(24,119,242,0.12)]">
              <p className="mb-3 text-[11px] uppercase tracking-[0.25em] text-slate-400">
                {labels.opReadiness}
              </p>

              <div className="space-y-3 text-sm text-slate-300">
                <Row label={labels.environment} value={environment} />
                <Row label={labels.displayMethod} value={displayMethod} />
                <Row label={labels.support} value={support} />
                <Row label={labels.presentationLevel} value={presentationLevel} />
                <div className="flex items-center justify-between gap-4">
                  <span>{labels.visualLanguage}</span>
                  <span className="font-semibold text-white">{visualLanguage}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-cyan-300/15 bg-white/[0.03] p-4">
      <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">{label}</p>
      <p className="mt-2 text-2xl font-bold">{value}</p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-2">
      <span>{label}</span>
      <span className="font-semibold text-white">{value}</span>
    </div>
  );
}
