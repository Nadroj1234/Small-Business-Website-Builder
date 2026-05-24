import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Approvals from "./pages/Approvals";
import Builder from "./pages/Builder";
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import PublishedSite from "./pages/PublishedSite";
import Templates from "./pages/Templates";
import Waitlist from "./pages/Waitlist";
import Websites from "./pages/Websites";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/waitlist"
          element={
            <ProtectedRoute allowPending>
              <Waitlist />
            </ProtectedRoute>
          }
        />
        <Route
          path="/builder"
          element={
            <ProtectedRoute>
              <Builder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pricing"
          element={
            <ProtectedRoute>
              <Pricing />
            </ProtectedRoute>
          }
        />
        <Route
          path="/templates"
          element={
            <ProtectedRoute>
              <Templates />
            </ProtectedRoute>
          }
        />
        <Route
          path="/websites"
          element={
            <ProtectedRoute>
              <Websites />
            </ProtectedRoute>
          }
        />
        <Route
          path="/approvals"
          element={
            <ProtectedRoute>
              <Approvals />
            </ProtectedRoute>
          }
        />
        <Route path="/sites/:slug" element={<PublishedSite />} />
      </Routes>
    </>
  );
}
