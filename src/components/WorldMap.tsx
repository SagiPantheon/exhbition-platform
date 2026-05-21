"use client";

import { useState } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

const GEO_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

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

const COUNTRY_MARKERS: Record<string, { coords: [number, number]; name: string }> = {
  GR: { coords: [21.8, 39.0], name: "Greece" },
  AT: { coords: [14.5, 47.5], name: "Austria" },
  SK: { coords: [19.5, 48.7], name: "Slovakia" },
  DE: { coords: [10.4, 51.1], name: "Germany" },
  FR: { coords: [2.2, 46.2], name: "France" },
  GB: { coords: [-3.4, 55.4], name: "United Kingdom" },
  US: { coords: [-95.7, 37.1], name: "United States" },
  IN: { coords: [78.9, 20.6], name: "India" },
  SG: { coords: [103.8, 1.4], name: "Singapore" },
  AE: { coords: [53.8, 23.4], name: "UAE" },
};

type WorldMapProps = {
  highlightedIsoCodes: string[];
};

type Tooltip = { content: string; x: number; y: number } | null;

export default function WorldMap({ highlightedIsoCodes }: WorldMapProps) {
  const [tooltip, setTooltip] = useState<Tooltip>(null);

  const numericSet = new Set(
    highlightedIsoCodes.map((c) => ALPHA2_TO_NUMERIC[c]).filter(Boolean)
  );

  const numericToAlpha2 = Object.fromEntries(
    highlightedIsoCodes
      .filter((c) => ALPHA2_TO_NUMERIC[c])
      .map((c) => [ALPHA2_TO_NUMERIC[c], c])
  );

  function scrollToCard(iso: string) {
    const el = document.getElementById(`country-${iso}`);
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return (
    <div
      style={{
        borderRadius: "24px",
        overflow: "hidden",
        background: "#0b1120",
        height: "550px",
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
              const alpha2 = numericToAlpha2[id];
              const label = alpha2 ? COUNTRY_MARKERS[alpha2]?.name : undefined;

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => active && alpha2 && scrollToCard(alpha2)}
                  onMouseEnter={(e) => {
                    if (!label) return;
                    const rect = (e.target as SVGElement)
                      .closest("svg")
                      ?.getBoundingClientRect();
                    const container = (e.target as SVGElement)
                      .closest("div")
                      ?.getBoundingClientRect();
                    if (!rect || !container) return;
                    setTooltip({
                      content: label,
                      x: e.clientX - container.left + 12,
                      y: e.clientY - container.top - 32,
                    });
                  }}
                  onMouseMove={(e) => {
                    if (!label) return;
                    const container = (e.target as SVGElement)
                      .closest("div")
                      ?.getBoundingClientRect();
                    if (!container) return;
                    setTooltip((prev) =>
                      prev
                        ? {
                            ...prev,
                            x: e.clientX - container.left + 12,
                            y: e.clientY - container.top - 32,
                          }
                        : prev
                    );
                  }}
                  onMouseLeave={() => setTooltip(null)}
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

        {highlightedIsoCodes.map((iso) => {
          const marker = COUNTRY_MARKERS[iso];
          if (!marker) return null;
          return (
            <Marker
              key={iso}
              coordinates={marker.coords}
              onClick={() => scrollToCard(iso)}
              style={{ cursor: "pointer" }}
            >
              <text
                textAnchor="middle"
                style={{
                  fontSize: "7px",
                  fontWeight: 800,
                  fill: "#ffffff",
                  letterSpacing: "0.04em",
                  pointerEvents: "none",
                  textShadow: "0 0 4px rgba(0,0,0,0.9)",
                }}
              >
                {marker.name}
              </text>
            </Marker>
          );
        })}
      </ComposableMap>

      {tooltip && (
        <div
          style={{
            position: "absolute",
            left: tooltip.x,
            top: tooltip.y,
            background: "rgba(0,0,0,0.82)",
            color: "#ffffff",
            padding: "6px 12px",
            borderRadius: "8px",
            fontSize: "13px",
            fontWeight: 700,
            pointerEvents: "none",
            whiteSpace: "nowrap",
            boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
            zIndex: 10,
          }}
        >
          {tooltip.content}
        </div>
      )}

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
