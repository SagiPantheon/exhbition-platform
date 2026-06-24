"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Html, OrbitControls, PerspectiveCamera, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import emailjs from "@emailjs/browser";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { masterExhibits } from "../../data/masterExhibits";

// ─── EmailJS setup ────────────────────────────────────────────────────────────
// 1. Sign up at https://www.emailjs.com/ (free tier: 200 emails/month)
// 2. Dashboard → Email Services → Add New Service (Gmail / Outlook / SMTP)
//    Copy the Service ID → EMAILJS_SERVICE_ID
// 3. Dashboard → Email Templates → Create Template
//    Use these template variables:
//      {{exhibition_name}}  — subject / header
//      {{tent_info}}        — e.g. "אוהל 25×15 | 25m × 15m"
//      {{items_list}}       — numbered list of scene items
//      {{date}}             — send date
//    In the HTML body add: <img src="{{canvas_image}}" style="max-width:100%"/>
//    Set "To Email" to: samiel2@iai.co.il
//    Copy the Template ID → EMAILJS_TEMPLATE_ID
// 4. Dashboard → Account → API Keys → Public Key → EMAILJS_PUBLIC_KEY
// ──────────────────────────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = "service_sp9ss0u";
const EMAILJS_TEMPLATE_ID = "template_4et8z95";
const EMAILJS_PUBLIC_KEY  = "u4ZFljZ4yJe2cuKZV";

async function uploadToImgbb(base64: string): Promise<string> {
  const apiKey = "1b07032c9c2cb8e803460234f5245932";
  const base64Data = base64.replace(/^data:image\/\w+;base64,/, "");
  const formData = new FormData();
  formData.append("image", base64Data);
  const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
    method: "POST",
    body: formData,
  });
  const data = await res.json();
  return data.data.url;
}

async function sendExhibitionEmail(params: {
  exhibitionName: string;
  tentInfo: string;
  itemsList: string;
  date: string;
  canvasDataUrl: string;
}) {
  const imageUrl = await uploadToImgbb(params.canvasDataUrl);
  return emailjs.send(
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
    {
      to_email:        "amiel.sagi@gmail.com",
      exhibition_name: params.exhibitionName || "תכנית תצוגה",
      tent_info:       params.tentInfo,
      items_list:      params.itemsList,
      date:            params.date,
      canvas_image:    imageUrl,
    },
    EMAILJS_PUBLIC_KEY,
  );
}

const DIVISION_TO_SECTION: Record<string, string> = {
  teufa: "air",
  mtach: "air",
  elta:  "air",
  kataz: "air",
};

const EXHIBIT_ITEMS = masterExhibits
  .filter((e) => e.division !== "inventory")
  .map((e) => ({
    slug: e.slug,
    section: DIVISION_TO_SECTION[e.division] ?? e.division,
    displayName: e.nameHe,
    image: e.image,
    model3d: e.model3d,
  }));

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

const previewMap: Record<string, string> = Object.fromEntries(
  masterExhibits
    .filter((e) => e.division === "inventory" && e.image)
    .map((e) => [e.nameHe, e.image])
);

type SceneItem = {
  id: string;
  type: string;
  position: [number, number, number];
  rotationY: number;
  scale: number;
  label?: string;
};

type SignItem = {
  id: string;
  text: string;
  position: [number, number, number];
  color: string;
  rotationY?: number;
};

type BracketItem = {
  id: string;
  text: string;
  position: [number, number, number];
  width: number;
  color: string;
  rotationY?: number;
};

function BracketSign({
  bracket,
  isSelected,
  onSelect,
  draggingId,
  activeTool,
}: {
  bracket: BracketItem;
  isSelected: boolean;
  onSelect: () => void;
  draggingId: { current: string | null };
  activeTool: string;
}) {
  const hw = bracket.width / 2;
  const h = 1.2;
  const lineMesh = useMemo(() => {
    const points = [
      new THREE.Vector3(-hw, 0, 0),
      new THREE.Vector3(-hw, h, 0),
      new THREE.Vector3(hw, h, 0),
      new THREE.Vector3(hw, 0, 0),
    ];
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    const mat = new THREE.LineBasicMaterial({ color: bracket.color });
    return new THREE.Line(geo, mat);
  }, [hw, bracket.color]);

  return (
    <group position={bracket.position} rotation={[0, bracket.rotationY ?? 0, 0]}>
      {/* Hit mesh */}
      <mesh
        onClick={(e) => { e.stopPropagation(); onSelect(); }}
        onPointerDown={(e) => { e.stopPropagation(); if (activeTool === "Move") { onSelect(); draggingId.current = bracket.id; } }}
      >
        <planeGeometry args={[bracket.width + 0.5, 1.5]} />
        <meshStandardMaterial transparent opacity={isSelected ? 0.12 : 0} color={bracket.color} />
      </mesh>
      <primitive object={lineMesh} />
      <arrowHelper args={[new THREE.Vector3(0, -1, 0), new THREE.Vector3(-hw, 0, 0), 0.4, bracket.color]} />
      <arrowHelper args={[new THREE.Vector3(0, -1, 0), new THREE.Vector3(hw, 0, 0), 0.4, bracket.color]} />
      <Html position={[0, h + 0.1, 0]} center distanceFactor={8} style={{ pointerEvents: "none" }}>
        <div style={{
          color: bracket.color,
          fontSize: "20px",
          fontWeight: 900,
          textShadow: `0 0 10px ${bracket.color}, 0 0 20px ${bracket.color}`,
          whiteSpace: "nowrap",
          background: "rgba(0,0,0,0.5)",
          padding: "3px 14px",
          borderRadius: "6px",
          pointerEvents: "none",
          outline: isSelected ? `2px solid ${bracket.color}` : "none",
        }}>
          {bracket.text}
        </div>
      </Html>
    </group>
  );
}

function SceneInvalidator({ signs, snapGlowId, showLabels }: { signs: SignItem[]; snapGlowId: string | null; showLabels: boolean }) {
  const { invalidate } = useThree();
  useEffect(() => { invalidate(); }, [signs, snapGlowId, showLabels, invalidate]);
  return null;
}

function NeonSign({
  sign,
  isSelected,
  onSelect,
  draggingId,
  activeTool,
}: {
  sign: SignItem;
  isSelected: boolean;
  onSelect: () => void;
  draggingId: { current: string | null };
  activeTool: string;
}) {
  return (
    <group
      position={sign.position}
      rotation={[0, sign.rotationY ?? 0, 0]}
    >
      <mesh
        onClick={(e) => { e.stopPropagation(); onSelect(); }}
        onPointerDown={(e) => { e.stopPropagation(); if (activeTool === "Move") { onSelect(); draggingId.current = sign.id; } }}
      >
        <planeGeometry args={[6, 1.2]} />
        <meshStandardMaterial
          color={sign.color}
          transparent
          opacity={isSelected ? 0.25 : 0.08}
          emissive={sign.color}
          emissiveIntensity={isSelected ? 1 : 0.3}
        />
      </mesh>

      <lineSegments visible={isSelected}>
        <edgesGeometry args={[new THREE.BoxGeometry(6.2, 1.3, 0.01)]} />
        <lineBasicMaterial color={sign.color} linewidth={2} />
      </lineSegments>

      <Html center distanceFactor={8} style={{ pointerEvents: "none" }}>
        <div style={{
          color: sign.color,
          fontSize: "26px",
          fontWeight: 900,
          textShadow: `0 0 10px ${sign.color}, 0 0 20px ${sign.color}, 0 0 40px ${sign.color}`,
          whiteSpace: "nowrap",
          pointerEvents: "none",
          fontFamily: "sans-serif",
          letterSpacing: "0.1em",
          background: "rgba(0,0,0,0.5)",
          padding: "4px 16px",
          borderRadius: "6px",
        }}>
          {sign.text}
        </div>
      </Html>
    </group>
  );
}

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

const TENT_MODEL_PATH = "/models/inventory/tent-20-30-iai-01.glb";
const HANGAR_MODEL_PATH = "/scenes/hangar.glb";

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


