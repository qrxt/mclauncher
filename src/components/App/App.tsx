import React, { useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import InstancesPage from "components/pages/InstancesPage";
import SettingsPage from "components/pages/SettingsPage";
import NewInstancePage from "components/pages/NewInstancePage";
import { LaunchContext } from "./context";
import { listen } from "@tauri-apps/api/event";
import { gameClosed, gameLaunched } from "messages/events";
import LogPage from "components/pages/LogPage";

function App() {
  const { setIsLaunched, setIsStopped, isInstanceLaunched, launchedInstances } =
    useContext(LaunchContext);

  console.log(launchedInstances);

  useEffect(() => {
    const unlisten = listen<string>(gameLaunched, (event) => {
      const instanceName = event.payload;

      if (!isInstanceLaunched(instanceName)) {
        setIsLaunched(instanceName);
      }
    });

    return () => {
      unlisten.then((f) => {
        f();
      });
    };
  }, [isInstanceLaunched, setIsLaunched]);

  useEffect(() => {
    const unlisten = listen<string>(gameClosed, (event) => {
      const instanceName = event.payload;

      if (isInstanceLaunched(instanceName)) {
        console.log("set is stopped");
        setIsStopped(instanceName);
      }
    });

    return () => {
      unlisten.then((f) => {
        f();
      });
    };
  }, [isInstanceLaunched, setIsStopped]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/add-instance" element={<NewInstancePage />} />
        <Route path="/" element={<InstancesPage />} />
        {/* <Route path="/" element={<LogPage />} /> */}
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/log" element={<LogPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
