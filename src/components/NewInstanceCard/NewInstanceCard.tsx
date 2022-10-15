import React from "react";
import instanceCardStyles, {
  instanceIconStyles,
  instanceIconWrapperStyles,
  instanceNameStyles,
} from "components/Instance/Instance.style";
import { VisuallyHidden } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import mcAddIcon from "../../assets/icons/mc-add.png";

function NewInstanceCard() {
  const { t } = useTranslation();

  return (
    <Link to="/add-instance">
      <div tabIndex={0} css={instanceCardStyles({ isSelected: false })}>
        <header css={instanceNameStyles}>
          <VisuallyHidden>
            {t("instances.actions.addNewInstance")}
          </VisuallyHidden>
        </header>
        <div css={instanceIconWrapperStyles}>
          <img
            css={instanceIconStyles}
            src={mcAddIcon}
            width="64"
            height="64"
          />
        </div>
      </div>
    </Link>
  );
}

export default NewInstanceCard;
