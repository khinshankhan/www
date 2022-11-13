import { ThemeOverride } from "@chakra-ui/react";
import breakpoints from "./breakpoints";
import semanticTokens from "./semantic-tokens";
import space from "./space";
import typography from "./typography";

const foundations: ThemeOverride["foundations"] = {
  breakpoints,
  semanticTokens,
  space,
  ...typography,
};

export default foundations;
