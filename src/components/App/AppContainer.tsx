import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import LaunchedInstancesProvider from "./context";
import App from "./App";

function AppContainer() {
  return (
    <ChakraProvider>
      <LaunchedInstancesProvider>
        <App />
      </LaunchedInstancesProvider>
    </ChakraProvider>
  );
}

export default AppContainer;
