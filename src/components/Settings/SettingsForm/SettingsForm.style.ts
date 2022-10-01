import { css } from "@emotion/react";

export const settingsFormStyles = css`
  display: flex;
  flex-wrap: wrap;
  width: 240px;
`;

export const settingsFormFieldsWrapperStyles = css`
  width: 100%;
`;

export const settingsFormLanguageSelectStyles = css`
  width: 100%;
`;

export const settingsFormFieldWrapperStyles = css`
  &:not(:last-child) {
    margin-bottom: 15px;
  }
`;
