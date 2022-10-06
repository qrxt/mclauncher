import React from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { appStyles } from "./App.style";
import InstancesPage from "components/pages/InstancesPage";
import SettingsPage from "components/pages/SettingsPage";
import NewInstancePage from "components/pages/NewInstancePage";

function App() {
  return (
    <ChakraProvider>
      <div css={appStyles}>
        <BrowserRouter>
          <Routes>
            <Route path="/add-instance" element={<NewInstancePage />} />
            <Route path="/" element={<InstancesPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </BrowserRouter>
        <Outlet />
      </div>
    </ChakraProvider>
  );
}

export default App;
