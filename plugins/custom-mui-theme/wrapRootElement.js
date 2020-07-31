import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";

import theme from "./theme";

export const wrapRootElement = ({ element }) => {
  return <ThemeProvider theme={theme}>{element}</ThemeProvider>;
};
