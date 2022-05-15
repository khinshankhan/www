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
    fontSize: { base: `md`, sm: `lg` },
  },
};

export default Text;
