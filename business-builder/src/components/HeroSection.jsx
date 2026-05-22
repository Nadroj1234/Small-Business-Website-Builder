export default function HeroSection({ siteData }) {
  return (
    <section
      style={{
        background: siteData.primaryColor,
        color: "white",
        padding: "4rem",
        borderRadius: "12px",
      }}
    >
      <h1>{siteData.businessName}</h1>

      <p>{siteData.heroText}</p>
    </section>
  );
}
