import { styled, theme, selectMedia } from "lib/theme";

export const IconButton = styled("button", {
  cursor: "pointer",
  display: "inline-block",
  lineHeight: 0,
  borderWidth: 0,
  padding: "10px",
  borderRadius: theme.radii.pill,
  color: theme.colors.logoFg,
  background: theme.colors.transparent,

  // based off https://codepen.io/finnhvman/pen/jLXKJw
  backgroundPosition: "center",
  transition: "background 1s",
  [selectMedia("hover")]: {
    background: `${theme.colors.ghostBg} radial-gradient(circle, transparent 1%, ${theme.colors.ghostBg} 1%) center/15000%`,
  },
  [selectMedia("active")]: {
    backgroundColor: theme.colors.ghostBg,
    backgroundSize: "100%",
    transition: "background 0s",
  },
});

export default IconButton;
