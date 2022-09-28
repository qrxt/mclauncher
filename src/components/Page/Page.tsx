import React from "react";
import Layout from "components/Layout";
import { visuallyHidden } from "./Page.style";
import { useTranslation } from "react-i18next";

interface PageProps {
  children: React.ReactNode;
}

function Page(props: PageProps) {
  const { children } = props;
  const { t } = useTranslation();

  return (
    <>
      <h1 css={visuallyHidden}>{t("launcher.title")}</h1>
      <Layout>{children}</Layout>
    </>
  );
}

export default Page;
