import Link from "next/link";

const NAV_ITEMS = [
  { label: "Hub",                href: "/",                      icon: "⊕" },
  { label: "Global Exhibit Bank",href: "/dashboard",             icon: "◈" },
  { label: "תערוכות",            href: "/exhibitions",           icon: "⊞" },
  { label: "תערוכות בארץ",       href: "/exhibitions/israel",    icon: "⊟" },
  { label: 'תערוכות בחו"ל',      href: "/exhibitions/abroad",    icon: "⊛" },
  { label: "Layouts",            href: "/tents-layout",          icon: "⊡" },
  { label: "אבחון",              href: "/diagnostics",          icon: "⊘" },
  { label: "מלאי",               href: "/inventory",             icon: "⊠" },
  { label: "בית לקוחות", href: "https://iai-hosting.vercel.app", icon: "⌂", external: true },
];

type Props = {
  activeHref: string;
  totalAssets?: number;
};

export default function DivisionSidebar({ activeHref, totalAssets }: Props) {
  return (
    <aside className="sticky top-0 flex h-screen w-[230px] shrink-0 flex-col border-r border-cyan-300/10 bg-[#060a14] px-4 py-8">
      <div className="mb-8 px-2">
        <p className="text-[10px] uppercase tracking-[0.35em] text-cyan-300/70">IAI</p>
        <p className="mt-0.5 text-[15px] font-bold text-white">Exhibition Platform</p>
      </div>

      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const isActive = item.href === activeHref;
          const classes = [
            "flex items-center gap-3 rounded-[14px] px-3 py-2.5 text-sm font-medium transition",
            isActive
              ? "border border-cyan-300/25 bg-cyan-400/10 text-cyan-100"
              : "text-slate-400 hover:bg-white/[0.04] hover:text-white",
          ].join(" ");

          if ("external" in item && item.external) {
            return (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={classes}
              >
                <span className="text-[16px] leading-none opacity-70">{item.icon}</span>
                {item.label}
                <span className="ml-auto text-[11px] text-slate-500">↗</span>
              </a>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={classes}
            >
              <span className="text-[16px] leading-none opacity-70">{item.icon}</span>
              {item.label}
              {isActive && (
                <span className="ml-auto rounded-full border border-cyan-300/30 bg-cyan-400/15 px-2 py-0.5 text-[10px] text-cyan-300">
                  פעיל
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {totalAssets !== undefined && (
        <div className="mt-auto">
          <div className="rounded-[18px] border border-white/8 bg-white/[0.03] p-4">
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Total Assets</p>
            <p className="mt-1 text-2xl font-extrabold text-white">{totalAssets}</p>
            <p className="mt-0.5 text-xs text-slate-500">across all divisions</p>
          </div>
        </div>
      )}
    </aside>
  );
}
