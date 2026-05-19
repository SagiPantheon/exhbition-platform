import Link from "next/link";

type MCSShowcasePanelProps = {
  name?: string;
  code?: string;
  status?: string;
  assetForm?: string;
  scale?: string;
  weightKg?: number;
};

export default function MCSShowcasePanel({
  name = "MCS",
  code = "SP-004",
  status = "approved",
  assetForm = "mock-up",
  scale = "1:2",
  weightKg = 37,
}: MCSShowcasePanelProps) {
  return (
    <section
      style={{
        width: "100%",
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
        borderRadius: "28px",
        padding: "24px",
        marginBottom: "32px",
        border: "1px solid rgba(120, 190, 255, 0.18)",
        background:
          "radial-gradient(circle at top left, rgba(80,140,255,0.18) 0%, rgba(9,14,28,0.98) 40%, rgba(5,8,18,1) 100%)",
        boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
        color: "#f5f7fb",
      }}
    >
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.45fr) minmax(360px, 0.9fr)",
          gap: "24px",
          alignItems: "stretch",
        }}
      >
        <div
          style={{
            minWidth: 0,
            borderRadius: "24px",
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.02)",
            minHeight: "640px",
          }}
        >
          <img
            src="/images/mcs-showcase.png"
            alt="MCS showcase"
            style={{
              width: "100%",
              height: "100%",
              display: "block",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </div>

        <div
          style={{
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            gap: "18px",
          }}
        >
          <div
            style={{
              borderRadius: "24px",
              padding: "24px",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.04)",
              boxShadow: "0 12px 30px rgba(0,0,0,0.22)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: "12px",
                marginBottom: "16px",
                flexWrap: "wrap",
              }}
            >
              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    fontSize: "0.78rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                    color: "rgba(180,210,255,0.75)",
                    marginBottom: "8px",
                  }}
                >
                  Featured Asset
                </div>

                <h2
                  style={{
                    margin: 0,
                    fontSize: "2rem",
                    lineHeight: 1.08,
                  }}
                >
                  {name}
                </h2>

                <div
                  style={{
                    marginTop: "8px",
                    color: "rgba(245,247,251,0.72)",
                    fontSize: "0.95rem",
                  }}
                >
                  {code}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  alignItems: "flex-end",
                  flexShrink: 0,
                }}
              >
              </div>
            </div>

            <p
              style={{
                margin: 0,
                lineHeight: 1.65,
                fontSize: "0.95rem",
                color: "rgba(245,247,251,0.88)",
              }}
            >
              Premium technical showcase panel for the current MCS exhibition
              mock-up. Styled in the Arrow-3 presentation language, with a
              defense-tech visual treatment and future readiness for interactive
              3D asset presentation.
            </p>

            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
                marginTop: "18px",
              }}
            >
              <Link href="/exhibitions" style={{ textDecoration: "none" }}>
                <ActionButton label="Add to Exhibition" primary />
              </Link>

              <ActionButton label="View Asset Details" />
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: "12px",
            }}
          >
            <SpecBox label="Overall Height" value="2.0 m" />
            <SpecBox label="Mock-up Width" value="1.6 m" />
            <SpecBox label="Mock-up Length" value="1.0 m" />
            <SpecBox label="Mock-up Weight" value={`${weightKg} kg`} />
            <SpecBox label="Stand Diameter" value="1.0–1.2 m" />
            <SpecBox label="Stand Weight" value="50 kg" />
          </div>

          <div
            style={{
              borderRadius: "24px",
              padding: "20px",
              border: "1px solid rgba(255,255,255,0.08)",
              background:
                "linear-gradient(180deg, rgba(17,24,44,0.92) 0%, rgba(10,14,28,0.95) 100%)",
            }}
          >
            <div
              style={{
                fontSize: "0.78rem",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "rgba(180,210,255,0.75)",
                marginBottom: "14px",
              }}
            >
              Operational Readiness
            </div>

            <ReadinessRow label="Environment" value="Indoor only" />
            <ReadinessRow label="Display Method" value="Round pedestal" />
            <ReadinessRow label="Support" value="Vertical pipe" />
            <ReadinessRow label="Presentation Level" value="Approved showcase" />
            <ReadinessRow label="Visual Language" value="Arrow-3 style panel" />
          </div>
        </div>
      </div>
    </section>
  );
}

function ActionButton({
  label,
  primary = false,
}: {
  label: string;
  primary?: boolean;
}) {
  return (
    <div
      style={{
        padding: "11px 16px",
        borderRadius: "14px",
        fontSize: "0.92rem",
        fontWeight: 700,
        cursor: "pointer",
        border: primary
          ? "1px solid rgba(120, 190, 255, 0.45)"
          : "1px solid rgba(255,255,255,0.14)",
        background: primary
          ? "linear-gradient(180deg, rgba(78,145,255,0.28) 0%, rgba(41,92,180,0.18) 100%)"
          : "rgba(255,255,255,0.05)",
        color: "#f5f7fb",
        boxShadow: primary ? "0 10px 24px rgba(35, 96, 190, 0.22)" : "none",
      }}
    >
      {label}
    </div>
  );
}

function Badge({ text, tone }: {
  text: string;
  tone: "success" | "info" | "neutral";
}) {
  const tones = {
    success: {
      background: "rgba(92, 214, 126, 0.14)",
      border: "1px solid rgba(92, 214, 126, 0.35)",
      color: "#9df0b2",
    },
    info: {
      background: "rgba(120, 190, 255, 0.14)",
      border: "1px solid rgba(120, 190, 255, 0.35)",
      color: "#9fd3ff",
    },
    neutral: {
      background: "rgba(255,255,255,0.08)",
      border: "1px solid rgba(255,255,255,0.14)",
      color: "#f3f6ff",
    },
  } as const;

  return (
    <span
      style={{
        padding: "6px 10px",
        borderRadius: "999px",
        fontSize: "0.78rem",
        fontWeight: 600,
        textTransform: "capitalize",
        ...tones[tone],
      }}
    >
      {text}
    </span>
  );
}

function SpecBox({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        minWidth: 0,
        borderRadius: "20px",
        padding: "16px",
        border: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(255,255,255,0.04)",
      }}
    >
      <div
        style={{
          fontSize: "0.72rem",
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          color: "rgba(180,210,255,0.7)",
          marginBottom: "8px",
        }}
      >
        {label}
      </div>

      <div
        style={{
          fontSize: "1.25rem",
          fontWeight: 700,
          color: "#f5f7fb",
          wordBreak: "break-word",
        }}
      >
        {value}
      </div>
    </div>
  );
}

function ReadinessRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: "16px",
        padding: "10px 0",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <span style={{ color: "rgba(180,210,255,0.72)" }}>{label}</span>
      <span style={{ color: "#f5f7fb", textAlign: "right" }}>{value}</span>
    </div>
  );
}