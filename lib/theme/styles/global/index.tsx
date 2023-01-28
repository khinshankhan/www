import { globalCss, theme } from "lib/theme/stitches.config";
import polyfillStyles from "./polyfill";

export const GlobalStyles = globalCss({
  ...polyfillStyles,

  // apply defaults
  body: {
    background: theme.colors.bg,
    fontFamily: theme.fonts.body,

    lineHeight: "$base",
    fontSize: "$lg", // 18px
    "@lg": {
      fontSize: "1.3125rem", // 21px
    },
    "@2xl": {
      fontSize: "1.43775rem", // ~23px, avg 21px and $xl
    },
  },
});
