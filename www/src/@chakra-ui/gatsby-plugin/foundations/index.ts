import { ThemeOverride } from "@chakra-ui/react";
import typography from "./typography";

const foundations: ThemeOverride["foundations"] = {
  ...typography,
};

export default foundations;
