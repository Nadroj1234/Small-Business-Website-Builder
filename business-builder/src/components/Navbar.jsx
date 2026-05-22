import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h2>My App</h2>
      </div>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/builder">Builder</Link>
        <Link to="/templates">Templates</Link>
      </div>

      <div className="navbar-buttons">
        <Link to="/templates" className="login-btn">
          Saved Templates
        </Link>
        <Link to="/builder" className="start-btn">
          Get Started
        </Link>
      </div>
    </nav>
  );
}
