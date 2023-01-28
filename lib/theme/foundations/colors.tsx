import { slate, slateDark } from "@radix-ui/colors";

const palette = {
  ...slate,
};

const key = (key: keyof typeof palette) => `$${key}`;
export const colors = {
  ...palette,
  bg: key("slate1"),
};

// override any light theme same key names
// try to keep shared colors within colors
const darkPalette = {
  ...slateDark,
};

export const darkColors = {
  ...darkPalette,
};
