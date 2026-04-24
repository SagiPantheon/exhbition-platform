"use client";

import { Suspense, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Grid, OrbitControls, PerspectiveCamera, useGLTF } from "@react-three/drei";
import * as THREE from "three";

type LibraryCategory = "exhibits" | "inventory";
type ScenePresetId = "premium" | "space" | "air" | "vip";

type SceneAsset = {
  id: string;
  label: string;
  category: LibraryCategory;
  model: string;
  preview: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
};

const EXHIBIT_LIBRARY: Omit<SceneAsset, "id" | "position" | "rotation" | "scale">[] = [
  {
    label: "OPTSAT 500",
    category: "exhibits",
    model: "/models/space/optsat-500-showcase-3d.glb",
    preview: "/images/space/optsat-500-showcase.png",
  },
  {
    label: "OPTSAR 550",
    category: "exhibits",
    model: "/models/space/optsar-550-showcase-3d.glb",
    preview: "/images/space/optsar-550-showcase.png",
  },
  {
    label: "MCS",
    category: "exhibits",
    model: "/models/space/mcs-showcase-3d.glb",
    preview: "/images/space/mcs-showcase.png",
  },
  {
    label: "Arrow 3 Launcher",
    category: "exhibits",
    model: "/models/air/arrow-3-launcher.glb",
    preview: "/images/air/arrow-3-launcher-showcase.png",
  },
  {
    label: "LORA",
    category: "exhibits",
    model: "/models/air/lora-showcase-3d.glb",
    preview: "/images/air/lora-showcase.png",
  },
];

const INVENTORY_LIBRARY: Omit<SceneAsset, "id" | "position" | "rotation" | "scale">[] = [
  {
    label: "IAI Flag Pair",
    category: "inventory",
    model: "/models/inventory/flag-pair-iai-israel-01.glb",
    preview: "/inventory/flag-pair-iai-israel-01.png",
  },
  {
    label: "IAI Logo",
    category: "inventory",
    model: "/models/inventory/blue+logo+3d+model.glb",
    preview: "/inventory/logo-iai-large-2m-01.png",
  },
  {
    label: "Horizontal Lightbox",
    category: "inventory",
    model: "/models/inventory/lightbox-horizontal-iai-01.glb",
    preview: "/inventory/lightbox-horizontal-multidomain-01.jpeg",
  },
  {
    label: "Vertical Lightbox",
    category: "inventory",
    model: "/models/inventory/lightbox-vertical-iai-01.glb",
    preview: "/inventory/lightbox-vertical-multidomain-01.jpeg",
  },
  {
    label: "Blue Dome Tent",
    category: "inventory",
    model: "/models/inventory/inflatable-tent-iai-blue-01.glb",
    preview: "/inventory/tent-dome-iai-blue-01.png",
  },
];

const INITIAL_ITEMS: SceneAsset[] = [
  {
    id: "main-tent",
    label: "Main Exhibition Tent",
    category: "inventory",
    model: "/models/inventory/event+tent+3d+model.glb",
    preview: "/inventory/tent-30x20-white-01.png",
    position: [0, 0.02, 0],
    rotation: [0, 0, 0],
    scale: 1.0,
  },
  {
    id: "flag-pair-start",
    label: "IAI Flag Pair",
    category: "inventory",
    model: "/models/inventory/flag-pair-iai-israel-01.glb",
    preview: "/inventory/flag-pair-iai-israel-01.png",
    position: [-10, 0.02, 6.6],
    rotation: [0, 0.35, 0],
    scale: 0.9,
  },
  {
    id: "lightbox-start",
    label: "Horizontal Lightbox",
    category: "inventory",
    model: "/models/inventory/lightbox-horizontal-iai-01.glb",
    preview: "/inventory/lightbox-horizontal-multidomain-01.jpeg",
    position: [9.4, 0.02, 5.8],
    rotation: [0, -0.35, 0],
    scale: 0.9,
  },
  {
    id: "optsat-start",
    label: "OPTSAT 500",
    category: "exhibits",
    model: "/models/space/optsat-500-showcase-3d.glb",
    preview: "/images/space/optsat-500-showcase.png",
    position: [-5.2, 0.02, 5.2],
    rotation: [0, 0.1, 0],
    scale: 0.8,
  },
  {
    id: "launcher-start",
    label: "Arrow 3 Launcher",
    category: "exhibits",
    model: "/models/air/arrow-3-launcher.glb",
    preview: "/images/air/arrow-3-launcher-showcase.png",
    position: [6.3, 0.02, -4.2],
    rotation: [0, -0.5, 0],
    scale: 0.72,
  },
];


