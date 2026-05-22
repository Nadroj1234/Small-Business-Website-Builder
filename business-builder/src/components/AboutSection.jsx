export default function AboutSection({ siteData }) {
  return (
    <section
      style={{
        marginTop: "2rem",
        background: "white",
        padding: "2rem",
        borderRadius: "12px",
      }}
    >
      <h2>About Us</h2>

      <p>{siteData.aboutText}</p>
    </section>
  );
}
