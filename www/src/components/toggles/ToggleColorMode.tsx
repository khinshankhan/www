import React, { FC } from "react";
import { IconButtonProps, useColorMode, IconButton } from "@chakra-ui/react";
import { CgMoon as Moon, CgSun as Sun } from "react-icons/cg";

export interface IToggleColorModeProps extends Omit<IconButtonProps, "aria-label"> {
  iconSize?: number;
}
export const ToggleColorMode: FC<IToggleColorModeProps> = ({ iconSize = 24, ...props }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === `dark`;

  // when in dark/ light mode, display info for light/ dark mode respectively to make it clear what toggling will do
  const text = isDark ? `light` : `dark`;
  const ColorIcon = isDark ? Sun : Moon;

  return (
    <IconButton
      variant="ghost"
      color="bgContrast"
      onClick={toggleColorMode}
      icon={<ColorIcon size={iconSize} />}
      {...props}
      aria-label={`Switch to ${text} mode`}
    />
  );
};

export default ToggleColorMode;
