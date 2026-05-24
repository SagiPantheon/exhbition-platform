"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import InventoryAddPanel from "../../components/inventory/InventoryAddPanel";
import { masterExhibits } from "../../data/masterExhibits";
import { initialIsraelExhibitions as initialExhibitions, type IsraelExhibition } from "../../data/israelExhibitions";
import { buildInventoryUsageMap } from "../../lib/inventory-reservations";

const STORAGE_KEY = "inventory-quantities-v1";
const ITEM_OVERRIDES_KEY = "inventory-item-overrides-v1";
const CUSTOM_ITEMS_KEY = "inventory-custom-items";

const SLUG_TO_CATEGORY: Record<string, string> = {
  "inv-table": "ריהוט", "inv-chair": "ריהוט", "inv-stand": "ריהוט",
  "inv-stage-blue": "ריהוט", "inv-stage-small": "ריהוט", "inv-folding-chair": "ריהוט",
  "inv-korsa": "ריהוט", "inv-table-3d": "ריהוט",
  "inv-flag-china": "דגלים", "inv-flags-pair": "דגלים",
  "inv-digital-sign": "שילוט", "inv-magnetic-sign": "שילוט", "inv-wood-sign": "שילוט",
  "inv-lightbox-v": "לייטבוקסים", "inv-lightbox2": "לייטבוקסים", "lightbox-3m": "לייטבוקסים",
  "inv-logo-white": "מיתוג", "inv-logo-blue": "מיתוג",
  "inv-screen": "מדיה", "inv-loudspeaker": "מדיה", "inv-projector": "מדיה",
  "inv-inflatable-tent": "אוהלים", "inv-white-tent": "אוהלים", "inv-tent-main": "אוהלים",
  "inv-arch": "חוץ", "inv-camo": "חוץ", "caravan-iai": "חוץ",
  "inv-pedestal-s": "בסיסי תצוגה", "inv-pedestal-m": "בסיסי תצוגה", "inv-pedestal-l": "בסיסי תצוגה",
  "inv-podium": "פודיומים",
  "inv-queue-poles": "שירות", "inv-phone-storage": "שירות",
};

const CUSTOM_CATEGORY_LABELS: Record<string, string> = {
  branding: "מיתוג", furniture: "ריהוט", lighting: "תאורה",
  flags: "דגלים", screens: "מדיה", structures: "מבנים", display: "תצוגה",
  podiums: "פודיומים", stanchions: "שירות",
};

const CONDITION_LABELS: Record<string, string> = {
  excellent: "מעולה", good: "תקין", fair: "בינוני", needs_attention: "דורש טיפול",
};

const CONDITION_COLORS: Record<string, string> = {
  excellent: "rgba(16,185,129,0.18)", good: "rgba(59,130,246,0.14)",
  fair: "rgba(245,158,11,0.16)", needs_attention: "rgba(239,68,68,0.16)",
};

const BASE_ITEMS = masterExhibits
  .filter((e) => e.division === "inventory")
  .map((e) => ({
    id: e.slug,
    nameHe: e.nameHe,
    nameEn: e.nameEn,
    image: e.image,
    category: SLUG_TO_CATEGORY[e.slug] ?? "אחר",
    quantity: 1,
    condition: "good",
    isCustom: false,
  }));

function findStoredExhibitions(): IsraelExhibition[] | null {
  if (typeof window === "undefined") return null;
  let bestMatch: IsraelExhibition[] | null = null;
  let bestScore = -1;
  for (const key of Object.keys(window.localStorage)) {
    const raw = window.localStorage.getItem(key);
    if (!raw) continue;
    try {
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) continue;
      const looksRelevant = parsed.filter(
        (item) => item && typeof item === "object" &&
          ("inventoryItemIds" in item || "inventoryReservations" in item || "exhibits" in item)
      );
      if (!looksRelevant.length) continue;
      const score =
        looksRelevant.length * 10 +
        parsed.filter((i) => Array.isArray(i?.inventoryItemIds)).length +
        parsed.filter((i) => Array.isArray(i?.inventoryReservations)).length * 2;
      if (score > bestScore) { bestScore = score; bestMatch = parsed as IsraelExhibition[]; }
    } catch { /* ignore */ }
  }
  return bestMatch;
}

