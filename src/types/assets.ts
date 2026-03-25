export type Domain = "space" | "air" | "land" | "water";

export type InstallationType =
  | "self-standing"
  | "pedestal"
  | "suspended"
  | "wall-mounted"
  | "custom-rig";

export type DisplayRole = "hero" | "support";

export type AssetStatus = "concept" | "demo" | "approved" | "pending";

export type SetupComplexity = "low" | "medium" | "high";

export type Asset = {
  id: string;
  name: string;
  code: string;
  domain: Domain;
  family: string;
  subfamily?: string;
  description: string;

  dimensions: {
    length?: number;
    width?: number;
    height?: number;
    diameter?: number;
    wingspan?: number;
  };

  weightKg?: number;

  installation: {
    type: InstallationType;
    pedestalRequired: boolean;
    indoor: boolean;
    outdoor: boolean;
    barrierRequired: boolean;
    specialSupportRequired: boolean;
  };

  display: {
    role: DisplayRole;
    viewingZone: string;
    minimumArea: string;
    notes: string;
  };

  logistics: {
    staffRequired: number;
    specialEquipment: string[];
    setupComplexity: SetupComplexity;
  };

  media: {
    thumbnail: string;
    model3d?: string;
    gallery?: string[];
  };

  status: AssetStatus;
};
