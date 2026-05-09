import { abroadFlagCards } from "../../../../data/abroadFlags";

function StatCard({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note: string;
}) {
  return (
    <div
      style={{
        borderRadius: "22px",
        border: "1px solid rgba(148,163,184,0.16)",
        background: "rgba(10,16,30,0.86)",
        padding: "20px",
        boxShadow: "0 20px 50px rgba(0,0,0,0.22)",
      }}
    >
      <div
        style={{
          fontSize: "12px",
          fontWeight: 800,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "#7dd3fc",
          marginBottom: "10px",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: "34px",
          fontWeight: 900,
          lineHeight: 1,
          marginBottom: "10px",
          color: "#f8fafc",
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: "14px",
          lineHeight: 1.6,
          color: "rgba(226,232,240,0.78)",
        }}
      >
        {note}
      </div>
    </div>
  );
}

export default function HebrewAbroadExhibitionsPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, rgba(14,165,233,0.16), rgba(2,6,23,1) 40%), linear-gradient(180deg, #08111f 0%, #030712 100%)",
        color: "#e5eefb",
      }}
    >
      <div
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          padding: "110px 24px 72px",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            padding: "8px 14px",
            borderRadius: "999px",
            border: "1px solid rgba(125,211,252,0.28)",
            background: "rgba(12,22,42,0.72)",
            fontSize: "12px",
            fontWeight: 800,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#7dd3fc",
          }}
        >
          שכבה בינלאומית
        </div>

        <h1
          style={{
            margin: "20px 0 12px",
            fontSize: "clamp(38px, 6vw, 72px)",
            lineHeight: 1.02,
            fontWeight: 900,
            maxWidth: "980px",
          }}
        >
          תערוכות בחו״ל
        </h1>

        <p
          style={{
            margin: 0,
            maxWidth: "920px",
            fontSize: "18px",
            lineHeight: 1.8,
            color: "rgba(226,232,240,0.88)",
          }}
        >
          זו שכבת המדינות הבינלאומית של הפלטפורמה. היא הופכת את תחום החו״ל
          למשטח תכנון ויזואלי: קודם מדינות, אחר כך מסלולי תערוכות אמיתיים,
          ואז פרטים תפעוליים, אישורים, מוצגים ולוגיסטיקה.
        </p>

        <div
          style={{
            marginTop: "30px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "16px",
          }}
        >
          <StatCard
            label="ספריית מדינות"
            value={String(abroadFlagCards.length)}
            note="בסיס ויזואלי גמיש למפת תערוכות בינלאומיות עתידית."
          />
          <StatCard
            label="עוגן ראשון אמיתי"
            value="יוון"
            note="MARE MED Athens נותנת לאזור הזה נקודת פתיחה תפעולית אמיתית."
          />
          <StatCard
            label="לוגיקת פלטפורמה"
            value="מדינות ← אירועים"
            note="קודם מגדירים את הגיאוגרפיה, ואז מחברים תערוכות חיות וזרימות תכנון."
          />
        </div>

        <section style={{ marginTop: "34px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px",
              flexWrap: "wrap",
              marginBottom: "18px",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: 800,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#60a5fa",
                  marginBottom: "8px",
                }}
              >
                ספריית דגלים
              </div>
              <h2
                style={{
                  margin: 0,
                  fontSize: "28px",
                  fontWeight: 800,
                  lineHeight: 1.15,
                }}
              >
                כרטיסי מדינות
              </h2>
            </div>

            <div
              style={{
                borderRadius: "999px",
                border: "1px solid rgba(148,163,184,0.16)",
                background: "rgba(8,15,28,0.78)",
                padding: "10px 14px",
                fontSize: "13px",
                fontWeight: 700,
                color: "rgba(226,232,240,0.82)",
              }}
            >
              נבנה עבור מסלולי תערוכות בינלאומיים עתידיים
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "18px",
            }}
          >
            {abroadFlagCards.map((item) => (
              <article
                key={item.slug}
                style={{
                  borderRadius: "28px",
                  border: "1px solid rgba(148,163,184,0.16)",
                  background:
                    "linear-gradient(180deg, rgba(15,23,42,0.95) 0%, rgba(8,13,26,0.98) 100%)",
                  padding: "22px",
                  boxShadow: "0 22px 60px rgba(0,0,0,0.24)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                  minHeight: "250px",
                }}
              >
                <div
                  style={{
                    fontSize: "48px",
                    lineHeight: 1,
                  }}
                >
                  {item.flag}
                </div>

                <div>
                  <h3
                    style={{
                      margin: 0,
                      fontSize: "24px",
                      fontWeight: 800,
                      lineHeight: 1.15,
                    }}
                  >
                    {item.countryHe}
                  </h3>
                  <div
                    style={{
                      marginTop: "6px",
                      fontSize: "14px",
                      color: "rgba(148,163,184,0.92)",
                    }}
                  >
                    {item.country}
                  </div>
                </div>

                <div
                  style={{
                    display: "inline-flex",
                    alignSelf: "flex-start",
                    padding: "8px 12px",
                    borderRadius: "999px",
                    background: "rgba(14,165,233,0.12)",
                    border: "1px solid rgba(56,189,248,0.22)",
                    color: "#7dd3fc",
                    fontSize: "12px",
                    fontWeight: 800,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  {item.statusHe}
                </div>

                <p
                  style={{
                    margin: 0,
                    fontSize: "15px",
                    lineHeight: 1.7,
                    color: "rgba(226,232,240,0.86)",
                  }}
                >
                  {item.noteHe}
                </p>

                <div
                  style={{
                    marginTop: "auto",
                    paddingTop: "10px",
                    borderTop: "1px solid rgba(148,163,184,0.12)",
                    fontSize: "13px",
                    color: "rgba(148,163,184,0.84)",
                  }}
                >
                  בסיס למרכז מדינה עתידי
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
