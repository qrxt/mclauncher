import React from "react";
import { render } from "__tests__/test-utils";
import newInstanceForm from "__tests__/locators/newInstanceForm";
import NewInstance from "./NewInstance";
import { Version } from "types/version";
import { act } from "react-dom/test-utils";
import textInput from "__tests__/locators/textInput";
import selectInput from "__tests__/locators/select";
import checkbox from "__tests__/locators/checkbox";

describe("Test NewInstance", () => {
  const versions: Version[] = [
    {
      id: "1.16.4",
      type: "release",
      releaseTime: "2021-01-14T16:05:32+00:00",
    },
    {
      id: "0.0.0",
      type: "rc",
      releaseTime: "2021-01-14T16:05:32+00:00",
    },
  ];

  test("NewInstance form should render correctly", async () => {
    const versions: Version[] = [];

    const result = render(<NewInstance versions={versions} />);
    const form = newInstanceForm(result.baseElement);
    expect(form.form()).toBeInTheDocument();
    expect(form.title()).toHaveTextContent("Create new instance");
    expect(form.submitButton()).toHaveTextContent("Create");

    const nameInput = textInput(result.baseElement, "new-instance-form");
    expect(nameInput.wrapper()).toBeInTheDocument();
    expect(nameInput.label()).toHaveTextContent("Name");
    expect(nameInput.input()).toBeInTheDocument();

    const onlyReleasesCheckbox = checkbox(
      result.baseElement,
      "new-instance-form-only-releases"
    );
    expect(onlyReleasesCheckbox.wrapper()).toBeInTheDocument();
    expect(onlyReleasesCheckbox.label()).toHaveTextContent("Only releases");
    expect(onlyReleasesCheckbox.isChecked()).toBeTruthy();

    const versionSelect = selectInput(result.baseElement, "new-instance-form");
    expect(versionSelect.wrapper()).toBeInTheDocument();
    expect(versionSelect.label()).toHaveTextContent("Version");
    expect(versionSelect.input()).toBeInTheDocument();
  });

  test("Display only releases and all releases", async () => {
    const result = render(<NewInstance versions={versions} />);

    const onlyReleasesCheckbox = checkbox(
      result.baseElement,
      "new-instance-form-only-releases"
    );

    expect(onlyReleasesCheckbox.isChecked()).toBeTruthy();

    const versionSelect = selectInput(result.baseElement, "new-instance-form");
    const getSelectedVersions = () =>
      versionSelect.options().map((option) => option.innerHTML);

    expect(getSelectedVersions()).toHaveLength(1);
    expect(getSelectedVersions()).toEqual(["1.16.4"]);

    await act(() => {
      onlyReleasesCheckbox.uncheck();
    });

    expect(getSelectedVersions()).toHaveLength(2);
    expect(getSelectedVersions()).toEqual(["1.16.4", "0.0.0"]);
  });
});
