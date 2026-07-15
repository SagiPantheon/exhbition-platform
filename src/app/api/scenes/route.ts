import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const SCENES_DIR = path.join(process.cwd(), "public", "scenes");

async function ensureDir() {
  await fs.mkdir(SCENES_DIR, { recursive: true });
}

export async function GET() {
  await ensureDir();
  const files = await fs.readdir(SCENES_DIR);
  const names = files
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(/\.json$/, ""));
  return NextResponse.json({ scenes: names });
}

export async function POST(req: NextRequest) {
  await ensureDir();
  const body = await req.json();
  const { name, tentType, sceneItems, signs, brackets } = body as {
    name: string;
    tentType: string;
    sceneItems: unknown;
    signs?: unknown;
    brackets?: unknown;
  };

  if (!name || typeof name !== "string" || !name.trim()) {
    return NextResponse.json({ error: "Missing name" }, { status: 400 });
  }

  const safeName = name.trim().replace(/[/\\?%*:|"<>]/g, "-");
  const filePath = path.join(SCENES_DIR, `${safeName}.json`);
  await fs.writeFile(
    filePath,
    JSON.stringify({ tentType, sceneItems, signs: signs ?? [], brackets: brackets ?? [] }, null, 2),
    "utf-8"
  );

  return NextResponse.json({ ok: true, name: safeName });
}
