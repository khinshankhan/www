import { globalCss, theme } from "lib/theme/stitches.config";
import { media } from "lib/theme/selectors";
import polyfillStyles from "./polyfill";
import typographyStyles from "./typography";
import normalizeStyles from "./normalize";

export const GlobalStyles = globalCss({
  ".hide-mobile": {
    [media("isMobile")]: {
      display: "none",
    },
  },
  ".hide-desktop": {
    [media("isDesktop")]: {
      display: "none",
    },
  },

  ...polyfillStyles,
  ...typographyStyles,
  ...normalizeStyles,

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
