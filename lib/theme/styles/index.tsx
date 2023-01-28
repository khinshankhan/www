import { globalCss, theme } from "../stitches.config";

const root = ":root";

export const GlobalStyles = globalCss({
  // polyfill
  "@supports (height: -webkit-fill-available)": {
    [root]: {
      [theme.sizes.vh.variable]: "-webkit-fill-available",
    },
  },

  "@supports (height: -moz-fill-available)": {
    [root]: {
      [theme.sizes.vh.variable]: "-moz-fill-available",
    },
  },

  "@supports (height: 100dvh)": {
    [root]: {
      [theme.sizes.vh.variable]: "100dvh",
    },
  },

  // apply defaults
  body: {
    background: theme.colors.bg,
    fontFamily: theme.fonts.body,
  },
});
