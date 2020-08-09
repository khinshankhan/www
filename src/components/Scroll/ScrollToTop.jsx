import React from "react";
import { makeStyles } from "@material-ui/styles";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Zoom from "@material-ui/core/Zoom";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    bottom: theme.spacing(6),
    right: theme.spacing(2),
  },
}));

export const scrollToAnchor = (event) => {
  const anchor = (event.target.ownerDocument || document).querySelector(
    "#back-to-top-anchor"
  );

  if (anchor) {
    anchor.scrollIntoView({ behavior: "smooth", block: "center" });
  }
};

const ScrollToTop = ({ children }) => {
  const classes = useStyles();

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  return (
    <Zoom in={trigger}>
      <div
        onClick={scrollToAnchor}
        role="presentation"
        className={classes.root}
      >
        {children}
      </div>
    </Zoom>
  );
};

export default ScrollToTop;
