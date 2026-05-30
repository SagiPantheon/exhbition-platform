"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import ModelViewer from "../viewer/ModelViewer";
import QRCodePanel from "../QRCodePanel";

type Specs = {
  length: string;
  width: string;
  height: string;
  weight: string;
  standDiameter: string;
  standWeight: string;
};

type LocalizedText = { en: string; he?: string };

export type AssetDetailData = {
  slug: string;
  title: { en: string; he: string };
  subtitle: { en: string; he: string };
  description?: { en: string; he: string };
  code: string;
  scale: string;
  status: { en: string; he?: string };
  config: { en: string; he?: string };
  image: string;
  model3d?: string;
  specs: Specs;
  readiness: {
    environment?: LocalizedText;
    displayMethod?: LocalizedText;
    support?: LocalizedText;
    presentationLevel?: LocalizedText;
    visualLanguage?: LocalizedText;
  };
};

type DivisionKey = "air" | "space" | "land" | "naval";

const DIVISION_META: Record<DivisionKey, { detailLabel: string; backHref: string; backLabel: string }> = {
  air:   { detailLabel: "Air Asset Detail",   backHref: "/air",   backLabel: "← Back to תעופה" },
  space: { detailLabel: "Space Asset Detail", backHref: "/space", backLabel: "← Back to מטח" },
  land:  { detailLabel: "Land Asset Detail",  backHref: "/land",  backLabel: "← Back to כטצ" },
  naval: { detailLabel: "Naval Asset Detail", backHref: "/naval", backLabel: "← Back to אלתא" },
};

const SPEC_FIELDS: { key: keyof Specs; label: string }[] = [
  { key: "length",        label: "Length"         },
  { key: "width",         label: "Width"          },
  { key: "height",        label: "Height"         },
  { key: "weight",        label: "Weight"         },
  { key: "standDiameter", label: "Stand Diameter" },
  { key: "standWeight",   label: "Stand Weight"   },
];

