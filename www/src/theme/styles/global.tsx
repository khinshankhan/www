import { mode, Styles } from "@chakra-ui/theme-tools";
import semanticTokens from "../foundations/semantic-tokens";
import codeStyles from "./code";

const {
  colors: { bgOpaque, bgPrimary },
} = semanticTokens;

// TODO: account for color modes properly when dark mode is implemented
const styles: Styles = {
  global: (props) => {
    const navStartBg = mode(bgOpaque.default, bgOpaque._dark)(props);
    const primaryBg = mode(bgPrimary.default, bgPrimary._dark)(props);

    return {
      body: {
        fontFamily: `body`,
        color: `bgContrast`,
        bg: `bgPrimary`,
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
      ".sharedNavBg": {
        // HACK: px just works on breakpoints
        backgroundImage: {
          base: `linear-gradient(${navStartBg}, ${primaryBg} 275px)`,
          md: `linear-gradient(${navStartBg}, ${primaryBg} 350px)`,
        },
        backgroundSize: `cover`,
        backgroundPosition: `center`,
        backgroundAttachment: `fixed`,
      },

      ...codeStyles,
    };
  },
};

export default styles;
