import {
  amber,
  amberDark,
  gold,
  goldDark,
  grass,
  grassDark,
  gray,
  grayDark,
  mauve,
  mauveDark,
  plum,
  plumDark,
  red,
  redDark,
  sky,
  skyDark,
  slate,
  slateDark,
  tomato,
  tomatoDark,
  yellow,
  yellowDark,
} from "@radix-ui/colors";
import { changeObjectKeys } from "lib/utils/object";

// I tried, oh well
const bluegray = {
  bluegray12: "hsl(240, 30%, 8%)",
  bluegray11: "hsl(235, 27%, 9%)",
  bluegray10: "hsl(232, 25%, 10%)",
  bluegray9: "hsl(230, 21%, 11%)",
  bluegray8: `hsl(230, 25%, 13%)`,
  bluegray7: `hsl(230, 25%, 78%)`,
  bluegray6: `hsl(230, 25%, 85%)`,
  bluegray5: `hsl(230, 25%, 90%)`,
  bluegray4: `hsl(230, 25%, 92%)`,
  bluegray3: `hsl(230, 25%, 96%)`,
  bluegray2: `hsl(230, 25%, 98%)`,
  bluegray1: `hsl(225, 20%, 99%)`,
};

const palette = {
  transparent: "transparent",
  black: "#000000",
  white: "#FFFFFF",

  ...changeObjectKeys(grass, "grass", "success"),
  ...changeObjectKeys(amber, "amber", "warning"),
  ...changeObjectKeys(tomato, "tomato", "error"),
  ...changeObjectKeys(sky, "sky", "info"),
  ...bluegray,
  ...gold,
  ...gray,
  ...mauve,
  ...plumDark,
  ...red,
  ...slate,
  ...yellow,
};

const key = (key: keyof typeof palette) => `$${key}`;
export const colors = {
  ...palette,
  placeholder: key("black"),
  border: key("gray12"),

  bg: key("mauve9"),
  contentBg: key("mauve1"),
  ghostBg: "rgba(0, 0, 0, 0.12)",

  logoFg: key("gray12"),
  logoBg: key("transparent"),
  logoBorder: "$logoFg",

  link: key("plum8"),
  linkActive: key("plum7"),
  linkOn: key("plum4"),
};

// override any light theme same key names
// try to keep shared colors within colors
const darkPalette = {
  ...changeObjectKeys(grassDark, "grass", "success"),
  ...changeObjectKeys(amberDark, "amber", "warning"),
  ...changeObjectKeys(tomatoDark, "tomato", "error"),
  ...changeObjectKeys(skyDark, "sky", "info"),
  ...goldDark,
  ...grayDark,
  ...mauveDark,
  ...plum,
  ...redDark,
  ...slateDark,
  ...yellowDark,
};

export const darkColors = {
  ...darkPalette,
  placeholder: key("white"),
  border: key("gray1"),

  bg: key("bluegray12"),
  contentBg: key("bluegray9"),
  ghostBg: "rgba(255, 255, 255, 0.12)",

  link: key("plum8"),
  linkActive: key("plum7"),
  linkOn: key("plum4"),
};

const getValue = <T extends Record<string, string>>(config: T, key: keyof T): string =>
  config[key].startsWith("$") ? getValue(config, config[key].substring(1) as keyof T) : config[key];

export const getColor = (key: keyof typeof colors): string => getValue(colors, key);
export const getDarkColor = (key: keyof typeof darkColors): string => getValue(darkColors, key);
