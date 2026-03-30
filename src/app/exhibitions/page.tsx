import Link from "next/link";

export default function ExhibitionsPage() {
  return (
    <main className="min-h-screen bg-[#06111f] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-[1700px] flex-col gap-4 px-4 py-4">
        <div className="flex items-center justify-start">
          <Link
            href="/"
            aria-label="Back to Home"
            className="inline-flex items-center gap-2 rounded-[14px] border border-cyan-300/28 bg-[#08131f]/92 px-4 py-2 text-[13px] font-medium uppercase tracking-[0.18em] text-cyan-200 shadow-[0_0_0_1px_rgba(103,232,249,0.10),0_0_18px_rgba(34,211,238,0.12)] transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/48 hover:text-white"
          >
            ← Home
          </Link>
        </div>

        <section className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[#08131f] shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
          <div className="relative h-[52vh] min-h-[380px] max-h-[620px] w-full overflow-hidden">
            <img
              src="/images/exhibitions/exhibitions-top-final.png"
              alt="Exhibitions Center"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#06111f]/78 via-[#06111f]/22 to-transparent" />

            <div className="absolute left-[4.5%] top-[13%] z-10 max-w-[560px]">
              <p className="mb-3 text-[clamp(14px,1.1vw,20px)] font-medium uppercase tracking-[0.22em] text-cyan-300">
                Exhibitions Center
              </p>

              <h1 className="mb-4 text-[clamp(54px,6.4vw,112px)] font-semibold leading-[0.92] tracking-[-0.04em] text-white">
                Exhibitions
              </h1>

              <div className="mb-5 h-[3px] w-36 rounded-full bg-cyan-400/90 shadow-[0_0_18px_rgba(34,211,238,0.55)]" />

              <p className="max-w-[520px] text-[clamp(16px,1.3vw,22px)] leading-[1.5] text-white/90">
                Main operational center for exhibition planning, data
                tracking, suppliers, brochures, pavilion status, and
                preparation workflow.
              </p>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Link
            href="/exhibitions/israel"
            aria-label="Open Israel exhibitions"
            className="group relative block overflow-hidden rounded-[22px] border border-cyan-300/45 bg-[#08131f] ring-1 ring-cyan-300/40 shadow-[0_0_0_1px_rgba(103,232,249,0.20),0_0_28px_rgba(34,211,238,0.24),0_0_48px_rgba(34,211,238,0.16),0_18px_60px_rgba(0,0,0,0.30)] transition duration-300 hover:-translate-y-1"
          >
            <div className="relative aspect-[16/8.3] w-full">
              <img
                src="/images/exhibitions/exhibitions-israel-final.png"
                alt="כנסים ותערוכות בארץ"
                className="absolute inset-0 h-full w-full object-cover object-center transition duration-500 group-hover:scale-[1.02]"
              />
            </div>
            <div className="pointer-events-none absolute left-5 bottom-5">
              <div className="inline-flex items-center gap-2 rounded-[14px] border border-cyan-300/55 bg-[#08131f]/84 px-4 py-2 text-[12px] font-medium uppercase tracking-[0.16em] text-cyan-100 shadow-[0_0_0_1px_rgba(103,232,249,0.16),0_0_18px_rgba(34,211,238,0.18)]">
                Open Israel
                <span className="text-cyan-300">→</span>
              </div>
            </div>
          </Link>

          <Link
            href="/exhibitions/abroad"
            aria-label="Open exhibitions abroad"
            className="group relative block overflow-hidden rounded-[22px] border border-fuchsia-300/45 bg-[#08131f] ring-1 ring-fuchsia-300/40 shadow-[0_0_0_1px_rgba(244,114,182,0.18),0_0_28px_rgba(217,70,239,0.24),0_0_48px_rgba(217,70,239,0.16),0_18px_60px_rgba(0,0,0,0.30)] transition duration-300 hover:-translate-y-1"
          >
            <div className="relative aspect-[16/8.3] w-full">
              <img
                src="/images/exhibitions/exhibitions-abroad-final.png"
                alt="Exhibitions Abroad"
                className="absolute inset-0 h-full w-full object-cover object-center transition duration-500 group-hover:scale-[1.02]"
              />
            </div>
            <div className="pointer-events-none absolute left-5 bottom-5">
              <div className="inline-flex items-center gap-2 rounded-[14px] border border-fuchsia-300/55 bg-[#08131f]/84 px-4 py-2 text-[12px] font-medium uppercase tracking-[0.16em] text-fuchsia-100 shadow-[0_0_0_1px_rgba(244,114,182,0.16),0_0_18px_rgba(217,70,239,0.18)]">
                Open Abroad
                <span className="text-fuchsia-300">→</span>
              </div>
            </div>
          </Link>
        </section>

        <div className="pb-2 text-center text-[11px] font-medium uppercase tracking-[0.28em] text-white/70">
          Unclassified
        </div>
      </div>
    </main>
  );
}
