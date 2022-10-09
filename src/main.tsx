import React from "react";
import ReactDOM from "react-dom/client";
import { AppContainer } from "components/App";
import "./i18n";
import "./common.css";
import "./normalize.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AppContainer />
  </React.StrictMode>
);
