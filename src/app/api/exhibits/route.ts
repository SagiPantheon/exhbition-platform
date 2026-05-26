import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import type { MasterExhibit } from "../../../data/masterExhibits";
import { masterExhibits } from "../../../data/masterExhibits";

const OVERRIDES_DIR = path.join(process.cwd(), "public", "exhibit-overrides");

async function ensureDir() {
  await fs.mkdir(OVERRIDES_DIR, { recursive: true });
}

async function readOverrides(): Promise<Partial<MasterExhibit>[]> {
  await ensureDir();
  try {
    const raw = await fs.readFile(path.join(OVERRIDES_DIR, "overrides.json"), "utf-8");
    return JSON.parse(raw) as Partial<MasterExhibit>[];
  } catch {
    return [];
  }
}

async function writeOverrides(overrides: Partial<MasterExhibit>[]) {
  await ensureDir();
  await fs.writeFile(
    path.join(OVERRIDES_DIR, "overrides.json"),
    JSON.stringify(overrides, null, 2),
    "utf-8"
  );
}

function mergeExhibit(base: MasterExhibit, override: Partial<MasterExhibit>): MasterExhibit {
  return { ...base, ...override, slug: base.slug };
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const division = searchParams.get("division");
  const subdivision = searchParams.get("subdivision");
  const slug = searchParams.get("slug");

  const overrides = await readOverrides();
  const overrideMap = new Map(overrides.map((o) => [o.slug, o]));

  let exhibits = masterExhibits.map((e) => {
    const override = overrideMap.get(e.slug);
    return override ? mergeExhibit(e, override) : e;
  });

  if (division) exhibits = exhibits.filter((e) => e.division === division);
  if (subdivision) exhibits = exhibits.filter((e) => e.subdivision === subdivision);
  if (slug) exhibits = exhibits.filter((e) => e.slug === slug);

  return NextResponse.json({ exhibits });
}

export async function PATCH(req: NextRequest) {
  const body = await req.json() as Partial<MasterExhibit> & { slug: string };

  if (!body.slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }

  const exists = masterExhibits.some((e) => e.slug === body.slug);
  if (!exists) {
    return NextResponse.json({ error: "Exhibit not found" }, { status: 404 });
  }

  const overrides = await readOverrides();
  const idx = overrides.findIndex((o) => o.slug === body.slug);
  if (idx >= 0) {
    overrides[idx] = { ...overrides[idx], ...body };
  } else {
    overrides.push(body);
  }
  await writeOverrides(overrides);

  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }

  const overrides = await readOverrides();
  const filtered = overrides.filter((o) => o.slug !== slug);
  await writeOverrides(filtered);

  return NextResponse.json({ ok: true });
}
