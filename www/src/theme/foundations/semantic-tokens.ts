import { transparentize } from "@chakra-ui/theme-tools";
import colors from "./colors";

const theme = { colors };
const navBgTransparency = 0.85;

const semanticTokens = {
  colors: {
    bg: {
      default: `brand.bg`,
    },
    bgContrast: {
      default: `blueGray.800`,
    },
    bgAlpha: {
      default: transparentize(`brand.elevate`, navBgTransparency)(theme),
    },
    dividerColor: {
      default: `brand.primary`,
    },
    internal: {
      default: `brand.primary`,
    },
    external: {
      default: `brand.primary`,
    },
  },
};

export default semanticTokens;
