import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPlanById } from "../plans/plans";
import AboutSection from "../components/AboutSection";
import AnnouncementBar from "../components/AnnouncementBar";
import ContactSection from "../components/ContactSection";
import HeroSection from "../components/HeroSection";
import ServicesSection from "../components/ServicesSection";
import TestimonialSection from "../components/TestimonialSection";
import { loadPublishedWebsiteBySlug } from "../firebase/loadWebsite";

export default function PublishedSite() {
  const { slug } = useParams();
  const [website, setWebsite] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadSite() {
      const data = await loadPublishedWebsiteBySlug(slug);

      if (!cancelled) {
        setWebsite(data);
        setLoading(false);
      }
    }

    loadSite();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) {
    return <main style={{ padding: "2rem" }}>Loading website...</main>;
  }

  if (!website) {
    return (
      <main style={{ padding: "2rem" }}>
        <h1>Website not found</h1>
        <p>This site is either unpublished or no longer available.</p>
      </main>
    );
  }

  const siteData = website.siteData;
  const plan = getPlanById(website.planId);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: siteData.backgroundColor,
        padding: "2rem",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {plan.features.businessExtras && <AnnouncementBar siteData={siteData} />}
        <HeroSection siteData={siteData} />
        <AboutSection siteData={siteData} />
        {(plan.features.servicesSection || plan.features.contactSection) && (
          <>
            {plan.features.servicesSection && (
              <ServicesSection siteData={siteData} />
            )}
            {plan.features.contactSection && (
              <ContactSection siteData={siteData} />
            )}
            {plan.features.businessExtras && (
              <TestimonialSection siteData={siteData} />
            )}
          </>
        )}

        {!plan.features.removeBranding && (
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
      </div>
    </main>
  );
}
