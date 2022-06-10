import { fontSizes } from "../custom/typography";

const sizes = fontSizes.reduce(
  (stored, curr) => ({ ...stored, [curr]: { fontSize: curr, lineHeight: curr } }),
  {}
);

const Text = {
  sizes,
  baseStyle: {
    fontFamily: `body`,
    fontWeight: `normal`,
    fontSize: { base: `1.125rem`, lg: `1.3125rem` },
  },
  variants: {
    dashboard: {
      fontWeight: `medium`,
      fontSize: { base: `xl`, sm: `2xl`, lg: `2xl`, "2xl": `3xl` },
    },
  },
};

export default Text;
