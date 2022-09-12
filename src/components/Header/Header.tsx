import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  headerStyles,
  navigationStyles,
  controlsContainerStyles,
  controlWrapperStyles,
  controlLinkStyles,
  controlStyles,
} from "./Header.style";

interface HeaderControlProps {
  name: string;
  to: string;
  // icon
}

function HeaderControl(props: HeaderControlProps) {
  const { name, to } = props;

  return (
    <Link to={to} css={controlLinkStyles}>
      <span css={controlStyles}>{name}</span>
    </Link>
  );
}

function Header() {
  const { t } = useTranslation();

  return (
    <header css={headerStyles}>
      <nav css={navigationStyles}>
        <ul css={controlsContainerStyles}>
          <li css={controlWrapperStyles}>
            <HeaderControl name={t("header.controls.instances.name")} to="/" />
          </li>
          <li css={controlWrapperStyles}>
            <HeaderControl
              name={t("header.controls.settings.name")}
              to="/settings"
            />
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
