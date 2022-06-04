import { extendTheme, ThemeOverride } from "@chakra-ui/react";

const config: ThemeOverride["config"] = {
  cssVarPrefix: `ck`,
  initialColorMode: `light`,
  // NOTE: using system color mode is iffy, just avoid it
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
});

export default theme;
