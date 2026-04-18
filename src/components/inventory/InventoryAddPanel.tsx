"use client";

import { useEffect, useMemo, useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (item: any) => void;
  initialItem?: any | null;
  mode?: "create" | "edit";
};

const heRows = [
  ["ק", "ר", "א", "ט", "ו", "ן", "ם", "פ"],
  ["ש", "ד", "ג", "כ", "ע", "י", "ח", "ל", "ך", "ף"],
  ["ז", "ס", "ב", "ה", "נ", "מ", "צ", "ת", "ץ"],
];

const enRows = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

const numRow = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

const categories = [
  { value: "branding", label: "מיתוג" },
  { value: "furniture", label: "ריהוט" },
  { value: "lighting", label: "תאורה" },
  { value: "flags", label: "דגלים" },
  { value: "screens", label: "מסכים" },
  { value: "structures", label: "מבנים" },
  { value: "display", label: "תצוגה" },
];

const defaultForm = {
  id: "",
  nameHe: "",
  nameEn: "",
  category: "branding",
  quantity: "1",
  notes: "",
};

export default function InventoryAddPanel({
  open,
  onClose,
  onSave,
  initialItem = null,
  mode = "create",
}: Props) {
  const [lang, setLang] = useState<"he" | "en">("he");
  const [activeField, setActiveField] = useState<"nameHe" | "nameEn" | "quantity" | "notes">("nameHe");
  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    if (!open) return;

    if (initialItem) {
      setForm({
        id: initialItem.id ?? "",
        nameHe: initialItem.nameHe ?? initialItem.name ?? "",
        nameEn: initialItem.nameEn ?? "",
        category: initialItem.category ?? "branding",
        quantity: String(initialItem.quantity ?? 1),
        notes: initialItem.notes ?? "",
      });
      return;
    }

    setForm(defaultForm);
  }, [open, initialItem]);

  useEffect(() => {
    if (!open) return;

    if (initialItem) {
      setForm({
        id: initialItem.id ?? "",
        nameHe: initialItem.nameHe ?? initialItem.name ?? "",
        nameEn: initialItem.nameEn ?? "",
        category: initialItem.category ?? "branding",
        quantity: String(initialItem.quantity ?? 1),
        notes: initialItem.notes ?? "",
      });
      return;
    }

    setForm(defaultForm);
  }, [open, initialItem]);

  const rows = useMemo(() => {
    if (activeField === "quantity") return [numRow];
    return lang === "he" ? heRows : enRows;
  }, [lang, activeField]);

  if (!open) return null;

  function patchField(value: string) {
    setForm((prev) => ({ ...prev, [activeField]: value }));
  }

  function appendKey(key: string) {
    const current = String(form[activeField] ?? "");
    patchField(current + key);
  }

  function backspace() {
    const current = String(form[activeField] ?? "");
    patchField(current.slice(0, -1));
  }

  function clearField() {
    patchField("");
  }

  function submit() {
    const name = form.nameHe.trim() || form.nameEn.trim();
    if (!name) return;

    const slugBase = (form.nameEn.trim() || form.nameHe.trim() || "custom-item")
      .toLowerCase()
      .replace(/[^a-z0-9\u0590-\u05ff]+/g, "-")
      .replace(/^-+|-+$/g, "");

    onSave({
      id: mode === "edit" && form.id ? form.id : `custom-${slugBase || "item"}-${Date.now()}`,
      name,
      nameHe: form.nameHe.trim(),
      nameEn: form.nameEn.trim(),
      category: form.category,
      image: initialItem?.image || "/inventory/sign-stand-silver-a4-01.png",
      quantity: Math.max(0, Number(form.quantity || "1")),
      reserved: initialItem?.reserved ?? 0,
      notes: form.notes.trim() || "פריט מותאם אישית",
      isCustom: initialItem?.isCustom ?? true,
    });

    setForm(defaultForm);
    setActiveField("nameHe");
    setLang("he");
    onClose();
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 60,
        background: "rgba(3,8,20,0.78)",
        backdropFilter: "blur(8px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "24px",
      }}
    >
      <div
        style={{
          width: "min(1100px, 100%)",
          borderRadius: "28px",
          border: "1px solid rgba(96,165,250,0.25)",
          background: "linear-gradient(180deg, rgba(13,27,56,0.98), rgba(7,17,35,0.98))",
          boxShadow: "0 30px 80px rgba(0,0,0,0.45)",
          padding: "22px",
          color: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "16px",
            alignItems: "center",
            marginBottom: "18px",
          }}
        >
          <div>
            <div style={{ fontSize: "12px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(125,211,252,0.9)", marginBottom: "8px" }}>
              add inventory
            </div>
            <div style={{ fontSize: "30px", fontWeight: 800, lineHeight: 1.05 }}>
              {mode === "edit" ? "עריכת פריט קיים" : "הוספת פריט חדש למחסן"}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              borderRadius: "16px",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.04)",
              color: "white",
              padding: "10px 14px",
              cursor: "pointer",
            }}
          >
            סגור
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(340px, 1fr) minmax(420px, 1.25fr)",
            gap: "18px",
          }}
        >
          <div
            style={{
              borderRadius: "24px",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.03)",
              padding: "16px",
            }}
          >
            <Field
              label="שם בעברית"
              value={form.nameHe}
              active={activeField === "nameHe"}
              onClick={() => {
                setActiveField("nameHe");
                setLang("he");
              }}
            />
            <Field
              label="English name"
              value={form.nameEn}
              active={activeField === "nameEn"}
              onClick={() => {
                setActiveField("nameEn");
                setLang("en");
              }}
            />
            <Field
              label="כמות"
              value={form.quantity}
              active={activeField === "quantity"}
              onClick={() => setActiveField("quantity")}
            />
            <div style={{ marginBottom: "14px" }}>
              <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.56)", marginBottom: "8px" }}>קטגוריה</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {categories.map((cat) => {
                  const active = form.category === cat.value;
                  return (
                    <button
                      key={cat.value}
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, category: cat.value }))}
                      style={{
                        borderRadius: "999px",
                        border: active ? "1px solid rgba(96,165,250,0.5)" : "1px solid rgba(255,255,255,0.12)",
                        background: active ? "rgba(59,130,246,0.18)" : "rgba(255,255,255,0.04)",
                        color: "white",
                        padding: "8px 12px",
                        cursor: "pointer",
                      }}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </div>
            <Field
              label="הערות"
              value={form.notes}
              active={activeField === "notes"}
              multiline
              onClick={() => {
                setActiveField("notes");
                setLang("he");
              }}
            />

            <div style={{ display: "flex", gap: "10px", marginTop: "14px" }}>
              <button
                type="button"
                onClick={submit}
                style={{
                  flex: 1,
                  borderRadius: "16px",
                  border: "1px solid rgba(34,197,94,0.25)",
                  background: "rgba(34,197,94,0.16)",
                  color: "white",
                  padding: "12px 16px",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                {mode === "edit" ? "שמור שינויים" : "שמור פריט חדש"}
              </button>
              <button
                type="button"
                onClick={() => setForm(defaultForm)}
                style={{
                  borderRadius: "16px",
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: "rgba(255,255,255,0.04)",
                  color: "white",
                  padding: "12px 16px",
                  cursor: "pointer",
                }}
              >
                נקה
              </button>
            </div>
          </div>

          <div
            style={{
              borderRadius: "24px",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.03)",
              padding: "16px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
              <div style={{ fontSize: "18px", fontWeight: 700 }}>מקלדת וירטואלית</div>
              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  type="button"
                  onClick={() => setLang("he")}
                  style={langButton(lang === "he")}
                >
                  עברית
                </button>
                <button
                  type="button"
                  onClick={() => setLang("en")}
                  style={langButton(lang === "en")}
                >
                  English
                </button>
              </div>
            </div>

            <div style={{ display: "grid", gap: "10px" }}>
              {rows.map((row, index) => (
                <div key={index} style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {row.map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => appendKey(key)}
                      style={keyButton}
                    >
                      {key}
                    </button>
                  ))}
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: "10px", marginTop: "14px", flexWrap: "wrap" }}>
              <button type="button" onClick={() => appendKey(" ")} style={wideButton}>רווח</button>
              <button type="button" onClick={backspace} style={wideButton}>⌫ מחק</button>
              <button type="button" onClick={clearField} style={wideButton}>נקה שדה</button>
              <button
                type="button"
                onClick={() => appendKey(activeField === "quantity" ? "" : "\n")}
                style={wideButton}
              >
                Enter
              </button>
            </div>

            <div
              style={{
                marginTop: "18px",
                borderRadius: "18px",
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.03)",
                padding: "14px",
                color: "rgba(255,255,255,0.72)",
                lineHeight: 1.6,
              }}
            >
              שדה פעיל: <strong style={{ color: "white" }}>{fieldLabel(activeField)}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  active,
  onClick,
  multiline = false,
}: {
  label: string;
  value: string;
  active: boolean;
  onClick: () => void;
  multiline?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        width: "100%",
        textAlign: "right",
        marginBottom: "14px",
        borderRadius: "18px",
        border: active ? "1px solid rgba(96,165,250,0.45)" : "1px solid rgba(255,255,255,0.08)",
        background: active ? "rgba(59,130,246,0.12)" : "rgba(255,255,255,0.03)",
        padding: "14px",
        cursor: "pointer",
        color: "white",
      }}
    >
      <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.56)", marginBottom: "8px" }}>{label}</div>
      <div
        style={{
          minHeight: multiline ? "72px" : "24px",
          whiteSpace: "pre-wrap",
          fontSize: "17px",
          lineHeight: 1.5,
        }}
      >
        {value || "—"}
      </div>
    </button>
  );
}

function fieldLabel(field: "nameHe" | "nameEn" | "quantity" | "notes") {
  if (field === "nameHe") return "שם בעברית";
  if (field === "nameEn") return "English name";
  if (field === "quantity") return "כמות";
  return "הערות";
}

const keyButton: React.CSSProperties = {
  minWidth: "52px",
  height: "48px",
  borderRadius: "14px",
  border: "1px solid rgba(255,255,255,0.1)",
  background: "rgba(255,255,255,0.05)",
  color: "white",
  fontSize: "18px",
  cursor: "pointer",
};

const wideButton: React.CSSProperties = {
  minWidth: "120px",
  height: "46px",
  borderRadius: "14px",
  border: "1px solid rgba(255,255,255,0.1)",
  background: "rgba(255,255,255,0.05)",
  color: "white",
  cursor: "pointer",
};

function langButton(active: boolean): React.CSSProperties {
  return {
    borderRadius: "999px",
    border: active ? "1px solid rgba(96,165,250,0.45)" : "1px solid rgba(255,255,255,0.12)",
    background: active ? "rgba(59,130,246,0.18)" : "rgba(255,255,255,0.04)",
    color: "white",
    padding: "8px 12px",
    cursor: "pointer",
  };
}
