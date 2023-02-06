import {
  amber,
  amberDark,
  blackA,
  blueA,
  blueDarkA,
  gold,
  goldDark,
  grass,
  grassDark,
  gray,
  grayDark,
  mauve,
  mauveDark,
  mauveA,
  mauveDarkA,
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
  violet,
  violetDark,
  whiteA,
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
  bluegray7: `hsl(230, 25%, 34%)`,
  bluegray6: `hsl(230, 25%, 78%)`,
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
  ...blackA,
  ...whiteA,

  ...changeObjectKeys(grass, "grass", "success"),
  ...changeObjectKeys(amber, "amber", "warning"),
  ...changeObjectKeys(tomato, "tomato", "error"),
  ...changeObjectKeys(sky, "sky", "info"),
  ...bluegray,
  ...gold,
  ...gray,
  ...mauve,
  ...mauveA,
  ...plumDark,
  ...red,
  ...slate,
  ...violet,
  ...yellow,
  ...blueA,
};

// override any light theme same key names
const darkPalette = {
  ...changeObjectKeys(grassDark, "grass", "success"),
  ...changeObjectKeys(amberDark, "amber", "warning"),
  ...changeObjectKeys(tomatoDark, "tomato", "error"),
  ...changeObjectKeys(skyDark, "sky", "info"),
  ...goldDark,
  ...grayDark,
  ...mauveDark,
  ...mauveDarkA,
  ...plum,
  ...redDark,
  ...slateDark,
  ...violetDark,
  ...yellowDark,
  ...blueDarkA,
};

const key = (key: keyof typeof palette) => `$${key}`;
export const colors = {
  ...palette,
  placeholder: key("black"),
  border: key("gray12"),

  bg: key("mauve4"),
  ghostBg: "rgba(0, 0, 0, 0.12)",
  ghostOpaqueBg: "rgba(255, 255, 255, 0.99)",

  // TODO
  navBg: "hsla(289, 4.7%, 93.3%, 0.85)", // bg with transparency
  navOpaqueBg: "hsla(289, 4.7%, 93.3%, 0.99)",
  contentBg: key("mauve1"),

  logoFg: key("gray12"),
  logoBg: key("transparent"),
  logoBorder: key("transparent"),

  link: key("plum8"),
  linkActive: key("plum6"),
  linkOn: key("plum4"),

  lightAccent: key("violet11"),
  subtitle: key("bluegray6"),

  codeBg: key("mauve3"),
  codeTitle: key("bluegray7"),
  codeTitleBg: key("mauve5"),
  codeHighlight: key("mauve6"),
  codeHighlightLeft: key("violet10"),
};

// try to keep shared colors within colors
export const darkColors = {
  ...darkPalette,
  placeholder: key("white"),
  border: key("gray1"),
  ghostBg: "rgba(255, 255, 255, 0.12)",
  ghostOpaqueBg: "rgba(0, 0, 0, 0.90)",

  bg: key("bluegray12"),
  navBg: "hsla(240, 30%, 8%, 0.85)",
  navOpaqueBg: "hsla(240, 30%, 8%, 0.99)",
  contentBg: key("bluegray9"),

  link: key("plum8"),
  linkActive: key("plum6"),
  linkOn: key("plum4"),

  lightAccent: key("violet11"),
  subtitle: key("bluegray6"),

  codeBg: key("bluegray8"),
  codeTitle: key("bluegray6"),
  codeTitleBg: key("bluegray11"),
  codeHighlight: key("blueA3"),
  codeHighlightLeft: key("violet10"),
};

const getValue = <T extends Record<string, string>>(config: T, key: keyof T): string =>
  config[key].startsWith("$") ? getValue(config, config[key].substring(1) as keyof T) : config[key];

export const getColor = (key: keyof typeof colors): string => getValue(colors, key);
export const getDarkColor = (key: keyof typeof darkColors): string => getValue(darkColors, key);
