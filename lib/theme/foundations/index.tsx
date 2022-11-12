import { ThemeOverride } from "@chakra-ui/react";
import breakpoints from "./breakpoints";
import typography from "./typography";

const foundations: ThemeOverride["foundations"] = {
  breakpoints,
  ...typography,
};

export default foundations;
