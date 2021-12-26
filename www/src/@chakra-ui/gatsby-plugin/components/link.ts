import { mode, StyleFunctionProps } from "@chakra-ui/theme-tools";

const Link = {
  baseStyle: (props: StyleFunctionProps) => {
    const palette = mode(`light`, `dark`)(props);

    return {
      color: `brand.${palette}.primary`,
      _hover: {
        color: `brand.${palette}.secondary`,
        textDecoration: `underline`,
      },
    };
  },
};

export default Link;
