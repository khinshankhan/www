import { globalCss, theme } from "lib/theme/stitches.config";
import { media } from "lib/theme/selectors";
import polyfillStyles from "./polyfill";
import typographyStyles from "./typography";

export const GlobalStyles = globalCss({
  ...polyfillStyles,
  ...typographyStyles,

  // apply defaults
  body: {
    background: theme.colors.bg,
    fontFamily: theme.fonts.body,

    lineHeight: theme.lineHeights.base,
    fontSize: theme.fontSizes.lg, // 18px
    [media("lg")]: {
      fontSize: "1.3125rem", // 21px
    },
    [media("2xl")]: {
      fontSize: "1.43775rem", // ~23px, avg 21px and $xl
    },
  },
});
