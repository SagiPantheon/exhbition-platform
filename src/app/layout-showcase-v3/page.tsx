"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Html, OrbitControls, Text, useGLTF } from "@react-three/drei";
import * as THREE from "three";

type AssetKind = "tent" | "exhibit" | "inventory";

type TransformMode = "translate" | "rotate" | "scale";

type ObjectControlAction =
  | "move-left"
  | "move-right"
  | "move-forward"
  | "move-back"
  | "rotate-left"
  | "rotate-right"
  | "scale-up"
  | "scale-down"
  | "delete";

type SceneAsset = {
  id: string;
  title: string;
  titleHe: string;
  category: AssetKind;
  model?: string;
  poster: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  widthM?: number;
  depthM?: number;
  גובהM?: number;
};

type PresetKey = "premium" | "space" | "air" | "vip";

type TentTemplateId = "10x15" | "15x25" | "20x30";

type TentTemplate = {
  id: TentTemplateId;
  label: string;
  widthM: number;
  depthM: number;
  גובהM: number;
};

const TENT_TEMPLATES: TentTemplate[] = [
  { id: "10x15", label: "10m × 15m", widthM: 10, depthM: 15, גובהM: 5 },
  { id: "15x25", label: "15m × 25m", widthM: 15, depthM: 25, גובהM: 6 },
  { id: "20x30", label: "20m × 30m", widthM: 20, depthM: 30, גובהM: 7 },
];

const DEFAULT_TENT_TEMPLATE = TENT_TEMPLATES.find((template) => template.id === "20x30") ?? TENT_TEMPLATES[0];

const TENT_VARIANTS: Record<TentTemplateId, { label: string; poster: string; scale: number }> = {
  "10x15": {
    label: "10×15",
    poster: "/inventory/tent-15x20-iai-blue-01.png",
    scale: 0.96,
  },
  "15x25": {
    label: "15×25",
    poster: "/inventory/tent-20x25-iai-blue-01.png",
    scale: 1.08,
  },
  "20x30": {
    label: "20×30",
    poster: "/inventory/tent-20x30-iai-blue-01.png",
    scale: 1.18,
  },
};

function tentVariantForTemplate(templateId: TentTemplateId) {
  return TENT_VARIANTS[templateId] ?? TENT_VARIANTS["20x30"];
}

function tentScaleForTemplate(templateId: TentTemplateId) {
  return tentVariantForTemplate(templateId).scale;
}

function tentPosterForTemplate(templateId: TentTemplateId) {
  return tentVariantForTemplate(templateId).poster;
}

const TENT_MODEL = "/models/inventory/event+tent+3d+model.glb";
const V3_SCENE_STORAGE_KEY = "exhibition-platform:v3-layout-scene-stable-01";

const EXHIBIT_LIBRARY: Omit<SceneAsset, "id" | "position" | "rotation" | "scale">[] = [
  {
    title: "OPTSAT 500",
    titleHe: "אופסט 500",
    category: "exhibit",
    model: "/models/space/optsat-500-showcase-3d.glb",
    poster: "/images/space/optsat-500-showcase.png",
  },
  {
    title: "OPTSAR 550",
    titleHe: "אופטסר 550",
    category: "exhibit",
    model: "/models/space/optsar-550-showcase-3d.glb",
    poster: "/images/space/optsar-550-showcase.png",
  },
  {
    title: "MCS",
    titleHe: "לווין וחלל",
    category: "exhibit",
    model: "/models/space/mcs-showcase-3d.glb",
    poster: "/images/space/mcs-showcase.png",
  },
  {
    title: "Arrow 3 Launcher",
    titleHe: "משגר חץ 3",
    category: "exhibit",
    model: "/models/air/arrow-3-launcher.glb",
    poster: "/images/air/arrow-3-launcher-showcase.png",
  },
  {
    title: "LORA",
    titleHe: "לורה",
    category: "exhibit",
    model: "/models/air/lora-showcase-3d.glb",
    poster: "/images/air/lora-showcase.png",
  },
];

const מלאי_LIBRARY: Omit<SceneAsset, "id" | "position" | "rotation" | "scale">[] = [
  {
    title: "IAI Flag Pair",
    titleHe: "זוג דגלים",
    category: "inventory",
    model: "/models/inventory/flag-pair-iai-israel-01.glb",
    poster: "/inventory/flag-pair-iai-israel-01.png",
  },
  {
    title: "IAI Logo",
    titleHe: "לוגו IAI",
    category: "inventory",
    model: "/models/inventory/blue+logo+3d+model.glb",
    poster: "/inventory/logo-iai-large-2m-01.png",
  },
  {
    title: "Horizontal Lightbox",
    titleHe: "לייטבוקס אופקי",
    category: "inventory",
    model: "/models/inventory/lightbox-horizontal-iai-01.glb",
    poster: "/inventory/lightbox-horizontal-multidomain-01.jpeg",
  },
  {
    title: "Vertical Lightbox",
    titleHe: "לייטבוקס אנכי",
    category: "inventory",
    model: "/models/inventory/lightbox-vertical-iai-01.glb",
    poster: "/inventory/lightbox-vertical-multidomain-01.jpeg",
  },
  {
    title: "Blue Dome Tent",
    titleHe: "אוהל כיפה כחול",
    category: "inventory",
    model: "/models/inventory/inflatable-tent-iai-blue-01.glb",
    poster: "/inventory/tent-dome-iai-blue-01.png",
  },
  {
    title: "Podium 40×40×90",
    titleHe: "פודיום 40×40×90",
    category: "inventory",
    poster: "/inventory/podium-square-40x40x90-01.png",
  },
  {
    title: "Podium 50×50×90",
    titleHe: "פודיום 50×50×90",
    category: "inventory",
    poster: "/inventory/podium-square-50x50x90-01.png",
  },
  {
    title: "Podium 70×70×90",
    titleHe: "פודיום 70×70×90",
    category: "inventory",
    poster: "/inventory/podium-square-70x70x90-01.png",
  },
  {
    title: "Podium 100×100×90",
    titleHe: "פודיום 100×100×90",
    category: "inventory",
    poster: "/inventory/podium-square-100x100x90-01.png",
  },
  {
    title: "A4 Sign Stand Black",
    titleHe: "סטנד שילוט A4 שחור",
    category: "inventory",
    poster: "/inventory/sign-stand-black-a4-01.png",
  },
  {
    title: "A4 Sign Stand Silver",
    titleHe: "סטנד שילוט A4 כסוף",
    category: "inventory",
    poster: "/inventory/sign-stand-silver-a4-01.png",
  },
  {
    title: "Black Stanchion",
    titleHe: "עמוד חבלול שחור",
    category: "inventory",
    poster: "/inventory/stanchion-black-01.png",
  },
  {
    title: "Cable Reel",
    titleHe: "תוף כבל",
    category: "inventory",
    poster: "/inventory/cable-reel-black-blue-01.png",
  },
  {
    title: "White Folding Chair",
    titleHe: "כיסא מתקפל לבן",
    category: "inventory",
    poster: "/inventory/chair-folding-white-01.png",
  },
  {
    title: "Acrylic Lectern",
    titleHe: "פודיום נאומים אקרילי",
    category: "inventory",
    poster: "/inventory/lectern-acrylic-01.png",
  },
];

type InventoryFilter = "all" | "3d" | "podiums" | "signage" | "utility";

const INVENTORY_FILTERS: { id: InventoryFilter; label: string }[] = [
  { id: "all", label: "הכל" },
  { id: "3d", label: "3D" },
  { id: "podiums", label: "פודיומים" },
  { id: "signage", label: "שילוט" },
  { id: "utility", label: "ציוד" },
];

