import Link from "next/link";

const navButtonStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "44px",
  padding: "0 16px",
  borderRadius: "14px",
  border: "1px solid rgba(125,211,252,0.35)",
  background: "rgba(14, 22, 38, 0.72)",
  color: "white",
  textDecoration: "none",
  fontSize: "14px",
  fontWeight: 600,
} as const;

const boxStyle = {
  padding: "18px",
  borderRadius: "20px",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.12)",
} as const;

const exhibitions = [
  {
    id: "israel-001",
    name: "כנס חלל - ירושלים",
    location: "Jerusalem",
    startDate: "2026-04-30",
    endDate: "2026-04-30",
    mainTheme: "Space / students / education / exposure",
    brochure: "To be attached",
    pavilionStatus: "ללא ביתן / השתתפות בלבד",
    supplier: "TBD",
    prepStatus: "In preparation",
    internalOwner: "TBD",
    boothSize: "TBD",
    designerStatus: "Open",
    logisticsStatus: "Open",
    plannedAssets: "TBD",
    approvalsStatus: "Pending",
    brandingStatus: "Pending",
    vipHosting: "Gifts / refreshments / hosting review required",
    photoVideo: "Restrictions TBD",
    finalApproval: "Not approved yet",
    blockers: "Brochure, supplier, and final approvals still missing",
    notes:
      "Domestic operational example. Can later connect brochure file, assets, approvals, supplier, and final preparation flow.",
  },
  {
    id: "israel-002",
    name: "IACAS",
    location: "Panorama, Tel Aviv",
    startDate: "TBD",
    endDate: "TBD",
    mainTheme: "Defense / industry / conference",
    brochure: "Awaiting file",
    pavilionStatus: "קיים ביתן / TBD",
    supplier: "TBD",
    prepStatus: "Open",
    internalOwner: "TBD",
    boothSize: "TBD",
    designerStatus: "Open",
    logisticsStatus: "Open",
    plannedAssets: "TBD",
    approvalsStatus: "Open",
    brandingStatus: "Open",
    vipHosting: "To be defined",
    photoVideo: "To be checked",
    finalApproval: "Open",
    blockers: "Main supplier and final scope still not closed",
    notes:
      "Can later expand into a fully managed domestic exhibition worksheet with assets, branding, supplier, and hosting logic.",
  },
];

