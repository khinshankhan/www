import React from "react";
import Icon from "@material-ui/core/Icon";
import K_LOGO from "./k_logo.svg";

const K_Logo = (props) => {
  return (
    <Icon {...props}>
      <img alt="k_logo" src={K_LOGO} height="70" width="70" />
    </Icon>
  );
};

export default K_Logo;
