import { ThemeOverride } from "@chakra-ui/react";
import breakpoints from "./breakpoints";
import colors from "./colors";
import semanticTokens from "./semantic-tokens";
import typography from "./typography";

const foundations: ThemeOverride["foundations"] = {
  breakpoints,
  colors,
  semanticTokens,
  ...typography,
};

export default foundations;
