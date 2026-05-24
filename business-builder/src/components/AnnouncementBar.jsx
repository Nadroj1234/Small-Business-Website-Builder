export default function AnnouncementBar({ siteData }) {
  if (!siteData.announcementText) {
    return null;
  }

  return (
    <div
      style={{
        marginBottom: "1rem",
        padding: "0.9rem 1.2rem",
        borderRadius: "16px",
        background: "#0f172a",
        color: "white",
        textAlign: "center",
        fontWeight: 700,
        letterSpacing: "0.01em",
      }}
    >
      {siteData.announcementText}
    </div>
  );
}
