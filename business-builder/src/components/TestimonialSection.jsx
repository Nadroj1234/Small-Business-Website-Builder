export default function TestimonialSection({ siteData }) {
  if (!siteData.testimonialQuote) {
    return null;
  }

  return (
    <section
      style={{
        marginTop: "2rem",
        padding: "2rem",
        borderRadius: "22px",
        background: "linear-gradient(135deg, #fff7ed, white)",
        textAlign: "left",
        boxShadow: "0 18px 45px rgba(15, 23, 42, 0.06)",
      }}
    >
      <h2 style={{ marginTop: 0, marginBottom: "1rem" }}>Customer Spotlight</h2>
      <p
        style={{
          margin: 0,
          fontSize: "1.2rem",
          lineHeight: 1.8,
          color: "#0f172a",
          fontStyle: "italic",
        }}
      >
        &ldquo;{siteData.testimonialQuote}&rdquo;
      </p>
      <p style={{ marginTop: "1rem", color: "#475569", fontWeight: 700 }}>
        {siteData.testimonialAuthor}
      </p>
    </section>
  );
}