export default function AssetDetailClient({
  asset,
  viewerSrc,
  division,
}: {
  asset: AssetDetailData;
  viewerSrc: string | undefined;
  division: DivisionKey;
}) {
  const meta = DIVISION_META[division];
  const storageKey = `specs-${division}-${asset.slug}`;

  const [specs, setSpecs] = useState<Specs>(asset.specs);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setSpecs((prev) => ({ ...prev, ...JSON.parse(saved) }));
      }
    } catch {}
  }, [storageKey]);

  function handleSpecChange(key: keyof Specs, value: string) {
    setSpecs((prev) => {
      const next = { ...prev, [key]: value };
      try {
        localStorage.setItem(storageKey, JSON.stringify(next));
      } catch {}
      return next;
    });
  }

  const readinessRows = [
    { label: "Environment",        value: asset.readiness.environment?.en        },
    { label: "Display Method",     value: asset.readiness.displayMethod?.en      },
    { label: "Support",            value: asset.readiness.support?.en            },
    { label: "Presentation Level", value: asset.readiness.presentationLevel?.en  },
    { label: "Visual Language",    value: asset.readiness.visualLanguage?.en     },
  ].filter((r) => r.value);

  return (
    <main className="min-h-screen bg-[#070b17] px-4 py-8 text-white md:px-8">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-8">
        <section className="rounded-[34px] border border-cyan-300/20 bg-[radial-gradient(circle_at_top,rgba(32,80,170,0.28),rgba(11,18,39,1)_55%)] p-8 shadow-[0_0_50px_rgba(24,119,242,0.12)] md:p-10">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-4xl">
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">
                {meta.detailLabel}
              </p>
              <h1 className="mt-2 text-4xl font-extrabold md:text-5xl">
                {asset.title.en}
              </h1>
              <p className="mt-3 text-lg text-slate-300">{asset.subtitle.en}</p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href={meta.backHref}
                  className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  {meta.backLabel}
                </Link>
                <Link
                  href="/"
                  className="rounded-xl border border-cyan-400/40 bg-cyan-400/10 px-5 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/20"
                >
                  Back to Main
                </Link>
                <QRCodePanel nameEn={asset.title.en} nameHe={asset.title.he} />
              </div>
            </div>

            <div className="grid min-w-[280px] gap-3 sm:grid-cols-2">
              <InfoPill label="Code"   value={asset.code}      />
              <InfoPill label="Scale"  value={asset.scale}     />
              <InfoPill label="Status" value={asset.status.en} />
              <InfoPill label="Config" value={asset.config.en} />
            </div>
          </div>
        </section>

        <section className="grid gap-8 xl:grid-cols-[1.25fr_0.75fr]">
          <div className="rounded-[32px] border border-cyan-300/20 bg-[#0b1227] p-6 shadow-[0_0_40px_rgba(24,119,242,0.10)]">
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-emerald-400/40 bg-emerald-400/15 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-emerald-100">{asset.status.en}</span>
              <span className="rounded-full border border-cyan-300/35 bg-cyan-400/12 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-cyan-100">{asset.config.en}</span>
              <span className="rounded-full border border-white/15 bg-white/8 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white">{asset.scale}</span>
              {viewerSrc && (
                <span className="rounded-full border border-cyan-300/35 bg-cyan-400/12 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-cyan-100">3D connected</span>
              )}
            </div>

            <div className="overflow-hidden rounded-[24px] border border-cyan-300/20 bg-[url('/covers/iai-cover.png')] bg-cover bg-left-bottom p-4">
              {viewerSrc ? (
                <ModelViewer src={viewerSrc} alt={`${asset.title.en} showcase`} />
              ) : (
                <img
                  src={asset.image}
                  alt={`${asset.title.en} showcase`}
                  className="w-full rounded-[18px] object-contain"
                />
              )}
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {SPEC_FIELDS.map(({ key, label }) => (
                <EditableSpecRow
                  key={key}
                  label={label}
                  value={specs[key]}
                  onChange={(v) => handleSpecChange(key, v)}
                />
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-cyan-300/20 bg-[#0b1227] p-6 shadow-[0_0_40px_rgba(24,119,242,0.10)]">
            <p className="text-[11px] uppercase tracking-[0.3em] text-cyan-300">
              Exhibition Readiness
            </p>

            <div className="mt-5 space-y-4">
              {readinessRows.map((row) => (
                <ReadinessRow key={row.label} label={row.label} value={row.value as string} />
              ))}
            </div>

            {asset.description?.en && (
              <div className="mt-8 border-t border-white/10 pt-6">
                <p className="text-sm leading-7 text-slate-300">{asset.description.en}</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

function EditableSpecRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  useEffect(() => {
    if (editing) inputRef.current?.select();
  }, [editing]);

  function commit() {
    onChange(draft.trim() || value);
    setEditing(false);
  }

  const isTBD = value === "TBD" || value === "N/A";

  if (editing) {
    return (
      <div className="rounded-2xl border border-amber-300/50 bg-amber-300/5 p-4">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{label}</p>
        <input
          ref={inputRef}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") commit();
            if (e.key === "Escape") { setDraft(value); setEditing(false); }
          }}
          onBlur={commit}
          className="mt-2 w-full bg-transparent text-lg font-semibold text-white outline-none border-b border-amber-300/50 pb-0.5"
        />
      </div>
    );
  }

  return (
    <div
      onClick={() => setEditing(true)}
      className={`cursor-pointer rounded-2xl border p-4 transition hover:border-amber-300/40 hover:bg-amber-300/5 ${
        isTBD ? "border-amber-300/20 bg-white/[0.02]" : "border-white/10 bg-white/[0.03]"
      }`}
    >
      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{label}</p>
      <p className={`mt-2 text-lg font-semibold ${isTBD ? "text-amber-300/50 italic" : "text-white"}`}>
        {value}
        {isTBD && (
          <span className="ml-2 text-xs not-italic text-slate-500">click to edit</span>
        )}
      </p>
    </div>
  );
}

function InfoPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-cyan-300/15 bg-white/[0.04] p-4">
      <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">{label}</p>
      <p className="mt-2 text-lg font-bold text-white">{value}</p>
    </div>
  );
}

function ReadinessRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-3 text-sm">
      <span className="text-slate-400">{label}</span>
      <span className="text-right font-medium text-white">{value}</span>
    </div>
  );
}
