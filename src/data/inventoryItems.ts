import { inventoryQuantities } from "./inventoryQuantities";

export type InventoryCategory =
  | "podiums"
  | "flags"
  | "stanchions"
  | "signs"
  | "chairs"
  | "lecterns"
  | "cables"
  | "branding"
  | "table_covers";

export type InventoryCondition = "excellent" | "good" | "fair" | "needs_attention";

export type InventoryItem = {
  id: string;
  category: InventoryCategory;
  fileName: string;
  image: string;
  name: {
    en: string;
    he: string;
  };
  quantity: number;
  condition: InventoryCondition;
  dimensionsCm?: {
    width?: number;
    depth?: number;
    height?: number;
  };
  notes?: string;
};

const baseInventoryItems: Omit<InventoryItem, "quantity">[] = [
  {
    id: "cable-reel-black-blue-01",
    category: "cables",
    fileName: "cable-reel-black-blue-01.png",
    image: "/inventory/cable-reel-black-blue-01.png",
    name: { en: "Cable Reel Black Blue", he: "גלגלת כבל שחור-כחול" },
    condition: "good",
    notes: "Extension cable reel",
  },
  {
    id: "chair-folding-white-01",
    category: "chairs",
    fileName: "chair-folding-white-01.png",
    image: "/inventory/chair-folding-white-01.png",
    name: { en: "White Folding Chair", he: "כיסא מתקפל לבן" },
    condition: "good",
    notes: "Plastic folding chair",
  },
  {
    id: "EB280CFF-logo-iai-small-01",
    category: "branding",
    fileName: "EB280CFF-logo-iai-small-01.png",
    image: "/inventory/EB280CFF-logo-iai-small-01.png",
    name: { en: "IAI Logo Small", he: "לוגו IAI קטן" },
    condition: "good",
    notes: "Current filename kept as-is; can normalize later",
  },
  {
    id: "flag-base-3-pole-stainless-01",
    category: "flags",
    fileName: "flag-base-3-pole-stainless-01.png",
    image: "/inventory/flag-base-3-pole-stainless-01.png",
    name: { en: "3-Pole Stainless Flag Base", he: "בסיס נירוסטה ל-3 מוטות דגל" },
    condition: "good",
    notes: "Triple pole flag stand base",
  },
  {
    id: "flag-base-6-pole-stainless-01",
    category: "flags",
    fileName: "flag-base-6-pole-stainless-01.png",
    image: "/inventory/flag-base-6-pole-stainless-01.png",
    name: { en: "6-Pole Stainless Flag Base", he: "בסיס נירוסטה ל-6 מוטות דגל" },
    condition: "good",
    notes: "Multi pole flag stand base",
  },
  {
    id: "flag-iai-blue-01",
    category: "flags",
    fileName: "flag-iai-blue-01.png",
    image: "/inventory/flag-iai-blue-01.png",
    name: { en: "IAI Blue Flag", he: "דגל IAI כחול" },
    condition: "good",
  },
  {
    id: "flag-iai-white-01",
    category: "flags",
    fileName: "flag-iai-white-01.png",
    image: "/inventory/flag-iai-white-01.png",
    name: { en: "IAI White Flag", he: "דגל IAI לבן" },
    condition: "good",
  },
  {
    id: "flag-pair-iai-israel-01",
    category: "flags",
    fileName: "flag-pair-iai-israel-01.png",
    image: "/inventory/flag-pair-iai-israel-01.png",
    name: { en: "IAI and Israel Flag Pair", he: "זוג דגלים IAI וישראל" },
    condition: "good",
  },
  {
    id: "lectern-acrylic-01",
    category: "lecterns",
    fileName: "lectern-acrylic-01.png",
    image: "/inventory/lectern-acrylic-01.png",
    name: { en: "Acrylic Lectern", he: "פודיום אקרילי" },
    condition: "good",
  },
  {
    id: "logo-iai-large-2m-01",
    category: "branding",
    fileName: "logo-iai-large-2m-01.png",
    image: "/inventory/logo-iai-large-2m-01.png",
    name: { en: "IAI Logo Large 2m", he: "לוגו IAI גדול 2 מטר" },
    condition: "good",
    dimensionsCm: { width: 200, height: 120 },
  },
  {
    id: "podium-rect-35x75x90-01",
    category: "podiums",
    fileName: "podium-rect-35x75x90-01.png",
    image: "/inventory/podium-rect-35x75x90-01.png",
    name: { en: "Rectangular Podium 35×75×90", he: "פודיום מלבני 35×75×90" },
    condition: "good",
    dimensionsCm: { width: 35, depth: 75, height: 90 },
  },
  {
    id: "podium-square-40x40x90-01",
    category: "podiums",
    fileName: "podium-square-40x40x90-01.png",
    image: "/inventory/podium-square-40x40x90-01.png",
    name: { en: "Square Podium 40×40×90", he: "פודיום מרובע 40×40×90" },
    condition: "good",
    dimensionsCm: { width: 40, depth: 40, height: 90 },
  },
  {
    id: "podium-square-50x50x90-01",
    category: "podiums",
    fileName: "podium-square-50x50x90-01.png",
    image: "/inventory/podium-square-50x50x90-01.png",
    name: { en: "Square Podium 50×50×90", he: "פודיום מרובע 50×50×90" },
    condition: "good",
    dimensionsCm: { width: 50, depth: 50, height: 90 },
  },
  {
    id: "podium-square-70x70x90-01",
    category: "podiums",
    fileName: "podium-square-70x70x90-01.png",
    image: "/inventory/podium-square-70x70x90-01.png",
    name: { en: "Square Podium 70×70×90", he: "פודיום מרובע 70×70×90" },
    condition: "good",
    dimensionsCm: { width: 70, depth: 70, height: 90 },
  },
  {
    id: "podium-square-100x100x90-01",
    category: "podiums",
    fileName: "podium-square-100x100x90-01.png",
    image: "/inventory/podium-square-100x100x90-01.png",
    name: { en: "Square Podium 100×100×90", he: "פודיום מרובע 100×100×90" },
    condition: "good",
    dimensionsCm: { width: 100, depth: 100, height: 90 },
  },
  {
    id: "podium-square-130x130x90-01",
    category: "podiums",
    fileName: "podium-square-130x130x90-01.png",
    image: "/inventory/podium-square-130x130x90-01.png",
    name: { en: "Square Podium 130×130×90", he: "פודיום מרובע 130×130×90" },
    condition: "good",
    dimensionsCm: { width: 130, depth: 130, height: 90 },
  },
  {
    id: "sign-stand-black-a4-01",
    category: "signs",
    fileName: "sign-stand-black-a4-01.png",
    image: "/inventory/sign-stand-black-a4-01.png",
    name: { en: "Black A4 Sign Stand", he: "מעמד שילוט A4 שחור" },
    condition: "good",
  },
  {
    id: "sign-stand-silver-a4-01",
    category: "signs",
    fileName: "sign-stand-silver-a4-01.png",
    image: "/inventory/sign-stand-silver-a4-01.png",
    name: { en: "Silver A4 Sign Stand", he: "מעמד שילוט A4 כסוף" },
    condition: "good",
  },
  {
    id: "stanchion-black-01",
    category: "stanchions",
    fileName: "stanchion-black-01.png",
    image: "/inventory/stanchion-black-01.png",
    name: { en: "Black Stanchion", he: "עמוד חסימה שחור" },
    condition: "good",
  },
  {
    id: "table-cover-iai-blue-01",
    category: "table_covers",
    fileName: "table-cover-iai-blue-01.png",
    image: "/inventory/table-cover-iai-blue-01.png",
    name: { en: "IAI Blue Table Cover", he: "כיסוי שולחן IAI כחול" },
    condition: "good",
  },
];

export const inventoryItems: InventoryItem[] = baseInventoryItems.map((item) => ({
  ...item,
  quantity: inventoryQuantities[item.id] ?? 1,
}));
