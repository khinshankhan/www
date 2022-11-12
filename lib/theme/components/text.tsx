import { fontSizes } from "../custom/fonts";

const sizes = fontSizes.reduce(
  (stored, curr) => ({ ...stored, [curr]: { fontSize: curr, lineHeight: curr } }),
  {}
);

const Text = {
  sizes,
  baseStyle: {
    fontFamily: `body`,
    fontWeight: `normal`,
    fontSize: { base: `1.125rem`, md: `1.3125rem` },
  },
};

export default Text;
