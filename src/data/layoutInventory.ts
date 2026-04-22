export type LayoutInventoryCategory =
  | "branding"
  | "display"
  | "furniture"
  | "lighting"
  | "flags"
  | "screens"
  | "structures"
  | "exhibits";

export type LayoutInventoryType =
  | "logo"
  | "podium"
  | "lectern"
  | "chair"
  | "flag"
  | "flagpair"
  | "lightbox"
  | "backwall"
  | "table"
  | "signage"
  | "signstand"
  | "barrier"
  | "screen"
  | "screenstand"
  | "inflatableTentSmall"
  | "exhibit";

export type LayoutInventoryItem = {
  id: string;
  type: LayoutInventoryType;
  label: string;
  category: LayoutInventoryCategory;
  color?: string;
  width?: number;
  depth?: number;
  height?: number;
  defaultScale?: number;
  model3d?: string;
  image?: string;
};

export const layoutInventory: LayoutInventoryItem[] = [
  {
    id: "iai-logo-blue",
    type: "logo",
    label: "לוגו IAI",
    category: "branding",
    model3d: "/models/inventor/blue+logo+3d+model.glb",
    defaultScale: 1,
  },
  {
    id: "podium-standard",
    type: "podium",
    label: "פודיום",
    category: "display",
    width: 0.7,
    depth: 0.7,
    height: 0.9,
    defaultScale: 1,
  },
  {
    id: "lectern-standard",
    type: "lectern",
    label: "פודיום נואם",
    category: "display",
    width: 0.55,
    depth: 0.42,
    height: 1.15,
    defaultScale: 1,
  },
  {
    id: "chair-folding-white",
    type: "chair",
    label: "כיסא",
    category: "furniture",
    width: 0.52,
    depth: 0.52,
    height: 0.9,
    defaultScale: 1,
  },
  {
    id: "flag-single",
    type: "flag",
    label: "דגל",
    category: "flags",
    height: 1.8,
    defaultScale: 1,
  },
  {
    id: "flag-pair",
    type: "flagpair",
    label: "זוג דגלים",
    category: "flags",
    height: 1.8,
    defaultScale: 1,
  },
  {
    id: "lightbox-standard",
    type: "lightbox",
    label: "לייטבוקס",
    category: "lighting",
    width: 1,
    depth: 0.28,
    height: 1.7,
    defaultScale: 1,
  },
  {
    id: "backwall-standard",
    type: "backwall",
    label: "קיר רקע",
    category: "branding",
    width: 3,
    depth: 0.12,
    height: 2.8,
    defaultScale: 1,
  },
  {
    id: "table-standard",
    type: "table",
    label: "שולחן",
    category: "furniture",
    width: 1.8,
    depth: 0.75,
    height: 0.75,
    defaultScale: 1,
  },
  {
    id: "signage-standard",
    type: "signage",
    label: "שילוט",
    category: "branding",
    width: 0.5,
    depth: 0.05,
    height: 0.8,
    defaultScale: 1,
  },
  {
    id: "signstand-standard",
    type: "signstand",
    label: "מעמד שילוט",
    category: "branding",
    width: 0.42,
    depth: 0.04,
    height: 1.2,
    defaultScale: 1,
  },
  {
    id: "barrier-standard",
    type: "barrier",
    label: "מחסום",
    category: "structures",
    width: 1.2,
    depth: 0.18,
    height: 0.55,
    defaultScale: 1,
  },
  {
    id: "screen-standard",
    type: "screen",
    label: "מסך",
    category: "screens",
    width: 1.7,
    depth: 0.08,
    height: 1.05,
    defaultScale: 1,
  },
  {
    id: "screen-stand-standard",
    type: "screenstand",
    label: "מעמד מסכים",
    category: "screens",
    width: 1.2,
    depth: 0.6,
    height: 1.8,
    defaultScale: 1,
  },
  {
    id: "inflatable-tent-small",
    type: "inflatableTentSmall",
    label: "אוהל מתנפח קטן",
    category: "structures",
    width: 4,
    depth: 4,
    height: 3,
    defaultScale: 1,
  },
  {
    id: "exhibit-optsat-500",
    type: "exhibit",
    label: "OPTSAT 500",
    category: "exhibits",
    model3d: "/models/space/optsat-500-showcase-3d.glb",
    defaultScale: 1,
  },
  {
    id: "exhibit-optsar-550",
    type: "exhibit",
    label: "OPTSAR 550",
    category: "exhibits",
    model3d: "/models/space/optsar-550-showcase-3d.glb",
    defaultScale: 1,
  },
  {
    id: "exhibit-tecsar",
    type: "exhibit",
    label: "TECSAR",
    category: "exhibits",
    model3d: "/models/space/tecsar-showcase-3d.glb",
    defaultScale: 1,
  },
  {
    id: "exhibit-3dcapture",
    type: "exhibit",
    label: "3DCAPTURE",
    category: "exhibits",
    model3d: "/models/land/3dcapture-showcase-3d.glb",
    defaultScale: 1,
  },
  {
    id: "exhibit-arrow-2",
    type: "exhibit",
    label: "Arrow 2",
    category: "exhibits",
    model3d: "/models/air/arrow-2-showcase-3d.glb",
    defaultScale: 1,
  },
  {
    id: "exhibit-lora",
    type: "exhibit",
    label: "LORA",
    category: "exhibits",
    model3d: "/models/air/lora-showcase-3d.glb",
    defaultScale: 1,
  },
  {
    id: "exhibit-arrow-3-launcher",
    type: "exhibit",
    label: "Arrow 3 Launcher",
    category: "exhibits",
    model3d: "/models/air/arrow-3-showcase-3d.glb",
    defaultScale: 1,
  },
];
