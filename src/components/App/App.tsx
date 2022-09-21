import React from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { appStyles } from "./App.style";
import "./App.css";
import InstancesPage from "components/pages/InstancesPage";
import SettingsPage from "components/pages/SettingsPage";

function App() {
  return (
    <div css={appStyles}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<InstancesPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </BrowserRouter>
      <Outlet />
    </div>
  );
}

export default App;
