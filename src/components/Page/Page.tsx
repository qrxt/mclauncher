import React from "react";
import Layout from "components/Layout";
import { visuallyHidden } from "./Page.style";
import { useTranslation } from "react-i18next";

interface PageProps {
  children: React.ReactNode;
  selectedTab: string;
}

function Page(props: PageProps) {
  const { children, selectedTab } = props;
  const { t } = useTranslation();

  return (
    <>
      <h1 css={visuallyHidden}>{t("launcher.title")}</h1>
      <Layout selectedTab={selectedTab}>{children}</Layout>
    </>
  );
}

export default Page;
