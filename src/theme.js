import deepMerge from "deepmerge";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

const makeTheme = (variant) => {
  const common = {};

  const theme = createMuiTheme(deepMerge(common, variant));
  return responsiveFontSizes(theme);
};

const light = {
  palette: {
    type: "light",
    primary: {
      main: "#fff",
    },
  },
};

const dark = {
  palette: {
    type: "dark",
    primary: {
      main: "#282C35",
    },
  },
};

const themes = {
  light: makeTheme(light),
  dark: makeTheme(dark),
};

export default themes;
