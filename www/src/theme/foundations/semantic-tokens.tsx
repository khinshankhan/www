import { transparentize } from "@chakra-ui/theme-tools";
import colors from "./colors";

const theme = { colors };

// NOTE: transparentize with 1 is a hack
// to be able to import tokens from this file and use them
// as values for string interpolation css

// NOTE: transparentize will be deprecated next release, need to migrate the logic

// TODO: build out dark theme later
const semanticTokens = {
  colors: {
    primary: {
      default: `brand.palette.700`,
      _dark: `brand.palette.600`,
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
      default: transparentize(`brand.bg.light.50`, 1)(theme),
      _dark: transparentize(`brand.bg.dark.700`, 1)(theme),
    },
    bgContrast: {
      default: `blueGray.800`,
      _dark: `white`,
    },
    bgAlpha: {
      default: transparentize(`brand.bg.light.100`, 0.8)(theme),
      _dark: transparentize(`brand.bg.dark.900`, 0.8)(theme),
    },
    bgOpaque: {
      default: transparentize(`brand.bg.light.100`, 0.98)(theme),
      _dark: transparentize(`brand.bg.dark.800`, 0.98)(theme),
    },

    inactiveCardBg: {
      default: `orange.100`,
    },
    inactiveCardBorder: {
      default: `brand.bg.light.300`,
    },
    activeCardBg: {
      default: `green.50`,
      _dark: `brand.palette.200`,
    },
    spoilerText: {
      default: `blueGray.500`,
      _dark: `brand.bg.dark.500`,
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

    // TODO: check a11y for this
    inlineCodeBg: {
      default: `brand.bg.light.200`,
      _dark: `brand.bg.dark.800`,
    },
    codeBg: {
      default: `brand.bg.light.900`,
      _dark: `brand.bg.dark.800`,
    },
    inlineCodeSelection: {
      default: `brand.palette.100`,
    },
    codeHighlight: {
      default: `brand.bg.light.700`,
    },
    codeHighlightBorderLeft: {
      default: transparentize(`brand.bg.light.200`, 1)(theme),
    },
    codeInsertedBg: {
      default: transparentize(`green.700`, 1)(theme),
    },
    codeDeletedBg: {
      default: transparentize(`red.700`, 1)(theme),
    },
  },
};

export default semanticTokens;
