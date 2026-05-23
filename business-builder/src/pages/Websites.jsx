import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { loadWebsite } from "../firebase/loadWebsite";
import { getWebsites } from "../services/getWebsites";
import { publishWebsite } from "../services/publishWebsite";

export default function Websites() {
  const navigate = useNavigate();
  const { user, authLoading, signInWithGoogle } = useAuth();
  const [websites, setWebsites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function refreshWebsites() {
    try {
      setLoading(true);
      setError("");
      const data = await getWebsites();
      setWebsites(data);
    } catch (err) {
      console.error("Failed to load websites:", err);
      setError("Couldn't load your websites right now.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (authLoading) {
      return;
    }

    let cancelled = false;

    async function loadOnMount() {
      if (!user) {
        if (!cancelled) {
          setWebsites([]);
          setError("");
          setLoading(false);
        }
        return;
      }

      try {
        const data = await getWebsites();

        if (!cancelled) {
          setWebsites(data);
          setError("");
        }
      } catch (err) {
        console.error("Failed to load websites:", err);

        if (!cancelled) {
          setError("Couldn't load your websites right now.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadOnMount();

    return () => {
      cancelled = true;
    };
  }, [authLoading, user]);

  async function handleOpenWebsite(websiteId) {
    const website = await loadWebsite(websiteId);

    if (!website) {
      alert("We couldn't open that website.");
      return;
    }

    navigate("/builder", {
      state: {
        website,
      },
    });
  }

  async function handleTogglePublish(website) {
    try {
      await publishWebsite(website, !website.published);
      await refreshWebsites();
    } catch (err) {
      console.error("Publish toggle failed:", err);
      alert("Couldn't update publishing right now.");
    }
  }

  return (
    <main
      style={{
        padding: "2rem",
        background:
          "linear-gradient(180deg, #eff6ff 0%, #f8fafc 36%, #ffffff 100%)",
        minHeight: "calc(100vh - 80px)",
      }}
    >
      <section style={{ maxWidth: "1100px", margin: "0 auto", textAlign: "left" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: "1rem",
            alignItems: "center",
            marginBottom: "1.5rem",
          }}
        >
          <div>
            <h1 style={{ margin: 0 }}>My Websites</h1>
            <p style={{ marginTop: "0.75rem", color: "#475569", lineHeight: 1.8 }}>
              Save sites, publish them to a public URL, and reopen them in the builder.
            </p>
          </div>

          <Link to="/builder">
            <button
              style={{
                padding: "0.9rem 1.3rem",
                borderRadius: "999px",
                border: "none",
                background: "#1d4ed8",
                color: "white",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              New Website
            </button>
          </Link>
        </div>

        {authLoading && <p>Checking your login...</p>}
        {!authLoading && !user && (
          <>
            <p>Sign in with Google to manage your saved websites and publishing.</p>
            <button
              type="button"
              onClick={signInWithGoogle}
              style={{
                marginTop: "1rem",
                padding: "0.85rem 1.2rem",
                borderRadius: "999px",
                border: "none",
                background: "#111827",
                color: "white",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Sign In with Google
            </button>
          </>
        )}

        {loading && user && <p>Loading your websites...</p>}
        {!loading && error && <p>{error}</p>}
        {!loading && !error && user && websites.length === 0 && (
          <p>You haven't saved any websites yet.</p>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1rem",
          }}
        >
          {websites.map((website) => {
            const publicUrl = `/sites/${website.slug}`;

            return (
              <article
                key={website.id}
                style={{
                  background: "white",
                  border: "1px solid #dbeafe",
                  borderRadius: "22px",
                  padding: "1.4rem",
                  boxShadow: "0 18px 45px rgba(15, 23, 42, 0.06)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "1rem",
                    alignItems: "flex-start",
                  }}
                >
                  <div>
                    <h2 style={{ marginTop: 0, marginBottom: "0.4rem" }}>
                      {website.name || website.siteData?.businessName || "Untitled Website"}
                    </h2>
                    <p style={{ color: "#64748b", lineHeight: 1.7 }}>
                      Public path: <code>{publicUrl}</code>
                    </p>
                  </div>

                  <span
                    style={{
                      padding: "0.35rem 0.65rem",
                      borderRadius: "999px",
                      background: website.published ? "#dcfce7" : "#e2e8f0",
                      color: website.published ? "#166534" : "#334155",
                      fontSize: "0.8rem",
                      fontWeight: 700,
                    }}
                  >
                    {website.published ? "Published" : "Draft"}
                  </span>
                </div>

                <p style={{ marginTop: "0.8rem", lineHeight: 1.8, color: "#475569" }}>
                  {website.siteData?.heroSubtext || website.siteData?.heroText}
                </p>

                <div
                  style={{
                    display: "grid",
                    gap: "0.75rem",
                    marginTop: "1rem",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => handleOpenWebsite(website.id)}
                    style={{
                      padding: "0.85rem 1rem",
                      borderRadius: "999px",
                      border: "none",
                      background: "#1d4ed8",
                      color: "white",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    Open in Builder
                  </button>

                  <button
                    type="button"
                    onClick={() => handleTogglePublish(website)}
                    style={{
                      padding: "0.85rem 1rem",
                      borderRadius: "999px",
                      border: "1px solid #cbd5e1",
                      background: "white",
                      color: "#0f172a",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    {website.published ? "Unpublish" : "Publish Website"}
                  </button>

                  {website.published && (
                    <Link to={publicUrl} style={{ textDecoration: "none" }}>
                      <button
                        style={{
                          width: "100%",
                          padding: "0.85rem 1rem",
                          borderRadius: "999px",
                          border: "1px solid #ea580c",
                          background: "#fff7ed",
                          color: "#c2410c",
                          fontWeight: 700,
                          cursor: "pointer",
                        }}
                      >
                        View Public Site
                      </button>
                    </Link>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
