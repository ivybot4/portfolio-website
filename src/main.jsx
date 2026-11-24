import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "@fontsource/open-sans-condensed/300.css";
import "./index.css";

// The site used to have "#/" URLs (e.g. /#/projects/x). Rewrite any old shared
// link to its clean form (/projects/x) before the router reads the URL.
if (window.location.hash.startsWith("#/")) {
  window.history.replaceState(null, "", window.location.hash.slice(1));
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);