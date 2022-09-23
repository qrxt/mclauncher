import React from "react";
import { Instance } from "types/instance";
import {
  instanceCardStyles,
  instanceIconWrapperStyles,
  instanceNameStyles,
} from "./Instance.style";
import { invoke } from "@tauri-apps/api/tauri";
import { launchInstance } from "messages";

interface InstanceProps {
  instance: Instance;
}

function handleDoubleClick(name: string) {
  invoke(launchInstance, { name });
}

function InstanceCard(props: InstanceProps) {
  const { instance } = props;

  return (
    <div
      tabIndex={0}
      css={instanceCardStyles}
      onDoubleClick={() => handleDoubleClick(instance.name)}
    >
      <header css={instanceNameStyles}>{instance.name}</header>
      <div css={instanceIconWrapperStyles}></div>
    </div>
  );
}

export default InstanceCard;
