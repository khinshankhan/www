import React from "react";
import { useColorMode } from "@chakra-ui/react";
import { DarkModeSwitch } from "react-toggle-dark-mode";

const ToggleMode = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <DarkModeSwitch
      checked={colorMode === `dark`}
      onChange={toggleColorMode}
      size={120}
    />
  );
};

export default ToggleMode;
