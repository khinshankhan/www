import React from "react";
import { useColorMode, IconButton } from "@chakra-ui/react";
import { CgMoon as Moon, CgSun as Sun } from "react-icons/cg";

interface IToggleColorModeProps {
  size?: number;
}
export const ToggleColorMode = ({ size = 24 }: IToggleColorModeProps) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === `dark`;

  // when in dark/ light mode, display info for light/ dark mode respectively to make it clear what toggling will do
  const text = isDark ? `light` : `dark`;
  const ColorIcon = isDark ? Sun : Moon;

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
