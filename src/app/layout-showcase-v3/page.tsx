"use client";

import { Suspense, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

type AssetKind = "tent" | "exhibit" | "inventory";

type SceneAsset = {
  id: string;
  title: string;
  titleHe: string;
  category: AssetKind;
  model: string;
  poster: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  widthM?: number;
  depthM?: number;
  heightM?: number;
};

type PresetKey = "premium" | "space" | "air" | "vip";

type TentTemplateId = "10x15" | "15x25" | "20x30";

type TentTemplate = {
  id: TentTemplateId;
  label: string;
  widthM: number;
  depthM: number;
  heightM: number;
};

const TENT_TEMPLATES: TentTemplate[] = [
  { id: "10x15", label: "10m × 15m", widthM: 10, depthM: 15, heightM: 5 },
  { id: "15x25", label: "15m × 25m", widthM: 15, depthM: 25, heightM: 6 },
  { id: "20x30", label: "20m × 30m", widthM: 20, depthM: 30, heightM: 7 },
];

const DEFAULT_TENT_TEMPLATE = TENT_TEMPLATES.find((template) => template.id === "20x30") ?? TENT_TEMPLATES[0];

const TENT_MODEL = "/models/inventory/event+tent+3d+model.glb";

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

const INVENTORY_LIBRARY: Omit<SceneAsset, "id" | "position" | "rotation" | "scale">[] = [
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
];

function makeId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
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

function buildTent(position: [number, number, number], rotation: [number, number, number], scale: number): SceneAsset {
  return {
    id: "main-tent",
    title: "Main Exhibition Tent",
    titleHe: "אוהל תצוגה ראשי",
    category: "tent",
    model: TENT_MODEL,
    poster: "/inventory/tent-30x20-white-01.png",
    position,
    rotation,
    scale,
  };
}

function buildPremiumPreset(): SceneAsset[] {
  return [
    buildTent([0, 0, 0], [0, Math.PI / 2, 0], 1.08),
    buildAsset(INVENTORY_LIBRARY[2], [-8.8, 0, -5.3], [0, 0, 0], 1.05),
    buildAsset(INVENTORY_LIBRARY[3], [8.8, 0, -5.0], [0, 0, 0], 1.05),
    buildAsset(INVENTORY_LIBRARY[0], [-10.8, 0, 5.0], [0, Math.PI / 2, 0], 1.0),
    buildAsset(EXHIBIT_LIBRARY[3], [10.6, 0, 4.8], [0, -Math.PI / 2, 0], 0.95),
  ];
}

function buildSpacePreset(): SceneAsset[] {
  return [
    buildTent([0, 0, 0], [0, Math.PI / 2, 0], 1.05),
    buildAsset(EXHIBIT_LIBRARY[0], [-7, 0, -1.5], [0, 0.3, 0], 0.95),
    buildAsset(EXHIBIT_LIBRARY[1], [0, 0, 3], [0, 0, 0], 0.95),
    buildAsset(EXHIBIT_LIBRARY[2], [7, 0, -1], [0, -0.35, 0], 0.95),
    buildAsset(INVENTORY_LIBRARY[3], [11.5, 0, 5.2], [0, 0, 0], 1.0),
  ];
}

function buildAirPreset(): SceneAsset[] {
  return [
    buildTent([0, 0, 0], [0, Math.PI / 2, 0], 1.04),
    buildAsset(EXHIBIT_LIBRARY[3], [-7.5, 0, 0], [0, 0.65, 0], 0.9),
    buildAsset(EXHIBIT_LIBRARY[4], [8.5, 0, 0.5], [0, -0.65, 0], 1.0),
    buildAsset(INVENTORY_LIBRARY[2], [0, 0, -5.6], [0, 0, 0], 1.0),
    buildAsset(INVENTORY_LIBRARY[0], [11.0, 0, 4.5], [0, Math.PI / 2, 0], 1.0),
  ];
}

function buildVipPreset(): SceneAsset[] {
  return [
    buildTent([0, 0, 0], [0, Math.PI / 2, 0], 1.02),
    buildAsset(INVENTORY_LIBRARY[2], [-8.8, 0, -5.2], [0, 0, 0], 1.0),
    buildAsset(INVENTORY_LIBRARY[3], [8.8, 0, -5.2], [0, 0, 0], 1.0),
    buildAsset(INVENTORY_LIBRARY[1], [0, 0, 5.7], [0, 0, 0], 1.0),
    buildAsset(INVENTORY_LIBRARY[0], [-11.0, 0, 4.8], [0, Math.PI / 2, 0], 1.0),
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
      heightM: template.heightM,
    };
  }

  if (asset.widthM && asset.depthM && asset.heightM) {
    return {
      widthM: asset.widthM,
      depthM: asset.depthM,
      heightM: asset.heightM,
    };
  }

  if (asset.model.includes("arrow-3-launcher")) return { widthM: 8.0, depthM: 3.0, heightM: 3.0 };
  if (asset.model.includes("lora")) return { widthM: 6.5, depthM: 2.6, heightM: 2.8 };
  if (asset.model.includes("/models/air/")) return { widthM: 4.0, depthM: 2.5, heightM: 2.8 };
  if (asset.model.includes("/models/space/")) return { widthM: 2.0, depthM: 2.0, heightM: 2.8 };
  if (asset.model.includes("flag-pair")) return { widthM: 2.2, depthM: 0.8, heightM: 2.6 };
  if (asset.model.includes("lightbox-horizontal")) return { widthM: 3.0, depthM: 0.5, heightM: 2.2 };
  if (asset.model.includes("lightbox-vertical")) return { widthM: 1.2, depthM: 0.5, heightM: 2.8 };
  if (asset.model.includes("blue+logo")) return { widthM: 2.5, depthM: 0.4, heightM: 1.2 };
  if (asset.model.includes("inflatable-tent")) return { widthM: 4.0, depthM: 4.0, heightM: 3.0 };

  return { widthM: 1.5, depthM: 1.5, heightM: 1.5 };
}

