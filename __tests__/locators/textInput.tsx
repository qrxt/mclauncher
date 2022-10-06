import { fireEvent, getByTestId } from "@testing-library/react";

export default function textInput(
  nodeElement: HTMLElement,
  testidPrefix: string
) {
  return {
    nodeElement,
    wrapper() {
      return getByTestId(nodeElement, `${testidPrefix}-text-input`);
    },
    label() {
      return getByTestId(nodeElement, `${testidPrefix}-text-input-label`);
    },
    input() {
      return getByTestId(
        nodeElement,
        `${testidPrefix}-text-input-input`
      ) as HTMLInputElement;
    },

    value() {
      this.input().value;
    },
    fill(text: string) {
      fireEvent.change(this.input(), text);
    },
  };
}
