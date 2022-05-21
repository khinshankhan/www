import React, { FC } from "react";
import { IconButtonProps, useColorMode, IconButton } from "@chakra-ui/react";
import { CgMoon as Moon, CgSun as Sun } from "react-icons/cg";

export const ToggleColorMode: FC<Omit<IconButtonProps, "aria-label">> = ({
  size = 24,
  ...props
}) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === `dark`;

  // when in dark/ light mode, display info for light/ dark mode respectively to make it clear what toggling will do
  const text = isDark ? `light` : `dark`;
  const ColorIcon = isDark ? Sun : Moon;

  return (
    <IconButton
      variant="ghost"
      onClick={toggleColorMode}
      icon={<ColorIcon size={size} />}
      {...props}
      aria-label={`Switch to ${text} mode`}
    />
  );
};

export default ToggleColorMode;
