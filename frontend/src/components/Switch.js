import React, { useState } from "react";
import { styled } from "@mui/system";
import SwitchUnstyled, {
  switchUnstyledClasses,
} from "@mui/base/SwitchUnstyled";

const blue = {
  500: "#EE492E",
};

const grey = {
  400: "#BFC7CF",
  500: "#AAB4BE",
};

const Root = styled("span")`
  font-size: 0;
  position: relative;
  display: inline-block;
  width: 40px;
  height: 18px;
  margin: 10px;
  cursor: pointer;

  &.${switchUnstyledClasses.disabled} {
    opacity: 0.4;
    cursor: not-allowed;
  }

  & .${switchUnstyledClasses.track} {
    background: ${grey[400]};
    border-radius: 10px;
    display: block;
    height: 100%;
    width: 100%;
    position: absolute;
  }

  & .${switchUnstyledClasses.thumb} {
    display: block;
    width: 12px;
    height: 12px;
    top: 3px;
    left: 3px;
    border-radius: 16px;
    background-color: #fff;
    position: relative;
    transition: all 200ms ease;
  }

  &.${switchUnstyledClasses.focusVisible} .${switchUnstyledClasses.thumb} {
    background-color: ${grey[500]};
    box-shadow: 0 0 1px 8px rgba(0, 0, 0, 0.25);
  }

  &.${switchUnstyledClasses.checked} {
    .${switchUnstyledClasses.thumb} {
      left: 22px;
      top: 3px;
      background-color: #fff;
    }

    .${switchUnstyledClasses.track} {
      background: ${blue[500]};
    }
  }

  & .${switchUnstyledClasses.input} {
    cursor: inherit;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    z-index: 1;
    margin: 0;
  }
`;

export default function UnstyledSwitches(props) {
  const label = { componentsProps: { input: { "aria-label": "Demo switch" } } };
  const [checked, setChecked] = useState(false);

  const handleOnChange = (value) => {
    setChecked(value);
    props.resetPassword(value);
  };

  return (
    <SwitchUnstyled
      component={Root}
      {...label}
      onChange={(event) => handleOnChange(event.target.checked)}
      checked={checked}
    />
  );
}
