import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { makeStyles, useTheme } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ScrollToTop } from "src/components/Scroll";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
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

const Gutters = ({ xs, classes, children }) => {
  return xs ? (
    <Container className={classes.main}>{children}</Container>
  ) : (
    <Grid container>
      <Grid item xs={false} sm={1} />
      <Grid item xs={12} sm={10}>
        {children}
      </Grid>
      <Grid item xs={false} sm={1} />
    </Grid>
  );
};
const Layout = ({ content, toggleTheme, themeType }) => {
  const theme = useTheme();
  const classes = useStyles();
  const xs = useMediaQuery(theme.breakpoints.only("xs"));

  console.log({ xs });
  return (
    <>
      <CssBaseline />
      <div className={classes.root}>
        <Header toggleTheme={toggleTheme} themeType={themeType} />
        <Gutters xs={xs} classes={classes}>
          {content}
        </Gutters>
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
