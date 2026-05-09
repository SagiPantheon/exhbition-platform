import Link from "next/link";

export default function ExhibitionsPage() {
  const exhibitions = [
    {
      id: "exh-001",
      name: "Aero India 2027",
      country: "India",
      city: "Bengaluru",
      status: "בתכנון",
      requestor: "שיווק",
      assetsCount: 3,
    },
    {
      id: "exh-002",
      name: "ILA Berlin 2026",
      country: "Germany",
      city: "Berlin",
      status: "טיוטה",
      requestor: "שיווק",
      assetsCount: 2,
    },
    {
      id: "exh-003",
      name: "Singapore Airshow 2028",
      country: "Singapore",
      city: "Singapore",
      status: "בבדיקה",
      requestor: "פיתוח עסקי",
      assetsCount: 4,
    },
  ];

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
        background:
          "radial-gradient(circle at top, #0d5ca0 0%, #083b72 28%, #04101f 78%, #020814 100%)",
        color: "#f5f7fb",
      }}
    >
      <section
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "18px",
            flexWrap: "wrap",
            marginBottom: "18px",
            fontSize: "0.9rem",
          }}
        >
          <Link
            href="/space"
            style={{
              color: "rgba(245,247,251,0.82)",
              textDecoration: "none",
            }}
          >
            ← חזרה למוצגי חלל / חזרה למוצגי חלל
          </Link>

          <Link
            href="/"
            style={{
              color: "rgba(245,247,251,0.82)",
              textDecoration: "none",
            }}
          >
            ← חזרה לתחומים / חזרה לתחומים
          </Link>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "20px",
            marginBottom: "28px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "0.82rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "rgba(180,210,255,0.76)",
                marginBottom: "10px",
              }}
            >
              Exhibition Projects
            </div>

            <h1
              style={{
                margin: 0,
                fontSize: "2.4rem",
                lineHeight: 1.08,
              }}
            >
              שכבת ניהול תערוכות
            </h1>

            <p
              style={{
                marginTop: "14px",
                maxWidth: "760px",
                lineHeight: 1.7,
                color: "rgba(245,247,251,0.86)",
              }}
            >
              Create, review, and manage marketing exhibition projects. This
              layer connects נבחרו assets to a specific event, request, or
              exhibition structure.
            </p>
          </div>

          <button
            type="button"
            style={{
              padding: "12px 18px",
              borderRadius: "14px",
              fontSize: "0.95rem",
              fontWeight: 700,
              border: "1px solid rgba(120, 190, 255, 0.4)",
              background:
                "linear-gradient(180deg, rgba(78,145,255,0.28) 0%, rgba(41,92,180,0.18) 100%)",
              color: "#f5f7fb",
              cursor: "pointer",
              boxShadow: "0 10px 24px rgba(35, 96, 190, 0.22)",
            }}
          >
            צור תערוכה חדשה
          </button>
        </div>


        <section
          style={{
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              fontSize: "0.82rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(180,210,255,0.76)",
              marginBottom: "12px",
            }}
          >
            Exhibition Routes
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "18px",
            }}
          >
            <Link
              href="/he/exhibitions/israel"
              style={{
                textDecoration: "none",
              }}
            >
              <div
                style={{
                  borderRadius: "22px",
                  padding: "22px",
                  border: "1px solid rgba(56,189,248,0.32)",
                  background:
                    "linear-gradient(180deg, rgba(10,20,40,0.94) 0%, rgba(7,12,24,0.98) 100%)",
                  boxShadow: "0 18px 40px rgba(0,0,0,0.24)",
                }}
              >
                <div
                  style={{
                    fontSize: "0.78rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "#7dd3fc",
                    marginBottom: "10px",
                  }}
                >
                  Israel Layer
                </div>

                <h2
                  style={{
                    margin: 0,
                    fontSize: "1.5rem",
                    color: "#f5f7fb",
                  }}
                >
                  כנסים ותערוכות בארץ
                </h2>

                <p
                  style={{
                    marginTop: "12px",
                    marginBottom: 0,
                    lineHeight: 1.7,
                    color: "rgba(245,247,251,0.82)",
                  }}
                >
                  שכבת העבודה הראשית בישראל: תכנון, ספקים, בקשות, מוצגים,
                  סטטוסי הקמה ונתונים תפעוליים.
                </p>
              </div>
            </Link>

            <Link
              href="/he/exhibitions/abroad"
              style={{
                textDecoration: "none",
              }}
            >
              <div
                style={{
                  borderRadius: "22px",
                  padding: "22px",
                  border: "1px solid rgba(217,70,239,0.32)",
                  background:
                    "linear-gradient(180deg, rgba(22,12,34,0.94) 0%, rgba(10,8,22,0.98) 100%)",
                  boxShadow: "0 18px 40px rgba(0,0,0,0.24)",
                }}
              >
                <div
                  style={{
                    fontSize: "0.78rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "#f0abfc",
                    marginBottom: "10px",
                  }}
                >
                  International Layer
                </div>

                <h2
                  style={{
                    margin: 0,
                    fontSize: "1.5rem",
                    color: "#f5f7fb",
                  }}
                >
                  תערוכות בחו״ל
                </h2>

                <p
                  style={{
                    marginTop: "12px",
                    marginBottom: 0,
                    lineHeight: 1.7,
                    color: "rgba(245,247,251,0.82)",
                  }}
                >
                  שכבת המדינות הבינלאומית: דגלים, מדינות יעד, מסלולי תערוכות
                  עתידיים והמשך חיבור לאירועים אמיתיים.
                </p>
              </div>
            </Link>
          </div>
        </section>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "20px",
          }}
        >
          {exhibitions.map((exhibition) => (
            <article
              key={exhibition.id}
              style={{
                borderRadius: "22px",
                padding: "22px",
                border: "1px solid rgba(255,255,255,0.08)",
                background:
                  "linear-gradient(180deg, rgba(18,26,48,0.92) 0%, rgba(10,14,28,0.95) 100%)",
                boxShadow: "0 14px 34px rgba(0,0,0,0.22)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: "12px",
                  marginBottom: "16px",
                }}
              >
                <div>
                  <h2
                    style={{
                      margin: 0,
                      fontSize: "1.25rem",
                    }}
                  >
                    {exhibition.name}
                  </h2>
                  <div
                    style={{
                      marginTop: "8px",
                      color: "rgba(245,247,251,0.72)",
                      fontSize: "0.92rem",
                    }}
                  >
                    {exhibition.city}, {exhibition.country}
                  </div>
                </div>

                <span
                  style={{
                    padding: "6px 10px",
                    borderRadius: "999px",
                    fontSize: "0.76rem",
                    fontWeight: 700,
                    background: "rgba(120, 190, 255, 0.14)",
                    border: "1px solid rgba(120, 190, 255, 0.35)",
                    color: "#9fd3ff",
                    whiteSpace: "nowrap",
                  }}
                >
                  {exhibition.status}
                </span>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                  gap: "12px",
                  marginBottom: "18px",
                }}
              >
                <MiniBox label="Requestor" value={exhibition.requestor} />
                <MiniBox
                  label="Assets"
                  value={`${exhibition.assetsCount} נבחרו`}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                }}
              >
                <ActionButton label="פתח תערוכה" primary />
                <ActionButton label="הוסף מוצג" />
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function MiniBox({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        borderRadius: "16px",
        padding: "14px",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div
        style={{
          fontSize: "0.74rem",
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
          fontSize: "0.98rem",
          fontWeight: 600,
          color: "#f5f7fb",
        }}
      >
        {value}
      </div>
    </div>
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
    <button
      type="button"
      style={{
        padding: "10px 14px",
        borderRadius: "12px",
        fontSize: "0.88rem",
        fontWeight: 700,
        cursor: "pointer",
        border: primary
          ? "1px solid rgba(120, 190, 255, 0.45)"
          : "1px solid rgba(255,255,255,0.14)",
        background: primary
          ? "linear-gradient(180deg, rgba(78,145,255,0.28) 0%, rgba(41,92,180,0.18) 100%)"
          : "rgba(255,255,255,0.05)",
        color: "#f5f7fb",
      }}
    >
      {label}
    </button>
  );
}