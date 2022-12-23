import { createStitches } from "@stitches/react";

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
  body: {
    background: "$background",
    color: "$text",
  },
});
