const linkStyle = (c: string) => ({
  textDecoration: `underline`,
  textDecorationColor: c,
  _hover: {
    color: c,
  },
  _focus: {
    color: c,
  },
});

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
    internal: linkStyle(`internal`),
  },
};

export default Link;
