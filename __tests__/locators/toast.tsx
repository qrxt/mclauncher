import { queryByText } from "@testing-library/react";

export default function toastWrapper(nodeElement: HTMLElement, text: string) {
  return {
    nodeElement,
    toast() {
      const toastElem = nodeElement.querySelector(
        ".chakra-toast"
      ) as HTMLElement;

      if (!toastElem || !queryByText(toastElem, text)) {
        return null;
      }

      return toastElem;
    },
    text() {
      return queryByText(nodeElement, text)?.innerHTML;
    },
  };
}
