import { useNavigate } from "react-router-dom";
import TemplateLoader from "../components/TemplateLoader";

export default function Templates() {
  const navigate = useNavigate();

  const handleOpen = (template) => {
    navigate("/builder", {
      state: {
        template: {
          ...template,
          siteData: template.siteData ?? template.data,
        },
      },
    });
  };

  return (
    <main style={{ background: "#f5f5f5", minHeight: "calc(100vh - 80px)" }}>
      <TemplateLoader onOpen={handleOpen} />
    </main>
  );
}
