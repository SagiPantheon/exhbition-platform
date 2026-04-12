import fs from "fs";
import path from "path";

const root = process.cwd();

const imageDir = path.join(root, "public", "images", "air");
const modelDir = path.join(root, "public", "models", "air");
const metaDir = path.join(root, "src", "data", "air-sync");
const outFile = path.join(root, "src", "data", "airAutoAssets.ts");

// Эти slug остаются ручными и не должны попадать в auto-assets.
const manualSlugs = new Set([
  "arrow-2",
  "arrow-3",
  "heron",
  "lora",
  "wanderb",
]);

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n", "utf8");
}

function titleFromSlug(slug) {
  return slug
    .split("-")
    .map((part) => {
      if (/^\d+$/.test(part)) return part;
      if (part.length <= 3) return part.toUpperCase();
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join(" ");
}

function defaultMeta(slug, index, imageFile, inferredModelFile) {
  const title = titleFromSlug(slug);

  return {
    slug,
    code: `AR-AUTO-${String(index).padStart(3, "0")}`,

    titleEn: title,
    titleHe: title,

    subtitleEn: `${title} display for premium exhibition presentation.`,
    subtitleHe: `${title} לתצוגת פרימיום בתערוכה.`,

    descriptionEn: `Prepared for premium exhibition display and operational presentation.`,
    descriptionHe: `מוכן לתצוגת פרימיום ולהצגה מבצעית בתערוכה.`,

    statusEn: "Approved",
    statusHe: "מאושר",

    configEn: "Exhibition display",
    configHe: "תצוגת תערוכה",

    missionType: "defense",
    assetCategory: "system",
    scale: "1:1",

    image: `/images/air/${imageFile}`,

    // Главный ручной рубильник 3D
    use3d: false,

    // Если когда-то захочешь включить 3D — либо впиши точный путь руками,
    // либо поставь use3d=true и оставь пусто, если basename совпадает.
    model3d: inferredModelFile ? `/models/air/${inferredModelFile}` : "",

    specs: {
      length: "TBD",
      width: "TBD",
      height: "TBD",
      weight: "TBD",
      standDiameter: "N/A",
      standWeight: "N/A",
    },

    readiness: {
      environment: {
        en: "Indoor / Outdoor",
        he: "פנים / חוץ",
      },
      displayMethod: {
        en: "Static display",
        he: "תצוגה סטטית",
      },
      support: {
        en: "Integrated support base",
        he: "בסיס תמיכה משולב",
      },
      presentationLevel: {
        en: "Premium",
        he: "פרימיום",
      },
      visualLanguage: {
        en: "Premium exhibition asset",
        he: "מוצג תערוכה פרימיום",
      },
    },
  };
}

function normalizeMeta(meta, fallback) {
  return {
    slug: meta.slug || fallback.slug,
    code: meta.code || fallback.code,

    titleEn: meta.titleEn || fallback.titleEn,
    titleHe: meta.titleHe || fallback.titleHe,

    subtitleEn: meta.subtitleEn || fallback.subtitleEn,
    subtitleHe: meta.subtitleHe || fallback.subtitleHe,

    descriptionEn: meta.descriptionEn || fallback.descriptionEn,
    descriptionHe: meta.descriptionHe || fallback.descriptionHe,

    statusEn: meta.statusEn || fallback.statusEn,
    statusHe: meta.statusHe || fallback.statusHe,

    configEn: meta.configEn || fallback.configEn,
    configHe: meta.configHe || fallback.configHe,

    missionType: meta.missionType || fallback.missionType,
    assetCategory: meta.assetCategory || fallback.assetCategory,
    scale: meta.scale || fallback.scale,

    image: meta.image || fallback.image,

    use3d: Boolean(meta.use3d),
    model3d: typeof meta.model3d === "string" ? meta.model3d : fallback.model3d,

    specs: {
      ...fallback.specs,
      ...(meta.specs || {}),
    },

    readiness: {
      ...fallback.readiness,
      ...(meta.readiness || {}),
      environment: {
        ...fallback.readiness.environment,
        ...((meta.readiness && meta.readiness.environment) || {}),
      },
      displayMethod: {
        ...fallback.readiness.displayMethod,
        ...((meta.readiness && meta.readiness.displayMethod) || {}),
      },
      support: {
        ...fallback.readiness.support,
        ...((meta.readiness && meta.readiness.support) || {}),
      },
      presentationLevel: {
        ...fallback.readiness.presentationLevel,
        ...((meta.readiness && meta.readiness.presentationLevel) || {}),
      },
      visualLanguage: {
        ...fallback.readiness.visualLanguage,
        ...((meta.readiness && meta.readiness.visualLanguage) || {}),
      },
    },
  };
}

function fileExists(p) {
  if (!p || typeof p !== "string") return false;

  const clean = p.replace(/^\//, "");

  if (clean.startsWith("images/") || clean.startsWith("models/")) {
    return fs.existsSync(path.join(root, "public", clean));
  }

  return fs.existsSync(path.join(root, clean));
}

function relativePublicPathFromAbsolute(absPath, publicTypeFolder) {
  return `/${publicTypeFolder}/air/${path.basename(absPath)}`;
}

ensureDir(metaDir);

const imageFiles = fs.existsSync(imageDir)
  ? fs
      .readdirSync(imageDir)
      .filter((file) => /\.(png|jpg|jpeg|webp)$/i.test(file))
      .sort()
  : [];

const modelFiles = fs.existsSync(modelDir)
  ? fs
      .readdirSync(modelDir)
      .filter((file) => /\.(glb|gltf)$/i.test(file))
      .sort()
  : [];

const modelMap = new Map();
for (const file of modelFiles) {
  modelMap.set(path.parse(file).name, file);
}

const imageEntries = imageFiles
  .filter((file) => file.includes("-showcase"))
  .map((file) => {
    const slug = file.replace(/\.(png|jpg|jpeg|webp)$/i, "").replace(/-showcase$/i, "");
    return { slug, imageFile: file };
  });

const assets = [];
const logs = [];
let autoIndex = 1;

for (const entry of imageEntries) {
  const { slug, imageFile } = entry;

  if (manualSlugs.has(slug)) {
    logs.push(`[SKIP] ${slug} → manual asset slug`);
    continue;
  }

  const inferredModelFile = modelMap.get(slug) || "";
  const metaPath = path.join(metaDir, `${slug}.json`);

  const fallback = defaultMeta(slug, autoIndex, imageFile, inferredModelFile);
  let meta = fallback;

  if (fs.existsSync(metaPath)) {
    meta = normalizeMeta(readJson(metaPath), fallback);
  } else {
    writeJson(metaPath, fallback);
    meta = fallback;
  }

  const issues = [];

  if (!meta.image || !fileExists(meta.image)) {
    issues.push(`[ERROR] ${slug} → image missing: ${meta.image || "(empty)"}`);
  }

  let finalModel3d = "";

  if (meta.use3d) {
    if (meta.model3d && fileExists(meta.model3d)) {
      finalModel3d = meta.model3d;
    } else if (!meta.model3d && inferredModelFile) {
      finalModel3d = `/models/air/${inferredModelFile}`;
      issues.push(`[WARN] ${slug} → use3d=true, using inferred model: ${finalModel3d}`);
    } else {
      issues.push(`[ERROR] ${slug} → use3d=true but valid model is missing`);
    }
  } else {
    if (meta.model3d) {
      issues.push(`[WARN] ${slug} → model exists in metadata but use3d=false, 3D disabled`);
    } else {
      issues.push(`[OK] ${slug} → 2D only`);
    }
  }

  const asset = {
    slug: meta.slug,
    code: meta.code,
    image: meta.image,
    missionType: meta.missionType,
    assetCategory: meta.assetCategory,
    title: {
      en: meta.titleEn,
      he: meta.titleHe,
    },
    subtitle: {
      en: meta.subtitleEn,
      he: meta.subtitleHe,
    },
    description: {
      en: meta.descriptionEn,
      he: meta.descriptionHe,
    },
    status: {
      en: meta.statusEn,
      he: meta.statusHe,
    },
    config: {
      en: meta.configEn,
      he: meta.configHe,
    },
    scale: meta.scale,
    specs: meta.specs,
    readiness: meta.readiness,
  };

  if (finalModel3d) {
    asset.model3d = finalModel3d;
    issues.push(`[OK] ${slug} → 3D enabled: ${finalModel3d}`);
  }

  assets.push(asset);
  autoIndex += 1;
  logs.push(...issues);
}

const ts = `// AUTO-GENERATED FILE. DO NOT EDIT DIRECTLY.
// Edit per-asset values in: src/data/air-sync/<slug>.json
export const autoAirAssets = ${JSON.stringify(assets, null, 2)};
`;

fs.writeFileSync(outFile, ts, "utf8");

console.log("");
console.log("=== AIR SYNC REPORT ===");
for (const line of logs) console.log(line);
console.log("=======================");
console.log(`Synced ${assets.length} Air auto-assets.`);
console.log(`Generated: ${path.relative(root, outFile)}`);
console.log(`Editable metadata folder: ${path.relative(root, metaDir)}`);
