import React from "react";
import { Instance } from "types/instance";
import {
  instanceCardStyles,
  instanceIconWrapperStyles,
  instanceNameStyles,
  instanceIconStyles,
  instanceLaunchedStyles,
} from "./Instance.style";
import { invoke } from "@tauri-apps/api/tauri";
import { launchInstance } from "messages";
import mcIcon from "../../assets/icons/mc.png";
import { Highlight, Text } from "@chakra-ui/react";
import { PlayIcon } from "@heroicons/react/24/solid";
import { colors } from "theme/theme";

export interface InstanceProps {
  instance: Instance;
  isSelected: boolean;
  isLaunched: boolean;
}

function handleDoubleClick(name: string) {
  invoke(launchInstance, { name });
}

function InstanceCard(props: InstanceProps) {
  const { instance, isSelected, isLaunched } = props;

  return (
    <div
      tabIndex={0}
      css={instanceCardStyles({ isSelected })}
      onDoubleClick={() => handleDoubleClick(instance.name)}
      aria-selected={isSelected}
    >
      <header css={instanceNameStyles}>
        <Text>
          <Highlight
            query={isSelected ? instance.name : ""}
            styles={{ px: "2.5", py: "0.5", rounded: "10", bg: "purple.100" }}
          >
            {instance.name}
          </Highlight>
        </Text>
      </header>
      <div css={instanceIconWrapperStyles}>
        <div hidden={!isLaunched} css={instanceLaunchedStyles}>
          <PlayIcon color={colors.purple} />
        </div>
        <img
          css={instanceIconStyles({ isSelected })}
          src={mcIcon}
          width="64"
          height="64"
        />
      </div>
    </div>
  );
}

export default InstanceCard;
