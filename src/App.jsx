import {
  HashRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import Notebook from "./pages/Notebook";
import CurrentlyReading from "./pages/CurrentlyReading";
import ProjectDetail from "./pages/projectDetail";

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
        <Route path="/notebook" element={<Notebook />} />
        <Route path="/currently-reading" element={<CurrentlyReading />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        {/* Unknown URLs fall back to Home instead of a blank page. */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}
