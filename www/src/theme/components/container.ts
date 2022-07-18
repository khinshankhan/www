const Container = {
  defaultProps: {
    size: `lg`,
  },
  variants: {
    page: {
      w: `100%`,
      mx: `auto`,
      maxW: { base: `95%`, sm: `90%`, lg: `1024px`, "2xl": `1325px` },
      px: { base: `1rem`, sm: `1.5rem` },
    },
  },
};

export default Container;
