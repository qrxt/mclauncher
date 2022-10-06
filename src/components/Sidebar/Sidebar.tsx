import { Box } from "@chakra-ui/react";
import React from "react";
import { sidebarStyles } from "./Sidebar.style";

interface SidebarProps {
  children: React.ReactNode;
  "data-testid": string;
}

function Sidebar(props: SidebarProps) {
  const { children, "data-testid": dataTestId } = props;

  return (
    <Box
      as="section"
      css={sidebarStyles}
      boxShadow="xs"
      width="100%"
      data-testid={dataTestId}
    >
      {children}
    </Box>
  );
}

export default Sidebar;
