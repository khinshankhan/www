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
    // NOTE: `#content > * >` limits to prose elements (* is container)
    "#content > * > :where(h2, h3, h4, h5, h6, p, ol, ul)": {
      mb: 5,
    },
    "#content > * > p+:where(ol, ul)": {
      mt: -5,
    },
    "#content > * > :where(ol, ul) > li > p": {
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