function HangarModel3D() {
  const gltf = useGLTF(HANGAR_MODEL_PATH);
  const cloned = useMemo(() => {
    const scene = gltf.scene.clone(true);
    scene.traverse((child: any) => {
      if (child.isMesh && child.material) {
        const mats = Array.isArray(child.material) ? child.material : [child.material];
        mats.forEach((mat: any) => {
          mat.emissive = new THREE.Color("#001a44");
          mat.emissiveIntensity = 0.4;
        });
      }
    });
    return scene;
  }, [gltf.scene]);
  return <primitive object={cloned} position={[0, -1.45, 0]} rotation={[0, 0, 0]} scale={12} />;
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

function InventoryTable3D({ position = [0, 0, 0] as [number, number, number] }) {
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

function InventoryChair3D({ position = [0, 0, 0] as [number, number, number], rotationY = 0 }) {
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

function InventoryScreen3D({ position = [0, 0, 0] as [number, number, number], rotationY = 0 }) {
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

const itemModelMap: Record<string, string> = Object.fromEntries([
  // slug → model for all exhibit items
  ...masterExhibits.map((e): [string, string] => [e.slug, e.hasModel ? e.model3d : ""]),
  // Hebrew nameHe → model for inventory panel items (keyed by display name)
  ...masterExhibits
    .filter((e) => e.division === "inventory")
    .map((e): [string, string] => [e.nameHe, e.hasModel ? e.model3d : ""]),
]);

const FALLBACK_MODEL = "/models/inventory/flags-iai-01.glb";

const PEDESTAL_DIMS: Record<string, [number, number, number]> = {
  "בסיס תצוגה קטן":    [0.6, 0.8, 0.6],
  "בסיס תצוגה בינוני": [0.8, 1.0, 0.8],
  "בסיס תצוגה גדול":   [1.0, 1.2, 1.0],
};

function PedestalItem({
  item,
  isSelected,
  snapGlowId,
  onSelect,
  activeTool,
  draggingId,
}: {
  item: SceneItem;
  isSelected: boolean;
  snapGlowId: string | null;
  onSelect: () => void;
  activeTool: string;
  draggingId: { current: string | null };
}) {
  const [w, h, d] = PEDESTAL_DIMS[item.type] ?? [0.6, 0.8, 0.6];
  const isGlowing = snapGlowId === item.id;
  return (
    <>
      <group
        position={item.position}
        rotation={[0, item.rotationY, 0]}
        scale={item.scale}
        onClick={(e) => { e.stopPropagation(); onSelect(); }}
        onPointerDown={(e) => {
          if (activeTool === "Move" || activeTool === "Rotate") {
            e.stopPropagation();
            onSelect();
            draggingId.current = item.id;
          }
        }}
      >
        <mesh position={[0, h / 2, 0]} castShadow receiveShadow>
          <boxGeometry args={[w, h, d]} />
          <meshStandardMaterial color="#ffffff" roughness={0.22} metalness={0.04} />
        </mesh>
      </group>
      {isSelected && (
        <mesh
          position={[item.position[0], -1.35, item.position[2]]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <ringGeometry args={[0.9, 1.25, 48]} />
          <meshBasicMaterial color="#00e5ff" transparent opacity={0.3} />
        </mesh>
      )}
      {isGlowing && (
        <mesh
          position={[item.position[0], -1.38 + h / 2, item.position[2]]}
          rotation={[0, 0, 0]}
        >
          <boxGeometry args={[w + 0.08, h + 0.08, d + 0.08]} />
          <meshBasicMaterial color="#00e5ff" transparent opacity={0.35} />
        </mesh>
      )}
    </>
  );
}

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
  const modelPath = itemModelMap[item.type] || FALLBACK_MODEL;
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
          if (activeTool === "Move" || activeTool === "Rotate") {
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
          <meshBasicMaterial color="#00e5ff" transparent opacity={0.3} />
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
  const { camera, invalidate } = useThree();
  const controlsRef = useRef<any>(null);
  const animating = useRef(false);

  useEffect(() => { animating.current = true; invalidate(); }, [mode]);

  useFrame(() => {
    if (!controlsRef.current) return;
    controlsRef.current.enabled = draggingId.current === null;
    if (!animating.current) return;
    const { pos, look } = CAM_PRESETS[mode];
    camera.position.lerp(pos, 0.12);
    controlsRef.current.target.lerp(look, 0.12);
    controlsRef.current.update();
    invalidate();
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
      onChange={() => invalidate()}
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

function SpotFixture({ position, dramaticLight }: { position: [number, number, number]; dramaticLight: boolean }) {
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
      {/* Warm downlight from top of pole */}
      <spotLight
        position={[0, 1.2, 0]}
        color={dramaticLight ? "#FFFFFF" : "#FFE4A0"}
        intensity={dramaticLight ? 60 : 8}
        angle={dramaticLight ? 0.25 : 0.35}
        penumbra={dramaticLight ? 0.1 : 0.3}
        distance={dramaticLight ? 50 : 35}
      >
        <object3D attach="target" position={[0, -3, 0]} />
      </spotLight>
    </group>
  );
}

function DragHandler({
  draggingId,
  onMoveItem,
  onMoveSign,
  signIds,
  onMoveBracket,
  bracketIds,
  onDrop,
  activeTool,
  onRotateItem,
}: {
  draggingId: { current: string | null };
  onMoveItem: (id: string, x: number, z: number) => void;
  onMoveSign?: (id: string, x: number, z: number) => void;
  signIds?: string[];
  onMoveBracket?: (id: string, x: number, z: number) => void;
  bracketIds?: string[];
  onDrop?: (id: string) => void;
  activeTool: string;
  onRotateItem?: (id: string, delta: number) => void;
}) {
  const { camera, gl } = useThree();
  const floorPlane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 1, 0), 1.38), []);
  const ray = useMemo(() => new THREE.Raycaster(), []);
  const onMoveRef = useRef(onMoveItem);
  onMoveRef.current = onMoveItem;
  const onMoveSignRef = useRef(onMoveSign);
  onMoveSignRef.current = onMoveSign;
  const signIdsRef = useRef(signIds ?? []);
  signIdsRef.current = signIds ?? [];
  const onMoveBracketRef = useRef(onMoveBracket);
  onMoveBracketRef.current = onMoveBracket;
  const bracketIdsRef = useRef(bracketIds ?? []);
  bracketIdsRef.current = bracketIds ?? [];
  const activeToolRef = useRef(activeTool);
  activeToolRef.current = activeTool;
  const onRotateRef = useRef(onRotateItem);
  onRotateRef.current = onRotateItem;
  const lastXRef = useRef<number | null>(null);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!draggingId.current) return;
      if (activeToolRef.current === "Rotate") {
        if (lastXRef.current !== null) {
          const delta = (e.clientX - lastXRef.current) * 0.012;
          onRotateRef.current?.(draggingId.current, delta);
        }
        lastXRef.current = e.clientX;
        return;
      }
      const rect = gl.domElement.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      ray.setFromCamera(new THREE.Vector2(nx, ny), camera);
      const hit = new THREE.Vector3();
      if (ray.ray.intersectPlane(floorPlane, hit)) {
        if (bracketIdsRef.current.includes(draggingId.current) && onMoveBracketRef.current) {
          onMoveBracketRef.current(draggingId.current, hit.x, hit.z);
        } else if (signIdsRef.current.includes(draggingId.current) && onMoveSignRef.current) {
          onMoveSignRef.current(draggingId.current, hit.x, hit.z);
        } else {
          onMoveRef.current(draggingId.current, hit.x, hit.z);
        }
      }
    };
    const onUp = () => {
      if (draggingId.current) onDrop?.(draggingId.current);
      draggingId.current = null;
      lastXRef.current = null;
    };
    gl.domElement.addEventListener("pointermove", onMove);
    gl.domElement.addEventListener("pointerup", onUp);
    return () => {
      gl.domElement.removeEventListener("pointermove", onMove);
      gl.domElement.removeEventListener("pointerup", onUp);
    };
  }, [camera, gl, floorPlane, ray, draggingId]);

  return null;
}

function CaptureSetup({ captureRef }: { captureRef: React.MutableRefObject<(() => string) | null> }) {
  const { gl } = useThree();
  useEffect(() => {
    captureRef.current = () => gl.domElement.toDataURL("image/jpeg", 0.4);
    return () => { captureRef.current = null; };
  }, [gl, captureRef]);
  return null;
}

