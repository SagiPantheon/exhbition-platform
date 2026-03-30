import Link from "next/link";

const topCards = [
  { title: "Space", href: "/space", image: "/images/home/space-cover.png" },
  { title: "Air", href: "/air", image: "/images/home/air-cover.png" },
  { title: "Land", href: "/land", image: "/images/home/land-cover.png" },
];

const bottomCards = [
  { title: "Naval", href: "/water", image: "/images/home/naval-cover.png" },
  { title: "Exhibitions", href: "/exhibitions", image: "/images/home/exhibitions-home-cover.png" },
];

function Card({
  title,
  href,
  image,
}: {
  title: string;
  href: string;
  image: string;
}) {
  return (
    <Link
      href={href}
      aria-label={`Open ${title}`}
      className="group block overflow-hidden rounded-[16px] border border-white/10 bg-[#08131f] shadow-[0_18px_60px_rgba(0,0,0,0.28)] transition duration-300 hover:-translate-y-1 cursor-pointer"
    >
      <div className="relative aspect-[16/7.2] w-full">
        <img
          src={image}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover object-center transition duration-500 group-hover:scale-[1.02]"
        />
      </div>
    </Link>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#06111f] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-[1700px] flex-col gap-4 px-4 py-4">
        <section className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[#08131f] shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
          <div className="relative h-[56vh] min-h-[420px] max-h-[760px] w-full">
            <img
              src="/images/home/home-hero-bg.png"
              alt="Exhibition Platform Hero Background"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-[#06111f]/88 via-[#06111f]/38 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#06111f] to-transparent" />

            <div className="absolute left-[5%] top-[14%] z-10 max-w-[520px]">
              <p className="mb-3 text-[clamp(14px,1.2vw,20px)] font-medium uppercase tracking-[0.22em] text-cyan-300">
                Exhibition Platform
              </p>

              <h1 className="mb-4 text-[clamp(56px,7vw,120px)] font-semibold leading-[0.92] tracking-[-0.04em] text-white">
                Welcome
              </h1>

              <div className="mb-6 h-[3px] w-40 rounded-full bg-cyan-400/90 shadow-[0_0_18px_rgba(34,211,238,0.55)]" />

              <p className="max-w-[460px] text-[clamp(16px,1.35vw,22px)] leading-[1.55] text-white/90">
                A clearer, friendlier way to review exhibition assets,
                navigate categories, and move between planning areas.
                Start with Space, continue into exhibitions, and build a
                better overview of the full showcase ecosystem.
              </p>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {topCards.map((card) => (
            <Card key={card.title} {...card} />
          ))}
        </section>

        <section className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:px-[16.66%]">
          {bottomCards.map((card) => (
            <Card key={card.title} {...card} />
          ))}
        </section>
      </div>
    </main>
  );
}
