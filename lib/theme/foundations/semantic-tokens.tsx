import { transparentize } from "@chakra-ui/theme-tools";
import { colors } from "./colors";

const theme = { colors };

const semanticTokens = {
  colors: {
    "chakra-body-text": {
      default: transparentize(`gray.800`, 1)(theme),
      _dark: transparentize(`white`, 0.92)(theme),
    },
    "chakra-body-bg": {
      default: transparentize(`gray.50`, 1)(theme),
      _dark: transparentize(`gray.900`, 1)(theme),
    },
    "chakra-border-color": {
      default: `gray.200`,
      _dark: `whiteAlpha.300`,
    },
    "chakra-subtle-bg": {
      default: `gray.100`,
      _dark: `gray.700`,
    },
    "chakra-placeholder-color": {
      default: `gray.500`,
      _dark: `whiteAlpha.400`,
    },

    "chakra-body-bg-opaque": {
      default: transparentize(`gray.100`, 0.98)(theme),
      _dark: transparentize(`black`, 0.98)(theme),
    },

    primary: {
      default: `brand.600`,
      _dark: `brand.300`,
    },
  },
};

export default semanticTokens;