function buildPreset(preset: ScenePresetId): SceneAsset[] {
  const baseTent: SceneAsset = {
    id: "main-tent",
    label: "Main Exhibition Tent",
    category: "inventory",
    model: "/models/inventory/event+tent+3d+model.glb",
    preview: "/inventory/tent-30x20-white-01.png",
    position: [0, 0.02, 0],
    rotation: [0, 0, 0],
    scale: 1.08,
  };

  if (preset === "space") {
    return [
      baseTent,
      {
        id: "optsat-preset",
        label: "OPTSAT 500",
        category: "exhibits",
        model: "/models/space/optsat-500-showcase-3d.glb",
        preview: "/images/space/optsat-500-showcase.png",
        position: [-7.2, 0.02, 5.2],
        rotation: [0, 0.2, 0],
        scale: 0.95,
      },
      {
        id: "optsar-preset",
        label: "OPTSAR 550",
        category: "exhibits",
        model: "/models/space/optsar-550-showcase-3d.glb",
        preview: "/images/space/optsar-550-showcase.png",
        position: [0, 0.02, 6.2],
        rotation: [0, 0, 0],
        scale: 0.95,
      },
      {
        id: "mcs-preset",
        label: "MCS",
        category: "exhibits",
        model: "/models/space/mcs-showcase-3d.glb",
        preview: "/images/space/mcs-showcase.png",
        position: [7.3, 0.02, 5.0],
        rotation: [0, -0.25, 0],
        scale: 0.9,
      },
      {
        id: "flag-space-preset",
        label: "IAI Flag Pair",
        category: "inventory",
        model: "/models/inventory/flag-pair-iai-israel-01.glb",
        preview: "/inventory/flag-pair-iai-israel-01.png",
        position: [-12.5, 0.02, -7.2],
        rotation: [0, 0.5, 0],
        scale: 0.9,
      },
      {
        id: "lightbox-space-preset",
        label: "Vertical Lightbox",
        category: "inventory",
        model: "/models/inventory/lightbox-vertical-iai-01.glb",
        preview: "/inventory/lightbox-vertical-multidomain-01.jpeg",
        position: [12.2, 0.02, -7.0],
        rotation: [0, -0.5, 0],
        scale: 0.9,
      },
    ];
  }

  if (preset === "air") {
    return [
      baseTent,
      {
        id: "launcher-air-preset",
        label: "Arrow 3 Launcher",
        category: "exhibits",
        model: "/models/air/arrow-3-launcher.glb",
        preview: "/images/air/arrow-3-launcher-showcase.png",
        position: [6.8, 0.02, -4.7],
        rotation: [0, -0.55, 0],
        scale: 0.86,
      },
      {
        id: "lora-air-preset",
        label: "LORA",
        category: "exhibits",
        model: "/models/air/lora-showcase-3d.glb",
        preview: "/images/air/lora-showcase.png",
        position: [-6.8, 0.02, -4.8],
        rotation: [0, 0.55, 0],
        scale: 0.86,
      },
      {
        id: "mmr-air-preset",
        label: "MMR Radar",
        category: "exhibits",
        model: "/models/air/mmr-showcase-3d.glb",
        preview: "/images/air/mmr-showcase.png",
        position: [0, 0.02, 6.1],
        rotation: [0, 0, 0],
        scale: 0.8,
      },
      {
        id: "flag-air-preset",
        label: "IAI Flag Pair",
        category: "inventory",
        model: "/models/inventory/flag-pair-iai-israel-01.glb",
        preview: "/inventory/flag-pair-iai-israel-01.png",
        position: [-12.4, 0.02, 6.8],
        rotation: [0, 0.45, 0],
        scale: 0.9,
      },
      {
        id: "lightbox-air-preset",
        label: "Horizontal Lightbox",
        category: "inventory",
        model: "/models/inventory/lightbox-horizontal-iai-01.glb",
        preview: "/inventory/lightbox-horizontal-multidomain-01.jpeg",
        position: [12.1, 0.02, 6.6],
        rotation: [0, -0.45, 0],
        scale: 0.9,
      },
    ];
  }

  if (preset === "vip") {
    return [
      baseTent,
      {
        id: "logo-vip-preset",
        label: "IAI Logo",
        category: "inventory",
        model: "/models/inventory/blue+logo+3d+model.glb",
        preview: "/inventory/logo-iai-large-2m-01.png",
        position: [0, 0.02, 7.0],
        rotation: [0, 0, 0],
        scale: 1.1,
      },
      {
        id: "flag-vip-left",
        label: "IAI Flag Pair",
        category: "inventory",
        model: "/models/inventory/flag-pair-iai-israel-01.glb",
        preview: "/inventory/flag-pair-iai-israel-01.png",
        position: [-11.8, 0.02, 6.6],
        rotation: [0, 0.55, 0],
        scale: 0.95,
      },
      {
        id: "flag-vip-right",
        label: "IAI Flag Pair",
        category: "inventory",
        model: "/models/inventory/flag-pair-iai-israel-01.glb",
        preview: "/inventory/flag-pair-iai-israel-01.png",
        position: [11.8, 0.02, 6.6],
        rotation: [0, -0.55, 0],
        scale: 0.95,
      },
      {
        id: "lightbox-vip-left",
        label: "Vertical Lightbox",
        category: "inventory",
        model: "/models/inventory/lightbox-vertical-iai-01.glb",
        preview: "/inventory/lightbox-vertical-multidomain-01.jpeg",
        position: [-8.8, 0.02, -6.8],
        rotation: [0, 0.35, 0],
        scale: 0.9,
      },
      {
        id: "lightbox-vip-right",
        label: "Vertical Lightbox",
        category: "inventory",
        model: "/models/inventory/lightbox-vertical-iai-01.glb",
        preview: "/inventory/lightbox-vertical-multidomain-01.jpeg",
        position: [8.8, 0.02, -6.8],
        rotation: [0, -0.35, 0],
        scale: 0.9,
      },
    ];
  }

  return [
    baseTent,
    {
      id: "flag-pair-start",
      label: "IAI Flag Pair",
      category: "inventory",
      model: "/models/inventory/flag-pair-iai-israel-01.glb",
      preview: "/inventory/flag-pair-iai-israel-01.png",
      position: [-11.8, 0.02, 6.7],
      rotation: [0, 0.35, 0],
      scale: 0.95,
    },
    {
      id: "lightbox-start",
      label: "Horizontal Lightbox",
      category: "inventory",
      model: "/models/inventory/lightbox-horizontal-iai-01.glb",
      preview: "/inventory/lightbox-horizontal-multidomain-01.jpeg",
      position: [11.4, 0.02, 6.4],
      rotation: [0, -0.35, 0],
      scale: 0.95,
    },
    {
      id: "optsat-start",
      label: "OPTSAT 500",
      category: "exhibits",
      model: "/models/space/optsat-500-showcase-3d.glb",
      preview: "/images/space/optsat-500-showcase.png",
      position: [-5.4, 0.02, 5.6],
      rotation: [0, 0.1, 0],
      scale: 0.9,
    },
    {
      id: "launcher-start",
      label: "Arrow 3 Launcher",
      category: "exhibits",
      model: "/models/air/arrow-3-launcher.glb",
      preview: "/images/air/arrow-3-launcher-showcase.png",
      position: [6.4, 0.02, -4.5],
      rotation: [0, -0.5, 0],
      scale: 0.84,
    },
  ];
}

