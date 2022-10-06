import React from "react";
import { fireEvent, render } from "__tests__/test-utils";
import settingsForm from "__tests__/locators/settingsForm";
import SettingsForm from "./SettingsForm";
import { act } from "react-dom/test-utils";

describe("Test SettingsForm", () => {
  test("SettingsForm should render correctly", async () => {
    const result = render(<SettingsForm />);
    const form = settingsForm(result.baseElement);

    expect(form.form()).toBeInTheDocument();
    expect(form.title()).toHaveTextContent("Settings");
    expect(form.submitButton()).toHaveTextContent("Submit");
  });

  test("Language switch should work", async () => {
    const result = render(<SettingsForm />);
    const form = settingsForm(result.baseElement);
    const select = form.languageSelect();

    expect(select).toBeInTheDocument();

    // "en" language selected by default
    fireEvent.change(select, { target: { value: "ru" } });
    const ruOption = form.languageSelectOption("ru");
    expect(ruOption.selected).toBeTruthy();

    await act(async () => {
      form.submit();
    });

    expect(form.submitButton()).toHaveTextContent("Подтвердить");
  });
});
