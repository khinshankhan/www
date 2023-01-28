import { slate, slateDark, gray, grayDark } from "@radix-ui/colors";

const palette = {
  black: "#000000",
  white: "#FFFFFF",
  ...slate,
  ...gray,
};

const key = (key: keyof typeof palette) => `$${key}`;
export const colors = {
  ...palette,
  bg: key("slate1"),

  placeholder: key("black"),
  border: key("gray12"),
};

// override any light theme same key names
// try to keep shared colors within colors
const darkPalette = {
  ...slateDark,
  ...grayDark,
};

export const darkColors = {
  ...darkPalette,
};
