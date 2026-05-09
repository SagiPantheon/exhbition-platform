export type ExhibitSystemTemplateRecord = {
  key: string
  systemName: string
  divisionId: string
  divisionTitleHe: string
  divisionTitleEn: string
  subDivisionName: string
  summary: string
  heroMode: "image" | "3d" | "placeholder"
  heroImage?: string
  viewerSrc?: string
  spaceSlug?: string
  dimensions: string
  weight: string
  scale: string
  displayMode: string
  installationType: string
  readiness: number
  approvalStatus: string
  layoutCompatibility: string
  relatedSystems: string[]
}

export const exhibitSystemTemplateRecords: ExhibitSystemTemplateRecord[] = [
  {
    key: "satellite-systems",
    systemName: "Satellite Systems",
    divisionId: "missiles-space-defense",
    divisionTitleHe: "חטיבת מט״ח",
    divisionTitleEn: "Missiles, Space & Defense",
    subDivisionName: "חלל",
    summary:
      "Space systems presentation layer for strategic satellite exhibits. This template represents how space assets can be shown as a reusable exhibit-system format rather than isolated manual pages.",
    heroMode: "placeholder",
    dimensions: "Varies by system / mock-up configuration",
    weight: "Operationally variable",
    scale: "Mixed / mock-up dependent",
    displayMode: "Pedestal or floor presentation",
    installationType: "Indoor exhibition display",
    readiness: 86,
    approvalStatus: "Ready for controlled exhibition planning",
    layoutCompatibility: "Compatible with future layout-planning integration",
    relatedSystems: ["OPTSAT 500", "OptSar 550", "OPSAT 3000", "MCS"],
  },
  {
    key: "optsat-500",
    systemName: "OPTSAT 500",
    divisionId: "missiles-space-defense",
    divisionTitleHe: "חטיבת מט״ח",
    divisionTitleEn: "Missiles, Space & Defense",
    subDivisionName: "חלל",
    summary:
      "Compact space-system exhibit entry based on the existing Space catalog direction. Intended as a reusable system card within the wider Global Exhibit Bank structure.",
    heroMode: "image",
    heroImage: "/images/space/optsat-500.png",
    spaceSlug: "optsat-500",
    dimensions: "Mock-up exhibit dimensions vary by display setup",
    weight: "Mock-up dependent",
    scale: "Exhibition mock-up scale",
    displayMode: "Pedestal display",
    installationType: "Indoor installation",
    readiness: 84,
    approvalStatus: "Exhibition-ready in catalog context",
    layoutCompatibility: "Podium-compatible, future tent/layout placement supported",
    relatedSystems: ["OptSar 550", "OPSAT 3000", "MCS"],
  },
  {
    key: "optsar-550",
    systemName: "OptSar 550",
    divisionId: "missiles-space-defense",
    divisionTitleHe: "חטיבת מט״ח",
    divisionTitleEn: "Missiles, Space & Defense",
    subDivisionName: "חלל",
    summary:
      "Space-system template example connected to the existing Space catalog logic and intended for future integration into a common exhibit-system framework.",
    heroMode: "image",
    heroImage: "/images/space/optsar-550.png",
    spaceSlug: "optsar-550",
    dimensions: "Mock-up exhibit dimensions vary by display setup",
    weight: "Mock-up dependent",
    scale: "Exhibition mock-up scale",
    displayMode: "Pedestal display",
    installationType: "Indoor installation",
    readiness: 83,
    approvalStatus: "Exhibition-ready in catalog context",
    layoutCompatibility: "Podium-compatible, future layout compatibility planned",
    relatedSystems: ["OPTSAT 500", "OPSAT 3000", "MCS"],
  },
  {
    key: "optsat-3000",
    systemName: "OPSAT 3000",
    divisionId: "missiles-space-defense",
    divisionTitleHe: "חטיבת מט״ח",
    divisionTitleEn: "Missiles, Space & Defense",
    subDivisionName: "חלל",
    summary:
      "Large space-system exhibit template candidate with strong value for reusable product presentation, future dimensions logic, and layout-compatibility planning.",
    heroMode: "image",
    heroImage: "/images/space/optsat-3000.png",
    spaceSlug: "optsat-3000",
    dimensions: "Large-format mock-up / display dependent",
    weight: "Mock-up dependent",
    scale: "Exhibition mock-up scale",
    displayMode: "Pedestal or dedicated support display",
    installationType: "Indoor installation",
    readiness: 88,
    approvalStatus: "Strong candidate for system-template V1",
    layoutCompatibility: "Requires dedicated footprint planning",
    relatedSystems: ["OPTSAT 500", "OptSar 550", "MCS"],
  },
  {
    key: "mcs",
    systemName: "MCS",
    divisionId: "missiles-space-defense",
    divisionTitleHe: "חטיבת מט״ח",
    divisionTitleEn: "Missiles, Space & Defense",
    subDivisionName: "חלל",
    summary:
      "Space exhibit-system template candidate that helps define how future systems can be presented through one reusable structure across the platform.",
    heroMode: "image",
    heroImage: "/images/space/mcs.png",
    spaceSlug: "mcs",
    dimensions: "Display configuration dependent",
    weight: "Mock-up dependent",
    scale: "Exhibition mock-up scale",
    displayMode: "Pedestal display",
    installationType: "Indoor installation",
    readiness: 85,
    approvalStatus: "Ready for template-based system view",
    layoutCompatibility: "Future layout compatibility planned",
    relatedSystems: ["OPTSAT 500", "OptSar 550", "OPSAT 3000"],
  },
]

export function getExhibitSystemTemplateRecord(params: {
  divisionId: string
  subDivisionName: string
  systemName: string
}) {
  const divisionId = params.divisionId.trim().toLowerCase()
  const subDivisionName = params.subDivisionName.trim().toLowerCase()
  const systemName = params.systemName.trim().toLowerCase()

  const exact = exhibitSystemTemplateRecords.find(
    (item) =>
      item.divisionId.trim().toLowerCase() === divisionId &&
      item.subDivisionName.trim().toLowerCase() === subDivisionName &&
      item.systemName.trim().toLowerCase() === systemName
  )

  if (exact) return exact

  const fallback = exhibitSystemTemplateRecords.find(
    (item) =>
      item.divisionId.trim().toLowerCase() === divisionId &&
      item.subDivisionName.trim().toLowerCase() === subDivisionName
  )

  return fallback ?? null
}
