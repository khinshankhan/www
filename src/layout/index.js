import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Content from "./Content";
import themes from "../theme";
import useLocalStorage from "../hooks/useLocalStorage";
import { makeStyles, ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ScrollToTop } from "src/components/Scroll";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
}));

const Layout = ({ children, container = false }) => {
  const classes = useStyles();
  const [theme, setTheme] = useLocalStorage("theme", "dark");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeProvider theme={themes[theme]}>
      <CssBaseline />
      <div className={classes.root}>
        <Header onToggleTheme={toggleTheme} theme={theme} />
        <Content content={children} theme={theme} />
        <ScrollToTop>
          <Fab color="secondary" size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollToTop>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Layout;