function TentStage3D({
  items,
  selectedId,
  onSelect,
  cameraMode,
  activeTool,
  onMoveItem,
  onDrop,
  tentType,
  captureRef,
  dramaticLight,
  signs,
  showSigns,
  showLabels,
  snapGlowId,
  selectedSignId,
  onSelectSign,
  onMoveSign,
  brackets,
  selectedBracketId,
  onSelectBracket,
  onMoveBracket,
  onRotateItem,
}: {
  items: SceneItem[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  cameraMode: CameraMode;
  activeTool: string;
  onMoveItem: (id: string, x: number, z: number) => void;
  onDrop?: (id: string) => void;
  tentType: string;
  captureRef: React.MutableRefObject<(() => string) | null>;
  dramaticLight: boolean;
  signs: SignItem[];
  showSigns: boolean;
  showLabels: boolean;
  snapGlowId: string | null;
  selectedSignId: string | null;
  onSelectSign: (id: string | null) => void;
  onMoveSign: (id: string, x: number, z: number) => void;
  brackets: BracketItem[];
  selectedBracketId: string | null;
  onSelectBracket: (id: string | null) => void;
  onMoveBracket: (id: string, x: number, z: number) => void;
  onRotateItem: (id: string, delta: number) => void;
}) {
  const draggingId = useRef<string | null>(null);
  const signIds = useMemo(() => signs.map((s) => s.id), [signs]);
  const bracketIds = useMemo(() => brackets.map((b) => b.id), [brackets]);

  return (
    <Canvas
      shadows
      frameloop="demand"
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <PerspectiveCamera makeDefault position={[10, 8, 10]} fov={40} />
      <SceneInvalidator signs={signs} snapGlowId={snapGlowId} showLabels={showLabels} />
      <ambientLight intensity={dramaticLight ? 0.2 : 1.2} />
      <directionalLight position={[7, 10, 6]} intensity={dramaticLight ? 0.3 : 1.8} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
      <directionalLight position={[-5, 4, -4]} intensity={dramaticLight ? 0.1 : 0.25} />
      {!dramaticLight && (
        <>
          <pointLight position={[0, -0.5, 0]}   intensity={2}   color="#FFE4A0" distance={20} />
          <pointLight position={[5, -0.5, 5]}    intensity={1.5} color="#FFE4A0" distance={15} />
          <pointLight position={[-5, -0.5, -5]}  intensity={1.5} color="#FFE4A0" distance={15} />
        </>
      )}

      {/* Corner spotlights — dramatic downlighting */}
      <spotLight position={[-10, 16, -10]} intensity={8.0} angle={0.2} penumbra={0.95} color="#4488ff" />
      <spotLight position={[ 10, 16, -10]} intensity={8.0} angle={0.2} penumbra={0.95} color="#4488ff" />
      <spotLight position={[-10, 16,  10]} intensity={8.0} angle={0.2} penumbra={0.95} color="#4488ff" />
      <spotLight position={[ 10, 16,  10]} intensity={8.0} angle={0.2} penumbra={0.95} color="#4488ff" />

      {/* Open sky area floodlights */}
      {tentType === "open" && (
        <>
          <spotLight position={[-12, 8, -7]} intensity={3} angle={0.4} penumbra={0.5} color="#ffffff" target-position={[0, 0, 0]} />
          <spotLight position={[ 12, 8, -7]} intensity={3} angle={0.4} penumbra={0.5} color="#ffffff" target-position={[0, 0, 0]} />
          <spotLight position={[-12, 8,  7]} intensity={3} angle={0.4} penumbra={0.5} color="#ffffff" target-position={[0, 0, 0]} />
          <spotLight position={[ 12, 8,  7]} intensity={3} angle={0.4} penumbra={0.5} color="#ffffff" target-position={[0, 0, 0]} />
        </>
      )}

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
          {tentType === "25x15" && <TentModel3D tentScale={12} />}
          {tentType === "30x20" && <TentModel3D tentScale={15} />}
          {tentType === "open"   && <OpenAreaOutline />}
          {tentType === "hangar" && <HangarModel3D />}
          {items.map((item) =>
            PEDESTAL_DIMS[item.type] ? (
              <PedestalItem
                key={item.id}
                item={item}
                isSelected={item.id === selectedId}
                snapGlowId={snapGlowId}
                onSelect={() => onSelect(item.id)}
                activeTool={activeTool}
                draggingId={draggingId}
              />
            ) : (
              <DynamicItem
                key={item.id}
                item={item}
                isSelected={item.id === selectedId}
                onSelect={() => onSelect(item.id)}
                activeTool={activeTool}
                draggingId={draggingId}
              />
            )
          )}
          {tentType === "open" && showSigns && signs.map((sign) => (
            <NeonSign
              key={sign.id}
              sign={sign}
              isSelected={sign.id === selectedSignId}
              onSelect={() => onSelectSign(sign.id)}
              draggingId={draggingId}
              activeTool={activeTool}
            />
          ))}
          {tentType === "open" && showSigns && brackets.map((b) => (
            <BracketSign
              key={b.id}
              bracket={b}
              isSelected={b.id === selectedBracketId}
              onSelect={() => onSelectBracket(b.id)}
              draggingId={draggingId}
              activeTool={activeTool}
            />
          ))}
        </>
      </Suspense>

      {/* Item type labels (showLabels toggle) */}
      {showLabels && items.filter((item) =>
        !PEDESTAL_DIMS[item.type] && EXHIBIT_ITEMS.some((e) => e.slug === item.type)
      ).map((item) => (
        <Html
          key={`lbl-${item.id}`}
          position={[item.position[0], item.position[1] + 1.5, item.position[2]]}
          center
          style={{ pointerEvents: "none" }}
        >
          <div style={{ background: "rgba(0,10,20,0.85)", color: "#00e5ff", padding: "3px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: 700, whiteSpace: "nowrap", border: "1px solid rgba(0,229,255,0.3)", backdropFilter: "blur(4px)" }}>
            {item.label ?? item.type}
          </div>
        </Html>
      ))}

      {/* Pedestal custom labels (always visible when label set) */}
      {!showLabels && items.map((item) => item.label ? (
        <Html
          key={`plbl-${item.id}`}
          position={[item.position[0], item.position[1] + 1.5, item.position[2]]}
          center
          style={{ pointerEvents: "none" }}
        >
          <div style={{ background: "rgba(0,10,20,0.9)", color: "#00e5ff", padding: "4px 10px", borderRadius: "8px", fontSize: "13px", fontWeight: 800, whiteSpace: "nowrap", border: "1px solid #00e5ff", boxShadow: "0 0 10px rgba(0,229,255,0.45)", backdropFilter: "blur(4px)" }}>
            {item.label}
          </div>
        </Html>
      ) : null)}

      <DragHandler
        draggingId={draggingId}
        onMoveItem={onMoveItem}
        onMoveSign={onMoveSign}
        signIds={signIds}
        onMoveBracket={onMoveBracket}
        bracketIds={bracketIds}
        onDrop={onDrop}
        activeTool={activeTool}
        onRotateItem={onRotateItem}
      />

      {/* Invisible deselect plane — clicking empty floor deselects */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.37, 0]}
        onClick={(e) => { e.stopPropagation(); if (!draggingId.current) { onSelect(null); onSelectSign(null); } }}
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
      <pointLight position={[0, -1.3, 0]} color="#0022aa" intensity={0.8} distance={18} />

      {/* Hexagonal neon border ring */}
      <HexBorder />

      {/* Spotlight fixtures at hexagon corners — radius 16, angle = (PI/3)*i - PI/6 */}
      <SpotFixture position={[ 13.86, -1.38,  -8.0]} dramaticLight={dramaticLight} />
      <SpotFixture position={[ 13.86, -1.38,   8.0]} dramaticLight={dramaticLight} />
      <SpotFixture position={[  0.0,  -1.38,  16.0]} dramaticLight={dramaticLight} />
      <SpotFixture position={[-13.86, -1.38,   8.0]} dramaticLight={dramaticLight} />
      <SpotFixture position={[-13.86, -1.38,  -8.0]} dramaticLight={dramaticLight} />
      <SpotFixture position={[  0.0,  -1.38, -16.0]} dramaticLight={dramaticLight} />

      <ContactShadows
        position={[0, -1.36, 0]}
        opacity={0.55}
        scale={22}
        blur={2.8}
        far={6}
        resolution={1024}
      />

      <CameraRig mode={cameraMode} draggingId={draggingId} />
      <CaptureSetup captureRef={captureRef} />
    </Canvas>
  );
}

useGLTF.preload(TENT_MODEL_PATH);
useGLTF.preload(HANGAR_MODEL_PATH);
// Inventory models
useGLTF.preload("/models/inventory/lightbox-vertical-iai.glb");
useGLTF.preload("/models/inventory/lightbox-horizontal-iai-01.glb");
useGLTF.preload("/models/inventory/caravan-iai-3d.glb");
useGLTF.preload("/models/inventory/lightbox-3m-iai.glb");
useGLTF.preload("/models/air/mini-harpy-showcase-3d.glb");
useGLTF.preload("/models/air/minipop-showcase-3d.glb");
useGLTF.preload("/models/inventory/wood-signage-iai.glb");
useGLTF.preload("/models/air/wasp-showcase-3d.glb");
useGLTF.preload("/models/inventory/container-3d.glb");
useGLTF.preload("/models/inventory/small-table.glb");
useGLTF.preload("/models/inventory/armchair-01.glb");

export default function TentsLayoutPage() {
  const [focusMode, setFocusMode] = useState(false);
  const [dramaticLight, setDramaticLight] = useState(false);
  const [sceneItems, setSceneItems] = useState<SceneItem[]>([]);
  const [tentType, setTentType] = useState<"25x15" | "30x20" | "open" | "hangar">("25x15");

  useEffect(() => {
    let cancelled = false
    const applyScene = (parsed) => {
      if (cancelled) return
      const obj = Array.isArray(parsed) ? { items: parsed } : parsed
      setSceneItems(obj.items ?? [])
      setExhibitionName(obj.name ?? "")
      setSigns(obj.signs ?? [])
      setBrackets(obj.brackets ?? [])
    }
    const clearScene = () => {
      if (cancelled) return
      setSceneItems([])
      setExhibitionName("")
      setSigns([])
      setBrackets([])
    }
    const saved = localStorage.getItem(`tentScene_${tentType}`)
    if (saved) {
      try { applyScene(JSON.parse(saved)) } catch { clearScene() }
    } else {
      fetch(`/scenes/preset-tentScene_${tentType}.json`)
        .then((r) => (r.ok ? r.json() : Promise.reject()))
        .then((data) => applyScene(data))
        .catch(() => clearScene())
    }
    return () => { cancelled = true }
  }, [tentType])
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [snapGlowId, setSnapGlowId] = useState<string | null>(null);
  const [showLabels, setShowLabels] = useState(false);
  const [pedestalLabelInput, setPedestalLabelInput] = useState("");
  const [showLabelPanel, setShowLabelPanel] = useState(false);
  const [showExhibitList, setShowExhibitList] = useState(false);
  const [saveScenePanelOpen, setSaveScenePanelOpen] = useState(false);
  const [saveSceneName, setSaveSceneName] = useState("");
  const [loadScenePanelOpen, setLoadScenePanelOpen] = useState(false);
  const [savedScenesList, setSavedScenesList] = useState<string[]>([]);
  const [sceneSaveToast, setSceneSaveToast] = useState("");

  async function handleSaveScene() {
    const name = saveSceneName.trim();
    if (!name) return;
    const res = await fetch("/api/scenes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, tentType, sceneItems }),
    });
    if (res.ok) {
      setSaveScenePanelOpen(false);
      setSaveSceneName("");
      setSceneSaveToast("נשמר בהצלחה ✓");
      setTimeout(() => setSceneSaveToast(""), 2500);
    }
  }

  function handleFreezePreset() {
    const data = { items: sceneItems, name: exhibitionName, signs, brackets };
    const fileName = `preset-tentScene_${tentType}.json`;
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setSceneSaveToast(`הוקפא: ${data.items.length} פריטים ✓`);
    setTimeout(() => setSceneSaveToast(""), 3500);
  }

  async function handleOpenLoadPanel() {
    const res = await fetch("/api/scenes");
    const json = await res.json();
    setSavedScenesList(json.scenes ?? []);
    setLoadScenePanelOpen(true);
  }

  async function handleLoadScene(name: string) {
    const res = await fetch(`/scenes/${name}.json`);
    const data = await res.json();
    // Support both new format { tentType, sceneItems } and old format (plain array)
    if (data && typeof data === "object" && !Array.isArray(data) && data.sceneItems) {
      setSceneItems(data.sceneItems);
      if (data.tentType) setTentType(data.tentType as "25x15" | "30x20" | "open" | "hangar");
    } else {
      setSceneItems(data);
    }
    setSelectedItemId(null);
    setLoadScenePanelOpen(false);
  }

  // Sync pedestal label input when selection changes
  useEffect(() => {
    const item = sceneItems.find((i) => i.id === selectedItemId);
    if (item && PEDESTAL_DIMS[item.type]) {
      setPedestalLabelInput(item.label ?? "");
    } else {
      setPedestalLabelInput("");
    }
  }, [selectedItemId]);
  const [activeTool, setActiveTool] = useState("Select");
  const [cameraMode, setCameraMode] = useState<CameraMode>("overview");
  const [activeSection, setActiveSection] = useState<"all" | "space" | "air" | "land" | "naval" | "inventory">("all");
  const [activeInventoryFilter, setActiveInventoryFilter] = useState<"הכל" | "ריהוט" | "מדיה" | "VIP" | "שירות">("הכל");
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  const [toastVisible, setToastVisible] = useState(false);
  const [exhibitSearch, setExhibitSearch] = useState("");
  const [inventorySearch, setInventorySearch] = useState("");
  const [exhibitionName, setExhibitionName] = useState("");
  const [signs, setSigns] = useState<SignItem[]>([]);
  const [showSigns, setShowSigns] = useState(true);
  const [selectedSignId, setSelectedSignId] = useState<string | null>(null);
  const [signPopupOpen, setSignPopupOpen] = useState(false);
  const [signText, setSignText] = useState("");
  const [signColor, setSignColor] = useState("#00d4ff");
  const [brackets, setBrackets] = useState<BracketItem[]>([]);
  const [selectedBracketId, setSelectedBracketId] = useState<string | null>(null);
  const [bracketPopupOpen, setBracketPopupOpen] = useState(false);
  const [bracketText, setBracketText] = useState("");
  const [bracketWidth, setBracketWidth] = useState(4);
  const [bracketColor, setBracketColor] = useState("#00d4ff");

  const filteredExhibits = useMemo(() => {
    const bySection = activeSection === "all" ? EXHIBIT_ITEMS : EXHIBIT_ITEMS.filter((e) => e.section === activeSection);
    const q = exhibitSearch.trim().toLowerCase();
    return q ? bySection.filter((e) => e.displayName.toLowerCase().includes(q)) : bySection;
  }, [activeSection, exhibitSearch]);

  const INVENTORY_ALL = [
    "שולחן", "שולחן קטן", "במה לבנה", "דשבורד דיגיטלי",
    "במה כחולה", "במה קטנה", "כיסא מתקפל", "כורסא", "פודיום",
    "בסיס תצוגה קטן", "בסיס תצוגה בינוני", "בסיס תצוגה גדול",
    "מסך", "רמקול", "לוגו לבן", "לוגו כחול גדול", "שילוט דיגיטלי", "שילוט מגנטי", "שילוט עץ", "לייטבוקס 2", "לייטבוקס 3 מטר", "לייטבוקס אנכי",
    "קרוואן תצוגה",
    "דגל IAI", "דגל תעשייה אווירית", "רשת הסוואה", "שער מתנפח", "עמודי תור", "מתקן טלפונים",
    "אוהל מתנפח", "אוהל לבן", "אוהל ראשי",
    "קונטיינר תצוגה",
  ] as const;
  const INVENTORY_FILTER_MAP: Record<string, string[]> = {
    "הכל":   [...INVENTORY_ALL],
    "ריהוט": ["שולחן", "שולחן קטן", "כיסא מתקפל", "כורסא", "במה כחולה", "במה קטנה", "במה לבנה", "פודיום", "בסיס תצוגה קטן", "בסיס תצוגה בינוני", "בסיס תצוגה גדול"],
    "מדיה":  ["מסך", "דשבורד דיגיטלי", "רמקול", "לוגו לבן", "לוגו כחול גדול", "שילוט דיגיטלי", "שילוט מגנטי", "שילוט עץ", "לייטבוקס 2", "לייטבוקס 3 מטר", "לייטבוקס אנכי", "קרוואן תצוגה"],
    "VIP":   ["כורסא", "פודיום"],
    "שירות": ["דשבורד דיגיטלי", "עמודי תור", "מתקן טלפונים", "דגל IAI", "דגל תעשייה אווירית", "רשת הסוואה", "שער מתנפח", "אוהל מתנפח", "אוהל לבן", "אוהל ראשי", "קונטיינר תצוגה"],
  };
  const filteredInventory = useMemo(() => {
    const byFilter = INVENTORY_FILTER_MAP[activeInventoryFilter] ?? INVENTORY_ALL;
    const q = inventorySearch.trim().toLowerCase();
    return q ? byFilter.filter((item) => item.toLowerCase().includes(q)) : byFilter;
  }, [activeInventoryFilter, inventorySearch]);

  const statusItems = useMemo(() => {
    const cfg = {
      "25x15":  { name: "אוהל 25x15", length: "25m", width: "15m",  area: "375m²"  },
      "30x20":  { name: "אוהל 30x20", length: "30m", width: "20m",  area: "600m²"  },
      "open":   { name: "שטח פתוח",   length: "25m", width: "15m",  area: "375m²"  },
      "hangar": { name: "האנגר",        length: "40m", width: "25m",  area: "1000m²" },
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
    setSceneItems((prev) => {
      const existing = prev.find((item) => item.type === type);
      const scale = existing ? existing.scale : 0.8;
      return [
        ...prev,
        {
          id: newId,
          type,
          position: [Math.cos(angle) * radius, -1.38, Math.sin(angle) * radius],
          rotationY: 0,
          scale,
        },
      ];
    });
    setSelectedItemId(newId);
  }

  function moveItem(id: string, x: number, z: number) {
    setSceneItems((prev) => {
      const moving = prev.find((i) => i.id === id);
      if (!moving) return prev;
      if (!PEDESTAL_DIMS[moving.type]) {
        return prev.map((item) =>
          item.id === id ? { ...item, position: [x, item.position[1], z] } : item
        );
      }
      // pedestal moving — also carry any item sitting on top of it
      const oldX = moving.position[0];
      const oldZ = moving.position[2];
      const dx = x - oldX;
      const dz = z - oldZ;
      return prev.map((item) => {
        if (item.id === id) return { ...item, position: [x, item.position[1], z] as [number, number, number] };
        if (!PEDESTAL_DIMS[item.type] && item.position[1] > -1.2) {
          const cx = item.position[0] - oldX;
          const cz = item.position[2] - oldZ;
          if (Math.sqrt(cx * cx + cz * cz) < 0.5) {
            return { ...item, position: [item.position[0] + dx, item.position[1], item.position[2] + dz] as [number, number, number] };
          }
        }
        return item;
      });
    });
  }

  function handleSelectSign(id: string | null) {
    setSelectedSignId(id);
    if (id !== null) setActiveTool("Move");
  }

  function handleSelectBracket(id: string | null) {
    setSelectedBracketId(id);
    if (id !== null) setActiveTool("Move");
  }

  function moveBracket(id: string, x: number, z: number) {
    const clampedX = Math.max(-12, Math.min(12, x));
    const clampedZ = Math.max(-7, Math.min(7, z));
    setBrackets((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, position: [clampedX, b.position[1], clampedZ] as [number, number, number] } : b
      )
    );
  }

  function moveSign(id: string, x: number, z: number) {
    const clampedX = Math.max(-12, Math.min(12, x));
    const clampedZ = Math.max(-7, Math.min(7, z));
    setSigns((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, position: [clampedX, s.position[1], clampedZ] as [number, number, number] } : s
      )
    );
  }

  const NO_SNAP_TYPES = ["שילוט עץ", "שילוט דיגיטלי", "שילוט מגנטי", "לייטבוקס 2", "לייטבוקס 3 מטר"];

  function handleDrop(id: string) {
    setSceneItems((prev) => {
      const item = prev.find((i) => i.id === id);
      if (!item || PEDESTAL_DIMS[item.type]) return prev; // don't snap pedestals to pedestals
      if (NO_SNAP_TYPES.includes(item.type)) {
        return prev.map((i) =>
          i.id === id ? { ...i, position: [i.position[0], -1.38, i.position[2]] as [number, number, number] } : i
        );
      }

      const pedestals = prev.filter((i) => i.id !== id && PEDESTAL_DIMS[i.type]);
      let nearest: typeof pedestals[0] | null = null;
      let minDist = Infinity;
      for (const p of pedestals) {
        const dx = item.position[0] - p.position[0];
        const dz = item.position[2] - p.position[2];
        const dist = Math.sqrt(dx * dx + dz * dz);
        if (dist < 1.5 && dist < minDist) {
          minDist = dist;
          nearest = p;
        }
      }

      if (nearest) {
        const pedestal = nearest;
        const occupied = prev.some(
          (i) => i.id !== id && !PEDESTAL_DIMS[i.type] && i.position[1] > -1.38 + 0.1 &&
            Math.sqrt((i.position[0] - pedestal.position[0]) ** 2 + (i.position[2] - pedestal.position[2]) ** 2) < 0.5
        );
        if (occupied) {
          return prev.map((i) =>
            i.id === id ? { ...i, position: [i.position[0], -1.38, i.position[2]] as [number, number, number] } : i
          );
        }
        const pedestalH = PEDESTAL_DIMS[pedestal.type][1];
        const snapY = -1.38 + pedestalH - 0.6;
        setSnapGlowId(pedestal.id);
        setTimeout(() => setSnapGlowId(null), 800);
        return prev.map((i) =>
          i.id === id
            ? { ...i, position: [pedestal.position[0], snapY, pedestal.position[2]] as [number, number, number] }
            : i
        );
      }
      // no pedestal nearby — reset to floor
      return prev.map((i) =>
        i.id === id ? { ...i, position: [i.position[0], -1.38, i.position[2]] as [number, number, number] } : i
      );
    });
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

  function rotateItemByDelta(id: string, delta: number) {
    setSceneItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, rotationY: item.rotationY + delta } : item
      )
    );
  }

  const captureRef = useRef<(() => string) | null>(null);

  function saveScene() {
    localStorage.setItem(`tentScene_${tentType}`, JSON.stringify({ items: sceneItems, name: exhibitionName, signs, brackets }));
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2000);
  }

  function addSign() {
    console.log("addSign called", signText, signs);
    if (!signText.trim()) return;
    const newSign: SignItem = {
      id: crypto.randomUUID(),
      text: signText.trim(),
      position: [
        (Math.random() - 0.5) * 8,
        1.5 + signs.length * 0.1,
        (Math.random() - 0.5) * 5,
      ] as [number, number, number],
      color: signColor,
    };
    setSigns((prev) => [...prev, newSign]);
    setSignText("");
    setSignPopupOpen(false);
  }

  function addBracket() {
    if (!bracketText.trim()) return;
    const newBracket: BracketItem = {
      id: crypto.randomUUID(),
      text: bracketText.trim(),
      position: [
        (Math.random() - 0.5) * 8,
        2.0 + brackets.length * 0.1,
        (Math.random() - 0.5) * 5,
      ] as [number, number, number],
      width: bracketWidth,
      color: bracketColor,
    };
    setBrackets((prev) => [...prev, newBracket]);
    setBracketText("");
    setBracketPopupOpen(false);
  }

  function buildExportData() {
    const tentLabel =
      tentType === "30x20"  ? "אוהל 30×20" :
      tentType === "open"   ? "שטח פתוח"   :
      tentType === "hangar" ? "האנגר"        : "אוהל 25×15";
    const dims = tentType === "30x20" ? "30m × 20m" : "25m × 15m";
    const title = exhibitionName.trim() || "תכנית תצוגה";
    const exhibitsOnly = sceneItems.filter((si) =>
      EXHIBIT_ITEMS.some((e) => e.slug === si.type)
    );
    const numberedItems = exhibitsOnly.length
      ? exhibitsOnly
          .map((si, i) => `${i + 1}. ${EXHIBIT_ITEMS.find((e) => e.slug === si.type)?.displayName ?? si.type}`)
          .join("\n")
      : "אין פריטים";
    const date = new Date().toLocaleDateString("he-IL");
    return { tentLabel, dims, title, numberedItems, date };
  }

  function handleWhatsApp() {
    const { tentLabel, dims, title, numberedItems, date } = buildExportData();
    const msg = encodeURIComponent(
      `${title}\n${tentLabel} | ${dims}\n\n${numberedItems}\n\n${date}`
    );
    window.open(`https://wa.me/972523010303?text=${msg}`, "_blank");
  }

  async function handleEmail() {
    const { tentLabel, dims, title, numberedItems, date } = buildExportData();

    console.log("sendExhibitionEmail called");
    try {
      await sendExhibitionEmail({
        exhibitionName: title,
        tentInfo:       `${tentLabel} | ${dims}`,
        itemsList:      numberedItems,
        date,
        canvasDataUrl:  captureRef.current?.() ?? "",
      });
    } catch (err) {
      console.error(err);
      alert("שגיאה: " + JSON.stringify(err));
    }

    const dataUrl = captureRef.current?.();
    if (dataUrl) {
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = "תכנית-תצוגה.jpg";
      a.click();
    }
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
                  onClick={() => setShowExhibitList((v) => !v)}
                  style={{
                    padding: "7px 12px",
                    borderRadius: "999px",
                    border: showExhibitList ? "1px solid rgba(0,229,255,0.55)" : "1px solid rgba(0,229,255,0.28)",
                    background: showExhibitList ? "rgba(0,229,255,0.18)" : "rgba(0,229,255,0.07)",
                    color: "#00e5ff",
                    fontWeight: 800,
                    fontSize: "12px",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  📋 רשימת תצוגות
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
                {tentType === "open" ? "שטח פתוח" : tentType === "30x20" ? "אוהל 30×20" : tentType === "hangar" ? "האנגר" : "אוהל 25×15"}
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
              <button
                type="button"
                onClick={() => { setSaveScenePanelOpen((v) => !v); setLoadScenePanelOpen(false); }}
                style={{
                  padding: "8px 12px",
                  borderRadius: "12px",
                  border: saveScenePanelOpen ? "1px solid rgba(0,229,255,0.50)" : "1px solid rgba(0,229,255,0.25)",
                  background: saveScenePanelOpen ? "rgba(0,229,255,0.14)" : "rgba(0,229,255,0.06)",
                  color: "#00e5ff",
                  fontSize: "13px",
                  fontWeight: 700,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                💾 שמור תצוגה
              </button>
              <button
                type="button"
                onClick={handleFreezePreset}
                title="הורד את הסצנה הנוכחית כקובץ preset לשמירה בפרויקט (כל המכשירים)"
                style={{
                  padding: "8px 12px",
                  borderRadius: "12px",
                  border: "1px solid rgba(167,139,250,0.50)",
                  background: "rgba(167,139,250,0.12)",
                  color: "#a78bfa",
                  fontSize: "13px",
                  fontWeight: 700,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                🔒 הקפא לפריסט
              </button>
              <button
                type="button"
                onClick={() => { handleOpenLoadPanel(); setSaveScenePanelOpen(false); }}
                style={{
                  padding: "8px 12px",
                  borderRadius: "12px",
                  border: loadScenePanelOpen ? "1px solid rgba(0,229,255,0.50)" : "1px solid rgba(0,229,255,0.25)",
                  background: loadScenePanelOpen ? "rgba(0,229,255,0.14)" : "rgba(0,229,255,0.06)",
                  color: "#00e5ff",
                  fontSize: "13px",
                  fontWeight: 700,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                📂 טען תצוגה
              </button>
              <button
                type="button"
                onClick={handleWhatsApp}
                style={{
                  padding: "8px 14px",
                  borderRadius: "12px",
                  border: "1px solid rgba(37,211,102,0.40)",
                  background: "rgba(37,211,102,0.10)",
                  color: "#4ade80",
                  fontSize: "13px",
                  fontWeight: 700,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  transition: "background 150ms ease",
                }}
              >
                📱 WhatsApp
              </button>
              <button
                type="button"
                onClick={handleEmail}
                style={{
                  padding: "8px 14px",
                  borderRadius: "12px",
                  border: "1px solid rgba(96,165,250,0.40)",
                  background: "rgba(96,165,250,0.10)",
                  color: "#60a5fa",
                  fontSize: "13px",
                  fontWeight: 700,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  transition: "background 150ms ease",
                }}
              >
                📧 מייל
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
              { id: "25x15",  label: "אוהל 25×15" },
              { id: "30x20",  label: "אוהל 30×20" },
              { id: "open",   label: "שטח פתוח"   },
              { id: "hangar", label: "האנגר"        },
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

            <input
              type="text"
              value={exhibitionName}
              onChange={(e) => setExhibitionName(e.target.value)}
              placeholder="שם התערוכה..."
              dir="rtl"
              style={{
                padding: "7px 12px",
                borderRadius: "11px",
                border: "1px solid rgba(125,211,252,0.18)",
                background: "rgba(255,255,255,0.04)",
                color: "#f0faff",
                fontSize: "13px",
                outline: "none",
                minWidth: "160px",
                transition: "border-color 150ms ease",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(0,229,255,0.55)")}
              onBlur={(e)  => (e.currentTarget.style.borderColor = "rgba(125,211,252,0.18)")}
            />
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
                {(["הכל", "חלל", "אוויר", "יבשה", "ים", "ריהוט אוהל"] as const).map((tag) => {
                  const sectionMap: Record<string, "all" | "space" | "air" | "land" | "naval" | "inventory"> = {
                    "הכל": "all", "חלל": "space", "אוויר": "air", "יבשה": "land", "ים": "naval", "ריהוט אוהל": "inventory",
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

              <input
                type="text"
                value={exhibitSearch}
                onChange={(e) => setExhibitSearch(e.target.value)}
                placeholder="חפש תצוגה..."
                dir="rtl"
                style={{
                  width: "100%",
                  padding: "9px 12px",
                  borderRadius: "12px",
                  border: "1px solid rgba(125,211,252,0.18)",
                  background: "rgba(255,255,255,0.04)",
                  color: "#f0faff",
                  fontSize: "13px",
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "border-color 150ms ease",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(0,229,255,0.55)")}
                onBlur={(e)  => (e.currentTarget.style.borderColor = "rgba(125,211,252,0.18)")}
              />

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

          {/* Save scene panel */}
          {saveScenePanelOpen && (
            <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 16px", marginBottom: "8px", borderRadius: "14px", border: "1px solid rgba(0,229,255,0.30)", background: "rgba(0,15,35,0.90)", direction: "rtl" }}>
              <span style={{ fontSize: "13px", fontWeight: 700, color: "#67e8f9", whiteSpace: "nowrap" }}>שם התצוגה:</span>
              <input
                type="text"
                placeholder="למשל: תצוגה DSEI..."
                value={saveSceneName}
                onChange={(e) => setSaveSceneName(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleSaveScene(); }}
                autoFocus
                style={{ flex: 1, maxWidth: "260px", padding: "7px 12px", borderRadius: "10px", border: "1px solid rgba(0,229,255,0.35)", background: "rgba(0,5,20,0.9)", color: "#e0f7ff", fontSize: "13px", fontWeight: 600, outline: "none", direction: "rtl" }}
              />
              <button type="button" onClick={handleSaveScene} style={{ padding: "7px 16px", borderRadius: "10px", border: "1px solid rgba(0,229,255,0.50)", background: "rgba(0,229,255,0.14)", color: "#00e5ff", fontSize: "13px", fontWeight: 800, cursor: "pointer", whiteSpace: "nowrap" }}>
                שמור
              </button>
              <button type="button" onClick={() => setSaveScenePanelOpen(false)} style={{ padding: "7px 12px", borderRadius: "10px", border: "1px solid rgba(148,163,184,0.18)", background: "none", color: "#64748b", fontSize: "13px", cursor: "pointer" }}>
                ביטול
              </button>
            </div>
          )}

          {/* Load scene panel */}
          {loadScenePanelOpen && (
            <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 16px", marginBottom: "8px", borderRadius: "14px", border: "1px solid rgba(0,229,255,0.30)", background: "rgba(0,15,35,0.90)", direction: "rtl", flexWrap: "wrap" }}>
              <span style={{ fontSize: "13px", fontWeight: 700, color: "#67e8f9", whiteSpace: "nowrap" }}>בחר תצוגה:</span>
              {savedScenesList.length === 0 ? (
                <span style={{ fontSize: "13px", color: "#64748b" }}>אין תצוגות שמורות</span>
              ) : (
                savedScenesList.map((name) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => handleLoadScene(name)}
                    style={{ padding: "7px 14px", borderRadius: "10px", border: "1px solid rgba(0,229,255,0.30)", background: "rgba(0,229,255,0.08)", color: "#67e8f9", fontSize: "13px", fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}
                  >
                    {name}
                  </button>
                ))
              )}
              <button type="button" onClick={() => setLoadScenePanelOpen(false)} style={{ padding: "7px 12px", borderRadius: "10px", border: "1px solid rgba(148,163,184,0.18)", background: "none", color: "#64748b", fontSize: "13px", cursor: "pointer", marginRight: "auto" }}>
                ✕
              </button>
            </div>
          )}

          {/* Label panel — floating overlay so it never disturbs the grid layout */}
          {selectedItem && showLabelPanel && (
            <div
              style={{
                position: "fixed",
                top: "90px",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 9000,
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 16px",
                borderRadius: "14px",
                border: "1px solid rgba(0,229,255,0.40)",
                background: "rgba(0,15,35,0.96)",
                boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
                backdropFilter: "blur(8px)",
                direction: "rtl",
              }}
            >
              <span style={{ fontSize: "13px", fontWeight: 700, color: "#67e8f9", whiteSpace: "nowrap" }}>
                שם הפריט על הבסיס:
              </span>
              <input
                type="text"
                placeholder="הכנס שם..."
                value={pedestalLabelInput}
                onChange={(e) => setPedestalLabelInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setSceneItems((prev) => prev.map((i) =>
                      i.id === selectedItemId ? { ...i, label: pedestalLabelInput.trim() || undefined } : i
                    ));
                  }
                }}
                style={{
                  flex: 1,
                  maxWidth: "220px",
                  padding: "7px 12px",
                  borderRadius: "10px",
                  border: "1px solid rgba(0,229,255,0.35)",
                  background: "rgba(0,5,20,0.9)",
                  color: "#e0f7ff",
                  fontSize: "13px",
                  fontWeight: 600,
                  outline: "none",
                  direction: "rtl",
                }}
              />
              <button
                type="button"
                onClick={() => {
                  setSceneItems((prev) => prev.map((i) =>
                    i.id === selectedItemId ? { ...i, label: pedestalLabelInput.trim() || undefined } : i
                  ));
                }}
                style={{
                  padding: "7px 16px",
                  borderRadius: "10px",
                  border: "1px solid rgba(0,229,255,0.50)",
                  background: "rgba(0,229,255,0.14)",
                  color: "#00e5ff",
                  fontSize: "13px",
                  fontWeight: 800,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                אשר
              </button>
              {selectedItem.label && (
                <span style={{ fontSize: "12px", color: "#94a3b8" }}>
                  נוכחי: <span style={{ color: "#00e5ff", fontWeight: 700 }}>{selectedItem.label}</span>
                </span>
              )}
              <button
                type="button"
                onClick={() => setShowLabelPanel(false)}
                style={{ padding: "7px 12px", borderRadius: "10px", border: "1px solid rgba(148,163,184,0.18)", background: "none", color: "#64748b", fontSize: "13px", cursor: "pointer" }}
              >
                X
              </button>
            </div>
          )}

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

                {/* Rotate 90° one-shot */}
                <button
                  type="button"
                  onClick={() => {
                    if (!selectedItemId) return;
                    setSceneItems((prev) =>
                      prev.map((item) =>
                        item.id === selectedItemId
                          ? { ...item, rotationY: item.rotationY + Math.PI / 2 }
                          : item
                      )
                    );
                  }}
                  title="סובב 90°"
                  style={{
                    padding: "8px 12px",
                    borderRadius: "11px",
                    border: "1px solid rgba(148,163,184,0.18)",
                    background: selectedItemId ? "rgba(255,255,255,0.03)" : "transparent",
                    color: selectedItemId ? "#f8fbff" : "rgba(248,251,255,0.3)",
                    fontSize: "13px",
                    fontWeight: 700,
                    cursor: selectedItemId ? "pointer" : "not-allowed",
                    opacity: selectedItemId ? 1 : 0.45,
                    transition: "all 150ms ease",
                  }}
                >
                  ↻ 90°
                </button>

                {/* Height up/down */}
                {(() => {
                  const btnStyle = {
                    padding: "8px 11px",
                    borderRadius: "11px",
                    border: "1px solid rgba(148,163,184,0.18)",
                    background: selectedItemId ? "rgba(255,255,255,0.03)" : "transparent",
                    color: selectedItemId ? "#f8fbff" : "rgba(248,251,255,0.3)",
                    fontSize: "14px",
                    fontWeight: 700,
                    cursor: selectedItemId ? "pointer" : "not-allowed",
                    opacity: selectedItemId ? 1 : 0.45,
                    transition: "all 150ms ease",
                  };
                  const moveUp = () => setSceneItems((prev) => prev.map((item) =>
                    item.id === selectedItemId
                      ? { ...item, position: [item.position[0], item.position[1] + 0.3, item.position[2]] }
                      : item
                  ));
                  const moveDown = () => setSceneItems((prev) => prev.map((item) =>
                    item.id === selectedItemId
                      ? { ...item, position: [item.position[0], Math.max(-1.38, item.position[1] - 0.3), item.position[2]] }
                      : item
                  ));
                  return (
                    <div style={{ display: "flex", gap: "4px" }}>
                      <button type="button" onClick={moveUp}   title="הרם" style={btnStyle}>⬆</button>
                      <button type="button" onClick={moveDown} title="הורד" style={btnStyle}>⬇</button>
                    </div>
                  );
                })()}

                {/* Scale bigger / smaller */}
                {(() => {
                  const scaleBtnStyle = {
                    padding: "8px 11px",
                    borderRadius: "11px",
                    border: "1px solid rgba(148,163,184,0.18)",
                    background: selectedItemId ? "rgba(255,255,255,0.03)" : "transparent",
                    color: selectedItemId ? "#f8fbff" : "rgba(248,251,255,0.3)",
                    fontSize: "15px",
                    fontWeight: 700,
                    cursor: selectedItemId ? "pointer" : "not-allowed",
                    opacity: selectedItemId ? 1 : 0.45,
                    transition: "all 150ms ease",
                  };
                  const bump = (delta) => setSceneItems((prev) => prev.map((item) =>
                    item.id === selectedItemId
                      ? { ...item, scale: Math.max(0.1, Math.min(5, item.scale + delta)) }
                      : item
                  ));
                  return (
                    <div style={{ display: "flex", gap: "4px" }}>
                      <button type="button" onClick={() => bump(0.1)}  title="הגדל" style={scaleBtnStyle}>+</button>
                      <button type="button" onClick={() => bump(-0.1)} title="הקטן" style={scaleBtnStyle}>-</button>
                    </div>
                  );
                })()}

                {/* Label / secret-exhibit sign toggle */}
                <button
                  type="button"
                  onClick={() => {
                    if (!selectedItemId) return;
                    setPedestalLabelInput(selectedItem?.label ?? "");
                    setShowLabelPanel((v) => !v);
                  }}
                  title="שלט / תווית"
                  style={{
                    padding: "8px 12px",
                    borderRadius: "11px",
                    border: showLabelPanel ? "1px solid rgba(0,229,255,0.55)" : "1px solid rgba(148,163,184,0.18)",
                    background: showLabelPanel ? "rgba(0,229,255,0.16)" : (selectedItemId ? "rgba(255,255,255,0.03)" : "transparent"),
                    color: showLabelPanel ? "#00e5ff" : (selectedItemId ? "#f8fbff" : "rgba(248,251,255,0.3)"),
                    fontSize: "13px",
                    fontWeight: 700,
                    cursor: selectedItemId ? "pointer" : "not-allowed",
                    opacity: selectedItemId ? 1 : 0.45,
                    transition: "all 150ms ease",
                  }}
                >
                  shelet
                </button>

                {/* Sign height + delete — visible when a sign is selected */}
                {tentType === "open" && selectedSignId && (() => {
                  const signBtnStyle = { padding: "8px 11px", borderRadius: "11px", border: "1px solid rgba(0,212,255,0.35)", background: "rgba(0,212,255,0.10)", color: "#00d4ff", fontSize: "14px", fontWeight: 700, cursor: "pointer" } as const;
                  const moveS = (dx: number, dy: number, dz: number) => setSigns((prev) => prev.map((s) =>
                    s.id === selectedSignId ? { ...s, position: [
                      Math.max(-12, Math.min(12, s.position[0] + dx)),
                      Math.max(-1.38, s.position[1] + dy),
                      Math.max(-7, Math.min(7, s.position[2] + dz)),
                    ] as [number,number,number] } : s
                  ));
                  return (
                    <>
                      <div style={{ width: "1px", height: "22px", background: "rgba(148,163,184,0.18)", margin: "0 4px" }} />
                      {/* Y — height */}
                      <div style={{ display: "flex", gap: "4px" }}>
                        <button type="button" title="הרם שלט"  onClick={() => moveS(0,  0.3, 0)} style={signBtnStyle}>⬆</button>
                        <button type="button" title="הורד שלט" onClick={() => moveS(0, -0.3, 0)} style={signBtnStyle}>⬇</button>
                      </div>
                      {/* X — left/right */}
                      <div style={{ display: "flex", gap: "4px" }}>
                        <button type="button" title="שמאל"  onClick={() => moveS(-0.5, 0, 0)} style={signBtnStyle}>←</button>
                        <button type="button" title="ימין"  onClick={() => moveS( 0.5, 0, 0)} style={signBtnStyle}>→</button>
                      </div>
                      {/* Z — forward/back */}
                      <div style={{ display: "flex", gap: "4px" }}>
                        <button type="button" title="קדימה" onClick={() => moveS(0, 0, -0.5)} style={signBtnStyle}>↑</button>
                        <button type="button" title="אחורה" onClick={() => moveS(0, 0,  0.5)} style={signBtnStyle}>↓</button>
                      </div>
                      {/* Rotate */}
                      <button
                        type="button"
                        title="סובב שלט 45°"
                        onClick={() => setSigns((prev) => prev.map((s) =>
                          s.id === selectedSignId ? { ...s, rotationY: (s.rotationY ?? 0) + Math.PI / 4 } : s
                        ))}
                        style={signBtnStyle}
                      >↻</button>
                      <button
                        type="button"
                        title="מחק שלט"
                        onClick={() => { setSigns((prev) => prev.filter((s) => s.id !== selectedSignId)); setSelectedSignId(null); }}
                        style={{ padding: "8px 11px", borderRadius: "11px", border: "1px solid rgba(255,80,80,0.40)", background: "rgba(255,80,80,0.10)", color: "#f87171", fontSize: "14px", fontWeight: 700, cursor: "pointer" }}
                      >🗑</button>
                    </>
                  );
                })()}

                {/* Bracket controls */}
                {tentType === "open" && selectedBracketId && (() => {
                  const bStyle = { padding: "8px 11px", borderRadius: "11px", border: "1px solid rgba(0,212,255,0.35)", background: "rgba(0,212,255,0.10)", color: "#00d4ff", fontSize: "13px", fontWeight: 700, cursor: "pointer" } as const;
                  return (
                    <>
                      <div style={{ width: "1px", height: "22px", background: "rgba(148,163,184,0.18)", margin: "0 4px" }} />
                      {/* Width */}
                      <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                        <button type="button" title="צמצם רוחב" style={bStyle}
                          onClick={() => setBrackets((prev) => prev.map((b) => b.id === selectedBracketId ? { ...b, width: Math.max(1, b.width - 0.5) } : b))}>−</button>
                        <span style={{ color: "#67e8f9", fontSize: "11px", fontWeight: 700, whiteSpace: "nowrap" }}>רוחב</span>
                        <button type="button" title="הרחב" style={bStyle}
                          onClick={() => setBrackets((prev) => prev.map((b) => b.id === selectedBracketId ? { ...b, width: Math.min(14, b.width + 0.5) } : b))}>+</button>
                      </div>
                      {/* Rotate */}
                      <button type="button" title="סובב סוגר 45°" style={bStyle}
                        onClick={() => setBrackets((prev) => prev.map((b) => b.id === selectedBracketId ? { ...b, rotationY: (b.rotationY ?? 0) + Math.PI / 4 } : b))}>↻</button>
                      {/* Delete */}
                      <button type="button" title="מחק סוגר"
                        onClick={() => { setBrackets((prev) => prev.filter((b) => b.id !== selectedBracketId)); setSelectedBracketId(null); }}
                        style={{ padding: "8px 11px", borderRadius: "11px", border: "1px solid rgba(255,80,80,0.40)", background: "rgba(255,80,80,0.10)", color: "#f87171", fontSize: "14px", fontWeight: 700, cursor: "pointer" }}>🗑</button>
                    </>
                  );
                })()}

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

                {/* Separator */}
                <div style={{ width: "1px", height: "22px", background: "rgba(148,163,184,0.18)", margin: "0 4px" }} />

                {/* Dramatic light toggle */}
                <button
                  type="button"
                  onClick={() => setDramaticLight((v) => !v)}
                  title={dramaticLight ? "מצב תאורה רגיל" : "מצב תאורה דרמטי"}
                  style={{
                    padding: "8px 14px",
                    borderRadius: "11px",
                    border: dramaticLight
                      ? "1px solid rgba(255,200,60,0.60)"
                      : "1px solid rgba(148,163,184,0.18)",
                    background: dramaticLight
                      ? "rgba(255,200,60,0.14)"
                      : "rgba(255,255,255,0.03)",
                    color: dramaticLight ? "#ffe680" : "#f8fbff",
                    fontSize: "13px",
                    fontWeight: dramaticLight ? 800 : 700,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    transition: "all 150ms ease",
                  }}
                >
                  {dramaticLight ? "💡 תאורה דרמטית" : "🔆 אור רגיל"}
                </button>

                {tentType === "open" && (
                  <>
                    <div style={{ width: "1px", height: "22px", background: "rgba(148,163,184,0.18)", margin: "0 4px" }} />
                    <button
                      type="button"
                      onClick={() => setShowSigns((v) => !v)}
                      title={showSigns ? "הסתר שלטים" : "הצג שלטים"}
                      style={{
                        padding: "8px 14px",
                        borderRadius: "11px",
                        border: showSigns ? "1px solid rgba(0,212,255,0.50)" : "1px solid rgba(148,163,184,0.18)",
                        background: showSigns ? "rgba(0,212,255,0.12)" : "rgba(255,255,255,0.03)",
                        color: showSigns ? "#00d4ff" : "rgba(248,251,255,0.5)",
                        fontSize: "13px",
                        fontWeight: 800,
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                        transition: "all 150ms ease",
                      }}
                    >
                      👁 שלטים
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowLabels((v) => !v)}
                      title={showLabels ? "הסתר שמות" : "הצג שמות"}
                      style={{
                        padding: "8px 14px",
                        borderRadius: "11px",
                        border: showLabels ? "1px solid rgba(0,212,255,0.50)" : "1px solid rgba(148,163,184,0.18)",
                        background: showLabels ? "rgba(0,212,255,0.12)" : "rgba(255,255,255,0.03)",
                        color: showLabels ? "#00d4ff" : "rgba(248,251,255,0.5)",
                        fontSize: "13px",
                        fontWeight: 800,
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                        transition: "all 150ms ease",
                      }}
                    >
                      🏷 שמות
                    </button>
                    <div style={{ position: "relative" }}>
                      <button
                        type="button"
                        onClick={() => setSignPopupOpen((v) => !v)}
                        title="הוסף שלט נאון"
                        style={{
                          padding: "8px 14px",
                          borderRadius: "11px",
                          border: "1px solid rgba(0,212,255,0.50)",
                          background: "rgba(0,212,255,0.12)",
                          color: "#00d4ff",
                          fontSize: "13px",
                          fontWeight: 800,
                          cursor: "pointer",
                          whiteSpace: "nowrap",
                          transition: "all 150ms ease",
                        }}
                      >
                        ✦ הוסף שלט
                      </button>

                      {signPopupOpen && (
                        <div
                          style={{
                            position: "absolute",
                            top: "calc(100% + 8px)",
                            left: "50%",
                            transform: "translateX(-50%)",
                            zIndex: 100,
                            background: "rgba(6,12,28,0.97)",
                            border: "1px solid rgba(0,212,255,0.35)",
                            borderRadius: "14px",
                            padding: "14px 16px",
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                            minWidth: "220px",
                            boxShadow: "0 12px 32px rgba(0,0,0,0.5)",
                          }}
                        >
                          <div style={{ color: "rgba(180,220,255,0.7)", fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>
                            שלט נאון
                          </div>
                          <input
                            type="text"
                            value={signText}
                            onChange={(e) => setSignText(e.target.value)}
                            placeholder="טקסט השלט..."
                            dir="rtl"
                            style={{
                              padding: "7px 10px",
                              borderRadius: "9px",
                              border: "1px solid rgba(0,212,255,0.30)",
                              background: "rgba(255,255,255,0.04)",
                              color: "#f0faff",
                              fontSize: "13px",
                              outline: "none",
                            }}
                            onKeyDown={(e) => { if (e.key === "Enter") addSign(); }}
                          />
                          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                            {(["#00d4ff", "#0B6EFD", "#00ff88", "#ff6b35", "#ffffff"] as const).map((c) => (
                              <button
                                key={c}
                                type="button"
                                onClick={() => setSignColor(c)}
                                style={{
                                  width: "26px",
                                  height: "26px",
                                  borderRadius: "50%",
                                  background: c,
                                  border: signColor === c ? "2px solid white" : "2px solid transparent",
                                  cursor: "pointer",
                                  boxShadow: `0 0 8px ${c}`,
                                  transition: "border 150ms",
                                }}
                              />
                            ))}
                          </div>
                          <button
                            type="button"
                            onClick={addSign}
                            style={{
                              padding: "8px 14px",
                              borderRadius: "9px",
                              border: "1px solid rgba(0,212,255,0.40)",
                              background: "rgba(0,212,255,0.18)",
                              color: "#00d4ff",
                              fontSize: "13px",
                              fontWeight: 800,
                              cursor: "pointer",
                            }}
                          >
                            הוסף לסצנה
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Bracket button */}
                    <div style={{ position: "relative" }}>
                      <button
                        type="button"
                        onClick={() => setBracketPopupOpen((v) => !v)}
                        title="הוסף סוגר קבוצה"
                        style={{
                          padding: "8px 14px",
                          borderRadius: "11px",
                          border: "1px solid rgba(0,212,255,0.50)",
                          background: "rgba(0,212,255,0.12)",
                          color: "#00d4ff",
                          fontSize: "13px",
                          fontWeight: 800,
                          cursor: "pointer",
                          whiteSpace: "nowrap",
                          transition: "all 150ms ease",
                        }}
                      >
                        ⌐ הוסף סוגר
                      </button>

                      {bracketPopupOpen && (
                        <div
                          style={{
                            position: "absolute",
                            top: "calc(100% + 8px)",
                            left: "50%",
                            transform: "translateX(-50%)",
                            zIndex: 100,
                            background: "rgba(6,12,28,0.97)",
                            border: "1px solid rgba(0,212,255,0.35)",
                            borderRadius: "14px",
                            padding: "14px 16px",
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                            minWidth: "230px",
                            boxShadow: "0 12px 32px rgba(0,0,0,0.5)",
                          }}
                        >
                          <div style={{ color: "rgba(180,220,255,0.7)", fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>
                            סוגר קבוצה
                          </div>
                          <input
                            type="text"
                            value={bracketText}
                            onChange={(e) => setBracketText(e.target.value)}
                            placeholder="שם הקבוצה..."
                            dir="rtl"
                            style={{ padding: "7px 10px", borderRadius: "9px", border: "1px solid rgba(0,212,255,0.30)", background: "rgba(255,255,255,0.04)", color: "#f0faff", fontSize: "13px", outline: "none" }}
                            onKeyDown={(e) => { if (e.key === "Enter") addBracket(); }}
                          />
                          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                            <div style={{ color: "rgba(180,220,255,0.6)", fontSize: "11px" }}>
                              רוחב: {bracketWidth}מ׳
                            </div>
                            <input
                              type="range"
                              min={2}
                              max={10}
                              step={0.5}
                              value={bracketWidth}
                              onChange={(e) => setBracketWidth(Number(e.target.value))}
                              style={{ width: "100%", accentColor: "#00d4ff" }}
                            />
                          </div>
                          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                            {(["#00d4ff", "#0B6EFD", "#00ff88", "#ff6b35", "#ffffff"] as const).map((c) => (
                              <button
                                key={c}
                                type="button"
                                onClick={() => setBracketColor(c)}
                                style={{
                                  width: "26px", height: "26px", borderRadius: "50%",
                                  background: c,
                                  border: bracketColor === c ? "2px solid white" : "2px solid transparent",
                                  cursor: "pointer",
                                  boxShadow: `0 0 8px ${c}`,
                                  transition: "border 150ms",
                                }}
                              />
                            ))}
                          </div>
                          <button
                            type="button"
                            onClick={addBracket}
                            style={{ padding: "8px 14px", borderRadius: "9px", border: "1px solid rgba(0,212,255,0.40)", background: "rgba(0,212,255,0.18)", color: "#00d4ff", fontSize: "13px", fontWeight: 800, cursor: "pointer" }}
                          >
                            הוסף לסצנה
                          </button>
                        </div>
                      )}
                    </div>
                  </>
                )}
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
                onWheel={(e) => {
                  if (!selectedItemId) return;
                  const delta = e.deltaY > 0 ? -0.05 : 0.05;
                  setSceneItems((prev) => prev.map((item) =>
                    item.id === selectedItemId
                      ? { ...item, scale: Math.max(0.1, Math.min(5, item.scale + delta)) }
                      : item
                  ));
                }}
              >
                <TentStage3D
                  items={sceneItems}
                  selectedId={selectedItemId}
                  onSelect={setSelectedItemId}
                  cameraMode={cameraMode}
                  activeTool={activeTool}
                  onMoveItem={moveItem}
                  onDrop={handleDrop}
                  tentType={tentType}
                  captureRef={captureRef}
                  dramaticLight={dramaticLight}
                  signs={signs}
                  showSigns={showSigns}
                  showLabels={showLabels}
                  snapGlowId={snapGlowId}
                  selectedSignId={selectedSignId}
                  onSelectSign={handleSelectSign}
                  onMoveSign={moveSign}
                  brackets={brackets}
                  selectedBracketId={selectedBracketId}
                  onSelectBracket={handleSelectBracket}
                  onMoveBracket={moveBracket}
                  onRotateItem={rotateItemByDelta}
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

              <input
                type="text"
                value={inventorySearch}
                onChange={(e) => setInventorySearch(e.target.value)}
                placeholder="חפש פריט..."
                dir="rtl"
                style={{
                  width: "100%",
                  padding: "9px 12px",
                  borderRadius: "12px",
                  border: "1px solid rgba(125,211,252,0.18)",
                  background: "rgba(255,255,255,0.04)",
                  color: "#f0faff",
                  fontSize: "13px",
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "border-color 150ms ease",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(0,229,255,0.55)")}
                onBlur={(e)  => (e.currentTarget.style.borderColor = "rgba(125,211,252,0.18)")}
              />

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

      {/* FOCUS MODE — bottom action bar */}
      {focusMode && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1000,
            display: "flex",
            gap: "12px",
          }}
        >
          <button
            type="button"
            onClick={handleWhatsApp}
            style={{
              padding: "12px 22px",
              borderRadius: "14px",
              border: "1px solid rgba(37,211,102,0.45)",
              background: "rgba(10,30,15,0.92)",
              color: "#4ade80",
              fontSize: "15px",
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backdropFilter: "blur(10px)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.5)",
              whiteSpace: "nowrap",
            }}
          >
            📱 שלח ב-WhatsApp
          </button>
          <button
            type="button"
            onClick={handleEmail}
            style={{
              padding: "12px 22px",
              borderRadius: "14px",
              border: "1px solid rgba(96,165,250,0.45)",
              background: "rgba(8,16,40,0.92)",
              color: "#60a5fa",
              fontSize: "15px",
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backdropFilter: "blur(10px)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.5)",
              whiteSpace: "nowrap",
            }}
          >
            ✉️ שלח במייל
          </button>
        </div>
      )}

      {/* Exhibit list overlay (focus mode) */}
      {focusMode && showExhibitList && (
        <div
          style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            zIndex: 2000,
            background: "rgba(0,5,15,0.72)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setShowExhibitList(false)}
        >
          <div
            style={{
              background: "linear-gradient(180deg, rgba(0,18,40,0.98) 0%, rgba(2,8,24,0.99) 100%)",
              border: "1px solid rgba(0,229,255,0.28)",
              borderRadius: "24px",
              padding: "32px 36px",
              minWidth: "400px",
              maxWidth: "600px",
              maxHeight: "75vh",
              overflowY: "auto",
              boxShadow: "0 0 60px rgba(0,229,255,0.12), 0 24px 64px rgba(0,0,0,0.7)",
              direction: "rtl",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
              <div>
                <div style={{ fontSize: "11px", fontWeight: 600, color: "#67e8f9", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "4px" }}>
                  IAI EXHIBITION
                </div>
                <div style={{ fontSize: "20px", fontWeight: 800, color: "#f0faff", letterSpacing: "0.02em" }}>
                  פריטים בתצוגה
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowExhibitList(false)}
                style={{ background: "none", border: "1px solid rgba(148,163,184,0.25)", borderRadius: "50%", width: "36px", height: "36px", color: "#94a3b8", fontSize: "18px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
              >×</button>
            </div>

            {/* Count */}
            <div style={{ fontSize: "13px", color: "#67e8f9", fontWeight: 700, marginBottom: "16px", borderBottom: "1px solid rgba(0,229,255,0.15)", paddingBottom: "12px" }}>
              {sceneItems.length} פריטים
            </div>

            {/* Table */}
            {sceneItems.length === 0 ? (
              <div style={{ color: "#64748b", fontSize: "14px", textAlign: "center", padding: "24px 0" }}>אין פריטים בתצוגה</div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {sceneItems.map((item, idx) => {
                  const exhibit = masterExhibits.find((e) => e.slug === item.type || e.nameHe === item.type);
                  const name = exhibit?.nameHe ?? item.type;
                  const division = exhibit?.division ?? "—";
                  return (
                    <div
                      key={item.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "14px",
                        padding: "10px 14px",
                        borderRadius: "12px",
                        background: "rgba(0,229,255,0.04)",
                        border: "1px solid rgba(0,229,255,0.10)",
                      }}
                    >
                      <span style={{ fontSize: "11px", color: "#334155", fontWeight: 700, minWidth: "20px", textAlign: "center" }}>{idx + 1}</span>
                      <span style={{ fontSize: "14px", fontWeight: 800, color: "#e0f7ff", flex: 1 }}>{item.label ? `${name} — ${item.label}` : name}</span>
                      <span style={{ fontSize: "11px", fontWeight: 600, color: "#67e8f9", background: "rgba(0,229,255,0.10)", padding: "3px 8px", borderRadius: "6px", whiteSpace: "nowrap" }}>{division}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Scene saved toast */}
      {sceneSaveToast && (
        <div style={{ position: "fixed", bottom: "72px", left: "50%", transform: "translateX(-50%)", zIndex: 9999, padding: "12px 24px", borderRadius: "14px", border: "1px solid rgba(0,229,255,0.50)", background: "rgba(0,20,40,0.96)", color: "#00e5ff", fontSize: "14px", fontWeight: 800, letterSpacing: "0.04em", boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 24px rgba(0,229,255,0.18)", pointerEvents: "none" }}>
          {sceneSaveToast}
        </div>
      )}

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
