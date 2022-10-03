import Header from "components/Header";
import Main from "components/Main";
import React from "react";
import { layoutStyles } from "./Layout.style";

interface LayoutProps {
  children?: React.ReactNode;
  selectedTab: string;
}

function Layout(props: LayoutProps) {
  const { children, selectedTab } = props;

  return (
    <div css={layoutStyles}>
      <Header selectedTab={selectedTab} />
      <Main>{children}</Main>
    </div>
  );
}

export default Layout;
