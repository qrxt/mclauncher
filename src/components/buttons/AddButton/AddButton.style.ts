import { css } from "@emotion/react";
import { AddButtonVariant } from "./AddButton";

export const addButtonStyles = (variant: string) => {
  const border =
    variant === AddButtonVariant.Outlined ? "1px solid black" : "none";

  return css`
    display: flex;
    justify-items: center;

    line-height: 2.3;

    border: ${border};
    background: none;
    padding: 10px;
  `;
};

export const addButtonIconStyles = css`
  display: flex;
  align-items: center;
  margin-right: 5px;

  width: 35px;
  height: 35px;
`;
