"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Html, OrbitControls, PerspectiveCamera, useGLTF } from "@react-three/drei";
import * as THREE from "three";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";

type ExhibitItem = {
  slug: string;
  section: "space" | "air" | "land" | "naval";
  displayName: string;
  image: string;
  model3d: string;
};

const EXHIBIT_ITEMS: ExhibitItem[] = [
  // Space
  { slug: "mcs",          section: "space", displayName: "MCS",              image: "/images/space/mcs-showcase.png",          model3d: "/models/space/mcs-showcase-3d.glb" },
  { slug: "optsat-500",   section: "space", displayName: "OPTSAT-500",        image: "/images/space/optsat-500-showcase.png",    model3d: "/models/space/optsat-500-showcase-3d.glb" },
  { slug: "optsar-550",   section: "space", displayName: "OPTSAR-550",        image: "/images/space/optsar-550-showcase.png",    model3d: "/models/space/optsar-550-showcase-3d.glb" },
  { slug: "optsat-3000",  section: "space", displayName: "OPTSAT 3000",       image: "/images/space/optsat-3000-showcase.png",   model3d: "/models/space/optsat-3000-showcase-3d.glb" },
  { slug: "tecsar",       section: "space", displayName: "TECSAR",            image: "/images/space/tecsar-showcase.png",        model3d: "/models/space/tecsar-showcase-3d.glb" },
  { slug: "beresheet",    section: "space", displayName: "בראשית",            image: "/images/space/beresheet-showcase.png",     model3d: "/models/space/beresheet-showcase-3d.glb" },
  { slug: "shavit",       section: "space", displayName: "שביט",              image: "/images/space/shavit-showcase.png",        model3d: "/models/space/shavit-showcase-3d.glb" },
  // Air
  { slug: "arrow-2",           section: "air", displayName: "Arrow-2",          image: "/images/air/arrow-2-showcase.png",          model3d: "/models/air/arrow-2-showcase-3d.glb" },
  { slug: "arrow-3-missile",   section: "air", displayName: "Arrow-3",          image: "/images/air/arrow-3-showcase.png",          model3d: "/models/air/arrow-3-showcase-3d.glb" },
  { slug: "arrow-3-launcher",  section: "air", displayName: "Arrow-3 Launcher", image: "/images/air/arrow-3-launcher-showcase.png", model3d: "/models/air/arrow-3-launcher.glb" },
  { slug: "lora",              section: "air", displayName: "LORA",             image: "/images/air/lora-showcase.png",             model3d: "/models/air/lora-showcase-3d.glb" },
  { slug: "mmr",               section: "air", displayName: "MMR",              image: "/images/air/mmr-showcase.png",              model3d: "/models/air/mmr-showcase-3d.glb" },
  { slug: "heron",             section: "air", displayName: "Heron",            image: "/images/air/heron-showcase.png",            model3d: "/models/air/heron-showcase-3d.glb" },
  { slug: "wanderb",           section: "air", displayName: "WanderB",          image: "/images/air/wanderb-showcase.png",          model3d: "/models/air/wanderb-showcase-3d.glb" },
  { slug: "wanderb2",          section: "air", displayName: "WanderB 2",        image: "/images/air/wanderb2-showcase.png",         model3d: "/models/air/wanderb2-showcase-3d.glb" },
  // Land
  { slug: "zmag",       section: "land", displayName: "ZMAG",       image: "/images/land/zmag-showcase.png",       model3d: "/models/land/zmag-showcase-3d.glb" },
  { slug: "3dcapture",  section: "land", displayName: "3DCAPTURE",  image: "/images/land/3dcapture-showcase.png",  model3d: "/models/land/3dcapture-showcase-3d.glb" },
  { slug: "panda",      section: "land", displayName: "PANDA",      image: "/images/land/panda-showcase.png",      model3d: "/models/land/panda-showcase-3d.glb" },
  // Naval
  { slug: "katana", section: "naval", displayName: "KATANA", image: "/images/naval/katana.png", model3d: "/models/naval/katana-showcase.glb" },
];

const rightItems = [
  "שולחן",
  "כיסא",
  "ספה",
  "מסך",
  "בר קפה",
  "דוכן",
  "מקרן",
  "רמקול",
];

const previewMap: Record<string, string> = {
  "שולחן":  "/inventory/table-cover-iai-blue-01.png",
  "כיסא":   "/inventory/chair-folding-white-01.png",
  "ספה":    "/inventory/podium-square-130x130x90-01.png",
  "מסך":    "/inventory/lightbox-vertical-multidomain-01.jpeg",
  "בר קפה": "/inventory/podium-square-100x100x90-01.png",
  "דוכן":   "/inventory/lectern-acrylic-01.png",
  "מקרן":   "/inventory/lightbox-horizontal-multidomain-01.jpeg",
  "רמקול":  "/inventory/stanchion-black-01.png",
};

type SceneItem = {
  id: string;
  type: string;
  position: [number, number, number];
  rotationY: number;
  scale: number;
};


