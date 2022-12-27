import { createStitches } from "@stitches/react";
import { reset } from "./styles/reset";

export const { styled, getCssText, createTheme, globalCss } = createStitches({
  prefix: "anchorage",
  theme: {
    colors: {
      text: "black",
      background: "white",

      placeholder: "black",
      border: "black",
    },
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
    "*::placeholder": {
      color: `$color$placeholder`,
    },
    "*, *::before, &::after": {
      borderColor: `$color$border`,
      wordWrap: `break-word`,
    },
  },
});
