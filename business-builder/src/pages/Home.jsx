import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main
      style={{
        padding: "2rem",
        background:
          "linear-gradient(180deg, #fff7ed 0%, #f8fafc 38%, #ffffff 100%)",
      }}
    >
      <section
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "2rem",
          padding: "3rem",
          borderRadius: "28px",
          background: "linear-gradient(135deg, #0f172a, #1d4ed8)",
          color: "white",
          textAlign: "left",
          boxShadow: "0 30px 70px rgba(15, 23, 42, 0.18)",
        }}
      >
        <div style={{ flex: "1 1 420px", maxWidth: "620px" }}>
          <p
            style={{
              marginBottom: "0.85rem",
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              fontSize: "0.85rem",
              opacity: 0.82,
            }}
          >
            Built for small businesses
          </p>

          <h1
            style={{
              margin: "0 0 1rem",
              color: "white",
              fontSize: "clamp(2.8rem, 6vw, 4.9rem)",
              lineHeight: 1,
            }}
          >
            JAK&apos;s Website Builder helps you launch polished business pages
            fast.
          </h1>

          <p
            style={{
              fontSize: "1.1rem",
              lineHeight: 1.75,
              opacity: 0.92,
              maxWidth: "44rem",
            }}
          >
            Create a branded website for a restaurant, salon, contractor, shop,
            or local service business with editable hero copy, service lists,
            contact details, colors, and reusable templates tied to your Google
            account.
          </p>

          <div
            style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
              marginTop: "2rem",
            }}
          >
            <Link to="/builder">
              <button
                style={{
                  padding: "0.95rem 1.4rem",
                  borderRadius: "999px",
                  border: "none",
                  background: "white",
                  color: "#1d4ed8",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Start Building
              </button>
            </Link>

            <Link to="/templates">
              <button
                style={{
                  padding: "0.95rem 1.4rem",
                  borderRadius: "999px",
                  border: "1px solid rgba(255, 255, 255, 0.4)",
                  background: "transparent",
                  color: "white",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                View Templates
              </button>
            </Link>

            <Link to="/websites">
              <button
                style={{
                  padding: "0.95rem 1.4rem",
                  borderRadius: "999px",
                  border: "1px solid rgba(255, 255, 255, 0.24)",
                  background: "rgba(255, 255, 255, 0.08)",
                  color: "white",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Manage Websites
              </button>
            </Link>

            <Link to="/pricing">
              <button
                style={{
                  padding: "0.95rem 1.4rem",
                  borderRadius: "999px",
                  border: "1px solid rgba(255, 255, 255, 0.24)",
                  background: "rgba(255, 255, 255, 0.08)",
                  color: "white",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                See Pricing
              </button>
            </Link>
          </div>
        </div>

        <div
          style={{
            flex: "1 1 280px",
            maxWidth: "420px",
            background: "rgba(255, 255, 255, 0.12)",
            border: "1px solid rgba(255, 255, 255, 0.14)",
            borderRadius: "22px",
            padding: "1.5rem",
            backdropFilter: "blur(8px)",
          }}
        >
          <h2 style={{ color: "white", marginTop: 0, marginBottom: "1rem" }}>
            What we offer
          </h2>
          <div style={{ display: "grid", gap: "1rem" }}>
            <div>
              <strong>Easy customization</strong>
              <p style={{ marginTop: "0.35rem", opacity: 0.9 }}>
                Edit headlines, services, colors, calls to action, and contact
                info from one builder.
              </p>
            </div>
            <div>
              <strong>Reusable templates</strong>
              <p style={{ marginTop: "0.35rem", opacity: 0.9 }}>
                Save layouts to your account and reopen them later without
                mixing in other users&apos; templates.
              </p>
            </div>
            <div>
              <strong>Built for local brands</strong>
              <p style={{ marginTop: "0.35rem", opacity: 0.9 }}>
                Perfect for restaurants, home services, retail shops, and other
                small businesses that need a clean online presence.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
