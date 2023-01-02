import { createStitches } from "@stitches/react";
import {
  resetStyles,
  bgStyles,
  containerStyles,
  mediaStyles,
  normalizeStyles,
  typographyStyles,
} from "./styles";
import foundations from "./foundations";
import { colors, darkColors } from "./foundations/colors";

export const media = {
  xs: "(min-width: 392px)",
  sm: "(min-width: 640px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 1150px)",
  xl: "(min-width: 1325px)",
  "2xl": "(min-width: 1536px)",

  isMobile: "(max-width: 768px)",
  isDesktop: "(min-width: 768px)",

  motion: "(prefers-reduced-motion)",
  hover: "(any-hover: hover)",

  dark: "(prefers-color-scheme: dark)",
  light: "(prefers-color-scheme: light)",
};

export const { styled, css, getCssText, createTheme, globalCss } = createStitches({
  prefix: "anchorage",
  media,
  theme: {
    ...foundations,
    colors: {
      ...colors,
      text: "$gray12",
      background: "$mauve2",

      placeholder: "black",
      border: "$gray12",

      link: "$plum7",
      linkActive: "$plum8",

      logoFg: "$gray12",
      logoBg: "transparent",
      logoBorder: "$logoFg",

      navBg: "rgba(237, 242, 247, 0.99)",
      iconBg: "rgba(0, 0, 0, 0.12)",
    },
  },
});

export const darkTheme = createTheme("dark", {
  colors: {
    ...darkColors,
    background: "rgb(23, 25, 35)",

    placeholder: "white",

    navBg: "rgba(14, 14, 26, 0.99)",
    iconBg: "rgba(255, 255, 255, 0.12)",
  },
});

export const GlobalStyles = globalCss({
  // get rid of browser default, leaving everything unstyled
  ...resetStyles,

  // apply website styles sanely
  body: {
    background: "$background",
    color: "$text",

    fontFamily: "$body",
    lineHeight: "$base",
    fontSize: "$lg", // 18px
    "@lg": {
      fontSize: "1.3125rem", // 21px
    },
    "@2xl": {
      fontSize: "1.43775rem", // ~23px, avg 21px and $xl
    },

    "*::placeholder": {
      color: "$color$placeholder",
    },
    "*, *::before, &::after": {
      borderColor: "$color$border",
      wordWrap: "break-word",
    },

    ...mediaStyles,
    ...bgStyles,
    ...containerStyles,
    ...typographyStyles,
    ...normalizeStyles,
  },
});
