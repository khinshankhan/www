import { fontSizes, headingBaseStyles } from "../custom/typography";

const sizes = fontSizes.reduce(
  (stored, curr) => ({ ...stored, [curr]: { fontSize: curr, lineHeight: curr } }),
  {}
);
const Heading = {
  sizes,
  variants: {
    // h1-h6
    ...headingBaseStyles,
    mainNav: {
      fontFamily: `body`,
      fontWeight: `medium`,
      fontSize: [`xl`, null, null, null, `2xl`],
      letterSpacings: `wider`,
    },
  },
};

export default Heading;