function TopPill({
  label,
  active = false,
}: {
  label: string;
  active?: boolean;
}) {
  return (
    <div
      style={{
        padding: "8px 12px",
        borderRadius: "12px",
        border: active
          ? "1px solid rgba(56,189,248,0.48)"
          : "1px solid rgba(148,163,184,0.18)",
        background: active
          ? "rgba(34,211,238,0.14)"
          : "rgba(255,255,255,0.03)",
        color: "#f8fbff",
        fontSize: "13px",
        fontWeight: 700,
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </div>
  );
}

function ToolButton({
  label,
  active = false,
}: {
  label: string;
  active?: boolean;
}) {
  return (
    <div
      style={{
        padding: "7px 11px",
        borderRadius: "11px",
        border: active
          ? "1px solid rgba(56,189,248,0.50)"
          : "1px solid rgba(148,163,184,0.22)",
        background: active
          ? "rgba(34,211,238,0.14)"
          : "rgba(255,255,255,0.03)",
        color: "#f8fbff",
        fontSize: "13px",
        fontWeight: 700,
        lineHeight: 1,
      }}
    >
      {label}
    </div>
  );
}

function SideActionCard({ title }: { title: string }) {
  return (
    <button
      type="button"
      style={{
        width: "100%",
        minHeight: "74px",
        borderRadius: "14px",
        border: "1px solid rgba(148,163,184,0.18)",
        background: "rgba(255,255,255,0.03)",
        color: "#f8fbff",
        padding: "12px 12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "10px",
        textAlign: "left",
        cursor: "pointer",
      }}
    >
      <span
        style={{
          fontWeight: 700,
          lineHeight: 1.1,
          fontSize: "13px",
        }}
      >
        {title}
      </span>

      <span
        style={{
          width: "22px",
          height: "22px",
          borderRadius: "999px",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid rgba(103,232,249,0.46)",
          color: "#67e8f9",
          flexShrink: 0,
          fontWeight: 800,
          fontSize: "14px",
        }}
      >
        +
      </span>
    </button>
  );
}


function SliderControl({
  label,
  min,
  max,
  step,
  value,
  onChange,
}: {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "130px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "11px", fontWeight: 700, color: "rgba(180,220,255,0.8)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
          {label}
        </span>
        <span style={{ fontSize: "12px", fontWeight: 800, color: "#00e5ff", fontVariantNumeric: "tabular-nums" }}>
          {value.toFixed(2)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        style={{ width: "100%", accentColor: "#00e5ff", cursor: "pointer" }}
      />
    </div>
  );
}

function SidebarItemCard({ item, image, onAdd }: { item: string; image?: string; onAdd: () => void }) {
  const [hovered, setHovered] = useState(false);
  const imgSrc = image ?? previewMap[item] ?? "";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        zIndex: hovered ? 20 : 10,
        borderRadius: "16px",
        border: `1px solid ${hovered ? "rgba(0,229,255,0.38)" : "rgba(148,163,184,0.16)"}`,
        background: hovered
          ? "linear-gradient(180deg, rgba(0,229,255,0.07) 0%, rgba(0,229,255,0.02) 100%)"
          : "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)",
        display: "flex",
        flexDirection: "column",
        transition: "border-color 150ms ease, background 150ms ease",
      }}
    >
      {/* Image */}
      <div
        style={{
          width: "100%",
          height: "90px",
          borderRadius: "14px 14px 0 0",
          overflow: "hidden",
          backgroundColor: "rgba(10,18,40,0.85)",
          backgroundImage: imgSrc ? `url("${imgSrc}")` : "none",
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          flexShrink: 0,
        }}
      />

      {/* Name */}
      <div
        style={{
          padding: "8px 6px 4px",
          textAlign: "center",
          fontSize: "13px",
          fontWeight: 800,
          color: "#f0faff",
          lineHeight: 1.2,
          direction: "rtl",
        }}
      >
        {item}
      </div>

      {/* Add button */}
      <button
        type="button"
        onClick={onAdd}
        style={{
          margin: "4px 8px 8px",
          borderRadius: "10px",
          border: "1px solid rgba(0,229,255,0.50)",
          background: hovered ? "rgba(0,229,255,0.22)" : "rgba(0,229,255,0.12)",
          color: "#00e5ff",
          fontSize: "11px",
          fontWeight: 800,
          padding: "7px 4px",
          cursor: "pointer",
          letterSpacing: "0.04em",
          transition: "background 150ms ease",
          whiteSpace: "nowrap",
        }}
      >
        הוסף לתצוגה
      </button>

      {/* Hover preview popup */}
      {hovered && imgSrc && (
        <div
          style={{
            position: "absolute",
            bottom: "calc(100% + 8px)",
            left: "50%",
            transform: "translateX(-50%)",
            width: "168px",
            height: "130px",
            borderRadius: "14px",
            border: "1px solid rgba(0,229,255,0.28)",
            background: "rgba(4,10,24,0.97)",
            boxShadow: "0 12px 40px rgba(0,0,0,0.7), 0 0 24px rgba(0,229,255,0.1)",
            overflow: "hidden",
            zIndex: 200,
            pointerEvents: "none",
          }}
        >
          <img
            src={imgSrc}
            alt={item}
            style={{ width: "100%", height: "100%", objectFit: "contain", padding: "10px" }}
          />
        </div>
      )}
    </div>
  );
}

const TENT_MODEL_PATH = "/models/inventory/tent-20-30-iai-blue-01.glb";

function TentModel3D({ tentScale = 12 }: { tentScale?: number }) {
  const gltf = useGLTF(TENT_MODEL_PATH);
  const cloned = useMemo(() => {
    const scene = gltf.scene.clone(true);
    scene.traverse((child: any) => {
      if (child.isMesh && child.material) {
        const mats = Array.isArray(child.material) ? child.material : [child.material];
        mats.forEach((mat: any) => {
          mat.emissive = new THREE.Color("#001a44");
          mat.emissiveIntensity = 0.55;
        });
      }
    });
    return scene;
  }, [gltf.scene]);

  return (
    <primitive
      object={cloned}
      position={[0, -1.45, 0]}
      rotation={[0, 0.62, 0]}
      scale={tentScale}
    />
  );
}


function OpenAreaOutline() {
  const geo = useMemo(() => {
    const w = 12.5, d = 7.5;
    const pts = [
      -w, 0, -d,  w, 0, -d,
       w, 0, -d,  w, 0,  d,
       w, 0,  d, -w, 0,  d,
      -w, 0,  d, -w, 0, -d,
    ];
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    return g;
  }, []);
  return (
    <lineSegments geometry={geo} position={[0, -1.37, 0]}>
      <lineBasicMaterial color="#00e5ff" transparent opacity={0.55} />
    </lineSegments>
  );
}

function InventoryTable3D({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.78, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 0.08, 0.85]} />
        <meshStandardMaterial color="#d9dee7" roughness={0.82} metalness={0.08} />
      </mesh>

      <mesh position={[-0.62, 0.39, -0.3]} castShadow receiveShadow>
        <boxGeometry args={[0.07, 0.78, 0.07]} />
        <meshStandardMaterial color="#8aa0b8" roughness={0.72} metalness={0.18} />
      </mesh>
      <mesh position={[0.62, 0.39, -0.3]} castShadow receiveShadow>
        <boxGeometry args={[0.07, 0.78, 0.07]} />
        <meshStandardMaterial color="#8aa0b8" roughness={0.72} metalness={0.18} />
      </mesh>
      <mesh position={[-0.62, 0.39, 0.3]} castShadow receiveShadow>
        <boxGeometry args={[0.07, 0.78, 0.07]} />
        <meshStandardMaterial color="#8aa0b8" roughness={0.72} metalness={0.18} />
      </mesh>
      <mesh position={[0.62, 0.39, 0.3]} castShadow receiveShadow>
        <boxGeometry args={[0.07, 0.78, 0.07]} />
        <meshStandardMaterial color="#8aa0b8" roughness={0.72} metalness={0.18} />
      </mesh>
    </group>
  );
}

function InventoryChair3D({ position = [0, 0, 0], rotationY = 0 }) {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <mesh position={[0, 0.48, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.55, 0.08, 0.55]} />
        <meshStandardMaterial color="#f4f7fb" roughness={0.88} metalness={0.03} />
      </mesh>

      <mesh position={[0, 0.9, -0.23]} castShadow receiveShadow>
        <boxGeometry args={[0.55, 0.78, 0.08]} />
        <meshStandardMaterial color="#f4f7fb" roughness={0.88} metalness={0.03} />
      </mesh>

      <mesh position={[-0.2, 0.22, -0.2]} castShadow receiveShadow>
        <boxGeometry args={[0.06, 0.44, 0.06]} />
        <meshStandardMaterial color="#8aa0b8" roughness={0.72} metalness={0.16} />
      </mesh>
      <mesh position={[0.2, 0.22, -0.2]} castShadow receiveShadow>
        <boxGeometry args={[0.06, 0.44, 0.06]} />
        <meshStandardMaterial color="#8aa0b8" roughness={0.72} metalness={0.16} />
      </mesh>
      <mesh position={[-0.2, 0.22, 0.2]} castShadow receiveShadow>
        <boxGeometry args={[0.06, 0.44, 0.06]} />
        <meshStandardMaterial color="#8aa0b8" roughness={0.72} metalness={0.16} />
      </mesh>
      <mesh position={[0.2, 0.22, 0.2]} castShadow receiveShadow>
        <boxGeometry args={[0.06, 0.44, 0.06]} />
        <meshStandardMaterial color="#8aa0b8" roughness={0.72} metalness={0.16} />
      </mesh>
    </group>
  );
}

