import { theme } from "lib/theme/stitches.config";
import { selectMedia } from "lib/theme/selectors";

export const normalizeStyles = {
  a: {
    fontFamily: "inherit",
    lineHeight: "inherit",
    fontSize: "inherit",
    color: "$link",
    textDecoration: "underline 0 transparent",
    textUnderlineOffset: "0.4em",
    transition: "text-decoration-color 300ms",
    [selectMedia("hover")]: {
      color: "$linkActive",
      textDecorationColor: "$linkActive",
      textUnderlineOffset: "0.4em",
    },
    "&.on": {
      color: "$linkOn",
      "&:hover": {
        color: "$linkOn",
      },
    },
    "&.anchor": {
      "&:after": {
        transition: "opacity 0.4s ease-in-out",
        content: theme.icons.linkBefore.toString(),
        opacity: 0,
        marginLeft: "0.125em",
        verticalAlign: "middle",
      },
      "&:hover:after": {
        opacity: 1,
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
