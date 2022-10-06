import { fireEvent, getByTestId } from "@testing-library/react";

export default function settingsForm(nodeElement: HTMLElement) {
  return {
    nodeElement,
    form() {
      return getByTestId(nodeElement, "new-instance-form");
    },
    title() {
      return getByTestId(nodeElement, "new-instance-form-title");
    },

    fieldName() {
      return getByTestId(nodeElement, "new-instance-form-field-name");
    },
    fieldNameInput() {
      return getByTestId(nodeElement, "new-instance-form-field-name-input");
    },
    // languageSelectOption(value: string): HTMLOptionElement {
    //   return getByTestId(
    //     nodeElement,
    //     `settings-form-language-select-item-${value}`
    //   );
    // },

    submitButton() {
      return getByTestId(nodeElement, "new-instance-form-submit-button");
    },
    submit() {
      const submitButton = this.submitButton();

      if (submitButton) {
        fireEvent.click(submitButton);
      }
    },
  };
}
