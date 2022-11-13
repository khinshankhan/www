import type { Styles } from "@chakra-ui/theme-tools";

const styles: Styles = {
  global: {
    body: {
      fontFamily: `body`,
      color: `chakra-body-text`,
      bg: `chakra-body-bg`,
      transition: `background-color 0.4s ease-in-out`,
      lineHeight: `base`,
    },
    "*::placeholder": {
      color: `chakra-placeholder-color`,
    },
    "*, *::before, &::after": {
      borderColor: `chakra-border-color`,
      wordWrap: `break-word`,
    },
  },
};

export default styles;
