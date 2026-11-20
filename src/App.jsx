import {
  HashRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import ProjectDetail from "./pages/projectDetail";
import DomainDetail from "./pages/DomainDetail";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/domains/:domainId" element={<DomainDetail />} />
        {/* /domains has no page of its own: go to the Domains section on Home. */}
        <Route path="/domains" element={<Navigate to="/" state={{ scrollTo: "domains" }} replace />} />
        {/* Unknown URLs fall back to Home instead of a blank page. */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}
