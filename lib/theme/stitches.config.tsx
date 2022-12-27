import { createStitches } from "@stitches/react";
import { reset } from "./styles/reset";
import typography from "./foundations/typography";

export const { styled, getCssText, createTheme, globalCss } = createStitches({
  prefix: "anchorage",
  theme: {
    colors: {
      text: "black",
      background: "white",

      placeholder: "black",
      border: "black",

      logoBg: "transparent",
      logoBorder: "$border",
    },
    ...typography,
  },
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
});

export const darkTheme = createTheme("dark", {
  colors: {
    text: "white",
    background: "black",

    placeholder: "white",
    border: "white",
  },
});

export const GlobalStyles = globalCss({
  // get rid of browser default, leaving everything unstyled
  ...reset,

  // apply website styles sanely
  body: {
    background: "$background",
    color: "$text",

    fontFamily: "$body",
    lineHeight: "$base",
    fontSize: "$lg", // 18px

    "*::placeholder": {
      color: `$color$placeholder`,
    },
    "*, *::before, &::after": {
      borderColor: `$color$border`,
      wordWrap: `break-word`,
    },
  },
});
