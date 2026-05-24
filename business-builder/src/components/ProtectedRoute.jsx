import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

export default function ProtectedRoute({ children, allowPending = false }) {
  const location = useLocation();
  const { user, authLoading, isApprovedUser } = useAuth();

  if (authLoading) {
    return (
      <main style={{ padding: "2rem" }}>
        <p>Checking your login...</p>
      </main>
    );
  }

  if (!user) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  if (!allowPending && !isApprovedUser) {
    return <Navigate to="/waitlist" replace state={{ from: location }} />;
  }

  return children;
}
