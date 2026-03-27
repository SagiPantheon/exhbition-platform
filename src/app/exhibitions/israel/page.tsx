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
    name: "כנס חלל - גמר תוכניות קרן רמון",
    location: "בנייני האומה, ירושלים",
    startDate: "2026-04-30",
    endDate: "2026-04-30",
    mainTheme: "חלל / חינוך / תלמידים / גמר תוכניות קרן רמון",
    brochure: "TBD",
    pavilionStatus: "קיים ביתן",
    supplier: "זאורוס",
    prepStatus: "ביתן בפיתוח",
    overallStatus: "בתהליך",
    internalOwner: "שגיא עמיאל",
    boothSize: "6×3 מטר",
    designerStatus: "שגיא דקל / זאורוס",
    logisticsStatus: "קובי אלגזר",
    plannedAssets: [
      "רקטת שביט",
      "דגם מוקטן של בראשית על פודיום",
      "לוויין טקסאר",
    ],
    approvalsStatus: "שרי מגדל",
    brandingStatus: "זאורוס",
    vipHosting: "אסטרטגיה / מט״ח",
    photoVideo: "לא הוזמן",
    finalApproval: "עמוס הכהן",
    mainBlocker: "ברושור טרם צורף",
    blockers: "ברושור טרם צורף",
    notes:
      "אירוע גמר בתאריך 30.04.2026 בבנייני האומה בירושלים. יש ביתן. הספק הזוכה: זאורוס.",
  },
  {
    id: "israel-002",
    name: "MARE MED Athens",
    location: "אתונה, יוון",
    startDate: "2026-05-11",
    endDate: "2026-05-14",
    mainTheme: "ביטחון / הגנה / טכנולוגיה ימית",
    brochure: "TBD",
    pavilionStatus: "ללא ביתן",
    supplier: "בני מורן",
    prepStatus: "TBD",
    overallStatus: "פתוח",
    internalOwner: "שגיא עמיאל",
    boothSize: "אין שטח ביתן",
    designerStatus: "TBD",
    logisticsStatus: "TBD",
    plannedAssets: ["ללא מוצגים"],
    approvalsStatus: "שרי מגדל",
    brandingStatus: "TBD",
    vipHosting: "TBD",
    photoVideo: "TBD",
    finalApproval: "ששי חודדה",
    mainBlocker: "TBD",
    blockers: "TBD",
    notes:
      "המשלחת יוצאת בתאריך 11.05.2026 וחוזרת בתאריך 14.05.2026. יום הכנס המרכזי הוא 12.05.2026 באתונה וכולל הרצאות, פאנלים מקצועיים, נטוורקינג וקוקטייל ערב. בתאריך 13.05.2026 יתקיימו סיורים מקצועיים ממוקדים בתחום הנמלים.",
  },
];

