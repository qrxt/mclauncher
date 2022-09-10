import { css } from "@emotion/react";

export const layoutStyles = css`
  display: grid;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  grid-template:
    "h h h h h"
    "m m m m s"
    "m m m m s";
  grid-template-rows: 50px 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr 150px;
  height: 100%;
`;

export const mainStyles = css`
  grid-area: m;
`;

export default {
  layoutStyles,
  mainStyles,
};
