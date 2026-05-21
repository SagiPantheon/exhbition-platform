"use client";

import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const GEO_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// ISO alpha-2 → ISO numeric (used by world-atlas topojson)
const ALPHA2_TO_NUMERIC: Record<string, string> = {
  GR: "300",
  AT: "40",
  SK: "703",
  DE: "276",
  FR: "250",
  GB: "826",
  US: "840",
  IN: "356",
  SG: "702",
  AE: "784",
};

type WorldMapProps = {
  highlightedIsoCodes: string[];
};

export default function WorldMap({ highlightedIsoCodes }: WorldMapProps) {
  const numericSet = new Set(
    highlightedIsoCodes
      .map((c) => ALPHA2_TO_NUMERIC[c])
      .filter(Boolean)
  );

  const numericToAlpha2 = Object.fromEntries(
    highlightedIsoCodes
      .filter((c) => ALPHA2_TO_NUMERIC[c])
      .map((c) => [ALPHA2_TO_NUMERIC[c], c])
  );

  function handleClick(numericId: string) {
    const alpha2 = numericToAlpha2[numericId];
    if (!alpha2) return;
    const el = document.getElementById(`country-${alpha2}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return (
    <div
      style={{
        borderRadius: "24px",
        overflow: "hidden",
        background: "#0b1120",
        height: "400px",
        border: "1px solid rgba(99,179,237,0.18)",
        boxShadow: "0 0 48px rgba(11,110,253,0.08)",
        position: "relative",
      }}
    >
      <ComposableMap
        projection="geoNaturalEarth1"
        projectionConfig={{ scale: 160, center: [15, 20] }}
        style={{ width: "100%", height: "100%" }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const id = String(geo.id);
              const active = numericSet.has(id);
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => active && handleClick(id)}
                  style={{
                    default: {
                      fill: active ? "#0B6EFD" : "#1e2d45",
                      stroke: "#0b1120",
                      strokeWidth: 0.5,
                      outline: "none",
                      filter: active
                        ? "drop-shadow(0 0 6px rgba(11,110,253,0.75))"
                        : "none",
                      cursor: active ? "pointer" : "default",
                    },
                    hover: {
                      fill: active ? "#3b82f6" : "#263349",
                      stroke: "#0b1120",
                      strokeWidth: 0.5,
                      outline: "none",
                      filter: active
                        ? "drop-shadow(0 0 12px rgba(59,130,246,0.95))"
                        : "none",
                      cursor: active ? "pointer" : "default",
                    },
                    pressed: {
                      fill: active ? "#1d4ed8" : "#1e2d45",
                      stroke: "#0b1120",
                      strokeWidth: 0.5,
                      outline: "none",
                    },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>

      <div
        style={{
          position: "absolute",
          bottom: "14px",
          right: "18px",
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "rgba(148,163,184,0.5)",
        }}
      >
        Click a country to scroll
      </div>
    </div>
  );
}
