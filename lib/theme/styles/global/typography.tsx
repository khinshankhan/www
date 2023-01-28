import { theme } from "lib/theme/stitches.config";
import { media } from "lib/theme/selectors";

const smallStyle = {
  fontSize: theme.fontSizes["xs"],
  [media("isDesktop")]: {
    fontSize: theme.fontSizes["sm"],
  },
  [media("2xl")]: {
    fontSize: theme.fontSizes["md"],
  },
};

export const typographyStyles = {
  "h1, .h1": {
    fontFamily: theme.fonts.heading,
    fontWeight: theme.fontWeights.semibold,
    letterSpacing: theme.letterSpacings.wider,
    fontSize: theme.fontSizes["3xl"],
    [media("sm")]: {
      fontSize: theme.fontSizes["4xl"],
    },
    [media("2xl")]: {
      fontSize: theme.fontSizes["5xl"],
    },
  },
  "h2, .h2": {
    fontFamily: theme.fonts.heading,
    fontWeight: theme.fontWeights.semibold,
    letterSpacing: theme.letterSpacings.wider,
    fontSize: theme.fontSizes["2xl"],
    [media("sm")]: {
      fontSize: theme.fontSizes["3xl"],
    },
    [media("2xl")]: {
      fontSize: theme.fontSizes["4xl"],
    },
  },
  "h3, .h3": {
    fontFamily: theme.fonts.heading,
    fontWeight: theme.fontWeights.semibold,
    letterSpacing: theme.letterSpacings.wide,
    fontSize: theme.fontSizes["xl"],
    [media("sm")]: {
      fontSize: theme.fontSizes["2xl"],
    },
    [media("2xl")]: {
      fontSize: theme.fontSizes["3xl"],
    },
  },
  "h4, .h4": {
    fontFamily: theme.fonts.heading,
    fontWeight: theme.fontWeights.semibold,
    letterSpacing: theme.letterSpacings.wide,
    fontSize: theme.fontSizes["lg"],
    [media("sm")]: {
      fontSize: theme.fontSizes["xl"],
    },
    [media("2xl")]: {
      fontSize: theme.fontSizes["2xl"],
    },
  },
  "h5, .h5": {
    fontFamily: theme.fonts.heading,
    fontWeight: theme.fontWeights.semibold,
    letterSpacing: theme.letterSpacings.wide,
    fontSize: theme.fontSizes["md"],
    [media("sm")]: {
      fontSize: theme.fontSizes["lg"],
    },
    [media("2xl")]: {
      fontSize: theme.fontSizes["xl"],
    },
  },
  "h6, .h6": {
    fontFamily: theme.fonts.heading,
    fontWeight: theme.fontWeights.semibold,
    letterSpacing: theme.letterSpacings.wide,
    fontSize: theme.fontSizes["sm"],
    [media("sm")]: {
      fontSize: theme.fontSizes["md"],
    },
    [media("2xl")]: {
      fontSize: theme.fontSizes["lg"],
    },
  },

  ".main-nav": {
    fontFamily: theme.fonts.heading,
    fontWeight: theme.fontWeights.medium,
    letterSpacing: theme.letterSpacings.wide,
    fontSize: theme.fontSizes["lg"],
    [media("lg")]: {
      fontSize: "1.344rem", // avg lg and xl
    },
  },

  "small, .small": smallStyle,
  "sup, .sup": {
    ...smallStyle,
    verticalAlign: "super",
  },
  "sub, .sub": {
    ...smallStyle,
    verticalAlign: "sub",
  },
  ".small-bottom": {
    ...smallStyle,
    verticalAlign: "bottom",
  },
};

export default typographyStyles;
