import { Link } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import "./Navbar.css";

export default function Navbar() {
  const { user, authLoading, signInWithGoogle, signOutUser } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h2>JAK's Website Builder</h2>
      </div>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/builder">Builder</Link>
        <Link to="/websites">Websites</Link>
        <Link to="/pricing">Pricing</Link>
        <Link to="/templates">Templates</Link>
      </div>

      <div className="navbar-buttons">
        <Link to="/websites" className="login-btn">
          My Websites
        </Link>

        {authLoading ? (
          <span className="user-chip">Checking login...</span>
        ) : user ? (
          <>
            <span className="user-chip">{user.displayName || user.email}</span>
            <button type="button" className="start-btn" onClick={signOutUser}>
              Sign Out
            </button>
          </>
        ) : (
          <button
            type="button"
            className="start-btn"
            onClick={signInWithGoogle}
          >
            Sign In with Google
          </button>
        )}
      </div>
    </nav>
  );
}
