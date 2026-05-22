export default function SidebarEditor({ siteData, setSiteData }) {
  function handleChange(e) {
    setSiteData({
      ...siteData,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div
      style={{
        width: "300px",
        padding: "1rem",
        background: "#1f1f1f",
        color: "white",
      }}
    >
      <h2>Editor</h2>

      <label>Business Name</label>
      <input
        type="text"
        name="businessName"
        value={siteData.businessName}
        onChange={handleChange}
      />

      <label>Hero Text</label>
      <input
        type="text"
        name="heroText"
        value={siteData.heroText}
        onChange={handleChange}
      />

      <label>About Text</label>
      <textarea
        name="aboutText"
        value={siteData.aboutText}
        onChange={handleChange}
      />

      <label>Primary Color</label>
      <input
        type="color"
        name="primaryColor"
        value={siteData.primaryColor}
        onChange={handleChange}
      />
    </div>
  );
}
