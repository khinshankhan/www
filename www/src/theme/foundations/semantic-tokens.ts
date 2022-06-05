import { transparentize } from "@chakra-ui/theme-tools";
import colors from "./colors";

const theme = { colors };

const semanticTokens = {
  colors: {
    bg: {
      default: `brand.bg`,
    },
    bgContrast: {
      default: `blueGray.800`,
    },
    bgAlpha: {
      default: transparentize(`brand.elevate`, 0.85)(theme),
    },
    bgOpaque: {
      default: transparentize(`brand.elevate`, 0.98)(theme),
    },
    dividerColor: {
      default: `brand.primary`,
    },
    internal: {
      default: `brand.primary`,
    },
    external: {
      default: `blue.400`,
    },
  },
};

export default semanticTokens;
