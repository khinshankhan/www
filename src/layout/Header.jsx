import React from "react";
import { Link as GatsbyLink } from "gatsby";
import useScrollPosition from "src/hooks/useScrollPosition";
import { HideOnScroll } from "src/components/Scroll";
import AppBar from "@material-ui/core/AppBar";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {},
  appbar: {
    backgroundColor: theme.palette.primary.main,
  },
  appbarUnelevated: {
    boxShadow: "none",
  },
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: "none",
  },
}));

const Header = ({ siteTitle = "Shan", onToggleTheme, theme }) => {
  const classes = useStyles();
  const [onTop, setOnTop] = React.useState(true);

  useScrollPosition(({ _prevPos, currPos }) => {
    setOnTop(currPos.y === 0 ? true : false);
  });

  return (
    <>
      <div id="back-to-top-anchor"></div>
      <HideOnScroll>
        <AppBar
          position="sticky"
          className={clsx(classes.appbar, onTop && classes.appbarUnelevated)}
        >
          <Toolbar component="nav">
            <Typography variant="h6" className={classes.title}>
              <Link
                to="/"
                component={GatsbyLink}
                color="inherit"
                className={classes.link}
              >
                {siteTitle}
              </Link>
            </Typography>
            <Tooltip title="Toggle light/ dark theme" enterDelay={300}>
              <IconButton
                color="inherit"
                onClick={onToggleTheme}
                data-ga-event-category="header"
                data-ga-event-action="dark"
              >
                {theme === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </>
  );
};

export default Header;
