import { createStitches } from "@stitches/react";
import type * as Stitches from "@stitches/react";
export type { VariantProps } from "@stitches/react";
import { colors, darkColors } from "./foundations/colors";

export const { styled, css, theme, createTheme, getCssText, globalCss, keyframes, config } =
  createStitches({
    prefix: "anchorage",
    media: {
      xs: "(min-width: 392px)",
      sm: "(min-width: 640px)",
      md: "(min-width: 768px)",
      lg: "(min-width: 1150px)",
      xl: "(min-width: 1325px)",
      "2xl": "(min-width: 1536px)",
      // usually I think in terms of this for design
      isMobile: "(max-width: 768px)",
      isDesktop: "not (max-width: 768px)",
    },
    theme: {
      sizes: {
        vh: "100vh",
      },
      colors,
    },
  });

export const darkTheme = createTheme("dark", {
  colors: darkColors,
});

export type CSS = Stitches.CSS<typeof config>;
