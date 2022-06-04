import { ThemeOverride } from "@chakra-ui/react";
import breakpoints from "./breakpoints";
import colors from "./colors";
import semanticTokens from "./semantic-tokens";

const foundations: ThemeOverride["foundations"] = {
  breakpoints,
  colors,
  semanticTokens,
};

export default foundations;
