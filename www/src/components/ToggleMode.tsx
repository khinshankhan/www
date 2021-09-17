import React from "react";
import { useColorMode } from "@chakra-ui/react";
import { DarkModeSwitch } from "react-toggle-dark-mode";

const ToggleMode = ({ size = 120 }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <DarkModeSwitch
      checked={colorMode === `dark`}
      onChange={toggleColorMode}
      size={size}
    />
  );
};

export default ToggleMode;
