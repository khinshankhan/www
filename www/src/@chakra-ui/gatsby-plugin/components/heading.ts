import { fontSizes, headingBaseStyles } from "../custom/typography";

const sizes = fontSizes.reduce(
  (stored, curr) => ({ ...stored, [curr]: { fontSize: curr, lineHeight: curr } }),
  {}
);
const Heading = {
  sizes,
  variants: {
    h1: {
      ...headingBaseStyles.h1,
    },
    h2: {
      ...headingBaseStyles.h2,
    },
    h3: {
      ...headingBaseStyles.h3,
    },
    h4: {
      ...headingBaseStyles.h4,
    },
    mainNav: {
      fontFamily: `heading`,
      fontWeight: `bold`,
      fontSize: [`xl`, null, null, `2xl`],
      letterSpacings: `wider`,
    },
  },
};

export default Heading;
