import * as React from "react";
import { mainStyles } from "./Main.styles";

interface MainProps {
  children: React.ReactNode;
}

function Main(props: MainProps) {
  const { children } = props;

  return <section css={mainStyles}>{children}</section>;
}

export default Main;
