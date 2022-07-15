import { transparentize } from "@chakra-ui/theme-tools";
import colors from "./colors";

const theme = { colors };

// NOTE: transparentize with 1 is a hack
// to be able to import tokens from this file and use them
// as values for string interpolation css

// TODO: build out dark theme later
const semanticTokens = {
  colors: {
    primary: {
      default: `brand.palette.700`,
    },
    primaryAccent: {
      default: `brand.palette.100`,
    },
    selection: {
      // TODO: check a11y for this
      default: `brand.palette.200`,
    },

    // backgrounds
    bgPrimary: {
      default: transparentize(`brand.bg.100`, 1)(theme),
    },
    bgContrast: {
      default: `blueGray.800`,
    },
    bgAlpha: {
      default: transparentize(`brand.bg.300`, 0.8)(theme),
    },
    bgOpaque: {
      default: transparentize(`brand.bg.300`, 0.98)(theme),
    },

    inactiveCardBg: {
      default: `orange.50`,
    },
    inactiveCardBorder: {
      default: `orange.500`,
    },
    activeCardBg: {
      default: `green.50`,
    },

    dividerColor: {
      default: `brand.palette.700`,
    },

    // used for links
    internal: {
      default: `brand.palette.500`,
    },
    internalDecoration: {
      default: `brand.palette.300`,
    },
    internalFocusDecoration: {
      default: `brand.palette.500`,
    },
    internalActiveDecoration: {
      default: `brand.palette.500`,
    },
    external: {
      default: `cyan.600`,
    },
    externalDecoration: {
      default: `cyan.300`,
    },
    externalFocusDecoration: {
      default: `cyan.600`,
    },
  },
};

export default semanticTokens;
