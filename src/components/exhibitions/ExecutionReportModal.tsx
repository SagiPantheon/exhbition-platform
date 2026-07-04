"use client"

import { useState } from "react"
import {
  type ExecutionReport,
  createEmptyReport,
  getExecutionReport,
  saveExecutionReport,
} from "../../data/executionReport"

type Props = {
  exhibitionId: string
  nameHe: string
  location: string
  startDateLabel: string
  exhibitsCount: number
  onClose: () => void
}

type Check = { key: keyof ExecutionReport; label: string }

const STEP_TITLES = ["תכנון", "לוגיסטיקה", "התקנה", "תיאום ובקרת איכות"]

const PLANNING: Check[] = [
  { key: "planLayoutDesigned", label: "פותחה תוכנית תצוגה" },
  { key: "planPositionsDefined", label: "הוגדר מיקום מדויק לכל מוצג" },
  { key: "planDimensionsChecked", label: "נבדקו מידות ומעברים" },
  { key: "planLayoutPrepared", label: "הוכנה סכימת פריסה" },
  { key: "planSentForApproval", label: "התוכנית נשלחה לאישור" },
]

const INSTALL: Check[] = [
  { key: "installUnloading", label: "פריקה" },
  { key: "installPlacement", label: "פריסת מוצגים" },
  { key: "installDistanceCheck", label: "בדיקת מרחקים" },
  { key: "installSafetyCheck", label: "בדיקת בטיחות" },
  { key: "installSignsPlaced", label: "התקנת שלטי מידע" },
]

const COORD: Check[] = [
  { key: "coordLogistics", label: "תיאום לוגיסטיקה" },
  { key: "coordContractors", label: "עבודה מול קבלנים" },
  { key: "coordMarketing", label: "עבודה מול שיווק" },
  { key: "coordDivisionManagers", label: "עבודה מול מנהלי אגפים" },
  { key: "coordScheduleControl", label: "בקרת לוח זמנים" },
  { key: "coordOperationalIssues", label: "טיפול בנושאים תפעוליים" },
]

const QUALITY: Check[] = [
  { key: "qualityAllInstalled", label: "כל המוצגים הותקנו" },
  { key: "qualityLayoutMatches", label: "הפריסה תואמת לתכנון" },
  { key: "qualityMaterialsPlaced", label: "חומרי מידע הוצבו" },
  { key: "qualityReadyToOpen", label: "התערוכה מוכנה לפתיחה" },
]

function CheckRow({
  label,
  checked,
  onToggle,
}: {
  label: string
  checked: boolean
  onToggle: () => void
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-right transition hover:bg-white/[0.06]"
    >
      <span className="text-sm text-slate-200">{label}</span>
      <span
        className={[
          "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-xs font-bold",
          checked
            ? "border-emerald-400/50 bg-emerald-400/20 text-emerald-300"
            : "border-white/15 bg-white/[0.02] text-transparent",
        ].join(" ")}
      >
        ✓
      </span>
    </button>
  )
}

function buildPrintHtml(report: ExecutionReport, meta: Props) {
  const chk = (v: boolean) => (v ? "✔" : "—")
  return `<!DOCTYPE html>
<html dir="rtl" lang="he">
<head>
<meta charset="utf-8" />
<title>דוח סיום תערוכה - ${meta.nameHe}</title>
<style>
  body { font-family: Arial, Helvetica, sans-serif; color: #0a1628; padding: 32px; max-width: 720px; margin: 0 auto; }
  h1 { font-size: 20px; margin: 0 0 4px; }
  .muted { color: #5a7a94; font-size: 12px; margin: 0 0 20px; }
  h2 { font-size: 14px; color: #0f6e56; border-bottom: 1px solid #d3d1c7; padding-bottom: 6px; margin: 24px 0 10px; }
  .row { display: flex; justify-content: space-between; padding: 5px 0; font-size: 13px; }
  .metrics { display: flex; gap: 12px; margin: 14px 0; }
  .metric { flex: 1; background: #f1efe8; border-radius: 10px; padding: 12px; text-align: center; }
  .metric b { display: block; font-size: 22px; }
  .metric span { font-size: 11px; color: #5f5e5a; }
  .notes { white-space: pre-wrap; font-size: 13px; background: #f8fbff; border-radius: 10px; padding: 12px; margin-top: 8px; }
</style>
</head>
<body>
  <h1>${meta.nameHe}</h1>
  <p class="muted">EXHIBITION EXECUTION SUMMARY &middot; ${meta.location} &middot; ${meta.startDateLabel}</p>

  <div class="metrics">
    <div class="metric"><b>${meta.exhibitsCount}</b><span>מוצגים</span></div>
    <div class="metric"><b>${report.coordinationCallsCount}</b><span>שיחות תיאום</span></div>
    <div class="metric"><b>${report.deliveriesCount}</b><span>משלוחים</span></div>
  </div>

  <h2>תכנון</h2>
  ${PLANNING.map((c) => `<div class="row"><span>${c.label}</span><span>${chk(report[c.key] as boolean)}</span></div>`).join("")}

  <h2>התקנה</h2>
  ${INSTALL.map((c) => `<div class="row"><span>${c.label}</span><span>${chk(report[c.key] as boolean)}</span></div>`).join("")}

  <h2>תיאום</h2>
  ${COORD.map((c) => `<div class="row"><span>${c.label}</span><span>${chk(report[c.key] as boolean)}</span></div>`).join("")}

  <h2>בקרת איכות</h2>
  ${QUALITY.map((c) => `<div class="row"><span>${c.label}</span><span>${chk(report[c.key] as boolean)}</span></div>`).join("")}

  ${report.additionalNotes ? `<h2>הערות נוספות</h2><div class="notes">${report.additionalNotes}</div>` : ""}
</body>
</html>`
}

