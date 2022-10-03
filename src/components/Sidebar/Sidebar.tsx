import { Box } from "@chakra-ui/react";
import React from "react";
import { sidebarStyles } from "./Sidebar.style";

interface SidebarProps {
  children: React.ReactNode;
}

function Sidebar(props: SidebarProps) {
  const { children } = props;

  return (
    <Box as="section" css={sidebarStyles} boxShadow="xs" width="100%">
      {children}
    </Box>
  );
}

export default Sidebar;