function formatMeters(value: number) {
  return `${Number(value.toFixed(1))}m`;
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
  const carpetWidth = template.widthM + margin;
  const carpetDepth = template.depthM + margin;

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
        <planeGeometry args={[carpetWidth, carpetDepth]} />
        <meshStandardMaterial
          color="#0d42ff"
          emissive="#0a2ae0"
          emissiveIntensity={0.95}
          roughness={0.5}
          metalness={0.15}
        />
      </mesh>

      <gridHelper
        args={[Math.max(carpetWidth, carpetDepth), Math.max(18, Math.round(Math.max(carpetWidth, carpetDepth))), "#7bc3ff", "#2a5cff"]}
        position={[0, 0.02, 0]}
      />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.028, 0]}>
        <ringGeometry args={[Math.min(template.widthM, template.depthM) * 0.28, Math.min(template.widthM, template.depthM) * 0.34, 128]} />
        <meshBasicMaterial color="#d8f8ff" transparent opacity={0.82} />
      </mesh>

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
  return (
    <group position={position} rotation={rotation}>
      <mesh castShadow>
        <cylinderGeometry args={[0.22, 0.24, 0.18, 20]} />
        <meshStandardMaterial color="#d8edf7" metalness={0.55} roughness={0.25} />
      </mesh>
      <mesh position={[0, -0.16, 0.24]} rotation={[0.95, 0, 0]}>
        <coneGeometry args={[0.2, 0.35, 18]} />
        <meshStandardMaterial color="#f7fbff" emissive="#e7f9ff" emissiveIntensity={1.5} />
      </mesh>
    </group>
  );
}

