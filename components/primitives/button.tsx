import { selectMedia, theme, styled } from "lib/theme";
import { linkStyles } from "lib/theme/styles/global";

export const Button = styled("button", {
  display: "block",
  borderWidth: 0,
  padding: "4px 6px",
  borderRadius: "8px",
  backgroundColor: theme.colors.violet7,
  [selectMedia("at")]: {
    background: theme.colors.ghostBg,
  },
  cursor: "pointer",

  variants: {
    variant: {
      link: {
        backgroundColor: "transparent",
        ...linkStyles,
        textAlign: "left",
        padding: 0,
        borderRadius: 0,
        [selectMedia("at")]: {
          background: "transparent",
        },
      },
      ghost: {
        cursor: "pointer",
        color: theme.colors.logoFg,
        background: theme.colors.transparent,

        // based off https://codepen.io/finnhvman/pen/jLXKJw
        backgroundPosition: "center",
        transition: "background 0.8s",
        [selectMedia("hover")]: {
          background: `${theme.colors.ghostBg} radial-gradient(circle, transparent 1%, ${theme.colors.ghostBg} 1%) center/15000%`,
        },
        [selectMedia("active")]: {
          backgroundColor: theme.colors.ghostBg,
          backgroundSize: "100%",
          transition: "background 0s",
        },
      },
    },
  },
});

export default Button;
