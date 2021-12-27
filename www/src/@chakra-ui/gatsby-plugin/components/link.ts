import { fontSizes } from "constants/fonts";
import { mode, StyleFunctionProps } from "@chakra-ui/theme-tools";

const Link = {
  baseStyle: (props: StyleFunctionProps) => {
    const palette = mode(`light`, `dark`)(props);

    return {
      fontFamily: `body`,
      fontWeight: `inherit`,
      fontSize: fontSizes,
      color: `brand.${palette}.primary`,
      _hover: {
        color: `brand.${palette}.secondary`,
        textDecoration: `underline`,
      },
    };
  },
};

export default Link;
