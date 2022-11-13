import { ThemeOverride } from "@chakra-ui/react";
import breakpoints from "./breakpoints";
import semanticTokens from "./semantic-tokens";
import typography from "./typography";

const foundations: ThemeOverride["foundations"] = {
  breakpoints,
  semanticTokens,
  ...typography,
};

export default foundations;