function makeId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function ModelAsset({
  item,
  selected,
  onSelect,
}: {
  item: SceneAsset;
  selected: boolean;
  onSelect: (id: string) => void;
}) {
  const gltf = useGLTF(item.model);
  const scene = useMemo(() => gltf.scene.clone(true), [gltf.scene]);

  return (
    <group
      position={item.position}
      rotation={item.rotation}
      scale={[item.scale, item.scale, item.scale]}
      onClick={(event) => {
        event.stopPropagation();
        onSelect(item.id);
      }}
    >
      <primitive object={scene} />

      {selected ? (
        <group position={[0, 0.05, 0]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[1.25, 1.55, 80]} />
            <meshBasicMaterial color="#7ee8ff" transparent opacity={0.78} />
          </mesh>
          <pointLight position={[0, 1.8, 0]} intensity={1.8} distance={5} color="#7ee8ff" />
        </group>
      ) : null}
    </group>
  );
}

function FloorSystem() {
  const width = 34;
  const depth = 23;

  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[width + 18, depth + 18]} />
        <meshStandardMaterial
          color="#091324"
          emissive="#102142"
          emissiveIntensity={0.2}
          roughness={1}
        />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[width, depth]} />
        <meshStandardMaterial
          color="#0f49f2"
          emissive="#245dff"
          emissiveIntensity={0.34}
          roughness={0.76}
          metalness={0.04}
        />
      </mesh>

      <Grid
        args={[width, depth]}
        cellSize={1.15}
        cellThickness={0.5}
        sectionSize={4.6}
        sectionThickness={1.05}
        cellColor="#69a9ff"
        sectionColor="#d9f8ff"
        infiniteGrid={false}
        fadeDistance={0}
        fadeStrength={0}
        position={[0, 0.035, 0]}
      />

      <NeonFrame width={width} depth={depth} />
    </>
  );
}

