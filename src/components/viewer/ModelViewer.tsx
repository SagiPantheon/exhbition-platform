"use client";

import { useEffect, useState } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": any;
    }
  }
}

type ModelViewerProps = {
  src: string;
  alt?: string;
  poster?: string;
};

export default function ModelViewer({
  src,
  alt = "3D model",
  poster,
}: ModelViewerProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    import("@google/model-viewer").then(() => {
      if (mounted) setReady(true);
    });

    return () => {
      mounted = false;
    };
  }, []);

  if (!ready) {
    return (
      <div className="flex h-[560px] items-center justify-center rounded-[28px] border border-cyan-300/20 bg-[#081226] text-slate-300">
        Loading 3D viewer...
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-cyan-300/20 bg-[#081226] p-4 shadow-[0_0_40px_rgba(24,119,242,0.10)]">
      <model-viewer
        src={src}
        poster={poster}
        alt={alt}
        camera-controls
        auto-rotate
        rotation-per-second="18deg"
        interaction-prompt="none"
        shadow-intensity="1"
        exposure="1"
        environment-image="neutral"
        style={{
          width: "100%",
          height: "560px",
          background:
            "radial-gradient(circle at top, rgba(40,80,180,0.20), rgba(8,18,38,1) 65%)",
          borderRadius: "20px",
        }}
      />
    </div>
  );
}
