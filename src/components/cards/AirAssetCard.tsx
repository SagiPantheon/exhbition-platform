import Link from "next/link";

type LocalizedText = {
  en: string;
  he: string;
};

type AirAssetCardData = {
  slug: string;
  code: string;
  image: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  description: LocalizedText;
  status: LocalizedText;
  config: LocalizedText;
  scale: string;
};

type AirAssetCardProps = {
  asset: AirAssetCardData;
  locale: "en" | "he";
  basePath: string;
  featuredLabel: string;
  viewLabel: string;
  badgesAlign?: "end" | "center";
};

export default function AirAssetCard({
  asset,
  locale,
  basePath,
  featuredLabel,
  viewLabel,
  badgesAlign = "end",
}: AirAssetCardProps) {
  const justifyClass =
    badgesAlign === "center" ? "justify-center" : "justify-end";

  return (
    <Link
      href={`${basePath}/${asset.slug}`}
      className="group flex min-h-[620px] flex-col overflow-hidden rounded-[32px] border border-cyan-300/20 bg-[#0b1227] shadow-[0_0_40px_rgba(24,119,242,0.10)] transition duration-200 hover:-translate-y-1 hover:border-cyan-300/40 hover:shadow-[0_0_60px_rgba(24,119,242,0.18)]"
    >
      <div className="border-b border-cyan-300/15 bg-[#081226] p-5">
        <div className="relative overflow-hidden rounded-[24px] border border-cyan-300/20 bg-black/20 p-3">
          <img
            src={asset.image}
            alt={`${asset.title[locale]} showcase`}
            className="h-[360px] w-full rounded-[18px] object-contain object-center p-4"
          />
        </div>

        <div className={`mt-3 flex flex-wrap ${justifyClass} gap-2 px-2 pb-1`}>
          <span className="inline-flex rounded-full border border-[rgba(92,214,126,0.35)] bg-[rgba(92,214,126,0.14)] px-2.5 py-1 text-[11px] text-[#9df0b2]">
            {asset.status[locale]}
          </span>
          <span className="inline-flex rounded-full border border-[rgba(93,214,255,0.35)] bg-[rgba(93,214,255,0.14)] px-2.5 py-1 text-[11px] text-[#8fe7ff]">
            {asset.config[locale]}
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
              {featuredLabel}
            </p>
            <h2 className="mt-2 text-3xl font-extrabold leading-none">
              {asset.title[locale]}
            </h2>
            <p className="mt-2 text-sm text-slate-400">{asset.code}</p>
          </div>

          <span className="shrink-0 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold text-white">
            {viewLabel}
          </span>
        </div>

        <p className="text-sm font-medium leading-6 text-slate-200">
          {asset.subtitle[locale]}
        </p>

        <p className="text-sm leading-7 text-slate-400">
          {asset.description[locale]}
        </p>

        <div className="mt-auto border-t border-white/10 pt-4 text-sm text-slate-300">
          <span className="font-semibold text-white">
            {basePath}/{asset.slug}
          </span>
        </div>
      </div>
    </Link>
  );
}
