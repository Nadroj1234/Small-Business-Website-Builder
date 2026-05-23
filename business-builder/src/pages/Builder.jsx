import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { usePlan } from "../plans/usePlan";
import { getTemplates } from "../getTemplates";
import AboutSection from "../components/AboutSection";
import ContactSection from "../components/ContactSection";
import HeroSection from "../components/HeroSection";
import SidebarEditor from "../components/SidebarEditor";
import ServicesSection from "../components/ServicesSection";
import { publishWebsite } from "../services/publishWebsite";
import { saveTemplate } from "../services/saveTemplate";
import { saveWebsite } from "../services/saveWebsite";

const defaultSiteData = {
  businessName: "Joe's Pizza",
  tagline: "Neighborhood favorite since 1982",
  heroText: "Hot pizza, quick pickup, and a place everybody knows.",
  heroSubtext:
    "Build trust with a polished landing page that highlights your best offers, services, and contact information.",
  ctaText: "Order Now",
  secondaryCtaText: "View Menu",
  aboutTitle: "Why locals keep coming back",
  aboutText:
    "We are a family-owned spot serving handmade pies, fresh ingredients, and friendly service for busy weeknights and weekend gatherings.",
  servicesTitle: "What we offer",
  serviceOne: "Takeout and curbside pickup",
  serviceTwo: "Catering for offices and events",
  serviceThree: "Weekly family dinner specials",
  phone: "(555) 123-4567",
  email: "hello@joespizza.com",
  address: "123 Main Street\nBrooklyn, NY 11201",
  hours: "Mon-Sun: 11am - 10pm",
  primaryColor: "#e63946",
  accentColor: "#f4a261",
  backgroundColor: "#f8fafc",
  surfaceColor: "#fff7ed",
};

export default function Builder() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signInWithGoogle } = useAuth();
  const { currentPlan, adminPreviewEnabled } = usePlan();
  const existingWebsite = location.state?.website ?? null;
  const startingData = {
    ...defaultSiteData,
    ...(existingWebsite?.siteData ?? location.state?.template?.siteData ?? {}),
  };
  const [siteData, setSiteData] = useState(startingData);
  const [websiteRecord, setWebsiteRecord] = useState(existingWebsite);

  const handleSaveWebsite = async () => {
    try {
      if (!user) {
        await signInWithGoogle();
      }

      const website = await saveWebsite({
        siteData,
        websiteId: websiteRecord?.id ?? null,
        published: websiteRecord?.published ?? false,
        slug: websiteRecord?.slug ?? "",
        planId: currentPlan.id,
      });
      setWebsiteRecord(website);
      alert(`Website saved! Public slug: ${website.slug}`);
    } catch (err) {
      console.error("Save failed:", err);
      alert("Failed to save website. Check console.");
    }
  };

  const handleSaveTemplate = async () => {
    try {
      if (!user) {
        await signInWithGoogle();
      }

      if (currentPlan.limits.templates !== Infinity) {
        const existingTemplates = await getTemplates();

        if (existingTemplates.length >= currentPlan.limits.templates) {
          alert(
            `${currentPlan.name} includes up to ${currentPlan.limits.templates} saved templates. Upgrade to save more.`,
          );
          return;
        }
      }

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

  const handlePublishWebsite = async () => {
    try {
      let nextWebsite = websiteRecord;

      if (!nextWebsite) {
        if (!user) {
          await signInWithGoogle();
        }

        nextWebsite = await saveWebsite({
          siteData,
          websiteId: null,
          published: false,
          planId: currentPlan.id,
        });
        setWebsiteRecord(nextWebsite);
      }

      await publishWebsite(
        {
          ...nextWebsite,
          name: siteData.businessName,
          planId: currentPlan.id,
          siteData,
        },
        true,
      );
      const updatedRecord = { ...nextWebsite, published: true };
      setWebsiteRecord(updatedRecord);
      alert(`Website published at /sites/${updatedRecord.slug}`);
    } catch (err) {
      console.error("Publish failed:", err);
      alert("Failed to publish website. Check console.");
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <SidebarEditor
        siteData={siteData}
        setSiteData={setSiteData}
        currentPlan={currentPlan}
      />

      <div
        style={{
          flex: 1,
          padding: "2rem",
          background: siteData.backgroundColor,
        }}
      >
        {adminPreviewEnabled && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              gap: "1rem",
              marginBottom: "1rem",
              padding: "1rem 1.2rem",
              borderRadius: "16px",
              background: "rgba(255,255,255,0.7)",
              border: "1px solid #dbeafe",
            }}
          >
            <div>
              <strong>Previewing {currentPlan.name}</strong>
              <p style={{ marginTop: "0.35rem", color: "#475569" }}>
                {currentPlan.features.advancedBuilder
                  ? "Advanced builder tools are unlocked in this plan preview."
                  : "This preview locks advanced fields, extra sections, and keeps JAK branding visible."}
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate("/pricing")}
              style={{
                padding: "0.75rem 1rem",
                borderRadius: "999px",
                border: "1px solid #1d4ed8",
                background: "white",
                color: "#1d4ed8",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Change Preview Plan
            </button>
          </div>
        )}

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
            onClick={handlePublishWebsite}
            style={{
              padding: "0.75rem 1.5rem",
              background: "#ea580c",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            {websiteRecord?.published ? "Republish Website" : "Publish Website"}
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
            {user ? "Save Template" : "Sign In to Save Template"}
          </button>
        </div>

        <HeroSection siteData={siteData} />
        <AboutSection siteData={siteData} />
        {currentPlan.features.advancedSections ? (
          <>
            <ServicesSection siteData={siteData} />
            <ContactSection siteData={siteData} />
          </>
        ) : (
          <section
            style={{
              marginTop: "2rem",
              padding: "1.75rem",
              borderRadius: "20px",
              border: "1px dashed #94a3b8",
              background: "rgba(255,255,255,0.72)",
              textAlign: "left",
            }}
          >
            <h2 style={{ marginTop: 0 }}>Upgrade to unlock more sections</h2>
            <p style={{ color: "#475569", lineHeight: 1.8 }}>
              The Free preview includes a simple landing page. Services,
              contact, and richer brand controls unlock on Pro and Business.
            </p>
          </section>
        )}

        {!currentPlan.features.removeBranding && (
          <div
            style={{
              marginTop: "1.5rem",
              display: "inline-flex",
              padding: "0.65rem 0.95rem",
              borderRadius: "999px",
              background: "#0f172a",
              color: "white",
              fontWeight: 700,
            }}
          >
            Built with JAK&apos;s Website Builder
          </div>
        )}

        {websiteRecord?.slug && (
          <p style={{ marginTop: "1rem", color: "#475569" }}>
            Public URL: <code>{`/sites/${websiteRecord.slug}`}</code>
          </p>
        )}
      </div>
    </div>
  );
}
