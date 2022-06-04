import { ThemeOverride } from "@chakra-ui/react";
import colors from "./colors";
import semanticTokens from "./semantic-tokens";

const foundations: ThemeOverride["foundations"] = {
  colors,
  semanticTokens,
};

export default foundations;
