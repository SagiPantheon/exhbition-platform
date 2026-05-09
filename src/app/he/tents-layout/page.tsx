import Link from "next/link";

const cards = [
  {
    eyebrow: "WOW LAYER",
    title: "תרחיש תצוגה",
    text: "פתיחת סביבת האוהל הוויזואלית והצגת מרחב התערוכה כסצנת קבלת החלטות אמיתית, לא כקטלוג שטוח.",
    href: "/layout-showcase-v3",
    cta: "פתח תצוגה",
  },
  {
    eyebrow: "WORK LAYER",
    title: "תכנון פריסה",
    text: "מעבר מהצגה לעבודה תפעולית: מיקום, קנה מידה, לוגיקת סביבה וחשיבת הקמה.",
    href: "/layout-planning",
    cta: "פתח תכנון",
  },
  {
    eyebrow: "SYSTEM LAYER",
    title: "לוגיקה מערכתית",
    text: "Tents & Layout הוא שכבת ההרכבה המרכזית שמחברת אחר כך בין מוצגים, מלאי, תערוכות וניהול לזרימת עבודה אחת ברורה.",
  },
];

const nextItems = [
  "הרחבת קטלוג המוצגים לאחר אישור גורמי הביטחון.",
  "בניית קרטוטקת דגלים חזקה למדינות של תערוכות עתידיות בחו״ל.",
  "הוספת תצוגת יום / שעה / לוח שנה חי במקום הנכון במעטפת המוצר.",
];

