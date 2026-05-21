export type MasterExhibitDivision = "air" | "land" | "naval" | "space" | "inventory";

export type MasterExhibit = {
  slug: string;
  nameHe: string;
  nameEn: string;
  division: MasterExhibitDivision;
  model3d: string;
  image: string;
  hasModel: boolean;
};

export const masterExhibits: MasterExhibit[] = [
  // ── SPACE (7) ──────────────────────────────────────────────────────────────
  { slug: "mcs",         division: "space", nameEn: "MCS",         nameHe: "MCS",        model3d: "/models/space/mcs-showcase-3d.glb",        image: "/images/space/mcs-showcase.png",        hasModel: true  },
  { slug: "optsat-500",  division: "space", nameEn: "OPTSAT-500",  nameHe: "OPTSAT-500", model3d: "/models/space/optsat-500-showcase-3d.glb",  image: "/images/space/optsat-500-showcase.png",  hasModel: true  },
  { slug: "optsar-550",  division: "space", nameEn: "OPTSAR-550",  nameHe: "OPTSAR-550", model3d: "/models/space/optsar-550-showcase-3d.glb",  image: "/images/space/optsar-550-showcase.png",  hasModel: true  },
  { slug: "optsat-3000", division: "space", nameEn: "OPTSAT 3000", nameHe: "OPTSAT 3000",model3d: "/models/space/optsat-3000-showcase-3d.glb", image: "/images/space/optsat-3000-showcase.png", hasModel: true  },
  { slug: "tecsar",      division: "space", nameEn: "TECSAR",      nameHe: "TECSAR",     model3d: "/models/space/tecsar-showcase-3d.glb",      image: "/images/space/tecsar-showcase.png",      hasModel: true  },
  { slug: "beresheet",   division: "space", nameEn: "Beresheet",   nameHe: "בראשית",     model3d: "/models/space/beresheet-showcase-3d.glb",   image: "/images/space/beresheet-showcase.png",   hasModel: true  },
  { slug: "shavit",      division: "space", nameEn: "Shavit",      nameHe: "שביט",       model3d: "/models/space/shavit-showcase-3d.glb",      image: "/images/space/shavit-showcase.png",      hasModel: true  },

  // ── AIR — original (9, not in airAutoAssets) ───────────────────────────────
  { slug: "arrow-2",          division: "air", nameEn: "Arrow 2",          nameHe: "חץ 2",         model3d: "/models/air/arrow-2-showcase-3d.glb",        image: "/images/air/arrow-2-showcase.png",          hasModel: true  },
  { slug: "arrow-3-missile",  division: "air", nameEn: "Arrow 3",          nameHe: "חץ 3",         model3d: "/models/air/arrow-3-showcase-3d.glb",        image: "/images/air/arrow-3-showcase.png",          hasModel: true  },
  { slug: "arrow-3-launcher", division: "air", nameEn: "Arrow 3 Launcher", nameHe: "מפעיל חץ 3",   model3d: "",                                           image: "/images/air/arrow-3-launcher-showcase.png", hasModel: false },
  { slug: "lora",             division: "air", nameEn: "LORA",             nameHe: "לורה",         model3d: "/models/air/lora-showcase-3d.glb",           image: "/images/air/lora-showcase.png",             hasModel: true  },
  { slug: "heron",            division: "air", nameEn: "Heron",            nameHe: "הרון",         model3d: "/models/air/heron-showcase-3d.glb",          image: "/images/air/heron-showcase.png",            hasModel: true  },
  { slug: "wanderb",          division: "air", nameEn: "WanderB",          nameHe: "וונדר B",      model3d: "/models/air/wanderb-showcase-3d.glb",        image: "/images/air/wanderb-showcase.png",          hasModel: true  },
  { slug: "wanderb2",         division: "air", nameEn: "WanderB 2",        nameHe: "וונדר B2",     model3d: "",                                           image: "/images/air/wanderb2-showcase.png",         hasModel: false },
  { slug: "777",              division: "air", nameEn: "Boeing 777",       nameHe: "בואינג 777",   model3d: "/models/air/777-showcase-3d.glb",            image: "/images/air/777-showcase.png",              hasModel: true  },
  { slug: "b767",             division: "air", nameEn: "Boeing 767",       nameHe: "בואינג 767",   model3d: "/models/air/b767-showcase-3d.glb",           image: "/images/air/b767-showcase.png",             hasModel: true  },

  // ── AIR — from airAutoAssets (19 shared + 5 unique) ───────────────────────
  { slug: "mmr",           division: "air", nameEn: "MMR",           nameHe: "מכ״ם MMR",     model3d: "/models/air/mmr-showcase-3d.glb",            image: "/images/air/mmr-showcase.png",           hasModel: true  },
  { slug: "arrow-4",       division: "air", nameEn: "Arrow 4",       nameHe: "חץ 4",         model3d: "",                                           image: "/images/air/arrow-4-showcase.png",       hasModel: false },
  { slug: "thunder-vtol",  division: "air", nameEn: "Thunder VTOL",  nameHe: "ת׳אנדר VTOL",  model3d: "/models/air/thunderb-showcase-3d.glb",       image: "/images/air/Thunderb-showcase.png",      hasModel: true  },
  { slug: "harop",         division: "air", nameEn: "HAROP",         nameHe: "הרופ",         model3d: "/models/air/harop-showcase-3d.glb",          image: "/images/air/harop-showcase.png",         hasModel: true  },
  { slug: "mini-harpy",    division: "air", nameEn: "Mini Harpy",    nameHe: "מיני הרפי",    model3d: "/models/air/mini-harop-showcase-3d.glb",     image: "/images/air/mini-harpy-showcase.png",    hasModel: true  },
  { slug: "lahat",         division: "air", nameEn: "LAHAT",         nameHe: "להט",          model3d: "/models/air/lahat-showcase-3d.glb",          image: "/images/air/lahat-showcase.png",         hasModel: true  },
  { slug: "lahat-alfa",    division: "air", nameEn: "LAHAT ALFA",    nameHe: "להט אלפא",     model3d: "/models/air/lahat-alfa-showcase-3d.glb",     image: "/images/air/lahat-alfa-showcase.png",    hasModel: true  },
  { slug: "barak-launcher",division: "air", nameEn: "Barak Launcher",nameHe: "משגר ברק",     model3d: "/models/air/barak-launcher-showcase-3d.glb", image: "/images/air/barak-launcher-showcase.png",hasModel: true  },
  { slug: "arrow-launcher",division: "air", nameEn: "Arrow Launcher",nameHe: "משגר חץ",      model3d: "/models/air/arrow-launcher-showcase-3d.glb",image: "/images/air/arrow-launcher-showcase.png",hasModel: true  },
  { slug: "elm-2058",      division: "air", nameEn: "ELM-2058",      nameHe: "מכ״ם ELM-2058",model3d: "/models/air/elw2058-showcase-3d.glb",        image: "/images/air/elm-2058-showcase.png",      hasModel: true  },
  { slug: "wasp",          division: "air", nameEn: "WASP",          nameHe: "צרעה",         model3d: "",                                           image: "/images/air/wasp-showcase.png",          hasModel: false },
  { slug: "minipop",       division: "air", nameEn: "MINIPOP",       nameHe: "מיני-פופ",     model3d: "",                                           image: "/images/air/minipop-showcase.png",       hasModel: false },
  { slug: "megapop",       division: "air", nameEn: "MEGAPOP",       nameHe: "מגה-פופ",      model3d: "/models/air/megapop-showcase-3d.glb",        image: "/images/air/megapop-showcase.png",       hasModel: true  },
  { slug: "pop1000",       division: "air", nameEn: "POP 1000",      nameHe: "פופ 1000",     model3d: "/models/air/pop1000-showcase-3d.glb",        image: "/images/air/pop1000-showcase.png",       hasModel: true  },
  { slug: "pointblank",    division: "air", nameEn: "POINTBLANK",    nameHe: "פוינטבלנק",    model3d: "/models/air/point-blank-showcase-3d.glb",    image: "/images/air/pointblank-showcase.png",    hasModel: true  },
  { slug: "microwami",     division: "air", nameEn: "MICROWAMI",     nameHe: "מיקרוואמי",    model3d: "/models/air/microwami-showcase-3d.glb",      image: "/images/air/microwami-showcase.png",     hasModel: true  },
  { slug: "rotem",         division: "air", nameEn: "ROTEM",         nameHe: "רותם",         model3d: "/models/air/rotem-showcase-3d.glb",          image: "/images/air/rotem-showcase.png",         hasModel: true  },
  { slug: "apus25",        division: "air", nameEn: "APUS 25",       nameHe: "אפוס 25",      model3d: "/models/air/apus-25-showcase-3d.glb",        image: "/images/air/apus25-showcase.png",        hasModel: true  },
  { slug: "apus60",        division: "air", nameEn: "APUS 60",       nameHe: "אפוס 60",      model3d: "/models/air/apus-60-showcase-3d.glb",        image: "/images/air/apus60-showcase.png",        hasModel: true  },
  // 5 unique to airAutoAssets — paths corrected per disk audit
  { slug: "eitan",         division: "air", nameEn: "Eitan",         nameHe: "איתן",         model3d: "/models/air/eitan-showcase-3d.glb",          image: "/images/air/Eitan-showcase.PNG",          hasModel: true  },
  { slug: "heronmk2",      division: "air", nameEn: "Heron Mk2",     nameHe: "הרון Mk2",     model3d: "/models/air/heron-mk2-showcase-3d.glb",      image: "/images/air/HeronMk2-showcase.PNG",       hasModel: true  },
  { slug: "kc140",         division: "air", nameEn: "KC-140",        nameHe: "KC-140",       model3d: "/models/air/kc140-showcase-3d.glb",          image: "/images/air/kc140-showcase.PNG",          hasModel: true  },
  { slug: "othello",       division: "air", nameEn: "Othello",       nameHe: "אותלו",        model3d: "/models/air/othello-showcase-3d.glb",        image: "/images/air/Othello-showcase.PNG",        hasModel: true  },
  { slug: "quadcopter2",   division: "air", nameEn: "Quadcopter 2",  nameHe: "קוואדקופטר 2", model3d: "/models/air/quadcopter2-showcase-3d.glb",    image: "/images/air/quadcopter2-showcase.PNG",    hasModel: true  },

  // ── LAND (4) ───────────────────────────────────────────────────────────────
  { slug: "zmag",      division: "land", nameEn: "ZMAG",      nameHe: "ZMAG",      model3d: "/models/land/zmag-showcase-3d.glb",      image: "/images/land/zmag-showcase.png",      hasModel: true },
  { slug: "3dcapture", division: "land", nameEn: "3DCAPTURE", nameHe: "3DCAPTURE", model3d: "/models/land/3dcapture-showcase-3d.glb", image: "/images/land/3dcapture-showcase.png", hasModel: true },
  { slug: "panda",     division: "land", nameEn: "PANDA",     nameHe: "PANDA",     model3d: "/models/land/panda-showcase-3d.glb",     image: "/images/land/panda-showcase.png",     hasModel: true },
  { slug: "robattle",  division: "land", nameEn: "RoBattle",  nameHe: "רובטל",     model3d: "/models/land/robattle-showcase-3d.glb",  image: "/images/land/robattle-showcase.png",  hasModel: true },

  // ── NAVAL (1) ──────────────────────────────────────────────────────────────
  { slug: "katana", division: "naval", nameEn: "Katana", nameHe: "קתנה", model3d: "/models/naval/katana-showcase.glb", image: "/images/naval/katana.png", hasModel: true },

  // ── INVENTORY (25) ────────────────────────────────────────────────────────
  // Legacy 6 — mapped to lightbox models
  { slug: "inv-table",      division: "inventory", nameEn: "Table",       nameHe: "שולחן",  model3d: "/models/inventory/blue-table-01.glb",              image: "/inventory/table-cover-iai-blue-01.png", hasModel: true },
  { slug: "inv-chair",      division: "inventory", nameEn: "Chair",       nameHe: "כיסא",   model3d: "",                                                  image: "/inventory/chair.PNG", hasModel: false },
  { slug: "inv-sofa",       division: "inventory", nameEn: "Sofa",        nameHe: "ספה",    model3d: "",                                                  image: "", hasModel: false },
  { slug: "inv-coffee-bar", division: "inventory", nameEn: "Coffee Bar",  nameHe: "בר קפה", model3d: "",                                                  image: "", hasModel: false },
  { slug: "inv-stand",      division: "inventory", nameEn: "Stand",       nameHe: "דוכן",   model3d: "/models/inventory/lightbox-vertical-iai.glb",      image: "/inventory/podium-rect-35x75x90-01.png", hasModel: true },
  { slug: "inv-projector",  division: "inventory", nameEn: "Lightbox",    nameHe: "לייטבוקס", model3d: "/models/inventory/lightbox-horizontal-iai-01.glb", image: "/inventory/lightbox-vertical-globe-01.png", hasModel: true },
  // New 19
  { slug: "inv-stage-blue",    division: "inventory", nameEn: "Blue Stage",      nameHe: "במה כחולה",     model3d: "/models/inventory/stage-blue-01.glb",              image: "/inventory/stage-130-130.PNG", hasModel: true },
  { slug: "inv-screen",        division: "inventory", nameEn: "Screen Stand",    nameHe: "מסך",           model3d: "/models/inventory/screen-stand-iai-01.glb",        image: "/inventory/screen-stand.PNG", hasModel: true },
  { slug: "inv-logo-white",    division: "inventory", nameEn: "White Logo",      nameHe: "לוגו לבן",      model3d: "/models/inventory/logo-white-iai-01.glb",          image: "", hasModel: true },
  { slug: "inv-loudspeaker",   division: "inventory", nameEn: "Speaker",         nameHe: "רמקול",         model3d: "/models/inventory/loudspeaker-iai.glb",            image: "/inventory/loudspeaker.PNG", hasModel: true },
  { slug: "inv-folding-chair", division: "inventory", nameEn: "Folding Chair",   nameHe: "כיסא מתקפל",    model3d: "/models/inventory/folding-chair-iai.glb",          image: "/inventory/chair-folding-white-01.png", hasModel: true },
  { slug: "inv-flag-china",    division: "inventory", nameEn: "China Flag",      nameHe: "דגל סיני",      model3d: "/models/inventory/flag-china-01.glb",              image: "", hasModel: true },
  { slug: "inv-camo",          division: "inventory", nameEn: "Camo Net",        nameHe: "רשת הסוואה",    model3d: "/models/inventory/camouflage-iai-01.glb",          image: "/inventory/camouflage.PNG", hasModel: true },
  { slug: "inv-arch",          division: "inventory", nameEn: "Inflatable Arch", nameHe: "שער מתנפח",     model3d: "/models/inventory/inflatable-arch-01.glb",         image: "", hasModel: true },
  { slug: "inv-queue-poles",   division: "inventory", nameEn: "Queue Poles",     nameHe: "עמודי תור",     model3d: "/models/inventory/queue-poles-01.glb",             image: "/inventory/stanchion-black-01.png", hasModel: true },
  { slug: "inv-phone-storage", division: "inventory", nameEn: "Phone Storage",   nameHe: "מתקן טלפונים",  model3d: "/models/inventory/phone-storage-01.glb",           image: "/inventory/desk-phone.PNG", hasModel: true },
  { slug: "inv-stage-small",   division: "inventory", nameEn: "Small Stage",     nameHe: "במה קטנה",      model3d: "/models/inventory/stage-blue-1m-01.glb",           image: "/inventory/stage-50-50.PNG", hasModel: true },
  { slug: "inv-armchair",      division: "inventory", nameEn: "Armchair",        nameHe: "קורסא",         model3d: "/models/inventory/armchair-01.glb",                image: "", hasModel: true },
  { slug: "inv-inflatable-tent",division: "inventory",nameEn: "Inflatable Tent", nameHe: "אוהל מתנפח",    model3d: "/models/inventory/inflatable-tent-01.glb",         image: "/inventory/tent-dome-iai-blue-01.png", hasModel: true },
  { slug: "inv-lightbox2",     division: "inventory", nameEn: "Lightbox 2",      nameHe: "לייטבוקס 2",    model3d: "/models/inventory/ligthbox-horizontal-iai-02.glb", image: "/inventory/lightbox-horizontal-multidomain-01.jpeg", hasModel: true },
  { slug: "inv-podium",        division: "inventory", nameEn: "Podium",          nameHe: "פודיום",        model3d: "/models/inventory/acrylic-podium-iai.glb",         image: "/inventory/lectern-acrylic-01.png", hasModel: true },
  { slug: "inv-digital-sign",  division: "inventory", nameEn: "Digital Signage", nameHe: "שילוט דיגיטלי", model3d: "/models/inventory/digital-signage-01.glb",         image: "/inventory/digital-screen.PNG", hasModel: true },
  { slug: "inv-magnetic-sign", division: "inventory", nameEn: "Magnetic Signage",nameHe: "שילוט מגנטי",   model3d: "/models/inventory/magnetic-signage-01.glb",        image: "/inventory/magnetic-desk.PNG", hasModel: true },
  { slug: "inv-logo-blue",     division: "inventory", nameEn: "Large Blue Logo", nameHe: "לוגו כחול גדול",model3d: "/models/inventory/logo-blue-large-01.glb",         image: "/inventory/logo-iai-large-2m-01.png", hasModel: true },
  { slug: "inv-white-tent",    division: "inventory", nameEn: "White Tent",      nameHe: "אוהל לבן",      model3d: "/models/inventory/tent-white-01.glb",              image: "/inventory/tent-25x15-white-01.png", hasModel: true },
  { slug: "inv-table-3d",     division: "inventory", nameEn: "Table 3D",        nameHe: "שולחן תלת מימד", model3d: "/models/inventory/table-3d.glb",                   image: "/inventory/table-cover-iai-blue-01.png", hasModel: true },
  { slug: "inv-wood-sign",    division: "inventory", nameEn: "Wood Signage",    nameHe: "שילוט עץ",       model3d: "/models/inventory/wood-signage-iai.glb",            image: "", hasModel: true },
  { slug: "inv-tent-main",    division: "inventory", nameEn: "Main Tent",       nameHe: "אוהל ראשי",      model3d: "/models/inventory/tent-20-30-iai-01.glb",           image: "/inventory/tent-20x30-iai-blue-01.png", hasModel: true },
];

export function getMasterExhibit(slug: string): MasterExhibit | undefined {
  return masterExhibits.find((e) => e.slug === slug);
}

export function getMasterExhibitsByDivision(division: MasterExhibitDivision): MasterExhibit[] {
  return masterExhibits.filter((e) => e.division === division);
}
