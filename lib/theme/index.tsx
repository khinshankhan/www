import { extendTheme, ThemeOverride } from "@chakra-ui/react";
import foundations from "./foundations";

const config: ThemeOverride["config"] = {
  cssVarPrefix: `ck`,
  initialColorMode: `light`,
  // NOTE: using system color mode is iffy, just avoid it
  useSystemColorMode: false,
};

const theme = extendTheme({
  ...foundations,
  config,
});

export default theme;
