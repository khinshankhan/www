import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";
import Container from "./components/Container";
import Text from "./components/Text";
import { fontWeights, fonts, fontSizes } from "./foundations/typography";

// Custom breakpoints
const breakpoints = createBreakpoints({
  sm: `640px`,
  md: `768px`,
  lg: `1024px`,
  xl: `1280px`,
  "2xl": `1536px`,
});

const theme = extendTheme({
  breakpoints,
  fontWeights,
  fonts,
  fontSizes,
  components: {
    Container,
    Text,
  },
  config: {
    initialColorMode: `dark`,
    useSystemColorMode: true,
  },
});

export default theme;
