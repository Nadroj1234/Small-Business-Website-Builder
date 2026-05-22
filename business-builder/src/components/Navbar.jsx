import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h2>SiteBuilder</h2>
      </div>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/builder">Builder</Link>
        <Link to="/templates">Templates</Link>
        <Link to="/pricing">Pricing</Link>
      </div>

      <div className="navbar-buttons">
        <button className="login-btn">Login</button>
        <button className="start-btn">Get Started</button>
      </div>
    </nav>
  );
}
