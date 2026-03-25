import { Asset } from "../types/assets";

export const assets: Asset[] = [
  {
    id: "space-optsat-500",
    name: "OPTSAT 500",
    code: "SP-001",
    domain: "space",
    family: "Satellite Mock-Ups",
    subfamily: "Observation",
    description:
      "Indoor exhibition mock-up of OPTSAT 500, presented as part of the premium space asset line.",
    dimensions: {
      length: 1.2,
      width: 1.6,
      height: 1.8,
    },
    weightKg: 42,
    installation: {
      type: "pedestal",
      pedestalRequired: true,
      indoor: true,
      outdoor: false,
      barrierRequired: false,
      specialSupportRequired: false,
    },
    display: {
      role: "hero",
      viewingZone: "Front + side",
      minimumArea: "3m x 3m",
      notes: "Mock-up presentation on pedestal for indoor exhibition use.",
    },
    logistics: {
      staffRequired: 2,
      specialEquipment: ["Pedestal base"],
      setupComplexity: "medium",
    },
    media: {
      thumbnail: "/images/optsat500.jpg",
      gallery: ["/images/optsat500.jpg"],
    },
    status: "approved",
  },

  {
    id: "space-optsar-550",
    name: "OptSar 550",
    code: "SP-002",
    domain: "space",
    family: "Satellite Mock-Ups",
    subfamily: "Radar",
    description:
      "Indoor exhibition mock-up of OptSar 550, mounted on pedestal for space systems presentation.",
    dimensions: {
      length: 1.3,
      width: 1.7,
      height: 1.3,
    },
    weightKg: 40,
    installation: {
      type: "pedestal",
      pedestalRequired: true,
      indoor: true,
      outdoor: false,
      barrierRequired: false,
      specialSupportRequired: false,
    },
    display: {
      role: "hero",
      viewingZone: "Front + side",
      minimumArea: "3m x 3m",
      notes: "Mock-up on pedestal with indoor display requirement.",
    },
    logistics: {
      staffRequired: 2,
      specialEquipment: ["Pedestal base"],
      setupComplexity: "medium",
    },
    media: {
      thumbnail: "/images/optsar550.jpg",
      gallery: ["/images/optsar550.jpg"],
    },
    status: "approved",
  },

  {
    id: "space-opsat-3000",
    name: "OPTSAT 3000",
    code: "SP-003",
    domain: "space",
    family: "Satellite Mock-Ups",
    subfamily: "Electro-Optical Observation",
    description:
      "Indoor exhibition mock-up of OPTSAT 3000, presented on pedestal as part of the premium satellite series.",
    dimensions: {
      length: 1.3,
      width: 1.8,
      height: 1.8,
    },
    weightKg: 45,
    installation: {
      type: "pedestal",
      pedestalRequired: true,
      indoor: true,
      outdoor: false,
      barrierRequired: false,
      specialSupportRequired: false,
    },
    display: {
      role: "hero",
      viewingZone: "Front + side",
      minimumArea: "3m x 3m",
      notes: "Observation satellite mock-up for indoor executive display.",
    },
    logistics: {
      staffRequired: 2,
      specialEquipment: ["Pedestal base"],
      setupComplexity: "medium",
    },
    media: {
      thumbnail: "/images/opsat3000.jpg",
      gallery: ["/images/opsat3000.jpg"],
    },
    status: "approved",
  },

  {
    id: "space-mcs",
    name: "MCS",
    code: "SP-004",
    domain: "space",
    family: "Satellite Mock-Ups",
    subfamily: "Communications",
    description:
      "Compact GEO communications satellite mock-up for indoor exhibition display, mounted on a round pedestal.",
    dimensions: {
      length: 1.0,
      width: 1.6,
      height: 2.0,
    },
    weightKg: 37,
    installation: {
      type: "pedestal",
      pedestalRequired: true,
      indoor: true,
      outdoor: false,
      barrierRequired: false,
      specialSupportRequired: false,
    },
    display: {
      role: "hero",
      viewingZone: "Front + side",
      minimumArea: "3m x 3m",
      notes: "Premium communications mock-up on round pedestal.",
    },
    logistics: {
      staffRequired: 2,
      specialEquipment: ["Round pedestal"],
      setupComplexity: "medium",
    },
    media: {
      thumbnail: "/images/mcs-showcase.png",
      gallery: ["/images/mcs-showcase.png"],
    },
    status: "approved",
  },

  {
    id: "space-tecsar",
    name: "Tecsar",
    code: "SP-005",
    domain: "space",
    family: "Satellite Mock-Ups",
    subfamily: "SAR Observation",
    description:
      "Indoor exhibition mock-up of Tecsar, presented on a pedestal within the space systems showcase.",
    dimensions: {
      length: 1.2,
      width: 1.7,
      height: 1.9,
    },
    weightKg: 43,
    installation: {
      type: "pedestal",
      pedestalRequired: true,
      indoor: true,
      outdoor: false,
      barrierRequired: false,
      specialSupportRequired: false,
    },
    display: {
      role: "hero",
      viewingZone: "Front + side",
      minimumArea: "3m x 3m",
      notes: "SAR mock-up with pedestal presentation and indoor display mode.",
    },
    logistics: {
      staffRequired: 2,
      specialEquipment: ["Pedestal base"],
      setupComplexity: "medium",
    },
    media: {
      thumbnail: "/images/tecsar.jpg",
      gallery: ["/images/tecsar.jpg"],
    },
    status: "approved",
  },

  {
    id: "space-beresheet",
    name: "Beresheet",
    code: "SP-006",
    domain: "space",
    family: "Lunar Systems",
    subfamily: "Lunar Lander",
    description:
      "Indoor exhibition mock-up of the Beresheet lunar lander, presented as a premium mission showcase object.",
    dimensions: {
      length: 1.8,
      width: 1.8,
      height: 1.5,
    },
    weightKg: 55,
    installation: {
      type: "pedestal",
      pedestalRequired: true,
      indoor: true,
      outdoor: false,
      barrierRequired: true,
      specialSupportRequired: false,
    },
    display: {
      role: "hero",
      viewingZone: "360°",
      minimumArea: "4m x 4m",
      notes: "Lunar lander display model with full visual access around the object.",
    },
    logistics: {
      staffRequired: 3,
      specialEquipment: ["Display platform"],
      setupComplexity: "high",
    },
    media: {
      thumbnail: "/images/beresheet.jpg",
      gallery: ["/images/beresheet.jpg"],
    },
    status: "approved",
  },

  {
    id: "space-shavit",
    name: "Shavit",
    code: "SP-007",
    domain: "space",
    family: "Launch Systems",
    subfamily: "Launcher Model",
    description:
      "Indoor exhibition model of the Shavit satellite launcher, displayed vertically on a circular base.",
    dimensions: {
      length: 1.0,
      width: 1.0,
      height: 3.2,
    },
    weightKg: 65,
    installation: {
      type: "pedestal",
      pedestalRequired: true,
      indoor: true,
      outdoor: false,
      barrierRequired: true,
      specialSupportRequired: true,
    },
    display: {
      role: "hero",
      viewingZone: "Front + side",
      minimumArea: "3m x 3m",
      notes: "Launcher model displayed vertically on dedicated round base.",
    },
    logistics: {
      staffRequired: 3,
      specialEquipment: ["Round base", "Stabilization support"],
      setupComplexity: "high",
    },
    media: {
      thumbnail: "/images/shavit.jpg",
      gallery: ["/images/shavit.jpg"],
    },
    status: "approved",
  },
];