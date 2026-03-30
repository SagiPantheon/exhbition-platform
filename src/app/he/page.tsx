import Link from "next/link";

const sections = [
  {
    title: "חלל",
    href: "/he/space",
    description: "עיין בלוויינים, משגרים ודפי נכס ויזואליים המוכנים לתכנון תערוכות.",
  },
  {
    title: "אוויר",
    href: "/he/air",
    description: "גישה לנכסי תצוגה אוויריים, חומרים עתידיים וכיווני תצוגה לתחום האוויר.",
  },
  {
    title: "יבשה",
    href: "/land",
    description: "סקירת מערכות יבשה, קונספטים לתצוגה ונכסים עתידיים לפלטפורמות קרקעיות.",
  },
  {
    title: "ים",
    href: "/water",
    description: "תוכן ימי, נכסים רלוונטיים וכיווני הצגה לתערוכות בתחום הימי.",
  },
  {
    title: "תערוכות",
    href: "/he/exhibitions",
    description: "מעבר לאזור תכנון תערוכות, תיאום, אישורים והכנה לאירועים.",
  },
];

export default function HebrewHomePage() {
  return (
    <main dir="rtl" className="min-h-screen bg-[#070b17] px-4 py-8 text-white md:px-8">
      <div className="mx-auto flex max-w-[1700px] flex-col gap-8">
        <section className="rounded-[34px] border border-cyan-300/20 bg-[radial-gradient(circle_at_top,rgba(45,110,220,0.28),rgba(11,18,39,1)_58%)] p-8 shadow-[0_0_60px_rgba(24,119,242,0.14)] md:p-10">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-4xl">
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">
                Exhibition Platform
              </p>

              <h1 className="mt-4 text-4xl font-extrabold md:text-6xl">
                ברוך הבא
              </h1>

              <p className="mt-4 text-sm leading-7 text-slate-300 md:text-base">
                דרך ברורה ונעימה יותר לעבור על נכסי תערוכה, לנווט בין קטגוריות
                ולעבור בין אזורי תכנון. אפשר להתחיל מחלל, להמשיך לתערוכות,
                ולבנות תמונה רחבה ומסודרת יותר של כל המערכת.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/he/space"
                  className="rounded-xl border border-cyan-400/40 bg-cyan-400/10 px-5 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/20"
                >
                  פתח נכסי חלל
                </Link>

                <Link
                  href="/he/exhibitions"
                  className="rounded-xl border border-emerald-400/40 bg-emerald-400/10 px-5 py-3 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-400/20"
                >
                  פתח תערוכות
                </Link>

                <Link
                  href="/"
                  className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  English
                </Link>
              </div>
            </div>

            <div className="grid min-w-[280px] gap-3 sm:grid-cols-2">
              <QuickPill label="נתיב ראשי" value="/he/space" />
              <QuickPill label="נתיב תכנון" value="/he/exhibitions" />
              <QuickPill label="מוקד נוכחי" value="נכסי חלל" />
              <QuickPill label="סטטוס" value="מוכן לשימוש" />
            </div>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {sections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="overflow-hidden group flex min-h-[250px] flex-col justify-between rounded-[30px] border border-cyan-300/20 bg-[#0b1227] p-6 shadow-[0_0_40px_rgba(24,119,242,0.08)] transition duration-200 hover:-translate-y-1 hover:border-cyan-300/40 hover:shadow-[0_0_60px_rgba(24,119,242,0.16)]"
            style={{
              backgroundImage: section.href.includes("space")
                ? "linear-gradient(to top, rgba(2,6,23,0.88), rgba(2,6,23,0.34)), url('/covers/space_cover.png')"
                : section.href.includes("air")
                ? "linear-gradient(to top, rgba(2,6,23,0.82), rgba(2,6,23,0.24)), url('/covers/air_cover.png')"
                : section.href.includes("land")
                ? "linear-gradient(to top, rgba(2,6,23,0.84), rgba(2,6,23,0.24)), url('/covers/land_cover.png')"
                : section.href.includes("naval") || section.href.includes("water")
                ? "linear-gradient(to top, rgba(2,6,23,0.86), rgba(2,6,23,0.28)), url('/covers/naval_cover.png')"
                : section.href.includes("exhibitions")
                ? "linear-gradient(to top, rgba(2,6,23,0.90), rgba(2,6,23,0.30)), url('/covers/exhibitions_cover.png')"
                : "linear-gradient(to top, rgba(2,6,23,0.92), rgba(2,6,23,0.55))",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
            >
              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] text-cyan-300">
                  אזור מערכת
                </p>

                <h2 className="mt-3 text-3xl font-extrabold">{section.title}</h2>

                <p className="mt-4 text-sm leading-7 text-slate-300">
                  {section.description}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-sm">
                <span className="text-slate-400">פתח אזור</span>
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
