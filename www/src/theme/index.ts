import { extendTheme, ThemeOverride } from "@chakra-ui/react";
import components from "./components";
import foundations from "./foundations";
import styles from "./styles";

const config: ThemeOverride["config"] = {
  cssVarPrefix: `ck`,
  initialColorMode: `dark`,
  // TODO: change to true after theme is built out
  useSystemColorMode: false,
};

const theme = extendTheme({
  ...foundations,
  components,
  styles,
  config,
});

export default theme;
