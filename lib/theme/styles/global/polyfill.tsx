import { theme } from "lib/theme/stitches.config";

const root = ":root";

export const polyfillStyles = {
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
};

export default polyfillStyles;
