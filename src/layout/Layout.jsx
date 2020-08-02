import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { makeStyles } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ScrollToTop } from "src/components/Scroll";
import Container from "@material-ui/core/Container";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
  },
  main: {
    marginTop: theme.spacing(1.125),
  },
}));

const Layout = ({ content, toggleTheme, themeType }) => {
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <div className={classes.root}>
        <Header toggleTheme={toggleTheme} themeType={themeType} />
        <Container className={classes.main}>{content}</Container>
        <ScrollToTop>
          <Fab color="secondary" size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollToTop>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
