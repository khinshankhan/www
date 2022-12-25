import { createStitches } from "@stitches/react";
import { reset } from "./styles/reset";

export const { styled, getCssText, createTheme, globalCss } = createStitches({
  prefix: "anchorage",
  theme: {
    fonts: {
      system: "system-ui",
    },
    colors: {
      text: "black",
      background: "white",
    },
  },
});

export const darkTheme = createTheme("dark", {
  colors: {
    text: "white",
    background: "black",
  },
});

export const GlobalStyles = globalCss({
  // get rid of browser default, leaving everything unstyled
  ...reset,

  // apply website styles sanely
  body: {
    background: "$background",
    color: "$text",
  },
});
