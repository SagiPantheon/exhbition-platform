import { notFound } from "next/navigation";
import { getSpaceAssetBySlug } from "../../../data/spaceAssets";
import ClassificationBadge from "../../../components/common/ClassificationBadge";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function SpaceAssetPage({ params }: PageProps) {
  const { slug } = await params;
  const asset = getSpaceAssetBySlug(slug);

  if (!asset) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-6">
          <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">
            Space Asset
          </p>
          <h1 className="mt-2 text-4xl font-semibold">{asset.title.en}</h1>
          <p className="mt-2 text-lg text-neutral-600">{asset.subtitle.en}</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-50">
            <img
              src={asset.image}
              alt={asset.title.en}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold">Overview</h2>
              <p className="mt-3 leading-7 text-neutral-700">
                {asset.description.en}
              </p>
            </div>

            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold">Configuration</h2>
              <div className="mt-4 space-y-3 text-sm text-neutral-700">
                <div className="flex items-center justify-between gap-4 border-b border-neutral-100 pb-3">
                  <span className="text-neutral-500">Code</span>
                  <span className="font-medium">{asset.code}</span>
                </div>
                <div className="flex items-center justify-between gap-4 border-b border-neutral-100 pb-3">
                  <span className="text-neutral-500">Status</span>
                  <span className="font-medium">{asset.status.en}</span>
                </div>
                <div className="flex items-center justify-between gap-4 border-b border-neutral-100 pb-3">
                  <span className="text-neutral-500">Configuration</span>
                  <span className="font-medium">{asset.config.en}</span>
                </div>
                <div className="flex items-center justify-between gap-4 border-b border-neutral-100 pb-3">
                  <span className="text-neutral-500">Scale</span>
                  <span className="font-medium">{asset.scale}</span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold">Specifications</h2>
              <div className="mt-4 space-y-3 text-sm text-neutral-700">
                <div className="flex items-center justify-between gap-4 border-b border-neutral-100 pb-3">
                  <span className="text-neutral-500">Height</span>
                  <span className="font-medium">{asset.specs.height}</span>
                </div>
                <div className="flex items-center justify-between gap-4 border-b border-neutral-100 pb-3">
                  <span className="text-neutral-500">Width</span>
                  <span className="font-medium">{asset.specs.width}</span>
                </div>
                <div className="flex items-center justify-between gap-4 border-b border-neutral-100 pb-3">
                  <span className="text-neutral-500">Length</span>
                  <span className="font-medium">{asset.specs.length}</span>
                </div>
                <div className="flex items-center justify-between gap-4 border-b border-neutral-100 pb-3">
                  <span className="text-neutral-500">Weight</span>
                  <span className="font-medium">{asset.specs.weight}</span>
                </div>
                <div className="flex items-center justify-between gap-4 border-b border-neutral-100 pb-3">
                  <span className="text-neutral-500">Stand Diameter</span>
                  <span className="font-medium">{asset.specs.standDiameter}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-neutral-500">Stand Weight</span>
                  <span className="font-medium">{asset.specs.standWeight}</span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold">Operational Readiness</h2>
              <div className="mt-4 space-y-3 text-sm text-neutral-700">
                <div className="flex items-center justify-between gap-4 border-b border-neutral-100 pb-3">
                  <span className="text-neutral-500">Environment</span>
                  <span className="font-medium">{asset.readiness.environment.en}</span>
                </div>
                <div className="flex items-center justify-between gap-4 border-b border-neutral-100 pb-3">
                  <span className="text-neutral-500">Display Method</span>
                  <span className="font-medium">{asset.readiness.displayMethod.en}</span>
                </div>
                <div className="flex items-center justify-between gap-4 border-b border-neutral-100 pb-3">
                  <span className="text-neutral-500">Support</span>
                  <span className="font-medium">{asset.readiness.support.en}</span>
                </div>
                <div className="flex items-center justify-between gap-4 border-b border-neutral-100 pb-3">
                  <span className="text-neutral-500">Presentation Level</span>
                  <span className="font-medium">{asset.readiness.presentationLevel.en}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-neutral-500">Visual Language</span>
                  <span className="font-medium">{asset.readiness.visualLanguage.en}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ClassificationBadge label="Unclassified" />
    </main>
  );
}