export default function IsraelExhibitionsPage() {
  const summary = {
    total: exhibitions.length,
    approvalsPending: exhibitions.filter((e) => e.approvalsStatus !== "אושר").length,
    missingBrochure: exhibitions.filter((e) => e.brochure === "TBD" || e.brochure.includes("טרם")).length,
    missingSupplier: exhibitions.filter((e) => e.supplier === "TBD" || e.supplier === "טרם נקבע").length,
    openPrep: exhibitions.filter((e) => e.prepStatus !== "הושלם").length,
  };

  return (
    <main
      dir="rtl"
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
            חזרה לתערוכות
          </Link>
          <Link href="/" style={navButtonStyle}>
            חזרה לראשי
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
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#7dd3fc",
              marginBottom: "10px",
            }}
          >
            גיליון עבודה תפעולי ראשי
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
            גיליון העבודה המרכזי לניהול כנסים ותערוכות: נתוני בסיס, היגיון ביתן,
            זרימת ספקים, מצב ברושור, מוצגים מתוכננים, אישורים, מיתוג, אירוח, מגבלות,
            חסמים ואישור סופי.
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
            <div style={labelStyle}>סה״כ תערוכות</div>
            <div style={valueStyle}>{summary.total}</div>
          </div>
          <div style={boxStyle}>
            <div style={labelStyle}>אישורים ממתינים</div>
            <div style={valueStyle}>{summary.approvalsPending}</div>
          </div>
          <div style={boxStyle}>
            <div style={labelStyle}>ללא ברושור</div>
            <div style={valueStyle}>{summary.missingBrochure}</div>
          </div>
          <div style={boxStyle}>
            <div style={labelStyle}>ללא ספק</div>
            <div style={valueStyle}>{summary.missingSupplier}</div>
          </div>
          <div style={boxStyle}>
            <div style={labelStyle}>הכנה פתוחה</div>
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
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#7dd3fc",
              marginBottom: "18px",
            }}
          >
            גיליונות עבודה לתערוכות
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
                    <div style={labelStyle}>שם התערוכה</div>
                    <div style={heroValueStyle}>{exhibition.name}</div>

                    <div style={{ marginTop: "18px" }}>
                      <div style={labelStyle}>נושא מרכזי</div>
                      <div style={valueStyle}>{exhibition.mainTheme}</div>
                    </div>

                    <div style={{ marginTop: "18px" }}>
                      <div style={labelStyle}>הערות</div>
                      <div style={valueStyle}>{exhibition.notes}</div>
                    </div>

                    <div style={{ marginTop: "18px" }}>
                      <div style={labelStyle}>חסם מרכזי</div>
                      <div style={valueStyle}>{exhibition.mainBlocker}</div>
                    </div>

                    <div style={{ marginTop: "18px" }}>
                      <div style={labelStyle}>חסמים / פריטים חסרים</div>
                      <div style={valueStyle}>{exhibition.blockers}</div>
                    </div>
                  </div>

                  <div style={{ display: "grid", gap: "14px" }}>
                    <div style={boxStyle}>
                      <div style={labelStyle}>מיקום</div>
                      <div style={valueStyle}>{exhibition.location}</div>
                    </div>
                    <div style={boxStyle}>
                      <div style={labelStyle}>תאריך התחלה</div>
                      <div style={valueStyle}>{exhibition.startDate}</div>
                    </div>
                    <div style={boxStyle}>
                      <div style={labelStyle}>תאריך סיום</div>
                      <div style={valueStyle}>{exhibition.endDate}</div>
                    </div>
                    <div style={boxStyle}>
                      <div style={labelStyle}>ברושור / קובץ מצורף</div>
                      <div style={valueStyle}>{exhibition.brochure}</div>
                    </div>
                  </div>

                  <div style={{ display: "grid", gap: "14px" }}>
                    <div style={boxStyle}>
                      <div style={labelStyle}>סטטוס ביתן</div>
                      <div style={valueStyle}>{exhibition.pavilionStatus}</div>
                    </div>
                    <div style={boxStyle}>
                      <div style={labelStyle}>ספק</div>
                      <div style={valueStyle}>{exhibition.supplier}</div>
                    </div>
                    <div style={boxStyle}>
                      <div style={labelStyle}>סטטוס הכנה</div>
                      <div style={valueStyle}>{exhibition.prepStatus}</div>
                    </div>
                    <div style={boxStyle}>
                      <div style={labelStyle}>סטטוס כללי</div>
                      <div style={valueStyle}>{exhibition.overallStatus}</div>
                    </div>
                  </div>

                  <div style={{ display: "grid", gap: "14px" }}>
                    <div style={boxStyle}>
                      <div style={labelStyle}>אחראי פנימי</div>
                      <div style={valueStyle}>{exhibition.internalOwner}</div>
                    </div>
                    <div style={boxStyle}>
                      <div style={labelStyle}>גודל ביתן / שטח</div>
                      <div style={valueStyle}>{exhibition.boothSize}</div>
                    </div>
                    <div style={boxStyle}>
                      <div style={labelStyle}>מעצב / סטטוס פריסה</div>
                      <div style={valueStyle}>{exhibition.designerStatus}</div>
                    </div>
                    <div style={boxStyle}>
                      <div style={labelStyle}>לוגיסטיקה / התקנה</div>
                      <div style={valueStyle}>{exhibition.logisticsStatus}</div>
                    </div>
                  </div>

                  <div style={{ display: "grid", gap: "14px" }}>
                    <div style={boxStyle}>
                      <div style={labelStyle}>מוצגים מתוכננים</div>
                      <div style={{ ...valueStyle, whiteSpace: "pre-line" }}>
                        {Array.isArray(exhibition.plannedAssets)
                          ? exhibition.plannedAssets.map((asset, index) => `• ${asset}`).join("\n")
                          : exhibition.plannedAssets}
                      </div>
                    </div>
                    <div style={boxStyle}>
                      <div style={labelStyle}>אישורים</div>
                      <div style={valueStyle}>{exhibition.approvalsStatus}</div>
                    </div>
                    <div style={boxStyle}>
                      <div style={labelStyle}>מיתוג</div>
                      <div style={valueStyle}>{exhibition.brandingStatus}</div>
                    </div>
                    <div style={boxStyle}>
                      <div style={labelStyle}>VIP / אירוח</div>
                      <div style={valueStyle}>{exhibition.vipHosting}</div>
                    </div>
                    <div style={boxStyle}>
                      <div style={labelStyle}>מגבלות צילום / וידאו</div>
                      <div style={valueStyle}>{exhibition.photoVideo}</div>
                    </div>
                    <div style={boxStyle}>
                      <div style={labelStyle}>אישור סופי</div>
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
          בלתי מסווג
        </div>
      </div>
    </main>
  );
}

const labelStyle = {
  fontSize: "12px",
  letterSpacing: "0.08em",
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