export default function IsraelExhibitionsPage() {
  const summary = {
    total: exhibitions.length,
    approvalsPending: exhibitions.filter((e) => e.approvalsStatus !== "Approved").length,
    missingBrochure: exhibitions.filter((e) => e.brochure.includes("Awaiting") || e.brochure.includes("attached")).length,
    missingSupplier: exhibitions.filter((e) => e.supplier === "TBD").length,
    openPrep: exhibitions.filter((e) => e.prepStatus !== "Completed").length,
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, rgba(44,92,160,0.18), transparent 32%), linear-gradient(180deg, #07111f 0%, #0a1628 45%, #0b1320 100%)",
        color: "white",
        padding: "24px 24px 64px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: "1560px", margin: "0 auto" }}>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "22px" }}>
          <Link href="/exhibitions" style={navButtonStyle}>
            ← Back to Exhibitions
          </Link>
          <Link href="/" style={navButtonStyle}>
            Back to Main
          </Link>
        </div>

        <section
          style={{
            border: "1px solid rgba(125,211,252,0.18)",
            borderRadius: "28px",
            padding: "26px 24px 30px",
            background: "rgba(8, 15, 28, 0.34)",
            marginBottom: "26px",
          }}
        >
          <div
            style={{
              fontSize: "13px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#7dd3fc",
              marginBottom: "10px",
            }}
          >
            Main operational worksheet
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: "56px",
              lineHeight: 1.02,
              fontWeight: 800,
              letterSpacing: "-0.04em",
            }}
          >
            כנסים ותערוכות בארץ
          </h1>

          <p
            style={{
              marginTop: "14px",
              maxWidth: "1080px",
              fontSize: "19px",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.80)",
            }}
          >
            Primary domestic exhibition worksheet for real operational work in Israel:
            core exhibition data, pavilion logic, supplier flow, brochure status,
            planned assets, approvals, branding, hosting, restrictions, blockers, and final approval.
          </p>
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <div style={boxStyle}>
            <div style={labelStyle}>Total exhibitions</div>
            <div style={valueStyle}>{summary.total}</div>
          </div>
          <div style={boxStyle}>
            <div style={labelStyle}>Approvals pending</div>
            <div style={valueStyle}>{summary.approvalsPending}</div>
          </div>
          <div style={boxStyle}>
            <div style={labelStyle}>Missing brochure</div>
            <div style={valueStyle}>{summary.missingBrochure}</div>
          </div>
          <div style={boxStyle}>
            <div style={labelStyle}>Missing supplier</div>
            <div style={valueStyle}>{summary.missingSupplier}</div>
          </div>
          <div style={boxStyle}>
            <div style={labelStyle}>Open preparation</div>
            <div style={valueStyle}>{summary.openPrep}</div>
          </div>
        </section>

        <section
          style={{
            border: "1px solid rgba(125,211,252,0.18)",
            borderRadius: "28px",
            padding: "24px",
            background: "rgba(8, 15, 28, 0.34)",
          }}
        >
          <div
            style={{
              fontSize: "13px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#7dd3fc",
              marginBottom: "18px",
            }}
          >
            Exhibition worksheets
          </div>

          <div style={{ display: "grid", gap: "22px" }}>
            {exhibitions.map((exhibition) => (
              <article
                key={exhibition.id}
                style={{
                  borderRadius: "24px",
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: "rgba(255,255,255,0.04)",
                  padding: "22px",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1.1fr 0.9fr 0.9fr 0.9fr 0.9fr",
                    gap: "16px",
                    alignItems: "start",
                  }}
                >
                  <div>
                    <div style={labelStyle}>Exhibition name</div>
                    <div style={heroValueStyle}>{exhibition.name}</div>

                    <div style={{ marginTop: "18px" }}>
                      <div style={labelStyle}>Main theme</div>
                      <div style={valueStyle}>{exhibition.mainTheme}</div>
                    </div>

                    <div style={{ marginTop: "18px" }}>
                      <div style={labelStyle}>Notes</div>
                      <div style={valueStyle}>{exhibition.notes}</div>
                    </div>

                    <div style={{ marginTop: "18px" }}>
                      <div style={labelStyle}>Blockers / missing items</div>
                      <div style={valueStyle}>{exhibition.blockers}</div>
                    </div>
                  </div>

                  <div style={{ display: "grid", gap: "14px" }}>
                    <div style={boxStyle}>
                      <div style={labelStyle}>Location</div>
                      <div style={valueStyle}>{exhibition.location}</div>
                    </div>
                    <div style={boxStyle}>
                      <div style={labelStyle}>Start date</div>
                      <div style={valueStyle}>{exhibition.startDate}</div>
                    </div>
                    <div style={boxStyle}>
                      <div style={labelStyle}>End date</div>
                      <div style={valueStyle}>{exhibition.endDate}</div>
                    </div>
                    <div style={boxStyle}>
                      <div style={labelStyle}>Brochure / attachment</div>
                      <div style={valueStyle}>{exhibition.brochure}</div>
                    </div>
                  </div>

                  <div style={{ display: "grid", gap: "14px" }}>
                    <div style={boxStyle}>
                      <div style={labelStyle}>Pavilion status</div>
                      <div style={valueStyle}>{exhibition.pavilionStatus}</div>
                    </div>
                    <div style={boxStyle}>
                      <div style={labelStyle}>Supplier / ספק</div>
                      <div style={valueStyle}>{exhibition.supplier}</div>
                    </div>
                    <div style={boxStyle}>
                      <div style={labelStyle}>Preparation status</div>
                      <div style={valueStyle}>{exhibition.prepStatus}</div>
                    </div>
                    <div style={boxStyle}>
                      <div style={labelStyle}>Planned assets</div>
                      <div style={valueStyle}>{exhibition.plannedAssets}</div>
                    </div>
                  </div>

                  <div style={{ display: "grid", gap: "14px" }}>
                    <div style={boxStyle}>
                      <div style={labelStyle}>Internal owner</div>
                      <div style={valueStyle}>{exhibition.internalOwner}</div>
                    </div>
                    <div style={boxStyle}>
                      <div style={labelStyle}>Booth size / area</div>
                      <div style={valueStyle}>{exhibition.boothSize}</div>
                    </div>
                    <div style={boxStyle}>
                      <div style={labelStyle}>Designer / layout</div>
                      <div style={valueStyle}>{exhibition.designerStatus}</div>
                    </div>
                    <div style={boxStyle}>
                      <div style={labelStyle}>Logistics / installation</div>
                      <div style={valueStyle}>{exhibition.logisticsStatus}</div>
                    </div>
                  </div>

                  <div style={{ display: "grid", gap: "14px" }}>
                    <div style={boxStyle}>
                      <div style={labelStyle}>Approvals</div>
                      <div style={valueStyle}>{exhibition.approvalsStatus}</div>
                    </div>
                    <div style={boxStyle}>
                      <div style={labelStyle}>Branding</div>
                      <div style={valueStyle}>{exhibition.brandingStatus}</div>
                    </div>
                    <div style={boxStyle}>
                      <div style={labelStyle}>VIP / hosting</div>
                      <div style={valueStyle}>{exhibition.vipHosting}</div>
                    </div>
                    <div style={boxStyle}>
                      <div style={labelStyle}>Photo / video restrictions</div>
                      <div style={valueStyle}>{exhibition.photoVideo}</div>
                    </div>
                    <div style={boxStyle}>
                      <div style={labelStyle}>Final approval</div>
                      <div style={valueStyle}>{exhibition.finalApproval}</div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div
          style={{
            marginTop: "22px",
            textAlign: "center",
            fontSize: "12px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.56)",
          }}
        >
          Unclassified
        </div>
      </div>
    </main>
  );
}

const labelStyle = {
  fontSize: "12px",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.70)",
  marginBottom: "8px",
  fontWeight: 700,
} as const;

const valueStyle = {
  fontSize: "16px",
  lineHeight: 1.65,
  color: "white",
  fontWeight: 600,
} as const;

const heroValueStyle = {
  fontSize: "30px",
  lineHeight: 1.1,
  color: "white",
  fontWeight: 800,
} as const;
