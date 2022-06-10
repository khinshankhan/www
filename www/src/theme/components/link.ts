interface ILinkStyleProps {
  c: string;
  u?: string;
  h?: string;
  f?: string;
}
const linkStyle = ({ c, u, h, f }: ILinkStyleProps) => ({
  textDecoration: `underline`,
  textDecorationColor: u ?? c,
  _hover: {
    color: h ?? c,
  },
  _focus: {
    color: f ?? c,
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
    internal: linkStyle({ c: `internal` }),
    external: linkStyle({ c: `external` }),
    grayInternal: linkStyle({ c: `internal`, u: `gray.400` }),
    grayExternal: linkStyle({ c: `external`, u: `gray.400` }),
  },
};

export default Link;
