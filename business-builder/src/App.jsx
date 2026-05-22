import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Builder from "./pages/Builder";
import Home from "./pages/Home";
import Templates from "./pages/Templates";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/builder" element={<Builder />} />
        <Route path="/templates" element={<Templates />} />
      </Routes>
    </>
  );
}
