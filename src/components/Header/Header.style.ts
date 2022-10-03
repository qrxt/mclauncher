import { css } from "@emotion/react";

export const headerStyles = css`
  grid-area: h;
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
  &:hover {
    cursor: pointer;
  }
`;

export const controlStyles = css`
  font-size: 18px;
`;
