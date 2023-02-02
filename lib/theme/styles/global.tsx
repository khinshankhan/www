import { globalCss, theme } from "lib/theme/stitches.config";
import { media, selectMedia } from "lib/theme/selectors";

const root = ":root";

export const smallStyle = {
  fontSize: theme.fontSizes["xs"],
  [media("isDesktop")]: {
    fontSize: theme.fontSizes["sm"],
  },
  [media("2xl")]: {
    fontSize: theme.fontSizes["md"],
  },
};

export const linkStyles = {
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
};

export const GlobalStyles = globalCss({
  // polyfill variables
  "@supports (height: -webkit-fill-available)": {
    [root]: {
      [theme.sizes.vh.variable]: "-webkit-fill-available",
    },
  },

  "@supports (height: -moz-fill-available)": {
    [root]: {
      [theme.sizes.vh.variable]: "-moz-fill-available",
    },
  },

  "@supports (height: 100dvh)": {
    [root]: {
      [theme.sizes.vh.variable]: "100dvh",
    },
  },

  // global classes
  [media("xl")]: {
    ".hide-xl": {
      display: "none !important",
    },
  },
  [media("isMobile")]: {
    ".hide-mobile": {
      display: "none !important",
    },
  },
  [media("isDesktop")]: {
    ".hide-desktop": {
      display: "none !important",
    },
  },

  // containers
  ".collapsible": {
    transition: "visibility 0s, opacity 0.5s ease-in-out, max-height 0.5s ease-in-out",
    visibility: "visible",
    opacity: 1,
    "&[class*='closed']": {
      transition: "visibility 0.5s, opacity 0.5s ease-in-out, max-height 0.5s ease-in-out",
      visibility: "collapse",
      opacity: 0,
      maxHeight: 0,
      overflow: "hidden",
    },
  },

  // based off https://github.com/chakra-ui/chakra-ui/blob/main/packages/components/layout/src/link-box.tsx
  ".link-overlay": {
    position: "static",
    "&:before": {
      content: "''",
      cursor: "inherit",
      display: "block",
      position: "absolute",
      top: 0,
      left: 0,
      zIndex: 0,
      width: "100%",
      height: "100%",
    },
  },
  ".link-box": {
    isolation: "isolate",
    position: "relative",
    // elevate elements that are interactable
    // also give special linkbox-elevate class privledge as a catchall
    "a[href]:not(.link-overlay), button, .linkbox-elevate": {
      position: "relative",
      zIndex: 1,
    },
  },

  // typography
  // TODO: maybe extract this out to a component
  // too lazy to replace everywhere,
  // so after most content is mdx
  "h1, .h1": {
    fontFamily: theme.fonts.heading,
    fontWeight: theme.fontWeights.semibold,
    letterSpacing: theme.letterSpacings.wider,
    fontSize: theme.fontSizes["3xl"],
    [media("sm")]: {
      fontSize: theme.fontSizes["4xl"],
    },
    [media("2xl")]: {
      fontSize: theme.fontSizes["5xl"],
    },
  },
  "h2, .h2": {
    fontFamily: theme.fonts.heading,
    fontWeight: theme.fontWeights.semibold,
    letterSpacing: theme.letterSpacings.wider,
    fontSize: theme.fontSizes["2xl"],
    [media("sm")]: {
      fontSize: theme.fontSizes["3xl"],
    },
    [media("2xl")]: {
      fontSize: theme.fontSizes["4xl"],
    },
  },
  "h3, .h3": {
    fontFamily: theme.fonts.heading,
    fontWeight: theme.fontWeights.semibold,
    letterSpacing: theme.letterSpacings.wide,
    fontSize: theme.fontSizes["xl"],
    [media("sm")]: {
      fontSize: theme.fontSizes["2xl"],
    },
    [media("2xl")]: {
      fontSize: theme.fontSizes["3xl"],
    },
  },
  "h4, .h4": {
    fontFamily: theme.fonts.heading,
    fontWeight: theme.fontWeights.semibold,
    letterSpacing: theme.letterSpacings.wide,
    fontSize: theme.fontSizes["lg"],
    [media("sm")]: {
      fontSize: theme.fontSizes["xl"],
    },
    [media("2xl")]: {
      fontSize: theme.fontSizes["2xl"],
    },
  },
  "h5, .h5": {
    fontFamily: theme.fonts.heading,
    fontWeight: theme.fontWeights.semibold,
    letterSpacing: theme.letterSpacings.wide,
    fontSize: theme.fontSizes["md"],
    [media("sm")]: {
      fontSize: theme.fontSizes["lg"],
    },
    [media("2xl")]: {
      fontSize: theme.fontSizes["xl"],
    },
  },
  "h6, .h6": {
    fontFamily: theme.fonts.heading,
    fontWeight: theme.fontWeights.semibold,
    letterSpacing: theme.letterSpacings.wide,
    fontSize: theme.fontSizes["sm"],
    [media("sm")]: {
      fontSize: theme.fontSizes["md"],
    },
    [media("2xl")]: {
      fontSize: theme.fontSizes["lg"],
    },
  },

  ".main-nav": {
    fontFamily: theme.fonts.heading,
    fontWeight: theme.fontWeights.medium,
    letterSpacing: theme.letterSpacings.wide,
    fontSize: theme.fontSizes["lg"],
    [media("lg")]: {
      fontSize: "1.344rem", // avg lg and xl
    },
  },

  "small, .small": smallStyle,
  "sup, .sup": {
    ...smallStyle,
    verticalAlign: "super",
  },
  "sub, .sub": {
    ...smallStyle,
    verticalAlign: "sub",
  },
  ".small-bottom": {
    ...smallStyle,
    verticalAlign: "bottom",
  },

  // global normalize
  body: {
    color: theme.colors.placeholder,
    background: theme.colors.bg,
    fontFamily: theme.fonts.body,

    lineHeight: theme.lineHeights.base,
    fontSize: theme.fontSizes.lg, // 18px
    [media("lg")]: {
      fontSize: "1.3125rem", // 21px
    },
    [media("2xl")]: {
      fontSize: "1.43775rem", // ~23px, avg 21px and $xl
    },
  },
  a: linkStyles,

  // content normalize
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
});
