"use client";

import { Canvas } from "@react-three/fiber";
import { Grid, OrbitControls, PerspectiveCamera, useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useRouter, useSearchParams } from "next/navigation";
import { layoutInventory, type LayoutInventoryType } from "../../data/layoutInventory";

type TemplateId = "tent-25x15" | "tent-30x20";
type ElementType = LayoutInventoryType;

type PlacedItem = {
  id: string;
  type: ElementType;
  label: string;
  x: number;
  z: number;
  rotation: number;
  scale: number;
};

const STORAGE_KEY = "layout-planning-3d-v1";
const SELECTED_TEMPLATE_KEY = "layout-planning-3d-template-v1";

const templates: Record<
  TemplateId,
  {
    id: TemplateId;
    title: string;
    subtitle: string;
    image: string;
    width: number;
    depth: number;
  }
> = {
  "tent-25x15": {
    id: "tent-25x15",
    title: "Tent 25×15",
    subtitle: "שדרת ביתן בינוני",
    image: "/inventory/tent-25x15-white-01.png",
    width: 25,
    depth: 15,
  },
  "tent-30x20": {
    id: "tent-30x20",
    title: "Tent 30×20",
    subtitle: "שדרת ביתן גדול",
    image: "/inventory/tent-30x20-white-01.png",
    width: 30,
    depth: 20,
  },
};


function makeId() {
  return Math.random().toString(36).slice(2, 10);
}

function getSpawnPosition(
  index: number,
  template: (typeof templates)[TemplateId]
) {
  const col = index % 4;
  const row = Math.floor(index / 4);
  const startX = -template.width / 2 + 3;
  const startZ = -template.depth / 2 + 3;
  return {
    x: startX + col * 3.2,
    z: startZ + row * 3.2,
  };
}

function clampToTent(
  x: number,
  z: number,
  template: (typeof templates)[TemplateId]
) {
  const outerMarginX = 8;
  const outerMarginZ = 8;
  const minX = -template.width / 2 - outerMarginX;
  const maxX = template.width / 2 + outerMarginX;
  const minZ = -template.depth / 2 - outerMarginZ;
  const maxZ = template.depth / 2 + outerMarginZ;

  return {
    x: Math.min(maxX, Math.max(minX, x)),
    z: Math.min(maxZ, Math.max(minZ, z)),
  };
}

function getElementHeight(type: ElementType) {
  switch (type) {
    case "flag":
      return 1.8;
    case "lightbox":
      return 1.5;
    case "backwall":
      return 1.4;
    case "signage":
      return 1.2;
    case "signstand":
      return 1.2;
    case "lectern":
      return 1.15;
    case "flagpair":
      return 1.8;
    case "chair":
      return 0.9;
    case "table":
      return 0.7;
    case "barrier":
      return 0.55;
    case "podium":
    default:
      return 0.9;
  }
}

function TentModel() {
  const gltf = useGLTF("/models/inventor/event+tent+3d+model.glb");

  return (
    <primitive
      object={gltf.scene.clone()}
      position={[0, 0, 0]}
      rotation={[0, Math.PI, 0]}
      scale={12}
    />
  );
}

function LogoMesh({
  item,
  selected,
  onPointerDown,
}: {
  item: PlacedItem;
  selected: boolean;
  onPointerDown: (id: string) => void;
}) {
  const gltf = useGLTF("/models/inventor/blue+logo+3d+model.glb");

  return (
    <group
      position={[item.x, 0, item.z]}
      rotation={[0, item.rotation, 0]}
      scale={item.scale ?? 1}
      scale={item.scale ?? 1}
      scale={item.scale ?? 1}
      scale={item.scale ?? 1}
      onPointerDown={(e) => {
        e.stopPropagation();
        onPointerDown(item.id);
      }}
    >
      <primitive object={gltf.scene.clone()} position={[0, 0.12, 0]} scale={1.38} />
      {selected ? (
        <mesh position={[0, 0.05, 0]}>
          <ringGeometry args={[1.2, 1.45, 32]} />
          <meshBasicMaterial color="#60a5fa" transparent opacity={0.8} />
        </mesh>
      ) : null}
    </group>
  );
}

