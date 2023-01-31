import { selectMedia, theme, styled } from "lib/theme";
import normalizeStyles from "lib/theme/styles/global/normalize";

export const Button = styled("button", {
  display: "block",
  borderWidth: 0,
  padding: "4px 6px",
  borderRadius: "8px",
  backgroundColor: theme.colors.link,
  [selectMedia("at")]: {
    background: theme.colors.ghostBg,
  },
  cursor: "pointer",

  variants: {
    variant: {
      link: {
        backgroundColor: "transparent",
        ...normalizeStyles.a,
        textAlign: "left",
        padding: 0,
        borderRadius: 0,
        [selectMedia("at")]: {
          background: "transparent",
        },
      },
    },
  },
});

export default Button;
