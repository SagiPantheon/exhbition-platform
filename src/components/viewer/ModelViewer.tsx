"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type ModelViewerProps = {
  src: string;
  alt: string;
  poster?: string;
  cameraOrbit?: string;
  cameraTarget?: string;
  fieldOfView?: string;
};

export default function ModelViewer({
  src,
  alt,
  poster,
  cameraOrbit,
  cameraTarget,
  fieldOfView,
}: ModelViewerProps) {
  const [ready, setReady] = useState(false);
  const viewerRef = useRef<any>(null);

  const resolved = useMemo(() => {
    const normalizedSrc = src.toLowerCase();

    if (normalizedSrc.includes("arrow-3-showcase-3d.glb")) {
      return {
        orbit: "3.267rad 1.415rad 1.902m",
        target: "0.000m 0.159m 0.000m",
        fov: "24.568deg",
        autoRotate: false,
        rotationPerSecond: "0deg",
      };
    }

    if (normalizedSrc.includes("arrow-2")) {
      return {
        orbit: "3.491rad 1.627rad 2.270m",
        target: "0.000m 0.489m -0.000m",
        fov: "30.000deg",
        autoRotate: true,
        rotationPerSecond: "18deg",
      };
    }

    return {
      orbit: cameraOrbit,
      target: cameraTarget,
      fov: fieldOfView,
      autoRotate: true,
      rotationPerSecond: "18deg",
    };
  }, [src, cameraOrbit, cameraTarget, fieldOfView]);

  const viewerKey = `${src}|${resolved.orbit ?? "default"}|${resolved.target ?? "default"}|${resolved.fov ?? "default"}|${resolved.rotationPerSecond}`;

  useEffect(() => {
    let mounted = true;

    import("@google/model-viewer").then(() => {
      if (mounted) setReady(true);
    });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!ready || !viewerRef.current) return;

    const viewer = viewerRef.current;

    const handleLoad = () => {
      // keep hook for future per-asset tuning if needed
    };

    viewer.addEventListener("load", handleLoad);

    return () => {
      viewer.removeEventListener("load", handleLoad);
    };
  }, [ready, viewerKey]);

  if (!ready) {
    return (
      <div className="flex h-[560px] items-center justify-center rounded-[28px] border border-cyan-400/20 bg-[radial-gradient(circle_at_top,rgba(40,80,180,0.20),rgba(8,18,38,0.96))] text-sm text-white/70">
        Loading 3D viewer...
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-cyan-400/20">
      <model-viewer
        key={viewerKey}
        ref={viewerRef}
        src={src}
        poster={poster}
        alt={alt}
        camera-controls
        camera-orbit={resolved.orbit}
        camera-target={resolved.target}
        field-of-view={resolved.fov}
        auto-rotate={resolved.autoRotate}
        rotation-per-second={resolved.rotationPerSecond}
        interaction-prompt="none"
        shadow-intensity="1"
        exposure="1"
        environment-image="neutral"
        style={{
          width: "100%",
          height: "560px",
          background:
            "radial-gradient(circle at top, rgba(40,80,180,0.20), rgba(8,18,38,0.96))",
          borderRadius: "20px",
        }}
      />
    </div>
  );
}