function ElementMesh({
  item,
  selected,
  onPointerDown,
}: {
  item: PlacedItem;
  selected: boolean;
  onPointerDown: (id: string) => void;
}) {
  const wrapProps = {
    position: [item.x, 0, item.z] as [number, number, number],
    rotation: [0, item.rotation, 0] as [number, number, number],
    scale: item.scale ?? 1,
    onPointerDown: (e: any) => {
      e.stopPropagation();
      onPointerDown(item.id);
    },
  };

  if (item.type === "logo") {
    const gltf = useGLTF("/models/inventor/blue+logo+3d+model.glb");

    return (
      <group {...wrapProps}>
        <primitive object={gltf.scene.clone()} position={[0, 0.12, 0]} scale={1.38} />
        {selected ? (
          <mesh position={[0, 0.05, 0]}>
            <ringGeometry args={[1.2, 1.45, 32]} />
            <meshBasicMaterial color="#60a5fa" transparent opacity={0.8} />
          </mesh>
        ) : null}
      </group>
    );
  }

  if (item.type === "lectern") {
    return (
      <group {...wrapProps}>
        <mesh position={[0, 0.62, 0]}>
          <boxGeometry args={[0.55, 1.05, 0.42]} />
          <meshStandardMaterial color={selected ? "#93c5fd" : "#dbeafe"} />
        </mesh>
        <mesh position={[0, 1.16, -0.06]} rotation={[-0.22, 0, 0]}>
          <boxGeometry args={[0.58, 0.08, 0.34]} />
          <meshStandardMaterial color="#bfdbfe" />
        </mesh>
      </group>
    );
  }

  if (item.type === "chair") {
    return (
      <group {...wrapProps}>
        <mesh position={[0, 0.48, 0]}>
          <boxGeometry args={[0.52, 0.08, 0.52]} />
          <meshStandardMaterial color={selected ? "#fca5a5" : "#e5e7eb"} />
        </mesh>
        <mesh position={[0, 0.86, -0.2]}>
          <boxGeometry args={[0.52, 0.64, 0.08]} />
          <meshStandardMaterial color={selected ? "#fca5a5" : "#e5e7eb"} />
        </mesh>
        <mesh position={[-0.2, 0.22, -0.2]}>
          <cylinderGeometry args={[0.02, 0.02, 0.44, 8]} />
          <meshStandardMaterial color="#cbd5e1" />
        </mesh>
        <mesh position={[0.2, 0.22, -0.2]}>
          <cylinderGeometry args={[0.02, 0.02, 0.44, 8]} />
          <meshStandardMaterial color="#cbd5e1" />
        </mesh>
        <mesh position={[-0.2, 0.22, 0.2]}>
          <cylinderGeometry args={[0.02, 0.02, 0.44, 8]} />
          <meshStandardMaterial color="#cbd5e1" />
        </mesh>
        <mesh position={[0.2, 0.22, 0.2]}>
          <cylinderGeometry args={[0.02, 0.02, 0.44, 8]} />
          <meshStandardMaterial color="#cbd5e1" />
        </mesh>
      </group>
    );
  }

  if (item.type === "signstand") {
    return (
      <group {...wrapProps}>
        <mesh position={[0, 1.05, 0]}>
          <boxGeometry args={[0.42, 0.58, 0.04]} />
          <meshStandardMaterial color={selected ? "#7dd3fc" : "#e2e8f0"} />
        </mesh>
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 1, 8]} />
          <meshStandardMaterial color="#cbd5e1" />
        </mesh>
        <mesh position={[0, 0.04, 0]}>
          <cylinderGeometry args={[0.24, 0.24, 0.08, 16]} />
          <meshStandardMaterial color="#94a3b8" />
        </mesh>
      </group>
    );
  }

  if (item.type === "flagpair") {
    return (
      <group {...wrapProps}>
        <mesh position={[-0.26, 0.9, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 1.8, 10]} />
          <meshStandardMaterial color="#e5e7eb" />
        </mesh>
        <mesh position={[0.26, 0.9, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 1.8, 10]} />
          <meshStandardMaterial color="#e5e7eb" />
        </mesh>
        <mesh position={[0.05, 1.35, 0]}>
          <boxGeometry args={[0.48, 0.32, 0.03]} />
          <meshStandardMaterial color={selected ? "#60a5fa" : "#2563eb"} />
        </mesh>
        <mesh position={[-0.47, 1.35, 0]}>
          <boxGeometry args={[0.48, 0.32, 0.03]} />
          <meshStandardMaterial color={selected ? "#93c5fd" : "#ffffff"} />
        </mesh>
        <mesh position={[0, 0.04, 0]}>
          <boxGeometry args={[0.86, 0.06, 0.26]} />
          <meshStandardMaterial color="#94a3b8" />
        </mesh>
      </group>
    );
  }

  if (item.type === "podium") {
    return (
      <group {...wrapProps}>
        <mesh position={[0, 0.42, 0]}>
          <boxGeometry args={[0.9, 0.84, 0.9]} />
          <meshStandardMaterial color={selected ? "#7dd3fc" : "#5eead4"} />
        </mesh>
        <mesh position={[0, 0.86, 0]}>
          <boxGeometry args={[1.05, 0.08, 1.05]} />
          <meshStandardMaterial color="#dbeafe" />
        </mesh>
      </group>
    );
  }

  if (item.type === "flag") {
    return (
      <group {...wrapProps}>
        <mesh position={[0, 0.9, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 1.8, 10]} />
          <meshStandardMaterial color="#e5e7eb" />
        </mesh>
        <mesh position={[0.32, 1.35, 0]}>
          <boxGeometry args={[0.58, 0.34, 0.03]} />
          <meshStandardMaterial color={selected ? "#60a5fa" : "#3b82f6"} />
        </mesh>
        <mesh position={[0, 0.05, 0]}>
          <cylinderGeometry args={[0.24, 0.24, 0.08, 20]} />
          <meshStandardMaterial color="#94a3b8" />
        </mesh>
      </group>
    );
  }

  if (item.type === "lightbox") {
    return (
      <group {...wrapProps}>
        <mesh position={[0, 0.75, 0]}>
          <boxGeometry args={[0.7, 1.5, 0.28]} />
          <meshStandardMaterial
            emissive="#fde68a"
            emissiveIntensity={selected ? 0.65 : 0.35}
            color="#fef3c7"
          />
        </mesh>
      </group>
    );
  }

  if (item.type === "backwall") {
    return (
      <group {...wrapProps}>
        <mesh position={[0, 1.4, 0]}>
          <boxGeometry args={[3.2, 2.8, 0.12]} />
          <meshStandardMaterial color={selected ? "#c084fc" : "#a855f7"} />
        </mesh>
      </group>
    );
  }

  if (item.type === "table") {
    return (
      <group {...wrapProps}>
        <mesh position={[0, 0.72, 0]}>
          <boxGeometry args={[1.8, 0.08, 0.75]} />
          <meshStandardMaterial color={selected ? "#f8fafc" : "#cbd5e1"} />
        </mesh>
        <mesh position={[-0.7, 0.34, -0.24]}>
          <cylinderGeometry args={[0.03, 0.03, 0.68, 8]} />
          <meshStandardMaterial color="#e5e7eb" />
        </mesh>
        <mesh position={[0.7, 0.34, -0.24]}>
          <cylinderGeometry args={[0.03, 0.03, 0.68, 8]} />
          <meshStandardMaterial color="#e5e7eb" />
        </mesh>
        <mesh position={[-0.7, 0.34, 0.24]}>
          <cylinderGeometry args={[0.03, 0.03, 0.68, 8]} />
          <meshStandardMaterial color="#e5e7eb" />
        </mesh>
        <mesh position={[0.7, 0.34, 0.24]}>
          <cylinderGeometry args={[0.03, 0.03, 0.68, 8]} />
          <meshStandardMaterial color="#e5e7eb" />
        </mesh>
      </group>
    );
  }

  if (item.type === "signage") {
    return (
      <group {...wrapProps}>
        <mesh position={[0, 1.1, 0]}>
          <boxGeometry args={[0.5, 0.8, 0.05]} />
          <meshStandardMaterial color={selected ? "#7dd3fc" : "#38bdf8"} />
        </mesh>
        <mesh position={[0, 0.45, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 0.9, 8]} />
          <meshStandardMaterial color="#e5e7eb" />
        </mesh>
        <mesh position={[0, 0.04, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.08, 16]} />
          <meshStandardMaterial color="#94a3b8" />
        </mesh>
      </group>
    );
  }

  return (
    <group {...wrapProps}>
      <mesh position={[0, 0.55, 0]}>
        <boxGeometry args={[1.2, 0.12, 0.18]} />
        <meshStandardMaterial color={selected ? "#fb7185" : "#f43f5e"} />
      </mesh>
      <mesh position={[-0.52, 0.28, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.56, 8]} />
        <meshStandardMaterial color="#e5e7eb" />
      </mesh>
      <mesh position={[0.52, 0.28, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.56, 8]} />
        <meshStandardMaterial color="#e5e7eb" />
      </mesh>
    </group>
  );
}

