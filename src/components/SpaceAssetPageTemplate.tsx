import Link from "next/link";
import type { SpaceAsset } from "../data/masterExhibits";
import ModelViewer from "./viewer/ModelViewer";
import QRCodePanel from "./QRCodePanel";

type Props = {
  asset: SpaceAsset;
  locale: "en" | "he";
};

export default function SpaceAssetPageTemplate({ asset, locale }: Props) {
  const isHebrew = locale === "he";

  const t = {
    backMain: isHebrew ? "← חזרה לראשי" : "← Back to Main",
    backSpace: isHebrew ? "חזרה לנכסי חלל" : "Back to Space Assets",
    exhibitions: isHebrew ? "מעבר לתערוכות" : "Go to Exhibitions",
    addToExhibition: isHebrew ? "הוסף לתערוכה" : "Add to Exhibition",
    viewExhibitions: isHebrew ? "מעבר לתערוכות" : "View Exhibitions",
    featuredAsset: isHebrew ? "נכס מוביל" : "Featured Asset",
    profile: isHebrew ? "פרופיל נכס" : "Asset Profile",
    operationalReadiness: isHebrew ? "מוכנות תפעולית" : "Operational Readiness",
    environment: isHebrew ? "סביבה" : "Environment",
    displayMethod: isHebrew ? "שיטת תצוגה" : "Display Method",
    support: isHebrew ? "תמיכה" : "Support",
    presentationLevel: isHebrew ? "רמת תצוגה" : "Presentation Level",
    visualLanguage: isHebrew ? "שפה חזותית" : "Visual Language",
    overallHeight: isHebrew ? "גובה כללי" : "Overall Height",
    width: isHebrew ? "רוחב דגם" : "Mock-up Width",
    length: isHebrew ? "אורך דגם" : "Mock-up Length",
    weight: isHebrew ? "משקל דגם" : "Mock-up Weight",
    standDiameter: isHebrew ? "קוטר בסיס" : "Stand Diameter",
    standWeight: isHebrew ? "משקל בסיס" : "Stand Weight",
  };

  const homeHref = isHebrew ? "/he" : "/";
  const spaceHref = isHebrew ? "/he/space" : "/space";
  const exhibitionsHref = isHebrew ? "/he/exhibitions" : "/exhibitions";

  return (
    <main
      dir={isHebrew ? "rtl" : "ltr"}
      className="min-h-screen bg-[#070b17] px-4 py-8 text-white md:px-8"
    >
      <div className="mx-auto flex max-w-[1780px] flex-col gap-6">
        <div className="flex flex-wrap items-center gap-3 text-sm font-medium">
          <Link
            href={homeHref}
            className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-white transition hover:bg-white/10"
          >
            {t.backMain}
          </Link>
          <Link
            href={spaceHref}
            className="rounded-xl border border-cyan-400/40 bg-cyan-400/10 px-5 py-3 text-cyan-100 transition hover:bg-cyan-400/20"
          >
            {t.backSpace}
          </Link>
          <Link
            href={exhibitionsHref}
            className="rounded-xl border border-emerald-400/40 bg-emerald-400/10 px-5 py-3 text-emerald-100 transition hover:bg-emerald-400/20"
          >
            {t.exhibitions}
          </Link>
        </div>

        <section className="grid gap-4 xl:grid-cols-[0.95fr_0.95fr_1.2fr]">
          <div className="rounded-[30px] border border-cyan-300/20 bg-[#0b1227] p-6 shadow-[0_0_40px_rgba(24,119,242,0.12)]">
            <p className="text-[11px] uppercase tracking-[0.3em] text-cyan-300">
              {t.featuredAsset}
            </p>
            <h1 className="mt-2 text-4xl font-extrabold leading-none">
              {asset.title[locale]}
            </h1>
            <p className="mt-2 text-sm text-slate-400">{asset.code}</p>

            <div className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
              <p>{asset.subtitle[locale]}</p>
              <p>{asset.description[locale]}</p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={exhibitionsHref}
                className="rounded-xl border border-cyan-300/30 bg-cyan-400/20 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/30"
              >
                {t.addToExhibition}
              </Link>
              <Link
                href={exhibitionsHref}
                className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                {t.viewExhibitions}
              </Link>
            </div>

            <div className="mt-4">
              <QRCodePanel
                nameEn={asset.title.en}
                nameHe={asset.title.he}
              />
            </div>
          </div>

          <div className="rounded-[30px] border border-cyan-300/20 bg-[#0b1227] p-6 shadow-[0_0_40px_rgba(24,119,242,0.12)]">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] text-cyan-300">
                  {t.profile}
                </p>
                <h2 className="mt-2 text-4xl font-extrabold leading-none">
                  {asset.title[locale]}
                </h2>
                <p className="mt-2 text-sm text-slate-400">{asset.code}</p>
              </div>

              <div className="flex flex-col items-end gap-2 text-xs font-semibold">
                <span className="rounded-full border border-lime-300/30 bg-lime-400/20 px-3 py-1 text-lime-100">
                  {asset.status[locale]}
                </span>
                <span className="rounded-full border border-cyan-300/30 bg-cyan-400/20 px-3 py-1 text-cyan-100">
                  {asset.config[locale]}
                </span>
                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-white">
                  {asset.scale}
                </span>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Stat label={t.overallHeight} value={asset.specs.height} />
              <Stat label={t.width} value={asset.specs.width} />
              <Stat label={t.length} value={asset.specs.length} />
              <Stat label={t.weight} value={asset.specs.weight} />
              <Stat label={t.standDiameter} value={asset.specs.standDiameter} />
              <Stat label={t.standWeight} value={asset.specs.standWeight} />
            </div>

            <div className="mt-5 rounded-2xl border border-cyan-300/15 bg-white/[0.03] p-4">
              <p className="mb-3 text-[11px] uppercase tracking-[0.25em] text-slate-400">
                {t.operationalReadiness}
              </p>

              <Row label={t.environment} value={asset.readiness.environment[locale]} />
              <Row label={t.displayMethod} value={asset.readiness.displayMethod[locale]} />
              <Row label={t.support} value={asset.readiness.support[locale]} />
              <Row
                label={t.presentationLevel}
                value={asset.readiness.presentationLevel[locale]}
              />
              <div className="flex items-center justify-between gap-4">
                <span>{t.visualLanguage}</span>
                <span className="font-semibold text-white">
                  {asset.readiness.visualLanguage[locale]}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-[30px] border border-cyan-300/20 bg-[#081226] p-4 shadow-[0_0_40px_rgba(24,119,242,0.14)]">
            <div className="relative">
              <ModelViewer
                src={asset.model3d ?? asset.image}
                alt={asset.title[locale]}
              />

              {asset.slug === "optsat-3000" && (
                <>
                  <div className="pointer-events-none absolute inset-0">
                    <div className="absolute left-10 top-[118px] h-[320px] w-px bg-cyan-300/80">
                      <div className="absolute -top-[1px] left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-l-2 border-t-2 border-cyan-300/90" />
                      <div className="absolute -bottom-[1px] left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-b-2 border-r-2 border-cyan-300/90" />

                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <span className="block -rotate-90 whitespace-nowrap rounded-full border border-cyan-300/30 bg-[#081226]/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-200 shadow-[0_0_16px_rgba(93,214,255,0.10)]">
                          Height {asset.specs.height}
                        </span>
                      </div>
                    </div>

                    <div className="absolute bottom-[58px] left-1/2 h-px w-[300px] -translate-x-1/2 bg-cyan-300/80">
                      <div className="absolute -top-[1px] left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-l-2 border-t-2 border-cyan-300/90" />
                      <div className="absolute -bottom-[1px] left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-b-2 border-r-2 border-cyan-300/90" />

                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <span className="whitespace-nowrap rounded-full border border-cyan-300/30 bg-[#081226]/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-200 shadow-[0_0_16px_rgba(93,214,255,0.10)]">
                          Width {asset.specs.width}
                        </span>
                      </div>
                    </div>

                    <div className="absolute right-[112px] top-[318px] h-[178px] w-px bg-cyan-300/80">
                      <div className="absolute -left-[1px] top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 border-b-2 border-l-2 border-cyan-300/90" />
                      <div className="absolute -right-[1px] top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 border-r-2 border-t-2 border-cyan-300/90" />

                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <span className="block -rotate-90 whitespace-nowrap rounded-full border border-cyan-300/30 bg-[#081226]/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-200 shadow-[0_0_16px_rgba(93,214,255,0.10)]">
                          Base {asset.specs.width}
                        </span>
                      </div>
                    </div>

                    </div>

                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-cyan-300/15 bg-white/[0.03] p-4">
      <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">{label}</p>
      <p className="mt-2 text-2xl font-bold">{value}</p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="mb-3 flex items-center justify-between gap-4 border-b border-white/10 pb-2">
      <span>{label}</span>
      <span className="font-semibold text-white">{value}</span>
    </div>
  );
}
