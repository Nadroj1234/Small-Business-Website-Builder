import { useEffect, useState } from "react";
import { useAuth } from "../auth/useAuth";
import { usePlan } from "../plans/usePlan";
import { getTemplates } from "../getTemplates";

export default function TemplateLoader({ onOpen }) {
  const { user, authLoading, signInWithGoogle } = useAuth();
  const { currentPlan } = usePlan();
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadTemplates() {
    if (!user) {
      setTemplates([]);
      setError("");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");
      const data = await getTemplates();
      setTemplates(data);
    } catch (err) {
      console.error("Failed to load templates:", err);
      setError("Couldn't load templates right now.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (authLoading) {
      return undefined;
    }

    let cancelled = false;

    async function loadOnMount() {
      if (!user) {
        if (!cancelled) {
          setTemplates([]);
          setError("");
          setLoading(false);
        }
        return;
      }

      try {
        const data = await getTemplates();

        if (!cancelled) {
          setTemplates(data);
          setError("");
        }
      } catch (err) {
        console.error("Failed to load templates:", err);

        if (!cancelled) {
          setError("Couldn't load templates right now.");
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

  return (
    <div style={{ padding: "2rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "1rem",
        }}
      >
        <h2>Saved Templates</h2>

        {user && (
          <button
            onClick={loadTemplates}
            style={{
              padding: "0.6rem 1rem",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              background: "white",
              cursor: "pointer",
            }}
          >
            Refresh
          </button>
        )}
      </div>

      <p style={{ color: "#64748b", marginBottom: "1rem" }}>
        Plan preview: {currentPlan.name}
        {currentPlan.limits.templates === Infinity
          ? " includes unlimited templates."
          : ` includes up to ${currentPlan.limits.templates} saved templates.`}
      </p>

      {authLoading && <p>Checking your login...</p>}
      {!authLoading && !user && (
        <>
          <p>Sign in with Google to see the templates saved to your account.</p>
          <button
            type="button"
            onClick={signInWithGoogle}
            style={{
              marginTop: "1rem",
              padding: "0.75rem 1.25rem",
              background: "#4f46e5",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Sign In with Google
          </button>
        </>
      )}

      {loading && <p>Loading templates...</p>}
      {!loading && error && <p>{error}</p>}
      {!loading && !error && user && templates.length === 0 && (
        <p>No templates saved yet.</p>
      )}

      {user &&
        templates.map((template) => (
        <div
          key={template.id}
          onClick={() => onOpen(template)}
          style={{
            padding: "1rem",
            border: "1px solid #d1d5db",
            borderRadius: "12px",
            marginBottom: "0.75rem",
            cursor: "pointer",
            background: "white",
            textAlign: "left",
          }}
        >
          <strong>
            {template.name || template.businessName || "Untitled Template"}
          </strong>
          <p style={{ marginTop: "0.5rem" }}>
            {template.siteData?.heroText ||
              template.data?.heroText ||
              "Click to open in builder"}
          </p>
        </div>
        ))}
    </div>
  );
}