function NeonFrame({ width, depth }: { width: number; depth: number }) {
  const y = 0.12;
  const t = 0.14;

  const material = (
    <meshStandardMaterial
      color="#ffffff"
      emissive="#65e8ff"
      emissiveIntensity={5.6}
      roughness={0.18}
      metalness={0.4}
    />
  );

  return (
    <>
      <mesh position={[0, y, -depth / 2]}>
        <boxGeometry args={[width, t, t]} />
        {material}
      </mesh>
      <mesh position={[0, y, depth / 2]}>
        <boxGeometry args={[width, t, t]} />
        {material}
      </mesh>
      <mesh position={[-width / 2, y, 0]}>
        <boxGeometry args={[t, t, depth]} />
        {material}
      </mesh>
      <mesh position={[width / 2, y, 0]}>
        <boxGeometry args={[t, t, depth]} />
        {material}
      </mesh>
    </>
  );
}

function SpotLightFixture({
  position,
  rotation,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
}) {
  return (
    <group position={position} rotation={rotation}>
      <mesh castShadow>
        <cylinderGeometry args={[0.24, 0.32, 0.7, 24]} />
        <meshStandardMaterial color="#dcecff" emissive="#7ddfff" emissiveIntensity={0.7} />
      </mesh>

      <mesh position={[0, -0.65, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.95, 2.4, 32, 1, true]} />
        <meshBasicMaterial color="#83eaff" transparent opacity={0.13} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function CornerLighting() {
  return (
    <>
      <spotLight position={[-15, 8, -10]} angle={0.42} penumbra={0.9} intensity={16} distance={52} color="#e9fbff" castShadow />
      <spotLight position={[15, 8, -10]} angle={0.42} penumbra={0.9} intensity={16} distance={52} color="#e9fbff" castShadow />
      <spotLight position={[-15, 8, 10]} angle={0.42} penumbra={0.9} intensity={16} distance={52} color="#e9fbff" castShadow />
      <spotLight position={[15, 8, 10]} angle={0.42} penumbra={0.9} intensity={16} distance={52} color="#e9fbff" castShadow />

      <SpotLightFixture position={[-15.3, 1.0, -10.2]} rotation={[0.6, 0, -0.45]} />
      <SpotLightFixture position={[15.3, 1.0, -10.2]} rotation={[0.6, 0, 0.45]} />
      <SpotLightFixture position={[-15.3, 1.0, 10.2]} rotation={[-0.6, 0, -0.45]} />
      <SpotLightFixture position={[15.3, 1.0, 10.2]} rotation={[-0.6, 0, 0.45]} />
    </>
  );
}

function SceneBackground() {
  return (
    <>
      <mesh position={[0, 7.5, -17.5]}>
        <planeGeometry args={[54, 22]} />
        <meshStandardMaterial color="#0a1830" emissive="#112c5a" emissiveIntensity={0.22} roughness={1} />
      </mesh>
      <mesh position={[-18.5, 7.5, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[36, 22]} />
        <meshStandardMaterial color="#081528" emissive="#10234a" emissiveIntensity={0.12} roughness={1} />
      </mesh>
      <mesh position={[18.5, 7.5, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[36, 22]} />
        <meshStandardMaterial color="#081528" emissive="#10234a" emissiveIntensity={0.12} roughness={1} />
      </mesh>
    </>
  );
}

function ShowcaseScene({
  items,
  selectedId,
  onSelect,
}: {
  items: SceneAsset[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <Canvas shadows dpr={[1, 1.35]} gl={{ antialias: true }}>
      <PerspectiveCamera makeDefault position={[18, 8.2, 19]} fov={36} />
      <color attach="background" args={["#0b1730"]} />
      <fog attach="fog" args={["#0b1730", 42, 100]} />

      <ambientLight intensity={0.9} />
      <directionalLight
        position={[10, 18, 12]}
        intensity={1.35}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[0, 7.5, 0]} intensity={2.2} distance={50} color="#7dbdff" />

      <SceneBackground />
      <FloorSystem />
      <CornerLighting />

      <Suspense fallback={null}>
        {items.map((item) => (
          <ModelAsset
            key={item.id}
            item={item}
            selected={selectedId === item.id}
            onSelect={onSelect}
          />
        ))}
      </Suspense>

      <OrbitControls
        makeDefault
        enablePan
        panSpeed={0.85}
        zoomSpeed={0.88}
        rotateSpeed={0.78}
        minDistance={6}
        maxDistance={52}
        minPolarAngle={0.18}
        maxPolarAngle={1.56}
        target={[0, 0.9, 0]}
      />
    </Canvas>
  );
}

function LibraryCard({
  asset,
  onAdd,
}: {
  asset: Omit<SceneAsset, "id" | "position" | "rotation" | "scale">;
  onAdd: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onAdd}
      className="group overflow-hidden rounded-[18px] border border-white/10 bg-white/[0.04] text-left transition hover:-translate-y-[1px] hover:border-cyan-300/28 hover:bg-cyan-300/[0.06]"
    >
      <div
        className="h-24 bg-cover bg-center"
        style={{ backgroundImage: `url(${asset.preview})` }}
      />
      <div className="p-3">
        <div className="text-sm font-semibold text-white">{asset.label}</div>
        <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-white/38">
          {asset.category}
        </div>
      </div>
    </button>
  );
}

function ControlButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2 text-sm text-white/85 transition hover:bg-cyan-300/[0.08]"
    >
      {children}
    </button>
  );
}

export default function LayoutShowcaseV3Page() {
  const [activePreset, setActivePreset] = useState<ScenePresetId>("premium");
  const [items, setItems] = useState<SceneAsset[]>(() => buildPreset("premium"));
  const [selectedId, setSelectedId] = useState<string | null>("main-tent");

  const selectedItem = useMemo(
    () => items.find((item) => item.id === selectedId) ?? null,
    [items, selectedId]
  );

  function applyPreset(preset: ScenePresetId) {
    setActivePreset(preset);
    setItems(buildPreset(preset));
    setSelectedId("main-tent");
  }

  function addAsset(asset: Omit<SceneAsset, "id" | "position" | "rotation" | "scale">) {
    const index = items.length;
    const angle = index * 0.72;
    const radius = asset.category === "exhibits" ? 6.5 : 9.2;

    const next: SceneAsset = {
      ...asset,
      id: makeId(asset.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")),
      position: [
        Number((Math.sin(angle) * radius).toFixed(2)),
        0.02,
        Number((Math.cos(angle) * radius).toFixed(2)),
      ],
      rotation: [0, -angle, 0],
      scale: asset.category === "exhibits" ? 0.75 : 0.85,
    };

    setItems((current) => [...current, next]);
    setSelectedId(next.id);
  }

  function patchSelected(update: (item: SceneAsset) => SceneAsset) {
    if (!selectedId) return;
    setItems((current) => current.map((item) => (item.id === selectedId ? update(item) : item)));
  }

  function moveSelected(dx: number, dz: number) {
    patchSelected((item) => ({
      ...item,
      position: [
        clamp(Number((item.position[0] + dx).toFixed(2)), -15.5, 15.5),
        item.position[1],
        clamp(Number((item.position[2] + dz).toFixed(2)), -10.2, 10.2),
      ],
    }));
  }

  function rotateSelected(delta: number) {
    patchSelected((item) => ({
      ...item,
      rotation: [item.rotation[0], Number((item.rotation[1] + delta).toFixed(2)), item.rotation[2]],
    }));
  }

  function scaleSelected(delta: number) {
    patchSelected((item) => ({
      ...item,
      scale: clamp(Number((item.scale + delta).toFixed(2)), 0.25, 2.6),
    }));
  }

  function removeSelected() {
    if (!selectedId || selectedId === "main-tent") return;
    setItems((current) => current.filter((item) => item.id !== selectedId));
    setSelectedId("main-tent");
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#0d1d36_0%,#050b16_52%,#03060d_100%)] text-white">
      <div className="mx-auto max-w-[1920px] px-4 pb-10 pt-4">
        <header className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-[22px] border border-cyan-300/10 bg-[#061020]/86 px-4 py-3 shadow-[0_20px_70px_rgba(0,0,0,0.32)]">
          <div>
            <div className="text-[10px] uppercase tracking-[0.35em] text-cyan-300/70">
              Exhibition Hub / Showcase V3
            </div>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight">
              Executive Layout Showcase
            </h1>
          </div>

          <div className="flex flex-wrap gap-2">
            <a
              href="/"
              className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-50"
            >
              Home
            </a>
            <a
              href="/layout-planning?t=tent-30x20"
              className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/75"
            >
              Layout Planning
            </a>
          </div>
        </header>

        <section className="rounded-[28px] border border-cyan-300/12 bg-[#061020]/90 p-4 shadow-[0_30px_110px_rgba(0,0,0,0.45)]">
          <div className="mb-4 grid gap-2 md:grid-cols-4">
            {[
              { id: "premium" as ScenePresetId, title: "Premium Tent", sub: "בסיס תצוגה מלא" },
              { id: "space" as ScenePresetId, title: "Space Showcase", sub: "לוויינים וחלל" },
              { id: "air" as ScenePresetId, title: "Air Defense", sub: "מערכות אוויריות" },
              { id: "vip" as ScenePresetId, title: "VIP Visit", sub: "מיתוג ואירוח" },
            ].map((preset) => {
              const active = activePreset === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => applyPreset(preset.id)}
                  className={[
                    "rounded-[18px] border px-4 py-3 text-left transition",
                    active
                      ? "border-cyan-300/38 bg-cyan-300/[0.12] shadow-[0_0_26px_rgba(34,211,238,0.18)]"
                      : "border-white/10 bg-white/[0.04] hover:border-cyan-300/24 hover:bg-cyan-300/[0.06]",
                  ].join(" ")}
                >
                  <div className="text-sm font-semibold text-white">{preset.title}</div>
                  <div className="mt-1 text-xs text-white/45">{preset.sub}</div>
                </button>
              );
            })}
          </div>

          <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="text-[11px] uppercase tracking-[0.35em] text-cyan-300/70">
                Main Scene
              </div>
              <h2 className="mt-1 text-3xl font-semibold">Tent Configuration Stage</h2>
              <p className="mt-1 text-sm text-white/52">
                Real GLB models • blue exhibition floor • elegant grid • neon frame • four corner spotlights
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs text-white/65">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2">
                Objects<br /><span className="text-lg font-semibold text-cyan-100">{items.length}</span>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2">
                Selected<br /><span className="text-lg font-semibold text-cyan-100">{selectedItem?.label ?? "None"}</span>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2">
                Mode<br /><span className="text-lg font-semibold text-cyan-100">V3</span>
              </div>
            </div>
          </div>

          <div className="h-[82vh] min-h-[760px] overflow-hidden rounded-[26px] border border-cyan-300/14 bg-[#081425]">
            <ShowcaseScene items={items} selectedId={selectedId} onSelect={setSelectedId} />
          </div>
        </section>

        <section className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="grid gap-4 lg:grid-cols-2">
            <section className="rounded-[24px] border border-fuchsia-300/14 bg-[#080f20]/88 p-4 shadow-[0_20px_70px_rgba(0,0,0,0.28)]">
              <div className="mb-3">
                <div className="text-[10px] uppercase tracking-[0.3em] text-fuchsia-300/70">
                  Exhibits
                </div>
                <h3 className="mt-1 text-xl font-semibold">Real 3D Exhibits</h3>
              </div>

              <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
                {EXHIBIT_LIBRARY.map((asset) => (
                  <LibraryCard
                    key={asset.label}
                    asset={asset}
                    onAdd={() => addAsset(asset)}
                  />
                ))}
              </div>
            </section>

            <section className="rounded-[24px] border border-cyan-300/14 bg-[#080f20]/88 p-4 shadow-[0_20px_70px_rgba(0,0,0,0.28)]">
              <div className="mb-3">
                <div className="text-[10px] uppercase tracking-[0.3em] text-cyan-300/70">
                  Inventory
                </div>
                <h3 className="mt-1 text-xl font-semibold">Real 3D Inventory</h3>
              </div>

              <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
                {INVENTORY_LIBRARY.map((asset) => (
                  <LibraryCard
                    key={asset.label}
                    asset={asset}
                    onAdd={() => addAsset(asset)}
                  />
                ))}
              </div>
            </section>
          </div>

          <aside className="rounded-[24px] border border-cyan-300/14 bg-[#080f20]/90 p-4 shadow-[0_20px_70px_rgba(0,0,0,0.28)]">
            <div className="text-[10px] uppercase tracking-[0.3em] text-cyan-300/70">
              Selected Object
            </div>

            <h3 className="mt-2 text-xl font-semibold">{selectedItem?.label ?? "No selection"}</h3>

            {selectedItem ? (
              <>
                <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                    <div className="text-[10px] text-white/40">X</div>
                    <div className="font-semibold">{selectedItem.position[0].toFixed(1)}</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                    <div className="text-[10px] text-white/40">Z</div>
                    <div className="font-semibold">{selectedItem.position[2].toFixed(1)}</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                    <div className="text-[10px] text-white/40">Scale</div>
                    <div className="font-semibold">{selectedItem.scale.toFixed(2)}</div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="text-sm font-semibold text-white/80">Move</div>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    <ControlButton onClick={() => moveSelected(-0.6, 0)}>←</ControlButton>
                    <ControlButton onClick={() => moveSelected(0, -0.6)}>↑</ControlButton>
                    <ControlButton onClick={() => moveSelected(0.6, 0)}>→</ControlButton>
                    <div />
                    <ControlButton onClick={() => moveSelected(0, 0.6)}>↓</ControlButton>
                    <div />
                  </div>
                </div>

                <div className="mt-4">
                  <div className="text-sm font-semibold text-white/80">Rotate / Scale</div>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <ControlButton onClick={() => rotateSelected(-0.18)}>Rotate −</ControlButton>
                    <ControlButton onClick={() => rotateSelected(0.18)}>Rotate +</ControlButton>
                    <ControlButton onClick={() => scaleSelected(-0.08)}>Scale −</ControlButton>
                    <ControlButton onClick={() => scaleSelected(0.08)}>Scale +</ControlButton>
                  </div>
                </div>

                <div className="mt-4 grid gap-2">
                  <ControlButton onClick={() => setSelectedId("main-tent")}>Select Main Tent</ControlButton>
                  <button
                    type="button"
                    disabled={selectedId === "main-tent"}
                    onClick={removeSelected}
                    className="rounded-xl border border-rose-300/20 bg-rose-300/8 px-3 py-2 text-sm text-rose-100 transition hover:bg-rose-300/14 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Remove Selected
                  </button>
                </div>
              </>
            ) : (
              <p className="mt-3 text-sm text-white/45">Click an object in the scene.</p>
            )}
          </aside>
        </section>
      </div>
    </main>
  );
}

EXHIBIT_LIBRARY.forEach((asset) => useGLTF.preload(asset.model));
INVENTORY_LIBRARY.forEach((asset) => useGLTF.preload(asset.model));
useGLTF.preload("/models/inventory/event+tent+3d+model.glb");
