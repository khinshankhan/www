import { transparentize } from "@chakra-ui/theme-tools";
import colors from "./colors";

const theme = { colors };

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
    bg: {
      default: `brand.primaryBg`,
    },
    bgContrast: {
      default: `blueGray.800`,
    },
    bgAlpha: {
      default: transparentize(`brand.elevateBg`, 0.8)(theme),
    },
    bgOpaque: {
      default: transparentize(`brand.elevateBg`, 0.98)(theme),
    },
    dividerColor: {
      default: `brand.palette.700`,
    },

    // used for links
    internal: {
      default: `brand.palette.700`,
    },
    internalDecoration: {
      default: `brand.palette.200`,
    },
    internalFocusDecoration: {
      default: `brand.palette.600`,
    },
    internalActiveDecoration: {
      default: `brand.palette.600`,
    },
    external: {
      default: `blue.600`,
    },
    externalDecoration: {
      default: `blue.200`,
    },
    externalFocusDecoration: {
      default: `blue.600`,
    },
  },
};

export default semanticTokens;
