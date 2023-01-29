import { theme } from "lib/theme/stitches.config";
import { selectMedia } from "lib/theme/selectors";

export const normalizeStyles = {
  a: {
    position: "relative",
    fontFamily: "inherit",
    lineHeight: "inherit",
    fontSize: "inherit",
    color: "$link",
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
      color: "$linkActive",
      [selectMedia("before")]: {
        transform: "scaleX(1)",
      },
    },

    "&.on": {
      color: "$linkOn",
      [selectMedia("before")]: {
        transform: "scaleX(1)",
        backgroundColor: theme.colors.link,
      },
      [selectMedia("hover")]: {
        color: "$linkOn",
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
  "#content :where(h2, h3, h4, h5, h6, p, ol, ul)": {
    marginBottom: "20px",
  },
  "#content p+:where(ol, ul)": {
    marginTop: "-20px",
  },

  // list styling
  ":where(#content, .list-style) :where(ul, ol)": {
    listStyle: "inside",
  },
  ":where(#content, .list-style) ol": {
    listStyleType: "decimal",
  },
  ":where(#content, .list-style) ol li ol": {
    listStyleType: "lower-alpha",
  },
  ":where(#content, .list-style) ol li ol li ol": {
    listStyleType: "lower-greek",
  },
  ":where(#content, .list-style) ul": {
    listStyleType: "disc",
  },
  ":where(#content, .list-style) ul li ul": {
    listStyleType: "circle",
  },
  ":where(#content, .list-style) ul li ul li ul": {
    listStyleType: "square",
  },

  // 2 nested should be good enough
  ":where(#content, .list-style) :where(ul, ol) li :where(ul, ol)": {
    paddingLeft: "40px",
  },
  ":where(#content, .list-style) :where(ul, ol) li :where(ul, ol) li :where(ul, ol)": {
    paddingLeft: "40px",
  },
};

export default normalizeStyles;
