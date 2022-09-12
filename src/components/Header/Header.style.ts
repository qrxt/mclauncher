import { css } from "@emotion/react";
import { colors } from "theme";

export const headerStyles = css`
  grid-area: h;
  display: grid;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  grid-template: "n p";
  grid-template-columns: 1fr 150px;
  width: 100%;
  background-color: ${colors.lightGray};
  border-bottom: 1px solid ${colors.darkGray};
`;

export const navigationStyles = css`
  width: 100%;
  grid-area: n;
`;

export const controlsContainerStyles = css`
  display: flex;
  align-items: center;
  padding: 0 25px;
  margin: 0;
  height: 100%;

  list-style-type: none;
`;

export const controlWrapperStyles = css`
  &:not(:last-child) {
    margin-right: 25px;
  }
`;

export const controlLinkStyles = css`
  text-decoration: none;
  color: ${colors.black};

  &:visited {
    color: ${colors.black};
  }
`;

export const controlStyles = css`
  font-size: 18px;
`;
