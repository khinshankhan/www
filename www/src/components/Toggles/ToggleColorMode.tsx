import React from "react";
import { useColorMode, IconButton } from "@chakra-ui/react";
import { CgMoon as Moon, CgSun as Sun } from "react-icons/cg";

interface IToggleColorModeProps {
  size?: number;
}
export const ToggleColorMode = ({ size = 24 }: IToggleColorModeProps) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === `dark`;
  const text = isDark ? `dark` : `light`;

  const ColorIcon = isDark ? Moon : Sun;
  return (
    <IconButton
      aria-label={`Switch to ${text} mode`}
      variant="ghost"
      onClick={toggleColorMode}
      icon={<ColorIcon size={size} />}
    />
  );
};

export default ToggleColorMode;
