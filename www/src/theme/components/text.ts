import { fontSizes } from "../custom/typography";

const sizes = fontSizes.reduce(
  (stored, curr) => ({ ...stored, [curr]: { fontSize: curr, lineHeight: curr } }),
  {}
);
const Text = {
  sizes,
  baseStyle: {
    fontFamily: `body`,
    fontWeight: `medium`,
    fontSize: [`md`, `lg`, null, null, `xl`],
  },
};

export default Text;
