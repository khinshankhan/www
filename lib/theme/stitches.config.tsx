import { createStitches } from "@stitches/react";
import { resetStyles, bgStyles, containerStyles, typographyStyles } from "./styles";
import foundations from "./foundations";
import { colors, darkColors } from "./foundations/colors";

export const { styled, css, getCssText, createTheme, globalCss } = createStitches({
  prefix: "anchorage",
  media: {
    xs: "(min-width: 392px)",
    sm: "(min-width: 640px)",
    md: "(min-width: 768px)",
    lg: "(min-width: 1024px)",
    xl: "(min-width: 1280px)",
    "2xl": "(min-width: 1536px)",
    motion: "(prefers-reduced-motion)",
    hover: "(any-hover: hover)",
    dark: "(prefers-color-scheme: dark)",
    light: "(prefers-color-scheme: light)",
  },
  theme: {
    ...foundations,
    colors: {
      ...colors,
      text: "black",
      background: "$mauve2",

      placeholder: "black",
      border: "black",

      logoFg: "$plumblossom",
      logoBg: "transparent",
      logoBorder: "$logoFg",

      navStartBg: "rgba(237, 242, 247, 0.99)",
    },
  },
});

export const darkTheme = createTheme("dark", {
  colors: {
    ...darkColors,
    text: "white",
    background: "rgb(23, 25, 35)",

    placeholder: "white",
    border: "white",

    logoFg: "$sakurarose",

    navStartBg: "rgba(14, 14, 26, 0.99)",
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

    ...bgStyles,
    ...containerStyles,
    ...typographyStyles,
  },
});
