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
    mainNav: {
      textDecoration: `underline`,
      textDecorationColor: `internal`,
      _hover: {
        color: `internal`,
      },
      _focus: {
        color: `internal`,
      },
    },
  },
};

export default Link;
