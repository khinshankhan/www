import { extendTheme, ThemeOverride } from "@chakra-ui/react";
import components from "./components";
import foundations from "./foundations";
import styles from "./styles/global";

const config: ThemeOverride["config"] = {
  cssVarPrefix: `ck`,
  initialColorMode: `light`,
  // NOTE: using system color mode is iffy, just avoid it
  useSystemColorMode: false,
};

const theme = extendTheme({
  ...foundations,
  components,
  styles,
  config,
});

export default theme;
