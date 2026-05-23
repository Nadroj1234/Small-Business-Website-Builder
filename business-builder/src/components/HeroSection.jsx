export default function HeroSection({ siteData }) {
  return (
    <section
      style={{
        background: `linear-gradient(135deg, ${siteData.primaryColor}, ${siteData.accentColor})`,
        color: "white",
        padding: "4rem",
        borderRadius: "24px",
        textAlign: "left",
        boxShadow: "0 24px 60px rgba(15, 23, 42, 0.18)",
      }}
    >
      <p
        style={{
          marginBottom: "0.75rem",
          textTransform: "uppercase",
          letterSpacing: "0.16em",
          fontSize: "0.85rem",
          opacity: 0.85,
        }}
      >
        {siteData.tagline}
      </p>

      <h1
        style={{
          color: "white",
          margin: "0 0 1rem",
          fontSize: "clamp(2.5rem, 6vw, 4.8rem)",
          lineHeight: 1,
        }}
      >
        {siteData.heroText}
      </h1>

      <p
        style={{
          fontSize: "1.1rem",
          lineHeight: 1.7,
          maxWidth: "42rem",
          opacity: 0.92,
        }}
      >
        {siteData.heroSubtext}
      </p>

      <div style={{ display: "flex", gap: "1rem", marginTop: "2rem", flexWrap: "wrap" }}>
        <button
          type="button"
          style={{
            padding: "0.95rem 1.35rem",
            borderRadius: "999px",
            border: "none",
            background: "white",
            color: siteData.primaryColor,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          {siteData.ctaText}
        </button>

        <button
          type="button"
          style={{
            padding: "0.95rem 1.35rem",
            borderRadius: "999px",
            border: "1px solid rgba(255, 255, 255, 0.5)",
            background: "transparent",
            color: "white",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          {siteData.secondaryCtaText}
        </button>
      </div>
    </section>
  );
}
