import { assets } from "../data/assets";
import { Domain } from "../types/assets";

export function getAssetsByDomain(domain: Domain) {
  return assets.filter((asset) => asset.domain === domain);
}

export function getAssetById(id: string) {
  return assets.find((asset) => asset.id === id);
}
