import { globalCss, theme } from "lib/theme/stitches.config";
import { media } from "lib/theme/selectors";
import polyfillStyles from "./polyfill";
import containerStyles from "./container";
import typographyStyles from "./typography";
import normalizeStyles from "./normalize";

export const GlobalStyles = globalCss({
  [media("isMobile")]: {
    ".hide-mobile": {
      display: "none !important",
    },
  },
  [media("isDesktop")]: {
    ".hide-desktop": {
      display: "none !important",
    },
  },

  ...polyfillStyles,
  ...containerStyles,
  ...typographyStyles,
  ...normalizeStyles,

  body: {
    color: theme.colors.placeholder,
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
