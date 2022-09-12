import React from "react";
import Layout from "components/Layout";

interface PageProps {
  children: React.ReactNode;
}

function Page(props: PageProps) {
  const { children } = props;

  return <Layout>{children}</Layout>;
}

export default Page;
