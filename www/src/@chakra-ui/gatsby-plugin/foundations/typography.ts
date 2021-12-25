import { defaultFontHeading, defaultFontBody, defaultFontMono } from "constants/fonts";
import { ThemeOverride } from "@chakra-ui/react";

// https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight
const fontWeights: ThemeOverride["fontWeights"] = {
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
};

const fonts: ThemeOverride["fonts"] = {
  heading: `'Crimson Pro', ui-serif, Cambria, ${defaultFontHeading}`,
  body: `'Crimson Text', ui-serif, ${defaultFontBody}`,
  mono: defaultFontMono,
};

// 1.250 Major Third Type Scale https://type-scale.com/ base 16px
const fontSizes: ThemeOverride["fontSizes"] = {
  xs: `0.64rem`,
  sm: `0.8rem`,
  md: `1rem`, // 16px
  mdlg: `1.125rem`,
  lg: `1.25rem`,
  lgxl: `1.4065rem`,
  xl: `1.563rem`,
  xl2xl: `1.758rem`,
  "2xl": `1.953rem`,
  "3xl": `2.441rem`,
  "4xl": `3.052rem`,
  "5xl": `3.815rem`,
  "6xl": `4.768rem`,
  "7xl": `5.96rem`,
  "8xl": `7.451rem`,
  "9xl": `9.313rem`,
};

export { fontWeights, fonts, fontSizes };