function InventoryScreen3D({ position = [0, 0, 0], rotationY = 0 }) {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <mesh position={[0, 0.05, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.42, 0.42, 0.06, 28]} />
        <meshStandardMaterial color="#1f2937" roughness={0.8} metalness={0.22} />
      </mesh>

      <mesh position={[0, 0.85, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.045, 0.05, 1.6, 18]} />
        <meshStandardMaterial color="#9fb3c8" roughness={0.64} metalness={0.3} />
      </mesh>

      <mesh position={[0, 1.7, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.35, 0.82, 0.08]} />
        <meshStandardMaterial color="#111827" roughness={0.58} metalness={0.18} />
      </mesh>

      <mesh position={[0, 1.7, 0.045]}>
        <boxGeometry args={[1.18, 0.66, 0.01]} />
        <meshStandardMaterial color="#163b63" emissive="#1d4ed8" emissiveIntensity={0.42} roughness={0.38} metalness={0.12} />
      </mesh>
    </group>
  );
}

function InventorySet3D() {
  return (
    <>
      <InventoryTable3D position={[-2.15, -1.38, 0.95]} />
      <InventoryChair3D position={[-2.85, -1.38, 1.7]} rotationY={0.58} />
      <InventoryScreen3D position={[2.3, -1.38, 1.1]} rotationY={-0.62} />
    </>
  );
}

const itemModelMap: Record<string, string> = {
  // Exhibits — keyed by slug
  "mcs":               "/models/space/mcs-showcase-3d.glb",
  "optsat-500":        "/models/space/optsat-500-showcase-3d.glb",
  "optsar-550":        "/models/space/optsar-550-showcase-3d.glb",
  "optsat-3000":       "/models/space/optsat-3000-showcase-3d.glb",
  "tecsar":            "/models/space/tecsar-showcase-3d.glb",
  "beresheet":         "/models/space/beresheet-showcase-3d.glb",
  "shavit":            "/models/space/shavit-showcase-3d.glb",
  "arrow-2":           "/models/air/arrow-2-showcase-3d.glb",
  "arrow-3-missile":   "/models/air/arrow-3-showcase-3d.glb",
  "arrow-3-launcher":  "/models/air/arrow-3-launcher.glb",
  "lora":              "/models/air/lora-showcase-3d.glb",
  "mmr":               "/models/air/mmr-showcase-3d.glb",
  "heron":             "/models/air/heron-showcase-3d.glb",
  "wanderb":           "/models/air/wanderb-showcase-3d.glb",
  "wanderb2":          "/models/air/wanderb2-showcase-3d.glb",
  "zmag":              "/models/land/zmag-showcase-3d.glb",
  "3dcapture":         "/models/land/3dcapture-showcase-3d.glb",
  "panda":             "/models/land/panda-showcase-3d.glb",
  "katana":            "/models/naval/katana-showcase.glb",
  // Inventory — keyed by Hebrew name
  "שולחן":  "/models/inventory/lightbox-horizontal-iai-01.glb",
  "כיסא":   "/models/inventory/lightbox-horizontal-iai-01.glb",
  "ספה":    "/models/inventory/lightbox-horizontal-iai-01.glb",
  "מסך":    "/models/inventory/lightbox-vertical-iai-01.glb",
  "בר קפה": "/models/inventory/lightbox-horizontal-iai-01.glb",
  "דוכן":   "/models/inventory/lightbox-vertical-iai-01.glb",
  "מקרן":   "/models/inventory/lightbox-horizontal-iai-01.glb",
  "רמקול":  "/models/inventory/lightbox-vertical-iai-01.glb",
};

const FALLBACK_MODEL = "/models/inventory/flag-pair-iai-israel-01.glb";

function DynamicItem({
  item,
  isSelected,
  onSelect,
  activeTool,
  draggingId,
}: {
  item: SceneItem;
  isSelected: boolean;
  onSelect: () => void;
  activeTool: string;
  draggingId: { current: string | null };
}) {
  const modelPath = itemModelMap[item.type] ?? FALLBACK_MODEL;
  const gltf = useGLTF(modelPath);
  const cloned = useMemo(() => gltf.scene.clone(true), [gltf.scene]);

  return (
    <>
      <group
        position={item.position}
        rotation={[0, item.rotationY, 0]}
        scale={item.scale}
        onClick={(e) => { e.stopPropagation(); onSelect(); }}
        onPointerDown={(e) => {
          if (activeTool === "Move") {
            e.stopPropagation();
            onSelect();
            draggingId.current = item.id;
          }
        }}
      >
        <primitive object={cloned} castShadow />
      </group>

      {/* Selection ring sits on the floor in world space — unaffected by item scale */}
      {isSelected && (
        <mesh
          position={[item.position[0], -1.35, item.position[2]]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <ringGeometry args={[0.9, 1.25, 48]} />
          <meshBasicMaterial color="#00e5ff" transparent opacity={0.9} />
        </mesh>
      )}
    </>
  );
}

const CAM_PRESETS = {
  overview: { pos: new THREE.Vector3(10, 8, 10), look: new THREE.Vector3(0, -1, 0) },
  tent:     { pos: new THREE.Vector3(0, 0, 5),   look: new THREE.Vector3(0, -0.3, -1) },
} as const;

type CameraMode = keyof typeof CAM_PRESETS;

function CameraRig({ mode, draggingId }: { mode: CameraMode; draggingId: { current: string | null } }) {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);
  const animating = useRef(false);

  useEffect(() => { animating.current = true; }, [mode]);

  useFrame(() => {
    if (!controlsRef.current) return;
    controlsRef.current.enabled = draggingId.current === null;
    if (!animating.current) return;
    const { pos, look } = CAM_PRESETS[mode];
    camera.position.lerp(pos, 0.12);
    controlsRef.current.target.lerp(look, 0.12);
    controlsRef.current.update();
    if (camera.position.distanceTo(pos) < 0.08) {
      camera.position.copy(pos);
      controlsRef.current.target.copy(look);
      controlsRef.current.update();
      animating.current = false;
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={true}
      enableZoom={true}
      minDistance={0.5}
      maxDistance={25}
      target={[0, -1, 0]}
    />
  );
}

function HexGrid({ hexSize = 1.6, rows = 9, opacity = 0.85, color = "#00e5ff" }: { hexSize?: number; rows?: number; opacity?: number; color?: string }) {
  const geometry = useMemo(() => {
    const positions: number[] = [];
    for (let q = -rows; q <= rows; q++) {
      for (let s = Math.max(-rows, -q - rows); s <= Math.min(rows, -q + rows); s++) {
        const cx = hexSize * (3 / 2) * q;
        const cz = hexSize * (Math.sqrt(3) * s + (Math.sqrt(3) / 2) * q);
        for (let i = 0; i < 6; i++) {
          const a1 = (Math.PI / 3) * i - Math.PI / 6;
          const a2 = (Math.PI / 3) * (i + 1) - Math.PI / 6;
          positions.push(
            cx + hexSize * Math.cos(a1), 0, cz + hexSize * Math.sin(a1),
            cx + hexSize * Math.cos(a2), 0, cz + hexSize * Math.sin(a2)
          );
        }
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, [hexSize, rows]);

  return (
    <lineSegments geometry={geometry} position={[0, -1.36, 0]}>
      <lineBasicMaterial color={color} transparent opacity={opacity} />
    </lineSegments>
  );
}

function HexBorder() {
  const mainGeo = useMemo(() => {
    const pts: number[] = [];
    for (let i = 0; i < 6; i++) {
      const a = (Math.PI / 3) * i - Math.PI / 6;
      pts.push(16 * Math.cos(a), 0, 16 * Math.sin(a));
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    return geo;
  }, []);

  const glowGeo = useMemo(() => {
    const pts: number[] = [];
    for (let i = 0; i < 6; i++) {
      const a = (Math.PI / 3) * i - Math.PI / 6;
      pts.push(16.3 * Math.cos(a), 0, 16.3 * Math.sin(a));
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    return geo;
  }, []);

  return (
    <>
      <lineLoop geometry={mainGeo} position={[0, -1.35, 0]}>
        <lineBasicMaterial color="#00e5ff" />
      </lineLoop>
      <lineLoop geometry={glowGeo} position={[0, -1.35, 0]}>
        <lineBasicMaterial color="#00e5ff" transparent opacity={0.3} />
      </lineLoop>
    </>
  );
}

function SpotFixture({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Wide base ring */}
      <mesh position={[0, 0.04, 0]}>
        <cylinderGeometry args={[0.38, 0.44, 0.08, 16]} />
        <meshStandardMaterial color="#0d0d1e" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Main body */}
      <mesh position={[0, 0.32, 0]}>
        <cylinderGeometry args={[0.14, 0.20, 0.56, 14]} />
        <meshStandardMaterial color="#1a1a2a" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Tall emissive cyan column */}
      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.8, 12]} />
        <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={6.0} roughness={0.05} metalness={0.1} />
      </mesh>
    </group>
  );
}

function DragHandler({
  draggingId,
  onMoveItem,
}: {
  draggingId: { current: string | null };
  onMoveItem: (id: string, x: number, z: number) => void;
}) {
  const { camera, gl } = useThree();
  const floorPlane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 1, 0), 1.38), []);
  const ray = useMemo(() => new THREE.Raycaster(), []);
  const onMoveRef = useRef(onMoveItem);
  onMoveRef.current = onMoveItem;

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!draggingId.current) return;
      const rect = gl.domElement.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      ray.setFromCamera({ x: nx, y: ny }, camera);
      const hit = new THREE.Vector3();
      if (ray.ray.intersectPlane(floorPlane, hit)) {
        onMoveRef.current(draggingId.current, hit.x, hit.z);
      }
    };
    const onUp = () => { draggingId.current = null; };
    gl.domElement.addEventListener("pointermove", onMove);
    gl.domElement.addEventListener("pointerup", onUp);
    return () => {
      gl.domElement.removeEventListener("pointermove", onMove);
      gl.domElement.removeEventListener("pointerup", onUp);
    };
  }, [camera, gl, floorPlane, ray, draggingId]);

  return null;
}

