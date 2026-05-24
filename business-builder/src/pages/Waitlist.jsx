import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

export default function Waitlist() {
  const { user, isApprovedUser, accessStatus } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (isApprovedUser) {
    return <Navigate to="/builder" replace />;
  }

  return (
    <main
      style={{
        minHeight: "calc(100vh - 80px)",
        display: "grid",
        placeItems: "center",
        padding: "2rem",
        background:
          "linear-gradient(180deg, #eff6ff 0%, #fff7ed 52%, #ffffff 100%)",
      }}
    >
      <section
        style={{
          maxWidth: "760px",
          width: "100%",
          background: "white",
          borderRadius: "28px",
          padding: "2.4rem",
          textAlign: "left",
          boxShadow: "0 24px 60px rgba(15, 23, 42, 0.08)",
          border: "1px solid #dbeafe",
        }}
      >
        <p
          style={{
            margin: 0,
            color: "#1d4ed8",
            textTransform: "uppercase",
            letterSpacing: "0.14em",
            fontSize: "0.82rem",
            fontWeight: 700,
          }}
        >
          Waitlist
        </p>
        <h1 style={{ margin: "0.9rem 0 1rem" }}>You're on the list.</h1>
        <p style={{ color: "#475569", lineHeight: 1.9 }}>
          Thanks for signing up. Your account is currently waiting for approval
          while the platform is still being finished. Once approved, you&apos;ll
          be able to access the builder, websites, templates, and pricing areas.
        </p>
        <p style={{ color: "#64748b", marginTop: "1rem" }}>
          Current status: <strong>{accessStatus}</strong>
        </p>
      </section>
    </main>
  );
}
