import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin", "greek"] });

const letterSpacings = {
  tighter: `-0.05em`,
  tight: `-0.025em`,
  normal: `0`,
  wide: `0.025em`,
  wider: `0.05em`,
  widest: `0.1em`,
};

const lineHeights = {
  normal: `normal`,
  none: `1`,
  shorter: `1.25`,
  short: `1.375`,
  base: `1.5`,
  tall: `1.625`,
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
const fontWeights = {
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

const fonts = {
  heading: `${inter.style.fontFamily}, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
  body: `${inter.style.fontFamily}, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
  mono: `SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace`,
};

// https://type-scale.com/
// 1.250 Major Third Type Scale, base 16 px
const fontSizes = {
  xs: `0.7rem`,
  sm: `0.875rem`,
  md: `1rem`, // 16px
  lg: `1.125rem`,
  xl: `1.563rem`,
  "2xl": `1.953rem`,
  "3xl": `2.441rem`,
  "4xl": `3.052rem`,
  "5xl": `3.815rem`,
  "6xl": `4.768rem`,
  "7xl": `5.96rem`,
  "8xl": `7.451rem`,
  "9xl": `9.313rem`,
};

const typography = {
  letterSpacings,
  lineHeights,
  fontWeights,
  fonts,
  fontSizes,
};

export default typography;