function inventoryGroupForItem(item: Omit<SceneAsset, "id" | "position" | "rotation" | "scale">): InventoryFilter {
  const haystack = `${item.title} ${item.titleHe} ${item.poster ?? ""} ${item.model ?? ""}`.toLowerCase();

  if (item.model) return "3d";
  if (haystack.includes("podium") || haystack.includes("פודיום")) return "podiums";
  if (haystack.includes("sign") || haystack.includes("stand") || haystack.includes("שילוט") || haystack.includes("סטנד")) return "signage";
  return "utility";
}

function matchesInventoryFilter(
  item: Omit<SceneAsset, "id" | "position" | "rotation" | "scale">,
  filter: InventoryFilter
) {
  if (filter === "all") return true;
  return inventoryGroupForItem(item) === filter;
}

function makeId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
}

function isMainTentAsset(asset: Pick<SceneAsset, "id" | "kind" | "category">) {
  return asset.id === "main-tent" || asset.kind === "tent" || asset.category === "tent";
}

function buildAsset(
  base: Omit<SceneAsset, "id" | "position" | "rotation" | "scale">,
  position: [number, number, number],
  rotation: [number, number, number],
  scale: number,
  forcedId?: string
): SceneAsset {
  return {
    ...base,
    id: forcedId ?? makeId(base.category),
    position,
    rotation,
    scale,
  };
}

function buildTent(
  position: [number, number, number],
  rotation: [number, number, number],
  scale: number,
  poster = "/inventory/tent-20x30-iai-blue-01.png"
): SceneAsset {
  return {
    id: "main-tent",
    kind: "tent",
    title: "Main Exhibition Tent",
    titleHe: "אוהל תצוגה ראשי",
    category: "tent",
    model: TENT_MODEL,
    poster,
    position,
    rotation,
    scale,
  };
}

function buildPremiumPreset(): SceneAsset[] {
  return [
    buildTent([0, 0, 0], [0, Math.PI / 2, 0], 1.18),
    buildAsset(מלאי_LIBRARY[2], [-8.8, 0, -5.3], [0, 0, 0], 1.05),
    buildAsset(מלאי_LIBRARY[3], [8.8, 0, -5.0], [0, 0, 0], 1.05),
    buildAsset(מלאי_LIBRARY[0], [-10.8, 0, 5.0], [0, Math.PI / 2, 0], 1.0),
    buildAsset(EXHIBIT_LIBRARY[3], [10.6, 0, 4.8], [0, -Math.PI / 2, 0], 0.95),
  ];
}

function buildSpacePreset(): SceneAsset[] {
  return [
    buildTent([0, 0, 0], [0, Math.PI / 2, 0], 1.08),
    buildAsset(EXHIBIT_LIBRARY[0], [-7, 0, -1.5], [0, 0.3, 0], 0.95),
    buildAsset(EXHIBIT_LIBRARY[1], [0, 0, 3], [0, 0, 0], 0.95),
    buildAsset(EXHIBIT_LIBRARY[2], [7, 0, -1], [0, -0.35, 0], 0.95),
    buildAsset(מלאי_LIBRARY[3], [11.5, 0, 5.2], [0, 0, 0], 1.0),
  ];
}

function buildAirPreset(): SceneAsset[] {
  return [
    buildTent([0, 0, 0], [0, Math.PI / 2, 0], 1.10),
    buildAsset(EXHIBIT_LIBRARY[3], [-7.5, 0, 0], [0, 0.65, 0], 0.9),
    buildAsset(EXHIBIT_LIBRARY[4], [8.5, 0, 0.5], [0, -0.65, 0], 1.0),
    buildAsset(מלאי_LIBRARY[2], [0, 0, -5.6], [0, 0, 0], 1.0),
    buildAsset(מלאי_LIBRARY[0], [11.0, 0, 4.5], [0, Math.PI / 2, 0], 1.0),
  ];
}

function buildVipPreset(): SceneAsset[] {
  return [
    buildTent([0, 0, 0], [0, Math.PI / 2, 0], 1.12),
    buildAsset(מלאי_LIBRARY[2], [-8.8, 0, -5.2], [0, 0, 0], 1.0),
    buildAsset(מלאי_LIBRARY[3], [8.8, 0, -5.2], [0, 0, 0], 1.0),
    buildAsset(מלאי_LIBRARY[1], [0, 0, 5.7], [0, 0, 0], 1.0),
    buildAsset(מלאי_LIBRARY[0], [-11.0, 0, 4.8], [0, Math.PI / 2, 0], 1.0),
  ];
}

function buildPreset(key: PresetKey): SceneAsset[] {
  if (key === "space") return buildSpacePreset();
  if (key === "air") return buildAirPreset();
  if (key === "vip") return buildVipPreset();
  return buildPremiumPreset();
}

function dimensionsForAsset(asset: SceneAsset, template: TentTemplate) {
  if (asset.category === "tent") {
    return {
      widthM: template.widthM,
      depthM: template.depthM,
      גובהM: template.גובהM,
    };
  }

  if (asset.widthM && asset.depthM && asset.גובהM) {
    return {
      widthM: asset.widthM,
      depthM: asset.depthM,
      גובהM: asset.גובהM,
    };
  }

  if (asset.model.includes("arrow-3-launcher")) return { widthM: 8.0, depthM: 3.0, גובהM: 3.0 };
  if (asset.model.includes("lora")) return { widthM: 6.5, depthM: 2.6, גובהM: 2.8 };
  if (asset.model.includes("/models/air/")) return { widthM: 4.0, depthM: 2.5, גובהM: 2.8 };
  if (asset.model.includes("/models/space/")) return { widthM: 2.0, depthM: 2.0, גובהM: 2.8 };
  if (asset.model.includes("flag-pair")) return { widthM: 2.2, depthM: 0.8, גובהM: 2.6 };
  if (asset.model.includes("lightbox-horizontal")) return { widthM: 3.0, depthM: 0.5, גובהM: 2.2 };
  if (asset.model.includes("lightbox-vertical")) return { widthM: 1.2, depthM: 0.5, גובהM: 2.8 };
  if (asset.model.includes("blue+logo")) return { widthM: 2.5, depthM: 0.4, גובהM: 1.2 };
  if (asset.model.includes("inflatable-tent")) return { widthM: 4.0, depthM: 4.0, גובהM: 3.0 };

  return { widthM: 1.5, depthM: 1.5, גובהM: 1.5 };
}

function formatMeters(value: number) {
  return `${Number(value.toFixed(1))}m`;
}

function getFitCheck(
  asset: SceneAsset,
  dimensions: { widthM: number; depthM: number; גובהM: number },
  template: TentTemplate
) {
  const halfTentW = template.widthM / 2;
  const halfTentD = template.depthM / 2;
  const halfAssetW = dimensions.widthM / 2;
  const halfAssetD = dimensions.depthM / 2;

  const minX = asset.position[0] - halfAssetW;
  const maxX = asset.position[0] + halfAssetW;
  const minZ = asset.position[2] - halfAssetD;
  const maxZ = asset.position[2] + halfAssetD;

  const fitsרוחב = dimensions.widthM <= template.widthM;
  const fitsעומק = dimensions.depthM <= template.depthM;
  const insideX = minX >= -halfTentW && maxX <= halfTentW;
  const insideZ = minZ >= -halfTentD && maxZ <= halfTentD;

  const clearanceLeft = minX + halfTentW;
  const clearanceRight = halfTentW - maxX;
  const clearanceBack = minZ + halfTentD;
  const clearanceFront = halfTentD - maxZ;

  const minClearance = Math.min(clearanceLeft, clearanceRight, clearanceBack, clearanceFront);

  return {
    fits: fitsרוחב && fitsעומק && insideX && insideZ,
    fitsרוחב,
    fitsעומק,
    insideX,
    insideZ,
    minClearance,
    clearanceLeft,
    clearanceRight,
    clearanceBack,
    clearanceFront,
  };
}

