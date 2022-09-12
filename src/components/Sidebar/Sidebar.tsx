import React from "react";
import { sidebarStyles } from "./Sidebar.style";

interface SidebarProps {
  children: React.ReactNode;
}

function Sidebar(props: SidebarProps) {
  const { children } = props;

  return <section css={sidebarStyles}>{children}</section>;
}

export default Sidebar;
