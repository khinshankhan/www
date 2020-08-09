import React from "react";
import Metadata from "./Metadata";
import Layout from "./Layout";
import themes from "src/theme";
import useLocalStorage from "src/hooks/useLocalStorage";
import { ThemeProvider } from "@material-ui/styles";

const Index = ({ children, title }) => {
  const [theme, setTheme] = useLocalStorage("theme", "dark");

  const toggleTheme = () =>
    setTheme((theme) => (theme === "light" ? "dark" : "light"));

  return (
    <>
      <Metadata />
      <ThemeProvider theme={themes[theme]}>
        <Layout
          content={children}
          title={title}
          toggleTheme={toggleTheme}
          themeType={theme}
        />
      </ThemeProvider>
    </>
  );
};

export default Index;