function TentScene({
  template,
  items,
  selectedItemId,
  setSelectedItemId,
  setItems,
  hasCarpet,
}: {
  template: (typeof templates)[TemplateId];
  items: PlacedItem[];
  selectedItemId: string | null;
  setSelectedItemId: (id: string | null) => void;
  setItems: React.Dispatch<React.SetStateAction<PlacedItem[]>>;
  hasCarpet: boolean;
}) {
  const dragPlane = useMemo(
    () => new THREE.Plane(new THREE.Vector3(0, 1, 0), 0),
    []
  );
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const pointer = useMemo(() => new THREE.Vector2(), []);
  const draggingIdRef = useRef<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  function updateDraggedPosition(clientX: number, clientY: number) {
    const canvas = document.querySelector("canvas");
    if (!canvas || !draggingIdRef.current) return;

    const rect = canvas.getBoundingClientRect();
    pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1;

    const camera = (canvas as any).__r3f?.root?.getState?.().camera;
    const scene = (canvas as any).__r3f?.root?.getState?.().scene;
    if (!camera || !scene) return;

    raycaster.setFromCamera(pointer, camera);
    const point = new THREE.Vector3();
    raycaster.ray.intersectPlane(dragPlane, point);

    const next = clampToTent(point.x, point.z, template);

    setItems((prev) =>
      prev.map((item) =>
        item.id === draggingIdRef.current
          ? { ...item, x: next.x, z: next.z }
          : item
      )
    );
  }

  useEffect(() => {
    function onMove(e: PointerEvent) {
      updateDraggedPosition(e.clientX, e.clientY);
    }
    function onUp() {
      draggingIdRef.current = null;
      setIsDragging(false);
    }

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [template, setItems, dragPlane, raycaster, pointer]);

  return (
    <Canvas
      shadows
      gl={{ antialias: true }}
      onPointerMissed={() => setSelectedItemId(null)}
      className="h-full w-full"
      onCreated={(state) => {
        (state.gl.domElement as any).__r3f = { root: { getState: () => state } };
      }}
    >
      <PerspectiveCamera makeDefault position={[0, 2.2, 4.8]} fov={60} />
      <color attach="background" args={["#08111d"]} />

      <ambientLight intensity={1.15} />
      <directionalLight
        position={[10, 18, 8]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[template.width + 18, template.depth + 18]} />
        <meshStandardMaterial color="#c9ced6" />
      </mesh>

      {hasCarpet ? (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]} receiveShadow>
          <planeGeometry args={[template.width - 0.8, template.depth - 0.8]} />
          <meshStandardMaterial color="#0d47c7" />
        </mesh>
      ) : null}

      <Suspense fallback={null}>
        <group position={[0, 0.02, 0]}>
          <TentModel />
        </group>
      </Suspense>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <ringGeometry args={[0.1, Math.max(template.width, template.depth), 64]} />
        <meshBasicMaterial color="#0a1b2d" />
      </mesh>

      <Grid
        args={[template.width + 18, template.depth + 18]}
        cellSize={1}
        cellThickness={0.6}
        sectionSize={5}
        sectionThickness={1.1}
        infiniteGrid={false}
        fadeDistance={0}
        fadeStrength={0}
        position={[0, 0.02, 0]}
      />


      <Suspense fallback={null}>
        {items.map((item) => (
          <group
            key={item.id}
            onPointerDown={(e) => {
              e.stopPropagation();
              draggingIdRef.current = item.id;
              setSelectedItemId(item.id);
              setIsDragging(true);
            }}
          >
            <ElementMesh
              item={item}
              selected={selectedItemId === item.id}
              onPointerDown={(id) => {
                draggingIdRef.current = id;
                setSelectedItemId(id);
                setIsDragging(true);
              }}
            />
          </group>
        ))}
      </Suspense>

      <OrbitControls
        makeDefault
        enabled={!isDragging}
        enablePan
        panSpeed={0.9}
        zoomSpeed={0.9}
        rotateSpeed={0.75}
        maxPolarAngle={Math.PI / 1.72}
        minPolarAngle={0.2}
        minDistance={0.8}
        maxDistance={18}
        target={[0, 1.1, 0]}
      />
    </Canvas>
  );
}

