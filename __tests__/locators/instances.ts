import {
  fireEvent,
  getAllByTestId,
  getByTestId,
  queryByTestId,
} from "@testing-library/react";

export default function instances(nodeElement: HTMLElement) {
  return {
    nodeElement,
    wrapper() {
      return getByTestId(nodeElement, "instances");
    },

    sidebar() {
      return getByTestId(nodeElement, "instances-sidebar");
    },
    selectedInstance() {
      return queryByTestId(nodeElement, "selected-instance");
    },
    selectedInstanceName() {
      return queryByTestId(nodeElement, "selected-instance-name");
    },

    noData() {
      return getByTestId(nodeElement, "instances-no-data");
    },
    noDataAddButton() {
      return getByTestId(nodeElement, "instances-no-data-add-button");
    },

    instancesList() {
      return getByTestId(nodeElement, "instances-list");
    },
    instancesListItems() {
      return getAllByTestId(nodeElement, "instances-list-item");
    },
    selectInstance(idx: number) {
      fireEvent.click(this.instancesListItems()[idx]);
    },
  };
}
