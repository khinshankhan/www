import React from "react";
import { useColorMode, useColorModeValue, IconButton } from "@chakra-ui/react";
import { DarkModeSwitch } from "react-toggle-dark-mode";

interface IToggleColorModeSvgProps {
  colorMode: `dark` | `light`;
  toggleColorMode?: () => void;
  size: number;
}
const ToggleColorModeSvg = ({
  colorMode,
  toggleColorMode = () => {},
  size,
}: IToggleColorModeSvgProps): JSX.Element => (
  <DarkModeSwitch checked={colorMode === `dark`} onChange={toggleColorMode} size={size} />
);
interface IToggleColorModeProps {
  size?: number;
}
const ToggleColorMode = ({ size = 24 }: IToggleColorModeProps) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const text = useColorModeValue(`dark`, `light`);
  return (
    <IconButton
      aria-label={`Switch to ${text} mode`}
      variant="ghost"
      onClick={toggleColorMode}
      icon={<ToggleColorModeSvg colorMode={colorMode} size={size} />}
    />
  );
};

export default ToggleColorMode;
