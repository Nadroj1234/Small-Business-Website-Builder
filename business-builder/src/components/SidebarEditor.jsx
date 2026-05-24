const lockedFieldStyle = {
  opacity: 0.55,
  pointerEvents: "none",
};

const panelStyle = {
  width: "320px",
  padding: "1.25rem",
  background: "#111827",
  color: "white",
  display: "flex",
  flexDirection: "column",
  gap: "1.25rem",
};

const sectionTitleStyle = {
  fontSize: "0.95rem",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  opacity: 0.8,
  margin: 0,
};

const fieldGroupStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "0.45rem",
};

const inputStyle = {
  width: "100%",
  padding: "0.7rem 0.8rem",
  borderRadius: "10px",
  border: "1px solid #374151",
  background: "#1f2937",
  color: "white",
  boxSizing: "border-box",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "0.75rem",
};

function EditorField({ label, name, value, onChange, as = "input", type = "text" }) {
  const Element = as;

  return (
    <div style={fieldGroupStyle}>
      <label htmlFor={name}>{label}</label>
      <Element
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        style={inputStyle}
        rows={as === "textarea" ? 4 : undefined}
      />
    </div>
  );
}

function EditorSection({
  title,
  locked = false,
  lockMessage = "",
  children,
}) {
  return (
    <section style={locked ? lockedFieldStyle : undefined}>
      <p style={sectionTitleStyle}>{title}</p>
      {children}
      {locked && (
        <p style={{ marginTop: "0.75rem", fontSize: "0.85rem", opacity: 0.8 }}>
          {lockMessage}
        </p>
      )}
    </section>
  );
}

export default function SidebarEditor({ siteData, setSiteData, currentPlan }) {
  const servicesLocked = !currentPlan.features.servicesSection;
  const contactLocked = !currentPlan.features.contactSection;
  const colorsLocked = !currentPlan.features.advancedColors;
  const businessExtrasLocked = !currentPlan.features.businessExtras;

  function handleChange(event) {
    const { name, value } = event.target;

    setSiteData({
      ...siteData,
      [name]: value,
    });
  }

  return (
    <aside style={panelStyle}>
      <div>
        <h2 style={{ marginTop: 0, marginBottom: "0.5rem", color: "white" }}>
          Website Builder
        </h2>
        <p style={{ opacity: 0.8 }}>
          Customize the content, branding, and contact details for this site.
        </p>
        <div
          style={{
            marginTop: "0.85rem",
            padding: "0.55rem 0.8rem",
            borderRadius: "999px",
            display: "inline-flex",
            background: "#1d4ed8",
            fontWeight: 700,
          }}
        >
          Previewing {currentPlan.name}
        </div>
      </div>

      <EditorSection title="Brand">
        <EditorField
          label="Business Name"
          name="businessName"
          value={siteData.businessName}
          onChange={handleChange}
        />
        <div style={{ height: "0.75rem" }} />
        <EditorField
          label="Tagline"
          name="tagline"
          value={siteData.tagline}
          onChange={handleChange}
        />
      </EditorSection>

      <EditorSection
        title="Hero"
        locked={!currentPlan.features.heroEditor}
        lockMessage="Upgrade to unlock the full hero editor."
      >
        <EditorField
          label="Hero Heading"
          name="heroText"
          value={siteData.heroText}
          onChange={handleChange}
        />
        <div style={{ height: "0.75rem" }} />
        <EditorField
          label="Hero Subtext"
          name="heroSubtext"
          value={siteData.heroSubtext}
          onChange={handleChange}
          as="textarea"
        />
        <div style={{ height: "0.75rem" }} />
        <EditorField
          label="Primary Button Text"
          name="ctaText"
          value={siteData.ctaText}
          onChange={handleChange}
        />
        <div style={{ height: "0.75rem" }} />
        <EditorField
          label="Secondary Button Text"
          name="secondaryCtaText"
          value={siteData.secondaryCtaText}
          onChange={handleChange}
        />
      </EditorSection>

      <EditorSection title="About">
        <EditorField
          label="About Section Title"
          name="aboutTitle"
          value={siteData.aboutTitle}
          onChange={handleChange}
        />
        <div style={{ height: "0.75rem" }} />
        <EditorField
          label="About Text"
          name="aboutText"
          value={siteData.aboutText}
          onChange={handleChange}
          as="textarea"
        />
      </EditorSection>

      <EditorSection
        title="Services"
        locked={servicesLocked}
        lockMessage="Services are available on Pro and Business plans."
      >
        <EditorField
          label="Services Section Title"
          name="servicesTitle"
          value={siteData.servicesTitle}
          onChange={handleChange}
        />
        <div style={{ height: "0.75rem" }} />
        <EditorField
          label="Service 1"
          name="serviceOne"
          value={siteData.serviceOne}
          onChange={handleChange}
        />
        <div style={{ height: "0.75rem" }} />
        <EditorField
          label="Service 2"
          name="serviceTwo"
          value={siteData.serviceTwo}
          onChange={handleChange}
        />
        <div style={{ height: "0.75rem" }} />
        <EditorField
          label="Service 3"
          name="serviceThree"
          value={siteData.serviceThree}
          onChange={handleChange}
        />
      </EditorSection>

      <EditorSection
        title="Contact"
        locked={contactLocked}
        lockMessage="Contact blocks are available on Pro and Business plans."
      >
        <EditorField
          label="Phone"
          name="phone"
          value={siteData.phone}
          onChange={handleChange}
        />
        <div style={{ height: "0.75rem" }} />
        <EditorField
          label="Email"
          name="email"
          value={siteData.email}
          onChange={handleChange}
        />
        <div style={{ height: "0.75rem" }} />
        <EditorField
          label="Address"
          name="address"
          value={siteData.address}
          onChange={handleChange}
          as="textarea"
        />
        <div style={{ height: "0.75rem" }} />
        <EditorField
          label="Business Hours"
          name="hours"
          value={siteData.hours}
          onChange={handleChange}
        />
      </EditorSection>

      <EditorSection
        title="Colors"
        locked={colorsLocked}
        lockMessage="Advanced color controls unlock on Pro and Business."
      >
        <div style={gridStyle}>
          <EditorField
            label="Primary"
            name="primaryColor"
            value={siteData.primaryColor}
            onChange={handleChange}
            type="color"
          />
          <EditorField
            label="Accent"
            name="accentColor"
            value={siteData.accentColor}
            onChange={handleChange}
            type="color"
          />
          <EditorField
            label="Page Background"
            name="backgroundColor"
            value={siteData.backgroundColor}
            onChange={handleChange}
            type="color"
          />
          <EditorField
            label="Card Background"
            name="surfaceColor"
            value={siteData.surfaceColor}
            onChange={handleChange}
            type="color"
          />
        </div>
      </EditorSection>

      <EditorSection
        title="Business Extras"
        locked={businessExtrasLocked}
        lockMessage="Announcement and testimonial sections are exclusive to Business."
      >
        <EditorField
          label="Announcement Bar"
          name="announcementText"
          value={siteData.announcementText}
          onChange={handleChange}
        />
        <div style={{ height: "0.75rem" }} />
        <EditorField
          label="Testimonial Quote"
          name="testimonialQuote"
          value={siteData.testimonialQuote}
          onChange={handleChange}
          as="textarea"
        />
        <div style={{ height: "0.75rem" }} />
        <EditorField
          label="Testimonial Author"
          name="testimonialAuthor"
          value={siteData.testimonialAuthor}
          onChange={handleChange}
        />
      </EditorSection>
    </aside>
  );
}
