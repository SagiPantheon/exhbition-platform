import Image from "next/image";

type AssetHeroImageProps = {
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
};

export default function AssetHeroImage({
  title,
  subtitle,
  imageSrc,
  imageAlt,
}: AssetHeroImageProps) {
  return (
    <section className="mb-8 overflow-hidden rounded-3xl border border-white/10 bg-white/5">
      <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative min-h-[320px] bg-slate-900 lg:min-h-[420px]">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
        </div>

        <div className="flex flex-col justify-center p-8 md:p-10">
          <p className="mb-3 text-sm uppercase tracking-[0.24em] text-cyan-300/80">
            Visual Showcase
          </p>

          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            {title}
          </h2>

          <p className="max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}
