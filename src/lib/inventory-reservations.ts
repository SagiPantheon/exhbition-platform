import type { IsraelExhibition } from '../data/israelExhibitions'
import type { InventoryItem } from '../data/inventoryItems'

export type InventoryUsage = {
  inventoryId: string
  total: number
  reserved: number
  available: number
}

export function getReservedCountForInventory(
  exhibitions: IsraelExhibition[] | undefined,
  inventoryId: string
): number {
  const safeExhibitions = Array.isArray(exhibitions) ? exhibitions : []
  return safeExhibitions.reduce((sum, exhibition) => {
    const reservations = exhibition.inventoryReservations ?? []

    const fromReservations = reservations
      .filter((item) => item.inventoryId === inventoryId)
      .reduce((acc, item) => acc + (Number(item.quantity) || 0), 0)

    if (fromReservations > 0) return sum + fromReservations

    const fallbackLinked = (exhibition.inventoryItemIds ?? []).includes(inventoryId) ? 1 : 0
    return sum + fallbackLinked
  }, 0)
}

export function buildInventoryUsageMap(
  items: InventoryItem[],
  exhibitions: IsraelExhibition[] | undefined
): Map<string, InventoryUsage> {
  const safeExhibitions = Array.isArray(exhibitions) ? exhibitions : []
  return new Map(
    items.map((item) => {
      const total = Number(item.quantity) || 0
      const reserved = getReservedCountForInventory(safeExhibitions, item.id)
      const available = Math.max(0, total - reserved)

      return [
        item.id,
        {
          inventoryId: item.id,
          total,
          reserved,
          available,
        },
      ]
    })
  )
}