function TentStage3D({
  items,
  selectedId,
  onSelect,
  cameraMode,
  activeTool,
  onMoveItem,
  tentType,
}: {
  items: SceneItem[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  cameraMode: CameraMode;
  activeTool: string;
  onMoveItem: (id: string, x: number, z: number) => void;
  tentType: string;
}) {
  const draggingId = useRef<string | null>(null);

  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <PerspectiveCamera makeDefault position={[10, 8, 10]} fov={40} />
      <ambientLight intensity={1.4} />
      <directionalLight position={[7, 10, 6]} intensity={1.6} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
      <directionalLight position={[-5, 4, -4]} intensity={0.5} />

      {/* Corner spotlights — dramatic downlighting */}
      <spotLight position={[-10, 16, -10]} intensity={8.0} angle={0.2} penumbra={0.95} color="#4488ff" castShadow />
      <spotLight position={[ 10, 16, -10]} intensity={8.0} angle={0.2} penumbra={0.95} color="#4488ff" castShadow />
      <spotLight position={[-10, 16,  10]} intensity={8.0} angle={0.2} penumbra={0.95} color="#4488ff" castShadow />
      <spotLight position={[ 10, 16,  10]} intensity={8.0} angle={0.2} penumbra={0.95} color="#4488ff" castShadow />

      <Suspense
        fallback={
          <Html center>
            <div
              style={{
                padding: "10px 14px",
                borderRadius: "12px",
                border: "1px solid rgba(103,232,249,0.24)",
                background: "rgba(5,10,20,0.75)",
                color: "#dff7ff",
                fontSize: "12px",
                fontWeight: 700,
                whiteSpace: "nowrap",
              }}
            >
              טוען מודל אוהל…
            </div>
          </Html>
        }
      >
        <>
          {tentType !== "open" && <TentModel3D tentScale={tentType === "30x20" ? 15 : 12} />}
          {tentType === "open" && <OpenAreaOutline />}
          {items.map((item) => (
            <DynamicItem
              key={item.id}
              item={item}
              isSelected={item.id === selectedId}
              onSelect={() => onSelect(item.id)}
              activeTool={activeTool}
              draggingId={draggingId}
            />
          ))}
        </>
      </Suspense>

      <DragHandler draggingId={draggingId} onMoveItem={onMoveItem} />

      {/* Invisible deselect plane — clicking empty floor deselects */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.37, 0]}
        onClick={(e) => { e.stopPropagation(); if (!draggingId.current) onSelect(null); }}
      >
        <planeGeometry args={[32, 32]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* Exterior floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.38, 0]} receiveShadow>
        <planeGeometry args={[32, 32]} />
        <meshStandardMaterial color="#12122a" roughness={1} metalness={0} />
      </mesh>

      {/* Full carpet — polished royal blue */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.372, 0]} receiveShadow>
        <planeGeometry args={[32, 32]} />
        <meshStandardMaterial color="#0033aa" emissive="#001f6e" emissiveIntensity={0.6} roughness={0.1} metalness={0.3} />
      </mesh>

      {/* Blue ground glow under the tent */}
      <pointLight position={[0, -1.3, 0]} color="#0044ff" intensity={2.0} distance={18} />

      {/* Hexagonal neon border ring */}
      <HexBorder />

      {/* Spotlight fixtures at hexagon corners — radius 16, angle = (PI/3)*i - PI/6 */}
      <SpotFixture position={[ 13.86, -1.38,  -8.0]} />
      <SpotFixture position={[ 13.86, -1.38,   8.0]} />
      <SpotFixture position={[  0.0,  -1.38,  16.0]} />
      <SpotFixture position={[-13.86, -1.38,   8.0]} />
      <SpotFixture position={[-13.86, -1.38,  -8.0]} />
      <SpotFixture position={[  0.0,  -1.38, -16.0]} />

      <ContactShadows
        position={[0, -1.36, 0]}
        opacity={0.55}
        scale={22}
        blur={2.8}
        far={6}
        resolution={1024}
      />

      <CameraRig mode={cameraMode} draggingId={draggingId} />
    </Canvas>
  );
}

useGLTF.preload(TENT_MODEL_PATH);
// Exhibit models
EXHIBIT_ITEMS.forEach((e) => useGLTF.preload(e.model3d));
// Inventory models
useGLTF.preload("/models/inventory/lightbox-vertical-iai-01.glb");
useGLTF.preload("/models/inventory/lightbox-horizontal-iai-01.glb");

