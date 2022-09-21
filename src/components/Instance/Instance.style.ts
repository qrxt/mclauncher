import { css } from "@emotion/react";

export const instanceCardStyles = css`
  display: flex;
  flex-direction: column-reverse;

  width: 100px;
  height: 120px;

  &:focus {
    outline: 1px solid red;
  }
`;

export const instanceNameStyles = css`
  text-align: center;
`;

export const instanceIconWrapperStyles = css`
  padding: 5px;
  background-color: lavender; // TODO: remove
  width: 100%;
  height: 100%;
`;

export default instanceCardStyles;
