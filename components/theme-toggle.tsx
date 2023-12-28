"use client";

import { useCallback } from "react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  const isLight = resolvedTheme === `light`;
  const oppositeTheme = isLight ? `dark` : `light`;

  const toggleTheme = useCallback(() => {
    setTheme(oppositeTheme);
  }, [setTheme, oppositeTheme]);

  return (
    <button type="button" onClick={toggleTheme}>
      Switch to {oppositeTheme} mode
    </button>
  );
}
