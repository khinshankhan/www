import React from "react";
import { useColorMode, useColorModeValue, IconButton } from "@chakra-ui/react";
import { DarkModeSwitch } from "react-toggle-dark-mode";

interface IToggleModeSvgProps {
  colorMode: `dark` | `light`;
  toggleColorMode: () => void;
}

const ToggleModeSvg = ({
  colorMode,
  toggleColorMode,
}: IToggleModeSvgProps): JSX.Element => (
  <DarkModeSwitch checked={colorMode === `dark`} onChange={toggleColorMode} />
);

const ToggleMode = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const text = useColorModeValue(`dark`, `light`);

  return (
    <IconButton
      aria-label={`Switch to ${text} mode`}
      variant="ghost"
      icon={
        <ToggleModeSvg
          colorMode={colorMode}
          toggleColorMode={toggleColorMode}
        />
      }
    />
  );
};

export default ToggleMode;
