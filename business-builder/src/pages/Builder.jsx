import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AboutSection from "../components/AboutSection";
import HeroSection from "../components/HeroSection";
import SidebarEditor from "../components/SidebarEditor";
import { saveTemplate } from "../services/saveTemplate";
import { saveWebsite } from "../services/saveWebsite";

const defaultSiteData = {
  businessName: "Joe's Pizza",
  heroText: "Best Pizza In Town",
  aboutText: "Family owned since 1982",
  primaryColor: "#e63946",
};

export default function Builder() {
  const location = useLocation();
  const navigate = useNavigate();
  const startingData = location.state?.template?.siteData ?? defaultSiteData;
  const [siteData, setSiteData] = useState(startingData);

  const handleSaveWebsite = async () => {
    try {
      const id = await saveWebsite(siteData);
      alert(`Website saved! ID: ${id}`);
    } catch (err) {
      console.error("Save failed:", err);
      alert("Failed to save website. Check console.");
    }
  };

  const handleSaveTemplate = async () => {
    try {
      const id = await saveTemplate({
        name: siteData.businessName,
        siteData,
      });

      alert(`Template saved! ID: ${id}`);
      navigate("/templates");
    } catch (err) {
      console.error("Template save failed:", err);
      alert("Failed to save template. Check console.");
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <SidebarEditor siteData={siteData} setSiteData={setSiteData} />

      <div style={{ flex: 1, padding: "2rem", background: "#f5f5f5" }}>
        <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
          <button
            onClick={handleSaveWebsite}
            style={{
              padding: "0.75rem 1.5rem",
              background: "#4f46e5",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Save Website
          </button>

          <button
            onClick={handleSaveTemplate}
            style={{
              padding: "0.75rem 1.5rem",
              background: "#111827",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Save Template
          </button>
        </div>

        <HeroSection siteData={siteData} />
        <AboutSection siteData={siteData} />
      </div>
    </div>
  );
}
