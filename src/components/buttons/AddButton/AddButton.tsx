import React from "react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { addButtonIconStyles, addButtonStyles } from "./AddButton.style";

export enum AddButtonVariant {
  Outlined = "outlined",
  Text = "text",
}

interface AddButtonProps {
  text?: string;
  variant: AddButtonVariant;
}

function AddButton(props: AddButtonProps) {
  const { text, variant } = props;

  return (
    <button type="button" css={addButtonStyles(variant)}>
      <PlusCircleIcon css={addButtonIconStyles} />
      {text}
    </button>
  );
}

export default AddButton;
