"use client";

import Script from "next/script";
import type React from "react";
import { useEffect, useMemo, useState } from "react";

type ModelViewerProps = {
  src: string;
  alt: string;
  poster?: string;
  cameraOrbit?: string;
  cameraTarget?: string;
  fieldOfView?: string;
};

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src?: string;
          alt?: string;
          poster?: string;
          "camera-orbit"?: string;
          "camera-target"?: string;
          "field-of-view"?: string;
          "camera-controls"?: boolean | string;
          "auto-rotate"?: boolean | string;
          "shadow-intensity"?: string;
          exposure?: string;
          loading?: string;
          reveal?: string;
        },
        HTMLElement
      >;
    }
  }
}

export default function ModelViewer({
  src,
  alt,
  poster,
  cameraOrbit,
  cameraTarget,
  fieldOfView,
}: ModelViewerProps) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let alive = true;

    if (typeof window !== "undefined" && customElements.get("model-viewer")) {
      setIsReady(true);
      return;
    }

    customElements.whenDefined("model-viewer").then(() => {
      if (alive) setIsReady(true);
    });

    return () => {
      alive = false;
    };
  }, []);

  const resolved = useMemo(() => {
    const normalizedSrc = src.toLowerCase();

    if (normalizedSrc.includes("arrow-3-showcase-3d.glb")) {
      return {
        orbit: "3.267rad 1.415rad auto",
        target: "auto auto auto",
        fov: "24.568deg",
        autoRotate: false,
        rotationPerSecond: "0deg",
      };
    }

    if (normalizedSrc.includes("arrow-2")) {
      return {
        orbit: "3.491rad 1.627rad auto",
        target: "auto auto auto",
        fov: "30deg",
        autoRotate: true,
        rotationPerSecond: "18deg",
      };
    }

    return {
      orbit: cameraOrbit ?? "45deg 70deg auto",
      target: cameraTarget ?? "auto auto auto",
      fov: fieldOfView ?? "30deg",
      autoRotate: true,
      rotationPerSecond: "18deg",
    };
  }, [src, cameraOrbit, cameraTarget, fieldOfView]);

  return (
    <>
      <Script
        type="module"
        src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
        strategy="afterInteractive"
      />

      {!isReady ? (
        <div className="flex h-[560px] items-center justify-center rounded-[28px] border border-cyan-400/20 bg-[radial-gradient(circle_at_top,rgba(40,80,180,0.20),rgba(8,18,38,0.96))] text-sm text-white/70">
          Loading 3D viewer...
        </div>
      ) : (
        <div className="relative overflow-hidden rounded-[28px] border border-cyan-400/20">
          <model-viewer
            src={src}
            poster={poster}
            alt={alt}
            camera-controls
            camera-orbit={resolved.orbit}
            camera-target={resolved.target}
            field-of-view={resolved.fov}
            interaction-prompt="none"
            shadow-intensity="1"
            exposure="1"
            environment-image="neutral"
            auto-rotate={resolved.autoRotate ? true : undefined}
            rotation-per-second={resolved.rotationPerSecond}
            style={{
              width: "100%",
              height: "560px",
              background:
                "radial-gradient(circle at top, rgba(40,80,180,0.20), rgba(8,18,38,0.96))",
              borderRadius: "20px",
            }}
          />
        </div>
      )}
    </>
  );
}