useGLTF.preload("/models/inventor/event+tent+3d+model.glb");
useGLTF.preload("/models/inventor/blue+logo+3d+model.glb");

export default function LayoutPlanningPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const urlTemplate = searchParams.get("t");
  const initialTemplate: TemplateId =
    urlTemplate === "tent-30x20" || urlTemplate === "tent-25x15"
      ? urlTemplate
      : ((typeof window !== "undefined" &&
          (window.localStorage.getItem(SELECTED_TEMPLATE_KEY) as TemplateId)) ||
          "tent-25x15");

  const [selectedTemplate, setSelectedTemplate] =
    useState<TemplateId>(initialTemplate);

  const [items, setItems] = useState<PlacedItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];

      return parsed.map((item) => ({
        ...item,
        scale: typeof item.scale === "number" ? item.scale : 1,
      }));
    } catch {
      return [];
    }
  });

  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [hasCarpet, setHasCarpet] = useState(false);

  useEffect(() => {
    if (urlTemplate === "tent-25x15" || urlTemplate === "tent-30x20") {
      setSelectedTemplate(urlTemplate);
    }
  }, [urlTemplate]);

  useEffect(() => {
    const current = searchParams.get("t");
    if (current !== selectedTemplate) {
      router.replace(`/layout-planning?t=${selectedTemplate}`);
    }
  }, [router, searchParams, selectedTemplate]);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    window.localStorage.setItem(SELECTED_TEMPLATE_KEY, selectedTemplate);
  }, [selectedTemplate]);

  const currentTemplate = templates[selectedTemplate];

  function addElement(type: ElementType, label: string) {
    setItems((prev) => {
      const spawn = getSpawnPosition(prev.length, currentTemplate);
      return [
        ...prev,
        {
          id: makeId(),
          type,
          label,
          x: spawn.x,
          z: spawn.z,
          rotation: 0,
          scale: 1,
          scale: 1,
        },
      ];
    });
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((item) => item.id !== id));
    if (selectedItemId === id) setSelectedItemId(null);
  }

  function rotateSelected() {
    if (!selectedItemId) return;
    setItems((prev) =>
      prev.map((item) =>
        item.id === selectedItemId
          ? { ...item, rotation: item.rotation + Math.PI / 18 }
          : item
      )
    );
  }

  function rotateSelectedBack() {
    if (!selectedItemId) return;
    setItems((prev) =>
      prev.map((item) =>
        item.id === selectedItemId
          ? { ...item, rotation: item.rotation - Math.PI / 18 }
          : item
      )
    );
  }

  function scaleSelected(multiplier: number) {
    if (!selectedItemId) return;
    setItems((prev) =>
      prev.map((item) =>
        item.id === selectedItemId
          ? {
              ...item,
              scale: Math.max(0.35, Math.min(3, Number(((item.scale ?? 1) * multiplier).toFixed(2)))),
            }
          : item
      )
    );
  }

  function clearWorkspace() {
    setItems([]);
    setSelectedItemId(null);
  }

  const selectedItem =
    items.find((item) => item.id === selectedItemId) ?? null;

  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <div className="mx-auto max-w-[1680px] px-4 py-6 md:px-6 xl:px-8">
        <div className="mb-6 flex flex-col gap-4 rounded-[28px] border border-white/10 bg-white/[0.03] p-5 shadow-[0_20px_80px_rgba(0,0,0,0.28)] backdrop-blur-sm">
          <div className="flex flex-col gap-2 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <div className="text-[11px] uppercase tracking-[0.35em] text-cyan-300/70">
                Layout Planning 3D
              </div>
              <h1 className="mt-2 text-2xl font-semibold md:text-3xl">
                סביבת תכנון תלת-ממדית לאוהל
              </h1>
              <p className="mt-2 max-w-3xl text-sm text-white/60">
                בחירת אוהל למעלה, ספריית אלמנטים אמיתיים בצד ימין, ועבודה ישירה בתוך
                חלל התצוגה עצמו. לחיצה על אלמנט מוסיפה אותו אוטומטית לסצנה, ואז אפשר
                לגרור אותו על הרצפה.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 md:grid-cols-4">
              <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                <div className="text-[11px] uppercase tracking-[0.25em] text-white/35">
                  Template
                </div>
                <div className="mt-1 text-lg font-semibold">
                  {currentTemplate.title}
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                <div className="text-[11px] uppercase tracking-[0.25em] text-white/35">
                  Width
                </div>
                <div className="mt-1 text-lg font-semibold">
                  {currentTemplate.width}m
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                <div className="text-[11px] uppercase tracking-[0.25em] text-white/35">
                  Depth
                </div>
                <div className="mt-1 text-lg font-semibold">
                  {currentTemplate.depth}m
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                <div className="text-[11px] uppercase tracking-[0.25em] text-white/35">
                  Placed
                </div>
                <div className="mt-1 text-lg font-semibold">{items.length}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6 grid gap-4 xl:grid-cols-2">
          {(Object.values(templates) as Array<(typeof templates)[TemplateId]>).map(
            (template) => {
              const isActive = template.id === selectedTemplate;
              return (
                <button
                  key={template.id}
                  type="button"
                  onClick={() => setSelectedTemplate(template.id)}
                  className={[
                    "group overflow-hidden rounded-[28px] border text-left transition",
                    isActive
                      ? "border-cyan-300/40 bg-cyan-300/[0.08] shadow-[0_0_0_1px_rgba(34,211,238,0.12),0_20px_70px_rgba(6,182,212,0.10)]"
                      : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]",
                  ].join(" ")}
                >
                  <div className="grid gap-4 p-4 md:grid-cols-[260px_1fr]">
                    <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/20">
                      <img
                        src={template.image}
                        alt={template.title}
                        className="h-[170px] w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col justify-between">
                      <div>
                        <div className="text-[11px] uppercase tracking-[0.3em] text-white/35">
                          Tent Template
                        </div>
                        <div className="mt-2 text-xl font-semibold">
                          {template.title}
                        </div>
                        <div className="mt-1 text-sm text-white/55">
                          {template.subtitle}
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2 text-xs text-white/70">
                          <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1">
                            {template.width}m width
                          </span>
                          <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1">
                            {template.depth}m depth
                          </span>
                          <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1">
                            3D workspace ready
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 inline-flex w-fit items-center rounded-full border border-white/10 bg-black/25 px-3 py-1.5 text-sm text-white/75">
                        {isActive ? "Selected template" : "Switch to this template"}
                      </div>
                    </div>
                  </div>
                </button>
              );
            }
          )}
        </div>

        <div className="grid gap-6 2xl:grid-cols-[minmax(0,1.65fr)_minmax(380px,0.85fr)]">
          <section className="rounded-[32px] border border-white/10 bg-white/[0.03] p-4 shadow-[0_20px_70px_rgba(0,0,0,0.25)] md:p-5">
            <div className="mb-4 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <div className="text-[11px] uppercase tracking-[0.3em] text-cyan-300/70">
                  3D Tent Workspace
                </div>
                <h2 className="mt-2 text-2xl font-semibold">
                  {currentTemplate.title}
                </h2>
                <p className="mt-2 text-sm text-white/55">
                  גרור אובייקטים על רצפת האוהל. הסצנה שומרת מיקומים אוטומטית.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => router.push("/inventory")}
                  className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 px-4 py-2.5 text-sm text-cyan-100 transition hover:bg-cyan-300/15"
                >
                  למעבר למחסן
                </button>
                <button
                  type="button"
                  onClick={() => scaleSelected(0.9)}
                  disabled={!selectedItem}
                  className="rounded-2xl border border-white/10 bg-black/20 px-4 py-2.5 text-sm text-white transition disabled:cursor-not-allowed disabled:opacity-40"
                >
                  הקטן פריט
                </button>
                <button
                  type="button"
                  onClick={() => scaleSelected(1.1)}
                  disabled={!selectedItem}
                  className="rounded-2xl border border-white/10 bg-black/20 px-4 py-2.5 text-sm text-white transition disabled:cursor-not-allowed disabled:opacity-40"
                >
                  הגדל פריט
                </button>
                <button
                  type="button"
                  onClick={rotateSelectedBack}
                  disabled={!selectedItem}
                  className="rounded-2xl border border-white/10 bg-black/20 px-4 py-2.5 text-sm text-white transition disabled:cursor-not-allowed disabled:opacity-40"
                >
                  סובב שמאלה
                </button>
                <button
                  type="button"
                  onClick={rotateSelected}
                  disabled={!selectedItem}
                  className="rounded-2xl border border-white/10 bg-black/20 px-4 py-2.5 text-sm text-white transition disabled:cursor-not-allowed disabled:opacity-40"
                >
                  סובב ימינה
                </button>
                <button
                  type="button"
                  onClick={() => setHasCarpet((prev) => !prev)}
                  className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 px-4 py-2.5 text-sm text-cyan-100 transition"
                >
                  {hasCarpet ? "הסר שטיח כחול" : "הוסף שטיח כחול"}
                </button>
                <button
                  type="button"
                  onClick={clearWorkspace}
                  className="rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-2.5 text-sm text-rose-100 transition"
                >
                  נקה את כל הסצנה
                </button>
              </div>
            </div>

            <div className="h-[720px] overflow-hidden rounded-[28px] border border-cyan-300/15 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.08),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.02))]">
              <TentScene
                template={currentTemplate}
                items={items}
                selectedItemId={selectedItemId}
                setSelectedItemId={setSelectedItemId}
                setItems={setItems}
                hasCarpet={hasCarpet}
              />
            </div>
          </section>

          <aside className="space-y-6">
            <section className="rounded-[32px] border border-white/10 bg-white/[0.03] p-5 shadow-[0_20px_70px_rgba(0,0,0,0.25)]">
              <div className="mb-4">
                <div className="text-[11px] uppercase tracking-[0.3em] text-cyan-300/70">
                  Real Elements Library
                </div>
                <h3 className="mt-2 text-xl font-semibold">אלמנטים אמיתיים</h3>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {layoutInventory.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => addElement(item.type as ElementType, item.label)}
                    className="rounded-[24px] border border-white/10 bg-black/20 p-4 text-right transition hover:border-cyan-300/25 hover:bg-cyan-300/[0.06]"
                  >
                    <div className="text-sm font-semibold text-white">
                      {item.label}
                    </div>
                    <div className="mt-1 text-xs text-white/45">
                      add into 3D scene
                    </div>
                  </button>
                ))}
              </div>
            </section>

            <section className="rounded-[32px] border border-white/10 bg-white/[0.03] p-5 shadow-[0_20px_70px_rgba(0,0,0,0.25)]">
              <div className="mb-4">
                <div className="text-[11px] uppercase tracking-[0.3em] text-cyan-300/70">
                  Placed Objects
                </div>
                <h3 className="mt-2 text-xl font-semibold">רשימת אובייקטים</h3>
              </div>

              <div className="space-y-3">
                {items.length ? (
                  items.map((item) => {
                    const selected = item.id === selectedItemId;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setSelectedItemId(item.id)}
                        className={[
                          "w-full rounded-[24px] border p-4 text-right transition",
                          selected
                            ? "border-cyan-300/35 bg-cyan-300/[0.07]"
                            : "border-white/10 bg-black/20",
                        ].join(" ")}
                      >
                        <div className="mb-3 flex items-start justify-between gap-3">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeItem(item.id);
                            }}
                            className="rounded-full border border-rose-400/20 bg-rose-400/10 px-3 py-1 text-xs text-rose-200"
                          >
                            delete
                          </button>
                          <div>
                            <div className="text-sm font-semibold text-white">
                              {item.label}
                            </div>
                            <div className="mt-1 text-xs text-white/45">
                              ID: {item.id}
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-left">
                          <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-3 py-2">
                            <div className="text-[11px] uppercase tracking-[0.2em] text-white/35">
                              X
                            </div>
                            <div className="mt-1 text-sm font-medium text-white">
                              {item.x.toFixed(2)}
                            </div>
                          </div>
                          <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-3 py-2">
                            <div className="text-[11px] uppercase tracking-[0.2em] text-white/35">
                              Z
                            </div>
                            <div className="mt-1 text-sm font-medium text-white">
                              {item.z.toFixed(2)}
                            </div>
                          </div>
                          <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-3 py-2">
                            <div className="text-[11px] uppercase tracking-[0.2em] text-white/35">
                              ROT
                            </div>
                            <div className="mt-1 text-sm font-medium text-white">
                              {item.rotation.toFixed(2)}
                            </div>
                          </div>
                          <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-3 py-2">
                            <div className="text-[11px] uppercase tracking-[0.2em] text-white/35">
                              SCALE
                            </div>
                            <div className="mt-1 text-sm font-medium text-white">
                              {(item.scale ?? 1).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })
                ) : (
                  <div className="rounded-[24px] border border-dashed border-white/10 bg-black/15 px-4 py-8 text-center text-sm text-white/35">
                    אין עדיין אובייקטים בסצנה
                  </div>
                )}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
