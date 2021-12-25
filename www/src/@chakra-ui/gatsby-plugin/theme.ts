import { extendTheme, ThemeOverride } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";
import components from "./components";
import foundations from "./foundations";

const config: ThemeOverride["config"] = {
  cssVarPrefix: `chakra`,
  initialColorMode: `dark`,
  useSystemColorMode: true,
};

const breakpoints = createBreakpoints({
  sm: `640px`,
  md: `768px`,
  lg: `1024px`,
  xl: `1280px`,
  "2xl": `1536px`,
});

const theme = extendTheme({
  breakpoints,
  ...foundations,
  components,
  config,
});

export default theme;
