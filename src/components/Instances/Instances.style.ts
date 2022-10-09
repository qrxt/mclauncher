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

export const instancesListWrapperStyles = css`
  padding: 25px;
`;

export const instancesPlaceholderStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
`;

export const instancesListItemStyles = css`
  &:not(:last-child) {
    margin-right: 50px;
  }
`;

export const instancesListStyles = css`
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  list-style: none;
`;

export const instancesWrapperStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
