import React, { useContext } from "react";
import { render } from "__tests__/test-utils";
import Instances from "./Instances";
import { Instance } from "types/instance";
import { act } from "react-dom/test-utils";
import instances from "__tests__/locators/instances";
import InstancesProvider, { InstancesContext } from "./context";

describe("Test Instances", () => {
  const instanceList: Instance[] = [
    {
      name: "instance#1",
      version: "1.16.4",
      instance_path: ".",
      subtype: "vanilla",
    },
    {
      name: "instance#2",
      version: "1.17.1",
      instance_path: ".",
      subtype: "vanilla",
    },
  ];

  beforeAll(() => {
    window.__TAURI_IPC__ = () => null;
  });

  function WrappedInstances() {
    const { setSelectedInstance, selectedInstance, instances } =
      useContext(InstancesContext);

    return (
      <Instances
        instances={instances}
        selectedInstance={selectedInstance}
        setSelectedInstance={setSelectedInstance}
      />
    );
  }

  test("Instances section should render correctly (without instances)", async () => {
    const result = render(
      <Instances
        instances={[]}
        selectedInstance={null}
        setSelectedInstance={() => null}
      />
    );
    const instancesElem = instances(result.baseElement);

    expect(instancesElem.wrapper()).toBeInTheDocument();
    expect(instancesElem.noData()).toBeInTheDocument();
    expect(instancesElem.noDataAddButton()).toBeInTheDocument();
  });

  test("Instances section should render correctly (with instances)", async () => {
    const result = render(
      <InstancesProvider initialInstances={instanceList}>
        <WrappedInstances />
      </InstancesProvider>
    );
    const instancesElem = instances(result.baseElement);

    expect(instancesElem.wrapper()).toBeInTheDocument();
    expect(instancesElem.instancesList()).toBeInTheDocument();
    expect(instancesElem.sidebar()).toBeInTheDocument();
  });

  test("Select instance", async () => {
    const result = render(
      <InstancesProvider initialInstances={instanceList}>
        <WrappedInstances />
      </InstancesProvider>
    );
    const instancesElem = instances(result.baseElement);

    expect(instancesElem.selectedInstance()).not.toBeInTheDocument();

    await act(async () => {
      instancesElem.selectInstance(0);
    });

    expect(instancesElem.selectedInstance()).toBeInTheDocument();
    expect(instancesElem.selectedInstanceName()).toHaveTextContent(
      "instance#1"
    );
  });
});
