import { css } from "@emotion/react";

export const instanceCardStyles = css`
  display: flex;
  flex-direction: column;

  width: 100px;
  min-height: 150px;

  &:focus {
    outline: 1px solid red;
  }
`;

export const instanceNameStyles = css`
  text-align: center;
  order: 2;
`;

export const instanceIconWrapperStyles = css`
  height: 100px;
  width: 100%;
  padding: 5px;
  order: 1;
  margin-bottom: 5px;
`;

export const instanceIconStyles = css`
  width: 100%;
  height: 100%;
`;

export default instanceCardStyles;
