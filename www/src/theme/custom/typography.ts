export const fontSizes = [`5xl`, `4xl`, `3xl`, `2xl`, `xl`, `lg`, `md`, `sm`];

export const headingBaseStyles = {
  h1: {
    fontFamily: `heading`,
    fontWeight: `bold`,
    fontSize: { base: `3xl`, sm: `4xl`, "2xl": `5xl` },
    letterSpacings: `widest`,
  },
  h2: {
    fontFamily: `heading`,
    fontWeight: `semibold`,
    fontSize: { base: `2xl`, sm: `3xl`, "2xl": `4xl` },
    letterSpacings: `widest`,
  },
  h3: {
    fontFamily: `heading`,
    fontWeight: `semibold`,
    fontSize: { base: `xl`, sm: `2xl`, "2xl": `3xl` },
    letterSpacings: `wider`,
  },
  h4: {
    fontFamily: `heading`,
    fontWeight: `semibold`,
    fontSize: { base: `lg`, sm: `xl`, "2xl": `2xl` },
    letterSpacings: `wider`,
  },
  h5: {
    fontFamily: `heading`,
    fontWeight: `semibold`,
    fontSize: { base: `md`, sm: `lg`, "2xl": `xl` },
    letterSpacings: `wider`,
  },
  h6: {
    fontFamily: `heading`,
    fontWeight: `semibold`,
    fontSize: { base: `sm`, sm: `md`, "2xl": `lg` },
    letterSpacings: `wider`,
  },
};
