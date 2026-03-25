import Link from "next/link";
import { notFound } from "next/navigation";
import { getAirAssetBySlug, getAllAirAssetSlugs } from "../../../lib/air-utils";
import ModelViewer from "../../../components/viewer/ModelViewer";

export function generateStaticParams() {
  return getAllAirAssetSlugs().map((slug) => ({ slug }));
}

export default async function AirAssetDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const asset = getAirAssetBySlug(slug);

  if (!asset) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#070b17] px-4 py-8 text-white md:px-8">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-8">
        <section className="rounded-[34px] border border-cyan-300/20 bg-[radial-gradient(circle_at_top,rgba(32,80,170,0.28),rgba(11,18,39,1)_55%)] p-8 shadow-[0_0_50px_rgba(24,119,242,0.12)] md:p-10">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-4xl">
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">
                Air Asset Detail
              </p>
              <h1 className="mt-2 text-4xl font-extrabold md:text-5xl">
                {asset.title.en}
              </h1>
              <p className="mt-3 text-lg text-slate-300">{asset.subtitle.en}</p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/air"
                  className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  ← Back to Air
                </Link>

                <Link
                  href="/"
                  className="rounded-xl border border-cyan-400/40 bg-cyan-400/10 px-5 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/20"
                >
                  Back to Main
                </Link>
              </div>
            </div>

            <div className="grid min-w-[280px] gap-3 sm:grid-cols-2">
              <InfoPill label="Code" value={asset.code} />
              <InfoPill label="Scale" value={asset.scale} />
              <InfoPill label="Status" value={asset.status.en} />
              <InfoPill label="Config" value={asset.config.en} />
            </div>
          </div>
        </section>

        <section className="grid gap-8 xl:grid-cols-[1.25fr_0.75fr]">
          <div className="rounded-[32px] border border-cyan-300/20 bg-[#0b1227] p-6 shadow-[0_0_40px_rgba(24,119,242,0.10)]">
            <div className="overflow-hidden rounded-[24px] border border-cyan-300/20 bg-black/20 p-4">
              {asset.model3d ? (
                <ModelViewer
                  src={asset.model3d}
                  alt={`${asset.title.en} showcase`}
                />
              ) : (
                <img
                  src={asset.image}
                  alt={`${asset.title.en} showcase`}
                  className="w-full rounded-[18px] object-contain"
                />
              )}
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <SpecRow label="Length" value={asset.specs.length} />
              <SpecRow label="Width" value={asset.specs.width} />
              <SpecRow label="Height" value={asset.specs.height} />
              <SpecRow label="Weight" value={asset.specs.weight} />
              <SpecRow label="Stand Diameter" value={asset.specs.standDiameter} />
              <SpecRow label="Stand Weight" value={asset.specs.standWeight} />
            </div>
          </div>

          <div className="rounded-[32px] border border-cyan-300/20 bg-[#0b1227] p-6 shadow-[0_0_40px_rgba(24,119,242,0.10)]">
            <p className="text-[11px] uppercase tracking-[0.3em] text-cyan-300">
              Exhibition Readiness
            </p>

            <div className="mt-5 space-y-4">
              <ReadinessRow label="Environment" value={asset.readiness.environment.en} />
              <ReadinessRow label="Display Method" value={asset.readiness.displayMethod.en} />
              <ReadinessRow label="Support" value={asset.readiness.support.en} />
              <ReadinessRow label="Presentation Level" value={asset.readiness.presentationLevel.en} />
              <ReadinessRow label="Visual Language" value={asset.readiness.visualLanguage.en} />
            </div>

            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="text-sm leading-7 text-slate-300">{asset.description.en}</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function InfoPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-cyan-300/15 bg-white/[0.04] p-4">
      <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">{label}</p>
      <p className="mt-2 text-lg font-bold text-white">{value}</p>
    </div>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{label}</p>
      <p className="mt-2 text-lg font-semibold text-white">{value}</p>
    </div>
  );
}

function ReadinessRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-3 text-sm">
      <span className="text-slate-400">{label}</span>
      <span className="text-right font-medium text-white">{value}</span>
    </div>
  );
}
