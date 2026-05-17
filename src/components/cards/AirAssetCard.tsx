import Link from "next/link";
import Image from "next/image";

type LocalizedText = {
  en: string;
  he: string;
};

type AirAsset = {
  slug: string;
  code: string;
  image?: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  description?: LocalizedText;
  status: LocalizedText;
  config: LocalizedText;
  scale: string;
  assetCategory?: string;
  specs?: {
    height?: string;
    width?: string;
    length?: string;
    weight?: string;
    standDiameter?: string;
    standWeight?: string;
  };
};

type Props = {
  asset: AirAsset;
  locale?: "en" | "he";
  href?: string;
  className?: string;
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function getVariant(asset: AirAsset) {
  const haystack = [
    asset.slug,
    asset.code,
    asset.title?.en,
    asset.title?.he,
    asset.subtitle?.en,
    asset.subtitle?.he,
    asset.config?.en,
    asset.config?.he,
    asset.description?.en,
    asset.description?.he,
    asset.assetCategory,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  if (haystack.includes("uav") || haystack.includes("drone") || haystack.includes("כטב")) {
    return "uav";
  }

  if (
    haystack.includes("arrow-2") ||
    haystack.includes("arrow 2") ||
    haystack.includes("arrow-3") ||
    haystack.includes("arrow 3") ||
    haystack.includes("lora") ||
    haystack.includes("missile") ||
    haystack.includes("טיל") ||
    haystack.includes("launcher") ||
    haystack.includes("משגר")
  ) {
    return "air-standard";
  }

  return "air-standard";
}

function getDisplayTypeLabel(locale: "en" | "he", asset: AirAsset, variant: string) {
  const haystack = [
    asset.slug,
    asset.code,
    asset.title?.en,
    asset.title?.he,
    asset.subtitle?.en,
    asset.subtitle?.he,
    asset.config?.en,
    asset.config?.he,
    asset.description?.en,
    asset.description?.he,
    asset.assetCategory,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  if (variant === "uav") {
    return locale === "he" ? 'תצוגת כטב״ם' : "UAV display";
  }

  if (haystack.includes("launcher") || haystack.includes("משגר")) {
    return locale === "he" ? "תצוגת משגר" : "Launcher display";
  }

  if (
    haystack.includes("missile") ||
    haystack.includes("טיל") ||
    haystack.includes("arrow") ||
    haystack.includes("lora")
  ) {
    return locale === "he" ? "תצוגת טיל" : "Missile display";
  }

  return locale === "he" ? "תצוגת אוויר" : "Air display";
}

function getViewLabel(locale: "en" | "he") {
  return locale === "he" ? "לצפייה בפריט" : "View asset";
}

function getFeaturedLabel(locale: "en" | "he") {
  return locale === "he" ? "פריט נבחר" : "Featured Asset";
}

function getNoImageLabel(locale: "en" | "he") {
  return locale === "he" ? "תמונה תתווסף בהמשך" : "Visual coming soon";
}

function getSpecsForCard(asset: AirAsset, locale: "en" | "he") {
  const isLauncher = [asset.slug, asset.config?.en, asset.config?.he, asset.title?.en, asset.title?.he]
    .filter(Boolean)
    .join(" ")
    .toLowerCase()
    .match(/launcher|משגר/);

  const rows: Array<{ label: string; value?: string }> = isLauncher
    ? [
        { label: locale === "he" ? "אורך" : "Length", value: asset.specs?.length },
        { label: locale === "he" ? "רוחב" : "Width", value: asset.specs?.width },
        { label: locale === "he" ? "גובה" : "Height", value: asset.specs?.height },
        { label: locale === "he" ? "משקל" : "Weight", value: asset.specs?.weight },
      ]
    : [
        { label: locale === "he" ? "גובה" : "Height", value: asset.specs?.height },
        { label: locale === "he" ? "רוחב" : "Width", value: asset.specs?.width },
        { label: locale === "he" ? "משקל" : "Weight", value: asset.specs?.weight },
        { label: locale === "he" ? "קנה מידה" : "Scale", value: asset.scale },
      ];

  return rows.filter((row) => row.value);
}

export default function AirAssetCard({
  asset,
  locale = "en",
  href,
  className,
}: Props) {
  const variant = getVariant(asset);
  const isHebrew = locale === "he";
  const direction = isHebrew ? "rtl" : "ltr";
  const title = asset.title[locale];
  const subtitle = asset.subtitle[locale];
  const status = asset.status[locale];
  const config = asset.config[locale];
  const resolvedHref =
    href ?? (locale === "he" ? `/he/air/${asset.slug}` : `/air/${asset.slug}`);
  const displayType = getDisplayTypeLabel(locale, asset, variant);
  const specs = getSpecsForCard(asset, locale);
  const hasImage = Boolean(asset.image && asset.image.trim().length > 0);

  return (
    <article
      dir={direction}
      className={cx(
        "group relative overflow-hidden rounded-[28px] border border-cyan-300/20 bg-[linear-gradient(180deg,rgba(10,19,35,0.98)_0%,rgba(7,13,24,0.98)_100%)] shadow-[0_18px_48px_rgba(0,0,0,0.34)] transition duration-300 hover:-translate-y-1 hover:border-cyan-300/35 hover:shadow-[0_24px_70px_rgba(20,110,255,0.18)]",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.14),transparent_42%)] opacity-80" />

      <Link href={resolvedHref} className="block text-white no-underline">
        <div className="grid grid-cols-1 gap-0">
          <div className="relative min-h-[340px] border-b border-cyan-300/15">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.16),transparent_50%)]" />

            <div className="absolute left-[14px] right-[14px] top-[14px] bottom-[14px] overflow-hidden rounded-[22px] border border-cyan-300/18">
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,14,26,0.76)_0%,rgba(9,16,31,0.96)_100%)]" />

              <div className="relative h-full w-full p-2 md:p-3">
                {hasImage ? (
                  <Image
                    src={asset.image as string}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="select-none object-cover w-full h-full object-center transition duration-500 group-hover:scale-[1.02]"
                    priority={false}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center p-4">
                    <div className="flex h-full w-full items-center justify-center rounded-[18px] border border-dashed border-cyan-300/30 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.10),transparent_55%)] px-6 text-center">
                      <div>
                        <div className="text-[11px] uppercase tracking-[0.24em] text-cyan-300/80">
                          Air Asset
                        </div>
                        <div className="mt-3 text-2xl font-bold text-white">{title}</div>
                        <div className="mt-3 text-sm text-slate-300">{getNoImageLabel(locale)}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="relative z-10 p-6 md:p-7">
            <div
              className={cx(
                "mb-5 flex flex-wrap gap-2",
                isHebrew ? "justify-end" : "justify-start"
              )}
            >
              <Badge tone="green">{status}</Badge>
              <Badge tone="blue">{displayType}</Badge>
              <Badge tone="neutral">{asset.scale}</Badge>
            </div>

            <div className="mb-5">
              <p className="text-[11px] uppercase tracking-[0.28em] text-cyan-300">
                {getFeaturedLabel(locale)}
              </p>

              <h2 className="mt-3 text-3xl font-bold text-white">{title}</h2>

              <div className="mt-2 text-sm text-slate-400">
                {asset.code} · {config}
              </div>

              <p className="mt-4 max-w-[95%] text-[15px] leading-7 text-slate-300">
                {subtitle}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {specs.map((item) => (
                <SpecPill
                  key={`${asset.slug}-${item.label}`}
                  label={item.label}
                  value={item.value ?? ""}
                />
              ))}
            </div>

            <div className="mt-5">
              <span className="inline-flex min-h-[44px] items-center justify-center rounded-[14px] border border-cyan-300/35 bg-cyan-400/10 px-4 text-sm font-semibold text-cyan-100 transition group-hover:bg-cyan-400/18">
                {getViewLabel(locale)}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

function Badge({
  children,
  tone,
}: {
  children: React.ReactNode;
  tone: "green" | "blue" | "neutral";
}) {
  const styles =
    tone === "green"
      ? "text-emerald-100 bg-emerald-500/15 border-emerald-400/40"
      : tone === "blue"
      ? "text-cyan-100 bg-cyan-400/12 border-cyan-300/35"
      : "text-white bg-white/8 border-white/15";

  return (
    <span
      className={cx(
        "rounded-full border px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em]",
        styles
      )}
    >
      {children}
    </span>
  );
}

function SpecPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[18px] border border-white/10 bg-white/[0.04] px-4 py-3">
      <div className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
        {label}
      </div>
      <div className="mt-2 text-base font-semibold text-white">{value}</div>
    </div>
  );
}