export default function TentsLayoutPage() {
  const [focusMode, setFocusMode] = useState(false);
  const [sceneItems, setSceneItems] = useState<SceneItem[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [activeTool, setActiveTool] = useState("Select");
  const [cameraMode, setCameraMode] = useState<CameraMode>("overview");
  const [activeSection, setActiveSection] = useState<"all" | "space" | "air" | "land" | "naval">("all");
  const [activeInventoryFilter, setActiveInventoryFilter] = useState<"הכל" | "ריהוט" | "מדיה" | "VIP" | "שירות">("הכל");
  const [tentType, setTentType] = useState<"25x15" | "30x20" | "open">("25x15");
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  const [toastVisible, setToastVisible] = useState(false);

  const filteredExhibits = useMemo(
    () => activeSection === "all" ? EXHIBIT_ITEMS : EXHIBIT_ITEMS.filter((e) => e.section === activeSection),
    [activeSection]
  );

  const INVENTORY_ALL = ["שולחן", "כיסא", "ספה", "מסך", "בר קפה", "דוכן", "מקרן", "רמקול"] as const;
  const INVENTORY_FILTER_MAP: Record<string, string[]> = {
    "הכל":   ["שולחן", "כיסא", "ספה", "מסך", "בר קפה", "דוכן", "מקרן", "רמקול"],
    "ריהוט": ["שולחן", "כיסא", "ספה", "בר קפה"],
    "מדיה":  ["מסך", "מקרן", "רמקול"],
    "VIP":   ["ספה", "בר קפה", "דוכן"],
    "שירות": ["דוכן", "מקרן", "רמקול"],
  };
  const filteredInventory = INVENTORY_FILTER_MAP[activeInventoryFilter] ?? INVENTORY_ALL;

  const statusItems = useMemo(() => {
    const cfg = {
      "25x15": { name: "אוהל 25x15", length: "25m", width: "15m", area: "375m²" },
      "30x20": { name: "אוהל 30x20", length: "30m", width: "20m", area: "600m²" },
      "open":  { name: "שטח פתוח",   length: "25m", width: "15m", area: "375m²" },
    }[tentType];
    return [
      [cfg.name,   "תבנית פעילה"],
      [cfg.length, "אורך"],
      [cfg.width,  "רוחב"],
      [cfg.area,   "שטח"],
      ["0",        "רכיבים"],
      ["96%",      "מוכנות"],
    ];
  }, [tentType]);

  const selectedItem = sceneItems.find((i) => i.id === selectedItemId) ?? null;
  const selectedDisplayName = selectedItem
    ? (EXHIBIT_ITEMS.find((e) => e.slug === selectedItem.type)?.displayName ?? selectedItem.type)
    : null;

  function addItem(type: string) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 5.5 + Math.random() * 4.5;
    const newId = `${type}-${Date.now()}`;
    setSceneItems((prev) => [
      ...prev,
      {
        id: newId,
        type,
        position: [Math.cos(angle) * radius, -1.38, Math.sin(angle) * radius],
        rotationY: 0,
        scale: 0.8,
      },
    ]);
    setSelectedItemId(newId);
  }

  function moveItem(id: string, x: number, z: number) {
    setSceneItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, position: [x, item.position[1], z] } : item
      )
    );
  }

  function updateItemX(id: string, x: number) {
    setSceneItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, position: [x, item.position[1], item.position[2]] }
          : item
      )
    );
  }

  function updateItemZ(id: string, z: number) {
    setSceneItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, position: [item.position[0], item.position[1], z] }
          : item
      )
    );
  }

  function updateItemScale(id: string, scale: number) {
    setSceneItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, scale } : item))
    );
  }

  function rotateItem(id: string) {
    setSceneItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, rotationY: item.rotationY + Math.PI / 4 }
          : item
      )
    );
  }

  function saveScene() {
    localStorage.setItem("tentScene", JSON.stringify(sceneItems));
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2000);
  }

  function deleteItem(id: string) {
    setSceneItems((prev) => prev.filter((item) => item.id !== id));
    setSelectedItemId(null);
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, rgba(0,120,200,0.08), transparent 20%), linear-gradient(180deg, #020710 0%, #01040c 100%)",
        color: "#eaf4ff",
      }}
    >

      <div
        style={{
          maxWidth: focusMode ? "100vw" : "1880px",
          margin: "14px auto 0",
          padding: focusMode ? "6px" : "12px",
          display: "grid",
          gap: focusMode ? "8px" : "12px",
          transition: "all 220ms ease",
        }}
      >
        {/* TOP BAR */}
        <section
          style={{
            height: focusMode ? "42px" : "56px",
            borderRadius: focusMode ? "12px" : "18px",
            border: "1px solid rgba(125,211,252,0.12)",
            background:
              "linear-gradient(180deg, rgba(8,16,32,0.92) 0%, rgba(6,12,24,0.98) 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: focusMode ? "0 12px" : "0 16px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                fontSize: focusMode ? "14px" : "16px",
                fontWeight: 800,
                letterSpacing: "0.06em",
              }}
            >
              מרכז תצוגה
            </div>

            {!focusMode ? (
              <div
                style={{
                  fontSize: "11px",
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                  color: "rgba(180,220,255,0.68)",
                }}
              >
                אוהלים / פריסה
              </div>
            ) : null}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: focusMode ? "6px" : "10px",
              flexWrap: "nowrap",
              flexShrink: 0,
              minWidth: 0,
            }}
          >
            {!focusMode ? (
              <>
                <span style={{ color: "rgba(234,244,255,0.74)", fontSize: "13px" }}>
                  לוח בקרה
                </span>
                <span style={{ color: "rgba(234,244,255,0.74)", fontSize: "13px" }}>
                  תכנון
                </span>
              </>
            ) : null}

            {focusMode ? (
              <>
                <button
                  type="button"
                  onClick={() => setFocusMode(false)}
                  style={{
                    padding: "7px 10px",
                    borderRadius: "999px",
                    border: "1px solid rgba(56,189,248,0.34)",
                    background:
                      "linear-gradient(180deg, rgba(8,145,178,0.22) 0%, rgba(59,130,246,0.20) 100%)",
                    color: "#f8fbff",
                    fontWeight: 800,
                    fontSize: "12px",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  יציאה
                </button>

                <button
                  type="button"
                  onClick={() => window.history.back()}
                  style={{
                    padding: "7px 10px",
                    borderRadius: "999px",
                    border: "1px solid rgba(148,163,184,0.18)",
                    background: "rgba(255,255,255,0.03)",
                    color: "#f8fbff",
                    fontWeight: 700,
                    fontSize: "12px",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  → חזרה
                </button>

                <a
                  href="/"
                  style={{
                    padding: "7px 10px",
                    borderRadius: "999px",
                    border: "1px solid rgba(148,163,184,0.18)",
                    background: "rgba(255,255,255,0.03)",
                    color: "#f8fbff",
                    fontWeight: 700,
                    fontSize: "12px",
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                  }}
                >
                  בית
                </a>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setFocusMode((v) => !v)}
                style={{
                  padding: "8px 12px",
                  borderRadius: "999px",
                  border: "1px solid rgba(56,189,248,0.34)",
                  background:
                    "linear-gradient(180deg, rgba(8,145,178,0.22) 0%, rgba(59,130,246,0.20) 100%)",
                  color: "#f8fbff",
                  fontWeight: 800,
                  fontSize: "13px",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                מצב מיקוד
              </button>
            )}
          </div>
        </section>

        {/* CONTEXT */}
        {!focusMode ? (
          <section
            style={{
              borderRadius: "18px",
              border: "1px solid rgba(125,211,252,0.14)",
              background:
                "linear-gradient(180deg, rgba(8,16,32,0.84) 0%, rgba(6,10,22,0.94) 100%)",
              padding: "10px 14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "14px",
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
              <span style={{ color: "rgba(180,220,255,0.76)" }}>תכנון פריסה</span>
              <span style={{ color: "rgba(125,211,252,0.7)" }}>•</span>
              <strong style={{ fontSize: "18px" }}>
                {tentType === "open" ? "שטח פתוח" : tentType === "30x20" ? "אוהל 30×20" : "אוהל 25×15"}
              </strong>
              <span style={{ color: "rgba(180,220,255,0.7)" }}>מעטפת תפעולית ראשית</span>
            </div>

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
              <TopPill label="תצוגה מקדימה" />
              <button
                type="button"
                onClick={saveScene}
                style={{
                  padding: "8px 12px",
                  borderRadius: "12px",
                  border: "1px solid rgba(148,163,184,0.18)",
                  background: "rgba(255,255,255,0.03)",
                  color: "#f8fbff",
                  fontSize: "13px",
                  fontWeight: 700,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "background 150ms ease",
                }}
              >
                שמירה
              </button>
              <TopPill label="ייצוא תוכנית" active />
            </div>
          </section>
        ) : null}

        {/* TENT SELECTOR */}
        {!focusMode ? (
          <section
            style={{
              borderRadius: "18px",
              border: "1px solid rgba(125,211,252,0.14)",
              background: "linear-gradient(180deg, rgba(7,13,26,0.86) 0%, rgba(5,10,20,0.94) 100%)",
              padding: "10px 14px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            <span style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.18em", color: "rgba(180,220,255,0.6)", marginInlineEnd: "4px" }}>
              סוג מבנה
            </span>
            {([
              { id: "25x15", label: "אוהל 25×15" },
              { id: "30x20", label: "אוהל 30×20" },
              { id: "open",  label: "שטח פתוח"  },
            ] as const).map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => setTentType(id)}
                style={{
                  padding: "7px 14px",
                  borderRadius: "11px",
                  border: tentType === id ? "1px solid rgba(56,189,248,0.48)" : "1px solid rgba(148,163,184,0.18)",
                  background: tentType === id ? "rgba(34,211,238,0.14)" : "rgba(255,255,255,0.03)",
                  color: "#f8fbff",
                  fontSize: "13px",
                  fontWeight: tentType === id ? 800 : 700,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all 150ms ease",
                }}
              >
                {label}
              </button>
            ))}
          </section>
        ) : null}

        {/* STEPS */}
        {!focusMode ? (
          <section
            style={{
              borderRadius: "18px",
              border: "1px solid rgba(125,211,252,0.14)",
              background: "linear-gradient(180deg, rgba(7,13,26,0.86) 0%, rgba(5,10,20,0.94) 100%)",
              padding: "10px 14px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            {([
              { step: 1 as const, label: "1. הגדרת סצנה" },
              { step: 2 as const, label: "2. נכסים ותוכן" },
              { step: 3 as const, label: "3. סקירה ומצגת" },
            ]).map(({ step, label }) => (
              <button
                key={step}
                type="button"
                onClick={() => {
                  setActiveStep(step);
                  if (step === 3) setFocusMode(true);
                  if (step !== 3) setFocusMode(false);
                }}
                style={{
                  padding: "8px 12px",
                  borderRadius: "12px",
                  border: activeStep === step ? "1px solid rgba(56,189,248,0.48)" : "1px solid rgba(148,163,184,0.18)",
                  background: activeStep === step ? "rgba(34,211,238,0.14)" : "rgba(255,255,255,0.03)",
                  color: "#f8fbff",
                  fontSize: "13px",
                  fontWeight: activeStep === step ? 800 : 700,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all 150ms ease",
                }}
              >
                {label}
              </button>
            ))}
          </section>
        ) : null}

        {/* WORKSPACE */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: focusMode ? "1fr" : "260px minmax(0, 1fr) 260px",
            gap: focusMode ? "0" : "18px",
            alignItems: "stretch",
            minHeight: focusMode ? "calc(100vh - 220px)" : "660px",
          }}
        >
          {!focusMode ? (
            <aside
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                minHeight: "100%",
              }}
            >
              <div
                style={{
                  borderRadius: "18px",
                  border: "1px solid rgba(125,211,252,0.14)",
                  background:
                    "linear-gradient(180deg, rgba(7,13,26,0.94) 0%, rgba(5,10,20,0.98) 100%)",
                  padding: "14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "10px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div
                    style={{
                      fontSize: "18px",
                      fontWeight: 800,
                      color: "#f8fbff",
                    }}
                  >
                    ספריית תצוגה
                  </div>
                  {sceneItems.length > 0 && (
                    <div style={{
                      background: "rgba(34,211,238,0.18)",
                      border: "1px solid rgba(34,211,238,0.4)",
                      color: "#67e8f9",
                      fontSize: "11px",
                      fontWeight: 800,
                      borderRadius: "999px",
                      padding: "2px 8px",
                    }}>
                      {sceneItems.length} בסצנה
                    </div>
                  )}
                </div>

                <div
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "12px",
                    border: "1px solid rgba(148,163,184,0.18)",
                    background: "rgba(255,255,255,0.03)",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgba(180,220,255,0.78)",
                    fontSize: "15px",
                    fontWeight: 800,
                  }}
                >
                  ⌕
                </div>
              </div>

              <div
                style={{
                  borderRadius: "18px",
                  border: "1px solid rgba(125,211,252,0.14)",
                  background:
                    "linear-gradient(180deg, rgba(7,13,26,0.94) 0%, rgba(5,10,20,0.98) 100%)",
                  padding: "12px",
                  display: "flex",
                  gap: "8px",
                  flexWrap: "wrap",
                }}
              >
                {(["הכל", "חלל", "אוויר", "יבשה", "ים"] as const).map((tag) => {
                  const sectionMap: Record<string, "all" | "space" | "air" | "land" | "naval"> = {
                    "הכל": "all", "חלל": "space", "אוויר": "air", "יבשה": "land", "ים": "naval",
                  };
                  const sec = sectionMap[tag];
                  const isActive = activeSection === sec;
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setActiveSection(sec)}
                      style={{
                        padding: "7px 10px",
                        borderRadius: "11px",
                        border: isActive
                          ? "1px solid rgba(56,189,248,0.42)"
                          : "1px solid rgba(148,163,184,0.18)",
                        background: isActive
                          ? "rgba(34,211,238,0.12)"
                          : "rgba(255,255,255,0.03)",
                        color: "#f8fbff",
                        fontSize: "12px",
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>

              <div
                style={{
                  borderRadius: "22px",
                  border: "1px solid rgba(125,211,252,0.14)",
                  background:
                    "linear-gradient(180deg, rgba(7,13,26,0.94) 0%, rgba(5,10,20,0.98) 100%)",
                  padding: "12px",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "10px",
                  flex: 1,
                  alignContent: "start",
                  overflowY: "auto",
                  maxHeight: "calc(100vh - 420px)",
                }}
              >
                {filteredExhibits.map((exhibit) => (
                  <SidebarItemCard
                    key={exhibit.slug}
                    item={exhibit.displayName}
                    image={exhibit.image}
                    onAdd={() => addItem(exhibit.slug)}
                  />
                ))}
              </div>
            </aside>
          ) : null}

          <section
            style={{
              position: "relative",
              borderRadius: focusMode ? "26px" : "30px",
              border: "1px solid rgba(125,211,252,0.14)",
              background:
                "linear-gradient(180deg, rgba(6,12,24,0.98) 0%, rgba(4,9,20,1) 100%)",
              padding: focusMode ? "14px" : "18px",
              overflow: "hidden",
              minHeight: focusMode ? "calc(100vh - 220px)" : "660px",
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.02)",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(circle at 50% 44%, rgba(20,60,140,0.18), transparent 40%)",
                pointerEvents: "none",
              }}
            />

            <div
              style={{
                position: "relative",
                zIndex: 2,
                display: "flex",
                justifyContent: "center",
                marginBottom: "18px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  padding: "8px 10px",
                  borderRadius: "14px",
                  border: "1px solid rgba(148,163,184,0.18)",
                  background: "rgba(8,16,32,0.78)",
                  boxShadow: "0 10px 28px rgba(0,0,0,0.22)",
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                {["Select", "Move", "Rotate", "Zoom", "View"].map((tool) => {
                  const isActive = activeTool === tool;
                  const isDisabled = false;
                  const tooltips: Record<string, string> = {
                    Select: "בחר פריט בסצנה",
                    Move: "גרור פריט על הרצפה",
                    Rotate: "סובב פריט נבחר 45°",
                    Zoom: "זום — תצוגת אוהל",
                    View: "חזור למבט כללי",
                  };
                  function handleToolClick() {
                    setActiveTool(tool);
                    if (tool === "Rotate" && selectedItemId) rotateItem(selectedItemId);
                    if (tool === "Zoom") setCameraMode("tent");
                    if (tool === "View") setCameraMode("overview");
                  }
                  return (
                    <button
                      key={tool}
                      type="button"
                      onClick={handleToolClick}
                      title={tooltips[tool]}
                      style={{
                        padding: "8px 12px",
                        borderRadius: "11px",
                        border: isActive
                          ? "1px solid rgba(0,229,255,0.60)"
                          : "1px solid rgba(148,163,184,0.18)",
                        background: isActive
                          ? "rgba(0,229,255,0.16)"
                          : "rgba(255,255,255,0.03)",
                        color: isActive ? "#00e5ff" : isDisabled ? "rgba(248,251,255,0.3)" : "#f8fbff",
                        fontSize: "13px",
                        fontWeight: isActive ? 800 : 700,
                        cursor: isDisabled ? "not-allowed" : "pointer",
                        opacity: isDisabled ? 0.45 : 1,
                        transition: "all 150ms ease",
                      }}
                    >
                      {tool}
                    </button>
                  );
                })}

                {/* Separator */}
                <div style={{ width: "1px", height: "22px", background: "rgba(148,163,184,0.18)", margin: "0 4px" }} />

                {/* Camera preset buttons */}
                {(["overview", "tent"] as CameraMode[]).map((mode) => {
                  const label = mode === "overview" ? "🌐 סקירה" : "⛺ כניסה לאוהל";
                  const isActive = cameraMode === mode;
                  return (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setCameraMode(mode)}
                      style={{
                        padding: "8px 14px",
                        borderRadius: "11px",
                        border: isActive
                          ? "1px solid rgba(56,189,248,0.60)"
                          : "1px solid rgba(148,163,184,0.18)",
                        background: isActive
                          ? "rgba(56,189,248,0.16)"
                          : "rgba(255,255,255,0.03)",
                        color: isActive ? "#7dd3fc" : "#f8fbff",
                        fontSize: "12px",
                        fontWeight: isActive ? 800 : 700,
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                        transition: "all 150ms ease",
                      }}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div
              style={{
                position: "relative",
                zIndex: 1,
                height: focusMode ? "calc(100vh - 300px)" : "calc(100vh - 280px)",
                minHeight: "600px",
                borderRadius: "26px",
                overflow: "hidden",
                background:
                  "linear-gradient(rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.08) 1px, transparent 1px), radial-gradient(circle at 50% 40%, rgba(29,78,216,0.34), rgba(2,6,23,0.96) 70%)",
                backgroundSize: "28px 28px, 28px 28px, cover",
                border: "1px solid rgba(125,211,252,0.10)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "radial-gradient(circle at 50% 18%, rgba(59,130,246,0.12), transparent 28%)",
                  pointerEvents: "none",
                }}
              />

              <div
                style={{
                  position: "absolute",
                  left: "6%",
                  right: "6%",
                  bottom: "7%",
                  height: "34%",
                  background:
                    "radial-gradient(ellipse at center, rgba(59,130,246,0.22), rgba(37,99,235,0.04) 48%, transparent 74%)",
                  filter: "blur(26px)",
                  pointerEvents: "none",
                }}
              />

              <div
                style={{
                  position: "absolute",
                  left: "10%",
                  right: "10%",
                  bottom: "13%",
                  height: "30%",
                  clipPath: "polygon(12% 0%, 88% 0%, 100% 55%, 88% 100%, 12% 100%, 0% 55%)",
                  border: "2px solid rgba(56,189,248,0.92)",
                  boxShadow:
                    "0 0 18px rgba(34,211,238,0.30), 0 0 46px rgba(37,99,235,0.22), inset 0 0 28px rgba(56,189,248,0.06)",
                  background:
                    "linear-gradient(180deg, rgba(14,165,233,0.03) 0%, rgba(37,99,235,0.06) 100%)",
                  pointerEvents: "none",
                }}
              />

              <div
                style={{
                  position: "absolute",
                  inset: "8% 5% 12%",
                  borderRadius: "32px",
                  border: "2px solid rgba(56,189,248,0.92)",
                  boxShadow:
                    "0 0 14px rgba(34,211,238,0.28), 0 0 36px rgba(37,99,235,0.20), inset 0 0 24px rgba(56,189,248,0.06)",
                  pointerEvents: "none",
                }}
              />



              <div
                style={{
                  position: "absolute",
                  inset: "10% 8% 15%",
                  zIndex: 2,
                  pointerEvents: "auto",
                }}
              >
                <TentStage3D
                  items={sceneItems}
                  selectedId={selectedItemId}
                  onSelect={setSelectedItemId}
                  cameraMode={cameraMode}
                  activeTool={activeTool}
                  onMoveItem={moveItem}
                  tentType={tentType}
                />
              </div>

              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  bottom: "7%",
                  transform: "translateX(-50%)",
                  zIndex: 3,
                  padding: "8px 12px",
                  borderRadius: "999px",
                  border: "1px solid rgba(103,232,249,0.24)",
                  background: "rgba(4,10,20,0.58)",
                  color: "#dff7ff",
                  fontSize: focusMode ? "11px" : "12px",
                  fontWeight: 800,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                  boxShadow: "0 10px 22px rgba(0,0,0,0.18)",
                }}
              >
                אוהל נטען
              </div>
            </div>
          </section>

          {!focusMode ? (
            <aside
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                minHeight: "100%",
              }}
            >
              <div
                style={{
                  borderRadius: "18px",
                  border: "1px solid rgba(125,211,252,0.14)",
                  background:
                    "linear-gradient(180deg, rgba(7,13,26,0.94) 0%, rgba(5,10,20,0.98) 100%)",
                  padding: "14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "10px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div
                    style={{
                      fontSize: "18px",
                      fontWeight: 800,
                      color: "#f8fbff",
                    }}
                  >
                    פנים ומלאי
                  </div>
                  {sceneItems.length > 0 && (
                    <div style={{
                      background: "rgba(34,211,238,0.18)",
                      border: "1px solid rgba(34,211,238,0.4)",
                      color: "#67e8f9",
                      fontSize: "11px",
                      fontWeight: 800,
                      borderRadius: "999px",
                      padding: "2px 8px",
                    }}>
                      {sceneItems.length} בסצנה
                    </div>
                  )}
                </div>

                <div
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "12px",
                    border: "1px solid rgba(148,163,184,0.18)",
                    background: "rgba(255,255,255,0.03)",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgba(180,220,255,0.78)",
                    fontSize: "15px",
                    fontWeight: 800,
                  }}
                >
                  ⌕
                </div>
              </div>

              <div
                style={{
                  borderRadius: "18px",
                  border: "1px solid rgba(125,211,252,0.14)",
                  background:
                    "linear-gradient(180deg, rgba(7,13,26,0.94) 0%, rgba(5,10,20,0.98) 100%)",
                  padding: "12px",
                  display: "flex",
                  gap: "8px",
                  flexWrap: "wrap",
                }}
              >
                {(["הכל", "ריהוט", "מדיה", "VIP", "שירות"] as const).map((tag) => {
                  const isActive = activeInventoryFilter === tag;
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setActiveInventoryFilter(tag)}
                      style={{
                        padding: "7px 10px",
                        borderRadius: "11px",
                        border: isActive
                          ? "1px solid rgba(56,189,248,0.42)"
                          : "1px solid rgba(148,163,184,0.18)",
                        background: isActive
                          ? "rgba(34,211,238,0.12)"
                          : "rgba(255,255,255,0.03)",
                        color: "#f8fbff",
                        fontSize: "12px",
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>

              <div
                style={{
                  borderRadius: "22px",
                  border: "1px solid rgba(125,211,252,0.14)",
                  background:
                    "linear-gradient(180deg, rgba(7,13,26,0.94) 0%, rgba(5,10,20,0.98) 100%)",
                  padding: "12px",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "10px",
                  flex: 1,
                  alignContent: "start",
                  overflowY: "auto",
                  maxHeight: "calc(100vh - 420px)",
                }}
              >
                {filteredInventory.map((item) => (
                  <SidebarItemCard key={item} item={item} onAdd={() => addItem(item)} />
                ))}
              </div>
            </aside>
          ) : null}
        </section>
        {/* ITEM CONTROL PANEL */}
        {selectedItem !== null && (
          <section
            style={{
              marginTop: "14px",
              borderRadius: "20px",
              border: "1px solid rgba(0,229,255,0.28)",
              background:
                "linear-gradient(180deg, rgba(0,30,55,0.96) 0%, rgba(4,12,26,0.98) 100%)",
              padding: "16px 20px",
              boxShadow: "0 0 32px rgba(0,229,255,0.10)",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "20px",
            }}
          >
            {/* Name badge */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                minWidth: "160px",
              }}
            >
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "999px",
                  background: "#00e5ff",
                  boxShadow: "0 0 8px #00e5ff",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: 800,
                  color: "#f0faff",
                  letterSpacing: "0.04em",
                }}
              >
                {selectedDisplayName}
              </span>
            </div>

            {/* X slider */}
            <SliderControl
              label="X"
              min={-10}
              max={10}
              step={0.1}
              value={selectedItem.position[0]}
              onChange={(v) => updateItemX(selectedItemId!, v)}
            />

            {/* Z slider */}
            <SliderControl
              label="Z"
              min={-10}
              max={10}
              step={0.1}
              value={selectedItem.position[2]}
              onChange={(v) => updateItemZ(selectedItemId!, v)}
            />

            {/* Scale slider */}
            <SliderControl
              label="גודל"
              min={0.3}
              max={2.0}
              step={0.05}
              value={selectedItem.scale}
              onChange={(v) => updateItemScale(selectedItemId!, v)}
            />

            {/* Actions */}
            <div style={{ display: "flex", gap: "8px", marginLeft: "auto", flexShrink: 0 }}>
              <button
                type="button"
                onClick={() => rotateItem(selectedItemId!)}
                style={{
                  padding: "9px 16px",
                  borderRadius: "12px",
                  border: "1px solid rgba(0,229,255,0.40)",
                  background: "rgba(0,229,255,0.10)",
                  color: "#00e5ff",
                  fontSize: "13px",
                  fontWeight: 700,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                ↺ סיבוב 90°
              </button>
              <button
                type="button"
                onClick={() => deleteItem(selectedItemId!)}
                style={{
                  padding: "9px 16px",
                  borderRadius: "12px",
                  border: "1px solid rgba(239,68,68,0.40)",
                  background: "rgba(239,68,68,0.10)",
                  color: "#fca5a5",
                  fontSize: "13px",
                  fontWeight: 700,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                מחיקה
              </button>
            </div>
          </section>
        )}

        {/* CLEAR ALL + BOTTOM STATUS */}
        {sceneItems.length > 0 && (
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
            <button
              type="button"
              onClick={() => { setSceneItems([]); setSelectedItemId(null); }}
              style={{
                padding: "9px 18px",
                borderRadius: "12px",
                border: "1px solid rgba(239,68,68,0.38)",
                background: "rgba(239,68,68,0.10)",
                color: "#fca5a5",
                fontSize: "13px",
                fontWeight: 700,
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              נקה הכל
            </button>
          </div>
        )}

        {/* BOTTOM STATUS */}
        <section
          style={{
            marginTop: focusMode ? "10px" : "14px",
            borderRadius: "20px",
            border: "1px solid rgba(125,211,252,0.16)",
            background:
              "linear-gradient(180deg, rgba(8,14,28,0.94) 0%, rgba(5,10,20,0.99) 100%)",
            padding: focusMode ? "9px 11px" : "15px 18px",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)",
            display: "grid",
            gridTemplateColumns: focusMode
              ? "repeat(6, minmax(0, 1fr))"
              : "1.3fr repeat(5, minmax(0, 1fr))",
            gap: "14px",
            alignItems: "stretch",
          }}
        >
          {statusItems.map(([value, label], idx) => (
            <div
              key={label}
              style={{
                borderRadius: "16px",
                border: "1px solid rgba(148,163,184,0.16)",
                background: idx === 5 ? "linear-gradient(180deg, rgba(34,211,238,0.14) 0%, rgba(59,130,246,0.10) 100%)" : "linear-gradient(180deg, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.02) 100%)",
                padding: focusMode ? "9px 11px" : "13px 15px",
                boxShadow: "0 8px 20px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.03)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                minHeight: focusMode ? "58px" : "78px",
              }}
            >
              <div
                style={{
                  fontSize:
                    idx === 0
                      ? focusMode
                        ? "18px"
                        : "22px"
                      : focusMode
                        ? "20px"
                        : "24px",
                  fontWeight: 800,
                  color: idx === 5 ? "#67e8f9" : "#f8fbff",
                  marginBottom: "5px",
                }}
              >
                {label === "רכיבים" ? sceneItems.length : value}
              </div>

              <div
                style={{
                  fontSize: focusMode ? "10px" : "12px",
                  color: "rgba(188,226,255,0.74)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </section>
      </div>

      {/* Save toast */}
      {toastVisible && (
        <div
          style={{
            position: "fixed",
            bottom: "32px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 9999,
            padding: "12px 24px",
            borderRadius: "14px",
            border: "1px solid rgba(0,229,255,0.40)",
            background: "rgba(0,20,40,0.96)",
            color: "#00e5ff",
            fontSize: "14px",
            fontWeight: 800,
            letterSpacing: "0.04em",
            boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 24px rgba(0,229,255,0.14)",
            pointerEvents: "none",
          }}
        >
          נשמר בהצלחה ✓
        </div>
      )}
    </main>
  );
}
