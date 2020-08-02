import React from "react";
import Layout from "./Layout";
import themes from "src/theme";
import useLocalStorage from "src/hooks/useLocalStorage";
import { ThemeProvider } from "@material-ui/styles";

const Index = ({ children, container = false }) => {
  const [theme, setTheme] = useLocalStorage("theme", "dark");

  const toggleTheme = () =>
    setTheme((theme) => (theme === "light" ? "dark" : "light"));

  return (
    <ThemeProvider theme={themes[theme]}>
      <Layout content={children} toggleTheme={toggleTheme} themeType={theme} />
    </ThemeProvider>
  );
};

export default Index;
