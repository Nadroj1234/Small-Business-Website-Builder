function ServiceCard({ title, accentColor }) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: "18px",
        padding: "1.4rem",
        boxShadow: "0 16px 40px rgba(15, 23, 42, 0.08)",
      }}
    >
      <div
        style={{
          width: "0.9rem",
          height: "0.9rem",
          borderRadius: "999px",
          background: accentColor,
          marginBottom: "1rem",
        }}
      />
      <h3 style={{ margin: 0, fontSize: "1.15rem", color: "#0f172a" }}>{title}</h3>
    </div>
  );
}

export default function ServicesSection({ siteData }) {
  const services = [siteData.serviceOne, siteData.serviceTwo, siteData.serviceThree];

  return (
    <section style={{ marginTop: "2rem", textAlign: "left" }}>
      <h2 style={{ marginBottom: "1rem" }}>{siteData.servicesTitle}</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "1rem",
        }}
      >
        {services.map((service) => (
          <ServiceCard
            key={service}
            title={service}
            accentColor={siteData.accentColor}
          />
        ))}
      </div>
    </section>
  );
}
