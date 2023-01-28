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
};

export default normalizeStyles;
