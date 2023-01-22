import { styled } from "lib/theme";
import { normalizeStyles } from "lib/theme/styles";

export const Button = styled("button", {
  display: "block",
  borderWidth: 0,
  padding: "4px 6px",
  borderRadius: "8px",
  backgroundColor: "$buttonBg",
  "&:focus, &:focus-visible, &:hover": {
    background: "$buttonHoverBg",
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
        "&:focus, &:focus-visible, &:hover": {
          background: "transparent",
        },
      },
    },
  },
});

export default Button;
