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
    "#content > * > h2, #content > * > h3, #content > * > h4, #content > * > h5, #content > * > h6, #content > * > p, #content > * > ol, #content > * > ul":
      {
        mb: 5,
      },
    "#content > * >  p+ol, #content > * >  p+ul": {
      mt: -5,
    },
    "#content > * > li > p": {
      mb: 0,
    },
    "#content > * > p:nth-of-type(1)::first-letter": {
      color: `primary`,
      float: `left`,
      fontWeight: `bold`,
      fontSize: { base: `5rem`, lg: `6rem` },
      lineHeight: { base: `3.375rem` },
    },
  }),
};

export default styles;
