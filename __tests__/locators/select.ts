import { fireEvent, getAllByTestId, getByTestId } from "@testing-library/react";
import { find } from "lodash";

export default function select(nodeElement: HTMLElement, testidPrefix: string) {
  return {
    nodeElement,
    wrapper() {
      return getByTestId(nodeElement, `${testidPrefix}-select`);
    },
    label() {
      return getByTestId(nodeElement, `${testidPrefix}-select-label`);
    },
    input() {
      return getByTestId(
        nodeElement,
        `${testidPrefix}-select-input`
      ) as HTMLSelectElement;
    },

    options() {
      return getAllByTestId(
        nodeElement,
        "new-instance-form-select-option"
      ) as HTMLOptionElement[];
    },
    selectedOption() {
      const options = this.options();

      find(options, (option) => option.selected);
    },

    change(value: string) {
      fireEvent.change(this.input(), { target: { value } });
    },
  };
}
