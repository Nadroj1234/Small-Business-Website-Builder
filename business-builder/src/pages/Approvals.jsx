import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { approveUser, getPendingUsers } from "../services/userProfiles";

export default function Approvals() {
  const { isAdminUser } = useAuth();
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadPendingUsers() {
    try {
      setLoading(true);
      const users = await getPendingUsers();
      setPendingUsers(users);
    } catch (error) {
      console.error("Failed to load pending users:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!isAdminUser) {
      return;
    }

    let cancelled = false;

    async function loadOnMount() {
      try {
        const users = await getPendingUsers();

        if (!cancelled) {
          setPendingUsers(users);
        }
      } catch (error) {
        console.error("Failed to load pending users:", error);
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
  }, [isAdminUser]);

  async function handleApprove(userId) {
    await approveUser(userId);
    await loadPendingUsers();
  }

  if (!isAdminUser) {
    return <Navigate to="/" replace />;
  }

  return (
    <main style={{ padding: "2rem" }}>
      <section style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "left" }}>
        <h1 style={{ marginTop: 0 }}>Pending Access Requests</h1>
        <p style={{ color: "#475569", lineHeight: 1.8 }}>
          Approve users here when you&apos;re ready to let them into the app.
        </p>

        {loading && <p>Loading requests...</p>}
        {!loading && pendingUsers.length === 0 && <p>No pending users right now.</p>}

        <div style={{ display: "grid", gap: "1rem" }}>
          {pendingUsers.map((entry) => (
            <article
              key={entry.id}
              style={{
                border: "1px solid #dbeafe",
                borderRadius: "20px",
                padding: "1.25rem",
                background: "white",
                boxShadow: "0 16px 40px rgba(15, 23, 42, 0.05)",
              }}
            >
              <h2 style={{ marginTop: 0, marginBottom: "0.5rem" }}>
                {entry.displayName || entry.email}
              </h2>
              <p style={{ margin: 0, color: "#475569" }}>{entry.email}</p>
              <button
                type="button"
                onClick={() => handleApprove(entry.id)}
                style={{
                  marginTop: "1rem",
                  padding: "0.8rem 1.1rem",
                  borderRadius: "999px",
                  border: "none",
                  background: "#1d4ed8",
                  color: "white",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Approve User
              </button>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
