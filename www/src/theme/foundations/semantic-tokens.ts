import { transparentize } from "@chakra-ui/theme-tools";
import colors from "./colors";

const theme = { colors };

const semanticTokens = {
  colors: {
    primary: {
      default: `brand.palette.700`,
    },
    primaryAccent: {
      default: `brand.palette.100`,
    },
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
    internalActiveDecoration: {
      default: `brand.palette.600`,
    },
    external: {
      default: `blue.400`,
    },
  },
};

export default semanticTokens;