type QuantityMap = Record<string, number>;
type OverrideMap = Record<string, Record<string, unknown>>;

export default function InventoryPage() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("הכל");
  const [searchQuery, setSearchQuery] = useState("");
  const [exhibitions, setExhibitions] = useState<IsraelExhibition[]>(initialExhibitions);
  const [isAddPanelOpen, setIsAddPanelOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [panelMode, setPanelMode] = useState<"create" | "edit">("create");

  const [customItems, setCustomItems] = useState<any[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = window.localStorage.getItem(CUSTOM_ITEMS_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch { return []; }
  });

  const [quantityMap, setQuantityMap] = useState<QuantityMap>(() => {
    if (typeof window === "undefined") return {};
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return {};
      const parsed = JSON.parse(raw) as QuantityMap;
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch { return {}; }
  });

  const [itemOverrides, setItemOverrides] = useState<OverrideMap>(() => {
    if (typeof window === "undefined") return {};
    try {
      const raw = window.localStorage.getItem(ITEM_OVERRIDES_KEY);
      if (!raw) return {};
      const parsed = JSON.parse(raw) as OverrideMap;
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch { return {}; }
  });

  useEffect(() => { setIsHydrated(true); }, []);

  useEffect(() => {
    const storedExhibitions = findStoredExhibitions();
    if (storedExhibitions?.length) setExhibitions(storedExhibitions);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined")
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(quantityMap));
  }, [quantityMap]);

  useEffect(() => {
    if (typeof window !== "undefined")
      window.localStorage.setItem(CUSTOM_ITEMS_KEY, JSON.stringify(customItems));
  }, [customItems]);

  useEffect(() => {
    if (typeof window !== "undefined")
      window.localStorage.setItem(ITEM_OVERRIDES_KEY, JSON.stringify(itemOverrides));
  }, [itemOverrides]);

  const liveItems = useMemo(() => {
    const all = [...BASE_ITEMS, ...customItems];
    return all.map((item) => {
      const override = (itemOverrides[item.id] ?? {}) as any;
      const merged = { ...item, ...override };
      const qty = typeof quantityMap[item.id] === "number" && quantityMap[item.id] >= 0
        ? quantityMap[item.id]
        : merged.quantity;
      const category = item.isCustom
        ? (CUSTOM_CATEGORY_LABELS[merged.category] ?? merged.category ?? "אחר")
        : (SLUG_TO_CATEGORY[item.id] ?? "אחר");
      return { ...merged, quantity: qty, category };
    });
  }, [quantityMap, customItems, itemOverrides]);

  const allCategories = useMemo(() => {
    const cats = new Set(liveItems.map((i) => i.category));
    return ["הכל", ...Array.from(cats).sort()];
  }, [liveItems]);

  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const byCat = activeCategory === "הכל"
      ? liveItems
      : liveItems.filter((i) => i.category === activeCategory);
    if (!q) return byCat;
    return byCat.filter((i) =>
      (i.nameHe + " " + i.nameEn + " " + i.category).toLowerCase().includes(q)
    );
  }, [liveItems, activeCategory, searchQuery]);

  const usageMap = useMemo(
    () => buildInventoryUsageMap(liveItems.map((i) => ({ id: i.id, quantity: i.quantity })), exhibitions),
    [liveItems, exhibitions]
  );

  const totalItems = liveItems.length;
  const totalQuantity = liveItems.reduce((s, i) => s + i.quantity, 0);
  const totalAvailable = Array.from(usageMap.values()).reduce((s, u) => s + u.available, 0);

  function updateQuantity(id: string, raw: string) {
    setQuantityMap((prev) => ({ ...prev, [id]: Math.max(0, Number(raw) || 0) }));
  }

  function handleAddCustomItem(item: any) {
    setCustomItems((prev) => [item, ...prev]);
    setQuantityMap((prev) => ({ ...prev, [item.id]: item.quantity }));
  }

  function handleEditItemSave(item: any) {
    const isBase = BASE_ITEMS.some((b) => b.id === item.id);
    if (isBase) {
      setItemOverrides((prev) => ({ ...prev, [item.id]: { ...item } }));
      setQuantityMap((prev) => ({ ...prev, [item.id]: item.quantity }));
    } else {
      setCustomItems((prev) => prev.map((e) => e.id === item.id ? { ...e, ...item } : e));
      setQuantityMap((prev) => ({ ...prev, [item.id]: item.quantity }));
    }
    setEditingItem(null);
    setPanelMode("create");
    setIsAddPanelOpen(false);
  }

  function openEditPanel(item: any) {
    setEditingItem(item);
    setPanelMode("edit");
    setIsAddPanelOpen(true);
  }

  if (!isHydrated) return null;

  return (
    <main dir="rtl" style={{ minHeight: "100vh", background: "radial-gradient(circle at 20% 10%, rgba(37,99,235,0.12), transparent 40%), #07111f", color: "#fff", fontFamily: "Heebo, Assistant, sans-serif", padding: "28px 24px 80px" }}>

      {/* Top nav */}
      <div style={{ maxWidth: 1440, margin: "0 auto 24px", display: "flex", gap: 10, flexWrap: "wrap" }}>
        <Link href="/exhibitions/israel" style={navBtn}>חזרה לתערוכות בארץ</Link>
        <Link href="/" style={navBtn}>ראשי</Link>
      </div>

      <div style={{ maxWidth: 1440, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 999, background: "rgba(0,200,255,0.1)", border: "1px solid rgba(0,200,255,0.22)", color: "#67e8f9", fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 14 }}>
            מחסן תצוגה ותמיכה
          </div>
          <h1 style={{ fontSize: 40, fontWeight: 800, margin: "0 0 8px", letterSpacing: "-0.03em", lineHeight: 1.1 }}>מלאי ציוד תערוכות</h1>
          <p style={{ margin: 0, color: "rgba(255,255,255,0.55)", fontSize: 15, maxWidth: 640 }}>
            כלל פריטי המחסן לתערוכות IAI — פודיומים, דגלים, שילוט, מדיה, מיתוג וציוד עזר נוסף.
          </p>
        </div>

        {/* Stats bar */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 28 }}>
          <StatCard label="פריטים במערכת" value={String(totalItems)} />
          <StatCard label="סה״כ כמות" value={String(totalQuantity)} />
          <StatCard label="זמין כעת" value={String(totalAvailable)} accent />
        </div>

        {/* Toolbar */}
        <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 20, flexWrap: "wrap" }}>
          <button
            type="button"
            onClick={() => { setEditingItem(null); setPanelMode("create"); setIsAddPanelOpen(true); }}
            style={{ padding: "10px 20px", borderRadius: 12, border: "1px solid rgba(0,200,255,0.35)", background: "rgba(0,200,255,0.1)", color: "#67e8f9", fontSize: 13, fontWeight: 700, cursor: "pointer" }}
          >
            + הוסף פריט
          </button>
          <div style={{ flex: 1, minWidth: 200, maxWidth: 420, display: "flex", gap: 8 }}>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="חיפוש..."
              style={{ flex: 1, minHeight: 42, borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "#fff", padding: "0 14px", fontSize: 14, outline: "none" }}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} style={{ borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.7)", padding: "0 12px", fontSize: 13, cursor: "pointer" }}>
                ✕
              </button>
            )}
          </div>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", whiteSpace: "nowrap" }}>
            {filteredItems.length} פריטים
          </span>
        </div>

        {/* Category pills */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
          {allCategories.map((cat) => {
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: "8px 16px", borderRadius: 999, fontSize: 13, cursor: "pointer",
                  border: active ? "1px solid rgba(0,200,255,0.5)" : "1px solid rgba(255,255,255,0.1)",
                  background: active ? "rgba(0,200,255,0.15)" : "rgba(255,255,255,0.04)",
                  color: active ? "#67e8f9" : "rgba(255,255,255,0.7)",
                  fontWeight: active ? 700 : 400,
                  transition: "all 0.15s",
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Item grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 }}>
          {filteredItems.map((item) => {
            const usage = usageMap.get(item.id) ?? { total: item.quantity, reserved: 0, available: item.quantity };
            const condLabel = CONDITION_LABELS[item.condition] ?? item.condition ?? "תקין";
            const condColor = CONDITION_COLORS[item.condition] ?? "rgba(59,130,246,0.14)";

            return (
              <article
                key={item.id}
                style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.055), rgba(255,255,255,0.03))", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, overflow: "hidden" }}
              >
                {/* Image */}
                <div style={{ background: "linear-gradient(160deg, #f0f5ff, #e8f0f8)", aspectRatio: "4/3", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.nameHe}
                      style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.15))" }}
                    />
                  ) : (
                    <div style={{ width: 64, height: 64, borderRadius: 12, background: "rgba(0,0,0,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(0,0,0,0.3)", fontSize: 28 }}>□</div>
                  )}
                </div>

                {/* Info */}
                <div style={{ padding: 16 }}>
                  {/* Badges row */}
                  <div style={{ display: "flex", gap: 6, marginBottom: 10, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 11, padding: "4px 10px", borderRadius: 999, background: "rgba(0,200,255,0.12)", color: "#67e8f9", fontWeight: 600 }}>
                      {item.category}
                    </span>
                    <span style={{ fontSize: 11, padding: "4px 10px", borderRadius: 999, background: condColor, color: "rgba(255,255,255,0.8)" }}>
                      {condLabel}
                    </span>
                  </div>

                  {/* Name */}
                  <h2 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 2px", letterSpacing: "-0.01em", lineHeight: 1.25 }}>{item.nameHe}</h2>
                  <p style={{ margin: "0 0 14px", fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{item.nameEn}</p>

                  {/* Quantity editor */}
                  <div style={{ marginBottom: 12, padding: "10px 12px", borderRadius: 12, background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 6 }}>כמות במלאי</div>
                    <input
                      type="number"
                      min={0}
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, e.target.value)}
                      style={{ width: "100%", background: "transparent", border: "none", color: "#fff", fontSize: 22, fontWeight: 700, outline: "none", padding: 0 }}
                    />
                  </div>

                  {/* Available / Reserved */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
                    <div style={{ padding: "8px 10px", borderRadius: 10, background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.18)", textAlign: "center" }}>
                      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", marginBottom: 2 }}>זמין</div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: "#6ee7b7" }}>{usage.available}</div>
                    </div>
                    <div style={{ padding: "8px 10px", borderRadius: 10, background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.15)", textAlign: "center" }}>
                      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", marginBottom: 2 }}>שמור</div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: "#fca5a5" }}>{usage.reserved}</div>
                    </div>
                  </div>

                  {/* Edit button */}
                  <button
                    type="button"
                    onClick={() => openEditPanel(item)}
                    style={{ width: "100%", padding: "9px 0", borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.7)", fontSize: 13, cursor: "pointer" }}
                  >
                    ערוך פריט
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <InventoryAddPanel
        open={isAddPanelOpen}
        onClose={() => { setIsAddPanelOpen(false); setEditingItem(null); setPanelMode("create"); }}
        onSave={panelMode === "edit" ? handleEditItemSave : handleAddCustomItem}
        initialItem={editingItem}
        mode={panelMode}
      />
    </main>
  );
}

const navBtn: React.CSSProperties = {
  display: "inline-flex", alignItems: "center", padding: "10px 16px",
  borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)",
  background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.8)",
  textDecoration: "none", fontSize: 13, fontWeight: 600,
};

function StatCard({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div style={{ padding: "16px 20px", borderRadius: 16, background: accent ? "rgba(0,200,255,0.08)" : "rgba(255,255,255,0.04)", border: `1px solid ${accent ? "rgba(0,200,255,0.2)" : "rgba(255,255,255,0.07)"}` }}>
      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: "-0.03em", color: accent ? "#67e8f9" : "#fff" }}>{value}</div>
    </div>
  );
}
