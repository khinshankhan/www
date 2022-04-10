import { extendTheme, ThemeOverride } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";
import components from "./components";
import foundations from "./foundations";
import styles from "./styles";

const breakpoints = createBreakpoints({
  sm: `640px`,
  md: `768px`,
  lg: `1024px`,
  xl: `1280px`,
  "2xl": `1536px`,
});

const config: ThemeOverride["config"] = {
  cssVarPrefix: `ck`,
  initialColorMode: `dark`,
  // TODO: change to true after theme is built out
  useSystemColorMode: false,
};

const theme = extendTheme({
  breakpoints,
  ...foundations,
  components,
  styles,
  config,
});

export default theme;
