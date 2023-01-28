import { slate, slateDark, gray, grayDark, plum, plumDark } from "@radix-ui/colors";

const palette = {
  black: "#000000",
  white: "#FFFFFF",
  ...slate,
  ...gray,
  ...plum,
};

const key = (key: keyof typeof palette) => `$${key}`;
export const colors = {
  ...palette,
  bg: key("slate1"),

  placeholder: key("black"),
  border: key("gray12"),

  link: key("plum8"),
  linkActive: key("plum7"),
  linkOn: key("plum4"),
};

// override any light theme same key names
// try to keep shared colors within colors
const darkPalette = {
  ...slateDark,
  ...grayDark,
  ...plumDark,
};

export const darkColors = {
  ...darkPalette,

  linkActive: key("plum7"),
};

const getValue = <T extends Record<string, string>>(config: T, key: keyof T): string =>
  config[key].startsWith("$") ? getValue(config, config[key].substring(1) as keyof T) : config[key];

export const getColor = (key: keyof typeof colors): string => getValue(colors, key);
export const getDarkColor = (key: keyof typeof darkColors): string => getValue(darkColors, key);
