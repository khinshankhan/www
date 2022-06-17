import { mode, Styles } from "@chakra-ui/theme-tools";

const styles: Styles = {
  global: (props) => ({
    body: {
      fontFamily: `body`,
      color: `bgContrast`,
      bg: `bg`,
      transitionProperty: `background-color`,
      transitionDuration: `normal`,
      lineHeight: `base`,
    },
    "*::placeholder": {
      color: mode(`blueGray.400`, `whiteAlpha.400`)(props),
    },
    "*, *::before, &::after": {
      borderColor: mode(`blueGray.200`, `whiteAlpha.300`)(props),
      wordWrap: `break-word`,
    },
    "::selection": {
      background: `selection`,
    },
    "h2, h3, h4, h5, h6, p, ol, ul": {
      mb: 5,
    },
    "p+ol, p+ul": {
      mt: -5,
    },
    "li > p": {
      mb: 0,
    },
  }),
};

export default styles;
