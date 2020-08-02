import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";

import themes from "../theme";

const wrapRootElement = ({ element }) => {
  function getTheme() {
    const isServer = typeof window === "undefined";

    let theme = "dark";

    if (!isServer) {
      try {
        const json = window.localStorage.getItem("theme");
        const item = json ? JSON.parse(json) : theme;
        if (["light", "dark"].includes(item)) {
          theme = item;
        }
      } catch (error) {
        console.log(error);
      }
    }

    return themes[theme];
  }

  return (
    <ThemeProvider theme={getTheme()}>
      <CssBaseline />
      {element}
    </ThemeProvider>
  );
};

export default wrapRootElement;