function FrameRect({
  width,
  depth,
  y = 0.04,
}: {
  width: number;
  depth: number;
  y?: number;
}) {
  const material = (
    <meshStandardMaterial
      color="#f1fbff"
      emissive="#d9f5ff"
      emissiveIntensity={3.8}
      roughness={0.2}
      metalness={0.2}
    />
  );

  return (
    <>
      <mesh position={[0, y, depth / 2]}>
        <boxGeometry args={[width, 0.06, 0.14]} />
        {material}
      </mesh>
      <mesh position={[0, y, -depth / 2]}>
        <boxGeometry args={[width, 0.06, 0.14]} />
        {material}
      </mesh>
      <mesh position={[width / 2, y, 0]}>
        <boxGeometry args={[0.14, 0.06, depth]} />
        {material}
      </mesh>
      <mesh position={[-width / 2, y, 0]}>
        <boxGeometry args={[0.14, 0.06, depth]} />
        {material}
      </mesh>
    </>
  );
}


function FloorSystem({ template }: { template: TentTemplate }) {
  const margin = 6;
  const carpetרוחב = template.widthM + margin;
  const carpetעומק = template.depthM + margin;

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
        <planeGeometry args={[carpetרוחב, carpetעומק]} />
        <meshStandardMaterial
          color="#0d42ff"
          emissive="#0a2ae0"
          emissiveIntensity={0.95}
          roughness={0.5}
          metalness={0.15}
        />
      </mesh>

      <gridHelper
        args={[Math.max(carpetרוחב, carpetעומק), Math.max(18, Math.round(Math.max(carpetרוחב, carpetעומק))), "#7bc3ff", "#2a5cff"]}
        position={[0, 0.02, 0]}
      />

      {/* Decorative floor ring removed for cleaner exhibition carpet. */}

      <FrameRect width={template.widthM} depth={template.depthM} />
    </group>
  );
}


function SpotlightFixture({
  position,
  rotation,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
}) {
  return null;
}

function CornerLighting() {
  const units = [
    { key: "nw", position: [-13.6, 0.04, -8.6] as [number, number, number], yaw: 0.99 },
    { key: "ne", position: [13.6, 0.04, -8.6] as [number, number, number], yaw: -0.99 },
    { key: "sw", position: [-13.6, 0.04, 8.6] as [number, number, number], yaw: 2.15 },
    { key: "se", position: [13.6, 0.04, 8.6] as [number, number, number], yaw: -2.15 },
  ];

  return (
    <group>
      {units.map((unit) => (
        <group key={unit.key} position={unit.position} rotation={[0, unit.yaw, 0]}>
          <mesh castShadow receiveShadow position={[0, 0.11, 0]}>
            <cylinderGeometry args={[0.22, 0.28, 0.14, 24]} />
            <meshStandardMaterial
              color="#15213a"
              metalness={0.82}
              roughness={0.28}
              emissive="#091a3a"
              emissiveIntensity={0.16}
            />
          </mesh>

          <mesh castShadow receiveShadow position={[0, 0.34, 0.08]} rotation={[-0.56, 0, 0]}>
            <boxGeometry args={[0.28, 0.18, 0.34]} />
            <meshStandardMaterial
              color="#dff3ff"
              metalness={0.72}
              roughness={0.18}
              emissive="#84dfff"
              emissiveIntensity={0.42}
            />
          </mesh>

          <mesh position={[0, 0.42, 3.2]} rotation={[-Math.PI / 2, 0, 0]} renderOrder={3}>
            <coneGeometry args={[1.02, 6.4, 36, 1, true]} />
            <meshBasicMaterial
              color="#dff7ff"
              transparent
              opacity={0.12}
              depthWrite={false}
              side={THREE.DoubleSide}
            />
          </mesh>

          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.031, 6.05]}>
            <circleGeometry args={[1.08, 48]} />
            <meshBasicMaterial color="#d8f5ff" transparent opacity={0.14} depthWrite={false} />
          </mesh>

          <Text
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, 0.045, 6.05]}
            fontSize={0.72}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            material-transparent
            material-opacity={0.34}
          >
            IAI
          </Text>

          <spotLight
            position={[0, 1.05, 0.34]}
            angle={0.34}
            penumbra={0.96}
            intensity={18}
            distance={24}
            color="#ecfbff"
            castShadow
          />

          <pointLight
            position={[0, 0.72, 0.35]}
            intensity={0.85}
            distance={4.2}
            color="#9be7ff"
          />
        </group>
      ))}
    </group>
  );
}

