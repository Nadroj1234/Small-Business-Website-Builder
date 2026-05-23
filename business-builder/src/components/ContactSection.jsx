export default function ContactSection({ siteData }) {
  return (
    <section
      style={{
        marginTop: "2rem",
        background: "#0f172a",
        color: "white",
        padding: "2rem",
        borderRadius: "20px",
        textAlign: "left",
      }}
    >
      <h2 style={{ color: "white", marginBottom: "1rem" }}>Contact</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1rem",
        }}
      >
        <div>
          <strong>Phone</strong>
          <p style={{ marginTop: "0.5rem", opacity: 0.9 }}>{siteData.phone}</p>
        </div>
        <div>
          <strong>Email</strong>
          <p style={{ marginTop: "0.5rem", opacity: 0.9 }}>{siteData.email}</p>
        </div>
        <div>
          <strong>Address</strong>
          <p style={{ marginTop: "0.5rem", opacity: 0.9, whiteSpace: "pre-line" }}>
            {siteData.address}
          </p>
        </div>
        <div>
          <strong>Hours</strong>
          <p style={{ marginTop: "0.5rem", opacity: 0.9 }}>{siteData.hours}</p>
        </div>
      </div>
    </section>
  );
}
