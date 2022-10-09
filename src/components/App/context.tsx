import { filter, includes } from "lodash";
import React, { useState } from "react";

interface LaunchContextInterface {
  setIsLaunched: (name: string) => void;
  setIsStopped: (name: string) => void;
  isInstanceLaunched: (name: string) => boolean;
  launchedInstances: string[];
}

const initialContext: LaunchContextInterface = {
  setIsLaunched: () => null,
  setIsStopped: () => null,
  isInstanceLaunched: () => false,
  launchedInstances: [],
};

export const LaunchContext =
  React.createContext<LaunchContextInterface>(initialContext);

interface ProviderProps {
  children: React.ReactNode;
}

const Provider = ({ children }: ProviderProps) => {
  const [launchedInstances, setLaunchedInstances] = useState<string[]>([]);

  function setIsLaunched(name: string) {
    setLaunchedInstances([...launchedInstances, name]);
  }

  function setIsStopped(name: string) {
    setLaunchedInstances(
      filter(launchedInstances, (instanceName) => instanceName !== name)
    );
  }

  function isInstanceLaunched(name: string) {
    return includes(launchedInstances, name);
  }

  const value = {
    setIsLaunched,
    setIsStopped,
    isInstanceLaunched,
    launchedInstances,
  };

  return (
    <LaunchContext.Provider value={value}>{children}</LaunchContext.Provider>
  );
};

export default Provider;