function buildEmailBody(report: ExecutionReport, meta: Props) {
  const chk = (v: boolean) => (v ? "V" : "-")
  const lines: string[] = []
  lines.push(`דוח סיום תערוכה - ${meta.nameHe}`)
  lines.push(`${meta.location} | ${meta.startDateLabel}`)
  lines.push("")
  lines.push(`מוצגים: ${meta.exhibitsCount} | שיחות תיאום: ${report.coordinationCallsCount} | משלוחים: ${report.deliveriesCount}`)
  lines.push("")
  lines.push("תכנון:")
  PLANNING.forEach((c) => lines.push(`${chk(report[c.key] as boolean)} ${c.label}`))
  lines.push("")
  lines.push("התקנה:")
  INSTALL.forEach((c) => lines.push(`${chk(report[c.key] as boolean)} ${c.label}`))
  lines.push("")
  lines.push("בקרת איכות:")
  QUALITY.forEach((c) => lines.push(`${chk(report[c.key] as boolean)} ${c.label}`))
  if (report.additionalNotes) {
    lines.push("")
    lines.push(`הערות: ${report.additionalNotes}`)
  }
  return lines.join("\n")
}

export default function ExecutionReportModal(props: Props) {
  const { exhibitionId, nameHe, onClose } = props
  const [report, setReport] = useState<ExecutionReport>(
    () =>
      getExecutionReport(exhibitionId) ??
      createEmptyReport(exhibitionId, { deliveriesCount: 1, coordinationCallsCount: 45 })
  )
  const [screen, setScreen] = useState<"wizard" | "result">("wizard")
  const [step, setStep] = useState(1)

  const toggle = (key: keyof ExecutionReport) =>
    setReport((prev) => ({ ...prev, [key]: !prev[key] }))

  const persist = (next: ExecutionReport) => {
    const withTimestamp = { ...next, updatedAt: new Date().toISOString() }
    saveExecutionReport(withTimestamp)
    setReport(withTimestamp)
  }

  const finish = () => {
    persist(report)
    setScreen("result")
  }

  const handlePrint = () => {
    const html = buildPrintHtml(report, props)
    const win = window.open("", "_blank")
    if (!win) return
    win.document.write(html)
    win.document.close()
    win.focus()
    setTimeout(() => win.print(), 300)
  }

  const handleEmail = () => {
    const body = buildEmailBody(report, props)
    const subject = encodeURIComponent(`דוח סיום תערוכה - ${nameHe}`)
    window.location.href = `mailto:?subject=${subject}&body=${encodeURIComponent(body)}`
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4" dir="rtl">
      <div className="max-h-[88vh] w-full max-w-xl overflow-y-auto rounded-[24px] border border-cyan-300/25 bg-[#0b1227] p-6 shadow-[0_24px_64px_rgba(0,0,0,0.5)]">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-cyan-300">דוח סיום תערוכה</p>
            <h2 className="mt-1 text-lg font-bold text-white">{nameHe}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-sm text-slate-300 hover:bg-white/10"
          >
            ✕
          </button>
        </div>

        {screen === "wizard" && (
          <>
            <p className="mb-2 text-xs text-slate-400">
              שלב {step} מתוך 4 &middot; {STEP_TITLES[step - 1]}
            </p>
            <div className="mb-5 flex gap-2">
              {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  className={`h-[3px] flex-1 rounded-full ${n <= step ? "bg-emerald-500" : "bg-white/10"}`}
                />
              ))}
            </div>

            {step === 1 && (
              <div className="space-y-2">
                {PLANNING.map((c) => (
                  <CheckRow key={c.key} label={c.label} checked={report[c.key] as boolean} onToggle={() => toggle(c.key)} />
                ))}
              </div>
            )}

            {step === 2 && (
              <div className="space-y-3">
                <CheckRow
                  label="המוצגים התקבלו"
                  checked={report.logisticsReceived}
                  onToggle={() => toggle("logisticsReceived")}
                />
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                  <span className="text-sm text-slate-200">מספר משלוחים</span>
                  <input
                    type="number"
                    min={0}
                    value={report.deliveriesCount}
                    onChange={(e) => setReport((p) => ({ ...p, deliveriesCount: Number(e.target.value) || 0 }))}
                    className="w-20 rounded-lg border border-white/15 bg-[#0f1f33] px-2 py-1 text-center text-sm text-white"
                  />
                </div>
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                  <span className="text-sm text-slate-200">שיחות תיאום משוער</span>
                  <input
                    type="number"
                    min={0}
                    value={report.coordinationCallsCount}
                    onChange={(e) => setReport((p) => ({ ...p, coordinationCallsCount: Number(e.target.value) || 0 }))}
                    className="w-20 rounded-lg border border-white/15 bg-[#0f1f33] px-2 py-1 text-center text-sm text-white"
                  />
                </div>
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-400">
                  <span>מספר מוצגים (אוטומטי)</span>
                  <span className="font-semibold text-white">{props.exhibitsCount}</span>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-2">
                {INSTALL.map((c) => (
                  <CheckRow key={c.key} label={c.label} checked={report[c.key] as boolean} onToggle={() => toggle(c.key)} />
                ))}
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <div>
                  <p className="mb-2 text-xs font-semibold text-cyan-300">תיאום</p>
                  <div className="space-y-2">
                    {COORD.map((c) => (
                      <CheckRow key={c.key} label={c.label} checked={report[c.key] as boolean} onToggle={() => toggle(c.key)} />
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-2 text-xs font-semibold text-cyan-300">בקרת איכות</p>
                  <div className="space-y-2">
                    {QUALITY.map((c) => (
                      <CheckRow key={c.key} label={c.label} checked={report[c.key] as boolean} onToggle={() => toggle(c.key)} />
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-2 text-xs font-semibold text-cyan-300">הערות נוספות</p>
                  <textarea
                    value={report.additionalNotes}
                    onChange={(e) => setReport((p) => ({ ...p, additionalNotes: e.target.value }))}
                    rows={3}
                    className="w-full rounded-xl border border-white/15 bg-[#0f1f33] px-3 py-2 text-sm text-white"
                  />
                </div>
              </div>
            )}

            <div className="mt-6 flex gap-2">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep((s) => s - 1)}
                  className="flex-1 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-slate-300 hover:bg-white/10"
                >
                  חזור
                </button>
              )}
              {step < 4 ? (
                <button
                  type="button"
                  onClick={() => {
                    persist(report)
                    setStep((s) => s + 1)
                  }}
                  className="flex-[2] rounded-xl border border-cyan-400/40 bg-cyan-400/10 px-4 py-2.5 text-sm font-semibold text-cyan-100 hover:bg-cyan-400/20"
                >
                  המשך
                </button>
              ) : (
                <button
                  type="button"
                  onClick={finish}
                  className="flex-[2] rounded-xl border border-emerald-400/40 bg-emerald-400/10 px-4 py-2.5 text-sm font-semibold text-emerald-100 hover:bg-emerald-400/20"
                >
                  צור דוח
                </button>
              )}
            </div>
          </>
        )}

        {screen === "result" && (
          <div>
            <div className="rounded-2xl bg-[#f8fbff] p-5 text-[#0a1628]">
              <div className="mb-4 flex items-center justify-between border-b-2 border-[#0a1628] pb-3">
                <div>
                  <p className="text-[10px] tracking-widest text-[#5a7a94]">EXHIBITION EXECUTION SUMMARY</p>
                  <p className="text-base font-semibold">{nameHe}</p>
                </div>
                <span className="text-[11px] text-[#5a7a94]">{props.startDateLabel}</span>
              </div>

              <div className="mb-4 grid grid-cols-3 gap-2">
                <div className="rounded-xl bg-[#f1efe8] p-2.5 text-center">
                  <p className="text-xl font-semibold">{props.exhibitsCount}</p>
                  <p className="text-[10px] text-[#5f5e5a]">מוצגים</p>
                </div>
                <div className="rounded-xl bg-[#f1efe8] p-2.5 text-center">
                  <p className="text-xl font-semibold">{report.coordinationCallsCount}</p>
                  <p className="text-[10px] text-[#5f5e5a]">שיחות תיאום</p>
                </div>
                <div className="rounded-xl bg-[#f1efe8] p-2.5 text-center">
                  <p className="text-xl font-semibold">{report.deliveriesCount}</p>
                  <p className="text-[10px] text-[#5f5e5a]">משלוחים</p>
                </div>
              </div>

              <p className="mb-2 text-xs font-semibold text-[#0f6e56]">בקרת איכות</p>
              <div className="space-y-1 text-xs">
                {QUALITY.map((c) => (
                  <div key={c.key}>
                    {report[c.key] ? "✔" : "—"} {c.label}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={handlePrint}
                className="flex-1 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-[#0a1628] hover:bg-slate-200"
              >
                הורדה כ-PDF
              </button>
              <button
                type="button"
                onClick={handleEmail}
                className="flex-1 rounded-xl border border-white/20 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
              >
                שליחה למייל
              </button>
            </div>
            <button
              type="button"
              onClick={() => setScreen("wizard")}
              className="mt-2 w-full rounded-xl border border-white/10 px-4 py-2 text-xs text-slate-400 hover:bg-white/5"
            >
              חזרה לעריכה
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
