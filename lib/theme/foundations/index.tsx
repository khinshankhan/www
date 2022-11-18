import { ThemeOverride } from "@chakra-ui/react";
import breakpoints from "./breakpoints";
import { colors } from "./colors";
import semanticTokens from "./semantic-tokens";
import space from "./space";
import typography from "./typography";

const foundations: ThemeOverride["foundations"] = {
  breakpoints,
  colors,
  semanticTokens,
  space,
  ...typography,
};

export default foundations;
