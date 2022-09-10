import Header from "components/Header";
import Sidebar from "components/Sidebar";
import React from "react";
import { layoutStyles, mainStyles } from "./Layout.style";

interface LayoutProps {
  children?: React.ReactNode;
}

interface MainProps {
  children: React.ReactNode;
}

function Main(props: MainProps) {
  const { children } = props;

  return <section css={mainStyles}>{children}</section>;
}

function Layout(props: LayoutProps) {
  const { children } = props;

  return (
    <div css={layoutStyles}>
      <Header />
      <Sidebar />
      <Main>{children}</Main>
    </div>
  );
}

export default Layout;
