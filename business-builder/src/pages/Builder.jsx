import { useState } from "react";

import SidebarEditor from "../components/SidebarEditor";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";

import { saveWebsite } from "../firebase/saveWebsite";

export default function Builder() {
  const [siteData, setSiteData] = useState({
    businessName: "Joe's Pizza",
    heroText: "Best Pizza In Town",
    aboutText: "Family owned since 1982",
    primaryColor: "#e63946",
  });

  async function handleSave() {
    const id = await saveWebsite(siteData);

    alert(`Website saved! ID: ${id}`);
  }

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      <SidebarEditor siteData={siteData} setSiteData={setSiteData} />

      <div
        style={{
          flex: 1,
          padding: "2rem",
          background: "#f5f5f5",
        }}
      >
        <button
          onClick={handleSave}
          style={{
            marginBottom: "1rem",
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

        <HeroSection siteData={siteData} />
        <AboutSection siteData={siteData} />
      </div>
    </div>
  );
}
