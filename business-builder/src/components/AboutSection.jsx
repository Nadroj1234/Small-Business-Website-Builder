export default function AboutSection({ siteData }) {
  return (
    <section
      style={{
        marginTop: "2rem",
        background: siteData.surfaceColor,
        padding: "2rem",
        borderRadius: "20px",
        textAlign: "left",
      }}
    >
      <h2 style={{ marginBottom: "1rem" }}>{siteData.aboutTitle}</h2>
      <p style={{ lineHeight: 1.8, color: "#334155" }}>{siteData.aboutText}</p>
    </section>
  );
}
