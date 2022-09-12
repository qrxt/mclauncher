import { css } from "@emotion/react";

export const instancesStyles = css`
  height: 100%;
  display: grid;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  grid-template: "m s";
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 150px;
`;

export const instancesPlaceholderStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
`;