function Walls() {
  return (
    <group>
      <mesh position={[0, 7, -12]} receiveShadow>
        <planeGeometry args={[36, 14]} />
        <meshStandardMaterial color="#102042" roughness={0.8} metalness={0.05} />
      </mesh>
      <mesh position={[-18, 7, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[24, 14]} />
        <meshStandardMaterial color="#0c1736" roughness={0.84} metalness={0.05} />
      </mesh>
      <mesh position={[18, 7, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[24, 14]} />
        <meshStandardMaterial color="#0c1736" roughness={0.84} metalness={0.05} />
      </mesh>
    </group>
  );
}


function visualScaleForמצבl(asset: SceneAsset) {
  if (asset.category === "tent") return 16.0;
  if (asset.model.includes("arrow-3-launcher")) return 3.2;
  if (asset.model.includes("/models/air/")) return 3.0;
  if (asset.model.includes("/models/space/")) return 3.4;
  if (asset.model.includes("flag-pair")) return 2.4;
  if (asset.model.includes("lightbox")) return 2.6;
  if (asset.model.includes("blue+logo")) return 3.0;
  if (asset.model.includes("inflatable-tent")) return 3.0;
  return 2.2;
}

function Sceneמצבl({
  asset,
  selected,
  onSelect,
  transformMode,
  onTransformCommit,
  onTransformActiveChange,
  onTransformModeChange,
  onObjectControl,
}: {
  asset: SceneAsset;
  selected: boolean;
  onSelect: (id: string) => void;
  transformMode: TransformMode;
  onTransformCommit: (id: string, patch: Partial<SceneAsset>) => void;
  onTransformActiveChange: (active: boolean) => void;
  onTransformModeChange: (mode: TransformMode) => void;
  onObjectControl: (action: ObjectControlAction) => void;
}) {
  const hasModel = Boolean(asset.model);
  const { scene } = useGLTF(asset.model ?? TENT_MODEL);
  const cloned = useMemo(() => scene.clone(), [scene]);
  const groupRef = useRef<any>(null);
  const dragPlane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 1, 0), -asset.position[1]), [asset.position[1]]);
  const dragOffsetRef = useRef(new THREE.Vector3());
  const dragPointRef = useRef(new THREE.Vector3());
  const isDraggingRef = useRef(false);
  const [hovered, setHovered] = useState(false);
  const visualBase = visualScaleForמצבl(asset);
  const visualScale = asset.scale * visualBase;
  const selectedRing = Math.max(1.35, visualScale * 0.42);
  const fallbackColor = asset.category === "inventory" ? "#d7ecff" : "#eef6ff";

  const dockButton = {
    border: "1px solid rgba(161, 231, 255, 0.42)",
    background: "rgba(8, 18, 42, 0.86)",
    color: "rgba(238, 247, 255, 0.96)",
    borderRadius: 10,
    padding: "8px 10px",
    minWidth: 42,
    fontSize: 14,
    fontWeight: 900,
    cursor: "pointer",
    boxShadow: "0 8px 20px rgba(0,0,0,0.28)",
  } as const;

  const activeDockButton = {
    ...dockButton,
    border: "1px solid rgba(103, 232, 249, 0.88)",
    background: "rgba(14, 116, 144, 0.92)",
    color: "#ffffff",
  } as const;

  const stopDockEvent = (event: any) => {
    event.preventDefault?.();
    event.stopPropagation?.();
    event.nativeEvent?.stopImmediatePropagation?.();
  };

  const dockClick = (event: any, action: ObjectControlAction) => {
    stopDockEvent(event);
    onSelect(asset.id);
    onObjectControl(action);
  };

  const modeClick = (event: any, mode: TransformMode) => {
    stopDockEvent(event);
    onSelect(asset.id);
    onTransformModeChange(mode);
  };

  const beginObjectDrag = (event: any) => {
    event.stopPropagation();
    onSelect(asset.id);

    if (isMainTentAsset(asset)) return;

    if (transformMode !== "translate") return;

    isDraggingRef.current = true;
    onTransformActiveChange(true);
    document.body.style.cursor = "grabbing";
    event.target?.setPointerCapture?.(event.pointerId);

    if (event.ray?.intersectPlane(dragPlane, dragPointRef.current)) {
      dragOffsetRef.current.set(
        asset.position[0] - dragPointRef.current.x,
        0,
        asset.position[2] - dragPointRef.current.z
      );
    }
  };

  const moveObjectDrag = (event: any) => {
    if (!isDraggingRef.current || transformMode !== "translate") return;

    event.stopPropagation();

    if (!event.ray?.intersectPlane(dragPlane, dragPointRef.current)) return;

    const nextX = Number((dragPointRef.current.x + dragOffsetRef.current.x).toFixed(2));
    const nextZ = Number((dragPointRef.current.z + dragOffsetRef.current.z).toFixed(2));

    onTransformCommit(asset.id, {
      position: [nextX, asset.position[1], nextZ],
    });
  };

  const endObjectDrag = (event: any) => {
    if (!isDraggingRef.current) return;

    event.stopPropagation();
    event.target?.releasePointerCapture?.(event.pointerId);
    isDraggingRef.current = false;
    onTransformActiveChange(false);
    document.body.style.cursor = "pointer";
  };


  function commitTransform() {
    if (!groupRef.current) return;
    const object = groupRef.current;
    const nextScale = Number((object.scale.x / visualBase).toFixed(2));

    onTransformCommit(asset.id, {
      position: [
        Number(object.position.x.toFixed(2)),
        asset.position[1],
        Number(object.position.z.toFixed(2)),
      ],
      rotation: [
        Number(object.rotation.x.toFixed(2)),
        Number(object.rotation.y.toFixed(2)),
        Number(object.rotation.z.toFixed(2)),
      ],
      scale: Math.min(3.5, Math.max(0.2, nextScale)),
    });
  }

  const modelGroup = (
    <group
      ref={groupRef}
      position={asset.position}
      rotation={asset.rotation}
      scale={[visualScale, visualScale, visualScale]}
      onPointerOver={(event) => {
        event.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={(event) => {
        event.stopPropagation();
        if (!isDraggingRef.current) {
          setHovered(false);
          document.body.style.cursor = "default";
        }
      }}
      onPointerDown={beginObjectDrag}
      onPointerMove={moveObjectDrag}
      onPointerUp={endObjectDrag}
      onPointerCancel={endObjectDrag}
      onClick={(event) => {
        event.stopPropagation();
        onSelect(asset.id);
      }}
    >
      {hasModel ? (
        <primitive object={cloned} />
      ) : (
        <group>
          <mesh position={[0, 0.9, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.25, 1.8, 0.08]} />
            <meshStandardMaterial
              color={fallbackColor}
              emissive="#2a5cff"
              emissiveIntensity={0.18}
              metalness={0.18}
              roughness={0.36}
            />
          </mesh>
          <mesh position={[0, 1.84, 0.055]} castShadow>
            <boxGeometry args={[1.35, 0.12, 0.12]} />
            <meshStandardMaterial color="#f8fdff" emissive="#9be7ff" emissiveIntensity={0.75} />
          </mesh>
        </group>
      )}
      {hovered && !selected ? (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.055, 0]}>
          <ringGeometry args={[selectedRing, selectedRing + 0.22, 64]} />
          <meshBasicMaterial color="#67e8f9" transparent opacity={0.55} />
        </mesh>
      ) : null}

      {selected ? (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
          <ringGeometry args={[selectedRing, selectedRing + 0.25, 64]} />
          <meshBasicMaterial color="#c7fbff" transparent opacity={0.85} />
        </mesh>
      ) : null}

      {selected ? (
        <Html
          position={[0, Math.max(1.65, selectedRing * 0.42 + 1.15), 0]}
          center
          distanceFactor={10}
          zIndexRange={[100, 0]}
          style={{ pointerEvents: "auto", userSelect: "none" }}
        >
          <div
            onPointerDown={stopDockEvent}
            onPointerUp={stopDockEvent}
            onMouseDown={stopDockEvent}
            onMouseUp={stopDockEvent}
            onClick={stopDockEvent}
            style={{
              display: "grid",
              gap: 6,
              padding: 8,
              borderRadius: 14,
              border: "1px solid rgba(103, 232, 249, 0.55)",
              background: "linear-gradient(180deg, rgba(5, 14, 32, 0.96), rgba(8, 24, 52, 0.91))",
              boxShadow: "0 18px 44px rgba(0,0,0,0.46), 0 0 30px rgba(34, 211, 238, 0.2)",
              backdropFilter: "blur(10px)",
              minWidth: 238,
              direction: "rtl",
            }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 5 }}>
              <button style={transformMode === "translate" ? activeDockButton : dockButton} onClick={(event) => modeClick(event, "translate")}>הזזה</button>
              <button style={transformMode === "rotate" ? activeDockButton : dockButton} onClick={(event) => modeClick(event, "rotate")}>סיבוב</button>
              <button style={transformMode === "scale" ? activeDockButton : dockButton} onClick={(event) => modeClick(event, "scale")}>גודל</button>
              <button style={{ ...dockButton, border: "1px solid rgba(251, 113, 133, 0.78)", color: "#ffd7de" }} onClick={(event) => dockClick(event, "delete")}>מחק</button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 5 }}>
              <button style={dockButton} onClick={(event) => dockClick(event, "move-left")}>←</button>
              <button style={dockButton} onClick={(event) => dockClick(event, "move-forward")}>↑</button>
              <button style={dockButton} onClick={(event) => dockClick(event, "move-back")}>↓</button>
              <button style={dockButton} onClick={(event) => dockClick(event, "move-right")}>→</button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 5 }}>
              <button style={dockButton} onClick={(event) => dockClick(event, "rotate-left")}>⟲</button>
              <button style={dockButton} onClick={(event) => dockClick(event, "rotate-right")}>⟳</button>
              <button style={dockButton} onClick={(event) => dockClick(event, "scale-down")}>−</button>
              <button style={dockButton} onClick={(event) => dockClick(event, "scale-up")}>+</button>
            </div>
          </div>
        </Html>
      ) : null}
    </group>
  );

  return modelGroup;
}


function V3CameraRig({ cameraView }: { cameraView: "overview" | "inside" }) {
  const { camera } = useThree();

  useEffect(() => {
    if (cameraView === "inside") {
      camera.position.set(0, 1.35, -6.2);
      camera.lookAt(0, 1.05, -0.8);
    } else {
      camera.position.set(0, 11.2, 28);
      camera.lookAt(0, 1.8, 0);
    }

    camera.updateProjectionMatrix();
  }, [camera, cameraView]);

  return null;
}

