import { masterExhibits } from "./masterExhibits";
import { airAssets } from "./airAssets";
import { autoAirAssets } from "./airAutoAssets";
import { landAssets } from "./landAssets";
import { navalAssets } from "./navalAssets";

export type ExhibitSection = "space" | "air" | "land" | "naval";

export type UnifiedExhibit = {
  slug: string;
  section: ExhibitSection;
  name: string;
  subtitle: string;
  image: string;
  model3d?: string;
  status: string;
  scale: string;
  code?: string;
  basePath: string;
};

function resolveText(value: { en: string; he: string } | string): string {
  if (typeof value === "string") return value;
  return value?.en ?? "";
}

const spaceExhibits: UnifiedExhibit[] = masterExhibits
  .filter((a) => a.division === "mtach" && a.subdivision === "halal")
  .map((a) => ({
    slug: a.slug,
    section: "space" as const,
    name: a.nameEn,
    subtitle: a.subtitle?.en ?? "",
    image: a.image,
    model3d: a.model3d || undefined,
    status: a.status?.en ?? "Approved",
    scale: a.scale ?? "",
    code: a.code,
    basePath: "/space",
  }));

const seenAirSlugs = new Set<string>();
const rawAirAssets = [...(Array.isArray(airAssets) ? airAssets : []), ...(Array.isArray(autoAirAssets) ? autoAirAssets : [])];
const dedupedAirAssets = rawAirAssets.filter((a) => {
  if (seenAirSlugs.has(a.slug)) return false;
  seenAirSlugs.add(a.slug);
  return true;
});

const airExhibits: UnifiedExhibit[] = dedupedAirAssets.map((a: any) => ({
  slug: a.slug,
  section: "air",
  name: resolveText(a.title),
  subtitle: resolveText(a.subtitle),
  image: a.image ?? "",
  model3d: a.model3d,
  status: resolveText(a.status),
  scale: a.scale ?? "",
  code: a.code,
  basePath: "/air",
}));

const landExhibits: UnifiedExhibit[] = landAssets.map((a) => ({
  slug: a.slug,
  section: "land",
  name: a.name,
  subtitle: a.subtitle,
  image: a.image,
  model3d: a.model3d,
  status: a.status,
  scale: a.scale,
  basePath: "/land",
}));

const navalExhibits: UnifiedExhibit[] = navalAssets.map((a) => ({
  slug: a.slug,
  section: "naval",
  name: a.name,
  subtitle: a.subtitle,
  image: a.image,
  model3d: a.model3d,
  status: a.status,
  scale: a.scale,
  basePath: "/naval",
}));

export const allExhibits: UnifiedExhibit[] = [
  ...spaceExhibits,
  ...airExhibits,
  ...landExhibits,
  ...navalExhibits,
];

export function getExhibitsBySection(section: ExhibitSection): UnifiedExhibit[] {
  return allExhibits.filter((e) => e.section === section);
}

export function getExhibitBySlug(slug: string): UnifiedExhibit | undefined {
  return allExhibits.find((e) => e.slug === slug);
}
