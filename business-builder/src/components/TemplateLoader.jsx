import { useEffect, useState } from "react";
import { getTemplates } from "../getTemplates";

export default function TemplateLoader({ onOpen }) {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadTemplates() {
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
    let cancelled = false;

    async function loadOnMount() {
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
  }, []);

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
      </div>

      {loading && <p>Loading templates...</p>}
      {!loading && error && <p>{error}</p>}
      {!loading && !error && templates.length === 0 && (
        <p>No templates saved yet.</p>
      )}

      {templates.map((template) => (
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
