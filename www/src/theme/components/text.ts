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
      fontSize: { base: `lg`, sm: `xl` },
    },
  },
};

export default Text;
