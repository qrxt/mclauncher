import React from "react";
import ReactDOM from "react-dom/client";
import App from "components/App/App";
import "./i18n";
import "./common.css";
import "./normalize.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
