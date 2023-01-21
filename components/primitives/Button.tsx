import { styled } from "lib/theme";
import { normalizeStyles } from "lib/theme/styles";

export const Button = styled("button", {
  display: "block",
  borderWidth: 0,
  padding: "10px",
  borderRadius: "4px",
  background: "transparent",
  "&:focus, &:focus-visible, &:hover": {
    background: "$iconBg",
  },
  cursor: "pointer",

  variants: {
    variant: {
      link: {
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
