export const typographyStyles = {
  "h1, .h1": {
    fontFamily: "$heading",
    fontWeight: "$semibold",
    letterSpacing: "$widest",
    fontSize: "$3xl",
    "@sm": {
      fontSize: "$4xl",
    },
    "@2xl": {
      fontSize: "$5xl",
    },
  },
  "h2, .h2": {
    fontFamily: "$heading",
    fontWeight: "$semibold",
    letterSpacing: "$widest",
    fontSize: "$2xl",
    "@sm": {
      fontSize: "$3xl",
    },
    "@2xl": {
      fontSize: "$4xl",
    },
  },
  "h3, .h3": {
    fontFamily: "$heading",
    fontWeight: "$semibold",
    letterSpacing: "$wider",
    fontSize: "$xl",
    "@sm": {
      fontSize: "$2xl",
    },
    "@2xl": {
      fontSize: "$3xl",
    },
  },
  "h4, .h4": {
    fontFamily: "$heading",
    fontWeight: "$semibold",
    letterSpacing: "$wider",
    fontSize: "$lg",
    "@sm": {
      fontSize: "$xl",
    },
    "@2xl": {
      fontSize: "$2xl",
    },
  },
  "h5, .h5": {
    fontFamily: "$heading",
    fontWeight: "$semibold",
    letterSpacing: "$wider",
    fontSize: "$md",
    "@sm": {
      fontSize: "$lg",
    },
    "@2xl": {
      fontSize: "$xl",
    },
  },
  "h6, .h6": {
    fontFamily: "$heading",
    fontWeight: "$semibold",
    letterSpacing: "$wider",
    fontSize: "$sm",
    "@sm": {
      fontSize: "$md",
    },
    "@2xl": {
      fontSize: "$lg",
    },
  },

  ".main-nav": {
    fontFamily: "$heading",
    fontWeight: "$medium",
    letterSpacing: "$wider",
    fontSize: "$lg",
    "@lg": {
      fontSize: "1.344rem", // avg lg and xl
    },
  },

  small: {
    fontSize: "$md", // 18px
    "@isDesktop": {
      fontSize: "$sm",
    },
    "@2xl": {
      fontSize: "$md", // ~23px, avg 21px and $xl
    },
  },

  a: {
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
};

export default typographyStyles;
