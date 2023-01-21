export const normalizeStyles = {
  a: {
    fontFamily: "inherit",
    lineHeight: "inherit",
    fontSize: "inherit",
    color: "$link",
    textDecoration: "underline 0 transparent",
    textUnderlineOffset: "0.4em",
    transition: "text-decoration-color 300ms",
    "&:hover": {
      color: "$linkActive",
      textDecorationColor: "$linkActive",
      textUnderlineOffset: "0.4em",
    },
  },
  ".on": {
    color: "$linkOn",
    "&:hover": {
      color: "$linkOn",
    },
  },
  ".anchor": {
    "&:after": {
      transition: "opacity 0.4s ease-in-out",
      content: "var(--anchorage-icons-linkBefore)",
      opacity: 0,
      marginLeft: "0.125em",
      verticalAlign: "middle",
    },
    "&:hover:after": {
      opacity: 1,
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

  "#content > :where(h2, h3, h4, h5, h6, p, ol, ul)": {
    marginBottom: "20px",
  },
  "#content > p+:where(ol, ul)": {
    marginTop: "-20px",
  },

  "#content > :where(ul, ol)": {
    listStyle: "inside",
  },
  "#content > :where(ul, ol) > li > :where(ul, ol)": {
    paddingLeft: "40px",
  },
  "#content > :where(ul, ol) > li > :where(ul, ol) > li > :where(ul, ol)": {
    paddingLeft: "40px",
  },

  "#content > ol": {
    listStyleType: "decimal",
  },
  "#content > ol > li > ol": {
    listStyleType: "lower-alpha",
  },
  "#content > ol > li > ol > li > ol": {
    listStyleType: "lower-greek",
  },
  "#content > ul": {
    listStyleType: "disc",
  },
  "#content > ul > li > ul": {
    listStyleType: "circle",
  },
  "#content > ul > li > ul > li > ul": {
    listStyleType: "square",
  },

  "#content > p:nth-of-type(1)::first-letter": {
    fontWeight: `$black`,
    fontFamily: "$heading",
    color: `$mauve12`,
    float: `left`,
    lineHeight: `3.375rem`,
    fontSize: `5rem`,
    "@lg": {
      fontSize: `6rem`,
    },
  },
};

export default normalizeStyles;
