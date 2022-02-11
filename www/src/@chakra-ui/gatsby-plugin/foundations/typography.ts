import { fonts as userFonts } from "constants/fonts";
import { ThemeOverride } from "@chakra-ui/react";

const letterSpacings: ThemeOverride["letterSpacings"] = {
  tighter: `-0.05em`,
  tight: `-0.025em`,
  normal: `0`,
  wide: `0.025em`,
  wider: `0.05em`,
  widest: `0.1em`,
};

const lineHeights: ThemeOverride["lineHeights"] = {
  normal: `normal`,
  none: 1,
  shorter: 1.25,
  short: 1.375,
  base: 1.5,
  tall: 1.625,
  taller: `2`,
  "3": `.75rem`,
  "4": `1rem`,
  "5": `1.25rem`,
  "6": `1.5rem`,
  "7": `1.75rem`,
  "8": `2rem`,
  "9": `2.25rem`,
  "10": `2.5rem`,
};

// https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight
const fontWeights: ThemeOverride["fontWeights"] = {
  hairline: 100,
  thin: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
};

const fonts: ThemeOverride["fonts"] = userFonts;

// https://type-scale.com/
// 1.250 Major Third Type Scale, base 16 px
// but offset by 2 to adjust for crimson pro being a small font
// along with adding mdlg, lgxl, and xl2xl
const fontSizes: ThemeOverride["fontSizes"] = {
  xs: `1rem`, // 16px
  sm: `1.25rem`,
  md: `1.563rem`,
  mdlg: `1.758rem`,
  lg: `1.953rem`,
  lgxl: `2.197rem`,
  xl: `2.441rem`,
  xl2xl: `2.7465rem`,
  "2xl": `3.052rem`,
  "3xl": `3.815rem`,
  "4xl": `4.768rem`,
  "5xl": `5.96rem`,
  "6xl": `7.451rem`,
  "7xl": `9.313rem`,
  "8xl": `11.642rem`,
  "9xl": `14.552rem`,
};

const typography: ThemeOverride["typography"] = {
  letterSpacings,
  lineHeights,
  fontWeights,
  fonts,
  fontSizes,
};

export default typography;
