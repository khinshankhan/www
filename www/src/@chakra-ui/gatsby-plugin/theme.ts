import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

// Foundational style overrides
import { fontWeights, fonts, fontSizes } from "./foundations/typography";

// Components overrides & custom
import Container from "./components/container";
import Text from "./components/text";

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
