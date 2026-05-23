import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Builder from "./pages/Builder";
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import PublishedSite from "./pages/PublishedSite";
import Templates from "./pages/Templates";
import Websites from "./pages/Websites";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/builder" element={<Builder />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/websites" element={<Websites />} />
        <Route path="/sites/:slug" element={<PublishedSite />} />
      </Routes>
    </>
  );
}
