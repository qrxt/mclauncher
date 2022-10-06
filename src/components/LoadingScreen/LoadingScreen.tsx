import { Box, CircularProgress } from "@chakra-ui/react";
import React from "react";

function LoadingScreen() {
  return (
    <Box
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress isIndeterminate size={20} color="purple.100" />
    </Box>
  );
}

export default LoadingScreen;
