import { ThemeOverride } from "@chakra-ui/react";
import { mode, StyleFunctionProps } from "@chakra-ui/theme-tools";

const styles: ThemeOverride["styles"] = {
  global: (props: StyleFunctionProps) => {
    const palette = mode(`light`, `dark`)(props);

    return {
      body: {
        fontFamily: `body`,
        bg: `brand.${palette}.bg`,
        color: `brand.${palette}.text`,
        transitionProperty: `background-color`,
        transitionDuration: `normal`,
        lineHeight: `base`,
      },
      "p, ol, ul": {
        marginBottom: `5`,
      },
      "p + ul, p + ol": {
        marginTop: `-5`,
      },
    };
  },
};

export default styles;
