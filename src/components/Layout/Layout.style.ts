import { css } from "@emotion/react";

export const layoutStyles = css`
  display: grid;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  grid-template:
    "h"
    "m";
  grid-template-rows: 50px 1fr;
  grid-template-columns: 1fr;
  height: 100%;
`;

export default {
  layoutStyles,
};
