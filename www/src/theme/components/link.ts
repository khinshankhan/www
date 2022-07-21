const Link = {
  baseStyle: {
    transitionProperty: `common`,
    transitionDuration: `fast`,
    transitionTimingFunction: `ease-out`,
    cursor: `pointer`,
    textDecoration: `none`,
    outline: `none`,
    color: `inherit`,
    _hover: {
      textDecoration: `underline`,
      textDecorationColor: `bgContrast`,
    },
    _focus: {
      textDecoration: `underline`,
      textDecorationColor: `bgContrast`,
      boxShadow: `outline`,
    },
  },
  variants: {
    internal: {
      textDecoration: `underline`,
      textDecorationColor: `internalDecoration`,
      _hover: {
        color: `internal`,
        textDecorationColor: `internalFocusDecoration`,
      },
      _focus: {
        color: `internal`,
        textDecorationColor: `internalFocusDecoration`,
      },
      // NOTE: although this isn't used by chakra ui, it will be reference by internal link
      _active: {
        color: `internal`,
        // textDecorationColor: `internalActiveDecoration`,
      },
    },
    external: {
      textDecoration: `underline`,
      // TODO: add this to semantic tokens
      textDecorationColor: `externalDecoration`,
      _hover: {
        color: `external`,
        textDecorationColor: `externalFocusDecoration`,
      },
      _focus: {
        color: `external`,
        textDecorationColor: `externalFocusDecoration`,
      },
    },
  },
};

export default Link;
