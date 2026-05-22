import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Business Website Builder</h1>
      <p>Create simple websites for small businesses.</p>

      <div
        style={{
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
          marginTop: "1.5rem",
        }}
      >
        <Link to="/builder">
          <button>Start Building</button>
        </Link>

        <Link to="/templates">
          <button>View Templates</button>
        </Link>
      </div>
    </div>
  );
}
