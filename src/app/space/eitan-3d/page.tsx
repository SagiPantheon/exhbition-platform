"use client";

import "@google/model-viewer";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": any;
    }
  }
}

export default function Eitan3DPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "32px",
        background:
          "radial-gradient(circle at top, rgba(28,58,120,0.55), rgba(8,14,30,1) 62%)",
        color: "#f5f7fb",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ marginBottom: "18px", opacity: 0.8, letterSpacing: "0.18em", fontSize: "0.8rem" }}>
          3D TEST VIEWER
        </div>

        <h1 style={{ margin: 0, fontSize: "2.3rem", fontWeight: 800 }}>
          IAI Eitan — GLB Test
        </h1>

        <p style={{ marginTop: "12px", color: "rgba(231,236,255,0.78)", maxWidth: "760px", lineHeight: 1.7 }}>
          Internal test page for validating the first GLB model inside the Exhibition Platform.
        </p>

        <div
          style={{
            marginTop: "24px",
            borderRadius: "24px",
            border: "1px solid rgba(255,255,255,0.10)",
            background: "linear-gradient(180deg, rgba(18,26,48,0.92) 0%, rgba(10,14,28,0.96) 100%)",
            boxShadow: "0 18px 44px rgba(0,0,0,0.24)",
            padding: "18px",
          }}
        >
          <div
            style={{
              height: "72vh",
              minHeight: "560px",
              borderRadius: "18px",
              overflow: "hidden",
              background: "radial-gradient(circle at center, rgba(42,74,144,0.35), rgba(7,11,22,1) 72%)",
            }}
          >
            <model-viewer
              src="/models/iai_eitan.glb"
              alt="IAI Eitan 3D model"
              camera-controls
              auto-rotate
              shadow-intensity="1"
              exposure="1"
              environment-image="neutral"
              style={{ width: "100%", height: "100%" }}
            />
          </div>

          <div style={{ marginTop: "14px", display: "flex", justifyContent: "center" }}>
            <span
              style={{
                borderRadius: "999px",
                border: "1px solid rgba(255,255,255,0.14)",
                background: "rgba(255,255,255,0.04)",
                padding: "6px 12px",
                fontSize: "11px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(231,236,255,0.72)",
              }}
            >
              Unclassified
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
