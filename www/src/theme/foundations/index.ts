import { ThemeOverride } from "@chakra-ui/react";
import colors from "./colors";
import semanticTokens from "./semantic-tokens";
import typography from "./typography";

const foundations: ThemeOverride["foundations"] = {
  colors,
  semanticTokens,
  ...typography,
};

export default foundations;
