import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";
import { IconButton } from "components/primitives";

// TODO: move state to react context
export const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isLight = resolvedTheme === `light`;
  const oppositeTheme = isLight ? `dark` : `light`;
  const ColorIcon = isLight ? MoonIcon : SunIcon;

  const toggleTheme = () => setTheme(oppositeTheme);

  return (
    <IconButton aria-label={`Switch to ${oppositeTheme} mode`} onClick={toggleTheme}>
      <ColorIcon />
    </IconButton>
  );
};

export default ThemeToggle;
