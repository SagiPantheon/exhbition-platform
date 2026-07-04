// Exhibition Execution Report — data shape + localStorage persistence.
// Stored separately from IsraelExhibition so the core exhibition type stays untouched.

export type ExecutionReport = {
  exhibitionId: string

  // Step 1 — Planning
  planLayoutDesigned: boolean
  planPositionsDefined: boolean
  planDimensionsChecked: boolean
  planLayoutPrepared: boolean
  planSentForApproval: boolean

  // Step 2 — Logistics
  logisticsReceived: boolean
  deliveriesCount: number
  coordinationCallsCount: number

  // Step 3 — Installation
  installUnloading: boolean
  installPlacement: boolean
  installDistanceCheck: boolean
  installSafetyCheck: boolean
  installSignsPlaced: boolean

  // Step 4 — Coordination + Quality
  coordLogistics: boolean
  coordContractors: boolean
  coordMarketing: boolean
  coordDivisionManagers: boolean
  coordScheduleControl: boolean
  coordOperationalIssues: boolean

  qualityAllInstalled: boolean
  qualityLayoutMatches: boolean
  qualityMaterialsPlaced: boolean
  qualityReadyToOpen: boolean

  additionalNotes: string
  createdAt: string
  updatedAt: string
}

const STORAGE_KEY = "executionReports"

function readAll(): Record<string, ExecutionReport> {
  if (typeof window === "undefined") return {}
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Record<string, ExecutionReport>) : {}
  } catch {
    return {}
  }
}

function writeAll(all: Record<string, ExecutionReport>) {
  if (typeof window === "undefined") return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
}

export function getExecutionReport(exhibitionId: string): ExecutionReport | null {
  const all = readAll()
  return all[exhibitionId] ?? null
}

export function saveExecutionReport(report: ExecutionReport) {
  const all = readAll()
  all[report.exhibitionId] = report
  writeAll(all)
}

export function createEmptyReport(
  exhibitionId: string,
  autofill: { deliveriesCount?: number; coordinationCallsCount?: number }
): ExecutionReport {
  const now = new Date().toISOString()
  return {
    exhibitionId,
    planLayoutDesigned: true,
    planPositionsDefined: true,
    planDimensionsChecked: true,
    planLayoutPrepared: true,
    planSentForApproval: true,

    logisticsReceived: true,
    deliveriesCount: autofill.deliveriesCount ?? 0,
    coordinationCallsCount: autofill.coordinationCallsCount ?? 0,

    installUnloading: true,
    installPlacement: true,
    installDistanceCheck: true,
    installSafetyCheck: true,
    installSignsPlaced: true,

    coordLogistics: true,
    coordContractors: true,
    coordMarketing: true,
    coordDivisionManagers: true,
    coordScheduleControl: true,
    coordOperationalIssues: true,

    qualityAllInstalled: true,
    qualityLayoutMatches: true,
    qualityMaterialsPlaced: true,
    qualityReadyToOpen: true,

    additionalNotes: "",
    createdAt: now,
    updatedAt: now,
  }
}
