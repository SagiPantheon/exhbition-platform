type ClassificationBadgeProps = {
  label: string;
};

export default function ClassificationBadge({
  label,
}: ClassificationBadgeProps) {
  return (
    <div className="pointer-events-none fixed bottom-4 left-1/2 z-50 -translate-x-1/2">
      <div className="rounded-full border border-cyan-300/20 bg-[#081226]/85 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-200 shadow-[0_0_18px_rgba(24,119,242,0.12)] backdrop-blur-sm">
        {label}
      </div>
    </div>
  );
}
