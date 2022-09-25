import { css } from "@emotion/react";

export const newInstanceWrapperStyles = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const newInstanceFormWrapperStyles = css`
  display: flex;
  flex-wrap: wrap;
  width: 320px;
`;

export const newInstanceFormStyles = css`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const newInstanceFormInputStyles = css`
  &:not(:last-child) {
    margin-bottom: 25px;
  }
`;

export const newInstanceFormSubmitButtonStyles = css`
  width: 100%;
  height: 25px;
`;
