import { createStitches } from "@stitches/react";
import { display, darkDisplay } from "./foundations/display";
import { colors, darkColors } from "./foundations/colors";
import { icons, darkIcons } from "./foundations/icons";
import radii from "./foundations/radii";
import typography from "./foundations/typography";
import zIndices from "./foundations/z-index";
import {
  resetStyles,
  bgStyles,
  codeStyles,
  containerStyles,
  mediaStyles,
  normalizeStyles,
  typographyStyles,
} from "./styles";

export const media = {
  xs: "(min-width: 392px)",
  sm: "(min-width: 640px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 1150px)",
  xl: "(min-width: 1325px)",
  "2xl": "(min-width: 1536px)",

  isMobile: "(max-width: 768px)",
  isDesktop: "not (max-width: 768px)",

  motion: "(prefers-reduced-motion)",
  hover: "(any-hover: hover)",

  dark: "(prefers-color-scheme: dark)",
  light: "(prefers-color-scheme: light)",
};

export const { styled, css, getCssText, createTheme, globalCss } = createStitches({
  prefix: "anchorage",
  media,
  theme: {
    radii,
    ...typography,
    zIndices,
    display,
    colors,
    icons,
  },
});

export const darkTheme = createTheme("dark", {
  display: darkDisplay,
  colors: darkColors,
  icons: darkIcons,
});

export const GlobalStyles = globalCss({
  // get rid of browser default, leaving everything unstyled
  ...resetStyles,

  // apply website styles sanely
  body: {
    // apply defaults
    background: "$background",
    color: "$text",

    WebkitFontSmoothing: "antialiased",
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
    ...codeStyles,
    ...normalizeStyles,
  },
});
