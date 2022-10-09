import React, { useEffect } from "react";
import { render } from "__tests__/test-utils";
import toastElement from "../locators/toast";
import { useToast } from "@chakra-ui/react";

describe("Test toast", () => {
  const toastTitle = "[test]";
  function ComponentWithToast() {
    const toast = useToast();

    useEffect(() => {
      toast({
        status: "success",
        title: toastTitle,
        isClosable: true,
      });
    }, [toast]);

    return (
      <div>
        <button></button>
      </div>
    );
  }

  test("should render correctly", async () => {
    const result = render(<ComponentWithToast />);
    const toast = toastElement(result.baseElement, toastTitle);

    expect(toast.toast()).toBeInTheDocument();
    expect(toast.text()).toBe(toastTitle);
  });
});
