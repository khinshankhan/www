import { styled } from "lib/theme";
import { media } from "lib/theme/selectors";

export const Container = styled("div", {
  width: "100%",
  marginLeft: "auto",
  marginRight: "auto",
  paddingLeft: "16px",
  paddingRight: "16px",
  maxWidth: "60ch",

  variants: {
    variant: {
      page: {
        paddingLeft: 0,
        paddingRight: 0,

        maxWidth: "95%",
        [media("sm")]: {
          maxWidth: "90%",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
        },
        [media("lg")]: {
          maxWidth: "1024px",
        },
        [media("2xl")]: {
          maxWidth: "1325px",
        },
      },
    },
  },
});

export default Container;
