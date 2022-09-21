import React from "react";
import { Instance } from "types/instance";
import {
  instanceCardStyles,
  instanceIconWrapperStyles,
  instanceNameStyles,
} from "./Instance.style";

interface InstanceProps {
  instance: Instance;
}

function InstanceCard(props: InstanceProps) {
  const { instance } = props;

  return (
    <div tabIndex={0} css={instanceCardStyles}>
      {/* onDoubleClick={} */}
      <header css={instanceNameStyles}>{instance.name}</header>
      <div css={instanceIconWrapperStyles}></div>
    </div>
  );
}

export default InstanceCard;