export default function TentsLayoutHebrewPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        background:
          "radial-gradient(circle at 18% 16%, rgba(56,189,248,0.22) 0%, rgba(56,189,248,0.04) 24%, transparent 42%), radial-gradient(circle at 82% 22%, rgba(96,165,250,0.18) 0%, rgba(96,165,250,0.03) 22%, transparent 40%), radial-gradient(circle at 50% 78%, rgba(14,165,233,0.12) 0%, rgba(14,165,233,0.02) 24%, transparent 46%), linear-gradient(180deg, #08101d 0%, #050b16 46%, #030712 100%)",
        color: "#e5eefb",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(125,211,252,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(125,211,252,0.07) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.65), rgba(0,0,0,0.16))",
          pointerEvents: "none",
        }}
      />

      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 22%, transparent 78%, rgba(255,255,255,0.02) 100%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "110px 24px 80px",
        }}
      >
        <section
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: "34px",
            border: "1px solid rgba(125,211,252,0.18)",
            background:
              "linear-gradient(180deg, rgba(10,18,34,0.88) 0%, rgba(8,14,28,0.82) 100%)",
            boxShadow:
              "0 30px 90px rgba(0,0,0,0.34), inset 0 1px 0 rgba(255,255,255,0.04)",
            padding: "34px",
          }}
        >
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle at top right, rgba(59,130,246,0.16), transparent 30%), radial-gradient(circle at bottom left, rgba(34,211,238,0.10), transparent 32%)",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              position: "relative",
              zIndex: 1,
              display: "grid",
              gridTemplateColumns: "minmax(0, 1.35fr) minmax(320px, 0.9fr)",
              gap: "26px",
            }}
          >
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "8px 14px",
                  borderRadius: "999px",
                  border: "1px solid rgba(125,211,252,0.24)",
                  background: "rgba(8,20,38,0.72)",
                  fontSize: "12px",
                  fontWeight: 800,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#7dd3fc",
                }}
              >
                שכבת חתימה
              </div>

              <h1
                style={{
                  margin: "20px 0 12px",
                  fontSize: "clamp(42px, 7vw, 78px)",
                  lineHeight: 0.96,
                  fontWeight: 900,
                  maxWidth: "860px",
                  letterSpacing: "-0.04em",
                }}
              >
                אוהלים ופריסה
              </h1>

              <div
                style={{
                  height: "3px",
                  width: "140px",
                  borderRadius: "999px",
                  background:
                    "linear-gradient(90deg, rgba(34,211,238,0.95), rgba(59,130,246,0.72), transparent)",
                  boxShadow: "0 0 24px rgba(34,211,238,0.4)",
                  marginBottom: "16px",
                }}
              />

              <p
                style={{
                  margin: 0,
                  maxWidth: "820px",
                  fontSize: "18px",
                  lineHeight: 1.8,
                  color: "rgba(226,232,240,0.9)",
                }}
              >
                זהו הלב הוויזואלי והתפעולי של הפלטפורמה. קודם מציגים את הסביבה,
                ואז מחברים סביבה מוצגים, מלאי, תערוכות וניהול.
              </p>
            </div>

            <div
              style={{
                borderRadius: "28px",
                border: "1px solid rgba(148,163,184,0.14)",
                background:
                  "linear-gradient(180deg, rgba(12,20,36,0.94) 0%, rgba(8,14,28,0.98) 100%)",
                padding: "22px",
                boxShadow: "0 18px 46px rgba(0,0,0,0.22)",
                alignSelf: "stretch",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
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
                    marginBottom: "12px",
                  }}
                >
                  תפקיד הסקשן
                </div>

                <div
                  style={{
                    fontSize: "28px",
                    lineHeight: 1.08,
                    fontWeight: 800,
                    marginBottom: "12px",
                  }}
                >
                  שכבת ה־showcase הראשית של המוצר
                </div>

                <p
                  style={{
                    margin: 0,
                    fontSize: "15px",
                    lineHeight: 1.75,
                    color: "rgba(226,232,240,0.82)",
                  }}
                >
                  האוהלים אינם פיצ׳ר צדדי. הם שער הכניסה החזק ביותר להצגת תכנון,
                  הרכבת סביבה וערך תפעולי מול הנהלה.
                </p>
              </div>

              <div
                style={{
                  marginTop: "20px",
                  display: "grid",
                  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                  gap: "10px",
                }}
              >
                {[
                  ["01", "הצגה"],
                  ["02", "תכנון"],
                  ["03", "חיבור"],
                ].map(([num, label]) => (
                  <div
                    key={num}
                    style={{
                      borderRadius: "18px",
                      border: "1px solid rgba(125,211,252,0.16)",
                      background: "rgba(255,255,255,0.02)",
                      padding: "14px 12px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "20px",
                        fontWeight: 900,
                        color: "#7dd3fc",
                        marginBottom: "6px",
                      }}
                    >
                      {num}
                    </div>
                    <div
                      style={{
                        fontSize: "13px",
                        fontWeight: 700,
                        color: "rgba(226,232,240,0.86)",
                      }}
                    >
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div
          style={{
            marginTop: "26px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "18px",
          }}
        >
          {cards.map((card) => (
            <section
              key={card.title}
              style={{
                borderRadius: "26px",
                border: "1px solid rgba(148,163,184,0.14)",
                background:
                  "linear-gradient(180deg, rgba(11,18,33,0.94) 0%, rgba(7,12,24,0.98) 100%)",
                boxShadow:
                  "0 22px 60px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.03)",
                padding: "24px",
                minHeight: "252px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: 800,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "#7dd3fc",
                    marginBottom: "12px",
                  }}
                >
                  {card.eyebrow}
                </div>

                <h2
                  style={{
                    margin: 0,
                    fontSize: "28px",
                    lineHeight: 1.14,
                    fontWeight: 800,
                  }}
                >
                  {card.title}
                </h2>

                <p
                  style={{
                    margin: "14px 0 0",
                    fontSize: "16px",
                    lineHeight: 1.72,
                    color: "rgba(226,232,240,0.84)",
                  }}
                >
                  {card.text}
                </p>
              </div>

              {"href" in card && card.href ? (
                <Link
                  href={card.href}
                  style={{
                    marginTop: "24px",
                    display: "inline-flex",
                    alignSelf: "flex-start",
                    padding: "12px 18px",
                    borderRadius: "999px",
                    textDecoration: "none",
                    fontWeight: 800,
                    color: "#04111f",
                    background:
                      "linear-gradient(135deg, #7dd3fc 0%, #38bdf8 100%)",
                    boxShadow: "0 10px 30px rgba(34,211,238,0.18)",
                  }}
                >
                  {card.cta}
                </Link>
              ) : (
                <div
                  style={{
                    marginTop: "24px",
                    display: "inline-flex",
                    alignSelf: "flex-start",
                    padding: "10px 14px",
                    borderRadius: "999px",
                    border: "1px solid rgba(148,163,184,0.18)",
                    color: "rgba(226,232,240,0.82)",
                    fontSize: "13px",
                    fontWeight: 700,
                  }}
                >
                  לוגיקת הרכבת פלטפורמה
                </div>
              )}
            </section>
          ))}
        </div>

        <section
          style={{
            marginTop: "26px",
            borderRadius: "28px",
            border: "1px solid rgba(59,130,246,0.18)",
            background:
              "linear-gradient(180deg, rgba(8,14,28,0.90) 0%, rgba(5,10,20,0.96) 100%)",
            padding: "26px",
            boxShadow: "0 20px 50px rgba(0,0,0,0.22)",
          }}
        >
          <div
            style={{
              fontSize: "12px",
              fontWeight: 800,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#60a5fa",
              marginBottom: "14px",
            }}
          >
            הרחבה מאושרת בהמשך
          </div>

          <ul
            style={{
              margin: 0,
              paddingLeft: "18px",
              display: "grid",
              gap: "10px",
              color: "rgba(226,232,240,0.88)",
              lineHeight: 1.75,
              fontSize: "16px",
            }}
          >
            {nextItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
