import type { Styles } from "@chakra-ui/theme-tools";
import { mode } from "@chakra-ui/theme-tools";
import semanticTokens from "lib/theme/foundations/semantic-tokens";

const {
  colors: { "chakra-body-bg-opaque": bgOpaque, "chakra-body-bg": bgPrimary },
} = semanticTokens;

const styles: Styles = {
  global: (props) => {
    const navStartBg = mode(bgOpaque.default, bgOpaque._dark)(props);
    const primaryBg = mode(bgPrimary.default, bgPrimary._dark)(props);

    return {
      body: {
        fontFamily: `body`,
        color: `chakra-body-text`,
        bg: `chakra-body-bg`,
        transition: `background-color 0.4s ease-in-out`,
        lineHeight: `base`,
      },
      "*::placeholder": {
        color: `chakra-placeholder-color`,
      },
      "*, *::before, &::after": {
        borderColor: `chakra-border-color`,
        wordWrap: `break-word`,
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
    };
  },
};

export default styles;
