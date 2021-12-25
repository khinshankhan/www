import { extendTheme, ThemeOverride } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";
import Container from "./components/Container";
import Text from "./components/Text";
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
  components: {
    Container,
    Text,
  },
  config,
});

export default theme;