function CornerLighting() {
  return (
    <group>
      <spotLight position={[-15, 8, -10]} angle={0.42} penumbra={0.9} intensity={16} distance={52} color="#e9fbff" castShadow />
      <spotLight position={[15, 8, -10]} angle={0.42} penumbra={0.9} intensity={16} distance={52} color="#e9fbff" castShadow />
      <spotLight position={[-15, 8, 10]} angle={0.42} penumbra={0.9} intensity={16} distance={52} color="#e9fbff" castShadow />
      <spotLight position={[15, 8, 10]} angle={0.42} penumbra={0.9} intensity={16} distance={52} color="#e9fbff" castShadow />

      <SpotlightFixture position={[-15.3, 0.25, -10.2]} rotation={[0.6, 0, -0.45]} />
      <SpotlightFixture position={[15.3, 0.25, -10.2]} rotation={[0.6, 0, 0.45]} />
      <SpotlightFixture position={[-15.3, 0.25, 10.2]} rotation={[-0.6, 0, -0.45]} />
      <SpotlightFixture position={[15.3, 0.25, 10.2]} rotation={[-0.6, 0, 0.45]} />
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


function visualScaleForModel(asset: SceneAsset) {
  if (asset.category === "tent") return 7.2;
  if (asset.model.includes("arrow-3-launcher")) return 3.2;
  if (asset.model.includes("/models/air/")) return 3.0;
  if (asset.model.includes("/models/space/")) return 3.4;
  if (asset.model.includes("flag-pair")) return 2.4;
  if (asset.model.includes("lightbox")) return 2.6;
  if (asset.model.includes("blue+logo")) return 3.0;
  if (asset.model.includes("inflatable-tent")) return 3.0;
  return 2.2;
}

function SceneModel({
  asset,
  selected,
  onSelect,
}: {
  asset: SceneAsset;
  selected: boolean;
  onSelect: (id: string) => void;
}) {
  const { scene } = useGLTF(asset.model);
  const cloned = useMemo(() => scene.clone(), [scene]);
  const visualScale = asset.scale * visualScaleForModel(asset);
  const selectedRing = Math.max(1.35, visualScale * 0.42);

  return (
    <group
      position={asset.position}
      rotation={asset.rotation}
      scale={[visualScale, visualScale, visualScale]}
      onClick={(event) => {
        event.stopPropagation();
        onSelect(asset.id);
      }}
    >
      <primitive object={cloned} />
      {selected ? (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
          <ringGeometry args={[selectedRing, selectedRing + 0.25, 64]} />
          <meshBasicMaterial color="#c7fbff" transparent opacity={0.85} />
        </mesh>
      ) : null}
    </group>
  );
}

function ShowcaseScene({
  sceneAssets,
  selectedId,
  onSelect,
  template,
}: {
  sceneAssets: SceneAsset[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  template: TentTemplate;
}) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.25]}
      camera={{ position: [0, 9.8, 20], fov: 36 }}
      style={{ width: "100%", height: "100%" }}
      onPointerMissed={() => onSelect("main-tent")}
    >
      <color attach="background" args={["#091634"]} />
      <fog attach="fog" args={["#091634", 28, 60]} />
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 12, 8]} intensity={1.2} color="#effbff" />
      <Suspense fallback={null}>
        <FloorSystem template={template} />
        <CornerLighting />
        <Walls />
        {sceneAssets.map((asset) => (
          <SceneModel
            key={asset.id}
            asset={asset}
            selected={selectedId === asset.id}
            onSelect={onSelect}
          />
        ))}
      </Suspense>
      <OrbitControls
        makeDefault
        enablePan
        panSpeed={0.9}
        zoomSpeed={0.9}
        rotateSpeed={0.8}
        minDistance={10}
        maxDistance={44}
        minPolarAngle={0.45}
        maxPolarAngle={1.45}
        target={[0, 1.65, 0]}
      />
    </Canvas>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div
      style={{
        border: "1px solid rgba(130,160,255,0.22)",
        borderRadius: 18,
        padding: "14px 18px",
        background: "rgba(10,20,48,0.56)",
        minWidth: 130,
      }}
    >
      <div style={{ fontSize: 12, letterSpacing: 0.6, opacity: 0.72 }}>{label}</div>
      <div style={{ fontSize: 30, fontWeight: 800, lineHeight: 1.05, marginTop: 8 }}>{value}</div>
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
        border: "1px solid rgba(130,160,255,0.18)",
        borderRadius: 16,
        overflow: "hidden",
        background: "rgba(11,20,45,0.72)",
      }}
    >
      <div
        style={{
          height: 92,
          background: "linear-gradient(180deg, rgba(37,71,154,0.88), rgba(9,22,52,0.92))",
          display: "flex",
          alignItems: "end",
          justifyContent: "start",
          padding: 10,
        }}
      >
        <img
          src={item.poster}
          alt={item.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: 10,
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        />
      </div>
      <div style={{ padding: 12 }}>
        <div style={{ fontWeight: 800, fontSize: 16 }}>{item.title}</div>
        <div style={{ fontSize: 12, opacity: 0.72, marginTop: 4 }}>{item.category.toUpperCase()}</div>
        <button
          onClick={onAdd}
          style={{
            marginTop: 10,
            width: "100%",
            borderRadius: 12,
            border: "1px solid rgba(151, 237, 255, 0.32)",
            background: "rgba(58,128,255,0.18)",
            color: "#f0fbff",
            padding: "10px 12px",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          ADD
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
  const [selectedId, setSelectedId] = useState<string | null>("main-tent");

  const selectedAsset =
    sceneAssets.find((item) => item.id === selectedId) ?? sceneAssets[0] ?? null;

  const selectedDimensions = selectedAsset ? dimensionsForAsset(selectedAsset, activeTemplate) : null;

  function applyPreset(nextPreset: PresetKey) {
    setPreset(nextPreset);
    setSceneAssets(buildPreset(nextPreset));
    setSelectedId("main-tent");
  }

  function applyTentTemplate(nextTemplateId: TentTemplateId) {
    setTemplateId(nextTemplateId);
    setSelectedId("main-tent");
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
    setSelectedId(next.id);
  }

  function updateSelected(patch: Partial<SceneAsset>) {
    if (!selectedId) return;
    setSceneAssets((current) =>
      current.map((item) => (item.id === selectedId ? { ...item, ...patch } : item))
    );
  }

  function moveSelected(dx: number, dz: number) {
    if (!selectedAsset) return;

    const [x, y, z] = selectedAsset.position;
    const dims = dimensionsForAsset(selectedAsset, activeTemplate);

    const limitX = Math.max(0.5, activeTemplate.widthM / 2 - dims.widthM / 2);
    const limitZ = Math.max(0.5, activeTemplate.depthM / 2 - dims.depthM / 2);

    updateSelected({
      position: [
        Number(Math.max(-limitX, Math.min(limitX, x + dx)).toFixed(2)),
        y,
        Number(Math.max(-limitZ, Math.min(limitZ, z + dz)).toFixed(2)),
      ],
    });
  }

  function rotateSelected(delta: number) {
    if (!selectedAsset) return;
    const [rx, ry, rz] = selectedAsset.rotation;
    updateSelected({ rotation: [rx, Number((ry + delta).toFixed(2)), rz] });
  }

  function scaleSelected(delta: number) {
    if (!selectedAsset) return;
    const next = Math.min(2.2, Math.max(0.35, Number((selectedAsset.scale + delta).toFixed(2))));
    updateSelected({ scale: next });
  }

  function removeSelected() {
    if (!selectedAsset || selectedAsset.id === "main-tent") return;
    setSceneAssets((current) => current.filter((item) => item.id !== selectedAsset.id));
    setSelectedId("main-tent");
  }

  function selectMainTent() {
    setSelectedId("main-tent");
  }

  const pageStyle: React.CSSProperties = {
    minHeight: "100vh",
    color: "#eef7ff",
    background:
      "radial-gradient(circle at top, rgba(30,73,160,0.28), transparent 32%), linear-gradient(180deg, #08142d 0%, #0a1733 55%, #091327 100%)",
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  };

  const shellStyle: React.CSSProperties = {
    maxWidth: 1440,
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
    minWidth: 180,
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
              EXHIBITION HUB / SHOWCASE V3
            </div>
            <div style={{ fontSize: 42, fontWeight: 900, lineHeight: 1.05, marginTop: 8 }}>
              Executive Layout Showcase
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
              Home
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
              Layout Planning
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
            <div style={{ fontWeight: 800 }}>Premium Tent</div>
            <div style={{ fontSize: 12, opacity: 0.72, marginTop: 4 }}>בסיס תצוגה מלא</div>
          </button>
          <button style={presetButton(preset === "space")} onClick={() => applyPreset("space")}>
            <div style={{ fontWeight: 800 }}>Space Showcase</div>
            <div style={{ fontSize: 12, opacity: 0.72, marginTop: 4 }}>לוויינים וחלל</div>
          </button>
          <button style={presetButton(preset === "air")} onClick={() => applyPreset("air")}>
            <div style={{ fontWeight: 800 }}>Air Defense</div>
            <div style={{ fontSize: 12, opacity: 0.72, marginTop: 4 }}>מערכות אוויריות</div>
          </button>
          <button style={presetButton(preset === "vip")} onClick={() => applyPreset("vip")}>
            <div style={{ fontWeight: 800 }}>VIP Visit</div>
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
                  minWidth: 0,
                }}
                onClick={() => applyTentTemplate(template.id)}
              >
                <div style={{ fontWeight: 800 }}>{template.label}</div>
                <div style={{ fontSize: 12, opacity: 0.72, marginTop: 4 }}>
                  height {template.heightM}m · active tent size
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
                MAIN SCENE
              </div>
              <div style={{ fontSize: 22, fontWeight: 900, marginTop: 6 }}>
                Tent Configuration Stage
              </div>
              <div style={{ fontSize: 14, opacity: 0.8, marginTop: 6 }}>
                Real GLB models • blue exhibition floor • elegant grid • neon frame • four corner spotlights
              </div>
            </div>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <StatCard label="Objects" value={sceneAssets.length} />
              <StatCard label="Selected" value={selectedAsset?.title ?? "None"} />
              <StatCard label="Mode" value="V3" />
            </div>
          </div>

          <div
            style={{
              border: "1px solid rgba(120,155,255,0.18)",
              borderRadius: 22,
              overflow: "hidden",
              height: 760,
              background: "rgba(8,15,36,0.84)",
            }}
          >
            <ShowcaseScene
              sceneAssets={sceneAssets}
              selectedId={selectedId}
              onSelect={setSelectedId}
              template={activeTemplate}
            />
          </div>
        </div>

        <div
          style={{
            marginTop: 16,
            display: "grid",
            gridTemplateColumns: "1.15fr 1.15fr 0.75fr",
            gap: 16,
            alignItems: "start",
          }}
        >
          <section style={{ ...panelStyle, padding: 16 }}>
            <div style={{ fontSize: 12, letterSpacing: 2, color: "#83e4ff", fontWeight: 700 }}>
              EXHIBITS
            </div>
            <div style={{ fontSize: 26, fontWeight: 900, marginTop: 8 }}>Real 3D Exhibits</div>
            <div
              style={{
                marginTop: 14,
                display: "grid",
                gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
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
              INVENTORY
            </div>
            <div style={{ fontSize: 26, fontWeight: 900, marginTop: 8 }}>Real 3D Inventory</div>
            <div
              style={{
                marginTop: 14,
                display: "grid",
                gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
                gap: 12,
              }}
            >
              {INVENTORY_LIBRARY.map((item) => (
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
              SELECTED OBJECT
            </div>
            <div style={{ fontSize: 26, fontWeight: 900, marginTop: 8 }}>
              {selectedAsset?.title ?? "No selection"}
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
                <StatCard label="Width" value={formatMeters(selectedDimensions.widthM)} />
                <StatCard label="Depth" value={formatMeters(selectedDimensions.depthM)} />
                <StatCard label="Height" value={formatMeters(selectedDimensions.heightM)} />
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
                lineHeight: 1.45,
                color: "rgba(238,247,255,0.82)",
              }}
            >
              Active tent: <b>{activeTemplate.label}</b> · usable footprint {activeTemplate.widthM}m × {activeTemplate.depthM}m
            </div>

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
              <StatCard label="Scale" value={selectedAsset?.scale ?? 1} />
            </div>

            <div style={{ marginTop: 18, fontWeight: 800 }}>Move</div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 10,
                marginTop: 10,
              }}
            >
              <button style={controlBtn} onClick={() => moveSelected(-1, 0)}>←</button>
              <button style={controlBtn} onClick={() => moveSelected(0, -1)}>↑</button>
              <button style={controlBtn} onClick={() => moveSelected(1, 0)}>→</button>
              <div />
              <button style={controlBtn} onClick={() => moveSelected(0, 1)}>↓</button>
              <div />
            </div>

            <div style={{ marginTop: 18, fontWeight: 800 }}>Rotate / Scale</div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 10,
                marginTop: 10,
              }}
            >
              <button style={controlBtn} onClick={() => rotateSelected(-0.2)}>Rotate −</button>
              <button style={controlBtn} onClick={() => rotateSelected(0.2)}>Rotate +</button>
              <button style={controlBtn} onClick={() => scaleSelected(-0.05)}>Scale −</button>
              <button style={controlBtn} onClick={() => scaleSelected(0.05)}>Scale +</button>
            </div>

            <div style={{ marginTop: 18, fontWeight: 800 }}>Actions</div>
            <div style={{ display: "grid", gap: 10, marginTop: 10 }}>
              <button style={controlBtn} onClick={selectMainTent}>Select Main Tent</button>
              <button style={dangerBtn} onClick={removeSelected}>Remove Selected</button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

const controlBtn: React.CSSProperties = {
  borderRadius: 14,
  border: "1px solid rgba(151, 237, 255, 0.22)",
  background: "rgba(255,255,255,0.06)",
  color: "#f0fbff",
  padding: "12px 14px",
  fontWeight: 800,
  cursor: "pointer",
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
EXHIBIT_LIBRARY.forEach((asset) => useGLTF.preload(asset.model));
INVENTORY_LIBRARY.forEach((asset) => useGLTF.preload(asset.model));
