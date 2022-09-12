import React from "react";
import { SerializedStyles } from "@emotion/react";

interface AddIconProps {
  size: number;
  color?: string;
  className: SerializedStyles;
}

function AddIcon(props: AddIconProps) {
  const { size, color = "black", className } = props;

  return (
    <div css={className}>
      <svg
        version="1.1"
        id="addicon"
        x="0px"
        y="0px"
        viewBox="0 0 53 53"
        width={size}
      >
        <g>
          <path
            fill={color}
            d="M45.707,10.074l-9.794-9.782C35.726,0.105,
             35.471,0,35.206,0H8C7.447,0,7,0.447,7,1v51c0,
             0.553,0.447,1,1,1h37
             c0.553,0,1-0.447,1-1V10.782C46,10.517,45.895,10.263,45.707,
             10.074z M42.586,10H36V3.414L42.586,10z M9,51V2h25v9
             c0,0.553,0.447,1,1,1h9v39H9z"
          />
          <path
            fill={color}
            d="M40.5,39H35v-6c0-0.553-0.447-1-1-1s-1,0.447-1,1v6h-6c-0.553,
             0-1,0.447-1,1s0.447,1,1,1h6v6c0,0.553,0.447,1,1,1
             s1-0.447,1-1v-6h5.5c0.553,0,1-0.447,1-1S41.053,39,40.5,39z"
          />
        </g>
      </svg>
    </div>
  );
}

export default AddIcon;
