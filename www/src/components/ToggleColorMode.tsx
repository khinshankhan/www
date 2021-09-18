import React from "react";
import { useColorMode, useColorModeValue, IconButton } from "@chakra-ui/react";
import { DarkModeSwitch } from "react-toggle-dark-mode";

interface IToggleColorModeSvgProps {
  colorMode: `dark` | `light`;
  toggleColorMode: () => void;
}

const ToggleColorModeSvg = ({
  colorMode,
  toggleColorMode,
}: IToggleColorModeSvgProps): JSX.Element => (
  <DarkModeSwitch checked={colorMode === `dark`} onChange={toggleColorMode} />
);

const ToggleColorMode = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const text = useColorModeValue(`dark`, `light`);

  return (
    <IconButton
      aria-label={`Switch to ${text} mode`}
      variant="ghost"
      icon={
        <ToggleColorModeSvg
          colorMode={colorMode}
          toggleColorMode={toggleColorMode}
        />
      }
    />
  );
};

export default ToggleColorMode;
