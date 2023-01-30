import { theme } from "lib/theme/stitches.config";
import { selectMedia } from "lib/theme/selectors";

export const normalizeStyles = {
  a: {
    position: "relative",
    fontFamily: "inherit",
    lineHeight: "inherit",
    fontSize: "inherit",
    color: theme.colors.link,
    textDecoration: "none",
    // link underline animation based off https://tobiasahlin.com/blog/css-trick-animating-link-underlines/
    [selectMedia("before")]: {
      content: "''",
      position: "absolute",
      display: "block",
      width: "100%",
      height: "1px",
      bottom: 0,
      left: 0,
      backgroundColor: theme.colors.linkActive,
      transform: "scaleX(0)",
      transition: "transform 0.3s ease",
    },
    [selectMedia("hover")]: {
      color: theme.colors.linkActive,
      [selectMedia("before")]: {
        transform: "scaleX(1)",
      },
    },

    "&.on": {
      color: theme.colors.linkOn,
      [selectMedia("before")]: {
        transform: "scaleX(1)",
        backgroundColor: theme.colors.link,
      },
      [selectMedia("hover")]: {
        color: theme.colors.linkOn,
        [selectMedia("before")]: {
          backgroundColor: theme.colors.linkActive,
        },
      },
    },

    "&.anchor": {
      [selectMedia("after")]: {
        transition: "opacity 0.4s ease-in-out",
        content: theme.icons.linkBefore.toString(),
        opacity: 0,
        marginLeft: "0.125em",
        verticalAlign: "middle",
      },
      [selectMedia("hover")]: {
        [selectMedia("after")]: {
          opacity: 1,
        },
      },
    },
  },

  // gap between elements
  "#content :is(h2, h3, h4, h5, h6, p, ol, ul)": {
    marginBottom: "20px",
  },
  "#content p+:is(ol, ul)": {
    marginTop: "-20px",
  },

  // list styling
  ":is(#content, .list-style) :is(ul, ol)": {
    listStyle: "inside",
  },
  ":is(#content, .list-style) ol": {
    listStyleType: "decimal",
  },
  ":is(#content, .list-style) ol li ol": {
    listStyleType: "lower-alpha",
  },
  ":is(#content, .list-style) ol li ol li ol": {
    listStyleType: "lower-greek",
  },
  ":is(#content, .list-style) ul": {
    listStyleType: "disc",
  },
  ":is(#content, .list-style) ul li ul": {
    listStyleType: "circle",
  },
  ":is(#content, .list-style) ul li ul li ul": {
    listStyleType: "square",
  },

  // 2 nested should be good enough
  ":is(#content, .list-style) :is(ul, ol) li :is(ul, ol)": {
    paddingLeft: "40px",
  },
  ":is(#content, .list-style) :is(ul, ol) li :is(ul, ol) li :is(ul, ol)": {
    paddingLeft: "40px",
  },
};

export default normalizeStyles;
