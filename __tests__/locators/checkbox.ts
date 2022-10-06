import { fireEvent, getByTestId } from "@testing-library/react";

export default function checkbox(
  nodeElement: HTMLElement,
  testidPrefix: string
) {
  return {
    nodeElement,
    wrapper() {
      return getByTestId(nodeElement, `${testidPrefix}-checkbox`);
    },
    label() {
      return getByTestId(nodeElement, `${testidPrefix}-checkbox-label`);
    },
    input() {
      const inputWrapper = getByTestId(
        nodeElement,
        `${testidPrefix}-checkbox-input`
      ) as HTMLInputElement;

      return inputWrapper.querySelector("input")!;
    },

    isChecked() {
      return this.input().checked;
    },
    check() {
      if (!this.isChecked()) {
        fireEvent.click(this.input());
      }
    },
    uncheck() {
      if (this.isChecked()) {
        fireEvent.click(this.input());
      }
    },
  };
}