function ShowcaseScene({
  sceneAssets,
  selectedId,
  onSelect,
  transformMode,
  onTransformCommit,
  onTransformModeChange,
  onObjectControl,
  cameraView,
  template,
}: {
  sceneAssets: SceneAsset[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  transformMode: TransformMode;
  onTransformCommit: (id: string, patch: Partial<SceneAsset>) => void;
  onTransformModeChange: (mode: TransformMode) => void;
  onObjectControl: (action: ObjectControlAction) => void;
  cameraView: "overview" | "inside";
  template: TentTemplate;
}) {
  const [isTransforming, setIsTransforming] = useState(false);

  return (
    <Canvas
      shadows
      dpr={[1, 1.25]}
      camera={{ position: [0, 11.2, 28], fov: 38 }}
      style={{ width: "100%", height: "100%" }}
      onPointerMissed={() => onSelect("main-tent")}
    >
      <V3CameraRig cameraView={cameraView} />
      <color attach="background" args={["#091634"]} />
      <fog attach="fog" args={["#091634", 28, 60]} />
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 12, 8]} intensity={1.2} color="#effbff" />
      <Suspense fallback={null}>
        <FloorSystem template={template} />
        <CornerLighting />
        <Walls />
        {sceneAssets.map((asset) => (
          <Sceneמצבl
            key={asset.id}
            asset={asset}
            selected={cameraView !== "inside" && selectedId === asset.id}
            onSelect={onSelect}
            transformMode={transformMode}
            onTransformCommit={onTransformCommit}
            onTransformActiveChange={setIsTransforming}
            onTransformModeChange={onTransformModeChange}
            onObjectControl={onObjectControl}
          />
        ))}
      </Suspense>
      <OrbitControls
        makeDefault
        enabled={!isTransforming}
        enablePan
        panSpeed={0.9}
        zoomSpeed={0.9}
        rotateSpeed={0.8}
        minDistance={cameraView === "inside" ? 0.55 : 7}
        maxDistance={cameraView === "inside" ? 20 : 58}
        minPolarAngle={0.45}
        maxPolarAngle={1.45}
        target={cameraView === "inside" ? [0, 1.05, -0.8] : [0, 1.8, 0]}
      />
    </Canvas>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div
      style={{
        border: "1px solid rgba(151, 237, 255, 0.18)",
        borderRadius: 18,
        padding: "12px 14px",
        background: "linear-gradient(180deg, rgba(21,38,82,0.72), rgba(8,17,41,0.72))",
        minWidth: 110,
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
    >
      <div style={{ fontSize: 11, letterSpacing: 0.8, opacity: 0.72, fontWeight: 800 }}>{label}</div>
      <div style={{ fontSize: 26, fontWeight: 900, lineHeight: 1.05, marginTop: 7 }}>{value}</div>
    </div>
  );
}

function LibraryCard({
  item,
  onAdd,
}: {
  item: Omit<SceneAsset, "id" | "position" | "rotation" | "scale">;
  onAdd: () => void;
}) {
  return (
    <div
      style={{
        border: "1px solid rgba(151, 237, 255, 0.16)",
        borderRadius: 15,
        overflow: "hidden",
        background: "linear-gradient(180deg, rgba(18,35,82,0.76), rgba(8,17,41,0.86))",
        boxShadow: "0 10px 24px rgba(0,0,0,0.16), inset 0 1px 0 rgba(255,255,255,0.05)",
        minHeight: 148,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          padding: 7,
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={item.poster}
          alt={item.title}
          style={{
width: "100%",
            height: 74,
            objectFit: "contain",
            padding: 7,
            boxSizing: "border-box",
            background: "rgba(2, 8, 23, 0.72)",
            borderRadius: 11,
            border: "1px solid rgba(255,255,255,0.12)",
            display: "block",
            background: "rgba(255,255,255,0.03)",
          }}
        />
      </div>

      <div style={{ padding: "0 7px 7px" }}>
        <button
          onClick={onAdd}
          style={{
            width: "100%",
            borderRadius: 11,
            border: "1px solid rgba(151, 237, 255, 0.30)",
            background: "linear-gradient(180deg, rgba(44,122,255,0.72), rgba(24,71,170,0.78))",
            color: "#f1fbff",
            padding: "7px 8px",
            fontWeight: 900,
            fontSize: 13,
            cursor: "pointer",
            boxShadow: "0 0 14px rgba(44,137,255,0.18)",
          }}
        >
          הוסף
        </button>
      </div>
    </div>
  );
}

export default function LayoutShowcaseV3Page() {
  const [preset, setPreset] = useState<PresetKey>("premium");
  const [templateId, setTemplateId] = useState<TentTemplateId>("20x30");
  const activeTemplate = TENT_TEMPLATES.find((template) => template.id === templateId) ?? DEFAULT_TENT_TEMPLATE;
  const [sceneAssets, setSceneAssets] = useState<SceneAsset[]>(() => buildPremiumPreset());
  const didHydrateSceneRef = useRef(false);
  const [selectedId, setנבחרId] = useState<string | null>("main-tent");
  const [transformMode, setTransformMode] = useState<TransformMode>("translate");
  const [cameraView, setCameraView] = useState<"overview" | "inside">("overview");
  const [inventoryFilter, setInventoryFilter] = useState<InventoryFilter>("all");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(V3_SCENE_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as SceneAsset[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSceneAssets(parsed);
          setנבחרId(parsed.some((item) => item.id === selectedId) ? selectedId : parsed[0]?.id ?? "main-tent");
        }
      }
    } catch (error) {
      console.warn("Could not load saved V3 scene", error);
    } finally {
      didHydrateSceneRef.current = true;
    }
  }, []);

  useEffect(() => {
    if (!didHydrateSceneRef.current) return;
    try {
      window.localStorage.setItem(V3_SCENE_STORAGE_KEY, JSON.stringify(sceneAssets));
    } catch (error) {
      console.warn("Could not save V3 scene", error);
    }
  }, [sceneAssets]);

  const selectedAsset =
    sceneAssets.find((item) => item.id === selectedId) ?? sceneAssets[0] ?? null;

  const selectedDimensions = selectedAsset ? dimensionsForAsset(selectedAsset, activeTemplate) : null;
  const selectedFit =
    selectedAsset && selectedDimensions
      ? getFitCheck(selectedAsset, selectedDimensions, activeTemplate)
      : null;

  function applyPreset(nextPreset: PresetKey) {
    setPreset(nextPreset);
    setSceneAssets(buildPreset(nextPreset));
    setנבחרId("main-tent");
  }

  function applyTentTemplate(nextTemplateId: TentTemplateId) {
    setTemplateId(nextTemplateId);
    setSceneAssets((current) =>
      current.map((item) =>
        isMainTentAsset(item)
          ? {
              ...item,
              position: [0, 0, 0],
              rotation: [0, Math.PI / 2, 0],
              scale: tentScaleForTemplate(nextTemplateId),
              poster: tentPosterForTemplate(nextTemplateId),
            }
          : item
      )
    );
    setנבחרId("main-tent");
  }

  function addFromLibrary(item: Omit<SceneAsset, "id" | "position" | "rotation" | "scale">) {
    const count = sceneAssets.length;
    const angle = count * 0.7;
    const radius = 6 + (count % 3) * 2.4;
    const next = buildAsset(
      item,
      [Math.cos(angle) * radius, 0, Math.sin(angle) * radius],
      [0, -angle, 0],
      item.category === "inventory" ? 1.0 : 0.95
    );
    setSceneAssets((current) => [...current, next]);
    setנבחרId(next.id);
  }

  function updateנבחר(patch: Partial<SceneAsset>) {
    if (!selectedId) return;
    setSceneAssets((current) =>
      current.map((item) => (item.id === selectedId ? { ...item, ...patch } : item))
    );
  }

  function commitTransformForAsset(id: string, patch: Partial<SceneAsset>) {
    setSceneAssets((current) =>
      current.map((item) => (item.id === id ? { ...item, ...patch } : item))
    );
  }

  function moveנבחר(dx: number, dz: number) {
    if (!selectedAsset) return;
    if (isMainTentAsset(selectedAsset)) return;

    const [x, y, z] = selectedAsset.position;
    const dims = dimensionsForAsset(selectedAsset, activeTemplate);

    const limitX = Math.max(0.5, activeTemplate.widthM / 2 - dims.widthM / 2);
    const limitZ = Math.max(0.5, activeTemplate.depthM / 2 - dims.depthM / 2);

    updateנבחר({
      position: [
        Number(Math.max(-limitX, Math.min(limitX, x + dx)).toFixed(2)),
        y,
        Number(Math.max(-limitZ, Math.min(limitZ, z + dz)).toFixed(2)),
      ],
    });
  }

  function rotateנבחר(delta: number) {
    if (!selectedAsset) return;
    if (isMainTentAsset(selectedAsset)) return;
    const [rx, ry, rz] = selectedAsset.rotation;
    updateנבחר({ rotation: [rx, Number((ry + delta).toFixed(2)), rz] });
  }

  function scaleנבחר(delta: number) {
    if (!selectedAsset) return;
    if (isMainTentAsset(selectedAsset)) return;
    const next = Math.min(3.5, Math.max(0.2, Number((selectedAsset.scale + delta).toFixed(2))));
    updateנבחר({ scale: next });
  }

  function removeנבחר() {
    if (!selectedAsset) return;
    if (isMainTentAsset(selectedAsset)) return;
    const removedId = selectedAsset.id;
    setSceneAssets((current) => current.filter((item) => item.id !== removedId));
    setנבחרId(null);
  }

  function restoreMainTent() {
    setSceneAssets((current) => {
      if (current.some((item) => item.id === "main-tent")) return current;
      return [
        buildTent(
          [0, 0, 0],
          [0, Math.PI / 2, 0],
          tentScaleForTemplate(templateId),
          tentPosterForTemplate(templateId)
        ),
        ...current,
      ];
    });
    setנבחרId("main-tent");
  }

  function handleObjectControl(action: ObjectControlAction) {
    if (action === "move-left") moveנבחר(-1, 0);
    if (action === "move-right") moveנבחר(1, 0);
    if (action === "move-forward") moveנבחר(0, -1);
    if (action === "move-back") moveנבחר(0, 1);
    if (action === "rotate-left") rotateנבחר(-0.35);
    if (action === "rotate-right") rotateנבחר(0.35);
    if (action === "scale-up") scaleנבחר(0.12);
    if (action === "scale-down") scaleנבחר(-0.12);
    if (action === "delete") removeנבחר();
  }

  function selectMainTent() {
    setנבחרId("main-tent");
  }

  const pageStyle: React.CSSProperties = {
    minheight: "100vh",
    color: "#eef7ff",
    background:
      "radial-gradient(circle at top, rgba(30,73,160,0.28), transparent 32%), linear-gradient(180deg, #08142d 0%, #0a1733 55%, #091327 100%)",
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  };

  const shellStyle: React.CSSProperties = {
    maxרוחב: 1440,
    margin: "0 auto",
    padding: "28px 28px 42px",
  };

  const panelStyle: React.CSSProperties = {
    border: "1px solid rgba(120,155,255,0.18)",
    borderRadius: 22,
    background: "rgba(10,18,40,0.56)",
    boxShadow: "0 10px 40px rgba(0,0,0,0.16)",
    backdropFilter: "blur(8px)",
  };

  const presetButton = (active: boolean): React.CSSProperties => ({
    flex: 1,
    minרוחב: 180,
    textAlign: "left",
    borderRadius: 18,
    border: active ? "1px solid rgba(112,248,255,0.48)" : "1px solid rgba(120,155,255,0.18)",
    background: active ? "rgba(68,137,255,0.18)" : "rgba(10,18,40,0.42)",
    color: "#eef8ff",
    padding: "14px 16px",
    cursor: "pointer",
  });

  return (
    <main style={pageStyle}>
      <div style={shellStyle}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 16,
            alignItems: "center",
            marginBottom: 18,
          }}
        >
          <div>
            <div style={{ fontSize: 12, letterSpacing: 2, color: "#83e4ff", fontWeight: 700 }}>
              EXHIBITION HUB / תצוגת V3
            </div>
            <div style={{ fontSize: 42, fontWeight: 900, lineheight: 1.05, marginTop: 8 }}>
              מרכז תכנון תצוגה
            </div>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <a
              href="/"
              style={{
                padding: "10px 16px",
                borderRadius: 999,
                textDecoration: "none",
                color: "#eef7ff",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(151, 237, 255, 0.22)",
                fontWeight: 700,
              }}
            >
              בית
            </a>
            <a
              href="/layout-planning"
              style={{
                padding: "10px 16px",
                borderRadius: 999,
                textDecoration: "none",
                color: "#eef7ff",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(151, 237, 255, 0.22)",
                fontWeight: 700,
              }}
            >
              תכנון פריסה
            </a>
          </div>
        </div>

        <div
          style={{
            ...panelStyle,
            padding: 18,
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: 12,
            marginBottom: 16,
          }}
        >
          <button style={presetButton(preset === "premium")} onClick={() => applyPreset("premium")}>
            <div style={{ fontWeight: 800 }}>תצוגה מלאה</div>
            <div style={{ fontSize: 12, opacity: 0.72, marginTop: 4 }}>בסיס תצוגה מלא</div>
          </button>
          <button style={presetButton(preset === "space")} onClick={() => applyPreset("space")}>
            <div style={{ fontWeight: 800 }}>תצוגת חלל</div>
            <div style={{ fontSize: 12, opacity: 0.72, marginTop: 4 }}>לוויינים וחלל</div>
          </button>
          <button style={presetButton(preset === "air")} onClick={() => applyPreset("air")}>
            <div style={{ fontWeight: 800 }}>הגנה אווירית</div>
            <div style={{ fontSize: 12, opacity: 0.72, marginTop: 4 }}>מערכות אוויריות</div>
          </button>
          <button style={presetButton(preset === "vip")} onClick={() => applyPreset("vip")}>
            <div style={{ fontWeight: 800 }}>ביקור VIP</div>
            <div style={{ fontSize: 12, opacity: 0.72, marginTop: 4 }}>מיתוג ואירוח</div>
          </button>
        </div>

        <div
          style={{
            ...panelStyle,
            padding: 18,
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: 12,
            marginBottom: 16,
          }}
        >
          {TENT_TEMPLATES.map((template) => {
            const active = template.id === templateId;
            return (
              <button
                key={template.id}
                style={{
                  ...presetButton(active),
                  minרוחב: 0,
                }}
                onClick={() => applyTentTemplate(template.id)}
              >
                <div style={{ fontWeight: 800 }}>{template.label}</div>
                <div style={{ fontSize: 12, opacity: 0.72, marginTop: 4 }}>
                  גובה {template.גובהM}m · גודל אוהל פעיל
                </div>
              </button>
            );
          })}
        </div>

        <div style={{ ...panelStyle, padding: 18 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 16,
              alignItems: "end",
              marginBottom: 14,
              flexWrap: "wrap",
            }}
          >
            <div>
              <div style={{ fontSize: 12, letterSpacing: 2, color: "#83e4ff", fontWeight: 700 }}>
                סביבת עבודה
              </div>
              <div style={{ fontSize: 22, fontWeight: 900, marginTop: 6 }}>
                בימת תכנון תצוגה
              </div>
              <div style={{ fontSize: 14, opacity: 0.8, marginTop: 6 }}>
                מודלים תלת־ממדיים אמיתיים • שטיח כחול • רשת מדידה • מסגרת נאון • ארבעה זרקורים
              </div>
            </div>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              width: "100%",
              <StatCard label="אובייקטים" value={sceneAssets.length} />
              <StatCard label="נבחר" value={selectedAsset?.title ?? "None"} />
              <StatCard label="מצב" value="V3" />
            </div>
          </div>

          <div
            style={{
              border: "1px solid rgba(120,155,255,0.20)",
              borderRadius: 24,
              overflow: "hidden",
              height: "76vh",
              minHeight: 760,
              width: "100%",
              maxHeight: "none",
              background: "rgba(8,15,36,0.88)",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 16,
                left: 16,
                zIndex: 25,
                display: "flex",
                gap: 8,
                padding: "8px 10px",
                borderRadius: 16,
                border: "1px solid rgba(103,232,249,0.22)",
                background: "linear-gradient(180deg, rgba(5,14,32,0.84), rgba(8,24,52,0.70))",
                boxShadow: "0 14px 34px rgba(0,0,0,0.28)",
                backdropFilter: "blur(10px)",
              }}
            >
              <button
                onClick={() => {
                  setCameraView("inside");
                  setTransformMode("translate");
                }}
                style={{
                  border: cameraView === "inside" ? "1px solid rgba(103,232,249,0.9)" : "1px solid rgba(255,255,255,0.14)",
                  background: cameraView === "inside" ? "rgba(14,116,144,0.42)" : "rgba(255,255,255,0.05)",
                  color: "#eaffff",
                  borderRadius: 999,
                  padding: "8px 12px",
                  fontSize: 12,
                  fontWeight: 900,
                  cursor: "pointer",
                }}
              >
                כניסה לאוהל
              </button>
              <button
                onClick={() => setCameraView("overview")}
                style={{
                  border: cameraView === "overview" ? "1px solid rgba(103,232,249,0.9)" : "1px solid rgba(255,255,255,0.14)",
                  background: cameraView === "overview" ? "rgba(14,116,144,0.42)" : "rgba(255,255,255,0.05)",
                  color: "#eaffff",
                  borderRadius: 999,
                  padding: "8px 12px",
                  fontSize: 12,
                  fontWeight: 900,
                  cursor: "pointer",
                }}
              >
                חזרה
              </button>
            </div>

            {cameraView === "inside" && selectedAsset && !isMainTentAsset(selectedAsset) ? (
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  bottom: 18,
                  transform: "translateX(-50%)",
                  zIndex: 35,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 12px",
                  borderRadius: 18,
                  border: "1px solid rgba(103,232,249,0.28)",
                  background: "linear-gradient(180deg, rgba(5,14,32,0.92), rgba(8,24,52,0.84))",
                  boxShadow: "0 18px 44px rgba(0,0,0,0.38), 0 0 26px rgba(56,189,248,0.14)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <div
                  style={{
                    color: "rgba(238,247,255,0.9)",
                    fontSize: 12,
                    fontWeight: 900,
                    padding: "0 8px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {selectedAsset.titleHe}
                </div>

                <button style={indoorBtn} onClick={() => moveנבחר(-0.5, 0)}>←</button>
                <button style={indoorBtn} onClick={() => moveנבחר(0, -0.5)}>↑</button>
                <button style={indoorBtn} onClick={() => moveנבחר(0, 0.5)}>↓</button>
                <button style={indoorBtn} onClick={() => moveנבחר(0.5, 0)}>→</button>

                <div style={indoorDivider} />

                <button style={indoorBtn} onClick={() => rotateנבחר(-0.18)}>⟲</button>
                <button style={indoorBtn} onClick={() => rotateנבחר(0.18)}>⟳</button>

                <div style={indoorDivider} />

                <button style={indoorBtn} onClick={() => scaleנבחר(-0.06)}>−</button>
                <button style={indoorBtn} onClick={() => scaleנבחר(0.06)}>+</button>

                <div style={indoorDivider} />

                <button style={indoorDangerBtn} onClick={removeנבחר}>מחק</button>
              </div>
            ) : null}

            <ShowcaseScene
              sceneAssets={sceneAssets}
              selectedId={selectedId}
              onSelect={setנבחרId}
              transformMode={transformMode}
              onTransformCommit={commitTransformForAsset}
              onTransformModeChange={setTransformMode}
              onObjectControl={handleObjectControl}
              cameraView={cameraView}
              template={activeTemplate}
            />
          </div>
        </div>

        <div
          style={{
            marginTop: 16,
            display: "grid",
            gridTemplateColumns: "1.05fr 1.05fr 0.9fr",
            gap: 16,
            alignItems: "start",
          }}
        >
          <section style={{ ...panelStyle, padding: 16 }}>
            <div style={{ fontSize: 12, letterSpacing: 2, color: "#83e4ff", fontWeight: 700 }}>
              מוצגים
            </div>
            <div style={{ fontSize: 24, fontWeight: 900, marginTop: 8 }}>מוצגים תלת־ממדיים</div>
            <div
              style={{
                marginTop: 14,
                display: "grid",
                gridTemplateColumns: "repeat(5, minmax(86px, 1fr))",
                gap: 12,
              }}
            >
              {EXHIBIT_LIBRARY.map((item) => (
                <LibraryCard
                  key={item.title}
                  item={item}
                  onAdd={() => addFromLibrary(item)}
                />
              ))}
            </div>
          </section>

          <section style={{ ...panelStyle, padding: 16 }}>
            <div style={{ fontSize: 12, letterSpacing: 2, color: "#83e4ff", fontWeight: 700 }}>
              מלאי
            </div>
            <div style={{ fontSize: 24, fontWeight: 900, marginTop: 8 }}>מלאי לפי קבוצות</div>

            <div
              style={{
                display: "flex",
                gap: 8,
                flexWrap: "wrap",
                marginTop: 14,
                marginBottom: 12,
              }}
            >
              {INVENTORY_FILTERS.map((filter) => {
                const active = inventoryFilter === filter.id;

                return (
                  <button
                    key={filter.id}
                    onClick={() => setInventoryFilter(filter.id)}
                    style={{
                      border: active
                        ? "1px solid rgba(103,232,249,0.9)"
                        : "1px solid rgba(255,255,255,0.14)",
                      background: active ? "rgba(14,116,144,0.42)" : "rgba(255,255,255,0.05)",
                      color: active ? "#eaffff" : "rgba(238,247,255,0.78)",
                      borderRadius: 999,
                      padding: "7px 12px",
                      fontSize: 12,
                      fontWeight: 900,
                      cursor: "pointer",
                    }}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>

            <div
              style={{
                marginTop: 10,
                display: "grid",
                gridTemplateColumns: "repeat(5, minmax(86px, 1fr))",
                gap: 12,
              }}
            >
              {מלאי_LIBRARY.filter((item) => matchesInventoryFilter(item, inventoryFilter)).map((item) => (
                <LibraryCard
                  key={item.title}
                  item={item}
                  onAdd={() => addFromLibrary(item)}
                />
              ))}
            </div>
          </section>

          <section style={{ ...panelStyle, padding: 16, direction: "rtl", textAlign: "right" }}>
            <div style={{ fontSize: 12, letterSpacing: 2, color: "#83e4ff", fontWeight: 700 }}>
              אובייקט נבחר
            </div>
            <div style={{ fontSize: 24, fontWeight: 900, marginTop: 8 }}>
              {selectedAsset?.title ?? "לא נבחר"}
            </div>
            <div style={{ fontSize: 13, opacity: 0.78, marginTop: 4 }}>
              {selectedAsset?.titleHe ?? "—"}
            </div>

            {selectedDimensions ? (
              <div
                style={{
                  marginTop: 14,
                  display: "grid",
                  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                  gap: 8,
                }}
              >
                <StatCard label="רוחב" value={formatMeters(selectedDimensions.widthM)} />
                <StatCard label="עומק" value={formatMeters(selectedDimensions.depthM)} />
                <StatCard label="גובה" value={formatMeters(selectedDimensions.גובהM)} />
              </div>
            ) : null}

            <div
              style={{
                marginTop: 12,
                padding: "10px 12px",
                borderRadius: 14,
                border: "1px solid rgba(151, 237, 255, 0.18)",
                background: "rgba(255,255,255,0.045)",
                fontSize: 13,
                lineheight: 1.45,
                color: "rgba(238,247,255,0.82)",
              }}
            >
              אוהל פעיל: <b>{activeTemplate.label}</b> · שטח עבודה {activeTemplate.widthM}m × {activeTemplate.depthM}m
            </div>

            {selectedFit ? (
              <div
                style={{
                  marginTop: 12,
                  padding: "12px",
                  borderRadius: 16,
                  border: selectedFit.fits
                    ? "1px solid rgba(71,255,190,0.34)"
                    : "1px solid rgba(255,160,120,0.42)",
                  background: selectedFit.fits
                    ? "rgba(28,180,125,0.10)"
                    : "rgba(255,105,80,0.12)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <div>
                    <div style={{ fontSize: 12, letterSpacing: 1.5, color: "#83e4ff", fontWeight: 800 }}>
                      בדיקת התאמה
                    </div>
                    <div style={{ fontSize: 13, opacity: 0.78, marginTop: 4 }}>
                      בדיקת מיקום האובייקט בתוך שטח האוהל
                    </div>
                  </div>

                  <div
                    style={{
                      borderRadius: 999,
                      padding: "8px 12px",
                      fontWeight: 900,
                      color: selectedFit.fits ? "#a9ffe4" : "#ffd1c7",
                      background: selectedFit.fits
                        ? "rgba(28,180,125,0.16)"
                        : "rgba(255,105,80,0.18)",
                      border: selectedFit.fits
                        ? "1px solid rgba(71,255,190,0.26)"
                        : "1px solid rgba(255,160,120,0.34)",
                    }}
                  >
                    {selectedFit.fits ? "מתאים" : "לא מתאים"}
                  </div>
                </div>

                <div
                  style={{
                    marginTop: 12,
                    display: "grid",
                    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                    gap: 8,
                    fontSize: 13,
                  }}
                >
                  <div style={{ opacity: 0.82 }}>
                    רוחב: {selectedFit.fitsרוחב ? "תקין" : "רחב מדי"}
                  </div>
                  <div style={{ opacity: 0.82 }}>
                    עומק: {selectedFit.fitsעומק ? "תקין" : "עמוק מדי"}
                  </div>
                  <div style={{ opacity: 0.82 }}>
                    מיקום X: {selectedFit.insideX ? "בפנים" : "בחוץ"}
                  </div>
                  <div style={{ opacity: 0.82 }}>
                    מיקום Z: {selectedFit.insideZ ? "בפנים" : "בחוץ"}
                  </div>
                </div>

                <div
                  style={{
                    marginTop: 10,
                    fontSize: 13,
                    color: selectedFit.minClearance >= 0 ? "rgba(238,247,255,0.82)" : "#ffd1c7",
                  }}
                >
                  מרווח מינימלי: <b>{formatMeters(selectedFit.minClearance)}</b>
                </div>
              </div>
            ) : null}

            <div
              style={{
                marginTop: 16,
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: 10,
              }}
            >
              <StatCard label="X" value={selectedAsset?.position[0] ?? 0} />
              <StatCard label="Z" value={selectedAsset?.position[2] ?? 0} />
              <StatCard label="קנ״מ" value={selectedAsset?.scale ?? 1} />
            </div>

            <div style={{ marginTop: 18, fontWeight: 800 }}>הזזה</div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 10,
                marginTop: 10,
              }}
            >
            <div style={{ marginTop: 18, fontWeight: 800 }}>שליטה ישירה בסצנה</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginTop: 10, marginBottom: 12 }}>
              <button style={transformMode === "translate" ? activeControlBtn : controlBtn} onClick={() => setTransformMode("translate")}>הזזה</button>
              <button style={transformMode === "rotate" ? activeControlBtn : controlBtn} onClick={() => setTransformMode("rotate")}>סיבוב</button>
              <button style={transformMode === "scale" ? activeControlBtn : controlBtn} onClick={() => setTransformMode("scale")}>גודל</button>
            </div>

              <button style={controlBtn} onClick={() => moveנבחר(-1, 0)}>←</button>
              <button style={controlBtn} onClick={() => moveנבחר(0, -1)}>↑</button>
              <button style={controlBtn} onClick={() => moveנבחר(1, 0)}>→</button>
              <div />
              <button style={controlBtn} onClick={() => moveנבחר(0, 1)}>↓</button>
              <div />
            </div>

            <div style={{ marginTop: 18, fontWeight: 800 }}>סיבוב / קנה מידה</div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 10,
                marginTop: 10,
              }}
            >
              <button style={controlBtn} onClick={() => rotateנבחר(-0.35)}>סובב שמאלה</button>
              <button style={controlBtn} onClick={() => rotateנבחר(0.35)}>סובב ימינה</button>
              <button style={controlBtn} onClick={() => scaleנבחר(-0.12)}>הקטן</button>
              <button style={controlBtn} onClick={() => scaleנבחר(0.12)}>הגדל</button>
            </div>

            <div style={{ marginTop: 18, fontWeight: 800 }}>פעולות</div>
            <div style={{ display: "grid", gap: 10, marginTop: 10 }}>
              <button style={controlBtn} onClick={selectMainTent}>בחר אוהל</button>
              <button style={dangerBtn} onClick={removeנבחר}>מחק נבחר</button>
              <button style={controlBtn} onClick={restoreMainTent}>החזר אוהל</button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

const indoorBtn: React.CSSProperties = {
  width: 44,
  height: 38,
  border: "1px solid rgba(103,232,249,0.34)",
  background: "rgba(255,255,255,0.07)",
  color: "#eaffff",
  borderRadius: 12,
  cursor: "pointer",
  fontSize: 18,
  fontWeight: 900,
};

const indoorDangerBtn: React.CSSProperties = {
  ...indoorBtn,
  width: 62,
  border: "1px solid rgba(251,113,133,0.62)",
  background: "rgba(127,29,29,0.28)",
  color: "#ffd7de",
  fontSize: 13,
};

const indoorDivider: React.CSSProperties = {
  width: 1,
  height: 30,
  background: "rgba(255,255,255,0.12)",
  margin: "0 2px",
};

const controlBtn: React.CSSProperties = {
  borderRadius: 14,
  border: "1px solid rgba(151, 237, 255, 0.22)",
  background: "rgba(255,255,255,0.06)",
  color: "#f0fbff",
  padding: "12px 14px",
  fontWeight: 800,
  cursor: "pointer",
};

const activeControlBtn: React.CSSProperties = {
  ...controlBtn,
  border: "1px solid rgba(103, 232, 249, 0.78)",
  background: "rgba(103, 232, 249, 0.18)",
  color: "#eaffff",
};

const dangerBtn: React.CSSProperties = {
  borderRadius: 14,
  border: "1px solid rgba(255, 150, 150, 0.26)",
  background: "rgba(255, 100, 100, 0.08)",
  color: "#fff2f2",
  padding: "12px 14px",
  fontWeight: 800,
  cursor: "pointer",
};

useGLTF.preload("/models/inventory/event+tent+3d+model.glb");
EXHIBIT_LIBRARY.forEach((asset) => { if (asset.model) useGLTF.preload(asset.model); });
מלאי_LIBRARY.forEach((asset) => { if (asset.model) useGLTF.preload(asset.model); });
