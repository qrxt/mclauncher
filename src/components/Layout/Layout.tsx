import Header from "components/Header";
import Main from "components/Main";
import React from "react";
import { layoutStyles } from "./Layout.style";

interface LayoutProps {
  children?: React.ReactNode;
}

function Layout(props: LayoutProps) {
  const { children } = props;

  return (
    <div css={layoutStyles}>
      <Header />
      <Main>{children}</Main>
    </div>
  );
}

export default Layout;
