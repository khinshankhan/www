const smallStyle = {
  fontSize: "$md",
  "@isDesktop": {
    fontSize: "$sm",
  },
  "@2xl": {
    fontSize: "$md",
  },
};

export const typographyStyles = {
  "h1, .h1": {
    fontFamily: "$heading",
    fontWeight: "$semibold",
    letterSpacing: "$wider",
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
    letterSpacing: "$wider",
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
    letterSpacing: "$wide",
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
    letterSpacing: "$wide",
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
    letterSpacing: "$wide",
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
    letterSpacing: "$wide",
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
    letterSpacing: "$wide",
    fontSize: "$lg",
    "@lg": {
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
};

export default typographyStyles;
