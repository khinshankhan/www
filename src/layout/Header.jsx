import React from "react";
import { Link as GatsbyLink } from "gatsby";
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

const useStyles = makeStyles((theme) => {
  console.log(theme);
  return {
    root: {},
    appbar: {
      boxShadow: "none",
      backgroundColor: theme.palette.primary.main,
    },
    toolbar: {},
    title: {
      flexGrow: 1,
    },
    link: {
      textDecoration: "none",
    },
  };
});

const Header = ({ siteTitle = "Shan", onToggleTheme, theme, window }) => {
  const classes = useStyles();

  return (
    <div>
      <HideOnScroll window={window}>
        <AppBar className={classes.appbar}>
          <Toolbar className={classes.toolbar}>
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
    </div>
  );
};

export default Header;
