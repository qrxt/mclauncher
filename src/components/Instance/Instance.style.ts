import { css } from "@emotion/react";

export const selectedInstanceCardStyles = css``;

export const instanceCardStyles = ({
  isSelected,
}: {
  isSelected: boolean;
}) => css`
  display: flex;
  flex-direction: column;

  width: 100px;
  min-height: 150px;

  ${isSelected ? selectedInstanceCardStyles : ""}
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

export const instanceIconStyles = ({
  isSelected,
}: {
  isSelected: boolean;
}) => css`
  width: 100%;
  height: 100%;

  ${isSelected
    ? css`
        opacity: 0.75;
      `
    : ""}
`;

export default instanceCardStyles;
