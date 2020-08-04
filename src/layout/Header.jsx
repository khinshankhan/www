import React from "react";
import { Link as GatsbyLink } from "gatsby";
import Logo from "src/assets/logo";
import { HideOnScroll } from "src/components/Scroll";
import AppBar from "@material-ui/core/AppBar";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { makeStyles, useTheme } from "@material-ui/styles";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {},
  appbar: {
    backgroundColor: theme.palette.primary.main,
  },
  appbarUnelevated: {
    boxShadow: "none",
  },
  left: {
    flexGrow: 1,
  },
  right: {},
  toolbar: {
    flexWrap: "wrap",
  },
  link: {
    textDecoration: "none",
    margin: theme.spacing(1, 1.5),
  },
}));

const Header = ({ siteTitle = "Shan", toggleTheme, themeType }) => {
  const theme = useTheme();
  const classes = useStyles();

  const onTop = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return (
    <>
      <div id="back-to-top-anchor"></div>
      <HideOnScroll>
        <AppBar
          position="sticky"
          className={clsx(classes.appbar, !onTop && classes.appbarUnelevated)}
        >
          <Toolbar className={classes.toolbar}>
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              className={classes.left}
            >
              <Link
                to="/"
                component={GatsbyLink}
                color="inherit"
                className={classes.link}
              >
                <Logo
                  size="70"
                  kLogoFg={theme.palette.primary.contrastText}
                  kLogoBg={theme.palette.primary.main}
                  kLogoBorder={theme.palette.primary.main}
                />
              </Link>
            </Typography>
            <nav>
              <Typography variant="h6">
                <Link
                  to="/"
                  component={GatsbyLink}
                  color="inherit"
                  className={classes.link}
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  component={GatsbyLink}
                  color="inherit"
                  className={classes.link}
                >
                  About
                </Link>
                {" | "}
                <Tooltip title="Toggle light/ dark theme" enterDelay={300}>
                  <IconButton
                    color="inherit"
                    onClick={toggleTheme}
                    data-ga-event-category="header"
                    data-ga-event-action="dark"
                  >
                    {themeType === "light" ? (
                      <Brightness4Icon />
                    ) : (
                      <Brightness7Icon />
                    )}
                  </IconButton>
                </Tooltip>
              </Typography>
            </nav>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </>
  );
};

export default Header;
