import { Box } from "@chakra-ui/react";
import React from "react";

interface StatusBarProps {
  children: React.ReactNode;
}

function StatusBar(props: StatusBarProps) {
  const { children } = props;

  return (
    <Box boxShadow="xs" width="100%" px={6}>
      {children}
    </Box>
  );
}

export default StatusBar;
