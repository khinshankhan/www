import { fontSizes, headingBaseVariantsStyles, headingVariantsStyles } from "../custom/typography";

const sizes = fontSizes.reduce(
  (stored, curr) => ({ ...stored, [curr]: { fontSize: curr, lineHeight: curr } }),
  {}
);
const Heading = {
  sizes,
  variants: {
    ...headingBaseVariantsStyles, // h1-h6
    ...headingVariantsStyles,
  },
};

export default Heading;
