import { ThemeOverride } from "@chakra-ui/react";
import colors from "./colors";
import typography from "./typography";

const foundations: ThemeOverride["foundations"] = {
  colors,
  ...typography,
};

export default foundations;
