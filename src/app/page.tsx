import Link from "next/link";
import { uiText } from "../data/uiText";

const sections = [
  {
    title: uiText.domains.space.en,
    href: "/space",
    description:
      "Explore satellites, launchers, and visual asset pages prepared for exhibition planning.",
  },
  {
    title: uiText.domains.air.en,
    href: "/air",
    description:
      "Browse aviation-related assets, future display items, and air exhibition material.",
  },
  {
    title: uiText.domains.land.en,
    href: "/land",
    description:
      "Review land systems, display concepts, and future ground-platform assets.",
  },
  {
    title: uiText.domains.naval.en,
    href: "/water",
    description:
      "Access naval and maritime exhibition content, assets, and presentation directions.",
  },
  {
    title: "Exhibitions",
    href: "/exhibitions",
    description:
      "Move into exhibition planning, coordination, approvals, and event preparation.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#070b17] px-4 py-8 text-white md:px-8">
      <div className="mx-auto flex max-w-[1700px] flex-col gap-8">
        <section className="rounded-[34px] border border-cyan-300/20 bg-[radial-gradient(circle_at_top,rgba(45,110,220,0.28),rgba(11,18,39,1)_58%)] p-8 shadow-[0_0_60px_rgba(24,119,242,0.14)] md:p-10">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-4xl">
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">
                Exhibition Platform
              </p>

              <h1 className="mt-4 text-4xl font-extrabold md:text-6xl">
                Welcome
              </h1>

              <p className="mt-4 text-sm leading-7 text-slate-300 md:text-base">
                A clearer, friendlier way to review exhibition assets, navigate
                categories, and move between planning areas. Start with Space,
                continue into exhibitions, and build a better overview of the
                full showcase ecosystem.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/space"
                  className="rounded-xl border border-cyan-400/40 bg-cyan-400/10 px-5 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/20"
                >
                  Explore Space Assets
                </Link>

                <Link
                  href="/exhibitions"
                  className="rounded-xl border border-emerald-400/40 bg-emerald-400/10 px-5 py-3 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-400/20"
                >
                  Open Exhibitions
                </Link>

                <Link
                  href="/he"
                  className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  עברית
                </Link>
              </div>
            </div>

            <div className="grid min-w-[280px] gap-3 sm:grid-cols-2">
              <QuickPill label="Main Route" value="/space" />
              <QuickPill label="Planning Route" value="/exhibitions" />
              <QuickPill label="Current Focus" value="Space Assets" />
              <QuickPill label="Status" value="Ready to Use" />
            </div>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {sections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="group flex min-h-[250px] flex-col justify-between rounded-[30px] border border-cyan-300/20 bg-[#0b1227] p-6 shadow-[0_0_40px_rgba(24,119,242,0.08)] transition duration-200 hover:-translate-y-1 hover:border-cyan-300/40 hover:shadow-[0_0_60px_rgba(24,119,242,0.16)]"
            >
              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] text-cyan-300">
                  Platform Area
                </p>

                <h2 className="mt-3 text-3xl font-extrabold">{section.title}</h2>

                <p className="mt-4 text-sm leading-7 text-slate-300">
                  {section.description}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-sm">
                <span className="text-slate-400">Open Section</span>
                <span className="font-semibold text-white">{section.href}</span>
              </div>
            </Link>
          ))}
        </section>
      </div>
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