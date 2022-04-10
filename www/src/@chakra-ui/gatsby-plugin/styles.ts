import { mode, Styles } from "@chakra-ui/theme-tools";

const styles: Styles = {
  global: (props) => ({
    body: {
      fontFamily: `body`,
      color: mode(`blueGray.800`, `whiteAlpha.900`)(props),
      bg: mode(`white`, `blueGray.800`)(props),
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
  }),
};

export default styles;
