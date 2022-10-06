import { fireEvent, getByTestId } from "@testing-library/react";

export default function settingsForm(nodeElement: HTMLElement) {
  return {
    nodeElement,
    form() {
      return getByTestId(nodeElement, "settings-form");
    },
    title() {
      return getByTestId(nodeElement, "settings-form-title");
    },

    languageSelect() {
      return getByTestId(nodeElement, "settings-form-language-select");
    },
    languageSelectOption(value: string): HTMLOptionElement {
      return getByTestId(
        nodeElement,
        `settings-form-language-select-item-${value}`
      );
    },

    submitButton() {
      return getByTestId(nodeElement, "settings-form-submit-button");
    },
    submit() {
      const submitButton = this.submitButton();

      if (submitButton) {
        fireEvent.click(submitButton);
      }
    },
  };
}
