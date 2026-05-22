import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Business Website Builder</h1>

      <p>Create simple websites for small businesses.</p>

      <Link to="/builder">
        <button>Start Building</button>
      </Link>
    </div>
  );
}
